import { NextRequest, NextResponse } from "next/server";
import { getStripe, createProductCheckout, createMembershipCheckout } from "@/lib/stripe";

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for product purchase or membership subscription.
 *
 * Body:
 * {
 *   type: "product" | "membership",
 *   productId?: string,
 *   membershipId?: string,
 *   email?: string
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Payments not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { type, productId, membershipId, email } = body;

    const origin = req.nextUrl.origin;
    const successUrl = `${origin}/dashboard?checkout=success`;
    const cancelUrl = `${origin}/dashboard?checkout=cancelled`;

    if (type === "product" && productId) {
      // In production, look up the product from the database
      // For now, accept price from the client (should be validated server-side)
      const session = await createProductCheckout({
        productName: body.productName ?? "Digital Product",
        priceInCents: body.priceInCents ?? 0,
        buyerEmail: email,
        successUrl,
        cancelUrl,
        metadata: {
          type: "product",
          productId
        }
      });

      return NextResponse.json({ url: session.url });
    }

    if (type === "membership" && membershipId) {
      const session = await createMembershipCheckout({
        membershipName: body.membershipName ?? "Membership",
        priceInCents: body.priceInCents ?? 0,
        buyerEmail: email,
        successUrl,
        cancelUrl,
        metadata: {
          type: "membership",
          membershipId
        }
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json(
      { error: "Invalid checkout request — provide type and id" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[stripe/checkout] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
