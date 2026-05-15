import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"
import { compose, withAuth, withErrorBoundary } from "@/lib/api/middleware"
import { success } from "@/lib/api/response"
import { mergeRuntimeBuildMeta, readRuntimeBuild, runRuntimeBuild } from "@/lib/runtime/build-runner"

export const dynamic = "force-dynamic"

async function runBuild(_req: NextRequest, ctx?: any) {
  const product = await getOwnedProduct(ctx)
  if (!product) {
    return NextResponse.json(
      { success: false, error: { message: "Product not found" } },
      { status: 404 }
    )
  }

  const build = await runRuntimeBuild(product)
  await db.product.update({
    where: { id: product.id },
    data: {
      seoMeta: mergeRuntimeBuildMeta(product.seoMeta, build),
    },
  })

  return success({ build })
}

async function getBuild(_req: NextRequest, ctx?: any) {
  const product = await getOwnedProduct(ctx)
  if (!product) {
    return NextResponse.json(
      { success: false, error: { message: "Product not found" } },
      { status: 404 }
    )
  }

  return success({
    build: readRuntimeBuild(product.seoMeta),
  })
}

async function getOwnedProduct(ctx?: any) {
  const productId = ctx?.params?.id
  const creatorId = ctx?.creatorId
  if (!productId || !creatorId) return null

  return db.product.findFirst({
    where: {
      id: productId,
      creatorId,
    },
    include: {
      creator: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  })
}

export const GET = compose(withErrorBoundary, withAuth, getBuild)
export const POST = compose(withErrorBoundary, withAuth, runBuild)
