import Link from "next/link";

import { Logo } from "@/components/site/logo";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-fuchsia-600 to-pink-500 p-10 text-white lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]"
        />
        <Logo
          href="/"
          className="relative text-white [&_span:nth-child(2)]:text-white [&_span:nth-child(2)_span]:text-pink-200"
        />
        <div className="relative max-w-md">
          <p className="font-display text-3xl font-semibold leading-tight">
            "Teskel replaced my entire creator stack — Linktree, Gumroad,
            ConvertKit — and added a 24/7 AI version of me."
          </p>
          <p className="mt-4 text-sm text-white/80">
            Aria Saraswati · <span className="font-mono">aria.ai</span>
          </p>
        </div>
        <p className="relative text-xs text-white/60">
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
