import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const sendWelcomeEmail = async (
  resendApiKey: string,
  userId: string,
  email: string,
  marketingConsent: boolean,
  unsubscribeUrl?: string,
) => {
  const unsubscribeText = marketingConsent && unsubscribeUrl
    ? `\n\nYou agreed to receive product news and offers. Unsubscribe: ${unsubscribeUrl}`
    : "";
  const unsubscribeHtml = marketingConsent && unsubscribeUrl
    ? `<p>You agreed to receive product news and offers. <a href="${unsubscribeUrl}">Unsubscribe from marketing emails</a>.</p>`
    : "";
  const headers: Record<string, string> = {
    Authorization: `Bearer ${resendApiKey}`,
    "Content-Type": "application/json",
  };

  if (marketingConsent && unsubscribeUrl) {
    headers["List-Unsubscribe"] = `<${unsubscribeUrl}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    let response: Response;

    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          ...headers,
          "Idempotency-Key": `geoshop-welcome-${userId}`,
        },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          from: "Geomatics <non-reply@auth.geomatics.co.ke>",
          to: [email],
          subject: "Welcome to Geomatics",
          text: `Welcome to Geomatics! Your geoshop account is ready. You can now sign in and explore our products.${unsubscribeText}`,
          html: `<p>Welcome to Geomatics!</p><p>Your geoshop account is ready. You can now sign in and explore our products.</p>${unsubscribeHtml}`,
        }),
      });
    } catch (error) {
      if (attempt === 2) {
        console.error("Welcome email request failed after retries:", error);
        return false;
      }
      await delay(250 * 2 ** attempt);
      continue;
    }

    if (response.ok) return true;
    if (response.status !== 429 && response.status < 500) {
      console.error("Welcome email provider returned a non-retryable error:", response.status);
      return false;
    }
    if (attempt === 2) {
      console.error("Welcome email provider failed after retries:", response.status);
      return false;
    }
    await delay(250 * 2 ** attempt);
  }

  return false;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey =
      Deno.env.get("RESEND_API_KEY") ?? Deno.env.get("SMTP_API_KEY");

    if (!supabaseUrl || !serviceRoleKey || !resendApiKey) {
      console.error("Registration function is missing required environment settings.");
      return jsonResponse({ error: "Registration service is not configured." }, 500);
    }

    let body: {
      email?: unknown;
      password?: unknown;
      phone?: unknown;
      marketingConsent?: unknown;
    };
    try {
      const parsedBody = await request.json();
      if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
        return jsonResponse({ error: "Invalid request body." }, 400);
      }
      body = parsedBody;
    } catch {
      return jsonResponse({ error: "Invalid request body." }, 400);
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const marketingConsent =
      typeof body.marketingConsent === "boolean" ? body.marketingConsent : false;

    if (body.marketingConsent !== undefined && typeof body.marketingConsent !== "boolean") {
      return jsonResponse({ error: "Marketing consent must be true or false." }, 400);
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || !phone) {
      return jsonResponse({ error: "A valid email, password, and phone are required." }, 400);
    }

    if (password.length > 128 || phone.length > 40) {
      return jsonResponse({ error: "Password or phone number is too long." }, 400);
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp =
      request.headers.get("cf-connecting-ip") ??
      forwardedFor?.split(",")[0]?.trim();

    if (!clientIp) {
      return jsonResponse({ error: "Unable to determine the request source." }, 400);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: allowed, error: rateLimitError } = await adminClient.rpc(
      "consume_register_rate_limit",
      { p_ip: clientIp },
    );

    if (rateLimitError) {
      console.error("Registration rate limit check failed:", rateLimitError.message);
      return jsonResponse({ error: "Unable to process registration right now." }, 500);
    }

    if (!allowed) {
      return jsonResponse(
        { error: "Too many registration attempts. Please try again in an hour." },
        429,
      );
    }

    const { data: created, error: createError } =
      await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { phone },
      });

    if (createError || !created.user) {
      console.error("Failed to create registered user:", createError?.message);
      return jsonResponse(
        { error: createError?.message ?? "Unable to create the account." },
        400,
      );
    }

    const { error: profileError } = await adminClient.from("profiles").upsert(
      { id: created.user.id, email, phone },
      { onConflict: "id" },
    );

    if (profileError) {
      console.error("Failed to save the new user's profile:", profileError.message);
      const { error: deleteError } = await adminClient.auth.admin.deleteUser(created.user.id);
      if (deleteError) {
        console.error("Failed to clean up the account after profile save failure:", deleteError.message);
      }
      return jsonResponse(
        { error: "Unable to finish account setup. Please try again." },
        500,
      );
    }

    const unsubscribeToken = marketingConsent ? crypto.randomUUID() : null;
    const { error: preferenceError } = await adminClient
      .from("marketing_preferences")
      .upsert(
        {
          user_id: created.user.id,
          marketing_consent: marketingConsent,
          consented_at: marketingConsent ? new Date().toISOString() : null,
          unsubscribed_at: null,
          unsubscribe_token: unsubscribeToken,
        },
        { onConflict: "user_id" },
      );

    if (preferenceError) {
      console.error("Failed to save marketing preference:", preferenceError.message);
      const { error: deleteError } = await adminClient.auth.admin.deleteUser(created.user.id);
      if (deleteError) {
        console.error("Failed to clean up the account after preference save failure:", deleteError.message);
      }
      return jsonResponse(
        { error: "Unable to finish account setup. Please try again." },
        500,
      );
    }

    const unsubscribeUrl = unsubscribeToken
      ? `${supabaseUrl.replace(/\/$/, "")}/functions/v1/unsubscribe-marketing?token=${unsubscribeToken}`
      : undefined;
    const emailSent = await sendWelcomeEmail(
      resendApiKey,
      created.user.id,
      email,
      marketingConsent,
      unsubscribeUrl,
    );

    if (!emailSent) {
      return jsonResponse({
        userId: created.user.id,
        emailSent: false,
        message: "Account created, but the welcome email could not be sent.",
      });
    }

    return jsonResponse({
      userId: created.user.id,
      emailSent: true,
      message: "Account created and welcome email sent.",
    });
  } catch (error) {
    console.error("Registration request failed:", error);
    return jsonResponse({ error: "Unable to complete registration." }, 500);
  }
});
