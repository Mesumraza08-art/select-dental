"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives the scroll motion system: anything marked with data-anim receives the
 * class "in" as it enters the viewport. New elements (client-side swaps,
 * route changes) are picked up automatically.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-anim]").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    const scan = () => document.querySelectorAll("[data-anim]:not(.in)").forEach((el) => io.observe(el));
    scan();
    let t: number | undefined;
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(scan, 60);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
