"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { pricingTiers } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = React.useState(true);

  return (
    <section id="pricing" className="container mt-24 scroll-mt-24 md:mt-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Pricing
        </p>
        <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]">
          Start free. Pay as you grow.
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          Flat, friendly pricing. We take 0% commission on your product sales.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2 text-sm">
          <span className={cn(!annual && "font-medium text-foreground", annual && "text-muted-foreground")}>
            Monthly
          </span>
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <span
            className={cn(
              "flex items-center gap-2",
              annual && "font-medium text-foreground",
              !annual && "text-muted-foreground"
            )}
          >
            Annual
            <Badge variant="outline" className="text-[10px]">
              save 20%
            </Badge>
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {pricingTiers.map((tier) => {
          const price =
            tier.price === 0
              ? 0
              : annual
                ? Math.round(tier.price * 0.8)
                : tier.price;
          return (
            <Card
              key={tier.name}
              className={cn(
                "relative flex flex-col",
                tier.highlight
                  ? "border-foreground/90 shadow-elev"
                  : ""
              )}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background">
                  <Sparkles className="h-3 w-3" />
                  Most popular
                </span>
              )}
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-1 min-h-[2.5rem] text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold tracking-[-0.02em]">
                    ${price}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <Button
                  asChild
                  className="mt-6"
                  variant={tier.highlight ? "default" : "outline"}
                  size="lg"
                >
                  <Link href="/sign-up">{tier.cta}</Link>
                </Button>
                <ul className="mt-6 space-y-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
