import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ProfileHeader } from "@/components/identity/profile-header";
import { StatsStrip } from "@/components/identity/stats-strip";
import { ProductCard } from "@/components/identity/product-card";
import { MembershipCard } from "@/components/identity/membership-card";
import { PersonaChat } from "@/components/chat/persona-chat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { creators, memberships, products } from "@/lib/data";

type Params = { params: { username: string } };

export function generateStaticParams() {
  return Object.keys(creators).map((username) => ({ username }));
}

export function generateMetadata({ params }: Params): Metadata {
  const creator = creators[params.username];
  if (!creator) return { title: `${params.username}.ai` };
  return {
    title: `${creator.name} (${creator.username}.ai)`,
    description: creator.tagline
  };
}

export default function IdentityPage({ params }: Params) {
  const creator = creators[params.username];
  if (!creator) notFound();

  const items = products[creator.username] ?? [];
  const memb = memberships[creator.username] ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <ProfileHeader creator={creator} />
            <StatsStrip creator={creator} />

            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
                <TabsTrigger value="products">
                  Products
                  <span className="ml-1.5 rounded-full bg-violet-100 px-1.5 py-0 text-[10px] font-medium text-violet-700">
                    {items.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="memberships">Memberships</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="memberships" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {memb.map((t) => (
                    <MembershipCard key={t.id} tier={t} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-6 space-y-4">
                <div className="rounded-2xl border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    About
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                    {creator.bio}
                  </p>
                </div>
                <div className="rounded-2xl border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Expertise
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {creator.persona.expertise.map((e) => (
                      <span
                        key={e}
                        className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    AI persona tone
                  </p>
                  <p className="mt-3 text-sm text-foreground/90">
                    {creator.persona.tone}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-20">
              <PersonaChat creator={creator} />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
