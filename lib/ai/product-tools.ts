import { tool } from "ai";
import { z } from "zod";

/**
 * Product Agent Tools
 *
 * These are the "actions" the AI agent can take when building a product.
 * Inspired by agentic builder tools: each call updates a focused offer field.
 *
 * Each tool call updates the product state in real-time,
 * which the UI observes via streaming.
 */

export const productTools = {
  set_title: tool({
    description: "Set the product title. Use a catchy, concise name (max 50 chars).",
    inputSchema: z.object({
      title: z.string().describe("The product title")
    })
  }),

  set_emoji: tool({
    description: "Set the product emoji icon.",
    inputSchema: z.object({
      emoji: z.string().describe("A single emoji representing the product")
    })
  }),

  set_description: tool({
    description: "Set the product description. Write a compelling 2-3 sentence sales copy.",
    inputSchema: z.object({
      description: z.string().describe("The product description in HTML format")
    })
  }),

  set_price: tool({
    description: "Set the product price in USD.",
    inputSchema: z.object({
      price: z.number().describe("Price in USD (integer, between 0 and 999)"),
      reasoning: z.string().describe("Brief reasoning for the price point")
    })
  }),

  set_kind: tool({
    description: "Set the product type/kind.",
    inputSchema: z.object({
      kind: z.enum([
        "ebook",
        "prompt-pack",
        "ai-workflow",
        "template",
        "mini-saas",
        "dataset",
        "automation",
        "ai-agent"
      ]).describe("The product category")
    })
  }),

  set_runtime: tool({
    description: "Set whether the product is a static download or live executable.",
    inputSchema: z.object({
      runtime: z.enum(["static", "executable"]).describe("Product runtime type")
    })
  }),

  set_badges: tool({
    description: "Set product tags/badges for discovery.",
    inputSchema: z.object({
      badges: z.array(z.string()).describe("Array of 2-4 relevant tags")
    })
  }),

  finalize: tool({
    description: "Signal that the product is ready to be published. Call this when all fields are set.",
    inputSchema: z.object({
      summary: z.string().describe("A brief summary of what was created")
    })
  })
};

/** System prompt for the product agent */
export function getProductAgentPrompt(creatorName: string, creatorNiche: string) {
  return `You are the Teskel Forge — an AI product strategist and builder.

You are helping "${creatorName}", a creator in the "${creatorNiche}" niche, build a new digital product on Teskel.

## YOUR WORKFLOW
1. First, understand what the creator wants to build.
2. Call the tools in this order: set_kind → set_runtime → set_emoji → set_title → set_description → set_badges → set_price → finalize
3. After each tool call, briefly explain what you did and why.
4. Be opinionated — suggest the BEST options, don't just ask.
5. If the creator asks to change something, call only the relevant tool.

## PRODUCT TYPES
- "ebook" — PDF, guide, long-form content (static)
- "prompt-pack" — Curated AI prompts (static)
- "ai-workflow" — AI automation pipeline (executable)
- "template" — Notion/Figma/code boilerplate (static)
- "mini-saas" — Live deployed web app (executable)
- "dataset" — Data, trained models, API keys (static)
- "automation" — n8n/Zapier workflow packs (static)
- "ai-agent" — Trained AI agent (executable)

## PRICING GUIDELINES
- Ebooks/Prompts: $5–$29
- Templates/Datasets: $19–$79
- AI Workflows/Automations: $29–$99
- Mini SaaS/AI Agents: $49–$299

## RULES
- Keep titles under 50 characters
- Descriptions should be compelling, 2-3 sentences max
- Always use HTML in descriptions (<strong>, <em>, <ul>) for rich formatting
- Pick badges that help with SEO and discovery
- Be conversational and enthusiastic
- Reply in the same language as the creator`;
}
