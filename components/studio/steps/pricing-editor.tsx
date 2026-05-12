"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";

export function PricingEditor({
  data,
  onChange
}: {
  data: any;
  onChange: (data: any) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight">Delivery & Pricing</h2>
        <p className="mt-2 text-muted-foreground">
          Set your price and configure how buyers access this offer.
        </p>
      </div>

      <div className="space-y-6 rounded-2xl border bg-card p-6">
        <div className="space-y-2">
          <Label>Price (USD)</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl font-medium text-muted-foreground">
              $
            </span>
            <Input
              type="number"
              value={data.price}
              onChange={(e) => onChange({ price: parseFloat(e.target.value) || 0 })}
              className="h-14 border-primary pl-10 font-display text-2xl font-semibold shadow-sm focus-visible:ring-primary/20"
              min={0}
            />
          </div>
          <p className="text-xs text-muted-foreground">Stripe processing fees apply.</p>
        </div>
      </div>

      {data.runtime === "executable" && (
        <div className="space-y-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Dokploy Integration</h3>
          </div>
          <div className="space-y-2">
            <Label className="text-primary/80">GitHub Repository URL</Label>
            <Input
              value={data.repoUrl}
              onChange={(e) => onChange({ repoUrl: e.target.value })}
              placeholder="https://github.com/username/repository"
              className="border-primary/20 bg-background focus-visible:ring-primary/20"
            />
            <p className="text-xs text-primary/60">
              We will automatically clone, build, and deploy this repository to a secure edge node with auto-SSL.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
