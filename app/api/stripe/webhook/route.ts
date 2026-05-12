import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events:
 * - checkout.session.completed → create Order or Subscription
 * - customer.subscription.updated → update Subscription status
 * - customer.subscription.deleted → cancel Subscription
 *
 * In production, this creates records in Postgres via Prisma.
 * Currently logs events for development.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe/webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata ?? {};

      if (metadata.type === "product") {
        console.log("[stripe/webhook] Product purchase completed:", {
          productId: metadata.productId,
          amount: session.amount_total,
          email: session.customer_email
        });

        // TODO: Create Order record in Prisma
        // await db.order.create({
        //   data: {
        //     productId: metadata.productId,
        //     amount: session.amount_total ?? 0,
        //     currency: session.currency ?? "usd",
        //     status: "completed",
        //     paymentProvider: "stripe",
        //     providerOrderId: session.id,
        //     buyerEmail: session.customer_email ?? "",
        //   }
        // });

        // TODO: Send receipt email
        // await sendPurchaseReceipt({ ... });
      }

      if (metadata.type === "membership") {
        console.log("[stripe/webhook] Membership subscription started:", {
          membershipId: metadata.membershipId,
          email: session.customer_email
        });

        // TODO: Create Subscription record in Prisma
      }

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("[stripe/webhook] Subscription updated:", {
        subscriptionId: subscription.id,
        status: subscription.status
      });

      // TODO: Update Subscription status in Prisma
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("[stripe/webhook] Subscription cancelled:", {
        subscriptionId: subscription.id
      });

      // TODO: Mark Subscription as cancelled in Prisma
      break;
    }

    default:
      console.log("[stripe/webhook] Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
