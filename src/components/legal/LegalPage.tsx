import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Shared layout for policy pages: readable measure, table of contents, review notice in preview. */
export function LegalPage({
  title,
  path,
  updated,
  intro,
  toc,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  intro: ReactNode;
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <section className="pt-[calc(var(--header-h)+2.5rem)] pb-[var(--section-y)]">
      <div className="container-x">
        <Breadcrumbs items={[{ name: title, path }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h1 className="display text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)]">{title}</h1>
            <p className="mt-4 text-[0.9375rem] text-muted">Last updated: {updated}</p>
            {site.preview && (
              <p className="mt-6 rounded-[var(--radius-ui)] border border-dashed border-line-strong p-4 text-[0.9375rem] text-muted">
                Draft template. Have this page reviewed by a lawyer or privacy professional familiar with Ontario health
                practices before launch, and fill in the clinic contact details.
              </p>
            )}
            <div className="lede mt-8">{intro}</div>
            <div className="prose-sd mt-10 max-w-[68ch]">{children}</div>
          </div>
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2.5rem)]">
              <p className="text-sm font-medium text-muted">On this page</p>
              <ul className="mt-4 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[0.9rem] text-muted hover:border-navy hover:text-navy">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

/** Clinic contact line for policy pages. */
export function PolicyContact({ role }: { role: string }) {
  return (
    <p>
      {role}, {site.name}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}.{" "}
      {site.phone ? `Phone: ${site.phone.display}. ` : ""}
      {site.email ? `Email: ${site.email}.` : ""}
      {!site.phone && !site.email && site.preview ? <span className="pending">Phone and email</span> : null}
    </p>
  );
}
