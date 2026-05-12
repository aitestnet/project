"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { pricingTiers } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Pricing() {
  const [annual, setAnnual] = React.useState(true);

  return (
    <section id="pricing" className="container scroll-mt-24 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Pricing
        </p>
        <h2 className="mt-4 font-display text-[32px] font-semibold tracking-[-0.025em] text-gradient sm:text-[44px]">
          Start free. Pay as you grow.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
          Flat, friendly pricing. We take 0% commission on your product sales.
        </p>
        <div className="mt-7 inline-flex items-center rounded-full border border-border/50 bg-card/50 p-1 text-sm backdrop-blur-sm">
          <button
            onClick={() => setAnnual(false)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
              !annual ? "text-background" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {!annual && (
              <motion.span
                layoutId="pricing-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">Monthly</span>
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
              annual ? "text-background" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {annual && (
              <motion.span
                layoutId="pricing-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              Annual
              <span className="rounded-sm bg-emerald-50 px-1 py-px text-[9px] font-semibold text-emerald-700">
                -20%
              </span>
            </span>
          </button>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {pricingTiers.map((tier, i) => {
          const price =
            tier.price === 0
              ? 0
              : annual
                ? Math.round(tier.price * 0.8)
                : tier.price;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
            >
              <Card
                className={cn(
                  "relative flex h-full flex-col overflow-hidden transition-all duration-300 card-hover border-border/50",
                  tier.highlight
                    ? "shadow-premium border-indigo-200/60"
                    : "bg-card/50"
                )}
              >
                {tier.highlight && (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mesh-soft opacity-80"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-28 -left-28 h-56 w-56 rounded-full bg-tint-indigo opacity-50 blur-3xl"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-28 -right-28 h-56 w-56 rounded-full bg-tint-violet opacity-50 blur-3xl"
                    />
                    <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background shadow-premium">
                      <Sparkles className="h-3 w-3" />
                      Most popular
                    </span>
                  </>
                )}
                <CardContent className="relative flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {tier.name}
                    </h3>
                    {annual && tier.price > 0 && (
                      <Badge variant="outline" className="border-border/50 text-[10px] font-medium">
                        billed yearly
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1.5 min-h-[2.5rem] text-[13px] text-muted-foreground">
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <motion.span
                      key={`${tier.name}-${price}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="font-display text-4xl font-semibold tracking-[-0.02em]"
                    >
                      ${price}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <Button
                    asChild
                    className={cn("mt-6 group rounded-full")}
                    variant={tier.highlight ? "default" : "outline"}
                    size="lg"
                  >
                    <Link href="/sign-up">{tier.cta}</Link>
                  </Button>
                  <ul className="mt-7 space-y-3 text-[13px]">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            tier.highlight ? "text-indigo-500" : "text-foreground/60"
                          )}
                        />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
