import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site, bookingHref, directionsUrl } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { LocationSection } from "@/components/sections/LocationSection";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Contact Select Dental | Dentist on Select Ave, Scarborough";
const description =
  "Contact Select Dental at 215 Select Ave Unit A4, Scarborough, ON M1X 0B5. Phone, email, hours, directions, parking and accessibility.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title="Contact Select Dental."
        intro="Questions, appointments or directions: here is everything you need to reach us."
      >
        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-media)] bg-line sm:grid-cols-3">
          <div className="bg-white p-6">
            <Icon name="phone" className="size-5 text-navy" />
            <p className="mt-3 text-sm font-medium text-muted">Call</p>
            {site.phone ? (
              <a href={`tel:${site.phone.e164}`} className="mt-1 block font-display text-lg font-semibold text-navy-ink" data-track="phone_click">
                {site.phone.display}
              </a>
            ) : (
              <p className="mt-2">
                <Pending>Phone number</Pending>
              </p>
            )}
          </div>
          <div className="bg-white p-6">
            <Icon name="mail" className="size-5 text-navy" />
            <p className="mt-3 text-sm font-medium text-muted">Email</p>
            {site.email ? (
              <a href={`mailto:${site.email}`} className="mt-1 block break-all font-display text-lg font-semibold text-navy-ink" data-track="email_click">
                {site.email}
              </a>
            ) : (
              <p className="mt-2">
                <Pending>Email address</Pending>
              </p>
            )}
          </div>
          <div className="bg-white p-6">
            <Icon name="calendar" className="size-5 text-navy" />
            <p className="mt-3 text-sm font-medium text-muted">Book</p>
            <div className="mt-2">
              <ButtonLink href={bookingHref} size="sm" track="book_click">
                Book an appointment
              </ButtonLink>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          Please do not send health information or insurance numbers by email. We will collect them securely.{" "}
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-navy underline decoration-smile underline-offset-4" data-track="directions_click">
            Get directions
          </a>
        </p>
      </PageHero>
      <LocationSection title="Visit us." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Select Dental",
          url: `${site.url}/contact`,
          about: { "@id": `${site.url}/#dentist` },
        }}
      />
    </>
  );
}
