import { serve } from "https://deno.land/std@0.203.0/http/server.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

const supabase = createClient(
  Deno.env.get("VITE_SUPABASE_URL"),
  Deno.env.get("VITE_SUPABASE_SERVICE_ROLE_KEY")
);

serve(async (req) => {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) return new Response(JSON.stringify({ error: "Email and OTP required" }), { status: 400 });

    // Get latest unused OTP
    const { data: otpRows } = await supabase
      .from("otps")
      .select("*")
      .eq("email", email)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!otpRows || otpRows.length === 0) {
      return new Response(JSON.stringify({ error: "No OTP found" }), { status: 404 });
    }

    const otpRow = otpRows[0];

    // Check expiry
    if (new Date(otpRow.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "OTP expired" }), { status: 400 });
    }

    // Compare OTP
    const isValid = await bcrypt.compare(otp, otpRow.otp_hash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
    }

    // Mark OTP as used
    await supabase.from("otps").update({ used: true }).eq("id", otpRow.id);

    // Optional: create profile if not exists
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (!profile) {
      await supabase.from("profiles").insert({ email });
    }

    return new Response(JSON.stringify({ message: "OTP verified successfully" }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
});