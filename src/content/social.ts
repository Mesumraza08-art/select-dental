/**
 * Short vertical videos (9:16) for the "Behind the smile" section.
 * Add src and poster once videos are exported (H.264 MP4, 1080x1920, under 8 MB each).
 */
import type { ImgKey } from "./media";
import type { VidKey } from "./videos";

export type SocialVideo = {
  id: string;
  /** Preview only: AI-generated sample poster and clip, never shown on the live site. */
  sample?: { poster: ImgKey; video?: VidKey };
  title: string;
  topic: string;
  platform: "instagram" | "tiktok";
  src: string | null;
  poster: string | null;
  url: string | null;
};

export const socialVideos: SocialVideo[] = [
  { id: "tour", sample: { poster: "socialTour", video: "socialTour" }, title: "A quick tour of the clinic", topic: "Office tour", platform: "instagram", src: null, poster: null, url: null },
  { id: "team", sample: { poster: "socialTeam", video: "socialTeam" }, title: "Say hello to the team", topic: "Meet the team", platform: "tiktok", src: null, poster: null, url: null },
  { id: "floss", sample: { poster: "socialFloss" }, title: "Flossing, the right way", topic: "Dental tip", platform: "instagram", src: null, poster: null, url: null },
  { id: "myths", sample: { poster: "socialMyths" }, title: "Three dental myths we hear every week", topic: "Myths", platform: "tiktok", src: null, poster: null, url: null },
  { id: "checkup", sample: { poster: "socialCheckup" }, title: "What actually happens at a checkup", topic: "Treatment education", platform: "instagram", src: null, poster: null, url: null },
  { id: "first-visit", sample: { poster: "socialFirstVisit" }, title: "Your first visit, start to finish", topic: "New patients", platform: "tiktok", src: null, poster: null, url: null },
];
