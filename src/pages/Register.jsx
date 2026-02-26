import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { withSupabaseRetry } from "@/lib/supabaseRetry";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const { error } = await withSupabaseRetry(() =>
      supabase.auth.signUp({ email, password }),
    );
    setSubmitting(false);

    if (!error) {
      alert("Registration successful. Check your email to confirm.");
      navigate("/login");
      return;
    } else {
      alert(error.message);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register to start shopping Geoshop products and submit your orders."
      footer={
        <p>
          Already have an account?{" "}
          <Link className="font-semibold text-orange-300 underline" to="/login">
            Login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full rounded-lg border border-white/30 bg-white/10 p-3 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="w-full rounded-lg border border-white/30 bg-white/10 p-3 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-primary p-3 font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Creating Account..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}
