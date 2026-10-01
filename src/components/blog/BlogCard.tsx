import Link from "next/link";
import type { Post } from "@/content/blog";
import { Media } from "@/components/ui/Media";

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export function BlogCard({ post, priority }: { post: Post; priority?: boolean }) {
  return (
    <article className="group relative">
      <Media shot={post.shot} ratio="3/2" priority={priority} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
      <p className="mt-5 flex flex-wrap items-center gap-x-3 text-sm text-muted">
        <span className="font-medium text-navy">{post.category}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.published}>{formatDate(post.published)}</time>
      </p>
      <h3 className="h3 mt-2">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-navy">
          {post.title}
        </Link>
      </h3>
      <p className="body-copy mt-2 text-[0.9375rem]">{post.description}</p>
    </article>
  );
}
