import { NextRequest } from "next/server";

import { creators, products, memberships } from "@/lib/data";

export const runtime = "edge";

type ChatMessage = { role: "user" | "assistant"; content: string };

function buildReply(
  username: string,
  messages: ChatMessage[]
): { text: string } {
  const creator = creators[username];
  const lastUser =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const query = lastUser.toLowerCase();

  if (!creator) {
    return {
      text: "Hi! This creator hasn't trained their AI twin yet. Tell me what you're looking for and I'll suggest similar Teskel creators."
    };
  }

  const list = products[username] ?? [];
  const memb = memberships[username] ?? [];

  if (/price|cost|how much|berapa|harga/.test(query)) {
    const lines = list
      .slice(0, 4)
      .map((p) => `• ${p.title} — $${p.price}${p.runtime === "executable" ? " · live" : ""}`)
      .join("\n");
    return {
      text: `Here are my top products and prices:\n${lines}\n\nMemberships start at $${
        memb[0]?.priceMonthly ?? 9
      }/month. Want a recommendation?`
    };
  }

  if (/membership|patreon|subscribe|langganan/.test(query)) {
    const lines = memb
      .map((m) => `• ${m.tier} — $${m.priceMonthly}/mo · ${m.description}`)
      .join("\n");
    return {
      text: `I offer these memberships:\n${lines}\n\nThe most popular is ${
        memb.find((m) => m.highlight)?.tier ?? memb[0]?.tier ?? "Founder"
      }. Want me to set you up?`
    };
  }

  if (/recommend|recommendation|fit|which|cocok|rekomendasi/.test(query)) {
    const pick = list.find((p) => p.runtime === "executable") ?? list[0];
    if (pick) {
      return {
        text: `Based on what you mentioned, I'd start with **${pick.title}** — $${pick.price}. ${pick.description}${
          pick.liveUrl ? `\n\nIt's a live runtime — try it instantly.` : ""
        }`
      };
    }
  }

  if (/seo|content|marketing/.test(query)) {
    const seo = list.find((p) => /seo/i.test(p.title));
    if (seo) {
      return {
        text: `My **${seo.title}** is built exactly for this. It audits any URL, rewrites meta + content with your brand voice, and exports a content plan. $${seo.price}, hosted live on Dokploy.`
      };
    }
  }

  if (/saas|tool|app|live|runtime/.test(query)) {
    const exe = list.filter((p) => p.runtime === "executable");
    if (exe.length) {
      const lines = exe
        .map((p) => `• ${p.title} — $${p.price}${p.liveUrl ? ` · ${p.liveUrl}` : ""}`)
        .join("\n");
      return {
        text: `These are my live, executable products you can use right after checkout:\n${lines}`
      };
    }
  }

  if (/about|who are you|siapa|kamu/.test(query)) {
    return {
      text: `I'm ${creator.name}'s AI twin on Teskel. ${creator.bio} Ask me about my products, memberships, or how I work with founders.`
    };
  }

  if (/hello|hi|hey|halo|hai/.test(query)) {
    return {
      text: `${creator.persona.greeting}`
    };
  }

  // Fallback: tailored mix
  return {
    text: `Good question. Here's what I'd suggest:\n\n• Start with my top product — ${
      list[0]?.title ?? "the Starter pack"
    }.\n• Join the ${
      memb.find((m) => m.highlight)?.tier ?? "Founder"
    } membership for ongoing access.\n• Or just tell me your goal and I'll match you to the right product.`
  };
}

export async function POST(req: NextRequest) {
  const { username = "", messages = [] }: { username: string; messages: ChatMessage[] } =
    await req.json();

  const { text } = buildReply(username, messages);

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const tokens = text.split(/(\s+)/);
      for (const t of tokens) {
        controller.enqueue(encoder.encode(t));
        await new Promise((r) => setTimeout(r, 22 + Math.random() * 30));
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
