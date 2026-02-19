import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    billing_address_collection: "auto",
    // Collect customer name & email at checkout
    customer_creation: "always",
    custom_fields: [
      {
        key: "full_name",
        label: { type: "custom", custom: "Full name" },
        type: "text",
        optional: false,
      },
    ],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/?cancelled=true`,
  });

  return NextResponse.json({ url: session.url });
}
