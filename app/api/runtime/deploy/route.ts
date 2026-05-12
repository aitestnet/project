import { NextRequest, NextResponse } from "next/server";
import { fullDeploy, getApplicationStatus } from "@/lib/dokploy";

/**
 * POST /api/runtime/deploy
 *
 * Triggers a full deploy flow via Dokploy:
 * 1. Creates project in Dokploy
 * 2. Creates application from GitHub repo
 * 3. Assigns domain ({productSlug}.{username}.ai) with auto-SSL
 * 4. Triggers deployment
 *
 * Body:
 * {
 *   creatorUsername: string,
 *   productSlug: string,
 *   repository: string,
 *   branch?: string
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { creatorUsername, productSlug, repository, branch } = body;

    if (!creatorUsername || !productSlug || !repository) {
      return NextResponse.json(
        { error: "Missing required fields: creatorUsername, productSlug, repository" },
        { status: 400 }
      );
    }

    const result = await fullDeploy({
      creatorUsername,
      productSlug,
      repository,
      branch
    });

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("[runtime/deploy] Error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    // Dokploy not configured → 503
    if (message.includes("not configured")) {
      return NextResponse.json(
        { error: "Executable runtime not configured. Set DOKPLOY_API_URL and DOKPLOY_API_TOKEN." },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/runtime/deploy?applicationId=xxx
 *
 * Get the current status of a deployed application.
 */
export async function GET(req: NextRequest) {
  const applicationId = req.nextUrl.searchParams.get("applicationId");

  if (!applicationId) {
    return NextResponse.json(
      { error: "Missing applicationId query parameter" },
      { status: 400 }
    );
  }

  try {
    const status = await getApplicationStatus(applicationId);
    return NextResponse.json(status);
  } catch (error) {
    console.error("[runtime/deploy] Status check error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
