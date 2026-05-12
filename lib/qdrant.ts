import { QdrantClient } from "@qdrant/js-client-rest";

/**
 * Qdrant Vector Database Client for Teskel AI Knowledge.
 *
 * Each creator gets their own Qdrant collection named `knowledge_{creatorId}`.
 * Product data, knowledge sources, and persona context are embedded and
 * stored here for RAG-powered AI persona conversations.
 */

const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

let _client: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
  if (!_client) {
    _client = new QdrantClient({
      url: QDRANT_URL,
      ...(QDRANT_API_KEY ? { apiKey: QDRANT_API_KEY } : {})
    });
  }
  return _client;
}

/** Ensure a per-creator collection exists */
export async function ensureCollection(creatorId: string) {
  const client = getQdrantClient();
  const name = `knowledge_${creatorId}`;

  try {
    await client.getCollection(name);
  } catch {
    await client.createCollection(name, {
      vectors: {
        size: 1536, // OpenAI text-embedding-3-small dimension
        distance: "Cosine"
      }
    });
  }

  return name;
}

/** Generate embedding via OpenAI */
async function embed(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Return a deterministic dummy vector for dev/testing
    const hash = Array.from(text).reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return Array.from({ length: 1536 }, (_, i) => Math.sin(hash + i) * 0.1);
  }

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text
    })
  });

  const json = await res.json();
  return json.data[0].embedding;
}

/** Upsert a knowledge chunk into a creator's collection */
export async function upsertKnowledge(
  creatorId: string,
  pointId: string,
  text: string,
  metadata: Record<string, any> = {}
) {
  const client = getQdrantClient();
  const collection = await ensureCollection(creatorId);
  const vector = await embed(text);

  // Use a numeric hash as Qdrant point ID
  const numericId = Math.abs(
    pointId.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0)
  );

  await client.upsert(collection, {
    wait: true,
    points: [
      {
        id: numericId,
        vector,
        payload: {
          text,
          sourceId: pointId,
          ...metadata
        }
      }
    ]
  });

  return numericId;
}

/** Search relevant knowledge for a query */
export async function searchKnowledge(
  creatorId: string,
  query: string,
  limit = 5
): Promise<{ text: string; score: number; sourceId: string }[]> {
  const client = getQdrantClient();
  const collection = `knowledge_${creatorId}`;

  try {
    const vector = await embed(query);
    const results = await client.search(collection, {
      vector,
      limit,
      with_payload: true
    });

    return results.map((r) => ({
      text: (r.payload?.text as string) || "",
      score: r.score,
      sourceId: (r.payload?.sourceId as string) || ""
    }));
  } catch {
    // Collection might not exist yet
    return [];
  }
}
