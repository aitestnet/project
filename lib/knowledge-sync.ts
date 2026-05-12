import { db } from "@/lib/db";
import { upsertKnowledge } from "@/lib/qdrant";

/**
 * Knowledge Sync Engine
 *
 * When a product is published, this module automatically indexes it into
 * the creator's Qdrant vector collection. The AI persona then uses
 * semantic search (RAG) to answer questions about the creator's products.
 */

/** Index a product into the creator's knowledge base */
export async function syncProductToKnowledge(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { creator: { select: { id: true, username: true, name: true } } }
  });

  if (!product || !product.creator) return;

  // Build a rich text chunk from the product data
  const chunk = [
    `Product: ${product.title}`,
    `Type: ${product.kind}`,
    `Price: $${product.price}`,
    `Runtime: ${product.runtime}`,
    product.liveUrl ? `Live URL: ${product.liveUrl}` : null,
    `Description: ${product.description}`,
    product.badges.length > 0 ? `Tags: ${product.badges.join(", ")}` : null
  ]
    .filter(Boolean)
    .join("\n");

  // Upsert to Qdrant
  await upsertKnowledge(product.creator.id, `product_${product.id}`, chunk, {
    type: "product",
    productId: product.id,
    kind: product.kind,
    price: product.price,
    runtime: product.runtime
  });

  // Update or create KnowledgeSource record in Prisma
  const existing = await db.knowledgeSource.findFirst({
    where: {
      creatorId: product.creator.id,
      kind: "product",
      name: `product:${product.id}`
    }
  });

  if (existing) {
    await db.knowledgeSource.update({
      where: { id: existing.id },
      data: { content: chunk, status: "indexed", chunkCount: 1 }
    });
  } else {
    await db.knowledgeSource.create({
      data: {
        creatorId: product.creator.id,
        kind: "product",
        name: `product:${product.id}`,
        content: chunk,
        status: "indexed",
        chunkCount: 1
      }
    });
  }
}

/** Index a raw text knowledge source */
export async function syncTextToKnowledge(
  creatorId: string,
  sourceId: string,
  text: string,
  name: string
) {
  // Split into ~500-char chunks for better retrieval
  const chunks = splitIntoChunks(text, 500);

  for (let i = 0; i < chunks.length; i++) {
    await upsertKnowledge(creatorId, `${sourceId}_chunk_${i}`, chunks[i], {
      type: "text",
      sourceId,
      chunkIndex: i
    });
  }

  // Update KnowledgeSource record
  await db.knowledgeSource.upsert({
    where: { id: sourceId },
    update: { status: "indexed", chunkCount: chunks.length },
    create: {
      id: sourceId,
      creatorId,
      kind: "text",
      name,
      content: text.slice(0, 1000),
      status: "indexed",
      chunkCount: chunks.length
    }
  });
}

function splitIntoChunks(text: string, maxLen: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const s of sentences) {
    if ((current + " " + s).length > maxLen && current) {
      chunks.push(current.trim());
      current = s;
    } else {
      current += " " + s;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}
