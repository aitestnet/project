import { Activity, ArrowUpRight, MessageSquare, MousePointerClick, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Sparkline } from "@/components/dashboard/sparkline";

const visitorsSeries = [120, 150, 132, 174, 198, 210, 240, 230, 286, 312, 290, 345, 380, 412];
const chatsSeries = [22, 28, 31, 30, 41, 49, 55, 62, 58, 71, 74, 88, 102, 110];
const conversions = [
  { product: "AI SEO Tool", visits: 4210, chats: 612, sales: 84, rate: "13.7%" },
  { product: "Founder Prompt Pack", visits: 6210, chats: 740, sales: 168, rate: "22.7%" },
  { product: "Resume Builder", visits: 3120, chats: 380, sales: 54, rate: "14.2%" },
  { product: "Indie Founder Membership", visits: 2010, chats: 460, sales: 110, rate: "23.9%" }
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Analytics"
        description="Powered by PostHog + Plausible. Track visits, chats, and conversions."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Visitors (30d)" value="42,180" delta="+18%" icon={Users} />
        <StatCard label="AI chats (30d)" value="3,214" delta="+24%" icon={MessageSquare} />
        <StatCard label="CTR to checkout" value="6.8%" delta="+1.2pt" icon={MousePointerClick} />
        <StatCard label="AI-assisted GMV" value="$11.4k" delta="+32%" icon={Activity} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Page visits</p>
              <p className="text-xs text-muted-foreground">Last 14 days</p>
            </div>
            <Badge variant="success">+18%</Badge>
          </div>
          <Sparkline data={visitorsSeries} />
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">AI chat sessions</p>
              <p className="text-xs text-muted-foreground">Last 14 days</p>
            </div>
            <Badge variant="success">+24%</Badge>
          </div>
          <Sparkline data={chatsSeries} color="#d946ef" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="border-b px-5 py-4">
          <p className="text-sm font-semibold">Product funnel</p>
          <p className="text-xs text-muted-foreground">
            From page view → AI chat → checkout completion.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-2 border-b bg-secondary/40 px-5 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-2">Product</div>
          <div>Visits</div>
          <div>Chats</div>
          <div>Sales</div>
          <div className="text-right">Conv. rate</div>
        </div>
        <div className="divide-y">
          {conversions.map((c) => (
            <div
              key={c.product}
              className="grid grid-cols-6 items-center gap-2 px-5 py-3 text-sm hover:bg-secondary/40"
            >
              <div className="col-span-2 font-medium">{c.product}</div>
              <div>{c.visits.toLocaleString()}</div>
              <div>{c.chats.toLocaleString()}</div>
              <div>{c.sales.toLocaleString()}</div>
              <div className="flex items-center justify-end gap-1 text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                {c.rate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
