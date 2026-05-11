import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bot,
  Cpu,
  DollarSign,
  Eye,
  MessageSquare,
  Plus,
  Users
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { creators, dashboardProducts } from "@/lib/data";
import { formatCurrency, formatCompactNumber, initials } from "@/lib/utils";

const revenueSeries = [11, 14, 12, 18, 20, 17, 23, 26, 24, 31, 29, 34, 38, 36];

const recentChats = [
  {
    name: "Sasha M.",
    seed: "Sasha",
    snippet: "How much is the AI SEO Tool? Can it handle 50 sites?",
    time: "2m"
  },
  {
    name: "Devansh P.",
    seed: "Devansh",
    snippet: "Recommend a product for a solo founder shipping AI tools.",
    time: "12m"
  },
  {
    name: "Lia R.",
    seed: "Lia",
    snippet: "Can I get the founder membership annually?",
    time: "1h"
  },
  {
    name: "Noor A.",
    seed: "NoorA",
    snippet: "Does the resume builder support PDF export with my branding?",
    time: "3h"
  }
];

export default function DashboardPage() {
  const creator = creators.yogi;

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`Welcome back, ${creator.name.split(" ")[0]} 👋`}
        description="Your AI twin handled 87 conversations this week and closed 14 sales."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/yogi">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </Link>
            </Button>
            <Button>
              <Plus className="h-3.5 w-3.5" />
              New product
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue (30d)"
          value={formatCurrency(18240)}
          delta="+24.6%"
          icon={DollarSign}
        />
        <StatCard
          label="New customers"
          value="412"
          delta="+12.1%"
          icon={Users}
        />
        <StatCard
          label="AI chats"
          value="3.2k"
          delta="+8.4%"
          icon={MessageSquare}
        />
        <StatCard
          label="Live runtimes"
          value="5/10"
          delta="+1 this week"
          icon={Cpu}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border bg-card p-5 lg:col-span-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Revenue
              </p>
              <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em]">
                {formatCurrency(184320)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Lifetime · $5.8M+ flowing through Teskel creators
              </p>
            </div>
            <Badge variant="outline" className="rounded-full">
              <Activity className="mr-1 h-3 w-3" />
              On track
            </Badge>
          </div>
          <Sparkline data={revenueSeries} />
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
            <div>
              <p className="text-foreground font-semibold">$18.2k</p>
              <p>This month</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">$74.1k</p>
              <p>This year</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">$184k</p>
              <p>Lifetime</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border bg-card p-5 lg:col-span-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              AI persona health
            </p>
            <Bot className="h-4 w-4 text-foreground" />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Knowledge coverage</span>
              <span className="text-muted-foreground">82%</span>
            </div>
            <Progress className="mt-1" value={82} />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Tone consistency</span>
              <span className="text-muted-foreground">94%</span>
            </div>
            <Progress className="mt-1" value={94} />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Conversion guidance</span>
              <span className="text-muted-foreground">67%</span>
            </div>
            <Progress className="mt-1" value={67} />
          </div>
          <Button variant="outline" className="mt-2 w-full" asChild>
            <Link href="/dashboard/persona">
              Tune AI persona <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border bg-card p-5 lg:col-span-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Top products</p>
              <p className="text-xs text-muted-foreground">
                Sorted by 30-day revenue
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/products">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 divide-y">
            {dashboardProducts.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border bg-secondary text-lg">
                    {p.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.runtime === "executable" ? "Mini SaaS · " : ""}
                      {formatCompactNumber(p.sales)} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {formatCurrency(p.price * Math.min(p.sales, 80))}
                  </p>
                  <p className="text-xs text-emerald-600">
                    +{((p.rating - 4) * 30).toFixed(0)}% vs last week
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 lg:col-span-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Recent AI chats</p>
              <p className="text-xs text-muted-foreground">
                Your AI twin handled these without you.
              </p>
            </div>
            <Badge variant="outline">87 this week</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {recentChats.map((c) => (
              <li key={c.name} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${c.seed}&backgroundColor=f5f5f5`}
                  />
                  <AvatarFallback>{initials(c.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <span className="text-[11px] text-muted-foreground">
                      {c.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.snippet}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
