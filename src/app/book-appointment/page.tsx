import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site, fullAddress } from "@/content/site";
import { services } from "@/content/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { HoursTable } from "@/components/sections/HoursTable";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Book an Appointment | Select Dental Scarborough";
const description =
  "Request a dental appointment at Select Dental in Scarborough. New patients, returning patients, emergencies and specific treatments.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/book-appointment" });

export default function BookPage() {
  return (
    <>
      <section className="pt-[calc(var(--header-h)+2.5rem)] pb-[var(--section-y)]">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Book an appointment", path: "/book-appointment" }]} />
          <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h1 className="display max-w-[14ch]">Book an appointment.</h1>
              <p className="lede mt-6 max-w-[48ch]">
                Tell us a little about your visit and how to reach you. It takes about two minutes, and our team will
                contact you to confirm a time.
              </p>
              {site.booking.externalUrl && (
                <div className="mt-8">
                  <ButtonLink href={site.booking.externalUrl} track="book_click">
                    Choose a time online
                  </ButtonLink>
                </div>
              )}
              <div className="mt-12">
                <BookingForm
                  endpoint={site.booking.endpoint}
                  services={services.map((s) => s.name)}
                  phone={site.phone}
                  preview={site.preview}
                />
              </div>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <div className="rounded-[var(--radius-media)] bg-mist p-7">
                  <h2 className="h4">Prefer to call?</h2>
                  {site.phone ? (
                    <a href={`tel:${site.phone.e164}`} className="mt-3 flex items-center gap-3 font-display text-2xl font-semibold text-navy" data-track="phone_click">
                      <Icon name="phone" className="size-6" />
                      {site.phone.display}
                    </a>
                  ) : (
                    <p className="mt-3">
                      <Pending>Phone number</Pending>
                    </p>
                  )}
                  <div className="mt-6 border-t border-line pt-5">
                    <h3 className="text-sm font-medium text-muted">Hours</h3>
                    <div className="mt-2">
                      <HoursTable compact />
                    </div>
                  </div>
                </div>
                <div className="rounded-[var(--radius-media)] p-7 ring-1 ring-line">
                  <h2 className="h4">Your privacy</h2>
                  <p className="mt-2 text-[0.9375rem] text-muted">
                    We only ask for what we need to arrange your visit. Health history is collected later through secure
                    patient forms, never through this page.
                  </p>
                </div>
                <div className="rounded-[var(--radius-media)] p-7 ring-1 ring-line">
                  <h2 className="h4">Dental emergency?</h2>
                  <p className="mt-2 text-[0.9375rem] text-muted">
                    Call the clinic for the fastest help. For swelling that affects breathing or swallowing, heavy
                    bleeding or a serious injury, call 911.
                  </p>
                </div>
                <p className="px-1 text-sm text-muted">
                  {site.name}, {fullAddress}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <JsonLd data={webPageSchema("Book an appointment", "/book-appointment", description)} />
    </>
  );
}
