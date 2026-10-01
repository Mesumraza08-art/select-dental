import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { team, memberBySlug } from "@/content/team";
import { site, bookingHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Media } from "@/components/ui/Media";
import { Pending } from "@/components/ui/Pending";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { visibleTeam } from "@/components/team/visibleTeam";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return visibleTeam().map((m) => ({ slug: m.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = memberBySlug(slug);
  if (!m) return {};
  const name = m.name ?? "Team profile";
  return pageMetadata({
    title: `${name}${m.role ? `, ${m.role}` : ""} | Select Dental Scarborough`,
    description: m.shortBio ?? `Meet ${name} at Select Dental in Scarborough, Ontario.`,
    path: `/team/${m.slug}`,
    noindex: Boolean(m.placeholder),
  });
}

function Field({ label, items, pending }: { label: string; items: string[] | null; pending: string }) {
  if (!items?.length && !site.preview) return null;
  return (
    <div className="border-b border-line py-5 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-6">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-ink sm:mt-0">
        {items?.length ? (
          <ul className="space-y-1">
            {items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        ) : (
          <Pending>{pending}</Pending>
        )}
      </dd>
    </div>
  );
}

export default async function TeamProfilePage({ params }: Props) {
  const { slug } = await params;
  const m = memberBySlug(slug);
  if (!m || (m.placeholder && !site.preview)) notFound();
  const index = team.indexOf(m);
  const displayName = m.name ?? `Team member ${index + 1}`;
  const path = `/team/${m.slug}`;

  return (
    <>
      <section className="pt-[calc(var(--header-h)+2.5rem)] pb-[var(--section-y)]">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Meet the team", path: "/team" }, { name: displayName, path }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <Media
                  src={m.photo?.src}
                  alt={m.photo?.alt ?? ""}
                  priority
                  ratio="4/5"
                  shot="Professional portrait in the clinic, natural light"
                  label="Portrait to come"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <h1 className="display">
                {m.name ?? <Pending>Full name</Pending>}
              </h1>
              <p className="mt-4 text-lg font-medium text-navy">
                {m.credentials ?? <Pending>Credentials</Pending>}
                <span className="mx-2 text-line-strong" aria-hidden="true">
                  /
                </span>
                {m.role ?? <Pending>Role</Pending>}
              </p>
              <div className="body-copy mt-8 max-w-[60ch] space-y-4 text-[1.0625rem]">
                {m.bio?.length ? m.bio.map((p) => <p key={p}>{p}</p>) : <Pending>Personal bio, two or three short paragraphs in their own voice</Pending>}
              </div>
              <dl className="mt-10 border-t border-line">
                <Field label="Education" items={m.education} pending="Degrees and schools" />
                <Field label="Clinical interests" items={m.clinicalInterests} pending="Areas of interest" />
                <Field label="Languages" items={m.languages} pending="Languages spoken" />
                <Field label="Professional memberships" items={m.memberships} pending="Verified memberships only" />
              </dl>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <ButtonLink href={bookingHref} track="book_click">
                  Book an appointment
                </ButtonLink>
                <TextLink href="/team">Back to the team</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookingCTA />
      {!m.placeholder && m.name && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: m.name,
            jobTitle: m.role ?? undefined,
            worksFor: { "@id": `${site.url}/#dentist` },
            url: `${site.url}${path}`,
            ...(m.photo ? { image: `${site.url}${m.photo.src}` } : {}),
            ...(m.languages?.length ? { knowsLanguage: m.languages } : {}),
          }}
        />
      )}
    </>
  );
}
