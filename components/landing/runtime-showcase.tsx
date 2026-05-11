"use client";

import * as React from "react";
import { ArrowUpRight, Cpu, Globe, Lock, Server, Zap } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const live = [
  {
    name: "AI SEO Tool",
    url: "seo.yogi.ai",
    price: 29,
    kind: "Mini SaaS",
    logs: [
      "build · 12.4s",
      "image · push",
      "route · seo.yogi.ai",
      "✓ live in 28s"
    ]
  },
  {
    name: "Resume Builder",
    url: "resume.yogi.ai",
    price: 14,
    kind: "Mini SaaS",
    logs: [
      "build · 9.8s",
      "image · push",
      "route · resume.yogi.ai",
      "✓ live in 21s"
    ]
  },
  {
    name: "Lo-fi Generator",
    url: "lofi.kenji.ai",
    price: 9,
    kind: "Mini SaaS",
    logs: [
      "build · 7.2s",
      "image · push",
      "route · lofi.kenji.ai",
      "✓ live in 17s"
    ]
  }
];

const ease = [0.22, 1, 0.36, 1] as const;

export function RuntimeShowcase() {
  const [active, setActive] = React.useState(0);
  const current = live[active];

  return (
    <section className="container mt-24 md:mt-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border bg-card p-6 md:p-10 lg:p-14">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 mesh-soft"
        />
        <div className="relative grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Badge
              variant="outline"
              className="rounded-full text-[11px] font-medium text-emerald-600 border-tint-indigo bg-tint-emerald"
            >
              <Cpu className="mr-1 h-3 w-3" /> Executable Product Runtime
            </Badge>
            <h2 className="mt-4 font-display text-[32px] font-semibold tracking-[-0.02em] md:text-[44px]">
              Sell <span className="text-gradient">live software</span>, not dead PDFs.
            </h2>
            <p className="mt-4 max-w-md text-[15px] text-muted-foreground">
              Every product on Teskel can be a real, runnable app. We
              containerize, deploy, and SSL-secure it for you on its own
              subdomain — powered by Dokploy.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-foreground">
              {[
                { icon: Server, t: "Auto Docker deploy + zero-downtime updates" },
                { icon: Globe, t: "Auto subdomain (tool.you.ai) with auto SSL" },
                { icon: Lock, t: "Self-hostable runtime, fully OSS friendly" },
                { icon: Zap, t: "Edge cache + Redis queue out of the box" }
              ].map((i, idx) => (
                <motion.li
                  key={i.t}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                    <i.icon className="h-3.5 w-3.5 text-foreground" />
                  </span>
                  {i.t}
                </motion.li>
              ))}
            </ul>
            <div className="mt-7 flex gap-2">
              <Button asChild className="group">
                <Link href="/dashboard">
                  Open the dashboard
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/discover">Browse live tools</Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="overflow-hidden rounded-2xl border bg-background shadow-card">
              <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-200" />
                  <span className="ml-2 font-mono text-[11px]">teskel — runtime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className="rounded-full text-[10px] text-muted-foreground"
                  >
                    <Globe className="mr-1 h-2.5 w-2.5" />
                    sin1
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
                    {live.length} live
                  </Badge>
                </div>
              </div>

              <div className="relative flex gap-1 overflow-x-auto border-b px-2 py-2">
                {live.map((l, i) => (
                  <button
                    key={l.url}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative shrink-0 rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors",
                      active === i
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active === i && (
                      <motion.span
                        layoutId="runtime-tab"
                        className="absolute inset-0 rounded-md bg-secondary"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    )}
                    <span className="relative font-mono">{l.url}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.url}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="grid gap-4 p-5 sm:grid-cols-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-secondary text-foreground">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {current.name}
                        </p>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          https://{current.url}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2 text-[11px]">
                      <div className="flex items-center justify-between rounded-md border bg-card px-2.5 py-1.5">
                        <span className="text-muted-foreground">Kind</span>
                        <span className="font-medium">{current.kind}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border bg-card px-2.5 py-1.5">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-medium">${current.price}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border bg-card px-2.5 py-1.5">
                        <span className="text-muted-foreground">Status</span>
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
                          Healthy
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border bg-secondary/60 font-mono text-[10.5px]">
                    <div className="flex items-center gap-1.5 border-b bg-background/60 px-3 py-1.5 text-[10px] text-muted-foreground">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
                      $ dokploy logs --tail
                    </div>
                    <div className="space-y-1 p-3">
                      {current.logs.map((line, i) => (
                        <motion.p
                          key={line}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.35, ease }}
                          className={
                            line.startsWith("✓")
                              ? "text-emerald-600"
                              : "text-foreground/80"
                          }
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
