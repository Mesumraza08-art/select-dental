"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Google Maps loads only when the visitor asks for it. This keeps the page fast and
 * avoids sending data to Google before the visitor chooses to interact.
 */
export function MapFacade({ embedUrl, title, className = "" }: { embedUrl: string; title: string; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className={`media-frame relative bg-[#e9eff5] ${className}`}>
      {on ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          {/* Stylised street grid, not a real map */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 450" aria-hidden="true">
            <rect width="600" height="450" fill="#eaf0f6" />
            <g stroke="#fff" strokeLinecap="round" fill="none">
              <path d="M-20 120 L640 70" strokeWidth="18" />
              <path d="M-20 330 L640 300" strokeWidth="12" />
              <path d="M140 -20 L190 470" strokeWidth="12" />
              <path d="M420 -20 L380 470" strokeWidth="22" />
              <path d="M-20 220 Q300 250 640 190" strokeWidth="8" />
            </g>
            <g fill="#dde6ef">
              <rect x="210" y="140" width="140" height="60" rx="6" />
              <rect x="210" y="250" width="70" height="40" rx="6" />
              <rect x="460" y="120" width="110" height="70" rx="6" />
              <rect x="30" y="250" width="90" height="50" rx="6" />
            </g>
          </svg>
          <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full">
            <span className="grid size-12 place-items-center rounded-full bg-navy text-white shadow-[0_10px_30px_rgba(15,35,70,.25)]">
              <Icon name="pin" className="size-6" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center p-5">
            <button
              type="button"
              onClick={() => setOn(true)}
              className="btn btn-light btn-sm shadow-[0_6px_20px_rgba(15,35,70,.12)]"
              data-track="map_load"
            >
              Show interactive map
            </button>
          </div>
        </>
      )}
    </div>
  );
}
