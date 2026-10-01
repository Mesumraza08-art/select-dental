import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { Pending } from "@/components/ui/Pending";
import { Icon } from "@/components/ui/Icon";

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-1 text-smile" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={`size-4 ${i < n ? "fill-current" : "opacity-30"}`} />
      ))}
    </span>
  );
}

/** Real reviews only. On the live site the section is hidden until there are reviews. */
export function Testimonials() {
  if (!reviews.length && !site.preview) return null;
  const [lead, ...rest] = reviews;
  return (
    <section className="on-dark relative overflow-hidden bg-navy py-[var(--section-y)]" aria-labelledby="reviews-title">
      <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-10 font-display text-[22rem] leading-none text-white/[0.04]">
        &ldquo;
      </span>
      <div className="container-x relative">
        <Eyebrow n="07">Patient reviews</Eyebrow>
        <Lines id="reviews-title" className="t-xl mt-6" lines={["What our patients", "are saying."]} />
        {lead ? (
          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <figure className="lg:col-span-7" data-anim="fade">
              <Stars n={lead.rating} />
              <blockquote className="mt-8 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.025em] text-white">
                &ldquo;{lead.text}&rdquo;
              </blockquote>
              <figcaption className="micro mt-8">
                {lead.author} &middot; {lead.source}
              </figcaption>
            </figure>
            <div className="lg:col-span-4 lg:col-start-9" data-anim="stagger">
              {rest.slice(0, 3).map((r) => (
                <figure key={r.author + r.date} className="border-t border-white/15 py-7">
                  <Stars n={r.rating} />
                  <blockquote className="mt-4 text-[#c6d4e8]">&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption className="micro mt-4">
                    {r.author} &middot; {r.source}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-16 grid gap-10 border-t border-white/15 pt-12 lg:grid-cols-12" data-anim="fade">
            <p className="font-display text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-medium leading-[1.3] tracking-[-0.02em] text-white/90 lg:col-span-7">
              Genuine Google reviews will appear here, copied exactly as written with each reviewer&apos;s display name. Reviews are
              never written or edited by the clinic.
            </p>
            <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:col-start-9">
              <Pending>Connect Google reviews or add them in content/reviews.ts</Pending>
              <Pending>RCDSO advertising review before publishing</Pending>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
