import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Filter,
  Plus,
  Search,
  ShoppingBag,
  Sparkles
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";
import { db } from "@/lib/db";
import { mapProduct } from "@/lib/data-mapper";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

const fallbackProducts = [
  {
    id: "offer-ai-identity",
    title: "AI Identity Audit",
    description: "A premium review that turns scattered proof into a trusted public profile.",
    emoji: "ID",
    kind: "service",
    price: 149,
    sales: 84
  },
  {
    id: "offer-persona",
    title: "Persona Training Kit",
    description: "Templates and prompts for training a public AI persona that sells without hype.",
    emoji: "AI",
    kind: "template",
    price: 49,
    sales: 312
  },
  {
    id: "offer-founder",
    title: "Founder Trust Page",
    description: "Done-with-you identity page setup for creators, consultants, and founders.",
    emoji: "TP",
    kind: "service",
    price: 399,
    sales: 27
  }
];

const statusFor = (i: number) =>
  i % 3 === 0 ? "Live" : i % 3 === 1 ? "Draft" : "Live";

const offerBlueprint = [
  "Promise",
  "Audience",
  "Proof",
  "Price",
  "Persona routing"
];

export default async function ProductsPage() {
  let clerkUserId: string | null = null;
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const session = await auth();
    clerkUserId = session.userId;
  } catch (e) {}

  let dashboardProducts = fallbackProducts;
  try {
    let dbCreator = null;
    if (clerkUserId) {
      dbCreator = await db.creator.findUnique({
        where: { clerkUserId },
        include: { products: true }
      });
    }

    if (!dbCreator) {
      dbCreator = await db.creator.findFirst({
        where: { username: "yogi" },
        include: { products: true }
      });
    }

    if (dbCreator) {
      dashboardProducts = dbCreator.products.map(mapProduct);
    }
  } catch (error) {
    dashboardProducts = fallbackProducts;
  }
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Offers"
        description="Turn your trusted identity into paid products, services, memberships, and AI-assisted recommendations."
        actions={
          <>
            <Button variant="outline">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </Button>
            <Button asChild>
              <Link href="/dashboard/products/new">
                <Plus className="h-3.5 w-3.5" />
                New offer
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border bg-card p-5 lg:col-span-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="success">
                <ShoppingBag className="mr-1 h-3 w-3" />
                Commerce layer
              </Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                Offers should be identity-native, not design-canvas-first.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Each offer needs a promise, proof, price, target audience, and rules
                for when your AI persona should recommend it.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/persona">
                Persona routing <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {offerBlueprint.map((item) => (
              <div key={item} className="rounded-xl border bg-background p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <p className="mt-2 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-secondary/40 p-5 lg:col-span-4">
          <Sparkles className="h-5 w-5" />
          <h3 className="mt-3 font-semibold">Replace product builder with offer builder</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate copy, checkout structure, proof blocks, and AI recommendation
            logic. Keep visual design simple and conversion-focused.
          </p>
        </section>
      </div>

      <div className="flex items-center gap-2 rounded-xl border bg-card p-2">
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search offers..."
          className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
        <Badge variant="outline">{dashboardProducts.length} items</Badge>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid grid-cols-12 gap-2 border-b bg-secondary/40 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-5">Offer</div>
          <div className="col-span-2">Format</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Customers</div>
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
                <Badge variant="outline">{p.kind}</Badge>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="font-semibold">AI persona recommendation rules</p>
            <p className="text-sm text-muted-foreground">
              Define when the persona should recommend an offer, ask a qualifying
              question, or route a lead to you.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/agents">
              Configure permissions <Bot className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
