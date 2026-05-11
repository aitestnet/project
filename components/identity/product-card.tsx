import {
  ArrowUpRight,
  Cpu,
  Download,
  ShoppingCart,
  Star
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";

const kindLabel: Record<Product["kind"], string> = {
  ebook: "eBook",
  "prompt-pack": "Prompt pack",
  "ai-workflow": "AI workflow",
  template: "Template",
  "mini-saas": "Mini SaaS",
  membership: "Membership",
  dataset: "Dataset",
  automation: "Automation"
};

export function ProductCard({ product }: { product: Product }) {
  const isLive = product.runtime === "executable";
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className="relative flex h-28 items-center justify-center border-b bg-secondary">
        <span className="text-4xl">{product.emoji}</span>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          <Badge variant="outline" className="bg-background/80 backdrop-blur">
            {kindLabel[product.kind]}
          </Badge>
          {product.badges?.map((b) => (
            <Badge
              key={b}
              variant="outline"
              className="bg-background/80 backdrop-blur"
            >
              {b}
            </Badge>
          ))}
        </div>
        {isLive && (
          <Badge
            variant="outline"
            className="absolute right-3 top-3 bg-background/80 backdrop-blur"
          >
            <Cpu className="mr-1 h-3 w-3" />
            Live
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{product.title}</h3>
          <p className="font-display text-base font-semibold">
            {formatCurrency(product.price)}
          </p>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(2)} · {formatCompactNumber(product.sales)}{" "}
            sold
          </span>
          {isLive && product.liveUrl && (
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-foreground hover:underline"
            >
              {product.liveUrl.replace(/^https?:\/\//, "")}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button size="sm" className="flex-1">
            <ShoppingCart className="h-3.5 w-3.5" />
            {isLive ? "Get access" : "Buy now"}
          </Button>
          <Button size="icon" variant="outline" aria-label="Preview">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
