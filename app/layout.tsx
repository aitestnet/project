import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import "./globals.css";
import { ClerkWrapper } from "@/components/site/clerk-wrapper";
import { PostHogProvider } from "@/components/providers/posthog-provider";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teskel.app"),
  title: {
    default: "Teskel — AI Identity Commerce for creators",
    template: "%s · Teskel"
  },
  description:
    "Teskel turns your username.ai into an AI persona, storefront, and live software runtime. Linktree + Gumroad + Patreon + Character.AI, but AI-native.",
  openGraph: {
    title: "Teskel — AI Identity Commerce",
    description:
      "Your AI persona, digital products, and self-hostable mini SaaS — on one identity page.",
    siteName: "Teskel",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Teskel — AI Identity Commerce",
    description:
      "Your AI persona, digital products, and self-hostable mini SaaS — on one identity page."
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="grain-overlay min-h-screen bg-background text-foreground antialiased">
        <PostHogProvider>
          <ClerkWrapper>{children}</ClerkWrapper>
        </PostHogProvider>
      </body>
    </html>
  );
}
