import { Lines } from "@/components/ui/Lines";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { TextLink } from "@/components/ui/Button";

/** Full-bleed film with a quiet statement over it. */
export function VideoMoment() {
  return (
    <section className="relative" aria-labelledby="moment-title">
      <VideoLoop v="culture" className="shade-b h-[78svh] min-h-[520px] rounded-none" sizes="100vw" controlClass="top-6 right-6" />
      <div className="on-dark pointer-events-none absolute inset-x-0 bottom-0">
        <div className="container-x pointer-events-auto grid gap-6 pb-14 lg:grid-cols-12 lg:items-end lg:pb-20">
          <Lines id="moment-title" className="t-mega lg:col-span-8" lines={["A calmer kind", "of dental visit."]} />
          <div className="lg:col-span-4" data-anim="fade">
            <p className="text-[1.0625rem] text-white/85">
              Time to talk, a team that checks in with you, and a clinic designed to feel calm and easy.
            </p>
            <div className="mt-4">
              <TextLink href="/about">Inside Select Dental</TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
