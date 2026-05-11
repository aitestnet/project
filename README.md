# Teskel

**AI Identity Commerce** — your `username.ai` becomes an AI persona, digital
storefront, and self-hostable mini SaaS runtime, all in one identity page.

Teskel combines what creators currently glue together with **Linktree**,
**Gumroad**, **Patreon**, and **Character.AI** — but it's AI-native, creator-first,
and ships *executable* digital products, not dead PDFs.

> 🧪 This repo is the **MVP frontend** of Teskel (Next.js 14 + Tailwind +
> shadcn/ui + Framer Motion). Backend services (Prisma, Postgres, Qdrant,
> MedusaJS, Dokploy runtime, auth, payments) are planned in follow-up PRs.

---

## ✨ What's in the MVP

| Page | Path | Description |
| --- | --- | --- |
| Landing | `/` | Hero, stats, features, executable runtime showcase, how-it-works, stack, testimonials, pricing, CTA, footer. |
| AI Identity Page | `/yogi`, `/aria` | Profile header, stats, products, memberships, About — plus a live **AI persona chat** in the sidebar. |
| AI persona chat API | `/api/chat` | Streaming mock response (edge runtime) that responds in the creator's tone, recommends products, and answers FAQs. |
| Discover | `/discover` | Searchable, filterable marketplace of AI creators. |
| Creator dashboard | `/dashboard` | Overview, Products, AI Persona, Runtime, Analytics, Audience, Payouts. |
| Auth | `/sign-in`, `/sign-up` | Marketing-grade auth UI with handle reservation. |
| 404 | `/foo` | Friendly handle-not-found page. |

---

## 🧱 Stack (frontend)

- **Next.js 14** App Router · server components · edge runtime for AI streaming
- **React 18** + **TypeScript** (strict)
- **Tailwind CSS** + custom design tokens (light, modern, pro)
- **shadcn/ui**-style primitives (Button, Card, Avatar, Tabs, Dialog, Tooltip,
  Dropdown, Switch, Progress, etc.) — written inline, no runtime cost.
- **Framer Motion** for tasteful, performant motion.
- **lucide-react** icons.
- **Inter** + **Sora** (Google Fonts) for body + display type.

Future stack targets (per the product spec): FastAPI, Express, Prisma,
PostgreSQL, Redis, Qdrant, OpenAI/Anthropic/Gemini, LiteLLM, Mem0, MedusaJS,
Stripe / Lemon Squeezy / Polar, Resend, MinIO/R2, Meilisearch, PostHog,
Plausible, Sentry, n8n, Docker, Dokploy.

---

## 🛠 Local development

```bash
# 1. Install deps
npm install

# 2. Run the dev server
npm run dev

# 3. Open
# http://localhost:3000              landing
# http://localhost:3000/yogi         demo AI identity page
# http://localhost:3000/aria         a second AI identity demo
# http://localhost:3000/discover     creator marketplace
# http://localhost:3000/dashboard    creator dashboard
# http://localhost:3000/sign-up      auth UI
```

Useful scripts:

```bash
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm start           # run production server
```

---

## 📁 Project structure

```
.
├── app/
│   ├── (auth)/                 # sign-in, sign-up (route group)
│   ├── [username]/             # AI Identity page (yogi.ai, aria.ai, …)
│   ├── api/chat/route.ts       # mock streaming AI persona endpoint (edge)
│   ├── dashboard/              # creator dashboard (overview + 6 subpages)
│   ├── discover/               # marketplace / discovery
│   ├── globals.css             # design tokens + utilities
│   ├── layout.tsx              # fonts + metadata
│   ├── not-found.tsx           # 404
│   └── page.tsx                # landing
├── components/
│   ├── chat/persona-chat.tsx   # streaming chat UI
│   ├── dashboard/              # sidebar, stat cards, sparkline, etc.
│   ├── identity/               # profile header, product card, membership card
│   ├── landing/                # hero, features, runtime showcase, …
│   ├── site/                   # logo, navbar, footer
│   └── ui/                     # shadcn-style primitives
└── lib/
    ├── data.ts                 # mock creators, products, memberships
    ├── types.ts                # shared types
    └── utils.ts                # cn(), formatters
```

---

## 🧭 Try the AI persona

Open <http://localhost:3000/yogi> and chat with Yogi's AI twin in the sidebar.
The `/api/chat` route streams a response token-by-token. Try:

- _"What's the fastest way to launch an AI SaaS?"_
- _"Recommend a product for a solo founder."_
- _"How much is the AI SEO tool?"_
- _"Show me memberships."_

The response is currently a deterministic mock so the MVP works offline. Plug
in `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or LiteLLM in a follow-up PR.

---

## 🗺 Roadmap

- [ ] Wire AI persona chat to **OpenAI / Anthropic / Gemini** via **LiteLLM**.
- [ ] **Prisma + Postgres** schema for creators, products, memberships, orders.
- [ ] **Clerk** or **Authentik** auth integration.
- [ ] **Stripe / Lemon Squeezy / Polar** checkout + webhooks.
- [ ] **MedusaJS** commerce engine for digital products & memberships.
- [ ] **Qdrant + Mem0** vector knowledge per creator.
- [ ] **Dokploy** API integration for one-click executable runtime deploys.
- [ ] **PostHog + Plausible** event wiring.
- [ ] **Sentry** error monitoring.
- [ ] **Meilisearch** index for `/discover`.

---

© Teskel Labs · Built for creators.
