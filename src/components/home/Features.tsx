import { bookingHref } from "@/content/site";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { Photo } from "@/components/ui/Photo";
import { SmileMark } from "@/components/brand/SmileMark";

/** Clear aligners: full-width editorial split, light. */
export function FeatureAligners() {
  return (
    <section className="section overflow-hidden" aria-labelledby="aligners-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div className="bleed-left lg:pr-4">
            <VideoLoop v="aligners" reveal ratio="16/11" className="lg:rounded-l-none" sizes="(min-width: 1024px) 62vw, 100vw" />
          </div>
          <div className="float-card absolute -bottom-8 right-4 hidden w-56 p-2 sm:block lg:-right-6" data-anim="fade" style={{ ["--d" as string]: 400 } as React.CSSProperties}>
            <Photo k="catOrtho" ratio="4/3" className="rounded-[12px]" sizes="224px" />
            <p className="px-2 pb-1 pt-3 text-[0.8125rem] font-medium text-navy-ink">Removable, clear and made for your smile</p>
          </div>
        </div>
        <div className="lg:col-span-5 lg:pl-8">
          <Eyebrow>Straighter smiles</Eyebrow>
          <Lines id="aligners-title" className="t-xl mt-6" lines={["Confidence,", "without", "the metal."]} />
          <p className="lede mt-7 max-w-[28rem]" data-anim="fade">
            Clear aligners gently move teeth with a series of removable trays. We will tell you honestly whether aligners or
            traditional braces suit you best.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6" data-anim="fade">
            <ButtonLink href="/services/invisalign-braces" arrow>
              Learn about clear aligners
            </ButtonLink>
            <TextLink href={bookingHref}>Book a consultation</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Dental implants: dark navy feature with large photography. */
export function FeatureImplants() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy py-[var(--section-y)]" aria-labelledby="implants-title">
      <svg viewBox="0 0 1200 400" aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 w-[70%] opacity-[0.08]">
        <path d="M40 30 Q600 680 1160 30" fill="none" stroke="#6ec1ec" strokeWidth="18" strokeLinecap="round" />
      </svg>
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Eyebrow>Dental implants</Eyebrow>
          <Lines id="implants-title" className="t-xl mt-6" lines={["A long-term way", "to replace a", "missing tooth."]} />
          <p className="lede mt-7 max-w-[28rem]" data-anim="fade">
            An implant replaces the root of a missing tooth and supports a crown, bridge or denture. We start with a careful
            consultation and plan every step with you.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-[16px] bg-white/10" data-anim="stagger">
            {[
              ["Consultation first", "Exam, imaging and a clear plan"],
              ["Planned with you", "Timeline and costs explained"],
            ].map(([t, d]) => (
              <div key={t} className="bg-navy p-5">
                <dt className="font-display font-semibold text-white">{t}</dt>
                <dd className="mt-1 text-sm text-[#c6d4e8]">{d}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3" data-anim="fade">
            <ButtonLink href="/services/dental-implants" variant="light" arrow>
              Explore dental implants
            </ButtonLink>
          </div>
        </div>
        <div className="relative lg:col-span-7">
          <VideoLoop v="implants" reveal ratio="4/3" sizes="(min-width: 1024px) 58vw, 100vw" className="lg:ml-6" />
          <div className="absolute -left-2 -top-6 hidden items-center gap-3 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-navy-ink shadow-lg sm:flex lg:-left-4" data-anim="fade" style={{ ["--d" as string]: 500 } as React.CSSProperties}>
            <SmileMark className="h-2.5 w-6 text-smile" strokeWidth={9} />
            Restorative dentistry
          </div>
        </div>
      </div>
    </section>
  );
}
