import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      metadata: { name: string; email: string; businessName: string };
    };

    const { name, email, businessName } = session.metadata;

    await supabase.from("waitlist").insert({
      name,
      email,
      business_name: businessName,
      stripe_session_id: session.id,
    });

    await resend.emails.send({
      from: "Alto <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Alto waitlist signup: ${name} — ${businessName}`,
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Stripe Session:</strong> ${session.id}</p>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
