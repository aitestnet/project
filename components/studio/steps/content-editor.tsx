"use client";

import * as React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "@/components/studio/tiptap-editor";

export function ContentEditor({
  data,
  onChange
}: {
  data: any;
  onChange: (data: any) => void;
}) {
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState("");

  const handleAiSuggest = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);

    try {
      const res = await fetch("/api/ai/generate-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          creatorName: "Creator",
          creatorNiche: "tech"
        })
      });

      const suggestion = await res.json();

      if (suggestion && !suggestion.error) {
        onChange({
          title: suggestion.title || data.title,
          emoji: suggestion.emoji || data.emoji,
          description: suggestion.description || data.description,
          ...(suggestion.price ? { price: suggestion.price } : {}),
          ...(suggestion.kind ? { kind: suggestion.kind } : {})
        });
      }
    } catch (err) {
      console.error("AI suggestion failed:", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight">Offer identity</h2>
        <p className="mt-2 text-muted-foreground">
          Give the offer a clear promise, proof-backed description, and buyer-ready positioning.
        </p>
      </div>

      {/* AI Magic Suggest */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">AI Magic Write</span>
        </div>
        <div className="flex gap-2">
          <Input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe your offer, e.g. 'AI identity audit for solo founders'..."
            className="border-primary/20 bg-background/80 text-sm focus-visible:ring-primary/20"
            onKeyDown={(e) => e.key === "Enter" && handleAiSuggest()}
          />
          <Button
            onClick={handleAiSuggest}
            disabled={aiLoading || !aiPrompt.trim()}
            size="sm"
            className="shrink-0"
          >
            {aiLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Generate
              </>
            )}
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-primary/50">
          AI will fill in the title, emoji, description, and suggest a price.
        </p>
      </div>

      {/* Manual Form */}
      <div className="space-y-6 rounded-2xl border bg-card p-6">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 space-y-2">
            <Label>Emoji</Label>
            <Input
              value={data.emoji}
              onChange={(e) => onChange({ emoji: e.target.value })}
              className="text-center text-2xl"
              maxLength={2}
            />
          </div>
          <div className="col-span-4 space-y-2">
            <Label>Title</Label>
            <Input
              value={data.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="e.g. AI Identity Audit"
              className="h-11 font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <TiptapEditor
            content={data.description}
            onChange={(html) => onChange({ description: html })}
            placeholder="Describe the outcome, proof, and what buyers will get..."
          />
        </div>
      </div>
    </div>
  );
}
