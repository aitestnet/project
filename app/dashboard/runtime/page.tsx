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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";

const runtimes = [
  {
    name: "AI SEO Tool",
    subdomain: "seo.yogi.ai",
    status: "Healthy",
    region: "sgp1",
    image: "ghcr.io/yogi/seo-tool:v1.4.2",
    cpu: 24,
    mem: 38,
    uptime: "99.98%"
  },
  {
    name: "Resume Builder",
    subdomain: "resume.yogi.ai",
    status: "Healthy",
    region: "fra1",
    image: "ghcr.io/yogi/resume:v0.9.0",
    cpu: 12,
    mem: 19,
    uptime: "99.99%"
  },
  {
    name: "Sales Coach",
    subdomain: "coach.yogi.ai",
    status: "Deploying",
    region: "sgp1",
    image: "ghcr.io/yogi/coach:v2.1.0",
    cpu: 0,
    mem: 0,
    uptime: "—"
  }
];

export default function RuntimePage() {
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
            <Button variant="gradient">
              <Plus className="h-3.5 w-3.5" />
              Deploy new app
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active runtimes" value="5" icon={Cpu} />
        <Stat label="Avg deploy time" value="38s" icon={Play} />
        <Stat label="Uptime (30d)" value="99.99%" icon={Activity} />
        <Stat label="Auto SSL" value="On" icon={Lock} />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid grid-cols-12 gap-2 border-b bg-secondary/40 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-4">Service</div>
          <div className="col-span-3">Image</div>
          <div className="col-span-1">Region</div>
          <div className="col-span-2">Resources</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        <div className="divide-y">
          {runtimes.map((r) => (
            <div
              key={r.subdomain}
              className="grid grid-cols-12 items-center gap-2 px-4 py-3 hover:bg-secondary/40"
            >
              <div className="col-span-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-700">
                  <Server className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {r.subdomain}
                  </p>
                </div>
              </div>
              <div className="col-span-3 truncate font-mono text-[11px] text-muted-foreground">
                {r.image}
              </div>
              <div className="col-span-1 text-xs">{r.region}</div>
              <div className="col-span-2 text-xs text-muted-foreground">
                {r.status === "Healthy" ? (
                  <span>
                    CPU {r.cpu}% · Mem {r.mem}%
                  </span>
                ) : (
                  <span>Provisioning…</span>
                )}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                {r.status === "Healthy" ? (
                  <Badge variant="success">{r.status}</Badge>
                ) : (
                  <Badge variant="warning">{r.status}</Badge>
                )}
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
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
                <i.icon className="h-4 w-4 text-violet-600" />
                {i.label}
              </div>
              <Badge variant="success">On</Badge>
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
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <Icon className="h-4 w-4 text-violet-600" />
      </div>
      <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}
