import { createClient } from "@supabase/supabase-js";

// Browser-safe client (anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Server-only client (service role — never import in client components)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/*
  Required Supabase table — run this SQL in your project's SQL editor:

  create table waitlist (
    id            uuid        primary key default gen_random_uuid(),
    email         text        not null,
    name          text,
    stripe_session_id   text unique,
    stripe_payment_intent text,
    created_at    timestamptz default now()
  );

  -- Enable RLS
  alter table waitlist enable row level security;

  -- Only service role can insert/read (webhook uses service client)
  create policy "service role only"
    on waitlist for all
    using (false);
*/
