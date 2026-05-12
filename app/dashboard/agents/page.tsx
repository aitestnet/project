import {
  AlertCircle,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  MessageSquare,
  Send,
  ShieldCheck,
  UserCheck
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";

const agents = [
  {
    name: "Public identity concierge",
    status: "Active",
    description: "Answers profile visitors and recommends relevant offers.",
    permissions: ["Read knowledge", "Recommend offers", "Capture leads"]
  },
  {
    name: "Lead follow-up drafter",
    status: "Approval required",
    description: "Drafts responses for high-intent leads without sending automatically.",
    permissions: ["Read inbox", "Draft replies", "Ask before send"]
  },
  {
    name: "Offer strategist",
    status: "Draft",
    description: "Finds product gaps from audience questions and proof signals.",
    permissions: ["Analyze chats", "Suggest offers", "No external actions"]
  }
];

const audit = [
  "Persona answered visitor question",
  "Lead reply drafted, awaiting approval",
  "Offer recommendation shown",
  "Knowledge gap detected"
];

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Agents"
        description="Give AI agents a scoped identity, permissions, and approval trail before they act for you."
        actions={
          <>
            <Button variant="outline">
              <ShieldCheck className="h-3.5 w-3.5" />
              Permission policy
            </Button>
            <Button>
              <KeyRound className="h-3.5 w-3.5" />
              New agent
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border bg-card p-6 lg:col-span-8">
          <Badge variant="warning">
            <LockKeyhole className="mr-1 h-3 w-3" />
            Human approval by default
          </Badge>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Agents should inherit identity, not pretend to be invisible automation.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Teskel can win by making every agent action traceable: who it represents,
            what it can read, what it can write, and when it must ask for approval.
          </p>
        </section>

        <section className="rounded-2xl border bg-card p-6 lg:col-span-4">
          <p className="text-sm font-semibold">Permission model</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Read-only by default
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              Human approval before sending
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              Risky actions logged
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {agents.map((agent) => (
          <article key={agent.name} className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border bg-secondary">
                <KeyRound className="h-4 w-4" />
              </span>
              <Badge variant={agent.status === "Active" ? "success" : "outline"}>
                {agent.status}
              </Badge>
            </div>
            <h2 className="mt-4 font-semibold">{agent.name}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {agent.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {agent.permissions.map((permission) => (
                <Badge key={permission} variant="outline">
                  {permission}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Recent agent audit trail</p>
            <p className="text-xs text-muted-foreground">
              Every action should be attributable to an agent and permission.
            </p>
          </div>
          <Button variant="outline" size="sm">
            View full log
          </Button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {audit.map((item, index) => (
            <div key={item} className="rounded-xl border bg-background p-3 text-sm">
              <div className="mb-2 flex items-center gap-2">
                {index === 1 ? (
                  <Send className="h-4 w-4" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
                <span className="text-xs text-muted-foreground">Event {index + 1}</span>
              </div>
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
