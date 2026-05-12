"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ShoppingBag,
  Bot,
  Cpu,
  ChevronRight,
  Check,
  CornerDownLeft,
  Globe,
  Zap,
  CreditCard,
  Star,
  Play
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";

const recentClaims = [
  { handle: "founder.ai", time: "12s" },
  { handle: "ship.ai", time: "38s" },
  { handle: "makes.ai", time: "1m" },
  { handle: "draft.ai", time: "2m" },
  { handle: "loop.ai", time: "3m" },
  { handle: "thinks.ai", time: "4m" },
  { handle: "orbit.ai", time: "6m" },
  { handle: "voya.ai", time: "7m" },
  { handle: "andi.ai", time: "9m" },
  { handle: "echo.ai", time: "11m" }
];

const previewChat: { from: "ai" | "user"; text: string }[] = [
  { from: "ai", text: "Hey, I'm Yogi's AI twin. What are you building?" },
  { from: "user", text: "An AI SEO tool. Which of your products fits?" },
  {
    from: "ai",
    text: "Try the AI SEO Tool — live mini SaaS, $29 one-time. Want a demo?"
  }
];

const STAGGER = 0.08;
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, [contenteditable='true']")) return;
      if (e.key.toLowerCase() === "g") {
        e.preventDefault();
        router.push("/yogi");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
      <div className="pointer-events-none absolute inset-0 mesh-hero" />
      <div
        aria-hidden
        className="conic-halo opacity-40"
        style={{ top: "-15%", right: "-10%", height: "600px", width: "600px" }}
      />
      <div
        aria-hidden
        className="conic-halo opacity-25"
        style={{
          bottom: "-20%",
          left: "-12%",
          height: "450px",
          width: "450px",
          animationDirection: "reverse",
          animationDuration: "26s"
        }}
      />

      {/* Main hero content */}
      <div className="container relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
        {/* Centered top section */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Badge
              variant="outline"
              className="group mx-auto inline-flex rounded-full border-border/60 bg-background/80 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-sm"
            >
              <span className="relative mr-2 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
              Now in private beta
              <span className="mx-2.5 inline-block h-3.5 w-px bg-border" />
              <span className="text-foreground">v0.1</span>
              <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: STAGGER, ease }}
            className="mx-auto mt-8 max-w-3xl font-display text-[42px] font-semibold leading-[1.05] tracking-[-0.035em] text-balance sm:text-[56px] lg:text-[72px]"
          >
            <span className="text-gradient">Your{" "}
              <span className="relative inline-block font-mono text-[0.85em] text-muted-foreground">
                .ai
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.6, ease }}
                  style={{ transformOrigin: "left" }}
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-foreground/40"
                />
              </span>{" "}
              identity,
            </span>
            <br />
            <span className="text-shimmer">storefront & AI twin</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: STAGGER * 2, ease }}
            className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[16px] sm:leading-[1.7]"
          >
            Claim{" "}
            <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
              username.ai
            </span>
            , train an AI persona of yourself, and sell real software — not just PDFs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: STAGGER * 3, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="group h-11 rounded-full px-6 text-[14px] font-medium shadow-premium">
              <Link href="/sign-up">
                Claim your .ai handle
                <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group h-11 rounded-full border-border/60 px-6 text-[14px] font-medium">
              <Link href="/yogi">
                <Play className="mr-1.5 h-3.5 w-3.5" />
                See live demo
              </Link>
            </Button>
          </motion.div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: STAGGER * 4, ease }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[
                  { name: "Yogi", color: "bg-tint-indigo" },
                  { name: "Aria", color: "bg-tint-violet" },
                  { name: "Kenji", color: "bg-tint-amber" },
                  { name: "Noor", color: "bg-tint-emerald" },
                  { name: "Lina", color: "bg-secondary" }
                ].map((p) => (
                  <Avatar
                    key={p.name}
                    className={`h-7 w-7 ring-2 ring-background ${p.color}`}
                  >
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${p.name}&backgroundColor=transparent`}
                    />
                    <AvatarFallback className="text-[10px]">
                      {initials(p.name)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-[12px] text-muted-foreground">
                <span className="font-medium text-foreground">1,200+</span>{" "}
                on the waitlist
              </p>
            </div>
            <span className="hidden h-4 w-px bg-border sm:inline-block" />
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="text-[12px] text-muted-foreground">
                <span className="font-medium text-foreground">4.9</span> on Product Hunt
              </span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard preview card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="relative mx-auto mt-16 max-w-4xl lg:mt-20"
        >
          <HeroPreview previewChat={previewChat} />
        </motion.div>
      </div>

      {/* Live ticker strip */}
      <LiveTicker />
    </section>
  );
}

function LiveTicker() {
  return (
    <div className="relative border-t border-border/60 bg-background/60 backdrop-blur-sm">
      <div className="container relative">
        <div className="flex items-center gap-3 py-2.5">
          <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
            Live
          </span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <div className="relative flex-1 overflow-hidden scroll-x-fade pause-on-hover">
            <div className="ticker flex w-max items-center gap-8 whitespace-nowrap text-[12px] text-muted-foreground">
              {[...recentClaims, ...recentClaims].map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="font-mono text-foreground">{c.handle}</span>
                  <span className="text-[11px] text-muted-foreground/60">
                    claimed {c.time} ago
                  </span>
                  <span className="inline-block h-1 w-1 rounded-full bg-border" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroPreview({
  previewChat
}: {
  previewChat: { from: "ai" | "user"; text: string }[];
}) {
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-500/[0.06] via-violet-500/[0.04] to-transparent blur-2xl" />

      {/* Floating notification cards */}
      <motion.div
        initial={{ opacity: 0, x: -20, rotate: -3 }}
        animate={{ opacity: 1, x: 0, rotate: -3 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="absolute -left-8 top-10 z-20 hidden w-[170px] rounded-2xl border border-border/60 bg-card/95 p-3 shadow-premium backdrop-blur-sm lg:block"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
          <CreditCard className="h-3 w-3 text-amber-500" />
          New sale
          <span className="ml-auto rounded-full bg-tint-emerald px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">
            +$29
          </span>
        </div>
        <div className="mt-1.5 text-[11px] font-semibold text-foreground">
          AI SEO Tool
        </div>
        <div className="text-[10px] text-muted-foreground">via Stripe · 2s ago</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 4 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
        className="absolute -right-6 -bottom-4 z-20 hidden w-[200px] rounded-2xl border border-border/60 bg-card/95 p-3 shadow-premium backdrop-blur-sm lg:block"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
          <Zap className="h-3 w-3 text-indigo-500" />
          Dokploy deploy
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-tint-emerald px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            live
          </span>
        </div>
        <div className="mt-1.5 font-mono text-[11px] text-foreground">
          seo.yogi.ai
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span>shipped in</span>
          <span className="font-semibold text-foreground">28s</span>
          <span className="ml-auto inline-flex items-center gap-0.5 text-emerald-600">
            <Globe className="h-2.5 w-2.5" />
            sin1
          </span>
        </div>
      </motion.div>

      {/* Main browser frame */}
      <div className="relative z-10 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-premium">
        <div className="rounded-2xl">
          {/* Browser chrome */}
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200/80" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200/80" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200/80" />
              <span className="ml-3 font-mono text-[11px] text-foreground/80">
                yogi.ai
              </span>
            </div>
            <Badge
              variant="outline"
              className="rounded-full border-border/60 text-[10px] font-medium"
            >
              <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
              Live
            </Badge>
          </div>

          {/* Profile section */}
          <div className="p-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 ring-1 ring-border/60">
                <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=f5f5f5" />
                <AvatarFallback>{initials("Yogi Pradana")}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold leading-tight">
                  <span>Yogi Pradana</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-medium"
                  >
                    Verified
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  AI engineer · 12 products · 2.4k customers
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                { icon: Bot, label: "AI Persona" },
                { icon: ShoppingBag, label: "12 Products" },
                { icon: Cpu, label: "5 Live SaaS" }
              ].map((s) => (
                <div
                  key={s.label}
                  className="group rounded-lg border border-border/60 bg-background px-2 py-2.5 transition-all hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  <s.icon className="mx-auto h-3.5 w-3.5 text-foreground" />
                  <p className="mt-1 text-[11px] font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Chat preview */}
            <div className="mt-5 space-y-2">
              {previewChat.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.25, ease }}
                  className={
                    m.from === "ai"
                      ? "flex max-w-[88%] gap-2"
                      : "ml-auto flex max-w-[88%] justify-end gap-2"
                  }
                >
                  {m.from === "ai" && (
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                      <Bot className="h-3 w-3" />
                    </div>
                  )}
                  <div
                    className={
                      m.from === "ai"
                        ? "rounded-2xl rounded-tl-md bg-secondary px-3 py-2 text-xs text-foreground"
                        : "rounded-2xl rounded-tr-md bg-foreground px-3 py-2 text-xs text-background"
                    }
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.5, ease }}
                className="flex max-w-[88%] items-center gap-1.5 pl-8"
              >
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
              </motion.div>
            </div>

            {/* Input bar */}
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-border/60 bg-background p-1.5 pl-3">
              <input
                readOnly
                value="Ask Yogi's AI twin…"
                className="flex-1 bg-transparent text-xs text-muted-foreground outline-none"
              />
              <span className="kbd">
                <CornerDownLeft className="h-2.5 w-2.5" />
              </span>
              <Button size="sm" className="h-7 rounded-lg px-3 text-xs">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
