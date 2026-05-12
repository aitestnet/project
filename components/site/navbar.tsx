"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight, X } from "lucide-react";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Floating pill container */}
      <div
        className={cn(
          "mx-auto transition-all duration-500",
          scrolled
            ? "max-w-3xl px-2 pt-3"
            : "max-w-full px-0 pt-0"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled
              ? "h-11 rounded-full border border-border/60 bg-background/75 px-1.5 shadow-premium backdrop-blur-xl backdrop-saturate-150"
              : "h-14 border-b border-transparent bg-background px-6"
          )}
        >
          <div className="flex items-center gap-1">
            <div className={cn(
              "transition-all duration-500",
              scrolled ? "pl-2.5" : "pl-0"
            )}>
              <Logo showWordmark={!scrolled} />
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  pathname === l.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-1.5 md:flex">
            <Button asChild variant="ghost" size="sm" className={cn(
              "h-8 rounded-full text-[13px] font-medium",
              scrolled ? "px-3" : "px-3"
            )}>
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button asChild size="sm" className={cn(
              "group h-8 rounded-full text-[13px] font-medium",
              scrolled ? "px-3.5" : "px-4"
            )}>
              <Link href="/sign-up">
                Get started
                <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border md:hidden",
              scrolled ? "border-border/60" : "border-border"
            )}
          >
            {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full border-b bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex gap-2">
                <Button asChild size="sm" variant="outline" className="flex-1 rounded-full">
                  <Link href="/sign-in">Log in</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 rounded-full">
                  <Link href="/sign-up">Get started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
