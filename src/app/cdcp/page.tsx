import type { Metadata } from "next";
import { pageMetadata, webPageSchema, faqSchema } from "@/lib/seo";
import { site, bookingHref, CDCP_OFFICIAL_URL } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Split } from "@/components/ui/Split";
import { Icon } from "@/components/ui/Icon";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "CDCP Dentist in Scarborough | Select Dental";
const description =
  "What the Canadian Dental Care Plan is, who may be eligible, how co-payments work and what to bring to your visit at Select Dental in Scarborough.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/cdcp" });

const cdcpFaqs = [
  {
    q: "Does the CDCP cover 100% of my treatment?",
    a: "Not always. The plan pays a share of its established fee for covered services, based on your adjusted family net income. You may also pay the difference if the clinic's fee is higher than the CDCP fee. We will tell you about any cost before treatment.",
  },
  {
    q: "Can the clinic tell me if I am eligible?",
    a: "No. Eligibility is decided by the Government of Canada. You can check eligibility and apply through the official CDCP website.",
  },
  {
    q: "Are all services covered?",
    a: "No. The plan covers a defined list of services, and some require approval from the plan before treatment. We will let you know if preauthorization is needed.",
  },
];

export default function CDCPPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "CDCP", path: "/cdcp" }]}
        title="The Canadian Dental Care Plan at Select Dental."
        intro="A plain-language guide to the CDCP: what it is, who may qualify, how costs work and what to bring to your visit."
        actions={
          <>
            <ButtonLink href={bookingHref} track="book_click">
              Book an appointment
            </ButtonLink>
            <ButtonLink href={CDCP_OFFICIAL_URL} variant="secondary">
              Official CDCP website
            </ButtonLink>
          </>
        }
      >
        {!site.claims.cdcp.confirmed && (
          <p className="mt-6">
            <Pending>Confirm the clinic is registered to see CDCP patients</Pending>
          </p>
        )}
      </PageHero>

      <Split id="what" tone="mist" title="What is the CDCP?">
        <div className="body-copy space-y-4 text-[1.0625rem]">
          <p>
            The Canadian Dental Care Plan is a federal program that helps eligible Canadian residents who do not have
            access to dental insurance pay for oral health care. Health Canada oversees the plan, and Sun Life
            administers it on behalf of the Government of Canada.
          </p>
          <p>
            Enrolled members receive a member card from Sun Life. Participating dental offices bill the plan directly
            for covered services.
          </p>
        </div>
      </Split>

      <Split id="eligibility" title="Who may be eligible">
        <p className="body-copy text-[1.0625rem]">In general, to qualify you must:</p>
        <ul className="mt-5 border-t border-line">
          {[
            "Be a Canadian resident for tax purposes",
            "Not have access to dental insurance, for example through an employer, pension or a family member's plan",
            "Have an adjusted family net income under $90,000",
            "Have filed your tax return for the previous year (and your spouse or common-law partner, if you have one)",
          ].map((t) => (
            <li key={t} className="flex gap-4 border-b border-line py-4 text-ink">
              <Icon name="check" className="mt-1 size-[18px] shrink-0 text-smile" />
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[0.9375rem] text-muted">
          These are general criteria. The Government of Canada decides eligibility, and the rules can change.{" "}
          <a href={CDCP_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="text-navy underline decoration-smile underline-offset-4">
            Check the official criteria
          </a>
          .
        </p>
      </Split>

      <Split id="costs" tone="mist" title="How coverage and payment work">
        <p className="body-copy text-[1.0625rem]">
          The CDCP pays a share of its established fee for each covered service. Your share, called a co-payment, depends
          on your adjusted family net income:
        </p>
        <div className="mt-6 overflow-x-auto rounded-[var(--radius-media)] bg-white ring-1 ring-line">
          <table className="w-full min-w-[420px] text-left text-[0.9375rem]">
            <caption className="sr-only">CDCP co-payment by adjusted family net income</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-6 py-4 font-display font-semibold text-navy-ink">
                  Adjusted family net income
                </th>
                <th scope="col" className="px-6 py-4 font-display font-semibold text-navy-ink">
                  Your co-payment
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Under $70,000", "No co-payment"],
                ["$70,000 to $79,999", "40% of the CDCP established fee"],
                ["$80,000 to $89,999", "60% of the CDCP established fee"],
              ].map(([a, b]) => (
                <tr key={a} className="border-b border-line last:border-0">
                  <td className="px-6 py-4 text-ink">{a}</td>
                  <td className="px-6 py-4 text-muted">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="prose-sd mt-8">
          <li>If the clinic&apos;s fee for a service is higher than the CDCP established fee, you may pay the difference. We will tell you before treatment.</li>
          <li>Some services need approval from the plan before treatment (preauthorization). We will let you know if this applies.</li>
          <li>Services the plan does not cover are your responsibility, and we will always discuss them with you first.</li>
        </ul>
      </Split>

      <Split id="visit" title="Booking and what to bring">
        <ol className="border-t border-line">
          {[
            ["Tell us when you book", "Mention that you are a CDCP member so we can prepare for your visit."],
            ["Bring your member information", "Your Sun Life CDCP member card or member ID, plus photo ID."],
            ["We confirm your coverage", "We check how the plan applies to your recommended care and explain any cost before treatment."],
          ].map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6">
              <span className="font-display text-sm font-semibold tabular-nums text-smile">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="h4">{t}</h3>
                <p className="body-copy mt-1">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Split>

      <Split id="faq" tone="mist" title="CDCP questions">
        <FAQAccordion items={cdcpFaqs} />
        <p className="mt-8 text-sm text-muted">
          This page is a general summary prepared in October 2026 and is not official program information. For the
          latest details, visit{" "}
          <a href={CDCP_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="text-navy underline decoration-smile underline-offset-4">
            canada.ca
          </a>
          .{" "}
          <TextLink href="/blog/canadian-dental-care-plan-explained" className="text-sm">
            Read our CDCP guide
          </TextLink>
        </p>
      </Split>

      <BookingCTA />
      <JsonLd data={[webPageSchema("Canadian Dental Care Plan", "/cdcp", description), faqSchema(cdcpFaqs)]} />
    </>
  );
}
