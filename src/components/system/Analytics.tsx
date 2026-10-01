"use client";

import { useEffect } from "react";
import { readConsent, type Consent } from "./CookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads GA4 only after analytics consent, with Consent Mode defaults set to denied.
 * Tracks clicks on any element with data-track="event_name", plus tel:, mailto: and
 * outbound social links. Events: book_click, phone_click, directions_click, email_click,
 * instagram_click, tiktok_click, forms_click, emergency_call, emergency_request,
 * map_load, and booking_submit (sent via a custom "sd-track" event).
 */
export function Analytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    // gtag.js expects the real `arguments` object, not an array.
    const gtag = function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag = window.gtag || gtag;
    window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });

    let loaded = false;
    const apply = (c: Consent | null) => {
      if (!c) return;
      window.gtag!("consent", "update", {
        analytics_storage: c.analytics ? "granted" : "denied",
        ad_storage: c.marketing ? "granted" : "denied",
      });
      if (c.analytics && GA_ID && !loaded) {
        loaded = true;
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s);
        window.gtag!("js", new Date());
        window.gtag!("config", GA_ID, { anonymize_ip: true });
      }
    };
    apply(readConsent());
    const onChange = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    window.addEventListener("sd-consent-change", onChange);

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track], a[href^='tel:'], a[href^='mailto:']");
      if (!el) return;
      let name = el.dataset.track;
      const href = el.getAttribute("href") || "";
      if (!name && href.startsWith("tel:")) name = "phone_click";
      if (!name && href.startsWith("mailto:")) name = "email_click";
      if (!name) return;
      window.dataLayer!.push({ event: name, link_url: href, page_path: location.pathname });
      window.gtag?.("event", name, { link_url: href, page_path: location.pathname });
    };
    document.addEventListener("click", onClick);

    // Custom events from components, e.g. a submitted booking request
    const onCustom = (e: Event) => {
      const d = (e as CustomEvent<{ event: string } & Record<string, unknown>>).detail;
      if (!d?.event) return;
      const { event, ...params } = d;
      window.dataLayer!.push({ event, ...params, page_path: location.pathname });
      window.gtag?.("event", event, { ...params, page_path: location.pathname });
    };
    window.addEventListener("sd-track", onCustom);
    return () => {
      window.removeEventListener("sd-track", onCustom);
      window.removeEventListener("sd-consent-change", onChange);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
