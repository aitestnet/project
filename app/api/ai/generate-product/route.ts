import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

/**
 * AI Product Generation API
 *
 * Accepts a prompt describing what the creator wants to build,
 * and returns AI-generated product metadata:
 * title, emoji, description, suggested price, badges, and kind.
 */
export async function POST(req: Request) {
  const { prompt, creatorName, creatorNiche } = await req.json();

  if (!prompt) {
    return Response.json({ error: "Prompt is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // If no API key, return a smart mock
  if (!apiKey) {
    return Response.json({
      title: "AI-Powered " + prompt.split(" ").slice(0, 3).join(" "),
      emoji: "🚀",
      description: `A professional ${prompt} built for ${creatorNiche || "creators"}. Powered by AI and designed to save you hours of work.`,
      price: 29,
      badges: ["AI", "New"],
      kind: "mini-saas"
    });
  }

  const systemPrompt = `You are a product strategist for Teskel, an AI Identity Commerce platform.
A creator named "${creatorName || "Creator"}" in the "${creatorNiche || "tech"}" niche wants to build a new digital product.

Based on their idea, generate a JSON object with:
- title: catchy, concise product name (max 40 chars)
- emoji: single emoji that represents the product
- description: compelling 2-sentence sales description (max 200 chars)
- price: suggested price in USD (integer, between 5 and 299)
- badges: array of 2-3 relevant tags
- kind: one of "ebook", "prompt-pack", "ai-workflow", "template", "mini-saas", "dataset", "automation"

Respond ONLY with valid JSON, no markdown, no explanation.`;

  const result = streamText({
    model: openai(process.env.AI_MODEL ?? "gpt-4o-mini"),
    system: systemPrompt,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8
  });

  return result.toTextStreamResponse();
}
