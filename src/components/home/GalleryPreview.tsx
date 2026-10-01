import Image from "next/image";
import { galleryCases } from "@/content/gallery";
import { site } from "@/content/site";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { DemoPane } from "@/components/gallery/DemoPane";

export function GalleryPreview() {
  const c = galleryCases[0];
  if (!c && !site.preview) return null;
  return (
    <section className="section" aria-labelledby="gallery-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="05">Smile gallery</Eyebrow>
            <Lines id="gallery-title" className="t-mega mt-6" lines={["Real smiles.", "Real confidence."]} />
          </div>
          <p className="body-copy lg:col-span-4 lg:col-start-9" data-anim="fade">
            Every case in our gallery is a Select Dental patient who gave written consent to share their photos. Results vary
            from person to person.
          </p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-12" data-anim="fade">
          <div className="lg:col-span-9">
            {c ? (
              <BeforeAfterSlider
                label={c.title}
                className="aspect-[4/5] sm:aspect-[16/10]"
                before={<Image src={c.before.src} alt={c.before.alt} fill sizes="(min-width:1024px) 66vw, 100vw" className="object-cover" />}
                after={<Image src={c.after.src} alt={c.after.alt} fill sizes="(min-width:1024px) 66vw, 100vw" className="object-cover" />}
              />
            ) : (
              <BeforeAfterSlider label="Demonstration" demo className="aspect-[4/5] sm:aspect-[16/10]" before={<DemoPane kind="before" />} after={<DemoPane kind="after" />} />
            )}
          </div>
          <div className="flex flex-col justify-between gap-8 border-t border-line pt-6 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <dl className="space-y-6">
              <div>
                <dt className="micro">Treatment</dt>
                <dd className="t-md mt-2">{c ? c.treatment : "Teeth whitening"}</dd>
              </div>
              <div>
                <dt className="micro">Case</dt>
                <dd className="body-copy mt-2 text-[0.9375rem]">
                  {c ? c.note ?? "Individual results vary." : "Demonstration of the comparison viewer. No patient result is shown until real, consented cases are added."}
                </dd>
              </div>
              {!c && (
                <dd>
                  <Pending>Add consented cases in content/gallery.ts</Pending>
                </dd>
              )}
            </dl>
            <TextLink href="/smile-gallery">View more smiles</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
