/**
 * Team members. Replace the placeholder entries with real, verified details only.
 * Never add credentials, memberships or languages that have not been confirmed.
 * Photos go in /public/media/team/ (portrait 4:5, at least 1200px tall).
 */
import type { ImgKey } from "./media";

export type TeamMember = {
  slug: string;
  placeholder?: boolean;
  /** Preview only: an AI-generated sample portrait shown in place of a real photo. Never shown on the live site. */
  samplePhoto?: ImgKey;
  name: string | null;
  role: string | null;
  credentials: string | null;
  shortBio: string | null;
  bio: string[] | null;
  education: string[] | null;
  clinicalInterests: string[] | null;
  languages: string[] | null;
  memberships: string[] | null;
  photo: { src: string; alt: string } | null;
};

export const team: TeamMember[] = [
  {
    slug: "team-member-1",
    placeholder: true,
    samplePhoto: "team1",
    name: null,
    role: null,
    credentials: null,
    shortBio: null,
    bio: null,
    education: null,
    clinicalInterests: null,
    languages: null,
    memberships: null,
    photo: null,
  },
  {
    slug: "team-member-2",
    placeholder: true,
    samplePhoto: "team2",
    name: null,
    role: null,
    credentials: null,
    shortBio: null,
    bio: null,
    education: null,
    clinicalInterests: null,
    languages: null,
    memberships: null,
    photo: null,
  },
  {
    slug: "team-member-3",
    placeholder: true,
    samplePhoto: "team3",
    name: null,
    role: null,
    credentials: null,
    shortBio: null,
    bio: null,
    education: null,
    clinicalInterests: null,
    languages: null,
    memberships: null,
    photo: null,
  },
];

export const memberBySlug = (slug: string) => team.find((m) => m.slug === slug);
