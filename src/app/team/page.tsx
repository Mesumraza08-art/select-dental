import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { TeamCard } from "@/components/team/TeamCard";
import { visibleTeam } from "@/components/team/visibleTeam";
import { TextLink } from "@/components/ui/Button";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { Pending } from "@/components/ui/Pending";

const title = "Meet Our Dental Team | Select Dental Scarborough";
const description = "Meet the dentists, hygienists and patient care team at Select Dental in Scarborough, Ontario.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/team" });

export default function TeamPage() {
  const members = visibleTeam();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Meet the team", path: "/team" }]}
        title="Care starts with who's caring for you."
        intro="The people at Select Dental are the reason a visit here feels different. Get to know them before you come in."
      />
      <section className="pb-[var(--section-y)]">
        <div className="container-x">
          {members.length ? (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m, i) => (
                <TeamCard key={m.slug} member={m} index={i} />
              ))}
            </div>
          ) : (
            <p className="body-copy max-w-[52ch]">Team profiles are on their way. In the meantime, our front desk is happy to tell you who you will see.</p>
          )}
          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9375rem] text-muted">
              Credentials and memberships listed on this site are confirmed by each team member.{" "}
              <Pending>Add verified profiles in content/team.ts</Pending>
            </p>
            <TextLink href="/careers">Work with us</TextLink>
          </div>
        </div>
      </section>
      <BookingCTA />
      <JsonLd data={webPageSchema("Meet the team", "/team", description)} />
    </>
  );
}
