import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { supabase } from "../lib/supabaseClient";
import { withSupabaseRetry } from "@/lib/supabaseRetry";

export default function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState("request_otp"); // request_otp | verify_otp
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim() || !phone.trim()) {
      alert("Email, phone and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const { data: signUpData, error: signUpError } = await withSupabaseRetry(() =>
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone,
            marketing_consent: marketingConsent,
          },
        },
      }),
    );

    if (signUpError) {
      setSubmitting(false);
      if ((signUpError.message || "").toLowerCase().includes("database error saving new user")) {
        alert(
          "SignUp failed due to a database trigger/policy issue (commonly profiles auto-create). Check your Supabase SQL setup and run supabase/reconcile-orders-profiles.sql in the same project as your VITE_SUPABASE_URL.",
        );
        return;
      }

      alert(signUpError.message);
      return;
    }

    const { error: otpError } = await withSupabaseRetry(() =>
      supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      }),
    );

    setSubmitting(false);

    if (otpError) {
      alert(otpError.message);
      return;
    }

    alert("OTP sent to your email. Enter it to verify your account.");
    setStep("verify_otp");
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const { data, error } = await withSupabaseRetry(() =>
      supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      }),
    );

    setSubmitting(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.session) {
      navigate("/geoshop", { replace: true });
      return;
    }

    alert("Verification succeeded, but no session was created. Try logging in.");
    navigate("/geoshop/login");
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Verify your details to create your geoshop account"
      footer={
        <p>
          <span className="text-gray-500">Already have an account? </span>
          <Link
            className="font-medium text-cyan-600 hover:text-cyan-700"
            to="/geoshop/login"
          >
            Login
          </Link>
        </p>
      }
    >
      {step === "request_otp" ? (
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm text-gray-500">Phone</label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-800 placeholder:text-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              placeholder="(+254)7 12 345678"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Use international format (example: (+254)7 12 345678).
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Email</label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-800 placeholder:text-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              placeholder="your.email@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Password</label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-800 placeholder:text-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Create a password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Confirm password</label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-800 placeholder:text-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Re-enter password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              className="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
              type="checkbox"
              checked={marketingConsent}
              onChange={(event) => setMarketingConsent(event.target.checked)}
            />
            <span>
              Send me occasional product news and offers by email. This is optional,
              and I can unsubscribe at any time.
            </span>
          </label>

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-cyan-600 px-4 py-2 font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm text-gray-500">Email</label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-800 placeholder:text-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">OTP code</label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-800 placeholder:text-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              placeholder="123456"
              inputMode="numeric"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-cyan-600 px-4 py-2 font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Verifying..." : "Verify & Continue"}
          </button>

          <button
            type="button"
            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleRegister}
            disabled={submitting}
          >
            Resend OTP
          </button>

          <button
            type="button"
            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => setStep("request_otp")}
            disabled={submitting}
          >
            Back
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
