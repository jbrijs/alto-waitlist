"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  businessName: z.string().min(1, "Business name is required."),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", businessName: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = schema.safeParse(form);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong.");
      }

      const { url } = await res.json();
      if (!url) {
        setServerError("No redirect URL received. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="bg-white border-gray-200 focus-visible:ring-teal-500/30"
          disabled={loading}
        />
        {fieldErrors.name && (
          <p role="alert" className="text-xs text-red-600">{fieldErrors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@yourcompany.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="bg-white border-gray-200 focus-visible:ring-teal-500/30"
          disabled={loading}
        />
        {fieldErrors.email && (
          <p role="alert" className="text-xs text-red-600">{fieldErrors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
          Business Name
        </Label>
        <Input
          id="businessName"
          type="text"
          placeholder="Sunrise Home Care"
          value={form.businessName}
          onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
          className="bg-white border-gray-200 focus-visible:ring-teal-500/30"
          disabled={loading}
        />
        {fieldErrors.businessName && (
          <p role="alert" className="text-xs text-red-600">{fieldErrors.businessName}</p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-600 font-medium">{serverError}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 text-sm font-semibold rounded-lg text-white"
        style={{ background: loading ? "#5eada8" : "#0d9488" }}
      >
        {loading ? "Redirecting to checkout..." : "Reserve My Spot — $100 →"}
      </Button>

      <p className="text-center text-xs text-gray-400">
        $100 deposit is fully refundable if Alto isn&apos;t a fit.
      </p>
    </form>
  );
}
