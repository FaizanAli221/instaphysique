import { Resend } from "resend";

/**
 * Sends a confirmation email via Resend. Entirely optional: if RESEND_API_KEY
 * isn't set, this quietly no-ops so the lead route still succeeds without
 * email configured (useful for local dev / a fresh Vercel deploy before
 * secrets are added). Failures here are caught by the caller and never
 * block the lead from being saved — a lost confirmation email is a much
 * smaller problem than a lost lead.
 */
export async function sendConfirmationEmail(params: {
  to: string;
  firstName: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !fromAddress) {
    return { sent: false, reason: "Resend not configured" };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: params.to,
    subject: "You're on the schedule — InstaPhysique Roseville",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #22242D;">
        <h2 style="font-weight: 600;">Hi ${escapeHtml(params.firstName)},</h2>
        <p>Your $89 two-week intro at InstaPhysique Roseville is reserved.</p>
        <p>A coach will text or call you shortly to book your first class.</p>
        <p style="color: #5B6068; font-size: 14px; margin-top: 24px;">
          InstaPhysique Roseville &middot; 1470 Eureka Rd, Ste 100 &middot; (916) 913-3707
        </p>
      </div>
    `,
  });

  if (error) {
    return { sent: false, reason: error.message };
  }
  return { sent: true };
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
