/**
 * Select Dental: single source of truth for clinic details.
 *
 * Anything set to null has NOT been supplied by the clinic yet. The site shows a
 * clearly labelled placeholder for it in preview mode and hides it in production.
 * Never fill these in with guesses: only verified details.
 */

export type IntroVideo = {
  src: string;
  webm?: string;
  still: string;
  frame: [number, number];
  logoBox: [number, number, number, number];
  inkBox: [number, number, number, number];
  handoffAt: number;
};

export type Hours = { day: string; open?: string; close?: string; closed?: boolean; note?: string };

/*
 * NEXT_PUBLIC_ variables must be read as literal process.env.NAME expressions so
 * Next.js can inline them into the browser bundle (server and browser then agree).
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null;

export const site = {
  name: "Select Dental",
  url: (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/$/, ""),

  /** true = show "to be supplied" markers for missing content (client preview). */
  preview: process.env.NEXT_PUBLIC_PREVIEW_PLACEHOLDERS !== "false",
  /** Search engines are blocked until this is explicitly turned on for launch. */
  indexable: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",

  address: {
    street: "215 Select Ave Unit A4",
    line1: "215 Select Ave",
    unit: "Unit A4",
    city: "Scarborough",
    region: "ON",
    postalCode: "M1X 0B5",
    country: "Canada",
    countryCode: "CA",
  },

  /** e.g. { display: "(416) 555-0100", e164: "+14165550100" } once supplied */
  phone: null as null | { display: string; e164: string },
  email: null as string | null,
  /** e.g. [{ day: "Monday", open: "9:00 AM", close: "5:00 PM" }, { day: "Sunday", closed: true }] */
  hours: null as Hours[] | null,
  parking: null as string | null,
  transit: null as string | null,
  accessibility: null as string | null,

  booking: {
    /** If the clinic uses a hosted booking page, put its URL here and every Book button will use it. */
    externalUrl: null as string | null,
    /** Endpoint that receives requests from the on-site booking form (practice management integration). */
    endpoint: process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || null,
  },

  patientForms: {
    /** URL of the secure intake portal supplied by the practice management system. */
    portalUrl: null as string | null,
  },

  social: {
    instagram: null as string | null,
    tiktok: null as string | null,
    facebook: null as string | null,
  },
  google: {
    businessProfileUrl: null as string | null,
    reviewsUrl: null as string | null,
  },

  /** Media produced in Higgsfield or filmed at the clinic. Paths are relative to /public. */
  media: {
    /**
     * The "Open with a smile" intro film (supplied by the clinic, made in Higgsfield).
     * logoBox is where the finished logo sits in the film's final frame (x, y, width, height
     * in film pixels); the site uses it to glide that logo into the header. Set to null to use
     * the built-in vector intro instead.
     */
    introVideo: {
      src: "/media/intro/select-dental-intro.mp4",
      webm: "/media/intro/select-dental-intro.webm",
      still: "/media/intro/intro-logo.png",
      frame: [1920, 1080],
      logoBox: [529, 363, 877, 332],
      inkBox: [533, 367, 868, 323],
      handoffAt: 3.62,
    } as null | IntroVideo,
    heroVideo: null as null | { src: string; poster: string },
    heroImage: null as null | { src: string; alt: string },
  },

  /**
   * Trust claims. Each one appears in the trust strip and hero only once the clinic
   * has confirmed it (set confirmed: true). In preview mode unconfirmed claims show
   * with a dashed underline so the client can see where they will go.
   */
  claims: {
    newPatients: { label: "New patients welcome", confirmed: false },
    family: { label: "Family dentistry", confirmed: false },
    directBilling: { label: "Direct billing", confirmed: false },
    cdcp: { label: "CDCP welcome", confirmed: false },
  },

  features: {
    /** Shows the after-hours assistant launcher. Connect the provider in components/system/ReceptionistSlot.tsx */
    receptionist: true,
  },
};

export type ClaimKey = keyof typeof site.claims;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
const mapsQuery = encodeURIComponent(fullAddress);
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const bookingHref = site.booking.externalUrl ?? "/book-appointment";

export function claimVisible(key: ClaimKey) {
  return site.claims[key].confirmed || site.preview;
}

export const CDCP_OFFICIAL_URL = "https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html";
