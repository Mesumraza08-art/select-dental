import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site, bookingHref } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Pending, Claim } from "@/components/ui/Pending";
import { Split, NoteGrid } from "@/components/ui/Split";
import { Icon } from "@/components/ui/Icon";
import { Journey } from "@/components/home/Journey";
import { LocationSection } from "@/components/sections/LocationSection";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "New Patients | Select Dental Scarborough";
const description =
  "Planning your first visit to Select Dental in Scarborough? What to expect, what to bring, insurance and CDCP, patient forms and directions.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/new-patients" });

const bring = [
  "Photo ID",
  "Your dental insurance card or plan details, if you have coverage",
  "Your CDCP member information, if you are enrolled",
  "A list of the medications and supplements you take",
  "Previous dental records or x-rays, if you can easily get them",
  "Any questions or concerns you want to talk about",
];

export default function NewPatientsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "New patients", path: "/new-patients" }]}
        title="Welcome to Select Dental."
        intro="Everything you need to know before your first visit, so you can arrive relaxed and ready."
        actions={
          <>
            <ButtonLink href={bookingHref === "/book-appointment" ? "/book-appointment?type=new" : bookingHref} track="book_click">
              <Icon name="calendar" className="size-[18px]" />
              Book your first visit
            </ButtonLink>
            <ButtonLink href="/patient-forms" variant="secondary" track="forms_click">
              Patient forms
            </ButtonLink>
          </>
        }
        aside={<Media priority ratio="4/3" tone="warm" shot="Front desk team member welcoming a new patient" sizes="(min-width:1024px) 40vw, 100vw" />}
      >
        <p className="mt-6 text-[0.9375rem] text-muted">
          <Claim k="newPatients" />
        </p>
      </PageHero>

      <div className="bg-mist">
        <Journey actions={false} />
      </div>

      <Split id="bring" title="What to bring">
        <ul className="border-t border-line">
          {bring.map((b) => (
            <li key={b} className="flex gap-4 border-b border-line py-4 text-ink">
              <Icon name="check" className="mt-1 size-[18px] shrink-0 text-smile" />
              {b}
            </li>
          ))}
        </ul>
      </Split>

      <Split id="details" tone="mist" title="Good to know">
        <NoteGrid
          items={[
            {
              title: "Insurance",
              text: (
                <>
                  Bring your plan details and we will help you understand what may be covered.{" "}
                  <TextLink href="/insurance-payment" className="text-[0.9375rem]">
                    Insurance & payment
                  </TextLink>
                </>
              ),
            },
            {
              title: "CDCP",
              text: (
                <>
                  Tell us you are a CDCP member when you book.{" "}
                  <TextLink href="/cdcp" className="text-[0.9375rem]">
                    About the CDCP
                  </TextLink>
                </>
              ),
            },
            {
              title: "Patient forms",
              text: (
                <>
                  Complete your forms securely online before your visit to save time at reception.{" "}
                  <TextLink href="/patient-forms" className="text-[0.9375rem]">
                    Patient forms
                  </TextLink>
                </>
              ),
            },
            {
              title: "Your appointment",
              text: (
                <>
                  If you have not completed forms online, allow a little extra time at reception. If you need to
                  reschedule, please let us know as early as you can.{" "}
                  <Pending>Cancellation policy</Pending>
                </>
              ),
            },
            {
              title: "Feeling nervous?",
              text: "Let us know when you book. We will go at your pace, explain each step and agree on a signal to pause.",
            },
            {
              title: "Children",
              text: (
                <>
                  Children are welcome, and we keep first visits short and positive.{" "}
                  <TextLink href="/services/childrens-dentistry" className="text-[0.9375rem]">
                    Children&apos;s dentistry
                  </TextLink>
                </>
              ),
            },
          ]}
        />
      </Split>

      <LocationSection title="Getting here." />
      <BookingCTA title="We look forward to meeting you." text={site.phone ? `Book online or call ${site.phone.display}.` : "Book online or call the clinic."} />
      <JsonLd data={webPageSchema("New patients", "/new-patients", description)} />
    </>
  );
}
