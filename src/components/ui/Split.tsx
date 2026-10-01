import type { ReactNode } from "react";

/** Editorial two-column block: heading on the left, content on the right. */
export function Split({
  id,
  title,
  aside,
  children,
  tone = "white",
  sticky = true,
}: {
  id: string;
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  tone?: "white" | "mist";
  sticky?: boolean;
}) {
  return (
    <section id={id} className={`section ${tone === "mist" ? "bg-mist" : ""}`} aria-labelledby={`${id}-h`}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-4">
          <div className={sticky ? "lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]" : ""}>
            <h2 id={`${id}-h`} className="h2 text-[clamp(1.75rem,1.35rem+1.6vw,2.6rem)]">
              {title}
            </h2>
            {aside && <div className="mt-5">{aside}</div>}
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8 lg:col-start-5">{children}</div>
      </div>
    </section>
  );
}

/** Two-up grid of titled notes with hairline separators. */
export function NoteGrid({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <dl className="hairline-grid grid gap-px overflow-hidden rounded-[var(--radius-media)] bg-line sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="bg-white p-6 sm:p-7">
          <dt className="h4">{it.title}</dt>
          <dd className="body-copy mt-2 text-[0.9375rem]">{it.text}</dd>
        </div>
      ))}
    </dl>
  );
}
