import { Quote } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
  {
    quote:
      "I replaced my Linktree, Gumroad, and ConvertKit with a single Teskel page. My AI persona handles support while I sleep.",
    name: "Aria Saraswati",
    handle: "aria.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aria&backgroundColor=fce7f3"
  },
  {
    quote:
      "Selling a live AI SEO tool instead of a PDF doubled my pricing. Dokploy makes it boring-easy to ship.",
    name: "Yogi Pradana",
    handle: "yogi.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=ede9fe"
  },
  {
    quote:
      "My AI twin onboards new students 24/7. Conversion to paid memberships went from 3% to 11%.",
    name: "Lina Park",
    handle: "lina.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Lina&backgroundColor=dcfce7"
  }
];

export function Testimonials() {
  return (
    <section className="container mt-24 md:mt-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
          Loved by builders
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          What creators say
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.handle}
            className="flex h-full flex-col justify-between rounded-2xl border bg-card p-6"
          >
            <Quote className="h-5 w-5 text-violet-500" />
            <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={t.avatar} />
                <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {t.handle}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
