/** The smile curve from the logo, reduced to a single stroke for use as a motif. */
export function SmileMark({ className = "", draw, strokeWidth = 3 }: { className?: string; draw?: boolean; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 120 24" className={`${draw ? "smile-draw" : ""} ${className}`} aria-hidden="true" focusable="false">
      <path
        d="M3 4 Q60 40 117 4"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
