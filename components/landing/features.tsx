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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
          The platform
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          One identity. Every way to monetize.
        </h2>
        <p className="mt-4 text-muted-foreground">
          A modern, AI-native stack that replaces Linktree, Gumroad, Patreon, and
          Character.AI — and adds executable software on top.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-violet-200">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold tracking-tight">{f.title}</h3>
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
