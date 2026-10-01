import { Lines, Eyebrow } from "@/components/ui/Lines";
import { ButtonLink } from "@/components/ui/Button";
import { TeamCard } from "@/components/team/TeamCard";
import { visibleTeam } from "@/components/team/visibleTeam";
import { DragTrack } from "@/components/ui/DragTrack";

export function TeamPreview() {
  const members = visibleTeam();
  return (
    <section className="section overflow-hidden" aria-labelledby="team-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="03">The team</Eyebrow>
            <Lines id="team-title" className="t-mega mt-6" lines={["Care starts", "with who's", "caring for you."]} />
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-anim="fade">
            <p className="body-copy">
              Get to know the people you will see at Select Dental: their backgrounds, what they enjoy about dentistry and
              the languages they speak.
            </p>
            <div className="mt-6">
              <ButtonLink href="/team" variant="secondary" arrow>
                Meet the team
              </ButtonLink>
            </div>
          </div>
        </div>
        {members.length > 0 ? (
          <div className="mt-14">
            <DragTrack label="Select Dental team" itemClass="w-[78%] sm:w-[46%] lg:w-[calc((min(100vw,1360px)-2*var(--pad)-3rem)/3.3)] first:lg:w-[calc((min(100vw,1360px)-2*var(--pad))/2.4)]">
              {members.map((m, i) => (
                <TeamCard key={m.slug} member={m} index={i} size={i === 0 ? "lg" : "md"} />
              ))}
            </DragTrack>
          </div>
        ) : (
          <p className="body-copy mt-10 max-w-[52ch]">Team introductions are on their way.</p>
        )}
      </div>
    </section>
  );
}
