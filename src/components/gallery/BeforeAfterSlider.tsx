"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Before and after comparison driven by a native range input, so it works with
 * keyboard, touch, mouse and screen readers.
 */
export function BeforeAfterSlider({
  before,
  after,
  label,
  className = "aspect-[4/3]",
  demo,
}: {
  before: ReactNode;
  after: ReactNode;
  label: string;
  className?: string;
  demo?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className={`ba-slider relative overflow-hidden rounded-[var(--radius-media)] bg-mist ${className}`}>
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>
      {demo && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p className="rotate-[-8deg] rounded-full border border-white/70 bg-navy-ink/35 px-5 py-2 text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm sm:text-xs">
            Demonstration only &middot; Not a patient result
          </p>
        </div>
      )}
      <span className="micro pointer-events-none absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-navy-ink">Before</span>
      <span className="micro pointer-events-none absolute right-5 top-5 rounded-full bg-navy-ink/85 px-3 py-1.5 text-white">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-white" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="ba-handle absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-[0_10px_30px_rgba(13,31,63,.25)]">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        {label}: drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before shown`}
        className="ba-input absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
