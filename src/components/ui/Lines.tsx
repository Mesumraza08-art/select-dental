import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Editorial headline set line by line. Each line rises through a mask when it
 * scrolls into view. The full sentence stays in the DOM as normal heading text.
 */
export function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  id,
  delay = 0,
  animate = true,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  id?: string;
  delay?: number;
  animate?: boolean;
}) {
  return (
    <Tag id={id} className={`lines ${className}`} data-anim={animate ? "lines" : undefined} style={{ "--d": delay } as CSSProperties}>
      {lines.map((l, i) => (
        <span key={i} className="ln">
          <span style={{ "--i": i } as CSSProperties}>{l}</span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** Small uppercase label with the smile mark, optionally numbered ("01 / Our approach"). */
export function Eyebrow({ children, n, className = "", plain }: { children: ReactNode; n?: string; className?: string; plain?: boolean }) {
  return (
    <p className={`eyebrow ${plain ? "no-mark" : ""} ${className}`}>
      {n && <span className="text-muted/70">{n} /</span>}
      {children}
    </p>
  );
}
