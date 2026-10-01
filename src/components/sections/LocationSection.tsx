import { site, fullAddress, directionsUrl, mapsEmbedUrl } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { HoursTable } from "./HoursTable";
import { MapFacade } from "./MapFacade";

function Row({ icon, label, children }: { icon: IconName; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-line py-4">
      <Icon name={icon} className="mt-0.5 size-5 shrink-0 text-navy" />
      <div className="min-w-0">
        <dt className="text-sm font-medium text-muted">{label}</dt>
        <dd className="mt-0.5 text-ink">{children}</dd>
      </div>
    </div>
  );
}

export function LocationSection({ headingLevel = "h2", title = "Find us on Select Ave." }: { headingLevel?: "h1" | "h2"; title?: string }) {
  const H = headingLevel;
  const note = (v: string | null, label: string) => v ?? (site.preview ? <Pending>{label}</Pending> : "Please call the clinic for details.");
  return (
    <section className="section bg-mist" aria-labelledby="location-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <H id="location-title" className="h2 max-w-[12ch]">
            {title}
          </H>
          <address className="mt-6 not-italic">
            <span className="block font-display text-lg font-semibold text-navy-ink">{site.name}</span>
            <span className="block text-ink">{site.address.street}</span>
            <span className="block text-ink">
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </span>
            <span className="block text-ink">{site.address.country}</span>
          </address>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={directionsUrl} track="directions_click">
              <Icon name="pin" className="size-[18px]" />
              Get directions
            </ButtonLink>
            {site.phone && (
              <ButtonLink href={`tel:${site.phone.e164}`} variant="secondary" track="phone_click">
                <Icon name="phone" className="size-[18px]" />
                {site.phone.display}
              </ButtonLink>
            )}
          </div>
          <dl className="mt-8 border-t border-line">
            <Row icon="phone" label="Phone">
              {site.phone ? (
                <a href={`tel:${site.phone.e164}`} className="hover:text-navy" data-track="phone_click">
                  {site.phone.display}
                </a>
              ) : (
                note(null, "Phone number")
              )}
            </Row>
            <Row icon="mail" label="Email">
              {site.email ? (
                <a href={`mailto:${site.email}`} className="break-all hover:text-navy" data-track="email_click">
                  {site.email}
                </a>
              ) : (
                note(null, "Email address")
              )}
            </Row>
            <Row icon="car" label="Parking">
              {note(site.parking, "Parking details")}
            </Row>
            <Row icon="bus" label="Transit">
              {note(site.transit, "Nearest TTC routes")}
            </Row>
            <Row icon="access" label="Accessibility">
              {note(site.accessibility, "Wheelchair access details")}
            </Row>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <MapFacade embedUrl={mapsEmbedUrl} title={`Map showing ${site.name} at ${fullAddress}`} className="aspect-[4/3]" />
          <div className="mt-8 rounded-[var(--radius-media)] bg-white p-6 ring-1 ring-line sm:p-8">
            <h3 className="h4 flex items-center gap-2">
              <Icon name="clock" className="size-5 text-navy" />
              Hours
            </h3>
            <div className="mt-4">
              <HoursTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
