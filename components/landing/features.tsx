"use client";

import {
  Sparkles,
  Bot,
  ShoppingBag,
  Cpu,
  Wand2,
  Users,
  type LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Bot,
  ShoppingBag,
  Cpu,
  Wand2,
  Users
};

export function Features() {
  return (
    <section id="features" className="container mt-24 scroll-mt-24 md:mt-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          The platform
        </p>
        <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]">
          One identity. Every way to monetize.
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          A modern, AI-native stack that replaces Linktree, Gumroad, Patreon, and
          Character.AI — and adds executable software on top.
        </p>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = iconMap[f.icon] ?? Sparkles;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-card">
                <CardContent className="p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
