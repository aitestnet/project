import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed the database with the same data from lib/data.ts
 * so the mock world becomes the real world on day one.
 */
async function main() {
  console.log("🌱 Seeding Teskel database...\n");

  // ─── Creator: Yogi ─────────────────────────────────
  const yogi = await prisma.creator.upsert({
    where: { username: "yogi" },
    update: {},
    create: {
      username: "yogi",
      name: "Yogi Pradana",
      avatar:
        "https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=f5f5f5",
      cover:
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&q=70&auto=format&fit=crop",
      tagline: "AI engineer building executable digital products",
      bio: "I help founders ship AI-native businesses. Selling prompt packs, mini SaaS, and 1:1 mentoring.",
      location: "Jakarta, ID",
      niche: "AI x Indie SaaS",
      followers: 18234,
      rating: 4.9,
      verified: true,
      personaTone: "Friendly, sharp, founder-mode",
      personaExpertise: ["Next.js", "LLM orchestration", "Product strategy", "Dokploy"],
      personaGreeting:
        "Hey, I'm Yogi's AI twin. Ask me about my products, mentoring, or how to ship an AI SaaS in 7 days.",
      personaSuggestions: [
        "What's the fastest way to launch an AI SaaS?",
        "Compare your AI SEO Tool with competitors",
        "Recommend a product for a solo founder",
        "Can I book a 1:1 strategy call?"
      ],
      socials: [
        { kind: "x", url: "https://x.com", label: "@yogi" },
        { kind: "github", url: "https://github.com", label: "yogi" },
        { kind: "site", url: "https://example.com", label: "yogi.dev" }
      ],
      statsProducts: 12,
      statsCustomers: 2480,
      statsDeployments: 34,
      statsRevenue: 184320
    }
  });

  // Yogi's products
  const yogiProducts = [
    {
      slug: "ai-seo-tool",
      title: "AI SEO Tool",
      emoji: "🔎",
      kind: "mini-saas",
      description:
        "A hosted mini SaaS that audits any URL and rewrites meta + content with your brand voice.",
      price: 2900,
      runtime: "executable",
      liveUrl: "https://seo.yogi.ai",
      badges: ["Live runtime", "Self-host"],
      rating: 4.9,
      sales: 412
    },
    {
      slug: "founder-prompt-pack",
      title: "Founder Prompt Pack",
      emoji: "✨",
      kind: "prompt-pack",
      description:
        "120 battle-tested prompts for landing pages, pricing, cold outreach, and investor updates.",
      price: 1900,
      badges: ["Top seller"],
      rating: 4.8,
      sales: 1820
    },
    {
      slug: "ship-ai-saas-ebook",
      title: "Ship an AI SaaS in 7 Days",
      emoji: "📘",
      kind: "ebook",
      description:
        "A practical playbook covering stack, AI integration, payments, and launch tactics.",
      price: 2400,
      rating: 4.85,
      sales: 932
    },
    {
      slug: "ai-resume-builder",
      title: "AI Resume Builder",
      emoji: "📄",
      kind: "mini-saas",
      description:
        "A live AI tool that turns a LinkedIn URL into a tailored, recruiter-ready PDF.",
      price: 1400,
      runtime: "executable",
      liveUrl: "https://resume.yogi.ai",
      badges: ["Live runtime"],
      rating: 4.7,
      sales: 540
    },
    {
      slug: "automation-pack",
      title: "n8n Automation Pack",
      emoji: "⚙️",
      kind: "automation",
      description:
        "20+ ready-to-import n8n flows for lead gen, content ops, and AI customer support.",
      price: 3900,
      rating: 4.85,
      sales: 274
    },
    {
      slug: "indie-founder-membership",
      title: "Indie Founder Membership",
      emoji: "🚀",
      kind: "membership",
      description:
        "Private Discord, monthly office hours, and early access to every new product.",
      price: 1900,
      badges: ["Monthly"],
      rating: 4.95,
      sales: 318
    }
  ];

  for (const p of yogiProducts) {
    await prisma.product.upsert({
      where: { creatorId_slug: { creatorId: yogi.id, slug: p.slug } },
      update: {},
      create: {
        ...p,
        creatorId: yogi.id
      }
    });
  }

  // Yogi's memberships
  const yogiMemberships = [
    {
      tier: "Builder",
      priceMonthly: 900,
      description: "Stay close to the build.",
      perks: ["Monthly behind-the-scenes", "Discount on all products", "Community chat"]
    },
    {
      tier: "Founder",
      priceMonthly: 2900,
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
      tier: "Operator",
      priceMonthly: 9900,
      description: "1:1 mentorship for serious teams.",
      perks: [
        "Everything in Founder",
        "Monthly 30-min strategy call",
        "Custom prompt audits",
        "Priority support"
      ]
    }
  ];

  for (const m of yogiMemberships) {
    await prisma.membership.create({
      data: { ...m, creatorId: yogi.id }
    });
  }

  console.log(`  ✅ Created creator: ${yogi.name} (${yogi.username}.ai)`);
  console.log(`     ${yogiProducts.length} products, ${yogiMemberships.length} memberships`);

  // ─── Creator: Aria ─────────────────────────────────
  const aria = await prisma.creator.upsert({
    where: { username: "aria" },
    update: {},
    create: {
      username: "aria",
      name: "Aria Saraswati",
      avatar:
        "https://api.dicebear.com/9.x/notionists/svg?seed=Aria&backgroundColor=fce7f3",
      cover:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=70&auto=format&fit=crop",
      tagline: "Brand designer turning ideas into iconic identities",
      bio: "Founder of Lumen Studio. I sell brand kits, design systems, and run a private community for designers.",
      location: "Bali, ID",
      niche: "Brand & Design",
      followers: 42870,
      rating: 4.95,
      verified: true,
      personaTone: "Warm, curious, design-first",
      personaExpertise: ["Brand identity", "Design systems", "Typography", "Figma"],
      personaGreeting:
        "Hi, I'm Aria's design twin. Tell me about your brand and I'll suggest the right kit or service.",
      personaSuggestions: [
        "Which brand kit fits a fintech startup?",
        "Show me memberships",
        "Generate a moodboard for a coffee brand",
        "Book a 30-min brand audit"
      ],
      socials: [
        { kind: "instagram", url: "https://instagram.com", label: "@ariadesigns" },
        { kind: "site", url: "https://example.com", label: "lumen.studio" }
      ],
      statsProducts: 18,
      statsCustomers: 5310,
      statsDeployments: 9,
      statsRevenue: 296500
    }
  });

  const ariaProducts = [
    {
      slug: "brand-kit-essentials",
      title: "Brand Kit Essentials",
      emoji: "🎨",
      kind: "template",
      description:
        "Logo, palette, typography, and a 24-page guideline template in Figma + PDF.",
      price: 4900,
      rating: 4.9,
      sales: 1024,
      badges: ["Bestseller"]
    },
    {
      slug: "design-system-starter",
      title: "Design System Starter",
      emoji: "🧩",
      kind: "template",
      description:
        "Token-based Figma library + shadcn/ui mappings for shipping cohesive product UI.",
      price: 7900,
      rating: 4.85,
      sales: 612
    },
    {
      slug: "studio-membership",
      title: "Lumen Studio Membership",
      emoji: "✨",
      kind: "membership",
      description:
        "Live critique sessions, a curated resource vault, and weekly drops of templates.",
      price: 2900,
      rating: 4.95,
      sales: 410,
      badges: ["Monthly"]
    }
  ];

  for (const p of ariaProducts) {
    await prisma.product.upsert({
      where: { creatorId_slug: { creatorId: aria.id, slug: p.slug } },
      update: {},
      create: {
        ...p,
        creatorId: aria.id
      }
    });
  }

  const ariaMemberships = [
    {
      tier: "Sketch",
      priceMonthly: 1200,
      description: "Get inspired weekly.",
      perks: ["Weekly moodboards", "Resource library", "Community"]
    },
    {
      tier: "Studio",
      priceMonthly: 2900,
      description: "Practice with feedback.",
      perks: [
        "Everything in Sketch",
        "Monthly live critique",
        "Template drops",
        "Discord channels"
      ],
      highlight: true
    }
  ];

  for (const m of ariaMemberships) {
    await prisma.membership.create({
      data: { ...m, creatorId: aria.id }
    });
  }

  console.log(`  ✅ Created creator: ${aria.name} (${aria.username}.ai)`);
  console.log(`     ${ariaProducts.length} products, ${ariaMemberships.length} memberships`);

  console.log("\n🎉 Seed complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
