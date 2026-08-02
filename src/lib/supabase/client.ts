import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bXh4Y3BweXp1anN5dXFib3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDA0MTU2MDAsImV4cCI6MjAwMDQxNTYwMH0.placeholder";

  return createBrowserClient(url, key);
}
