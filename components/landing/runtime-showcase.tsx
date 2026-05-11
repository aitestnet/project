"use client";

import { ArrowUpRight, Cpu, Globe, Lock, Server, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const live = [
  { name: "AI SEO Tool", url: "seo.yogi.ai", price: 29, kind: "Mini SaaS" },
  { name: "Resume Builder", url: "resume.yogi.ai", price: 14, kind: "Mini SaaS" },
  { name: "Lo-fi Generator", url: "lofi.kenji.ai", price: 9, kind: "Mini SaaS" }
];

export function RuntimeShowcase() {
  return (
    <section className="container mt-24 md:mt-32">
      <div className="grid items-center gap-10 rounded-3xl border bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/40 p-6 md:grid-cols-12 md:p-10 lg:p-14">
        <div className="md:col-span-6">
          <Badge variant="soft" className="rounded-full">
            <Cpu className="mr-1 h-3 w-3" /> Executable Product Runtime
          </Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Sell <span className="text-gradient">live software</span>, not dead PDFs.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Every product on Teskel can be a real, runnable app. We containerize,
            deploy, and SSL-secure it for you on its own subdomain — powered by
            Dokploy.
          </p>
          <ul className="mt-6 grid gap-3 text-sm text-foreground">
            {[
              { icon: Server, t: "Auto Docker deploy + zero-downtime updates" },
              { icon: Globe, t: "Auto subdomain (tool.you.ai) with auto SSL" },
              { icon: Lock, t: "Self-hostable runtime, fully OSS friendly" },
              { icon: Zap, t: "Edge cache + Redis queue out of the box" }
            ].map((i) => (
              <li key={i.t} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-violet-200">
                  <i.icon className="h-3.5 w-3.5 text-violet-600" />
                </span>
                {i.t}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex gap-2">
            <Button asChild variant="gradient">
              <Link href="/dashboard">Open the dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/discover">Browse live tools</Link>
            </Button>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="rounded-2xl border bg-card p-3 shadow-xl shadow-violet-500/5">
            <div className="rounded-xl border bg-background">
              <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="inline-flex h-2 w-2 rounded-full bg-rose-400" />
                  <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono">teskel — runtime</span>
                </div>
                <Badge variant="success" className="rounded-full">
                  3 live
                </Badge>
              </div>
              <div className="divide-y">
                {live.map((l, i) => (
                  <motion.div
                    key={l.url}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-700">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{l.name}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          https://{l.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden text-right sm:block">
                        <p className="text-xs text-muted-foreground">{l.kind}</p>
                        <p className="text-sm font-semibold">${l.price}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="border-t bg-secondary/40 px-4 py-3 text-xs text-muted-foreground">
                Deploy from GitHub → auto SSL → subdomain → revenue. ~38s avg.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
