import { homeFaqs } from "@/content/faqs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { TextLink } from "@/components/ui/Button";
import { Lines, Eyebrow } from "@/components/ui/Lines";

export function HomeFAQ() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Eyebrow n="09">FAQ</Eyebrow>
            <Lines id="faq-title" className="t-xl mt-6" lines={["Questions,", "answered."]} />
            <p className="body-copy mt-6 max-w-[30ch]">Can&apos;t find what you are looking for? Our team is happy to help.</p>
            <div className="mt-6 flex flex-col items-start">
              <TextLink href="/faqs">All questions</TextLink>
              <TextLink href="/contact">Contact the clinic</TextLink>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8" data-anim="fade">
          <FAQAccordion items={homeFaqs} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
