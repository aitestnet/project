"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Bot,
  Cpu,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";

const previewChat: { from: "ai" | "user"; text: string }[] = [
  { from: "ai", text: "Hey 👋 I'm Yogi's AI twin. What are you building?" },
  { from: "user", text: "An AI SEO tool. Which of your products fits?" },
  {
    from: "ai",
    text: "Try the AI SEO Tool — it's a live mini SaaS, $29 one-time. Want a demo?"
  }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.35]" />
      <div className="container relative pt-16 md:pt-24 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="soft" className="rounded-full px-3 py-1">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Now in private beta · v0.1
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Your <span className="font-mono text-[0.9em] text-violet-600">.ai</span>{" "}
              identity, <br className="hidden sm:inline" />
              <span className="text-gradient">storefront, and AI twin</span> in one
              place.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Teskel is the AI-native creator commerce layer. Claim{" "}
              <span className="font-mono text-foreground">username.ai</span>, train
              an AI persona of yourself, and sell real, executable software — not
              just PDFs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="xl" variant="gradient">
                <Link href="/sign-up">
                  Claim your .ai handle
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/yogi">
                  See a live demo
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            >
              {[
                "AI persona trained on your knowledge",
                "Executable mini SaaS via Dokploy",
                "Stripe + Lemon Squeezy ready"
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-600" />
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground"
            >
              <span>Trusted by indie builders & studios</span>
              <div className="flex items-center gap-5 opacity-70">
                <span className="font-mono">aria.ai</span>
                <span className="font-mono">yogi.ai</span>
                <span className="font-mono">lumen.studio</span>
                <span className="font-mono">kenji.ai</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
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
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-200/50 via-fuchsia-200/40 to-transparent blur-2xl" />
      <div className="gradient-border relative rounded-2xl bg-card p-2 shadow-2xl shadow-violet-500/10">
        <div className="rounded-xl border bg-background/80 p-4 backdrop-blur">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-rose-400" />
              <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-[11px]">yogi.ai</span>
            </div>
            <Badge variant="success" className="rounded-full">
              <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </Badge>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-violet-200">
              <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=ede9fe" />
              <AvatarFallback>{initials("Yogi Pradana")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold leading-tight">
                Yogi Pradana
                <Badge variant="soft" className="ml-2 align-middle">
                  Verified
                </Badge>
              </p>
              <p className="text-xs text-muted-foreground">
                AI engineer · 12 products · 2.4k customers
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: Bot, label: "AI Persona" },
              { icon: ShoppingBag, label: "12 Products" },
              { icon: Cpu, label: "5 Live SaaS" }
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border bg-background/60 px-2 py-2"
              >
                <s.icon className="mx-auto h-4 w-4 text-violet-600" />
                <p className="mt-1 text-[11px] font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {previewChat.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.25 }}
                className={
                  m.from === "ai"
                    ? "flex max-w-[85%] gap-2"
                    : "ml-auto flex max-w-[85%] gap-2 justify-end"
                }
              >
                {m.from === "ai" && (
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={
                    m.from === "ai"
                      ? "rounded-xl rounded-tl-sm bg-secondary px-3 py-2 text-xs"
                      : "rounded-xl rounded-tr-sm bg-gradient-to-br from-violet-600 to-fuchsia-500 px-3 py-2 text-xs text-white"
                  }
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border bg-background/80 p-2">
            <input
              readOnly
              value="Ask Yogi's AI twin…"
              className="flex-1 bg-transparent px-2 text-xs text-muted-foreground outline-none"
            />
            <Button size="sm" variant="gradient" className="h-7 px-3 text-xs">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
