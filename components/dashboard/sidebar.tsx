"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  Cpu,
  Home,
  ShoppingBag,
  Sparkles,
  Users,
  Wallet
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard/persona", label: "AI Persona", icon: Bot },
  { href: "/dashboard/runtime", label: "Runtime", icon: Cpu },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/audience", label: "Audience", icon: Users },
  { href: "/dashboard/payouts", label: "Payouts", icon: Wallet }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 border-r bg-background px-3 py-5 md:block">
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Workspace
      </p>
      <nav className="space-y-0.5">
        {links.map((l) => {
          const Icon = l.icon;
          const active =
            pathname === l.href ||
            (l.href !== "/dashboard" && pathname.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 rounded-xl border bg-card p-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Upgrade to Studio
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Unlock 10 executable runtimes + Mem0 memory.
        </p>
        <Link
          href="/#pricing"
          className="mt-3 inline-flex text-xs font-medium text-foreground hover:underline"
        >
          See plans →
        </Link>
      </div>
    </aside>
  );
}
