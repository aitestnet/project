"use client";

import * as React from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Creator } from "@/lib/types";
import { cn, initials } from "@/lib/utils";

type Msg = { id: string; role: "user" | "assistant"; content: string };

export function PersonaChat({ creator }: { creator: Creator }) {
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      id: "intro",
      role: "assistant",
      content: creator.persona.greeting
    }
  ]);
  const [input, setInput] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending]);

  async function send(message: string) {
    const text = message.trim();
    if (!text || pending) return;
    setInput("");
    const userMsg: Msg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text
    };
    const aiId = crypto.randomUUID();
    setMessages((m) => [
      ...m,
      userMsg,
      { id: aiId, role: "assistant", content: "" }
    ]);
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: creator.username,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });
      if (!res.ok || !res.body) throw new Error("Network");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((curr) =>
          curr.map((m) => (m.id === aiId ? { ...m, content: acc } : m))
        );
      }
    } catch {
      setMessages((curr) =>
        curr.map((m) =>
          m.id === aiId
            ? {
                ...m,
                content:
                  "Sorry, my AI twin is offline. Try one of the suggested prompts."
              }
            : m
        )
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex h-[640px] flex-col overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{initials(creator.name)}</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-card">
              <span className="block h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold leading-tight">
              {creator.name}'s AI twin
              <Badge variant="soft" className="rounded-full px-1.5 py-0 text-[10px]">
                <Sparkles className="mr-0.5 h-2.5 w-2.5" />
                AI
              </Badge>
            </p>
            <p className="text-xs text-muted-foreground">
              {creator.persona.tone}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="rounded-full">
          <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Online
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} creator={creator} />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t bg-secondary/30 px-3 py-2">
        <div className="flex flex-wrap gap-1.5">
          {creator.persona.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={pending}
              className="rounded-full border bg-background px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t bg-background p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask ${creator.name.split(" ")[0]}'s AI twin anything…`}
          className="flex-1 rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-1"
          disabled={pending}
        />
        <Button
          type="submit"
          variant="gradient"
          size="icon"
          className="h-10 w-10 rounded-lg"
          disabled={pending || !input.trim()}
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function Bubble({ msg, creator }: { msg: Msg; creator: Creator }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "flex items-end gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-7 w-7">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>
            <Bot className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
          isUser
            ? "rounded-br-md bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white"
            : "rounded-bl-md bg-secondary text-foreground"
        )}
      >
        {msg.content || (
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
          </span>
        )}
      </div>
      {isUser && (
        <Avatar className="h-7 w-7">
          <AvatarFallback>
            <User className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}

