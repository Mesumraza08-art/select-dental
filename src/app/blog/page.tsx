import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { posts } from "@/content/blog";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Dental Health Blog | Select Dental Scarborough";
const description =
  "Plain-language articles on dental health, first visits, dental emergencies and the Canadian Dental Care Plan from Select Dental in Scarborough.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog" });

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published));
  const cats = Array.from(new Set(sorted.map((p) => p.category)));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }]}
        title="Notes on caring for your smile."
        intro="Clear, practical articles from the Select Dental team. Educational only, and never a substitute for an examination."
      />
      <section className="pb-[var(--section-y)]">
        <div className="container-x">
          {cats.length > 1 && (
            <p className="mb-10 flex flex-wrap gap-2 text-sm text-muted">
              <span className="sr-only">Topics covered:</span>
              {cats.map((c) => (
                <span key={c} className="rounded-full px-3 py-1.5 ring-1 ring-line">
                  {c}
                </span>
              ))}
            </p>
          )}
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p, i) => (
              <li key={p.slug}>
                <BlogCard post={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BookingCTA />
      <JsonLd data={webPageSchema("Select Dental blog", "/blog", description)} />
    </>
  );
}
