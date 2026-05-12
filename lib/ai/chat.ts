import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { ModelMessage } from "ai";

/**
 * Stream a chat response from the configured LLM provider.
 *
 * Uses the Vercel AI SDK's `streamText` which handles:
 * - Provider abstraction (OpenAI, Anthropic, Google, etc.)
 * - Streaming text chunks
 * - Edge runtime compatibility
 *
 * Falls back to null if no API key is configured, letting the caller
 * use the deterministic mock instead.
 */
export async function streamChat(
  systemPrompt: string,
  messages: ModelMessage[],
  options?: {
    model?: string;
    temperature?: number;
  }
) {
  const apiKey = process.env.OPENAI_API_KEY;

  // No API key → return null so caller can fall back to mock
  if (!apiKey) {
    return null;
  }

  const modelId = options?.model ?? process.env.AI_MODEL ?? "gpt-4o-mini";

  const result = streamText({
    model: openai(modelId),
    system: systemPrompt,
    messages,
    temperature: options?.temperature ?? 0.7
  });

  return result;
}
