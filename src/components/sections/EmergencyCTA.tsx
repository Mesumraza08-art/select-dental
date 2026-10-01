import { site, bookingHref } from "@/content/site";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";

export function EmergencyCTA({ className = "", showGuide = true }: { className?: string; showGuide?: boolean }) {
  const call = site.phone ? `tel:${site.phone.e164}` : null;
  const requestHref = bookingHref === "/book-appointment" ? "/book-appointment?type=emergency" : bookingHref;
  return (
    <section className={`section ${className}`} aria-labelledby="emergency-title">
      <div className="container-x">
        <div className="grid gap-10 rounded-[var(--radius-media)] border border-line bg-white p-8 sm:p-12 lg:grid-cols-12 lg:items-center lg:p-16">
          <div className="lg:col-span-7">
            <span className="grid size-12 place-items-center rounded-full bg-smile-soft text-navy">
              <Icon name="alert" className="size-6" />
            </span>
            <h2 id="emergency-title" className="h2 mt-6">
              Dental emergency?
            </h2>
            <p className="lede mt-4 max-w-[46ch]">
              Severe pain, a broken tooth or a lost crown can be stressful. Call us and we will do our best to see you
              quickly and help you feel comfortable.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-wrap gap-3">
              {call ? (
                <ButtonLink href={call} track="emergency_call">
                  <Icon name="phone" className="size-[18px]" />
                  Call now
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact" track="emergency_call">
                  <Icon name="phone" className="size-[18px]" />
                  Call now
                </ButtonLink>
              )}
              <ButtonLink href={requestHref} variant="secondary" track="emergency_request">
                Request appointment
              </ButtonLink>
            </div>
            {!site.phone && (
              <p className="mt-3">
                <Pending>Phone number</Pending>
              </p>
            )}
            <p className="mt-6 flex gap-3 border-t border-line pt-6 text-[0.9375rem] text-muted">
              <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-navy" />
              <span>
                If you have swelling that affects your breathing or swallowing, heavy bleeding that will not stop, or a
                serious injury, call <strong className="font-semibold text-ink">911</strong> or go to the nearest
                emergency department.
              </span>
            </p>
            {showGuide && (
              <TextLink href="/emergency-dentist" className="mt-4 text-[0.9375rem]">
                What to do in a dental emergency
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
