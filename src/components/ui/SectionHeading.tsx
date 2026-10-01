import type { ReactNode } from "react";

/** Section title block. Keeps heading levels and spacing consistent across the site. */
export function SectionHeading({
  title,
  intro,
  as: Tag = "h2",
  className = "",
  titleClass = "max-w-[18ch]",
  id,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClass?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      <Tag id={id} className={`h2 ${titleClass}`}>
        {title}
      </Tag>
      {intro && <div className="lede mt-5 max-w-[52ch]">{intro}</div>}
      {children}
    </div>
  );
}
