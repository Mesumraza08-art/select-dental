import { claimVisible, site } from "@/content/site";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { ButtonLink } from "@/components/ui/Button";
import { Claim } from "@/components/ui/Pending";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";

const items = [
  ["Dental insurance", "Bring your plan details and we will help you understand what may be covered."],
  ["CDCP", "Tell us you are a member when booking. We confirm how the plan applies before treatment."],
  ["Estimates first", "You will know the expected cost before anything is booked."],
  ["Payment options", "Ask our team about the ways you can pay."],
];

export function InsurancePreview() {
  const call = site.phone ? `tel:${site.phone.e164}` : "/contact";
  return (
    <>
      <section className="section" aria-labelledby="ins-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow n="08">Insurance &amp; payment</Eyebrow>
            <Lines id="ins-title" className="t-xl mt-6" lines={["Clear costs,", "no surprises."]} />
            <p className="lede mt-6 max-w-[30rem]" data-anim="fade">
              We explain fees, insurance and payment in plain language before treatment begins.
            </p>
            {claimVisible("directBilling") && (
              <p className="mt-6 inline-block rounded-full bg-smile-soft px-4 py-2 text-sm font-medium text-navy-ink">
                <Claim k="directBilling" /> available. Ask us about your plan.
              </p>
            )}
            <dl className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2" data-anim="stagger">
              {items.map(([t, d]) => (
                <div key={t} className="border-b border-line py-5">
                  <dt className="font-display font-semibold text-navy-ink">{t}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-muted">{d}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9">
              <ButtonLink href="/insurance-payment" variant="secondary" arrow>
                Insurance &amp; payment
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Photo k="insurance" ratio="4/5" reveal position="40% center" sizes="(min-width: 1024px) 38vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Emergency banner */}
      <section aria-labelledby="emergency-title" className="container-x pb-[var(--section-y)]">
        <div className="relative overflow-hidden rounded-[28px] bg-smile-soft" data-anim="fade">
          <div className="grid lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <p className="eyebrow">Urgent care</p>
              <h2 id="emergency-title" className="t-xl mt-5">
                Dental emergency?
              </h2>
              <p className="lede mt-5 max-w-[32rem]">Severe pain, a broken tooth or a lost crown can be stressful. Call us and we will do our best to see you quickly.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={call} track="emergency_call">
                  <Icon name="phone" className="size-[18px]" /> Call now
                </ButtonLink>
                <ButtonLink href="/emergency-dentist" variant="secondary" arrow>
                  What to do now
                </ButtonLink>
              </div>
              <p className="mt-8 flex max-w-[34rem] gap-3 border-t border-navy/10 pt-6 text-sm text-[#3d4b5e]">
                <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-navy" />
                If you have swelling that affects breathing or swallowing, heavy bleeding or a serious injury, call 911 or go to the nearest emergency department.
              </p>
            </div>
            <div className="relative min-h-[280px] lg:col-span-5">
              <Photo k="emergency" className="absolute inset-0 rounded-none" sizes="(min-width: 1024px) 40vw, 100vw" position="35% center" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
