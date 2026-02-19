import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistConfirmation({
  email,
  name,
}: {
  email: string;
  name: string | null;
}) {
  const firstName = name ? name.split(" ")[0] : "there";

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "You're on the Alto early-access list",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #111;">
        <p style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">Hi ${firstName},</p>
        <p style="font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 24px;">
          You're confirmed on Alto's early-access list. Your $100 deposit secures
          your spot and locks in preferred pricing when we launch.
        </p>
        <p style="font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 24px;">
          We'll be in touch soon with onboarding details and your exact launch
          timeline. In the meantime, if you have any questions just reply to
          this email.
        </p>
        <p style="font-size: 16px; color: #444; line-height: 1.6;">
          — The Alto Team
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="font-size: 12px; color: #999;">
          Alto · AI-native autonomous digital marketing agency
        </p>
      </div>
    `,
  });
}
