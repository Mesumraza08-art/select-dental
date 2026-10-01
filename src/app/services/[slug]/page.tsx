import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceBySlug, categoryByKey } from "@/content/services";
import { site, bookingHref } from "@/content/site";
import { principles } from "@/content/values";
import { pageMetadata, faqSchema, webPageSchema } from "@/lib/seo";
import { titleCase, inSentence } from "@/lib/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ServiceCard } from "@/components/services/ServiceCard";
import { TeamCard } from "@/components/team/TeamCard";
import { visibleTeam } from "@/components/team/visibleTeam";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmileMark } from "@/components/brand/SmileMark";

type Props = { params: Promise<{ slug: string }> };

const SEO_NAME: Record<string, string> = {
  "childrens-dentistry": "Children's Dentist",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMetadata({
    title: `${SEO_NAME[s.slug] ?? titleCase(s.name)} in Scarborough | Select Dental`,
    description: `${s.summary} ${s.name} at Select Dental, 215 Select Ave, Scarborough. Book a consultation.`.slice(0, 300),
    path: `/services/${s.slug}`,
  });
}

const sectionsNav = [
  { id: "what", label: "What it is" },
  { id: "who", label: "Who may benefit" },
  { id: "expect", label: "What to expect" },
  { id: "process", label: "Treatment process" },
  { id: "considerations", label: "Benefits and considerations" },
  { id: "faq", label: "Questions" },
];

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const cat = categoryByKey(s.category);
  const related = s.related.map((r) => services.find((x) => x.slug === r)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const callHref = site.phone ? `tel:${site.phone.e164}` : "/contact";
  const team = visibleTeam().slice(0, 2);
  const path = `/services/${s.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-[calc(var(--header-h)+2.5rem)] pb-14 lg:pb-20">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: s.name, path }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <p className="kicker">
                <SmileMark className="h-3 w-7 text-smile" strokeWidth={4} />
                {cat.name}
              </p>
              <h1 className="display mt-5 max-w-[14ch]">
                {s.name} <span className="text-navy/60">in Scarborough</span>
              </h1>
              <p className="lede mt-6 max-w-[48ch]">{s.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={bookingHref} track="book_click">
                  <Icon name="calendar" className="size-[18px]" />
                  Book a consultation
                </ButtonLink>
                <ButtonLink href={callHref} variant="secondary" track="phone_click">
                  <Icon name="phone" className="size-[18px]" />
                  Call Select Dental
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-6">
              <Media shot={s.shot} ratio="5/4" priority reveal={false} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="border-t border-line">
        <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="On this page" className="sticky top-[calc(var(--header-h)+2.5rem)]">
              <p className="text-sm font-medium text-muted">On this page</p>
              <ul className="mt-4 border-l border-line">
                {sectionsNav.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="-ml-px block border-l border-transparent py-2 pl-4 text-[0.9375rem] text-muted transition-colors hover:border-navy hover:text-navy">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-16 lg:col-span-8 lg:col-start-5 lg:space-y-20">
            <section id="what" aria-labelledby="what-h">
              <h2 id="what-h" className="h2 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]">
                Understanding {inSentence(s.name)}
              </h2>
              <div className="body-copy mt-5 space-y-4 text-[1.0625rem]">
                {s.what.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section id="who" aria-labelledby="who-h">
              <h2 id="who-h" className="h2 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]">
                Who may benefit
              </h2>
              <ul className="hairline-grid mt-6 grid gap-px overflow-hidden rounded-[var(--radius-media)] bg-line sm:grid-cols-2">
                {s.whoMayBenefit.map((w) => (
                  <li key={w} className="flex gap-3 bg-white p-5">
                    <Icon name="check" className="mt-1 size-[18px] shrink-0 text-smile" />
                    <span className="text-ink">{w}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">Only an examination can confirm whether this treatment is right for you.</p>
            </section>

            <section id="expect" aria-labelledby="expect-h">
              <h2 id="expect-h" className="h2 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]">
                What to expect
              </h2>
              <div className="body-copy mt-5 space-y-4 text-[1.0625rem]">
                {s.expect.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section id="process" aria-labelledby="process-h">
              <h2 id="process-h" className="h2 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]">
                The treatment process
              </h2>
              <ol className="mt-6 border-t border-line">
                {s.process.map((st, i) => (
                  <li key={st.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[4rem_14rem_1fr]">
                    <span className="font-display text-sm font-semibold tabular-nums text-smile">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="h4">{st.title}</h3>
                    <p className="body-copy col-start-2 sm:col-start-3">{st.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="considerations" aria-labelledby="cons-h">
              <h2 id="cons-h" className="h2 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]">
                Benefits and considerations
              </h2>
              <ul className="prose-sd mt-6">
                {s.considerations.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-6 rounded-[var(--radius-ui)] bg-mist p-5 text-[0.9375rem] text-muted">
                Every mouth is different, and results vary from person to person. Your dentist will discuss the benefits,
                risks and alternatives that apply to you, including the option of no treatment, before you decide.
              </p>
            </section>

            <section aria-labelledby="why-h" className="rounded-[var(--radius-media)] bg-navy p-8 sm:p-10 on-dark">
              <h2 id="why-h" className="h3">
                Why Select Dental
              </h2>
              <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {principles.slice(0, 4).map((p) => (
                  <div key={p.title}>
                    <dt className="font-display font-semibold text-white">{p.title}</dt>
                    <dd className="mt-1 text-[0.9375rem] text-[#c9d6e8]">{p.text}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {team.length > 0 && (
              <section aria-labelledby="team-h">
                <h2 id="team-h" className="h2 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]">
                  Who you will see
                </h2>
                <p className="body-copy mt-3 max-w-[56ch]">
                  Meet the members of our team involved in {inSentence(s.name)} at Select Dental.
                </p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {team.map((m, i) => (
                    <TeamCard key={m.slug} member={m} index={i} />
                  ))}
                </div>
              </section>
            )}

            <section id="faq" aria-labelledby="faq-h">
              <h2 id="faq-h" className="h2 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]">
                Questions about {inSentence(s.name)}
              </h2>
              <div className="mt-6">
                <FAQAccordion items={s.faqs} />
              </div>
              <div className="mt-6">
                <TextLink href="/faqs">More frequently asked questions</TextLink>
              </div>
            </section>

            {s.footnote && <p className="text-xs text-muted">{s.footnote}</p>}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section bg-mist" aria-labelledby="related-h">
          <div className="container-x">
            <h2 id="related-h" className="h2">
              Related services
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ServiceCard service={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BookingCTA title={`Ready to talk about ${inSentence(s.name)}?`} text="Book a consultation and we will explain your options, timeline and costs before anything begins." />

      <JsonLd
        data={[
          webPageSchema(`${s.name} in Scarborough`, path, s.summary),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: s.summary,
            provider: { "@id": `${site.url}/#dentist` },
            areaServed: { "@type": "City", name: "Scarborough, Ontario" },
            url: `${site.url}${path}`,
          },
          faqSchema(s.faqs),
        ]}
      />
    </>
  );
}
