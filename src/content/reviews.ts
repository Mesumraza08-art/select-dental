/**
 * Real patient reviews only, copied from a public source (for example Google) with the
 * reviewer's display name as shown there. Never write or edit reviews.
 * Check the RCDSO advertising standard before publishing reviews on the site.
 */
export type Review = { author: string; text: string; rating: number; source: "Google"; date: string; url?: string };
export const reviews: Review[] = [];
