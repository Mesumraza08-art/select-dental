import Image from "next/image";
import { LOGO_VIEWBOX } from "./logoPaths";

/** The supplied Select Dental logo (vector trace of the official artwork). */
export function Logo({ height = 40, white, className = "", priority }: { height?: number; white?: boolean; className?: string; priority?: boolean }) {
  const width = Math.round((LOGO_VIEWBOX.w / LOGO_VIEWBOX.h) * height);
  return (
    <Image
      src={white ? "/brand/select-dental-logo-white.svg" : "/brand/select-dental-logo.svg"}
      alt="Select Dental"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
