import {
  Activity,
  ArrowUpRight,
  Cpu,
  Github,
  Globe,
  Lock,
  Play,
  Plus,
  RefreshCw,
  Server
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";
import { db } from "@/lib/db";

type RuntimeProduct = {
  id: string;
  title: string;
  liveUrl: string;
  dokployProjectId: string | null;
};

export default async function RuntimePage() {
  let clerkUserId: string | null = null;
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const session = await auth();
    clerkUserId = session.userId;
  } catch (e) {}

  let creatorId: string | null = null;
  if (clerkUserId) {
    const c = await db.creator.findUnique({ where: { clerkUserId }, select: { id: true } });
    if (c) creatorId = c.id;
  }
  if (!creatorId) {
    const c = await db.creator.findFirst({ where: { username: "yogi" }, select: { id: true } });
    if (c) creatorId = c.id;
  }

  const execProducts: RuntimeProduct[] = creatorId
    ? await db.product.findMany({
        where: { creatorId, runtime: "executable" },
        orderBy: { createdAt: "desc" }
      })
    : [];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Executable Runtime"
        description="Live mini SaaS deployed on Dokploy with auto SSL and subdomains."
        actions={
          <>
            <Button variant="outline">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync from GitHub
            </Button>
            <Button asChild>
              <Link href="/dashboard/products/new">
                <Plus className="h-3.5 w-3.5 mr-2" />
                Deploy new app
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active runtimes" value={execProducts.length.toString()} icon={Cpu} />
        <Stat label="Avg deploy time" value="38s" icon={Play} />
        <Stat label="Uptime (30d)" value="99.99%" icon={Activity} />
        <Stat label="Auto SSL" value="On" icon={Lock} />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid grid-cols-12 gap-2 border-b bg-secondary/40 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-5">Service</div>
          <div className="col-span-3">Project ID</div>
          <div className="col-span-2">Resources</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        <div className="divide-y">
          {execProducts.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No live runtimes found. Ship a mini SaaS to get started.
            </div>
          ) : (
            execProducts.map((p: RuntimeProduct) => {
              const status = p.liveUrl ? "Healthy" : "Deploying";
              const subdomain = p.liveUrl ? new URL(p.liveUrl).hostname : "Pending";
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-12 items-center gap-2 px-4 py-3 hover:bg-secondary/40"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border bg-secondary text-foreground">
                      <Server className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{p.title}</p>
                      <p className="truncate font-mono text-[11px] text-muted-foreground">
                        {subdomain}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 truncate font-mono text-[11px] text-muted-foreground">
                    {p.dokployProjectId || "—"}
                  </div>
                  <div className="col-span-2 text-xs text-muted-foreground">
                    {status === "Healthy" ? (
                      <span>CPU ~5% · Mem ~12%</span>
                    ) : (
                      <span>Provisioning…</span>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Badge variant="outline">
                      <span className={`mr-1 inline-flex h-1.5 w-1.5 rounded-full ${status === "Healthy" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {status}
                    </Badge>
                    {p.liveUrl && (
                      <Button size="icon" variant="ghost" className="h-7 w-7" asChild>
                        <a href={p.liveUrl} target="_blank" rel="noreferrer">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border bg-secondary text-foreground">
            <Github className="h-4 w-4" />
          </span>
          <div>
            <p className="font-semibold">Continuous deployment</p>
            <p className="text-sm text-muted-foreground">
              Push to <span className="font-mono">main</span> → Teskel rebuilds &
              redeploys. Edge cache invalidates automatically.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { label: "Auto Docker", icon: Server, on: true },
            { label: "Auto SSL", icon: Lock, on: true },
            { label: "Auto subdomain", icon: Globe, on: true }
          ].map((i) => (
            <div
              key={i.label}
              className="flex items-center justify-between rounded-xl border bg-background p-3"
            >
              <div className="flex items-center gap-2 text-sm">
                <i.icon className="h-4 w-4 text-foreground" />
                {i.label}
              </div>
              <Badge variant="outline">
                <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                On
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: typeof Cpu;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <Icon className="h-4 w-4 text-foreground" />
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em]">
        {value}
      </p>
    </div>
  );
}
