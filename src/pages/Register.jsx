import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { supabase } from "../lib/supabaseClient";
import { withSupabaseRetry } from "@/lib/supabaseRetry";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      navigate("/geoshop/login");
      return;
    }

    alert(error.message);
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your geoshop account"
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
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm text-gray-500">Email</label>
          <input
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-800 placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            placeholder="your.email@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label className="mb-1 block text-sm text-gray-500">Password</label>
          <div className="relative">
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-base text-gray-800 placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Create a strong password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-cyan-600 px-4 py-2 font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Creating Account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
