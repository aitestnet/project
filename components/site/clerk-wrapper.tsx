"use client";

import { ClerkProvider } from "@clerk/nextjs";

/**
 * Conditional Clerk wrapper.
 *
 * Only wraps children with ClerkProvider when the Clerk publishable key is set.
 * Without it, children render directly — the app works fine without auth.
 */
export function ClerkWrapper({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (clerkKey) {
    return <ClerkProvider>{children}</ClerkProvider>;
  }

  // No Clerk configured → render children directly
  return <>{children}</>;
}
