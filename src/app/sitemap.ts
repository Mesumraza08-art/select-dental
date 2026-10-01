import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { posts } from "@/content/blog";
import { team } from "@/content/team";
import { galleryCases } from "@/content/gallery";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  const core = [
    page("/", 1),
    page("/services", 0.9),
    page("/book-appointment", 0.9),
    page("/emergency-dentist", 0.9),
    page("/new-patients", 0.8),
    page("/cdcp", 0.8),
    page("/insurance-payment", 0.7),
    page("/about", 0.7),
    page("/team", 0.7),
    page("/contact", 0.8),
    page("/faqs", 0.6),
    page("/patient-forms", 0.5),
    page("/blog", 0.6),
    page("/careers", 0.3),
    page("/privacy-policy", 0.2),
    page("/terms-of-use", 0.2),
    page("/accessibility", 0.2),
  ];
  if (galleryCases.length) core.push(page("/smile-gallery", 0.6));
  return [
    ...core,
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    // Placeholder profiles are never listed
    ...team.filter((m) => !m.placeholder).map((m) => page(`/team/${m.slug}`, 0.5)),
    ...posts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.5), lastModified: new Date(p.updated ?? p.published) })),
  ];
}
