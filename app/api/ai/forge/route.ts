import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const FORGE_SYSTEM = `You are the Teskel Forge — an elite AI product architect.

You help creators build digital products. Based on the user's idea, respond with a JSON object containing:
- kind: product type (ebook, prompt-pack, ai-workflow, template, mini-saas, dataset, automation, ai-agent)
- runtime: "static" or "executable"
- emoji: single emoji
- title: catchy name (max 50 chars)
- description: compelling 2-3 sentence sales description using HTML tags
- badges: array of 2-4 tags
- price: integer USD ($5-299)
- summary: what you built and why

After the JSON, add a brief friendly message about the product.

PRICING GUIDE: ebooks $5-29, templates $19-79, SaaS $49-299
Reply in the same language as the user. Be opinionated — pick the BEST option.
Respond ONLY with valid JSON first, then your message.`;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({
      role: "assistant",
      content: JSON.stringify({
        kind: "mini-saas", runtime: "executable", emoji: "🚀",
        title: "AI Product Builder", description: "Build products with AI.",
        badges: ["AI", "New"], price: 29, summary: "Demo product"
      })
    });
  }

  const result = streamText({
    model: openai(process.env.AI_MODEL ?? "gpt-4o-mini"),
    system: FORGE_SYSTEM,
    messages,
    temperature: 0.8,
  });

  return result.toTextStreamResponse();
}
