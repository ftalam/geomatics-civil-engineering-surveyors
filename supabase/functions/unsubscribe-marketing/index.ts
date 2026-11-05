import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const htmlResponse = (html: string, status = 200) =>
  new Response(html, {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'; form-action 'self'; style-src 'unsafe-inline'",
      "X-Content-Type-Options": "nosniff",
    },
  });

const isUuid = (value: string | null): value is string =>
  value !== null &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "GET" && request.method !== "POST") {
    return htmlResponse("<p>Method not allowed.</p>", 405);
  }

  const url = new URL(request.url);
  let token = url.searchParams.get("token");

  if (request.method === "GET") {
    if (!isUuid(token)) {
      return htmlResponse("<p>This unsubscribe link is invalid or expired.</p>", 400);
    }

    return htmlResponse(
      `<main><h1>Unsubscribe from marketing emails</h1><p>Confirm that you no longer want to receive product news and offers.</p><form method="post" action="${url.pathname}"><input type="hidden" name="token" value="${token}"><button type="submit">Unsubscribe</button></form></main>`,
    );
  }

  if (!token) {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      try {
        const body: { token?: unknown } = await request.json();
        token = typeof body.token === "string" ? body.token : null;
      } catch {
        return htmlResponse("<p>Invalid unsubscribe request.</p>", 400);
      }
    } else {
      const formData = await request.formData().catch(() => null);
      const formToken = formData?.get("token");
      token = typeof formToken === "string" ? formToken : null;
    }
  }

  if (!isUuid(token)) {
    return htmlResponse("<p>This unsubscribe link is invalid or expired.</p>", 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Unsubscribe function is missing required environment settings.");
    return htmlResponse("<p>Unable to process your request right now.</p>", 500);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await adminClient
    .from("marketing_preferences")
    .update({
      marketing_consent: false,
      unsubscribed_at: new Date().toISOString(),
      unsubscribe_token: null,
    })
    .eq("unsubscribe_token", token)
    .select("user_id")
    .maybeSingle();

  if (error) {
    console.error("Failed to apply marketing unsubscribe:", error.message);
    return htmlResponse("<p>Unable to process your request right now.</p>", 500);
  }

  return htmlResponse(
    data
      ? "<main><h1>You are unsubscribed</h1><p>You will no longer receive promotional emails from Geomatics.</p></main>"
      : "<main><h1>Unsubscribe complete</h1><p>This link was already used or is no longer active.</p></main>",
  );
});
