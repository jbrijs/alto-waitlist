import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the stripe singleton before importing the route
vi.mock("@/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn(),
      },
    },
  },
}));

import { stripe } from "@/lib/stripe";
import { POST } from "@/app/api/checkout/route";

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_URL = "http://localhost:3000";
  });

  it("returns 400 when required fields are missing", async () => {
    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify({ name: "", email: "", businessName: "" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it("creates a stripe checkout session and returns url", async () => {
    vi.mocked(stripe.checkout.sessions.create).mockResolvedValue({
      url: "https://checkout.stripe.com/test",
    } as any);

    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        name: "Jane Doe",
        email: "jane@example.com",
        businessName: "Sunrise Care",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toBe("https://checkout.stripe.com/test");
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: {
          name: "Jane Doe",
          email: "jane@example.com",
          businessName: "Sunrise Care",
        },
      }),
    );
  });
});
