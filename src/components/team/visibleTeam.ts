import { team } from "@/content/team";
import { site } from "@/content/site";

/** Real members always show. Placeholder slots only show in client preview mode. */
export const visibleTeam = () => team.filter((m) => !m.placeholder || site.preview);
