import {
  BadgeCheck,
  ExternalLink,
  FileCheck2,
  Github,
  Globe2,
  Linkedin,
  ShieldCheck,
  Star
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/dashboard/section-header";

const proofSources = [
  {
    title: "Public links",
    description: "Website, portfolio, media, and canonical profile links.",
    icon: Globe2,
    status: "Connected",
    score: 92
  },
  {
    title: "Work proof",
    description: "Projects, launches, revenue screenshots, demos, and client outcomes.",
    icon: FileCheck2,
    status: "Needs review",
    score: 58
  },
  {
    title: "Social graph",
    description: "GitHub, LinkedIn, X, YouTube, newsletter, and community presence.",
    icon: Linkedin,
    status: "2 connected",
    score: 74
  },
  {
    title: "Testimonials",
    description: "Customer quotes, buyer notes, references, and endorsements.",
    icon: Star,
    status: "Draft",
    score: 38
  }
];

const credentials = [
  "Founder identity verified",
  "Primary domain connected",
  "GitHub proof pending",
  "LinkedIn proof pending",
  "W3C credential export planned"
];

export default function ProofPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Proof center"
        description="Build the trust graph behind your public AI identity."
        actions={
          <>
            <Button variant="outline">
              <ExternalLink className="h-3.5 w-3.5" />
              Connect source
            </Button>
            <Button>
              <ShieldCheck className="h-3.5 w-3.5" />
              Verify proof
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border bg-card p-6 lg:col-span-5">
          <Badge variant="success">
            <BadgeCheck className="mr-1 h-3 w-3" />
            Trust score
          </Badge>
          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-6xl font-semibold tracking-tight">
              76
            </span>
            <span className="pb-2 text-sm text-muted-foreground">/ 100</span>
          </div>
          <Progress className="mt-4" value={76} />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Teskel should make proof portable: useful on your public page today,
            and compatible with verifiable credential standards later.
          </p>
        </section>

        <section className="rounded-2xl border bg-card p-6 lg:col-span-7">
          <p className="text-sm font-semibold">Credential roadmap</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {credentials.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {proofSources.map((source) => {
          const Icon = source.icon;
          return (
            <article key={source.title} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5" />
                <Badge variant="outline">{source.status}</Badge>
              </div>
              <h2 className="mt-4 font-semibold">{source.title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {source.description}
              </p>
              <Progress className="mt-4" value={source.score} />
            </article>
          );
        })}
      </div>

      <div className="rounded-2xl border bg-secondary/40 p-5">
        <div className="flex items-center gap-3">
          <Github className="h-5 w-5" />
          <div>
            <p className="font-semibold">Next best connection: GitHub proof</p>
            <p className="text-sm text-muted-foreground">
              Import public repositories, contribution signals, and selected work
              samples into the proof graph.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
