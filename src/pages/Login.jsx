import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { supabase } from "../lib/supabaseClient";
import { withSupabaseRetry } from "@/lib/supabaseRetry";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="mr-2" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    className="mr-2 text-blue-600"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirectPath = location.state?.from ?? "/geoshop";

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const { error } = await withSupabaseRetry(() =>
      supabase.auth.signInWithPassword({
        email,
        password,
      }),
    );

    setSubmitting(false);

    if (!error) {
      navigate(redirectPath, { replace: true });
      return;
    }

    alert(error.message);
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Sign in to your account"
      footer={
        <p>
          <span className="text-gray-500">Don't have an account? </span>
          <Link
            className="font-medium text-cyan-600 hover:text-cyan-700"
            to="/geoshop/register"
          >
            Create account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-1">
        <div>
          <label className="mb-1 block text-sm text-gray-500">Email</label>
          <input
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-black placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
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
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-base text-black placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
              type="checkbox"
            />
            <span className="ml-2 block text-sm text-gray-600">Remember me</span>
          </label>
          <Link className="text-sm text-cyan-600 hover:text-cyan-700" to="/contact">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-cyan-600 px-4 py-2 font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Signing In..." : "Sign in"}
        </button>

        <div className="mb-4 mt-4 text-center text-sm text-gray-500">Or sign in with</div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            className="flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            <FacebookIcon />
            Facebook
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
