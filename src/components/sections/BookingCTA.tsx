import { site, bookingHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { VideoLoop } from "@/components/ui/VideoLoop";

/** Closing call to action over a quiet atmospheric film. */
export function BookingCTA({
  title = ["Your smile deserves", "thoughtful care."],
  text = "Book a visit online or call the clinic. We look forward to meeting you.",
}: {
  title?: string | string[];
  text?: string;
}) {
  const callHref = site.phone ? `tel:${site.phone.e164}` : "/contact";
  const lines = Array.isArray(title) ? title : [title];
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-ink" aria-labelledby="cta-title">
      <VideoLoop v="corridor" className="absolute inset-0 -z-10 rounded-none opacity-60" sizes="100vw" controlClass="top-6 right-6" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-ink via-navy-ink/80 to-navy-ink/30" />
      <div className="container-x py-[clamp(6rem,4rem+8vw,11rem)]">
        <Lines id="cta-title" className="t-mega max-w-[14ch]" lines={lines} />
        <p className="lede mt-7 max-w-[34rem]" data-anim="fade">
          {text}
        </p>
        <div className="mt-10 flex flex-wrap gap-3" data-anim="fade">
          <ButtonLink href={bookingHref} variant="light" arrow track="book_click">
            Book an appointment
          </ButtonLink>
          <ButtonLink href={callHref} variant="outline-light" track="phone_click">
            <Icon name="phone" className="size-[18px]" /> Call the clinic
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
