import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { withSupabaseRetry } from "../lib/supabaseRetry";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const hydrationVersionRef = useRef(0);

  const ensureProfile = async (nextUser) => {
    if (!nextUser?.id) return;

    const payload = { id: nextUser.id };

    const emailFromAuth = nextUser.email || nextUser.user_metadata?.email || undefined;
    const phoneFromAuth = nextUser.phone || nextUser.user_metadata?.phone || undefined;

    if (emailFromAuth) payload.email = emailFromAuth;
    if (phoneFromAuth) payload.phone = phoneFromAuth;

    const { error } = await withSupabaseRetry(() =>
      supabase.from("profiles").upsert(payload, {
        onConflict: "id",
      }),
    );

    if (error) {
      const message = (error.message || "").toLowerCase();
      console.warn("Failed to ensure profile row:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        status: error.status,
      });

      if (message.includes("row-level security") || message.includes("rls")) {
        console.warn(
          "profiles upsert blocked by RLS. Ensure RLS policies exist for public.profiles (see supabase/reconcile-orders-profiles.sql).",
        );
      } else if (message.includes("does not exist") || message.includes("column")) {
        console.warn(
          "profiles table/columns may be missing. Ensure public.profiles exists and has (id, email, phone) (see supabase/reconcile-orders-profiles.sql).",
        );
      }
    }
  };

  const fetchRole = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) return "user";
    return data?.role ?? "user";
  };

  useEffect(() => {
    let active = true;
    let authStateQueue = Promise.resolve();

    const hydrateAuthState = async (nextUser) => {
      const hydrationVersion = ++hydrationVersionRef.current;
      if (!active) return;

      setUser(nextUser);

      if (nextUser) {
        await ensureProfile(nextUser);
        const nextRole = await fetchRole(nextUser.id);
        if (!active || hydrationVersion !== hydrationVersionRef.current) return;
        setRole(nextRole);
      } else {
        setRole(null);
      }

      if (!active || hydrationVersion !== hydrationVersionRef.current) return;
      setLoading(false);
    };

    const init = async () => {
      const { data, error } = await withSupabaseRetry(() =>
        supabase.auth.getSession(),
      );

      if (!active) return;

      if (error) {
        console.error("Failed to restore auth session:", error);
        await hydrateAuthState(null);
        return;
      }

      await hydrateAuthState(data?.session?.user ?? null);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        if (!active) return;

        authStateQueue = authStateQueue
          .then(() => hydrateAuthState(session?.user ?? null))
          .catch((queueError) => {
            console.error("Auth state update failed:", queueError);
          });
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signOut: () => withSupabaseRetry(() => supabase.auth.signOut()),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
