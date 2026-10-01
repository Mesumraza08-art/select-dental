import Link from "next/link";
import { footerNav } from "@/content/nav";
import { categories } from "@/content/services";
import { site, directionsUrl, bookingHref } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { ButtonLink } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import { HoursTable } from "@/components/sections/HoursTable";
import { CookieSettingsButton } from "@/components/system/CookieConsent";

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="micro">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.9375rem] text-[#c6d4e8] transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const callHref = site.phone ? `tel:${site.phone.e164}` : "/contact";
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-ink text-white">
      {/* Oversized smile line, very low opacity */}
      <svg viewBox="0 0 1600 500" aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 w-[160%] max-w-none -translate-x-1/2 opacity-[0.07] sm:w-[120%]">
        <path d="M60 40 Q800 900 1540 40" fill="none" stroke="#6ec1ec" strokeWidth="28" strokeLinecap="round" />
      </svg>

      <div className="container-x relative">
        {/* Big call to action */}
        <div className="grid gap-10 border-b border-white/10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
          <div className="lg:col-span-8">
            <p className="eyebrow">Select Dental, Scarborough</p>
            <Lines as="p" className="t-mega mt-6" lines={["Ready to book", "your visit?"]} />
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <ButtonLink href={bookingHref} variant="light" arrow track="book_click">
              Book appointment
            </ButtonLink>
            <ButtonLink href={callHref} variant="outline-light" track="phone_click">
              <Icon name="phone" className="size-[18px]" />
              Call the clinic
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={52} white />
            <address className="mt-8 not-italic leading-relaxed text-[#c6d4e8]">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
              <br />
              {site.address.country}
            </address>
            <div className="mt-6 space-y-2 text-[0.9375rem]">
              <p className="flex items-center gap-2.5">
                <Icon name="phone" className="size-[18px] text-smile" />
                {site.phone ? (
                  <a href={`tel:${site.phone.e164}`} className="hover:text-smile" data-track="phone_click">
                    {site.phone.display}
                  </a>
                ) : (
                  <Pending>Phone number</Pending>
                )}
              </p>
              <p className="flex items-center gap-2.5">
                <Icon name="mail" className="size-[18px] text-smile" />
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="hover:text-smile" data-track="email_click">
                    {site.email}
                  </a>
                ) : (
                  <Pending>Email address</Pending>
                )}
              </p>
            </div>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="link-smile mt-5" data-track="directions_click">
              <span className="label">Get directions</span>
              <Icon name="arrowUpRight" className="arrow size-4" />
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <Col title="Services" links={[...categories.map((c) => ({ label: c.name, href: `/services#${c.key}` })), { label: "All services", href: "/services" }]} />
            <Col title="Clinic" links={footerNav.clinic} />
            <Col title="Patients" links={footerNav.patients} />
          </div>

          <div className="lg:col-span-3">
            <p className="micro">Hours</p>
            <div className="mt-4">
              <HoursTable compact dark />
            </div>
            <p className="micro mt-10">Follow along</p>
            <div className="mt-4 flex gap-2">
              {site.social.instagram ? (
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white hover:text-navy-ink" data-track="instagram_click">
                  <Icon name="instagram" className="size-5" />
                </a>
              ) : (
                <Pending>Instagram</Pending>
              )}
              {site.social.tiktok ? (
                <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid size-11 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white hover:text-navy-ink" data-track="tiktok_click">
                  <Icon name="tiktok" className="size-5" />
                </a>
              ) : (
                <Pending>TikTok</Pending>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-[#9fb4d1] md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Select Dental. All rights reserved.</p>
          {site.preview && (
            <p className="max-w-md text-xs text-[#7f95b5]">
              Preview imagery and films are AI-generated with Higgsfield and will be replaced with real Select Dental photography.
            </p>
          )}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-[44px] items-center hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="inline-flex min-h-[44px] items-center hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
