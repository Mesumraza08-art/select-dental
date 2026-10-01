import Image from "next/image";
import { site } from "@/content/site";
import { Icon } from "./Icon";

/**
 * Image slot. Shows the real photo when `src` is supplied; otherwise an
 * art-directed placeholder that names the shot to be produced.
 */
export function Media({
  src,
  alt = "",
  shot,
  ratio = "4/5",
  tone = "cool",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className = "",
  rounded = "",
  reveal,
  label = "Photography to come",
}: {
  src?: string | null;
  alt?: string;
  shot: string;
  ratio?: string;
  tone?: "cool" | "warm" | "navy";
  sizes?: string;
  priority?: boolean;
  className?: string;
  rounded?: string;
  reveal?: boolean;
  label?: string;
}) {
  const style = { aspectRatio: ratio };
  if (src) {
    return (
      <div className={`media-frame ${rounded} ${className}`} style={style} data-reveal={reveal ? "" : undefined}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "navy";
  return (
    <div
      className={`media-frame media-ph tone-${tone} ${rounded} ${className}`}
      style={style}
      role="img"
      aria-label={`Image placeholder: ${shot}`}
      data-reveal={reveal ? "" : undefined}
    >
      <svg viewBox="0 0 200 60" className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <path
          d="M10 12 Q100 78 190 12"
          fill="none"
          stroke={dark ? "rgba(110,193,236,.35)" : "rgba(27,57,107,.10)"}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      {site.preview && (
        <div className={`absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 sm:p-5 ${dark ? "text-white/80" : "text-navy/75"}`}>
          <span className={`grid size-8 shrink-0 place-items-center rounded-full ${dark ? "bg-white/10" : "bg-white/80"}`}>
            <Icon name="camera" className="size-4" />
          </span>
          <span className="text-[0.8125rem] leading-snug">
            <span className="block font-semibold">{label}</span>
            <span className="block opacity-80">{shot}</span>
          </span>
        </div>
      )}
    </div>
  );
}
