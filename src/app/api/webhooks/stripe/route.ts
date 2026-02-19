import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { sendWaitlistConfirmation } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

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
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email ?? null;
    const nameField = session.custom_fields?.find(
      (f) => f.key === "full_name",
    );
    const name = nameField?.text?.value ?? null;
    const paymentIntent =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null;

    // Save to Supabase
    const supabase = createServiceClient();
    await supabase.from("waitlist").upsert(
      {
        email,
        name,
        stripe_session_id: session.id,
        stripe_payment_intent: paymentIntent,
      },
      { onConflict: "stripe_session_id" },
    );

    // Send confirmation email
    if (email) {
      await sendWaitlistConfirmation({ email, name });
    }
  }

  return NextResponse.json({ received: true });
}
