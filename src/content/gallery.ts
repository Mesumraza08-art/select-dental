/**
 * Before and after cases. Only add cases with documented written patient consent
 * on file. Photos must be unretouched and taken with matching lighting and angles.
 */
export type GalleryCase = {
  id: string;
  title: string;
  treatment: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  consentOnFile: true;
  note?: string;
};
export const galleryCases: GalleryCase[] = [];
