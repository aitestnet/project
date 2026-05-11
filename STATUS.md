# TESKEL — Status & Feature Documentation

_Last updated: 2026-05-11 · Branch state after **PR #1** (MVP frontend) and **PR #2** (monochrome UI refresh) merged to `main`._

**TESKEL** — "AI Identity Commerce" — turns `username.ai` into an AI persona, digital storefront, and self-hostable mini SaaS runtime, all on one identity page. It's the AI-native, creator-first combination of Linktree + Gumroad + Patreon + Character.AI, but shipping _executable_ digital products rather than dead PDFs.

This document is the canonical answer to "where are we right now?" — what's built, what's stubbed, what's not started, and how everything fits together.

---

## 1. At-a-glance status

| Layer | State | Notes |
| --- | --- | --- |
| **Frontend MVP** | ✅ Done | Next.js 14 + TypeScript + Tailwind + shadcn-style primitives. 16 routes, all green on lint / typecheck / build. |
| **Design system** | ✅ Done (monochrome refresh in PR #2) | Vercel-style light theme, neutral palette, shadow system, motion-friendly. |
| **AI persona chat (mock)** | ✅ Done | Edge route streaming token-by-token; deterministic intent routing (price / membership / SEO / etc.). |
| **AI persona chat (real LLM)** | ⏳ Not started | Plug in OpenAI / Anthropic / Gemini via LiteLLM, add Mem0 for per-creator memory. |
| **Data layer** | 🟡 Mock only | All data in `lib/data.ts`. Prisma + Postgres not wired yet. |
| **Auth** | 🟡 UI only | Sign-in / sign-up pages render and handle-reservation works client-side. No real auth provider. |
| **Payments / Commerce** | ⏳ Not started | Stripe / Lemon / Polar / MedusaJS planned. |
| **Executable runtime** | ⏳ Not started | Dokploy integration is the differentiator — UI surfaces exist on `/dashboard/runtime`, no backend. |
| **Analytics / Monitoring** | ⏳ Not started | PostHog / Plausible / Sentry / Meilisearch planned. |
| **Workflow automation** | ⏳ Not started | n8n recipes are listed as a product kind; not yet integrated. |
| **CI** | ❌ Not configured | No `.github/workflows`. Quality checks run locally via `npm run lint / typecheck / build`. |
| **Deploy** | ❌ Not configured | No Vercel / Dokploy / Fly config in repo yet. |

Codebase size: **~3.8k LOC across 54 TS/TSX files** (lib + app + components).

---

## 2. What ships today (full feature inventory)

### 2.1 Routes (16 total)

| Route | Type | Purpose |
| --- | --- | --- |
| `/` | static | Landing page (hero, stats, features, runtime showcase, how-it-works, stack, testimonials, pricing, CTA, footer) |
| `/[username]` | SSG · pre-rendered for `yogi`, `aria` | AI Identity Page — profile header, stats strip, tabs (Products · Memberships · About), AI persona chat sidebar |
| `/api/chat` | dynamic edge runtime | Streams a deterministic mock chat response token-by-token |
| `/discover` | static | Creator marketplace — search + niche pill filter |
| `/dashboard` | static | Overview: 4 stat cards + sparklines, revenue chart, AI health, recent chats, products table |
| `/dashboard/products` | static | Products table + "Connect GitHub" CTA |
| `/dashboard/persona` | static | Persona form, knowledge sources, health metrics, capability toggles |
| `/dashboard/runtime` | static | Runtime services list + Dokploy continuous-deploy section |
| `/dashboard/analytics` | static | Visitors / chats stat cards, sparklines, product funnel table |
| `/dashboard/audience` | static | Member list with tier, spend, joined date |
| `/dashboard/payouts` | static | Payouts table across Stripe / Lemon / Polar |
| `/sign-in` | static | Sign-in form (GitHub, email, password) — UI only |
| `/sign-up` | static | Sign-up with live `.ai` handle reservation (sanitization + availability check) |
| `/_not-found` | static | Branded 404 |

### 2.2 Landing page sections

All implemented in `components/landing/*` and assembled in `app/page.tsx`:

| Section | File | What it does |
| --- | --- | --- |
| Hero | `hero.tsx` | Headline + tagline + CTAs + trust strip + a mock chat preview card on the right (avatar, mini stats, fake conversation, "Send" CTA) |
| Stats | `stats.tsx` | "12,480 creators · 38,210 products · 9,215 deployments · $5.8M revenue" |
| Features | `features.tsx` | 6-card grid: AI Identity Page · Persona Engine · Digital Product Commerce · Executable Runtime · AI Commerce Layer · Social Layer |
| Runtime showcase | `runtime-showcase.tsx` | "Sell live software, not dead PDFs" — explains the Dokploy executable runtime story with a sample runtime table |
| How it works | `how-it-works.tsx` | 3-step flow with step cards |
| Stack | `stack.tsx` | Grid of categories (Frontend / Backend / Data / AI / Payments / Runtime) listing tech tags |
| Testimonials | `testimonials.tsx` | 3 quoted creator cards |
| Pricing | `pricing.tsx` | Annual ↔ Monthly toggle. Annual = monthly × 0.8 rounded. `Starter $0 · Creator $19/$15 · Studio $79/$63`. "Most popular" highlighted. |
| CTA | `cta.tsx` | Dark hero CTA with handle reservation input |
| Footer | `footer.tsx` | 4-column nav + brand strap |

### 2.3 AI Identity Page (`/[username]`)

`app/[username]/page.tsx` composes:

- **`ProfileHeader`** — cover photo, avatar, name + verified badge, niche, location, follower count, rating, socials, primary `Chat` + secondary `Follow` actions
- **`StatsStrip`** — 4 stat cards (Products · Customers · Deployments · Revenue) with neutral icons
- **Tabs**: Products · Memberships · About
  - **Products** tab renders `ProductCard` for each product — emoji, title, badges (Top seller / Live runtime / etc.), description, price, sales, rating, runtime indicator, "Open" / "Try live" CTA
  - **Memberships** tab renders `MembershipCard` per tier — tier name, price/month, perks list with checkmarks, highlight variant for the most popular tier
  - **About** tab — long-form bio, expertise tags, persona tone, expertise list
- **`PersonaChat`** sidebar (right column on desktop, stacked on mobile):
  - Header: avatar with live dot, "AI twin" badge, "Online" pill
  - Scrollable message thread with user (solid black bg + white text) and AI (secondary bg) bubbles
  - Suggestion chips below thread (creator-defined in `creator.persona.suggestions`)
  - Input + Send button
  - Streams response from `/api/chat` and progressively renders each token

Currently pre-rendered for two demo handles: **`/yogi`** (AI engineer · indie SaaS) and **`/aria`** (brand designer).

### 2.4 AI persona chat — `/api/chat`

`app/api/chat/route.ts` is an **edge runtime** POST endpoint:

- Accepts `{ username: string, messages: ChatMessage[] }`
- Picks the last user message and matches it against deterministic regex intents:
  - `price | cost | how much | berapa | harga` → product price list + "Memberships start at $X/month"
  - `membership | patreon | subscribe | langganan` → membership tiers + highlight pick
  - `recommend | recommendation | fit | which | cocok | rekomendasi` → top executable product
  - `seo | content | marketing` → AI SEO Tool pitch (when present in catalog)
  - `saas | tool | app | live | runtime` → list of executable products with live URLs
  - `about | who are you | siapa | kamu` → bio from creator data
  - `hello | hi | hey | halo | hai` → persona greeting
  - Fallback → top product + highlight membership recommendation
- Streams the chosen text by splitting on whitespace and emitting tokens with a 22–52ms jittered delay, producing a visible "typing" effect on the client

The route is **fully offline** — no LLM calls. Swapping it for a real provider is one of the highest-priority follow-ups.

### 2.5 Discover marketplace

`app/discover/page.tsx`:

- Search input + niche pills: `All · AI x SaaS · Design · Finance · Wellness · Audio · Education`
- 6 mock creators in `lib/data.ts:discoverCreators` (yogi, aria, ravi, lina, kenji, noor)
- Selecting a niche filters via exact equality; clicking a creator card routes to `/[username]`

### 2.6 Creator dashboard (`/dashboard/*`)

Shared layout (`app/dashboard/layout.tsx`): sticky header with logo + workspace badge + "View public page" link + avatar; left `DashboardSidebar` with navigation; main content area.

`components/dashboard/sidebar.tsx` lists: **Overview · Products · AI Persona · Runtime · Analytics · Audience · Payouts**, plus an "Upgrade to Studio" card at the bottom.

| Sub-page | What's in it (all mock data) |
| --- | --- |
| Overview (`/dashboard`) | 4 stat cards (Revenue · Customers · Deployments · Products) each with a sparkline, revenue chart card, AI persona health card, products table, "Recent AI chats" list |
| Products | Table of products with kind / status / price / sales, "New product" CTA, "Connect GitHub" promo for executable products |
| AI Persona | Persona form (tone, expertise, greeting, suggestions), knowledge sources file list, AI health metrics (response time, sentiment, accuracy), capability toggles |
| Runtime | Runtime services list with status dots (healthy/deploying), Dokploy continuous-deploy section with auto-features (auto-SSL, auto-subdomain, auto-backup) |
| Analytics | Visitors & AI chats stat cards, two trend charts, product funnel table |
| Audience | Member list with tier, spend, join date, broadcast / invite CTAs |
| Payouts | Available / pending / paid-out stat cards, payouts table across Stripe / Lemon / Polar |

### 2.7 Auth UX

`app/(auth)/layout.tsx` — split layout: black foreground panel with a subtle white grid overlay and a creator testimonial on desktop; clean form area on the right.

- **`/sign-in`** — GitHub / email SSO buttons, email + password form, "Forgot?" link, primary CTA, link to sign-up.
- **`/sign-up`** — GitHub / email SSO buttons, `.ai` handle input with:
  - Live sanitization (`/[^a-z0-9-]/g` strip, max 24 chars, lowercased)
  - Availability check (≥ 3 chars → "<handle>.ai is available." in green; < 3 → "Handle must be at least 3 characters.")
  - Submit button disabled until valid

Neither page is wired to a real auth provider — they're UI shells ready for Clerk or Authentik.

### 2.8 404 page

`app/not-found.tsx` — flat white background, mono uppercase "404" eyebrow, "This `.ai` doesn't exist yet." headline, primary "Claim a handle" CTA + secondary "Discover creators".

---

## 3. Design system (after PR #2 monochrome refresh)

### 3.1 Tokens

`app/globals.css` defines neutral-only HSL custom properties:

```
--background: 0 0% 100%
--foreground: 0 0% 9%
--muted: 0 0% 96%
--muted-foreground: 0 0% 40%
--border / --input: 0 0% 91%
--primary: 0 0% 9% (with white foreground)
--secondary / --accent: 0 0% 96%
--ring: 0 0% 9%
--radius: 0.6rem
```

`tailwind.config.ts` maps these into Tailwind colors and adds:

- A neutral `brand` ramp (50–900) — black-and-grey only, no chroma.
- `gradient-brand` background — neutral dark gradient.
- Three shadow utilities: `shadow-soft` (1px hairline), `shadow-card` (subtle elevation), `shadow-elev` (premium card).
- `grid-soft`, `grid-dots`, `grid-lines` background utilities (in `globals.css`) for tasteful texture overlays.

### 3.2 Typography

- **Body**: Inter (`--font-sans`) via `next/font/google` with `rlig`/`calt`/`ss01` enabled.
- **Display**: Sora (`--font-display`) weights 400–700.
- Default tracking is tightened on headings (`tracking-[-0.02em]` to `tracking-[-0.03em]`).

### 3.3 Components

| Primitive | File | Notes |
| --- | --- | --- |
| `Button` | `components/ui/button.tsx` | Variants: default (solid foreground), `outline`, `secondary`, `ghost`, `link`, `destructive`. `gradient` kept as alias for back-compat → also solid foreground now. Sizes: sm / default / lg / xl / icon. |
| `Badge` | `components/ui/badge.tsx` | Variants: default / secondary / destructive / outline / soft / success / warning. Monochrome callers use `outline` + a colored dot indicator. |
| `Card` | `components/ui/card.tsx` | Uses `shadow-soft` and `border`. |
| `Input`, `Label`, `Textarea` | `components/ui/*` | Standard shadcn-style. |
| `Progress` | `components/ui/progress.tsx` | Solid foreground bar (no gradient). |
| `Avatar` | `components/ui/avatar.tsx` | Radix-backed; default neutral fallback bg. |
| `Tabs`, `Dialog`, `Tooltip`, `DropdownMenu`, `ScrollArea`, `Separator`, `Switch` | `components/ui/*` | Radix-based, styled to match the neutral system. |

### 3.4 Animation

- `framer-motion` drives hero entrance, chat bubble entrance, feature card lift on hover.
- `tailwindcss-animate` plugin for Radix transitions.
- Custom keyframes: `accordion-down/up`, `shimmer`, `fade-in-up`.

---

## 4. Stack — implemented vs planned

### 4.1 Currently in `package.json`

**Runtime dependencies:**

- `next 14.2.35`, `react 18.3.1`, `react-dom 18.3.1`
- `@radix-ui/react-*` — avatar, dialog, dropdown-menu, label, popover, progress, scroll-area, select, separator, slot, switch, tabs, tooltip
- `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`
- `framer-motion`
- `lucide-react`
- `sonner` (toaster — installed but not actively used yet)

**Dev:**

- `typescript 5.6`, `eslint`, `eslint-config-next`
- `tailwindcss 3.4`, `postcss`, `autoprefixer`
- `@types/node`, `@types/react`, `@types/react-dom`

### 4.2 Planned (per the original spec) — NOT yet in the repo

| Category | Tools |
| --- | --- |
| Backend | FastAPI, Express, Node services |
| Database | PostgreSQL, Redis, Qdrant |
| ORM | Prisma |
| AI gateway | LiteLLM |
| LLM providers | OpenAI, Anthropic, Gemini |
| AI memory | Mem0 |
| Auth | Clerk **or** Authentik |
| Payments | Stripe, Lemon Squeezy, Polar |
| Commerce engine | MedusaJS |
| Email | Resend, Postmark |
| Storage | MinIO, Cloudflare R2 |
| Deployment runtime | Dokploy (the core differentiator), Docker |
| Search | Meilisearch |
| Analytics | PostHog, Plausible |
| Monitoring | Sentry |
| Automation | n8n |
| Visual builder | Webstudio (optional) |
| Editor | Tiptap (optional) |
| Support | Crisp |

---

## 5. Project structure

```
project/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx              split layout with black testimonial panel
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx        live .ai handle reservation
│   ├── [username]/
│   │   └── page.tsx                AI Identity Page (yogi.ai, aria.ai)
│   ├── api/
│   │   └── chat/route.ts           edge streaming mock chat
│   ├── dashboard/
│   │   ├── layout.tsx              sticky header + sidebar shell
│   │   ├── page.tsx                Overview
│   │   ├── analytics/page.tsx
│   │   ├── audience/page.tsx
│   │   ├── payouts/page.tsx
│   │   ├── persona/page.tsx
│   │   ├── products/page.tsx
│   │   └── runtime/page.tsx
│   ├── discover/page.tsx           marketplace
│   ├── globals.css                 design tokens + utilities
│   ├── layout.tsx                  root: fonts + metadata
│   ├── not-found.tsx               branded 404
│   └── page.tsx                    landing entry
├── components/
│   ├── chat/persona-chat.tsx       streaming chat UI
│   ├── dashboard/
│   │   ├── section-header.tsx
│   │   ├── sidebar.tsx
│   │   ├── sparkline.tsx
│   │   └── stat-card.tsx
│   ├── identity/
│   │   ├── membership-card.tsx
│   │   ├── product-card.tsx
│   │   ├── profile-header.tsx
│   │   └── stats-strip.tsx
│   ├── landing/
│   │   ├── cta.tsx
│   │   ├── features.tsx
│   │   ├── hero.tsx
│   │   ├── how-it-works.tsx
│   │   ├── pricing.tsx
│   │   ├── runtime-showcase.tsx
│   │   ├── stack.tsx
│   │   ├── stats.tsx
│   │   └── testimonials.tsx
│   ├── site/
│   │   ├── footer.tsx
│   │   ├── logo.tsx
│   │   └── navbar.tsx
│   └── ui/
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── scroll-area.tsx
│       ├── separator.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── lib/
│   ├── data.ts                     mock creators, products, memberships, discover, pricing, features
│   ├── types.ts                    Creator, Product, Membership, DiscoverCreator
│   └── utils.ts                    cn(), initials(), formatters
├── public/                         favicon + brand assets
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── next.config.mjs
├── package.json
├── README.md                       quick-start
└── STATUS.md                       this document
```

---

## 6. Mock data — what's hardcoded today

All under `lib/data.ts`:

- **`creators`** — keyed map for `yogi`, `aria`. Each entry: username, name, avatar (DiceBear), cover photo, tagline, bio, location, niche, followers, rating, verified, socials, persona (tone / expertise / greeting / suggestions), stats (products / customers / deployments / revenue).
- **`products`** — keyed by username. Yogi has 6 (AI SEO Tool, Founder Prompt Pack, Ship an AI SaaS in 7 Days, AI Resume Builder, n8n Automation Pack, Indie Founder Membership). Aria has 3 (Brand Kit Essentials, Design System Starter, Lumen Studio Membership). Each: id, slug, title, emoji, kind, description, price, optional runtime (`executable`), optional liveUrl, badges, rating, sales.
- **`memberships`** — keyed by username. Yogi: Builder $9 / Founder $29 (highlight) / Operator $99. Aria: Sketch $12 / Studio $29 (highlight).
- **`discoverCreators`** — 6 creators for the marketplace grid.
- **`teskelStats`** — site-wide trust numbers (12,480 creators / 38,210 products / 9,215 deployments / $5.8M revenue).
- **`features`** — 6 landing-page feature copy entries.
- **`pricingTiers`** — Starter $0 / Creator $19 (highlight) / Studio $79. Annual price is computed as `Math.round(price * 0.8)` in `components/landing/pricing.tsx`.
- **`dashboardProducts`** — alias for `products.yogi` (used by the dashboard tables).

Type definitions for all of the above are in `lib/types.ts`.

---

## 7. Local development

```bash
# install once
npm install

# start dev server
npm run dev
# → http://localhost:3000

# quality gates
npm run lint        # ESLint via next lint
npm run typecheck   # tsc --noEmit
npm run build       # production build (16 routes)
npm start           # serve production build
```

All three quality gates pass on `main` and on every feature branch in this session.

Demo URLs:

- `/` — landing
- `/yogi` — Yogi's AI identity page (chat is fully interactive)
- `/aria` — Aria's AI identity page
- `/discover` — creator marketplace
- `/dashboard` — creator dashboard overview (+ 6 sub-routes)
- `/sign-up` — handle reservation UX
- `/anything-else` — 404

---

## 8. Roadmap (priority-ordered)

The order below reflects what unlocks the most product value per follow-up PR.

### P0 — make the AI actually intelligent

- [ ] **Wire `/api/chat` to a real LLM** via **LiteLLM** as the gateway, with OpenAI / Anthropic / Gemini as providers. Keep edge runtime streaming.
- [ ] Add a per-creator **system prompt** built from `creator.persona` (tone, expertise, products, memberships).
- [ ] **Mem0** for long-term memory per visitor × creator.
- [ ] **Qdrant** + embeddings for creator knowledge base ("AI knowledge" section already exists in the dashboard UI).
- [ ] Rate-limit per IP / visitor; fall back to the deterministic mock if the LLM is unavailable.

### P1 — durable state & accounts

- [ ] **Prisma + PostgreSQL** schema for `Creator`, `Product`, `Membership`, `Order`, `Subscription`, `ChatSession`, `ChatMessage`, `KnowledgeSource`.
- [ ] Seed migrations from `lib/data.ts` so the mock world becomes the real world on day one.
- [ ] **Redis** for caching + the streaming session store.
- [ ] **Authentication** — pick **Clerk** (fast, hosted) or **Authentik** (OSS, self-host). Replace the `/sign-in` and `/sign-up` UI shells with real flows; gate `/dashboard/*`.

### P2 — get paid

- [ ] **Stripe** as the default checkout for products and memberships.
- [ ] **Lemon Squeezy** as the merchant-of-record alternative for creators in regions where Stripe is hard.
- [ ] **Polar** for developer / open-source style monetization.
- [ ] **MedusaJS** as the headless commerce engine on top, exposing a unified order / customer model.
- [ ] Webhooks → Postgres, with idempotency keys.
- [ ] Resend or Postmark for receipts and onboarding mails.

### P3 — the differentiator: executable runtime

- [ ] **Dokploy** API integration — one-click deploy a "mini SaaS" product:
  - Creator pushes a repo / template → Dokploy provisions Docker, SSL, subdomain.
  - The `/dashboard/runtime` page becomes real (services + status + logs).
  - Each executable product surfaces a live URL on its product card.
- [ ] **Object storage** (MinIO self-host or Cloudflare R2) for product files, ebook PDFs, asset uploads.

### P4 — discoverability & ops

- [ ] **Meilisearch** index for `/discover` (currently in-memory filter).
- [ ] **PostHog** for product analytics + **Plausible** for privacy-first marketing analytics. Both already promised in the dashboard's "Analytics" page.
- [ ] **Sentry** for error monitoring (frontend + every backend service).
- [ ] **n8n** for creator automations — connect AI chat → CRM → email drip → notifications.

### P5 — polish & extras

- [ ] Visual builder for identity pages — **Webstudio** (Webflow-like OSS).
- [ ] Rich-text editor for product descriptions — **Tiptap**.
- [ ] Embedded **Crisp** support widget.
- [ ] CI: GitHub Actions for lint / typecheck / build, preview deploys on PR.
- [ ] Deploy: a `dokploy.yaml` or Vercel project for the frontend; separate Dockerfiles for FastAPI / Medusa services.

---

## 9. Known gaps & honest caveats

- The dashboard is **entirely static**. Buttons render and have correct hover states, but "New product", "Save persona", "Withdraw", "Invite", etc. don't do anything yet.
- The `/sign-in` and `/sign-up` forms don't submit anywhere.
- `/api/chat` is **not** behind a rate limiter — fine while it's a local mock, must be addressed when a real LLM is wired up.
- DiceBear avatars are served from `api.dicebear.com` at runtime; if you go offline, they 404 silently. Self-hosting in `public/` is a tiny follow-up.
- No tests yet (no Vitest / Playwright / Cypress). Quality gates today = lint + typecheck + production build success. End-to-end manual smoke was done in the MVP review session.
- The `sonner` toaster is installed but not yet mounted — easy to add when forms start submitting for real.

---

## 10. Change history (PR-by-PR)

| PR | Title | Status | Highlights |
| --- | --- | --- | --- |
| [#1](https://github.com/aitestnet/project/pull/1) | feat: TESKEL — AI Identity Commerce MVP (Next.js 14 + Tailwind + shadcn/ui) | merged | Full MVP frontend: landing, identity page + streaming AI persona chat, discover marketplace, creator dashboard (7 sub-pages), auth, 404, README & roadmap. 16 routes, build green. |
| [#2](https://github.com/aitestnet/project/pull/2) | refresh(ui): monochrome Vercel-style design system (light theme) | merged | Replaced violet/fuchsia gradient palette with a clean Vercel-style monochrome system (light theme). New shadow utilities, neutral chat bubbles, black solid CTAs, redesigned auth split panel, flat 404. No functional changes. |

---

## 11. TL;DR for stakeholders

- **You can demo Teskel today.** Run `npm install && npm run dev` and walk through landing → `/yogi` (chat works, streams tokens) → `/discover` → `/dashboard` → `/sign-up`. It looks and feels like a production v0.1.
- **It is not yet a business.** Nothing is persisted, nothing accepts payments, the AI is a clever mock, and the "executable runtime" is a story — not a deploy pipeline.
- **The next two PRs are the biggest unlocks**: (1) real LLM + memory behind `/api/chat`, and (2) Prisma + Postgres + Auth so the mock data becomes real and `/dashboard` stops being decoration.
- **The single moat to invest in early is Dokploy.** Once a creator can publish a product and have it auto-deployed with SSL on `{product}.{username}.ai`, the rest of the stack becomes the obvious moat.
