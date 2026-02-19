import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { name, email, businessName } = await req.json();

  if (!name?.trim() || !email?.trim() || !businessName?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and business name are required." },
      { status: 400 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Alto Early Access — Refundable Deposit",
              description:
                "Secures your spot for Alto early access and preferred pricing. Fully refundable if Alto isn't a fit.",
            },
            unit_amount: 10000, // $100.00
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: { name, email, businessName },
      success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?canceled=true`,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 },
    );
  }

  if (!session.url) {
    return NextResponse.json(
      { error: "No checkout URL returned from Stripe." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
