import type { Metadata } from "next";
import { categories, servicesIn } from "@/content/services";
import { bookingHref } from "@/content/site";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { ServiceCard } from "@/components/services/ServiceCard";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Dental Services in Scarborough | Select Dental";
const description =
  "Checkups, fillings, crowns, implants, Invisalign, whitening, children's dentistry and more at Select Dental in Scarborough. Explore our dental services.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        title="Dental services for the whole family."
        intro="Preventive, restorative, cosmetic and orthodontic care in one Scarborough clinic, explained clearly so you can make confident decisions."
        actions={<ButtonLink href={bookingHref} track="book_click">Book an appointment</ButtonLink>}
      />
      <nav aria-label="Service categories" className="border-y border-line">
        <ul className="container-x no-scrollbar flex gap-8 overflow-x-auto">
          {categories.map((c) => (
            <li key={c.key} className="shrink-0">
              <a href={`#${c.key}`} className="flex min-h-[56px] items-center font-display text-[0.95rem] font-semibold text-muted transition-colors hover:text-navy">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {categories.map((c, i) => (
        <section key={c.key} id={c.key} className={`section ${i % 2 === 0 ? "bg-mist" : ""}`} aria-labelledby={`${c.key}-title`}>
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
                <h2 id={`${c.key}-title`} className="h2">
                  {c.name}
                </h2>
                <p className="body-copy mt-4 max-w-[38ch]">{c.blurb}</p>
                <Media shot={c.shot} ratio="4/3" className="mt-8 hidden lg:block" sizes="30vw" tone={i % 2 ? "warm" : "cool"} />
              </div>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:self-start">
              {servicesIn(c.key).map((s) => (
                <li key={s.slug}>
                  <ServiceCard service={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <BookingCTA title="Not sure where to start?" text="Book a checkup. We will look at the whole picture and talk you through your options." />
      <JsonLd data={webPageSchema("Dental services", "/services", description)} />
    </>
  );
}
