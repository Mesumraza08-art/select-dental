import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** Search engines are blocked until NEXT_PUBLIC_ALLOW_INDEXING=true is set for launch. */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
