"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  { n: "01", t: "Book", d: "Request a time online or call us. Tell us if it is your first visit, if anything is bothering you and whether you have insurance or CDCP." },
  { n: "02", t: "Visit", d: "We start with a conversation about your health and any worries, then a thorough, gentle exam with any x-rays you need." },
  { n: "03", t: "Care plan", d: "We explain what we found in plain language, walk through options and costs, and plan next steps together. No pressure." },
];

/** A thin smile-blue line travels through the three stages as the visitor scrolls. */
export function Journey({ actions = true, tone = "white" }: { actions?: boolean; tone?: "white" | "mist" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.25)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : ""}`} aria-labelledby="journey-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="04">New patients</Eyebrow>
            <Lines id="journey-title" className="t-xl mt-6" lines={["Your first visit,", "made simple."]} />
          </div>
          {actions && (
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-anim="fade">
              <ButtonLink href="/new-patients" arrow>
                New patient information
              </ButtonLink>
              <ButtonLink href="/patient-forms" variant="secondary" track="forms_click">
                Patient forms
              </ButtonLink>
            </div>
          )}
        </div>

        <div ref={ref} className="journey relative mt-16 lg:mt-24" style={{ "--p": 0 } as CSSProperties}>
          {/* Horizontal line (desktop) */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-[27px] hidden h-px bg-line lg:block">
            <div className="h-full origin-left bg-smile" style={{ transform: "scaleX(var(--p))" }} />
          </div>
          {/* Vertical line (mobile) */}
          <div aria-hidden="true" className="absolute bottom-0 left-[27px] top-0 w-px bg-line lg:hidden">
            <div className="w-full origin-top bg-smile" style={{ height: "100%", transform: "scaleY(var(--p))" }} />
          </div>
          <ol className="relative grid gap-14 lg:grid-cols-3 lg:gap-12">
            {steps.map((s, i) => (
              <li key={s.n} className="journey-step relative grid grid-cols-[56px_1fr] gap-6 lg:block" style={{ "--at": (i + 0.15) / steps.length } as CSSProperties}>
                <span className="journey-dot relative z-10 grid size-14 place-items-center rounded-full bg-white font-display text-sm font-semibold text-navy ring-1 ring-line-strong transition-all duration-700">
                  {s.n}
                </span>
                <div className="lg:mt-10">
                  <h3 className="t-lg">{s.t}</h3>
                  <p className="body-copy mt-4 max-w-[36ch]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
