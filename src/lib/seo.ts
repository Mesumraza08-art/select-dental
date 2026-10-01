import type { Metadata } from "next";
import { site, mapsUrl } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, noindex, type = "website" }: PageMetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_CA",
      type,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Select Dental, Scarborough" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: noindex || !site.indexable ? { index: false, follow: !noindex } : { index: true, follow: true },
  };
}

/* ---------------- Structured data (only verified properties) ---------------- */

export function dentistSchema() {
  const sameAs = [site.social.instagram, site.social.tiktok, site.social.facebook, site.google.businessProfileUrl].filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${site.url}/#dentist`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/select-dental-logo.svg`,
    image: `${site.url}/og.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    hasMap: mapsUrl,
    areaServed: { "@type": "City", name: "Scarborough, Ontario" },
  };
  if (site.phone) data.telephone = site.phone.e164;
  if (site.email) data.email = site.email;
  if (sameAs.length) data.sameAs = sameAs;
  if (site.hours) {
    const dayMap: Record<string, string> = {
      Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday", Thursday: "Thursday",
      Friday: "Friday", Saturday: "Saturday", Sunday: "Sunday",
    };
    data.openingHoursSpecification = site.hours
      .filter((h) => !h.closed && h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayMap[h.day] ?? h.day}`,
        opens: to24(h.open!),
        closes: to24(h.close!),
      }));
  }
  return data;
}

function to24(t: string) {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return t;
  let h = parseInt(m[1], 10);
  const ap = m[3]?.toUpperCase();
  if (ap === "PM" && h < 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-CA",
    publisher: { "@id": `${site.url}/#dentist` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${site.url}${path}`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#dentist` },
    inLanguage: "en-CA",
  };
}
