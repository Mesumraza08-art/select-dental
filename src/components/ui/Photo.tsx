import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { img, type ImgKey } from "@/content/media";

/** Art-directed photograph from the media library, with blur-up loading and optional reveal. */
export function Photo({
  k,
  ratio,
  className = "",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  reveal,
  delay = 0,
  zoom,
  position,
  children,
  alt,
}: {
  k: ImgKey;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
  delay?: number;
  zoom?: boolean;
  position?: string;
  children?: ReactNode;
  alt?: string;
}) {
  const m = img[k];
  return (
    <div
      className={`media-frame ${zoom ? "zoom-on-hover" : ""} ${className}`}
      style={{ ...(ratio ? { aspectRatio: ratio } : {}), "--d": delay } as CSSProperties}
      data-anim={reveal ? "clip" : undefined}
    >
      <div className="media-inner">
        <Image
          src={m.src}
          alt={alt ?? m.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={m.blur}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      {children}
    </div>
  );
}
