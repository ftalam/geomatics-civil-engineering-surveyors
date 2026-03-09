import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie-consent-preferences";

const defaultPreferences = {
  essential: true,
  analytics: false,
  functional: false,
};

const normalizePreferences = (value) => ({
  essential: true,
  analytics: Boolean(value?.analytics),
  functional: Boolean(value?.functional),
});

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) {
      setIsVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      setPreferences(normalizePreferences(parsed));
      setIsVisible(false);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const persistConsent = (nextPreferences) => {
    if (typeof window === "undefined") return;

    const normalized = normalizePreferences(nextPreferences);
    setPreferences(normalized);

    const payload = {
      ...normalized,
      consentedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", {
        detail: payload,
      }),
    );

    setIsVisible(false);
    setShowCustomize(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-2 pb-0 md:px-3">
      <div className="mx-auto w-full max-w-4xl rounded-t-xl border border-border/40 bg-card/45 shadow-card backdrop-blur-md">
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-2 text-left"
          aria-expanded={!isCollapsed}
          aria-label="Toggle cookies panel"
        >
          <span className="font-display text-sm font-semibold text-foreground">
            Cookies
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isCollapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        {!isCollapsed && (
          <div className="px-4 pb-4">
            <p className="mt-0.5 text-xs text-muted-foreground">
              We use cookies to run essential site features and with your permission, improve performance through analytics and functional preferences.
            </p>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Read our{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              .
            </p>
            {showCustomize && (
              <div className="mt-2.5 grid gap-2 rounded-lg border border-border bg-background/50 p-3 text-xs">
                <label className="flex items-start gap-3">
                  <Checkbox checked disabled className="mt-0.5" />
                  <span>
                    <span className="font-medium text-foreground">Essential</span>
                    <span className="ml-2 text-[11px] text-muted-foreground">Always active</span>
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <Checkbox
                    checked={preferences.analytics}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({ ...prev, analytics: checked === true }))
                    }
                    className="mt-0.5"
                  />
                  <span>
                    <span className="font-medium text-foreground">Analytics</span>
                    <span className="block text-[11px] text-muted-foreground">
                      Helps us understand traffic and improve the website.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <Checkbox
                    checked={preferences.functional}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({ ...prev, functional: checked === true }))
                    }
                    className="mt-0.5"
                  />
                  <span>
                    <span className="font-medium text-foreground">Functional</span>
                    <span className="block text-[11px] text-muted-foreground">
                      Enables enhanced features and remembered preferences.
                    </span>
                  </span>
                </label>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Button size="sm" variant="outline" onClick={() => setShowCustomize((prev) => !prev)}>
                {showCustomize ? "Hide Options" : "Customize"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => persistConsent({ essential: true, analytics: false, functional: false })}
              >
                Deny
              </Button>
              <Button size="sm" onClick={() => persistConsent(preferences)}>Save Preferences</Button>
              <Button
                size="sm"
                variant="hero"
                className="products-theme"
                onClick={() => persistConsent({ essential: true, analytics: true, functional: true })}
              >
                Accept All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
