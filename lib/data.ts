import type { Creator, DiscoverCreator, Membership, Product } from "./types";

export const creators: Record<string, Creator> = {
  yogi: {
    username: "yogi",
    name: "Yogi Pradana",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=f5f5f5",
    cover: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&q=70&auto=format&fit=crop",
    tagline: "AI engineer building executable digital products",
    bio: "I help founders ship AI-native businesses. Selling prompt packs, mini SaaS, and 1:1 mentoring.",
    location: "Jakarta, ID",
    niche: "AI x Indie SaaS",
    followers: 18234,
    rating: 4.9,
    verified: true,
    socials: [
      { kind: "x", url: "https://x.com", label: "@yogi" },
      { kind: "github", url: "https://github.com", label: "yogi" },
      { kind: "site", url: "https://example.com", label: "yogi.dev" }
    ],
    persona: {
      tone: "Friendly, sharp, founder-mode",
      expertise: ["Next.js", "LLM orchestration", "Product strategy", "Dokploy"],
      greeting:
        "Hey, I'm Yogi's AI twin. Ask me about my products, mentoring, or how to ship an AI SaaS in 7 days.",
      suggestions: [
        "What's the fastest way to launch an AI SaaS?",
        "Compare your AI SEO Tool with competitors",
        "Recommend a product for a solo founder",
        "Can I book a 1:1 strategy call?"
      ]
    },
    stats: { products: 12, customers: 2480, deployments: 34, revenue: 184320 }
  },
  aria: {
    username: "aria",
    name: "Aria Saraswati",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Aria&backgroundColor=fce7f3",
    cover: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=70&auto=format&fit=crop",
    tagline: "Brand designer turning ideas into iconic identities",
    bio: "Founder of Lumen Studio. I sell brand kits, design systems, and run a private community for designers.",
    location: "Bali, ID",
    niche: "Brand & Design",
    followers: 42870,
    rating: 4.95,
    verified: true,
    socials: [
      { kind: "instagram", url: "https://instagram.com", label: "@ariadesigns" },
      { kind: "site", url: "https://example.com", label: "lumen.studio" }
    ],
    persona: {
      tone: "Warm, curious, design-first",
      expertise: ["Brand identity", "Design systems", "Typography", "Figma"],
      greeting:
        "Hi, I'm Aria's design twin. Tell me about your brand and I'll suggest the right kit or service.",
      suggestions: [
        "Which brand kit fits a fintech startup?",
        "Show me memberships",
        "Generate a moodboard for a coffee brand",
        "Book a 30-min brand audit"
      ]
    },
    stats: { products: 18, customers: 5310, deployments: 9, revenue: 296500 }
  }
};

export const products: Record<string, Product[]> = {
  yogi: [
    {
      id: "p1",
      slug: "ai-seo-tool",
      title: "AI SEO Tool",
      emoji: "🔎",
      kind: "mini-saas",
      description:
        "A hosted mini SaaS that audits any URL and rewrites meta + content with your brand voice.",
      price: 29,
      runtime: "executable",
      liveUrl: "https://seo.yogi.ai",
      badges: ["Live runtime", "Self-host"],
      rating: 4.9,
      sales: 412
    },
    {
      id: "p2",
      slug: "founder-prompt-pack",
      title: "Founder Prompt Pack",
      emoji: "✨",
      kind: "prompt-pack",
      description:
        "120 battle-tested prompts for landing pages, pricing, cold outreach, and investor updates.",
      price: 19,
      badges: ["Top seller"],
      rating: 4.8,
      sales: 1820
    },
    {
      id: "p3",
      slug: "ship-ai-saas-ebook",
      title: "Ship an AI SaaS in 7 Days",
      emoji: "📘",
      kind: "ebook",
      description:
        "A practical playbook covering stack, AI integration, payments, and launch tactics.",
      price: 24,
      rating: 4.85,
      sales: 932
    },
    {
      id: "p4",
      slug: "ai-resume-builder",
      title: "AI Resume Builder",
      emoji: "📄",
      kind: "mini-saas",
      description:
        "A live AI tool that turns a LinkedIn URL into a tailored, recruiter-ready PDF.",
      price: 14,
      runtime: "executable",
      liveUrl: "https://resume.yogi.ai",
      badges: ["Live runtime"],
      rating: 4.7,
      sales: 540
    },
    {
      id: "p5",
      slug: "automation-pack",
      title: "n8n Automation Pack",
      emoji: "⚙️",
      kind: "automation",
      description:
        "20+ ready-to-import n8n flows for lead gen, content ops, and AI customer support.",
      price: 39,
      rating: 4.85,
      sales: 274
    },
    {
      id: "p6",
      slug: "indie-founder-membership",
      title: "Indie Founder Membership",
      emoji: "🚀",
      kind: "membership",
      description:
        "Private Discord, monthly office hours, and early access to every new product.",
      price: 19,
      currency: "USD",
      badges: ["Monthly"],
      rating: 4.95,
      sales: 318
    }
  ],
  aria: [
    {
      id: "a1",
      slug: "brand-kit-essentials",
      title: "Brand Kit Essentials",
      emoji: "🎨",
      kind: "template",
      description:
        "Logo, palette, typography, and a 24-page guideline template in Figma + PDF.",
      price: 49,
      rating: 4.9,
      sales: 1024,
      badges: ["Bestseller"]
    },
    {
      id: "a2",
      slug: "design-system-starter",
      title: "Design System Starter",
      emoji: "🧩",
      kind: "template",
      description:
        "Token-based Figma library + shadcn/ui mappings for shipping cohesive product UI.",
      price: 79,
      rating: 4.85,
      sales: 612
    },
    {
      id: "a3",
      slug: "studio-membership",
      title: "Lumen Studio Membership",
      emoji: "✨",
      kind: "membership",
      description:
        "Live critique sessions, a curated resource vault, and weekly drops of templates.",
      price: 29,
      rating: 4.95,
      sales: 410,
      badges: ["Monthly"]
    }
  ]
};

export const memberships: Record<string, Membership[]> = {
  yogi: [
    {
      id: "m1",
      tier: "Builder",
      priceMonthly: 9,
      description: "Stay close to the build.",
      perks: ["Monthly behind-the-scenes", "Discount on all products", "Community chat"]
    },
    {
      id: "m2",
      tier: "Founder",
      priceMonthly: 29,
      description: "Ship faster with direct access.",
      perks: [
        "Everything in Builder",
        "Private Q&A every 2 weeks",
        "1 free product / month",
        "Beta access to new SaaS"
      ],
      highlight: true
    },
    {
      id: "m3",
      tier: "Operator",
      priceMonthly: 99,
      description: "1:1 mentorship for serious teams.",
      perks: [
        "Everything in Founder",
        "Monthly 30-min strategy call",
        "Custom prompt audits",
        "Priority support"
      ]
    }
  ],
  aria: [
    {
      id: "am1",
      tier: "Sketch",
      priceMonthly: 12,
      description: "Get inspired weekly.",
      perks: ["Weekly moodboards", "Resource library", "Community"]
    },
    {
      id: "am2",
      tier: "Studio",
      priceMonthly: 29,
      description: "Practice with feedback.",
      perks: [
        "Everything in Sketch",
        "Monthly live critique",
        "Template drops",
        "Discord channels"
      ],
      highlight: true
    }
  ]
};

export const discoverCreators: DiscoverCreator[] = [
  {
    username: "yogi",
    name: "Yogi Pradana",
    avatar: creators.yogi.avatar,
    tagline: "AI engineer · Indie SaaS",
    niche: "AI x SaaS",
    followers: 18234,
    verified: true,
    topProduct: "AI SEO Tool",
    color: "from-neutral-200/40 to-neutral-100/40"
  },
  {
    username: "aria",
    name: "Aria Saraswati",
    avatar: creators.aria.avatar,
    tagline: "Brand designer · Lumen Studio",
    niche: "Design",
    followers: 42870,
    verified: true,
    topProduct: "Brand Kit Essentials",
    color: "from-neutral-200/40 to-neutral-100/40"
  },
  {
    username: "ravi",
    name: "Ravi Anand",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Ravi&backgroundColor=dbeafe",
    tagline: "Quant trader · AI signals",
    niche: "Finance",
    followers: 9210,
    verified: false,
    topProduct: "Macro AI Bot",
    color: "from-sky-500/15 to-cyan-400/10"
  },
  {
    username: "lina",
    name: "Lina Park",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Lina&backgroundColor=dcfce7",
    tagline: "Wellness coach · Mind & Body",
    niche: "Wellness",
    followers: 27400,
    verified: true,
    topProduct: "21-Day Reset",
    color: "from-emerald-500/15 to-lime-400/10"
  },
  {
    username: "kenji",
    name: "Kenji Watanabe",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Kenji&backgroundColor=fee2e2",
    tagline: "AI music producer",
    niche: "Audio",
    followers: 13720,
    verified: false,
    topProduct: "Lo-fi Prompt Pack",
    color: "from-rose-500/15 to-amber-400/10"
  },
  {
    username: "noor",
    name: "Noor Hadi",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Noor&backgroundColor=fef3c7",
    tagline: "Edu creator · AI learning",
    niche: "Education",
    followers: 8810,
    verified: false,
    topProduct: "Calculus AI Tutor",
    color: "from-amber-400/15 to-yellow-300/10"
  }
];

export const teskelStats = {
  creators: 12480,
  products: 38210,
  deployments: 9215,
  revenue: 5.8 // in millions
};

export const features = [
  {
    title: "AI Identity Page",
    description:
      "Your username.ai is a living profile — AI persona, products, memberships, and analytics in one home.",
    icon: "Sparkles"
  },
  {
    title: "AI Persona Engine",
    description:
      "Train an AI twin that mirrors your tone, expertise, and offers. Visitors chat, learn, and buy.",
    icon: "Bot"
  },
  {
    title: "Digital Product Commerce",
    description:
      "Ship ebooks, prompts, AI workflows, templates, and memberships in minutes. Stripe + Lemon ready.",
    icon: "ShoppingBag"
  },
  {
    title: "Executable Product Runtime",
    description:
      "Sell real software, not PDFs. Auto-deploy mini SaaS via Dokploy with SSL & subdomains.",
    icon: "Cpu"
  },
  {
    title: "AI Commerce Layer",
    description:
      "Your AI upsells, onboards, and answers buyer questions 24/7 — trained on every product.",
    icon: "Wand2"
  },
  {
    title: "Social Layer",
    description:
      "Follow creators, clone workflows, remix templates, and discover AI personas you can talk to.",
    icon: "Users"
  }
];

export const pricingTiers = [
  {
    name: "Starter",
    price: 0,
    description: "Get an AI identity page and start selling.",
    features: [
      "1 AI Identity Page",
      "Up to 5 digital products",
      "Basic AI persona",
      "Stripe & Lemon Squeezy",
      "Community support"
    ],
    cta: "Claim your handle"
  },
  {
    name: "Creator",
    price: 19,
    description: "Most popular for indie creators.",
    features: [
      "Custom domain (you.ai)",
      "Unlimited products",
      "Trainable AI persona + memory",
      "1 executable mini SaaS",
      "Analytics & memberships",
      "Email + chat support"
    ],
    cta: "Start 14-day trial",
    highlight: true
  },
  {
    name: "Studio",
    price: 79,
    description: "For teams and serious operators.",
    features: [
      "Everything in Creator",
      "10 executable runtimes",
      "Team seats & roles",
      "Vector knowledge + Mem0",
      "Priority Dokploy compute",
      "Dedicated success manager"
    ],
    cta: "Talk to sales"
  }
];

export const dashboardProducts = products.yogi;
