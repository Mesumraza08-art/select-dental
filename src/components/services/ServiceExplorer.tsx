"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

export type ExplorerPanel = {
  key: string;
  name: string;
  short: string;
  blurb: string;
  media: ReactNode;
  services: { slug: string; name: string; summary: string }[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Interactive service showcase: categories on the left, a large crossfading film or photo, and the services within. */
export function ServiceExplorer({ panels }: { panels: ExplorerPanel[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = panels[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % panels.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + panels.length) % panels.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = panels.length - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-10">
      {/* Category list */}
      <div
        role="tablist"
        aria-label="Service categories"
        aria-orientation="vertical"
        className="no-scrollbar -mx-[var(--pad)] flex gap-2 overflow-x-auto px-[var(--pad)] lg:col-span-4 lg:mx-0 lg:block lg:overflow-visible lg:px-0"
      >
        {panels.map((panel, i) => {
          const selected = i === active;
          return (
            <button
              key={panel.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-t${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group relative shrink-0 rounded-full px-5 py-3 text-left transition-colors duration-300 lg:flex lg:w-full lg:items-baseline lg:gap-5 lg:rounded-none lg:border-b lg:border-line lg:px-0 lg:py-6 ${
                selected ? "bg-navy text-white lg:bg-transparent lg:text-navy-ink" : "bg-white text-muted ring-1 ring-line lg:bg-transparent lg:ring-0 hover:text-navy-ink"
              }`}
            >
              <span className="num hidden w-8 text-sm text-smile-deep lg:inline">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em] lg:text-[clamp(1.4rem,1rem+1vw,2rem)]">{panel.short}</span>
              {selected && (
                <motion.span
                  layoutId={`${uid}-bar`}
                  className="absolute -bottom-px left-0 hidden h-[2px] w-full bg-smile lg:block"
                  transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Media and details */}
      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-t${active}`} className="relative grid gap-8 md:grid-cols-8 lg:col-span-8 lg:gap-10">
        <span aria-hidden="true" className="num pointer-events-none absolute -top-16 right-0 hidden text-[11rem] leading-none text-navy/[0.04] lg:block">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={p.key}
              className="block"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </span>

        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-mist">
            <AnimatePresence initial={false}>
              <motion.div
                key={p.key}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                {p.media}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative md:col-span-3 md:pt-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.key}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <h3 className="t-md">{p.name}</h3>
              <p className="body-copy mt-3 text-[0.975rem]">{p.blurb}</p>
              <ul className="mt-7 border-t border-line">
                {p.services.map((s) => (
                  <li key={s.slug} className="border-b border-line">
                    <Link href={`/services/${s.slug}`} className="group/s flex items-center justify-between gap-4 py-4">
                      <span className="font-display text-[1.02rem] font-semibold text-navy-ink transition-colors group-hover/s:text-navy">{s.name}</span>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-navy transition-all duration-500 group-hover/s:bg-navy group-hover/s:text-white">
                        <Icon name="arrow" className="size-4 transition-transform duration-500 group-hover/s:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/services/${p.services[0]?.slug ?? ""}`} className="link-smile mt-6 text-[0.95rem]">
                <span className="label">Explore {p.short.toLowerCase()}</span>
                <Icon name="arrow" className="arrow size-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
