import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, postBySlug, type Block } from "@/content/blog";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Media } from "@/components/ui/Media";
import { Pending } from "@/components/ui/Pending";
import { TextLink } from "@/components/ui/Button";
import { BlogCard, formatDate } from "@/components/blog/BlogCard";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.title} | Select Dental`, description: p.description, path: `/blog/${p.slug}`, type: "article" });
}

const DISCLAIMER =
  "Information on this website is provided for educational purposes only and is not a substitute for diagnosis or treatment from a qualified dental professional.";

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p key={i} className="rounded-[var(--radius-ui)] bg-mist p-5 text-[0.9375rem]">
          {b.text}
        </p>
      );
    default:
      return <p key={i}>{b.text}</p>;
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="pt-[calc(var(--header-h)+2.5rem)]">
          <div className="container-x">
            <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: p.title, path }]} />
            <div className="mt-10 max-w-[52rem]">
              <p className="text-sm font-medium text-navy">{p.category}</p>
              <h1 className="display mt-4 text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)]">{p.title}</h1>
              <p className="lede mt-6">{p.description}</p>
              <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9375rem] text-muted">
                <span>By {p.author}</span>
                <span aria-hidden="true">·</span>
                <span>
                  Published <time dateTime={p.published}>{formatDate(p.published)}</time>
                </span>
                {p.updated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated <time dateTime={p.updated}>{formatDate(p.updated)}</time>
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{p.readingMinutes} min read</span>
              </p>
              <p className="mt-2 text-[0.9375rem] text-muted">
                {p.reviewedBy ? <>Reviewed by {p.reviewedBy}</> : <Pending>Dentist review before publishing</Pending>}
              </p>
            </div>
            <div className="mt-12">
              <Media shot={p.shot} ratio="21/9" priority sizes="(min-width: 1280px) 1200px, 100vw" className="aspect-[4/3]! sm:aspect-[21/9]!" />
            </div>
          </div>
        </header>

        <div className="container-x py-16 lg:py-20">
          <div className="prose-sd mx-auto text-[1.0625rem] leading-[1.75] lg:mx-0 lg:ml-[calc(100%/12*2)]">
            {p.body.map(renderBlock)}

            {p.references?.length ? (
              <>
                <h2>Sources</h2>
                <ul>
                  {p.references.map((r) => (
                    <li key={r.url}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="mt-12! border-t border-line pt-6 text-sm text-muted">{DISCLAIMER}</p>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section bg-mist" aria-labelledby="more-h">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-h" className="h2">
                Keep reading
              </h2>
              <TextLink href="/blog">All articles</TextLink>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {more.map((m) => (
                <li key={m.slug}>
                  <BlogCard post={m} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BookingCTA />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.published,
          dateModified: p.updated ?? p.published,
          author: { "@type": "Organization", name: p.author },
          publisher: { "@id": `${site.url}/#dentist` },
          mainEntityOfPage: `${site.url}${path}`,
          image: `${site.url}/og.png`,
          inLanguage: "en-CA",
          articleSection: p.category,
        }}
      />
    </>
  );
}
