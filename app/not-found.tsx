import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <Logo />
      <p className="mt-10 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
        This <span className="font-mono">.ai</span> doesn&rsquo;t exist yet.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Maybe you spotted a handle worth grabbing — claim it before anyone else
        does.
      </p>
      <div className="mt-8 flex gap-2">
        <Button asChild size="lg">
          <Link href="/sign-up">Claim a handle</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/discover">Discover creators</Link>
        </Button>
      </div>
    </div>
  );
}
