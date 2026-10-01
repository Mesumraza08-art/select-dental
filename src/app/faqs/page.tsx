import type { Metadata } from "next";
import { pageMetadata, faqSchema } from "@/lib/seo";
import { faqs, type Faq } from "@/content/faqs";
import { PageHero } from "@/components/ui/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { TextLink } from "@/components/ui/Button";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Frequently Asked Questions | Select Dental Scarborough";
const description =
  "Answers to common questions about visiting Select Dental in Scarborough: booking, what to bring, insurance, CDCP, costs, emergencies and anxiety.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/faqs" });

const groups: Faq["group"][] = ["Visiting us", "Insurance & payment", "Care & treatment"];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQs", path: "/faqs" }]}
        title="Frequently asked questions."
        intro="If you do not find your answer here, call the clinic and our team will be glad to help."
      />
      <section className="pb-[var(--section-y)]">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:flex-col lg:gap-0 lg:border-l lg:border-line">
              {groups.map((g) => (
                <li key={g}>
                  <a
                    href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="flex min-h-[44px] items-center rounded-full px-4 text-[0.9375rem] text-muted ring-1 ring-line hover:text-navy lg:-ml-px lg:rounded-none lg:border-l lg:border-transparent lg:ring-0 lg:hover:border-navy"
                  >
                    {g}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-8 lg:col-start-5">
            {groups.map((g) => (
              <section key={g} id={g.toLowerCase().replace(/[^a-z]+/g, "-")} aria-labelledby={`${g}-h`.replace(/[^a-zA-Z-]/g, "")}>
                <h2 id={`${g}-h`.replace(/[^a-zA-Z-]/g, "")} className="h3 mb-4">
                  {g}
                </h2>
                <FAQAccordion items={faqs.filter((f) => f.group === g)} />
              </section>
            ))}
            <p className="text-[0.9375rem] text-muted">
              Looking for treatment-specific answers? Each{" "}
              <TextLink href="/services" className="text-[0.9375rem]">
                service page
              </TextLink>{" "}
              has its own questions.
            </p>
          </div>
        </div>
      </section>
      <BookingCTA />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
