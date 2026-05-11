import {
  ArrowUpRight,
  Cpu,
  Filter,
  MoreHorizontal,
  Plus,
  Search
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";
import { dashboardProducts } from "@/lib/data";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

const statusFor = (i: number) =>
  i % 3 === 0 ? "Live" : i % 3 === 1 ? "Draft" : "Live";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Products"
        description="Ship digital products, memberships, and live mini SaaS."
        actions={
          <>
            <Button variant="outline">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </Button>
            <Button>
              <Plus className="h-3.5 w-3.5" />
              New product
            </Button>
          </>
        }
      />

      <div className="flex items-center gap-2 rounded-xl border bg-card p-2">
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search products…"
          className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
        <Badge variant="outline">{dashboardProducts.length} items</Badge>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid grid-cols-12 gap-2 border-b bg-secondary/40 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-5">Product</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Sales</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        <div className="divide-y">
          {dashboardProducts.map((p, i) => (
            <div
              key={p.id}
              className="grid grid-cols-12 items-center gap-2 px-4 py-3 transition-colors hover:bg-secondary/40"
            >
              <div className="col-span-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary text-lg">
                  {p.emoji}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </div>
              <div className="col-span-2 text-sm">
                {p.runtime === "executable" ? (
                  <Badge variant="outline">
                    <Cpu className="mr-1 h-3 w-3" />
                    Mini SaaS
                  </Badge>
                ) : (
                  <Badge variant="outline">{p.kind}</Badge>
                )}
              </div>
              <div className="col-span-2 text-sm font-medium">
                {formatCurrency(p.price)}
              </div>
              <div className="col-span-2 text-sm">
                {formatCompactNumber(p.sales)}
              </div>
              <div className="col-span-1 flex items-center justify-end gap-1">
                {statusFor(i) === "Live" ? (
                  <Badge variant="outline">
                    <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Live
                  </Badge>
                ) : (
                  <Badge variant="outline">Draft</Badge>
                )}
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="font-semibold">Ship a live mini SaaS</p>
            <p className="text-sm text-muted-foreground">
              Push a repo → Teskel deploys it with auto SSL and a subdomain via
              Dokploy.
            </p>
          </div>
          <Button>
            Connect GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
