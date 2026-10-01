"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type SocialCardData = {
  id: string;
  title: string;
  topic: string;
  platform: "instagram" | "tiktok";
  url: string | null;
  poster: { src: string; blur?: string } | null;
  video: string | null;
  sample?: boolean;
};

const PLAY = "sd-social-play";

/**
 * 9:16 card in a phone-like frame. Hover (or tap) plays muted; leaving pauses.
 * A thin progress bar shows playback. Only one card plays at a time.
 */
export function SocialCard({ d }: { d: SocialCardData }) {
  const v = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const other = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== d.id) v.current?.pause();
    };
    window.addEventListener(PLAY, other);
    return () => window.removeEventListener(PLAY, other);
  }, [d.id]);

  const start = () => {
    if (!d.video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.dispatchEvent(new CustomEvent(PLAY, { detail: d.id }));
    if (!src) setSrc(d.video);
    else void v.current?.play().catch(() => {});
  };
  const stop = () => v.current?.pause();

  const label = d.platform === "instagram" ? "Instagram" : "TikTok";
  return (
    <figure className="group" onMouseEnter={start} onMouseLeave={stop} data-social-video={d.video ?? undefined}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-navy-ink p-[5px] shadow-[0_30px_60px_-30px_rgba(13,31,63,.45)] ring-1 ring-black/5 transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-2">
        <div className="relative h-full w-full overflow-hidden rounded-[23px] bg-navy">
          {d.poster && (
            <Image src={d.poster.src} alt="" fill sizes="(min-width:1024px) 22vw, 60vw" placeholder={d.poster.blur ? "blur" : "empty"} blurDataURL={d.poster.blur} className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]" />
          )}
          {src && (
            <video
              ref={v}
              src={src}
              muted
              loop
              playsInline
              autoPlay
              aria-hidden="true"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
            />
          )}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-[0.7rem] font-semibold text-white backdrop-blur">
              <Icon name={d.platform} className="size-3.5" /> {label}
            </span>
            {d.sample && <span className="rounded-full bg-white/85 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-navy-ink">Sample</span>}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-ink/90 via-navy-ink/40 to-transparent p-5 pt-20">
            <p className="micro text-smile">{d.topic}</p>
            <figcaption className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug text-white">{d.title}</figcaption>
            {d.video && (
              <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-white/20" aria-hidden="true">
                <div className="h-full bg-smile transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
              </div>
            )}
          </div>
          {d.video && (
            <button
              type="button"
              onClick={() => (playing ? stop() : start())}
              aria-label={playing ? `Pause: ${d.title}` : `Play: ${d.title}`}
              className="absolute right-4 top-14 grid size-10 place-items-center rounded-full bg-white/85 text-navy-ink opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Icon name={playing ? "pause" : "play"} className="size-4" />
            </button>
          )}
        </div>
      </div>
      {d.url && (
        <a href={d.url} target="_blank" rel="noopener noreferrer" className="link-smile mt-3 text-sm" data-track={`${d.platform}_click`}>
          <span className="label">Watch on {label}</span>
          <Icon name="arrowUpRight" className="arrow size-4" />
        </a>
      )}
    </figure>
  );
}
