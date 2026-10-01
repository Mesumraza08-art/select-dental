import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "light" | "outline-light";

/** Pill button. The background fills from the left on hover and the arrow nudges forward. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size,
  track,
  className = "",
  external,
  arrow,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm";
  track?: string;
  className?: string;
  external?: boolean;
  arrow?: boolean;
}) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" className="arrow size-[18px]" />}
    </>
  );
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} data-track={track} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track}>
      {content}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  track,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  track?: string;
  className?: string;
  arrow?: boolean;
}) {
  const inner = (
    <>
      <span className="label">{children}</span>
      {arrow && <Icon name="arrow" className="arrow size-4" />}
    </>
  );
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={`link-smile ${className}`} data-track={track} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={`link-smile ${className}`} data-track={track}>
      {inner}
    </Link>
  );
}
