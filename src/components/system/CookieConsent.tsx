"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type Consent = { necessary: true; analytics: boolean; marketing: boolean; ts: number };
const KEY = "sd-consent-v1";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Omit<Consent, "necessary" | "ts">) {
  const value: Consent = { necessary: true, ...c, ts: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  window.dispatchEvent(new CustomEvent("sd-consent-change", { detail: value }));
}

export function CookieSettingsButton({ className = "inline-flex min-h-[44px] items-center hover:text-navy" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("sd-open-consent"))}
    >
      Cookie settings
    </button>
  );
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      // Wait until the opening animation has finished before asking
      let t: number;
      const ask = () => {
        const intro = document.documentElement.dataset.intro;
        if (intro === "play" || intro === "fading") t = window.setTimeout(ask, 500);
        else setOpen(true);
      };
      t = window.setTimeout(ask, 2600);
      return () => window.clearTimeout(t);
    }
    setAnalytics(existing.analytics);
    setMarketing(existing.marketing);
  }, []);

  useEffect(() => {
    const reopen = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener("sd-open-consent", reopen);
    return () => window.removeEventListener("sd-open-consent", reopen);
  }, []);

  if (!open) return null;
  const done = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m });
    setOpen(false);
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-[76px] z-[45] mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-20px_rgba(15,35,70,.35)] sm:p-6 lg:bottom-6 lg:left-6 lg:right-auto"
    >
      <h2 id="cookie-title" className="h4">
        Cookies on this site
      </h2>
      <p className="mt-2 text-[0.9375rem] text-muted">
        We use essential cookies to make the site work. With your permission we also use analytics cookies to
        understand how the site is used. Read our{" "}
        <Link href="/privacy-policy" className="text-navy underline underline-offset-4">
          privacy policy
        </Link>
        .
      </p>

      {custom && (
        <fieldset className="mt-4 space-y-3 border-t border-line pt-4">
          <legend className="sr-only">Cookie preferences</legend>
          <label className="flex items-start gap-3 text-[0.9375rem]">
            <input type="checkbox" checked disabled className="mt-1 size-5 accent-navy" />
            <span>
              <span className="font-semibold text-ink">Essential</span>
              <span className="block text-muted">Needed for the site to work. Always on.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[0.9375rem]">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 size-5 accent-navy" />
            <span>
              <span className="font-semibold text-ink">Analytics</span>
              <span className="block text-muted">Anonymous usage statistics through Google Analytics.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[0.9375rem]">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 size-5 accent-navy" />
            <span>
              <span className="font-semibold text-ink">Marketing</span>
              <span className="block text-muted">Embedded social media and advertising measurement.</span>
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {custom ? (
          <button type="button" className="btn btn-primary btn-sm" onClick={() => done(analytics, marketing)}>
            Save preferences
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => done(true, false)}>
              Accept analytics
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => done(false, false)}>
              Essential only
            </button>
            <button type="button" className="btn btn-sm text-navy underline underline-offset-4" onClick={() => setCustom(true)}>
              Customize
            </button>
          </>
        )}
      </div>
    </section>
  );
}
