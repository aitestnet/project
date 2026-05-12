import { NextRequest } from "next/server";
import type { ModelMessage } from "ai";

import { db } from "@/lib/db";
import { mapCreator, mapProduct, mapMembership } from "@/lib/data-mapper";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { streamChat } from "@/lib/ai/chat";
import type { Creator, Product, Membership } from "@/lib/types";

export const runtime = "edge";

type ChatMessage = { role: "user" | "assistant"; content: string };

/* ── Deterministic mock (used when no LLM API key is set) ── */

function buildMockReply(
  creator: Creator | null,
  list: Product[],
  memb: Membership[],
  messages: ChatMessage[]
): string {
  const lastUser =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const query = lastUser.toLowerCase();

  if (!creator) {
    return "Hi! This creator hasn't trained their AI twin yet. Tell me what you're looking for and I'll suggest similar Teskel creators.";
  }

  if (/price|cost|how much|berapa|harga/.test(query)) {
    const lines = list
      .slice(0, 4)
      .map((p) => `• ${p.title} — $${p.price}${p.runtime === "executable" ? " · live" : ""}`)
      .join("\n");
    return `Here are my top products and prices:\n${lines}\n\nMemberships start at $${
      memb[0]?.priceMonthly ?? 9
    }/month. Want a recommendation?`;
  }

  if (/membership|patreon|subscribe|langganan/.test(query)) {
    const lines = memb
      .map((m) => `• ${m.tier} — $${m.priceMonthly}/mo · ${m.description}`)
      .join("\n");
    return `I offer these memberships:\n${lines}\n\nThe most popular is ${
      memb.find((m) => m.highlight)?.tier ?? memb[0]?.tier ?? "Founder"
    }. Want me to set you up?`;
  }

  if (/recommend|recommendation|fit|which|cocok|rekomendasi/.test(query)) {
    const pick = list.find((p) => p.runtime === "executable") ?? list[0];
    if (pick) {
      return `Based on what you mentioned, I'd start with **${pick.title}** — $${pick.price}. ${pick.description}${
        pick.liveUrl ? `\n\nIt's a live runtime — try it instantly.` : ""
      }`;
    }
  }

  if (/seo|content|marketing/.test(query)) {
    const seo = list.find((p) => /seo/i.test(p.title));
    if (seo) {
      return `My **${seo.title}** is built exactly for this. It audits any URL, rewrites meta + content with your brand voice, and exports a content plan. $${seo.price}, hosted live on Dokploy.`;
    }
  }

  if (/saas|tool|app|live|runtime/.test(query)) {
    const exe = list.filter((p) => p.runtime === "executable");
    if (exe.length) {
      const lines = exe
        .map((p) => `• ${p.title} — $${p.price}${p.liveUrl ? ` · ${p.liveUrl}` : ""}`)
        .join("\n");
      return `These are my live, executable products you can use right after checkout:\n${lines}`;
    }
  }

  if (/about|who are you|siapa|kamu/.test(query)) {
    return `I'm ${creator.name}'s AI twin on Teskel. ${creator.bio} Ask me about my products, memberships, or how I work with founders.`;
  }

  if (/hello|hi|hey|halo|hai/.test(query)) {
    return `${creator.persona.greeting}`;
  }

  // Fallback
  return `Good question. Here's what I'd suggest:\n\n• Start with my top product — ${
    list[0]?.title ?? "the Starter pack"
  }.\n• Join the ${
    memb.find((m) => m.highlight)?.tier ?? "Founder"
  } membership for ongoing access.\n• Or just tell me your goal and I'll match you to the right product.`;
}

function mockStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const tokens = text.split(/(\s+)/);
      for (const t of tokens) {
        controller.enqueue(encoder.encode(t));
        await new Promise((r) => setTimeout(r, 22 + Math.random() * 30));
      }
      controller.close();
    }
  });
}

export async function POST(req: NextRequest) {
  const { messages, creatorId, username } = await req.json();
  const id = creatorId || username;

  if (!id) {
    return new Response("Creator username required", { status: 400 });
  }

  const dbCreator = await db.creator.findUnique({
    where: { username: id },
    include: { products: true, memberships: true }
  });

  if (!dbCreator) {
    return new Response("Creator not found", { status: 404 });
  }

  const creator = mapCreator(dbCreator);
  const productList = dbCreator.products.map(mapProduct);
  const membershipList = dbCreator.memberships.map(mapMembership);

  // Try real AI first (with RAG context from Qdrant)
  if (creator) {
    try {
      const systemPrompt = buildSystemPrompt(creator, productList, membershipList);

      // RAG: get relevant knowledge from Qdrant
      let ragContext = "";
      const lastUserMsg = [...messages].reverse().find((m: ChatMessage) => m.role === "user")?.content;
      if (lastUserMsg) {
        try {
          const { searchKnowledge } = await import("@/lib/qdrant");
          const results = await searchKnowledge(dbCreator.id, lastUserMsg, 3);
          if (results.length > 0) {
            ragContext = "\n\n## RELEVANT KNOWLEDGE (from your knowledge base)\n" +
              results.map((r) => r.text).join("\n---\n");
          }
        } catch {
          // Qdrant not available — continue without RAG
        }
      }

      const enhancedPrompt = systemPrompt + ragContext;
      const coreMessages: ModelMessage[] = messages.map((m: ChatMessage) => ({
        role: m.role,
        content: m.content
      }));

      const result = await streamChat(enhancedPrompt, coreMessages);

      if (result) {
        // Real AI stream — use Vercel AI SDK response
        return result.toTextStreamResponse();
      }
    } catch (error) {
      // LLM failed — fall through to mock
      console.error("[chat] LLM error, falling back to mock:", error);
    }
  }

  // Fallback: deterministic mock
  const text = buildMockReply(creator, productList, membershipList, messages);
  return new Response(mockStream(text), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
