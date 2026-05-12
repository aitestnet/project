import Stripe from "stripe";

/**
 * Stripe client singleton.
 *
 * Only initialized when STRIPE_SECRET_KEY is set.
 * Returns null if Stripe is not configured.
 */

let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  _stripe = new Stripe(key, {
    typescript: true
  });

  return _stripe;
}

/**
 * Create a Stripe Checkout Session for a one-time product purchase.
 */
export async function createProductCheckout(opts: {
  productName: string;
  priceInCents: number;
  buyerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe not configured");

  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: opts.buyerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: opts.productName },
          unit_amount: opts.priceInCents
        },
        quantity: 1
      }
    ],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: opts.metadata
  });
}

/**
 * Create a Stripe Checkout Session for a recurring membership subscription.
 */
export async function createMembershipCheckout(opts: {
  membershipName: string;
  priceInCents: number; // monthly
  buyerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe not configured");

  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: opts.buyerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: opts.membershipName },
          unit_amount: opts.priceInCents,
          recurring: { interval: "month" }
        },
        quantity: 1
      }
    ],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: opts.metadata
  });
}

/**
 * Create a Stripe Customer Portal session for managing subscriptions.
 */
export async function createPortalSession(opts: {
  customerId: string;
  returnUrl: string;
}) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe not configured");

  return stripe.billingPortal.sessions.create({
    customer: opts.customerId,
    return_url: opts.returnUrl
  });
}
