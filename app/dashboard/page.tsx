import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Fingerprint,
  Globe2,
  KeyRound,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Users
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { db } from "@/lib/db";
import { mapCreator } from "@/lib/data-mapper";

const fallbackCreator = {
  name: "Yogi Pradana",
  username: "yogi",
  productCount: 4
};

const proofItems = [
  { label: "Public identity", status: "Live", score: 100 },
  { label: "Social proof", status: "Connected", score: 84 },
  { label: "Work samples", status: "Needs 2 more", score: 58 },
  { label: "Credential vault", status: "Draft", score: 32 }
];

const identityLoop = [
  "Publish verified AI identity",
  "Train persona with knowledge",
  "Qualify leads and recommend offers",
  "Let agents act with approval logs"
];

const agentPermissions = [
  "Answer public questions",
  "Draft lead replies",
  "Recommend offers",
  "Request human approval before sending"
];

export default async function DashboardPage() {
  let clerkUserId: string | null = null;
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const session = await auth();
    clerkUserId = session.userId;
  } catch (e) {}

  let creator = fallbackCreator;
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
      const mappedCreator = mapCreator(dbCreator);
      creator = {
        name: mappedCreator.name,
        username: mappedCreator.username,
        productCount: dbCreator.products.length
      };
    }
  } catch (error) {
    creator = fallbackCreator;
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`${creator.name}'s AI identity`}
        description="Build one trusted global profile for your persona, proof, products, audience, and future agents."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href={`/${creator.username}`}>
                <Globe2 className="h-3.5 w-3.5" />
                Public identity
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/proof">
                <ShieldCheck className="h-3.5 w-3.5" />
                Improve trust
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Trust score"
          value="76/100"
          delta="+12 this month"
          icon={Fingerprint}
        />
        <StatCard
          label="Persona readiness"
          value="82%"
          delta="Knowledge trained"
          icon={Bot}
        />
        <StatCard
          label="Qualified leads"
          value="418"
          delta="+24%"
          icon={Users}
        />
        <StatCard
          label="Published offers"
          value={`${creator.productCount}`}
          delta="Commerce ready"
          icon={ShoppingBag}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border bg-card p-5 lg:col-span-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Badge variant="success">
                <BadgeCheck className="mr-1 h-3 w-3" />
                Identity live
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                {creator.username}.ai should become the trust page people send before a call.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Teskel is strongest when it proves who you are, lets your AI persona
                explain your value, and turns that trust into products, leads, and
                permissioned agent actions.
              </p>
            </div>
            <div className="rounded-xl border bg-secondary/40 p-4 text-sm">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Global positioning
              </p>
              <p className="mt-2 font-medium">AI-native identity for work and commerce.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {identityLoop.map((item, index) => (
              <div key={item} className="rounded-xl border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground">
                  0{index + 1}
                </span>
                <p className="mt-2 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 lg:col-span-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Proof graph</p>
              <p className="text-xs text-muted-foreground">
                Signals that make the public identity believable.
              </p>
            </div>
            <Badge variant="outline">4 layers</Badge>
          </div>
          <div className="mt-4 space-y-4">
            {proofItems.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.status}</span>
                </div>
                <Progress value={item.score} />
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-5 w-full" asChild>
            <Link href="/dashboard/proof">
              Open proof center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border bg-card p-5 lg:col-span-4">
          <Bot className="h-5 w-5" />
          <h3 className="mt-3 font-semibold">AI persona</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your public AI should answer like you, qualify opportunities, and route
            people to the right offer.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/persona">Tune persona</Link>
          </Button>
        </section>

        <section className="rounded-2xl border bg-card p-5 lg:col-span-4">
          <MessageSquare className="h-5 w-5" />
          <h3 className="mt-3 font-semibold">Audience inbox</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Leads, buyers, and chat history become identity data, not scattered
            messages across platforms.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/audience">Review leads</Link>
          </Button>
        </section>

        <section className="rounded-2xl border bg-card p-5 lg:col-span-4">
          <KeyRound className="h-5 w-5" />
          <h3 className="mt-3 font-semibold">Agent permissions</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {agentPermissions.map((permission) => (
              <li key={permission}>- {permission}</li>
            ))}
          </ul>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/agents">Manage agents</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
