"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight, Search } from "lucide-react";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/discover", label: "Discover" },
  { href: "/yogi", label: "Demo" },
  { href: "/#pricing", label: "Pricing" }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        router.push("/discover");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "border-b border-border/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-soft"
          : "border-b border-transparent bg-background"
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between gap-4 transition-all",
          scrolled ? "h-12" : "h-14"
        )}
      >
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[13px] text-muted-foreground transition-colors hover:text-foreground",
                  pathname === l.href && "text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => router.push("/discover")}
            className="inline-flex h-8 items-center gap-2 rounded-md border bg-card px-2.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Open discover"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Search creators</span>
            <span className="ml-1 hidden items-center gap-0.5 lg:inline-flex">
              <span className="kbd">⌘</span>
              <span className="kbd">K</span>
            </span>
          </button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="group">
            <Link href="/sign-up">
              Claim your handle
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link href="/sign-up">Claim handle</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
