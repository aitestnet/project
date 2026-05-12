import {
  BookOpen,
  Brain,
  FileText,
  Globe2,
  Link2,
  MessageSquareText,
  Plus,
  RefreshCw
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/dashboard/section-header";

const sources = [
  { title: "Public profile", type: "Identity", items: 24, freshness: 96, icon: Globe2 },
  { title: "Product docs", type: "Offers", items: 18, freshness: 78, icon: FileText },
  { title: "Founder notes", type: "Memory", items: 41, freshness: 64, icon: BookOpen },
  { title: "Lead conversations", type: "Audience", items: 312, freshness: 88, icon: MessageSquareText }
];

const gaps = [
  "Add short proof notes for each offer",
  "Teach persona what opportunities to reject",
  "Upload 3 stronger work samples",
  "Write a global positioning paragraph"
];

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Knowledge"
        description="The source of truth your public AI persona uses to explain you, qualify leads, and recommend offers."
        actions={
          <>
            <Button variant="outline">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync
            </Button>
            <Button>
              <Plus className="h-3.5 w-3.5" />
              Add source
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5">
          <Brain className="h-5 w-5" />
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Coverage
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">82%</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <Link2 className="h-5 w-5" />
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Sources
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">4</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <MessageSquareText className="h-5 w-5" />
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Persona answers
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">3.2k</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border bg-card p-5 lg:col-span-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Sources</p>
              <p className="text-xs text-muted-foreground">
                Keep identity, proof, offers, and memory in sync.
              </p>
            </div>
            <Badge variant="success">Ready for persona</Badge>
          </div>
          <div className="mt-4 divide-y">
            {sources.map((source) => {
              const Icon = source.icon;
              return (
                <div key={source.title} className="flex items-center gap-4 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border bg-secondary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{source.title}</p>
                      <Badge variant="outline">{source.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {source.items} knowledge objects
                    </p>
                    <Progress className="mt-2" value={source.freshness} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 lg:col-span-4">
          <p className="text-sm font-semibold">Knowledge gaps</p>
          <ul className="mt-4 space-y-3">
            {gaps.map((gap) => (
              <li key={gap} className="rounded-xl border bg-background p-3 text-sm">
                {gap}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
