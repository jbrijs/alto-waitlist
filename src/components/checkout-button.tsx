"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  className?: string;
  label?: string;
  size?: "default" | "sm" | "lg";
}

export function CheckoutButton({
  className,
  label = "Secure Early Access — $100 Deposit",
  size = "lg",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <Button
      size={size}
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Redirecting…" : label}
    </Button>
  );
}
