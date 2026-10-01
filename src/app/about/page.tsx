import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site, bookingHref } from "@/content/site";
import { principles } from "@/content/values";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Pending } from "@/components/ui/Pending";
import { SmileMark } from "@/components/brand/SmileMark";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "About Select Dental | Scarborough Dental Clinic";
const description =
  "Select Dental is a new, modern dental clinic on Select Ave in Scarborough. Learn about our approach to comfortable, clear and personal dental care.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        title="A dental clinic built around the way you want to be cared for."
        intro="Select Dental is a new neighbourhood clinic in Scarborough. We set out to create a place where people feel listened to, informed and at ease."
        actions={
          <>
            <ButtonLink href={bookingHref} track="book_click">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/team" variant="secondary">
              Meet the team
            </ButtonLink>
          </>
        }
      />

      <section className="pb-[var(--section-y)]">
        <div className="container-x">
          <div className="bleed-right">
            <Media
              ratio="21/9"
              priority
              rounded="lg:rounded-r-none"
              label="Brand film or photograph to come"
              shot="Wide view of the clinic interior in daylight, 20 to 40 second brand film for this slot"
              sizes="100vw"
              className="aspect-[4/3]! sm:aspect-[21/9]!"
            />
          </div>
        </div>
      </section>

      {/* Why Select Dental */}
      <section className="section bg-mist" aria-labelledby="why-h">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="why-h" className="h2 max-w-[14ch]">
              Why we started Select Dental.
            </h2>
            <SmileMark className="mt-6 h-4 w-20 text-smile" strokeWidth={4} />
          </div>
          <div className="body-copy space-y-5 text-[1.0625rem] lg:col-span-7">
            <p>
              Many people put off the dentist because past visits felt rushed, confusing or uncomfortable. We wanted to
              build the opposite: a clinic where you have time to ask questions, where treatment is explained before it
              begins and where your comfort is part of the plan.
            </p>
            <p>
              Select Dental is designed for individuals and families across Scarborough who want modern, reliable care
              without the pressure. Whether you are visiting for a routine cleaning or returning after a long break, you
              will be welcomed without judgement.
            </p>
            <p className="text-[0.9375rem]">
              <Pending>Optional: a short founding story or message from the lead dentist, in their own words</Pending>
            </p>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="section" aria-labelledby="approach-h">
        <div className="container-x">
          <h2 id="approach-h" className="h2 max-w-[16ch]">
            Our approach to care.
          </h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-media)] bg-line sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-white p-7">
                <span className="font-display text-sm font-semibold tabular-nums text-smile">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h4 mt-4">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Our clinic */}
      <section className="section bg-mist" aria-labelledby="clinic-h">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <Media reveal ratio="3/4" tone="warm" shot="Reception and waiting area" sizes="(min-width:1024px) 28vw, 50vw" />
            <Media reveal ratio="3/4" shot="Treatment room with natural light" sizes="(min-width:1024px) 28vw, 50vw" className="mt-12" />
          </div>
          <div className="lg:col-span-5">
            <h2 id="clinic-h" className="h2 max-w-[12ch]">
              Our clinic.
            </h2>
            <p className="body-copy mt-5 text-[1.0625rem]">
              You will find us at {site.address.street} in Scarborough. We designed the clinic to feel calm and easy to
              navigate, with treatment rooms set up for comfort and privacy.
            </p>
            <div className="mt-6 space-y-2 text-[0.9375rem]">
              <p>
                <Pending>Accessibility features of the space</Pending>
              </p>
              <p>
                <Pending>Parking and transit notes</Pending>
              </p>
            </div>
            <div className="mt-8">
              <TextLink href="/contact">Location and directions</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Our technology */}
      <section className="section" aria-labelledby="tech-h">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="tech-h" className="h2 max-w-[14ch]">
              Our technology.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="body-copy text-[1.0625rem]">
              We use technology when it makes your care more comfortable, more accurate or easier to understand, and we
              will always explain what a tool is for and why we are using it.
            </p>
            {site.preview && (
              <div className="mt-8 rounded-[var(--radius-media)] border border-dashed border-line-strong p-6">
                <p className="text-[0.9375rem] text-muted">
                  List only equipment the clinic actually has, each with one plain sentence on how it helps patients.
                </p>
                <p className="mt-3 flex flex-wrap gap-2">
                  <Pending>Imaging equipment</Pending>
                  <Pending>Intraoral scanner, if available</Pending>
                  <Pending>Sterilization process</Pending>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our team + community */}
      <section className="section bg-mist" aria-labelledby="community-h">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-[var(--radius-media)] bg-white p-8 ring-1 ring-line sm:p-10">
            <h2 className="h3">Our team</h2>
            <p className="body-copy mt-3">
              Everyone at Select Dental shares one goal: that you leave feeling better informed and better cared for
              than when you arrived.
            </p>
            <div className="mt-6">
              <TextLink href="/team">Meet the team</TextLink>
            </div>
          </div>
          <div className="rounded-[var(--radius-media)] bg-white p-8 ring-1 ring-line sm:p-10">
            <h2 id="community-h" className="h3">
              Our community
            </h2>
            <p className="body-copy mt-3">
              Scarborough is one of the most diverse communities in Canada, and we are proud to be part of it. We look
              forward to caring for neighbours of every age and background.
            </p>
            <p className="mt-4 text-[0.9375rem]">
              <Pending>Community involvement, once there is some to share</Pending>
            </p>
          </div>
        </div>
      </section>

      <BookingCTA />
      <JsonLd data={webPageSchema("About Select Dental", "/about", description)} />
    </>
  );
}
