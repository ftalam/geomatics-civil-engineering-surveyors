import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 md:px-6 md:pb-6">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Cookie Consent
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We use cookies to run essential site features and, with your permission, improve performance through analytics and functional preferences.
        </p>
        {showCustomize && (
          <div className="mt-4 grid gap-3 rounded-xl border border-border bg-background/60 p-4 text-sm">
            <label className="flex items-start gap-3">
              <Checkbox checked disabled className="mt-0.5" />
              <span>
                <span className="font-medium text-foreground">Essential</span>
                <span className="ml-2 text-xs text-muted-foreground">Always active</span>
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
                <span className="block text-xs text-muted-foreground">
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
                <span className="block text-xs text-muted-foreground">
                  Enables enhanced features and remembered preferences.
                </span>
              </span>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowCustomize((prev) => !prev)}>
            {showCustomize ? "Hide Options" : "Customize"}
          </Button>
          <Button
            variant="outline"
            onClick={() => persistConsent({ essential: true, analytics: false, functional: false })}
          >
            Reject Optional
          </Button>
          <Button onClick={() => persistConsent(preferences)}>Save Preferences</Button>
          <Button
            variant="hero"
            className="products-theme"
            onClick={() => persistConsent({ essential: true, analytics: true, functional: true })}
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
