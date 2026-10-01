import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site } from "@/content/site";
import { galleryCases } from "@/content/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { DemoPane } from "@/components/gallery/DemoPane";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Smile Gallery | Select Dental Scarborough";
const description = "Before and after photos of real Select Dental patients, shared with their written consent.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/smile-gallery", noindex: galleryCases.length === 0 });

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Smile gallery", path: "/smile-gallery" }]}
        title="Real smiles. Real confidence."
        intro="Every case here is a Select Dental patient who gave written consent to share their photos. Images are not retouched, and individual results vary."
      />
      <section className="pb-[var(--section-y)]">
        <div className="container-x">
          {galleryCases.length ? (
            <ul className="grid gap-x-10 gap-y-16 lg:grid-cols-2">
              {galleryCases.map((c) => (
                <li key={c.id}>
                  <BeforeAfterSlider
                    label={c.title}
                    before={<Image src={c.before.src} alt={c.before.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />}
                    after={<Image src={c.after.src} alt={c.after.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />}
                  />
                  <h2 className="h4 mt-5">{c.title}</h2>
                  <p className="mt-1 text-[0.9375rem] text-muted">
                    {c.treatment}. {c.note ?? "Individual results vary."}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="h3 max-w-[22ch]">Our gallery will grow as patients choose to share their results.</p>
                <p className="body-copy mt-4">We never use stock photos or images from other clinics here.</p>
                <div className="mt-6 flex flex-col items-start gap-2">
                  <Pending>Add consented cases in content/gallery.ts</Pending>
                  <Pending>RCDSO advertising review before publishing</Pending>
                </div>
              </div>
              {site.preview && (
                <div className="lg:col-span-7">
                  <BeforeAfterSlider label="Demonstration" demo before={<DemoPane kind="before" />} after={<DemoPane kind="after" />} />
                  <p className="mt-4 text-sm text-muted">Comparison viewer preview. No patient results are shown.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <BookingCTA title="Thinking about changing your smile?" text="Book a consultation and we will talk through what is realistic for you." />
      <JsonLd data={webPageSchema("Smile gallery", "/smile-gallery", description)} />
    </>
  );
}
