import { ArrowRight, Box, Bot, Globe, Plug } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Claim username.ai",
    description:
      "Pick a handle and get a beautiful identity page. Use a custom domain if you want."
  },
  {
    icon: Bot,
    title: "Train your AI persona",
    description:
      "Drop notes, links, or files. Your AI twin learns your tone, expertise, and offers."
  },
  {
    icon: Box,
    title: "Publish products",
    description:
      "Add ebooks, prompts, workflows, memberships — or upload a repo for a live mini SaaS."
  },
  {
    icon: Plug,
    title: "Connect commerce",
    description:
      "Plug in Stripe, Lemon Squeezy, or Polar. Your AI upsells and onboards 24/7."
  }
];

export function HowItWorks() {
  return (
    <section className="container mt-24 md:mt-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
          How it works
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          From handle to a live AI business in 15 minutes.
        </h2>
      </div>

      <div className="relative mt-12 grid gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            <div className="flex h-full flex-col rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="absolute right-[-22px] top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
