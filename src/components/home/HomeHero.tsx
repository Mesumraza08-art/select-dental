import { site, bookingHref, claimVisible } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Claim } from "@/components/ui/Pending";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { SmileMark } from "@/components/brand/SmileMark";

export function HomeHero() {
  const callHref = site.phone ? `tel:${site.phone.e164}` : "/contact";
  const card = claimVisible("newPatients") ? "newPatients" : claimVisible("cdcp") ? "cdcp" : null;
  return (
    <section className="relative isolate overflow-hidden pt-[var(--header-h)]" aria-labelledby="hero-title">
      {/* Oversized smile line behind the composition */}
      <svg viewBox="0 0 1400 520" aria-hidden="true" className="pointer-events-none absolute left-[-12%] top-[18%] -z-10 w-[85%] opacity-[0.5]" data-anim="draw" style={{ ["--d" as string]: 700 }}>
        <path d="M40 40 Q700 760 1360 40" pathLength={1} fill="none" stroke="var(--color-smile-soft)" strokeWidth="26" strokeLinecap="round" />
      </svg>

      <div className="container-x grid min-h-[calc(92svh-var(--header-h))] items-center gap-12 pb-14 pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-4">
        <div className="relative z-10 lg:col-span-6 xl:col-span-6">
          <p className="eyebrow" data-anim="fade">
            Select Dental <span aria-hidden="true">&middot;</span> Scarborough
          </p>
          <Lines as="h1" id="hero-title" className="t-hero mt-7" lines={["Dentistry", "designed", <>around you<span className="text-smile">.</span></>]} delay={80} />
          <div data-anim="stagger" className="mt-9 max-w-[30rem]">
            <p className="lede">Thoughtful, modern dental care for every stage of your smile, from a clinic that takes the time to listen.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={bookingHref} arrow track="book_click">
                Book an appointment
              </ButtonLink>
              <ButtonLink href={callHref} variant="secondary" track="phone_click">
                <Icon name="phone" className="size-[18px]" />
                Call the clinic
              </ButtonLink>
            </div>
            <p className="mt-10 flex items-center gap-2.5 text-[0.9375rem] text-muted">
              <Icon name="pin" className="size-[18px] text-navy" />
              {site.address.street}, {site.address.city}
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-6">
          <div className="bleed-right relative lg:pl-6">
            <VideoLoop
              v="hero"
              priority
              reveal
              delay={150}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[4/5] sm:aspect-[5/5] lg:aspect-auto lg:h-[min(78svh,820px)] lg:rounded-r-none"
              position="center 30%"
              controlClass="bottom-5 right-5"
            />
            {card && (
              <div className="float-card absolute -bottom-6 left-4 flex max-w-[17rem] items-center gap-3.5 p-4 sm:left-8 lg:-left-10 lg:bottom-12" data-anim="fade" style={{ ["--d" as string]: 900 }}>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-smile-soft text-navy">
                  <SmileMark className="h-3 w-6" strokeWidth={9} />
                </span>
                <span>
                  <span className="block font-display text-[1rem] font-semibold leading-tight text-navy-ink">
                    <Claim k={card} />
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] text-muted">Book online in about two minutes.</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-x hidden items-center gap-4 pb-10 lg:flex" aria-hidden="true">
        <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-line" />
        <span className="micro">Scroll</span>
      </div>
    </section>
  );
}
