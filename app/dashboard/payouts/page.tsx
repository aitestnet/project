import { ArrowDownToLine, Banknote, CreditCard, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";

const payouts = [
  { id: "po_8821", date: "Apr 04", method: "Stripe", amount: "$2,140.00", status: "Paid" },
  { id: "po_8782", date: "Mar 21", method: "Lemon", amount: "$1,820.00", status: "Paid" },
  { id: "po_8721", date: "Mar 07", method: "Stripe", amount: "$1,260.00", status: "Paid" },
  { id: "po_8654", date: "Feb 22", method: "Polar", amount: "$640.00", status: "Paid" },
  { id: "po_8612", date: "Feb 08", method: "Stripe", amount: "$2,810.00", status: "Paid" }
];

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Payouts"
        description="Stripe, Lemon Squeezy, and Polar — unified."
        actions={
          <Button variant="gradient">
            <ArrowDownToLine className="h-3.5 w-3.5" />
            Withdraw
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Available" value="$4,210.00" icon={Wallet} />
        <StatCard label="Pending" value="$840.50" icon={Banknote} />
        <StatCard label="Paid out (30d)" value="$11,260.00" icon={CreditCard} delta="+18%" />
        <StatCard label="Lifetime" value="$184,320.00" icon={Wallet} />
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
          {payouts.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 items-center gap-2 px-4 py-3 hover:bg-secondary/40"
            >
              <div className="col-span-3 font-mono text-sm">{p.id}</div>
              <div className="col-span-2 text-sm text-muted-foreground">
                {p.date}
              </div>
              <div className="col-span-3 text-sm">{p.method}</div>
              <div className="col-span-2 text-sm font-medium">{p.amount}</div>
              <div className="col-span-2 flex justify-end">
                <Badge variant="success">{p.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
