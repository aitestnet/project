import { ArrowDownToLine, Banknote, CreditCard, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

type PayoutOrder = {
  id: string;
  amount: number;
  status: string;
  paymentProvider: string;
  createdAt: Date;
};

export default async function PayoutsPage() {
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

  const orders: PayoutOrder[] = creatorId
    ? await db.order.findMany({
        where: { product: { creatorId } },
        orderBy: { createdAt: "desc" },
        take: 50
      })
    : [];

  const totalAmount = orders.reduce((sum: number, o: PayoutOrder) => sum + o.amount, 0) / 100;
  const pendingAmount =
    orders
      .filter((o: PayoutOrder) => o.status === "pending")
      .reduce((sum: number, o: PayoutOrder) => sum + o.amount, 0) / 100;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Payouts"
        description="Stripe, Lemon Squeezy, and Polar — unified."
        actions={
          <Button>
            <ArrowDownToLine className="h-3.5 w-3.5" />
            Withdraw
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Available" value={formatCurrency(totalAmount - pendingAmount)} icon={Wallet} />
        <StatCard label="Pending" value={formatCurrency(pendingAmount)} icon={Banknote} />
        <StatCard label="Paid out (30d)" value={formatCurrency(totalAmount)} icon={CreditCard} delta="+18%" />
        <StatCard label="Lifetime" value={formatCurrency(totalAmount)} icon={Wallet} />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid grid-cols-12 gap-2 border-b bg-secondary/40 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-3">Payout</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-3">Method</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        <div className="divide-y">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No payouts yet. Your sales will appear here.
            </div>
          ) : (
            orders.map((p: PayoutOrder) => (
              <div
                key={p.id}
                className="grid grid-cols-12 items-center gap-2 px-4 py-3 hover:bg-secondary/40"
              >
                <div className="col-span-3 font-mono text-sm truncate">{p.id}</div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" }).format(new Date(p.createdAt))}
                </div>
                <div className="col-span-3 text-sm capitalize">{p.paymentProvider}</div>
                <div className="col-span-2 text-sm font-medium">{formatCurrency(p.amount / 100)}</div>
                <div className="col-span-2 flex justify-end">
                  <Badge variant="outline">
                    {p.status === "completed" && <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                    {p.status === "pending" && <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />}
                    <span className="capitalize">{p.status}</span>
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
