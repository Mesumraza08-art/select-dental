"use client";

import { useEffect, useRef, useState } from "react";
import { LOGO_PATHS, LOGO_SMILE_BOX, LOGO_VIEWBOX } from "@/components/brand/logoPaths";
import { site } from "@/content/site";

/**
 * "Open with a smile"
 * Plays the clinic's intro film (site.media.introVideo). When the logo in the film has
 * settled, a pixel-matched still of that logo takes its place, breathes once, and glides
 * into the live header while the page fades in underneath: one continuous movement.
 *
 * If no film is configured, a vector version of the same sequence is drawn from the logo.
 * Plays once per session on the homepage, never with reduced motion. Any key, click or
 * scroll skips it. If the film cannot start quickly, the intro is skipped.
 */
const T = {
  drawStart: 40,
  drawDur: 680,
  glideStart: 800,
  glideDur: 580,
  selectStart: 830,
  dentalStart: 910,
  wordDur: 620,
  breatheStart: 1400,
  breatheDur: 260,
  flyStart: 1640,
  flyDur: 600,
};

const DRAW = "cubic-bezier(.45,0,.2,1)";
const GLIDE = "cubic-bezier(.7,0,.2,1)";
const OUT = "cubic-bezier(.22,1,.36,1)";
const FLY = "cubic-bezier(.65,0,.25,1)";

export function LogoIntro() {
  const [gone, setGone] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const smileRef = useRef<SVGGElement>(null);
  const maskRef = useRef<SVGRectElement>(null);
  const selectRef = useRef<SVGGElement>(null);
  const dentalRef = useRef<SVGGElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);

  const [sx0, sy0, sx1, sy1] = LOGO_SMILE_BOX;
  const dx = LOGO_VIEWBOX.w / 2 - (sx0 + sx1) / 2;
  const dy = LOGO_VIEWBOX.h / 2 - (sy0 + sy1) / 2;
  const startSmile = `translate(${dx}px, ${dy}px) scale(1.35)`;

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "play") {
      setGone(true);
      return;
    }
    // On a slow load, don't make people wait: show the page instead.
    if (performance.now() > 1600) {
      html.dataset.intro = "skip";
      setGone(true);
      return;
    }
    html.setAttribute("data-intro-started", "");
    let ended = false;
    const anims: Animation[] = [];
    const timers: number[] = [];

    const finish = () => {
      if (ended) return;
      ended = true;
      try {
        sessionStorage.setItem("sd-intro", "1");
      } catch {}
      html.dataset.intro = "done";
      setGone(true);
    };
    const skip = () => {
      anims.forEach((a) => a.cancel());
      finish();
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    window.addEventListener("touchmove", skip, { once: true, passive: true });

    try {
      const iv = site.media.introVideo;
      if (iv && videoRef.current && stillRef.current) {
        const v = videoRef.current;
        const still = stillRef.current;
        let handedOff = false;
        const handoff = () => {
          if (handedOff || ended) return;
          handedOff = true;
          // Place the matching still exactly over the logo in the current frame
          const r = v.getBoundingClientRect();
          const s = r.width / iv.frame[0];
          const [bx, by, bw, bh] = iv.logoBox;
          const L = r.left + bx * s;
          const T0 = r.top + by * s;
          Object.assign(still.style, { left: `${L}px`, top: `${T0}px`, width: `${bw * s}px`, height: `${bh * s}px`, opacity: "1" });
          v.pause();
          v.style.opacity = "0";
          // Breathe once
          anims.push(
            still.animate([{ transform: "scale(1)" }, { transform: "scale(1.012)", offset: 0.45 }, { transform: "scale(1)" }], {
              duration: T.breatheDur,
              easing: "ease-in-out",
            })
          );
          timers.push(
            window.setTimeout(() => {
              if (ended) return;
              const holder = document.querySelector<HTMLElement>("[data-header-logo]");
              const target = holder?.querySelector("img") ?? holder;
              if (!target) return skip();
              const t = target.getBoundingClientRect();
              const [ix, iy, iw, ih] = iv.inkBox;
              const k = (t.width * 0.995) / (iw * s);
              // centre of the logo artwork inside the still, in screen pixels
              const pcx = (ix - bx + iw / 2) * s;
              const pcy = (iy - by + ih / 2) * s;
              const dx = t.left + t.width / 2 - L - k * pcx;
              const dy = t.top + t.height / 2 - T0 - k * pcy;
              html.dataset.intro = "fading";
              const fly = still.animate(
                [
                  { transform: "translate(0px, 0px) scale(1)", filter: "blur(0px)" },
                  { filter: "blur(1px)", offset: 0.5 },
                  { transform: `translate(${dx}px, ${dy}px) scale(${k})`, filter: "blur(0px)" },
                ],
                { duration: T.flyDur, easing: FLY, fill: "forwards" }
              );
              anims.push(fly);
              anims.push(bgRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T.flyDur - 80, delay: 80, easing: OUT, fill: "forwards" }));
              fly.onfinish = finish;
            }, T.breatheDur)
          );
          timers.push(window.setTimeout(finish, T.breatheDur + T.flyDur + 900));
        };
        const watch = () => {
          if (ended || handedOff) return;
          if (v.currentTime >= iv.handoffAt || v.ended) return handoff();
          if ("requestVideoFrameCallback" in v) (v as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => void }).requestVideoFrameCallback(watch);
          else requestAnimationFrame(watch);
        };
        let started = false;
        v.addEventListener("playing", () => {
          started = true;
          watch();
        }, { once: true });
        v.addEventListener("ended", handoff, { once: true });
        const sources = v.querySelectorAll("source");
        sources[sources.length - 1]?.addEventListener("error", skip, { once: true });
        v.play().catch(skip);
        // If the film cannot start promptly, don't keep people waiting
        timers.push(window.setTimeout(() => !started && skip(), 2200));
      } else {
        const smile = smileRef.current!;
        const mask = maskRef.current!;
        const select = selectRef.current!;
        const dental = dentalRef.current!;
        const wrap = wrapRef.current!;

        // 1. Draw: a feathered mask widens from the centre of the smile
        anims.push(mask.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: T.drawDur, delay: T.drawStart, easing: DRAW, fill: "both" }));
        anims.push(
          smile.animate(
            [
              { opacity: 0, filter: "blur(4px)", transform: `${startSmile} scaleX(0.94)` },
              { opacity: 1, filter: "blur(0px)", transform: startSmile, offset: 0.7 },
              { opacity: 1, filter: "blur(0px)", transform: startSmile },
            ],
            { duration: T.drawDur, delay: T.drawStart, easing: OUT, fill: "both" }
          )
        );
        // 2. Glide into place while the wordmark rises through its mask
        anims.push(
          smile.animate([{ transform: startSmile }, { transform: "translate(0px, 0px) scale(1)" }], {
            duration: T.glideDur,
            delay: T.glideStart,
            easing: GLIDE,
            fill: "forwards",
          })
        );
        for (const [el, delay] of [
          [select, T.selectStart],
          [dental, T.dentalStart],
        ] as const) {
          anims.push(
            el.animate(
              [
                { clipPath: "inset(100% 0 0 0)", transform: "translateY(42px)", filter: "blur(6px)", opacity: 0.4 },
                { clipPath: "inset(0% 0 0 0)", transform: "translateY(0px)", filter: "blur(0px)", opacity: 1 },
              ],
              { duration: T.wordDur, delay, easing: OUT, fill: "both" }
            )
          );
        }
        // 3. A single breath
        anims.push(
          wrap.animate([{ transform: "scale(1)" }, { transform: "scale(1.014)", offset: 0.45 }, { transform: "scale(1)" }], {
            duration: T.breatheDur,
            delay: T.breatheStart,
            easing: "ease-in-out",
          })
        );
        // 4. Glide into the live header logo, measured now so it is exact at every breakpoint
        timers.push(
          window.setTimeout(() => {
            if (ended) return;
            const holder = document.querySelector<HTMLElement>("[data-header-logo]");
            const target = holder?.querySelector("img") ?? holder;
            if (!target) return skip();
            const t = target.getBoundingClientRect();
            const w = wrap.getBoundingClientRect();
            html.dataset.intro = "fading";
            const fly = wrap.animate(
              [
                { transform: "translate(0px, 0px) scale(1)", filter: "blur(0px)" },
                { filter: "blur(1.1px)", offset: 0.5 },
                { transform: `translate(${t.left - w.left}px, ${t.top - w.top}px) scale(${t.width / w.width})`, filter: "blur(0px)" },
              ],
              { duration: T.flyDur, easing: FLY, fill: "forwards" }
            );
            anims.push(fly);
            anims.push(bgRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T.flyDur - 80, delay: 80, easing: OUT, fill: "forwards" }));
            fly.onfinish = finish;
          }, T.flyStart)
        );
        timers.push(window.setTimeout(finish, T.flyStart + T.flyDur + 900));
      }
    } catch {
      finish();
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      anims.forEach((a) => a.cancel());
    };
  }, [startSmile]);

  if (gone) return null;

  const groupStyle = { transformBox: "fill-box", transformOrigin: "center" } as React.CSSProperties;
  const pad = 30;

  return (
    <div className="intro-layer fixed inset-0 z-[100] items-center justify-center" aria-hidden="true">
      <div ref={bgRef} className="absolute inset-0 bg-white" />
      {site.media.introVideo ? (
        <>
          <video ref={videoRef} muted playsInline preload="auto" className="intro-video">
            <source src={site.media.introVideo.src} type='video/mp4; codecs="avc1.640028"' />
            {site.media.introVideo.webm && <source src={site.media.introVideo.webm} type='video/webm; codecs="vp9"' />}
          </video>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={stillRef} src={site.media.introVideo.still} alt="" className="absolute opacity-0" style={{ transformOrigin: "0 0" }} />
        </>
      ) : (
        <div ref={wrapRef} className="relative w-[min(560px,74vw)]" style={{ transformOrigin: "0 0" }}>
          <svg viewBox={`0 0 ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`} className="block h-auto w-full overflow-visible">
            <defs>
              <linearGradient id="sd-feather" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#000" />
                <stop offset="0.16" stopColor="#fff" />
                <stop offset="0.84" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </linearGradient>
              <mask id="sd-smile-mask" maskUnits="userSpaceOnUse" x={sx0 - pad * 3} y={sy0 - pad} width={sx1 - sx0 + pad * 6} height={sy1 - sy0 + pad * 2}>
                <rect
                  ref={maskRef}
                  x={sx0 - pad * 3}
                  y={sy0 - pad}
                  width={sx1 - sx0 + pad * 6}
                  height={sy1 - sy0 + pad * 2}
                  fill="url(#sd-feather)"
                  style={{ transformBox: "fill-box", transformOrigin: "center", transform: "scaleX(0)" }}
                />
              </mask>
            </defs>
            <g ref={selectRef} style={{ ...groupStyle, clipPath: "inset(100% 0 0 0)" }}>
              <path fill="#1B396B" fillRule="evenodd" d={LOGO_PATHS.select} />
            </g>
            <g ref={dentalRef} style={{ ...groupStyle, clipPath: "inset(100% 0 0 0)" }}>
              <path fill="#1B396B" fillRule="evenodd" d={LOGO_PATHS.dental} />
            </g>
            <g ref={smileRef} style={{ ...groupStyle, opacity: 0, transform: startSmile }} mask="url(#sd-smile-mask)">
              <path fill="#6EC1EC" fillRule="evenodd" d={LOGO_PATHS.smile} />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
