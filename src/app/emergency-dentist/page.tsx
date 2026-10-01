import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { Split } from "@/components/ui/Split";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { HoursTable } from "@/components/sections/HoursTable";
import { LocationSection } from "@/components/sections/LocationSection";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Emergency Dentist in Scarborough | Select Dental";
const description =
  "Toothache, broken tooth, lost crown or swelling? Call Select Dental in Scarborough for urgent dental care. What to do now, and when to call 911.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/emergency-dentist" });

const issues = [
  {
    title: "Severe tooth pain",
    text: "Rinse with warm water and gently floss to remove anything caught between your teeth. Avoid very hot, cold or sweet foods. Do not place aspirin or other tablets against the gum.",
  },
  {
    title: "Knocked-out or injured tooth",
    text: "Hold an adult tooth by the crown, not the root. If it is dirty, rinse it briefly with milk or water. Keep it moist in milk and call right away, as time matters.",
  },
  {
    title: "Broken or chipped tooth",
    text: "Save any pieces, rinse your mouth with warm water and hold a cold compress against your cheek to ease swelling. Avoid chewing on that side.",
  },
  {
    title: "Lost filling or crown",
    text: "Keep the crown somewhere safe and bring it with you. Avoid chewing on that side, and do not use household glue to reattach anything.",
  },
  {
    title: "Swelling",
    text: "Use a cold compress on the outside of your face and call us. Swelling that spreads toward your eye or neck, or comes with fever, needs prompt attention.",
  },
  {
    title: "Bleeding after treatment",
    text: "Bite firmly on clean gauze for 30 minutes without checking it. If bleeding continues, call the clinic. Seek emergency care if it is heavy.",
  },
];

const emergencyFaqs = [
  {
    q: "Can I get a same-day emergency appointment?",
    a: "Call as early as you can. We will do our best to see you quickly, and if we cannot, we will help you decide where to go.",
  },
  {
    q: "Should I go to the hospital or the dentist?",
    a: "Go to the hospital or call 911 for swelling that affects breathing or swallowing, heavy bleeding that will not stop, a high fever with facial swelling, or a serious injury to the head or jaw. For most toothaches, broken teeth and lost crowns, call the dental clinic.",
  },
  {
    q: "Will I know the cost of emergency care?",
    a: "Yes. Once we have examined you, we will explain what we recommend and the cost before treatment, including what may be done now and what can wait.",
  },
];

export default function EmergencyPage() {
  const call = site.phone ? `tel:${site.phone.e164}` : "/contact";
  return (
    <>
      <PageHero
        crumbs={[{ name: "Emergency dentist", path: "/emergency-dentist" }]}
        title="Need urgent dental care?"
        intro="Call Select Dental and tell us what is happening. We will help you understand what to do next and do our best to see you quickly."
        actions={
          <>
            <ButtonLink href={call} track="emergency_call">
              <Icon name="phone" className="size-[18px]" />
              {site.phone ? `Call ${site.phone.display}` : "Call Select Dental"}
            </ButtonLink>
            <ButtonLink href="/book-appointment?type=emergency" variant="secondary" track="emergency_request">
              Request an emergency appointment
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-[var(--radius-media)] border-2 border-navy p-6 sm:p-7">
            <p className="flex items-center gap-2 font-display font-semibold text-navy-ink">
              <Icon name="alert" className="size-5 text-navy" />
              Call 911 or go to the nearest emergency department if you have:
            </p>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-ink">
              <li>Swelling that affects your breathing or swallowing</li>
              <li>Heavy bleeding that will not stop</li>
              <li>A serious injury to the head, face or jaw</li>
              <li>A high fever with facial swelling</li>
            </ul>
          </div>
        }
      >
        {!site.phone && (
          <p className="mt-4">
            <Pending>Phone number</Pending>
          </p>
        )}
      </PageHero>

      <Split
        id="issues"
        tone="mist"
        title="Common dental emergencies"
        aside={<p className="body-copy max-w-[34ch]">These are general first steps while you arrange care. They are not a diagnosis or a substitute for being seen.</p>}
      >
        <ul className="hairline-grid grid gap-px overflow-hidden rounded-[var(--radius-media)] bg-line sm:grid-cols-2">
          {issues.map((it) => (
            <li key={it.title} className="bg-white p-6 sm:p-7">
              <h3 className="h4">{it.title}</h3>
              <p className="body-copy mt-2 text-[0.9375rem]">{it.text}</p>
            </li>
          ))}
        </ul>
      </Split>

      <Split id="when" title="When to call us">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="body-copy text-[1.0625rem]">
              Call during clinic hours and let our team know it is urgent. Describe what happened and when, and
              whether you have pain, swelling or bleeding, so we can plan the right appointment.
            </p>
            <p className="mt-4 text-[0.9375rem]">
              <Pending>After-hours instructions</Pending>
            </p>
          </div>
          <div className="rounded-[var(--radius-media)] bg-mist p-6">
            <h3 className="h4 flex items-center gap-2">
              <Icon name="clock" className="size-5 text-navy" />
              Clinic hours
            </h3>
            <div className="mt-3">
              <HoursTable />
            </div>
          </div>
        </div>
      </Split>

      <Split id="faq" tone="mist" title="Emergency questions">
        <FAQAccordion items={emergencyFaqs} />
      </Split>

      <LocationSection />
      <JsonLd data={webPageSchema("Emergency dentist in Scarborough", "/emergency-dentist", description)} />
    </>
  );
}
