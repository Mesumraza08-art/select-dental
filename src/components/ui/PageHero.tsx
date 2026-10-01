import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({
  crumbs,
  title,
  intro,
  actions,
  aside,
  children,
}: {
  crumbs: { name: string; path: string }[];
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="pt-[calc(var(--header-h)+2.5rem)] pb-14 lg:pb-20">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-8 grid gap-10 lg:gap-16 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
            <h1 className="display">{title}</h1>
            {intro && <div className="lede mt-6 max-w-[56ch]">{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
