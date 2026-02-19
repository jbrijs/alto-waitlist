import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <CheckCircle2 className="mb-6 size-12 text-muted-foreground" />
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">
        You're on the list.
      </h1>
      <p className="mb-8 max-w-md text-balance text-lg text-muted-foreground">
        Your $100 deposit is confirmed. We'll reach out shortly with next steps
        and your onboarding timeline. Check your inbox for a confirmation email.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Back to Alto</Link>
      </Button>
    </div>
  );
}
