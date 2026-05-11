import Link from "next/link";

import { Logo } from "@/components/site/logo";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden border-r bg-foreground p-10 text-background lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <Logo
          href="/"
          className="relative text-background [&_span:nth-child(2)]:text-background [&_span:nth-child(2)_span]:text-background/60"
        />
        <div className="relative max-w-md">
          <p className="font-display text-3xl font-semibold leading-tight tracking-[-0.02em]">
            &ldquo;Teskel replaced my entire creator stack — Linktree, Gumroad,
            ConvertKit — and added a 24/7 AI version of me.&rdquo;
          </p>
          <p className="mt-4 text-sm text-background/70">
            Aria Saraswati · <span className="font-mono">aria.ai</span>
          </p>
        </div>
        <p className="relative text-xs text-background/50">
          © {new Date().getFullYear()} Teskel Labs · Built for creators.
        </p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ← Back home
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
