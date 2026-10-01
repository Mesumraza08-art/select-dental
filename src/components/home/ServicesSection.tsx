import { categories, servicesIn } from "@/content/services";
import { categoryMedia } from "@/content/serviceMedia";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { ServiceExplorer, type ExplorerPanel } from "@/components/services/ServiceExplorer";

const SHORT: Record<string, string> = {
  general: "General",
  restorative: "Restorative",
  cosmetic: "Cosmetic",
  orthodontics: "Orthodontics",
  comfort: "Comfort & advanced",
};

export function ServicesSection() {
  const panels: ExplorerPanel[] = categories.map((c) => {
    const m = categoryMedia[c.key];
    return {
      key: c.key,
      name: c.name,
      short: SHORT[c.key] ?? c.name,
      blurb: c.blurb,
      media: m.video ? (
        <VideoLoop v={m.video} className="h-full rounded-none" sizes="(min-width: 1024px) 38vw, 100vw" controlClass="bottom-4 right-4" />
      ) : (
        <Photo k={m.image} className="h-full rounded-none" sizes="(min-width: 1024px) 38vw, 100vw" />
      ),
      services: servicesIn(c.key).map((s) => ({ slug: s.slug, name: s.name, summary: s.summary })),
    };
  });
  return (
    <section className="section bg-mist" aria-labelledby="services-title">
      <div className="container-x">
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow n="02">Our services</Eyebrow>
            <Lines id="services-title" className="t-mega mt-6" lines={["Care for", "every stage", "of your smile."]} />
          </div>
          <div className="lg:col-span-4" data-anim="fade">
            <p className="body-copy">From a first checkup to replacing a missing tooth, the care you need is under one roof.</p>
            <div className="mt-4">
              <TextLink href="/services">All dental services</TextLink>
            </div>
          </div>
        </div>
        <ServiceExplorer panels={panels} />
      </div>
    </section>
  );
}
