import { Creator, Product, Membership } from "./types";
import {
  Creator as PrismaCreator,
  Product as PrismaProduct,
  Membership as PrismaMembership
} from "@prisma/client";

/**
 * Maps a flat Prisma Creator model into the nested Creator type
 * expected by the frontend components.
 */
export function mapCreator(c: PrismaCreator): Creator {
  return {
    username: c.username,
    name: c.name,
    avatar: c.avatar,
    cover: c.cover || undefined,
    tagline: c.tagline,
    bio: c.bio,
    location: c.location || undefined,
    niche: c.niche,
    followers: c.followers,
    rating: c.rating,
    verified: c.verified,
    // Safely cast socials from JSON
    socials: (c.socials as any) || [],
    persona: {
      tone: c.personaTone,
      expertise: c.personaExpertise,
      greeting: c.personaGreeting,
      suggestions: c.personaSuggestions
    },
    stats: {
      products: c.statsProducts,
      customers: c.statsCustomers,
      deployments: c.statsDeployments,
      revenue: c.statsRevenue
    }
  };
}

/**
 * Maps a Prisma Product into the frontend Product type.
 * Converts price from cents to dollars.
 */
export function mapProduct(p: PrismaProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    emoji: p.emoji,
    kind: p.kind as any,
    description: p.description,
    price: p.price / 100,
    currency: p.currency,
    thumbnail: p.thumbnail || undefined,
    badges: p.badges,
    runtime: (p.runtime as any) || "static",
    liveUrl: p.liveUrl || undefined,
    rating: p.rating,
    sales: p.sales
  };
}

/**
 * Maps a Prisma Membership into the frontend Membership type.
 * Converts price from cents to dollars.
 */
export function mapMembership(m: PrismaMembership): Membership {
  return {
    id: m.id,
    tier: m.tier,
    priceMonthly: m.priceMonthly / 100,
    description: m.description,
    perks: m.perks,
    highlight: m.highlight
  };
}
