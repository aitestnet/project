import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

const from = process.env.EMAIL_FROM ?? "Teskel <noreply@teskel.app>";

/**
 * Send a purchase receipt email.
 */
export async function sendPurchaseReceipt(opts: {
  to: string;
  productName: string;
  amount: string;
  creatorName: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.log("[email] Resend not configured, skipping receipt:", opts);
    return;
  }

  await resend.emails.send({
    from,
    to: opts.to,
    subject: `Receipt: ${opts.productName} — ${opts.amount}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
        <p style="font-size: 14px; color: #666;">Thank you for your purchase!</p>
        <h2 style="font-size: 20px; margin: 16px 0;">${opts.productName}</h2>
        <p style="font-size: 14px; color: #333;">Amount: <strong>${opts.amount}</strong></p>
        <p style="font-size: 14px; color: #333;">Creator: <strong>${opts.creatorName}</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">Teskel — AI Identity Commerce</p>
      </div>
    `
  });
}

/**
 * Send a welcome email when a new user signs up.
 */
export async function sendWelcomeEmail(opts: {
  to: string;
  handle: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.log("[email] Resend not configured, skipping welcome:", opts);
    return;
  }

  await resend.emails.send({
    from,
    to: opts.to,
    subject: `Welcome to Teskel — ${opts.handle}.ai is yours!`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
        <h2 style="font-size: 22px; margin: 0 0 12px;">Welcome to Teskel 🎉</h2>
        <p style="font-size: 15px; color: #333;">
          Your AI identity page is live at <strong>${opts.handle}.ai</strong>
        </p>
        <p style="font-size: 14px; color: #666; margin-top: 12px;">
          Here's what you can do next:
        </p>
        <ul style="font-size: 14px; color: #333; padding-left: 20px;">
          <li>Train your AI persona</li>
          <li>Add your first product</li>
          <li>Set up your memberships</li>
          <li>Connect Stripe to start earning</li>
        </ul>
        <a href="https://teskel.app/dashboard"
           style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px;">
          Open your dashboard →
        </a>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">Teskel — AI Identity Commerce</p>
      </div>
    `
  });
}

/**
 * Send a membership confirmation email.
 */
export async function sendMembershipConfirmation(opts: {
  to: string;
  tier: string;
  creatorName: string;
  price: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.log("[email] Resend not configured, skipping membership confirmation:", opts);
    return;
  }

  await resend.emails.send({
    from,
    to: opts.to,
    subject: `You're now a ${opts.tier} member — ${opts.creatorName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
        <h2 style="font-size: 20px; margin: 0 0 12px;">Membership confirmed 🎉</h2>
        <p style="font-size: 14px; color: #333;">
          You're now a <strong>${opts.tier}</strong> member of <strong>${opts.creatorName}</strong>.
        </p>
        <p style="font-size: 14px; color: #666;">
          Monthly charge: <strong>${opts.price}</strong>
        </p>
        <p style="font-size: 13px; color: #666; margin-top: 16px;">
          You now have access to all ${opts.tier} perks. Check the creator's page for details.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">Teskel — AI Identity Commerce</p>
      </div>
    `
  });
}
