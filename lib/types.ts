export type Creator = {
  username: string;
  name: string;
  avatar: string;
  cover?: string;
  tagline: string;
  bio: string;
  location?: string;
  niche: string;
  followers: number;
  rating: number;
  verified: boolean;
  socials: { kind: "x" | "github" | "youtube" | "instagram" | "site"; url: string; label: string }[];
  persona: {
    tone: string;
    expertise: string[];
    greeting: string;
    suggestions: string[];
  };
  stats: {
    products: number;
    customers: number;
    deployments: number;
    revenue: number;
  };
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  kind:
    | "ebook"
    | "prompt-pack"
    | "ai-workflow"
    | "template"
    | "mini-saas"
    | "membership"
    | "dataset"
    | "automation";
  description: string;
  price: number;
  currency?: string;
  thumbnail?: string;
  badges?: string[];
  runtime?: "static" | "executable";
  liveUrl?: string;
  rating: number;
  sales: number;
};

export type Membership = {
  id: string;
  tier: string;
  priceMonthly: number;
  description: string;
  perks: string[];
  highlight?: boolean;
};

export type DiscoverCreator = Pick<
  Creator,
  "username" | "name" | "avatar" | "tagline" | "niche" | "followers" | "verified"
> & {
  topProduct: string;
  color: string;
};
