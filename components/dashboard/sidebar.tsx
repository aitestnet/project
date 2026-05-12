"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  Brain,
  Fingerprint,
  Home,
  KeyRound,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  WalletCards
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Identity", icon: Home },
  { href: "/dashboard/proof", label: "Proof", icon: ShieldCheck },
  { href: "/dashboard/persona", label: "AI Persona", icon: Bot },
  { href: "/dashboard/knowledge", label: "Knowledge", icon: Brain },
  { href: "/dashboard/products", label: "Offers", icon: ShoppingBag },
  { href: "/dashboard/audience", label: "Audience", icon: Users },
  { href: "/dashboard/agents", label: "Agents", icon: KeyRound },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/payouts", label: "Commerce", icon: WalletCards }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r bg-background px-3 py-5 md:block">
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        AI identity OS
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
          <Fingerprint className="h-3.5 w-3.5" />
          Trust layer
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Connect proof, train your AI persona, and publish one global identity.
        </p>
        <Link
          href="/dashboard/proof"
          className="mt-3 inline-flex text-xs font-medium text-foreground hover:underline"
        >
          Improve trust score -&gt;
        </Link>
      </div>
      <div className="mt-3 rounded-xl border bg-secondary/50 p-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Global ready
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Identity page, persona, offers, leads, and agent permissions in one loop.
        </p>
      </div>
    </aside>
  );
}
