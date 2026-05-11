import { Cpu, ShoppingBag, Users, Wallet } from "lucide-react";

import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import type { Creator } from "@/lib/types";

export function StatsStrip({ creator }: { creator: Creator }) {
  const items = [
    {
      icon: ShoppingBag,
      label: "Products",
      value: creator.stats.products.toString()
    },
    {
      icon: Cpu,
      label: "Live runtimes",
      value: creator.stats.deployments.toString()
    },
    {
      icon: Users,
      label: "Customers",
      value: formatCompactNumber(creator.stats.customers)
    },
    {
      icon: Wallet,
      label: "Lifetime revenue",
      value: formatCurrency(creator.stats.revenue)
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border bg-card p-4 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
            <s.icon className="h-4 w-4 text-violet-600" />
          </div>
          <p className="mt-2 font-display text-xl font-semibold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
