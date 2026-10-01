"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";

/**
 * Accordion with smooth height transitions. Answers stay in the page for search
 * engines; collapsed answers are inert so keyboard users skip them.
 */
export function FAQAccordion({ items, dark, defaultOpen = -1 }: { items: { q: string; a: string }[]; dark?: boolean; defaultOpen?: number }) {
  const [open, setOpen] = useState<number>(defaultOpen);
  const uid = useId();
  const line = dark ? "border-white/15" : "border-line";
  return (
    <div className={`border-t ${line}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`acc-item border-b ${line}`} data-open={isOpen}>
            <h3>
              <button
                type="button"
                id={`${uid}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex min-h-[72px] w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className={`font-display text-[1.125rem] font-semibold tracking-[-0.015em] sm:text-[1.25rem] ${dark ? "text-white" : "text-navy-ink"}`}>
                  {f.q}
                </span>
                <span
                  className={`acc-icon grid size-10 shrink-0 place-items-center rounded-full ${
                    dark ? "bg-white/10 text-white" : "bg-mist text-navy group-hover:bg-smile-soft"
                  }`}
                >
                  <Icon name="plus" className="size-4" />
                </span>
              </button>
            </h3>
            <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} className="acc-panel" inert={!isOpen}>
              <div>
                <p className={`max-w-[64ch] pb-7 pr-14 ${dark ? "text-[#c6d4e8]" : "text-muted"}`}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
