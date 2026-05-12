import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth middleware.
 *
 * When Clerk keys are configured, uses Clerk to protect /dashboard/*.
 * When Clerk keys are NOT configured (local dev), passes through everything.
 */

const isClerkConfigured =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY;

async function clerkMiddleware(req: NextRequest) {
  // Dynamic import so it doesn't crash when Clerk isn't installed/configured
  const { clerkMiddleware: clerk, createRouteMatcher } = await import(
    "@clerk/nextjs/server"
  );

  const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

  return clerk(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
    }
  })(req, {} as any);
}

export default async function middleware(req: NextRequest) {
  if (isClerkConfigured) {
    return clerkMiddleware(req);
  }
  // No auth configured → pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};
