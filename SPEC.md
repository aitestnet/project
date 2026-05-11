# TESKEL — Original Project Breakdown

> The original product brief that started this project. This document is the
> source-of-truth for **what TESKEL is supposed to become**, in full. For
> "where we are right now (vs. this spec)", see [`STATUS.md`](./STATUS.md).
> For getting started locally, see [`README.md`](./README.md).

---

## AI Identity Commerce

> "AI-powered digital identity + creator commerce ecosystem"

A fusion of:

- **Linktree** — one identity URL for a creator
- **Gumroad** — digital product commerce
- **Patreon** — memberships & private communities
- **Character.AI** — conversational AI personas

…but:

- **AI-native** from day one
- **Creator-first**, not platform-first
- Ships **executable digital products** (live software), not dead PDFs
- **Self-hostable runtime** for everything a creator sells
- A **social identity layer** that ties it all together

---

## Core Vision

Every person on Teskel gets:

```
username.ai
```

That single handle becomes:

- An **AI persona** that talks to your audience
- A **digital storefront** for products & memberships
- An **AI assistant** for your customers and yourself
- A **portfolio** of your work
- A **creator hub** for your community
- A **digital business** with payments & analytics
- A **mini SaaS runtime** that hosts your live software products

---

## Core Product Features

### 1️⃣ AI Identity Page

Example: `yogi.ai`

The page contains:

- Profile (name, avatar, cover, tagline, bio, location, niche)
- **AI persona chat**
- Digital products
- Memberships
- Services
- Portfolio
- Analytics (public-facing trust stats + private creator dashboards)
- Social links
- AI knowledge (what the persona "knows")

### 2️⃣ AI Persona Engine

Visitors can:

- Talk directly to a creator's AI twin
- Ask about the creator's expertise
- Ask for product recommendations
- Be onboarded automatically (the AI runs the funnel)
- Get AI-powered customer support 24/7

The AI understands the creator's:

- Tone
- Products
- Knowledge base
- Audience
- Niche

### 3️⃣ Digital Product Commerce

A creator can sell:

- Ebooks
- Prompts
- AI workflows
- Templates
- Mini SaaS
- Hosted AI tools
- Memberships
- Private knowledge
- Datasets
- Automation packs

### 4️⃣ Executable Product Runtime

> This is the **biggest differentiator**.

A product on Teskel is **not**:

- ❌ A PDF you download and forget

A product on Teskel **is**:

- ✅ A live, runnable piece of software

Examples:

- An AI SEO tool
- An AI chatbot
- A dashboard
- A mini CRM
- An AI resume builder

Every product on the runtime gets:

- Auto-deploy
- Auto-hosting
- Auto-SSL
- Auto-subdomain (`{product}.{username}.ai`)

…all powered by **Dokploy** under the hood.

### 5️⃣ AI Commerce Layer

The AI persona doesn't just chat — it actively helps the creator:

- Sell products
- Upsell to higher tiers
- Onboard new customers
- Provide customer support
- Make product recommendations

### 6️⃣ Social Layer

The platform itself is social:

- Follow creators
- Clone workflows
- Remix templates
- Discover AI personas
- Share hosted tools

---

## Full Modern Stack

### 📂 Frontend

#### ⚛️ React

Core UI library.

- Official: <https://react.dev>
- GitHub: <https://github.com/facebook/react>

#### ▲ Next.js

Main frontend framework.

- Official: <https://nextjs.org>
- GitHub: <https://github.com/vercel/next.js>

Why: SEO, App Router, server actions, streaming, edge-ready.

#### 🎨 Tailwind CSS

Modern utility CSS.

- Official: <https://tailwindcss.com>
- GitHub: <https://github.com/tailwindlabs/tailwindcss>

#### 🧩 shadcn/ui

Modern SaaS components.

- Official: <https://ui.shadcn.com>
- GitHub: <https://github.com/shadcn-ui/ui>

#### 🎞️ Framer Motion

Animations.

- Official: <https://www.framer.com/motion>
- GitHub: <https://github.com/framer/motion>

### 📂 Backend

#### 🟢 Node.js

Main API & realtime layer.

- Official: <https://nodejs.org>
- GitHub: <https://github.com/nodejs/node>

#### ⚡ FastAPI

AI processing & async tasks.

- Official: <https://fastapi.tiangolo.com>
- GitHub: <https://github.com/fastapi/fastapi>

#### 🚂 Express

Simple REST APIs.

- Official: <https://expressjs.com>
- GitHub: <https://github.com/expressjs/express>

### 📂 Database

#### 🐘 PostgreSQL

Main relational DB.

- Official: <https://www.postgresql.org>
- GitHub: <https://github.com/postgres/postgres>

#### ⚡ Redis

Cache & queue.

- Official: <https://redis.io>
- GitHub: <https://github.com/redis/redis>

#### 🧠 Qdrant

AI vector database.

- Official: <https://qdrant.tech>
- GitHub: <https://github.com/qdrant/qdrant>

#### 🔺 Prisma ORM

Modern database ORM.

- Official: <https://www.prisma.io>
- GitHub: <https://github.com/prisma/prisma>

### 📂 Authentication

#### 👤 Clerk

Modern SaaS auth.

- Official: <https://clerk.com>

#### 🔐 Authentik

OSS identity provider.

- Official: <https://goauthentik.io>
- GitHub: <https://github.com/goauthentik/authentik>

### 📂 Payments

#### 💳 Stripe

Main global payments.

- Official: <https://stripe.com>

#### 🍋 Lemon Squeezy

Creator-focused payments.

- Official: <https://www.lemonsqueezy.com>

#### 🐻 Polar

Developer & AI monetization.

- Official: <https://polar.sh>
- GitHub: <https://github.com/polarsource/polar>

### 📂 Commerce Engine

#### 🛒 MedusaJS

Headless commerce backend.

- Official: <https://medusajs.com>
- GitHub: <https://github.com/medusajs/medusa>

### 📂 Emails

#### ✉️ Resend

Modern email API.

- Official: <https://resend.com>

#### 📮 Postmark

Transactional emails.

- Official: <https://postmarkapp.com>

### 📂 Storage

#### 🪣 MinIO

Self-hosted S3 storage.

- Official: <https://min.io>
- GitHub: <https://github.com/minio/minio>

#### ☁️ Cloudflare R2

Cheap object storage.

- Official: <https://www.cloudflare.com/developer-platform/r2/>

### 📂 Deployment & Runtime

#### 🚀 Dokploy

**Core runtime engine.**

- Official: <https://dokploy.com>
- GitHub: <https://github.com/Dokploy/dokploy>
- Docs: <https://docs.dokploy.com/docs/core>

Features:

- Docker runtime
- Multi-server
- Auto-SSL
- Templates
- Monitoring
- Backups
- Docker Compose support
- API & CLI
- GitHub integration

#### 🐳 Docker

- Official: <https://www.docker.com>
- GitHub: <https://github.com/docker>

### 📂 Search

#### 🔎 Meilisearch

Fast search engine.

- Official: <https://www.meilisearch.com>
- GitHub: <https://github.com/meilisearch/meilisearch>

### 📂 Analytics

#### 📊 PostHog

Modern analytics.

- Official: <https://posthog.com>
- GitHub: <https://github.com/PostHog/posthog>

#### 📈 Plausible

Privacy-first analytics.

- Official: <https://plausible.io>
- GitHub: <https://github.com/plausible/analytics>

### 📂 Monitoring

#### 🛠️ Sentry

Error monitoring.

- Official: <https://sentry.io>
- GitHub: <https://github.com/getsentry/sentry>

### 📂 AI Layer

#### 🤖 OpenAI API

- Official: <https://platform.openai.com>

#### 🧠 Anthropic

- Official: <https://www.anthropic.com>

#### ✨ Gemini API

- Official: <https://ai.google.dev>

#### 🔀 LiteLLM

Unified LLM gateway.

- GitHub: <https://github.com/BerriAI/litellm>

#### 🖥️ Open WebUI

Self-hosted AI interface.

- Official: <https://openwebui.com>
- GitHub: <https://github.com/open-webui/open-webui>

#### 🧠 Mem0

Long-term AI memory.

- Official: <https://mem0.ai>
- GitHub: <https://github.com/mem0ai/mem0>

### 📂 Automation

#### ⚙️ n8n

Workflow automation.

- Official: <https://n8n.io>
- GitHub: <https://github.com/n8n-io/n8n>

### 📂 Security

#### 🛡️ Cloudflare

- Official: <https://www.cloudflare.com>

### 📂 Visual Builder (Optional)

#### 🎨 Webstudio

Modern OSS Webflow alternative.

- Official: <https://webstudio.is>
- GitHub: <https://github.com/webstudio-is/webstudio>

#### 📝 Tiptap

Modern rich editor.

- Official: <https://tiptap.dev>
- GitHub: <https://github.com/ueberdosis/tiptap>

### 📂 Customer Support

#### 💬 Crisp

- Official: <https://crisp.chat>

---

## 🏛️ Suggested Architecture

```
Frontend
├── Next.js
├── React
├── Tailwind
├── shadcn/ui
└── Framer Motion

Backend
├── Node.js
├── FastAPI
├── Express
└── Prisma

Database
├── PostgreSQL
├── Redis
└── Qdrant

AI
├── OpenAI
├── Anthropic
├── Gemini
├── LiteLLM
└── Mem0

Commerce
└── MedusaJS

Storage
├── MinIO
└── Cloudflare R2

Automation
└── n8n

Deployment
├── Docker
└── Dokploy

Analytics
├── PostHog
└── Plausible

Monitoring
└── Sentry
```

---

## Related documents

- **[`README.md`](./README.md)** — quick start, what ships today, dev commands.
- **[`STATUS.md`](./STATUS.md)** — full breakdown of which parts of this spec are done, partial, or not started yet, plus a priority-ordered roadmap.
