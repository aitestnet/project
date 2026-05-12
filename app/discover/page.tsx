import * as React from "react";
import { Search, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DiscoverClient } from "./discover-client";

type DiscoverCreatorRow = {
  username: string;
  name: string;
  avatar: string;
  tagline: string;
  niche: string;
  followers: number;
  verified: boolean;
  products: Array<{ title: string }>;
};

export default async function DiscoverPage() {
  const dbCreators = await db.creator.findMany({
    include: { products: { orderBy: { sales: "desc" }, take: 1 } },
    orderBy: { followers: "desc" }
  });

  const discoverCreators = dbCreators.map((c: DiscoverCreatorRow) => ({
    username: c.username,
    name: c.name,
    avatar: c.avatar,
    tagline: c.tagline,
    niche: c.niche,
    followers: c.followers,
    verified: c.verified,
    topProduct: c.products[0]?.title ?? "Digital Products",
    color: "#f5f5f5"
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full text-[11px] font-medium">
              <Sparkles className="mr-1 h-3 w-3" />
              Discover
            </Badge>
            <h1 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] md:text-[40px]">
              Find creators with AI twins you can chat with.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Explore identity pages, clone workflows, and join memberships from
              builders across the world.
            </p>
          </div>
        </section>
        <DiscoverClient initialCreators={discoverCreators} />
      </main>
      <Footer />
    </div>
  );
}
