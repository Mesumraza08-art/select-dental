/** Only list roles the clinic is actually hiring for. */
export type Opening = { id: string; title: string; type: string; summary: string; applyUrl: string | null };
export const openings: Opening[] = [];
