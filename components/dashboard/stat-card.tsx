import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  positive = true
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        {Icon && <Icon className="h-4 w-4 text-foreground" />}
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em]">
        {value}
      </p>
      {delta && (
        <p
          className={cn(
            "mt-1 inline-flex items-center gap-1 text-xs",
            positive ? "text-emerald-600" : "text-rose-600"
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {delta}
        </p>
      )}
    </div>
  );
}
