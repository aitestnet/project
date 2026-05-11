import { Check, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Membership } from "@/lib/types";

export function MembershipCard({ tier }: { tier: Membership }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-6",
        tier.highlight && "border-foreground/90 shadow-elev"
      )}
    >
      {tier.highlight && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground px-2.5 py-0.5 text-[11px] font-medium text-background">
          <Sparkles className="h-3 w-3" /> Most popular
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {tier.tier}
        </h3>
        <Badge variant="outline" className="text-[10px]">
          Monthly
        </Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold tracking-[-0.02em]">
          ${tier.priceMonthly}
        </span>
        <span className="text-sm text-muted-foreground">/mo</span>
      </div>
      <Button
        className="mt-5"
        size="lg"
        variant={tier.highlight ? "default" : "outline"}
      >
        Join {tier.tier}
      </Button>
      <ul className="mt-5 space-y-2 text-sm">
        {tier.perks.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
