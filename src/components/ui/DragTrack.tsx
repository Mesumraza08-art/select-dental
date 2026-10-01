"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

/**
 * Horizontal, scroll-snapping track. Native scrolling for touch and trackpads,
 * click-and-drag for mouse users, and previous/next buttons for everyone.
 */
export function DragTrack({
  children,
  label,
  itemClass,
  controls = "top",
  gap = "gap-6",
}: {
  children: ReactNode[];
  label: string;
  itemClass: string;
  controls?: "top" | "bottom" | "none";
  gap?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const id = useId();
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "grid size-12 place-items-center rounded-full bg-white text-navy ring-1 ring-line-strong transition hover:bg-navy hover:text-white hover:ring-navy disabled:pointer-events-none disabled:opacity-35";
  const buttons =
    controls === "none" ? null : (
      <div className={`flex gap-2 ${controls === "top" ? "mb-8 justify-end" : "mt-8"}`}>
        <button type="button" onClick={() => page(-1)} disabled={edge.start} aria-controls={id} aria-label="Previous" className={btn}>
          <Icon name="arrow" className="size-5 rotate-180" />
        </button>
        <button type="button" onClick={() => page(1)} disabled={edge.end} aria-controls={id} aria-label="Next" className={btn}>
          <Icon name="arrow" className="size-5" />
        </button>
      </div>
    );

  return (
    <div aria-roledescription="carousel" aria-label={label}>
      {controls === "top" && buttons}
      <ul
        id={id}
        ref={track}
        className={`bleed-track no-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-4 ${gap} cursor-grab active:cursor-grabbing`}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
          track.current.style.scrollSnapType = "none";
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          if (track.current) track.current.style.scrollSnapType = "";
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          if (track.current) track.current.style.scrollSnapType = "";
          drag.current = null;
        }}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children.map((c, i) => (
          <li key={i} className={`shrink-0 snap-start ${itemClass}`} aria-roledescription="slide" aria-label={`${i + 1} of ${children.length}`}>
            {c}
          </li>
        ))}
      </ul>
      {controls === "bottom" && buttons}
    </div>
  );
}
