import type { Metadata } from "next";
import { pageMetadata, webPageSchema, faqSchema } from "@/lib/seo";
import { site, bookingHref } from "@/content/site";
import { faqs } from "@/content/faqs";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Split } from "@/components/ui/Split";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Dental Insurance & Payment | Select Dental Scarborough";
const description =
  "How Select Dental in Scarborough works with dental insurance, the Canadian Dental Care Plan, payment options and treatment estimates.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/insurance-payment" });

export default function InsurancePage() {
  const insFaqs = faqs.filter((f) => f.group === "Insurance & payment");
  const db = site.claims.directBilling;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insurance & payment", path: "/insurance-payment" }]}
        title="Insurance and payment, explained up front."
        intro="Dental costs should never be a surprise. Before treatment, we explain what we recommend, what it costs and how your coverage may apply."
        actions={
          <ButtonLink href={bookingHref} track="book_click">
            Book an appointment
          </ButtonLink>
        }
      />

      <Split id="insurance" tone="mist" title="Dental insurance">
        <div className="body-copy space-y-4 text-[1.0625rem]">
          <p>
            Most dental plans cover part of the cost of preventive and restorative care, but every plan is different.
            Coverage depends on your policy, your plan&apos;s limits and how much you have already used this year.
          </p>
          <p>
            Bring your insurance card or plan details to your visit. We can help you understand your benefits, but your
            insurer makes the final decision about what is covered.
          </p>
        </div>
        <div className="mt-8 rounded-[var(--radius-media)] bg-white p-6 ring-1 ring-line sm:p-7">
          <h3 className="h4">Direct billing</h3>
          {db.confirmed ? (
            <p className="body-copy mt-2 text-[0.9375rem]">
              We can submit claims directly to many insurance plans, so you only pay your portion at the visit. Ask our
              team to confirm for your plan.
            </p>
          ) : (
            <p className="mt-3">
              <Pending>Confirm whether the clinic offers direct billing, and with which plans</Pending>
            </p>
          )}
        </div>
      </Split>

      <Split id="cdcp" title="Canadian Dental Care Plan">
        <p className="body-copy text-[1.0625rem]">
          The CDCP helps eligible Canadian residents without dental insurance pay for oral health care. If you are
          enrolled, tell us when you book. We will check how the plan applies to your visit and explain any co-payment or
          other cost before treatment.
        </p>
        <div className="mt-6">
          <TextLink href="/cdcp">How the CDCP works at Select Dental</TextLink>
        </div>
      </Split>

      <Split id="payment" tone="mist" title="Payment options">
        <p className="body-copy text-[1.0625rem]">
          Our team will explain your share of the cost, and how and when it is paid, before any treatment begins.
        </p>
        <p className="mt-6 flex flex-wrap gap-2">
          <Pending>Accepted payment methods</Pending>
          <Pending>Financing or payment plans, if offered</Pending>
        </p>
      </Split>

      <Split id="estimates" title="Treatment estimates">
        <div className="body-copy space-y-4 text-[1.0625rem]">
          <p>
            Before treatment, we provide an estimate that explains what is recommended and why, the expected cost and
            the options available to you.
          </p>
          <p>
            For larger treatment such as crowns, implants or orthodontics, we can send a predetermination to your
            insurer. This asks your plan to confirm, in advance, how much it expects to pay, so you can plan with
            confidence.
          </p>
        </div>
      </Split>

      <Split id="faq" tone="mist" title="Questions about cost">
        <FAQAccordion items={insFaqs} />
      </Split>

      <BookingCTA />
      <JsonLd data={[webPageSchema("Insurance and payment", "/insurance-payment", description), faqSchema(insFaqs)]} />
    </>
  );
}
