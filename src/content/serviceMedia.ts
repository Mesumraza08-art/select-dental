import type { CategoryKey } from "./services";
import type { ImgKey } from "./media";
import type { VidKey } from "./videos";

/** Which image or film represents each service category (temporary Higgsfield media). */
export const categoryMedia: Record<CategoryKey, { image: ImgKey; video?: VidKey }> = {
  general: { image: "catGeneral", video: "hygiene" },
  restorative: { image: "catRestorative" },
  cosmetic: { image: "catCosmetic", video: "smile" },
  orthodontics: { image: "catOrtho", video: "aligners" },
  comfort: { image: "sedation" },
};

/** Hero and supporting media for each service page. */
export const serviceMedia: Record<string, { hero: ImgKey; video?: VidKey; second: ImgKey }> = {
  "checkups-cleanings": { hero: "catGeneral", video: "hygiene", second: "gum" },
  fillings: { hero: "fillings", second: "xrayConsult" },
  "childrens-dentistry": { hero: "children", video: "children", second: "welcomeFamily" },
  "gum-treatment": { hero: "gum", second: "catGeneral" },
  "crowns-bridges": { hero: "crown", second: "catRestorative" },
  "root-canals": { hero: "rootCanal", second: "xrayConsult" },
  dentures: { hero: "dentures", second: "consultTable" },
  "dental-implants": { hero: "implantsConsult", video: "implants", second: "crown" },
  "extractions-wisdom-teeth": { hero: "xrayConsult", second: "rootCanal" },
  "teeth-whitening": { hero: "smileCloseup", video: "smile", second: "catCosmetic" },
  veneers: { hero: "veneers", second: "smileCloseup" },
  "invisalign-braces": { hero: "alignersLifestyle", video: "aligners", second: "catOrtho" },
  "sedation-dentistry": { hero: "sedation", second: "catComfort" },
  "tmj-sleep-apnea": { hero: "tmj", second: "catComfort" },
};

/** Short, factual highlights shown as floating labels on service heroes. */
export const serviceHighlights: Record<string, [string, string]> = {
  "checkups-cleanings": ["Prevention first", "Gentle cleanings"],
  fillings: ["Tooth-coloured options", "Repair and protect"],
  "childrens-dentistry": ["Gentle first visits", "Healthy habits"],
  "gum-treatment": ["Healthier gums", "Ongoing care"],
  "crowns-bridges": ["Protect weak teeth", "Fill the gap"],
  "root-canals": ["Save the tooth", "Relieve infection"],
  dentures: ["Full or partial", "Comfortable fit"],
  "dental-implants": ["Replace missing teeth", "Long-term option"],
  "extractions-wisdom-teeth": ["Careful removal", "Clear aftercare"],
  "teeth-whitening": ["Professionally supervised", "Natural-looking"],
  veneers: ["Shape and shade", "Planned with you"],
  "invisalign-braces": ["Clear aligners", "Traditional braces"],
  "sedation-dentistry": ["Calmer visits", "Options explained"],
  "tmj-sleep-apnea": ["Jaw comfort", "Oral appliances"],
};
