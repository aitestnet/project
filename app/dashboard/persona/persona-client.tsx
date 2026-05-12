"use client";

import * as React from "react";
import { Bot, Brain, FileText, Plus, Save, Sparkles, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/dashboard/section-header";
import type { Creator } from "@/lib/types";

export function PersonaClient({ creator }: { creator: Creator }) {
  const [tone, setTone] = React.useState(creator.persona.tone);
  const [greeting, setGreeting] = React.useState(creator.persona.greeting);
  const [aiSell, setAiSell] = React.useState(true);
  const [aiSupport, setAiSupport] = React.useState(true);
  const [aiOnboard, setAiOnboard] = React.useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="AI Persona"
        description="Train the AI twin that represents you on your identity page."
        actions={
          <>
            <Button variant="outline">
              <Sparkles className="h-3.5 w-3.5" />
              Test in chat
            </Button>
            <Button>
              <Save className="h-3.5 w-3.5" />
              Save persona
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Identity</p>
              <Badge variant="outline">
                <Bot className="mr-1 h-3 w-3" /> v1.2
              </Badge>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Display name</Label>
                <Input defaultValue={creator.name} />
              </div>
              <div className="space-y-2">
                <Label>Handle</Label>
                <div className="flex h-10 items-center rounded-lg border bg-background px-3">
                  <span className="text-sm">{creator.username}</span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    .ai
                  </span>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Tone & voice</Label>
                <Input value={tone} onChange={(e) => setTone(e.target.value)} />
                <p className="text-xs text-muted-foreground">
                  Used to align AI replies with how you naturally speak.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Greeting</Label>
                <Textarea
                  rows={3}
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Knowledge sources</p>
                <p className="text-xs text-muted-foreground">
                  Drop notes, PDFs, links, or repos to teach your AI persona.
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-3.5 w-3.5" />
                Add source
              </Button>
            </div>
            <div className="mt-4 divide-y">
              {[
                { name: "AI playbook.md", type: "Markdown", size: "182 KB" },
                { name: "Pricing & FAQs.notion", type: "Notion", size: "Synced" }
              ].map((k) => (
                <div key={k.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border bg-secondary text-foreground">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{k.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {k.type} · {k.size}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Indexed
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full" size="sm">
              <Upload className="h-3.5 w-3.5" />
              Upload more files
            </Button>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Health</p>
              <Brain className="h-4 w-4 text-foreground" />
            </div>
            <div className="mt-4 space-y-4 text-sm">
              <Row label="Knowledge coverage" value={82} />
              <Row label="Tone consistency" value={94} />
              <Row label="Conversion guidance" value={67} />
              <Row label="Safety filters" value={100} />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm font-semibold">Capabilities</p>
            <p className="text-xs text-muted-foreground">
              Toggle what your AI persona can do automatically.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <Toggle
                label="Recommend & upsell products"
                description="Match visitor intent to the best product."
                checked={aiSell}
                onChange={setAiSell}
              />
              <Toggle
                label="Answer support questions"
                description="Use your knowledge base to reply 24/7."
                checked={aiSupport}
                onChange={setAiSupport}
              />
              <Toggle
                label="Onboard members"
                description="Walk new members through perks and resources."
                checked={aiOnboard}
                onChange={setAiOnboard}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm font-semibold">Preview</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={creator.avatar} />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{creator.name}&rsquo;s AI twin</p>
                <p className="text-xs text-muted-foreground">
                  Will say: <span className="italic">&ldquo;{greeting}&rdquo;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress className="mt-1" value={value} />
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border bg-background p-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
