"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Bot,
  Cpu,
  ChevronRight,
  Check,
  CornerDownLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";

const previewChat: { from: "ai" | "user"; text: string }[] = [
  { from: "ai", text: "Hey, I'm Yogi's AI twin. What are you building?" },
  { from: "user", text: "An AI SEO tool. Which of your products fits?" },
  {
    from: "ai",
    text: "Try the AI SEO Tool — live mini SaaS, $29 one-time. Want a demo?"
  }
];

const STAGGER = 0.06;
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
    <section className="relative overflow-hidden border-b">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 grid-dots opacity-60" />
      <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <Badge
                variant="outline"
                className="group rounded-full bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground"
              >
                <span className="relative mr-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
                Now in private beta
                <span className="mx-2 inline-block h-3 w-px bg-border" />
                v0.1 changelog
                <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: STAGGER, ease }}
              className="mt-6 font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-balance text-foreground sm:text-[52px] lg:text-[72px]"
            >
              <span className="block">Your{" "}
                <span className="relative inline-block font-mono text-[0.88em] text-muted-foreground">
                  .ai
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.55, ease }}
                    style={{ transformOrigin: "left" }}
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground"
                  />
                </span>{" "}
                identity,
              </span>
              <span className="block text-shimmer">storefront, and AI twin</span>
              <span className="block">in one place.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: STAGGER * 2, ease }}
              className="mt-6 max-w-2xl text-[15px] leading-relaxed text-pretty text-muted-foreground sm:text-base"
            >
              Teskel is the AI-native creator commerce layer. Claim{" "}
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.92em] text-foreground">
                username.ai
              </span>
              , train an AI persona of yourself, and sell real, executable software
              — not just PDFs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: STAGGER * 3, ease }}
              className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg" className="group">
                <Link href="/sign-up">
                  Claim your .ai handle
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/yogi">
                  See a live demo
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:inline-flex">
                <span className="kbd">G</span>
                <span>jump to demo</span>
              </span>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: STAGGER * 5, ease }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground"
            >
              {[
                "AI persona trained on your knowledge",
                "Executable mini SaaS via Dokploy",
                "Stripe + Lemon Squeezy ready"
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-foreground" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
              className="relative"
            >
              <HeroPreview previewChat={previewChat} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPreview({
  previewChat
}: {
  previewChat: { from: "ai" | "user"; text: string }[];
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-b from-foreground/[0.04] to-transparent blur-2xl" />
      <motion.div
        initial={{ rotate: -1 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1.2, ease }}
        className="relative rounded-2xl border bg-card shadow-card"
      >
        <div className="rounded-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="ml-3 font-mono text-[11px] text-foreground">
                yogi.ai
              </span>
            </div>
            <Badge
              variant="outline"
              className="rounded-full text-[10px] font-medium"
            >
              <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
              Live
            </Badge>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 ring-1 ring-border">
                <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=f5f5f5" />
                <AvatarFallback>{initials("Yogi Pradana")}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Yogi Pradana
                  <Badge
                    variant="outline"
                    className="ml-2 align-middle text-[10px] font-medium"
                  >
                    Verified
                  </Badge>
                </p>
                <p className="text-xs text-muted-foreground">
                  AI engineer · 12 products · 2.4k customers
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                { icon: Bot, label: "AI Persona" },
                { icon: ShoppingBag, label: "12 Products" },
                { icon: Cpu, label: "5 Live SaaS" }
              ].map((s) => (
                <div
                  key={s.label}
                  className="group rounded-lg border bg-background px-2 py-2.5 transition-all hover:-translate-y-0.5 hover:border-foreground/40"
                >
                  <s.icon className="mx-auto h-3.5 w-3.5 text-foreground" />
                  <p className="mt-1 text-[11px] font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2">
              {previewChat.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.25, ease }}
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
                transition={{ duration: 0.4, delay: 1.4, ease }}
                className="flex max-w-[88%] items-center gap-1.5 pl-8"
              >
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
              </motion.div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border bg-background p-1.5 pl-3">
              <input
                readOnly
                value="Ask Yogi's AI twin…"
                className="flex-1 bg-transparent text-xs text-muted-foreground outline-none"
              />
              <span className="kbd">
                <CornerDownLeft className="h-2.5 w-2.5" />
              </span>
              <Button size="sm" className="h-7 px-3 text-xs">
                Send
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
