"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { vids, type VidKey } from "@/content/videos";
import { Icon } from "./Icon";

/**
 * Short muted brand loop. Shows its poster immediately; the video file only
 * downloads when the frame comes near the viewport, plays while visible and
 * pauses when it leaves. Reduced motion or data saver: poster only.
 * A small control lets visitors pause any loop (WCAG 2.2.2).
 */
export function VideoLoop({
  v,
  ratio,
  className = "",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  reveal,
  delay = 0,
  position,
  children,
  control = true,
  controlClass = "bottom-4 right-4",
}: {
  v: VidKey;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
  delay?: number;
  position?: string;
  children?: ReactNode;
  control?: boolean;
  controlClass?: string;
}) {
  const m = vids[v];
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = frame.current;
    if (!el || !m) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        const vid = video.current;
        if (e.isIntersecting) {
          setSrc((s) => s ?? (mobile ? m.srcMobile : m.src));
          if (vid && vid.src && !userPaused.current) void vid.play().catch(() => {});
        } else if (vid) {
          vid.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [m]);

  useEffect(() => {
    if (src && video.current && !userPaused.current) void video.current.play().catch(() => {});
  }, [src]);

  if (!m) return null;

  const toggle = () => {
    const vid = video.current;
    if (!vid) return;
    if (vid.paused) {
      userPaused.current = false;
      void vid.play();
      setPaused(false);
    } else {
      userPaused.current = true;
      vid.pause();
      setPaused(true);
    }
  };

  return (
    <div
      ref={frame}
      className={`media-frame ${className}`}
      style={{ ...(ratio ? { aspectRatio: ratio } : {}), "--d": delay } as CSSProperties}
      data-anim={reveal ? "clip" : undefined}
      data-vkey={v}
    >
      <div className="media-inner">
        <Image
          src={m.poster}
          alt={m.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={m.blur}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
        {src && (
          <video
            ref={video}
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            style={position ? { objectPosition: position } : undefined}
          />
        )}
      </div>
      {children}
      {control && src && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className={`absolute z-10 grid size-9 place-items-center rounded-full bg-white/80 text-navy-ink opacity-70 backdrop-blur transition hover:opacity-100 focus-visible:opacity-100 ${controlClass}`}
        >
          <Icon name={paused ? "play" : "pause"} className="size-3.5" />
        </button>
      )}
    </div>
  );
}
