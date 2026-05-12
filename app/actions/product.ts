"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { fullDeploy } from "@/lib/dokploy";
import { syncProductToKnowledge } from "@/lib/knowledge-sync";

export async function createProductAction(formData: FormData) {
  let clerkUserId: string | null = null;
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const session = await auth();
    clerkUserId = session.userId;
  } catch (e) {
    // Local dev fallback
  }

  let creator = null;
  if (clerkUserId) {
    creator = await db.creator.findUnique({ where: { clerkUserId } });
  }
  if (!creator) {
    // Local dev fallback
    creator = await db.creator.findFirst({ where: { username: "yogi" } });
  }

  if (!creator) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const kind = formData.get("kind") as string;
  const runtime = formData.get("runtime") as "executable" | "static";
  const repo = formData.get("repoUrl") as string;
  const emoji = (formData.get("emoji") as string) || "🚀";

  if (!title || isNaN(price)) {
    throw new Error("Missing required fields");
  }

  // Create product slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  let dokployProjectId = null;
  let dokployAppId = null;
  let liveUrl = null;

  // If executable, trigger Dokploy deploy
  if (runtime === "executable" && repo) {
    try {
      const deployResult = await fullDeploy({
        creatorUsername: creator.username,
        productSlug: slug,
        repository: repo,
      });
      dokployProjectId = deployResult.projectId;
      dokployAppId = deployResult.applicationId;
      liveUrl = deployResult.domain;
    } catch (err) {
      console.warn("Dokploy deployment failed or not configured:", err);
    }
  }

  const newProduct = await db.product.create({
    data: {
      creatorId: creator.id,
      title,
      slug,
      description,
      price,
      kind,
      runtime,
      dokployProjectId: dokployProjectId || undefined,
      dokployServiceId: dokployAppId || undefined,
      liveUrl: liveUrl || "",
      badges: runtime === "executable" ? ["Live", "AI"] : ["Digital"],
      emoji,
      rating: 5.0,
      sales: 0
    }
  });

  // Auto-index product into AI Knowledge (Qdrant)
  try {
    await syncProductToKnowledge(newProduct.id);
  } catch (err) {
    console.warn("Knowledge sync failed (Qdrant may not be running):", err);
  }

  revalidatePath("/dashboard/products");
  revalidatePath(`/${creator.username}`);

  return { success: true, productId: newProduct.id };
}
