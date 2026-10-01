import Image from "next/image";
import { img } from "@/content/media";

/** Preview-only demonstration panes for the comparison viewer. Clearly watermarked; never a patient result. */
export function DemoPane({ kind }: { kind: "before" | "after" }) {
  const m = img.galleryDemo;
  return (
    <Image
      src={m.src}
      alt={kind === "before" ? "Demonstration image, before side" : "Demonstration image, after side"}
      fill
      sizes="(min-width: 1024px) 66vw, 100vw"
      placeholder="blur"
      blurDataURL={m.blur}
      className="object-cover"
      style={kind === "before" ? { filter: "saturate(0.75) sepia(0.18) brightness(0.96)" } : undefined}
    />
  );
}
