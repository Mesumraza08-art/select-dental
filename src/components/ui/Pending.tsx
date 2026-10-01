import { site, claimVisible, type ClaimKey } from "@/content/site";

/** Visible marker for content the clinic still needs to supply. Hidden when preview mode is off. */
export function Pending({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (!site.preview) return null;
  return (
    <span className={`pending ${className}`} title="Placeholder: supply before launch">
      {children}
    </span>
  );
}

/** A trust claim that only renders once confirmed (or in preview, with a dashed underline). */
export function Claim({ k, className = "" }: { k: ClaimKey; className?: string }) {
  if (!claimVisible(k)) return null;
  const c = site.claims[k];
  return (
    <span className={`${c.confirmed ? "" : "claim-unconfirmed"} ${className}`} title={c.confirmed ? undefined : "To be confirmed by the clinic"}>
      {c.label}
    </span>
  );
}
