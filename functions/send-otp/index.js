import { serve } from "https://deno.land/std@0.203.0/http/server.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

const SMTP_API_KEY = Deno.env.get("SMTP_API_KEY"); // e.g., Resend or SendGrid
const SMTP_FROM = Deno.env.get("SMTP_FROM");       // Verified sender email

serve(async (req) => {
  try {
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ error: "Email required" }), { status: 400 });

    // Rate limiting: max 5 OTPs per hour per email
    const { data: recentOtps } = await supabase
      .from("otps")
      .select("*")
      .eq("email", email)
      .gte("created_at", new Date(Date.now() - 60*60*1000).toISOString());

    if (recentOtps?.length >= 5) {
      return new Response(JSON.stringify({ error: "Too many OTP requests. Try again later." }), { status: 429 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP
    const otp_hash = await bcrypt.hash(otp, 10);

    // Expiry: 10 minutes
    const expires_at = new Date(Date.now() + 10*60*1000).toISOString();

    // Insert into DB
    await supabase.from("otps").insert({ email, otp_hash, expires_at });

    // Send OTP email (Resend example)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SMTP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SMTP_FROM,
        to: [email],
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}. Expires in 10 minutes.`
      })
    });

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
});