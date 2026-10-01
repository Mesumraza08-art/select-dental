import Link from "next/link";
import Image from "next/image";
import type { TeamMember } from "@/content/team";
import { img } from "@/content/media";
import { site } from "@/content/site";
import { Pending } from "@/components/ui/Pending";
import { Icon } from "@/components/ui/Icon";

export function memberPhoto(m: TeamMember) {
  if (m.photo) return { src: m.photo.src, alt: m.photo.alt, blur: undefined as string | undefined, sample: false };
  if (site.preview && m.samplePhoto) {
    const s = img[m.samplePhoto];
    return { src: s.src, alt: "Sample portrait for preview, not a Select Dental team member", blur: s.blur, sample: true };
  }
  return null;
}

/** Editorial portrait card. On hover the portrait settles, a short introduction rises and a smile-blue line draws. */
export function TeamCard({ member, index = 0, size = "md" }: { member: TeamMember; index?: number; size?: "md" | "lg" }) {
  const photo = memberPhoto(member);
  const label = member.name ?? `Team member ${index + 1}`;
  return (
    <article className="group relative">
      <Link href={`/team/${member.slug}`} className="block" aria-label={member.name ? `Read ${member.name}'s profile` : `Team profile ${index + 1}`}>
        <div className={`media-frame zoom-on-hover ${size === "lg" ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
          <div className="media-inner">
            {photo ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={size === "lg" ? "(min-width: 1024px) 40vw, 85vw" : "(min-width: 1024px) 26vw, 70vw"}
                placeholder={photo.blur ? "blur" : "empty"}
                blurDataURL={photo.blur}
                className="object-cover"
              />
            ) : (
              <div className="media-ph h-full w-full" />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-ink/80 via-navy-ink/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-6 p-6 opacity-0 transition-all duration-700 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100">
            <span className="block h-[2px] w-0 bg-smile transition-[width] delay-150 duration-700 ease-[var(--ease-out)] group-hover:w-12" />
            <p className="mt-4 max-w-[30ch] text-[0.9375rem] leading-relaxed text-white/90">
              {member.shortBio ?? "A short introduction in their own words will appear here."}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              View profile <Icon name="arrow" className="size-4" />
            </span>
          </div>
          {photo?.sample && (
            <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-navy-ink backdrop-blur">
              Sample portrait
            </span>
          )}
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className={size === "lg" ? "t-md" : "h3"}>
            {member.name ? (
              <Link href={`/team/${member.slug}`} className="hover:text-navy">
                {label}
                {member.credentials && <span className="font-medium text-muted">, {member.credentials}</span>}
              </Link>
            ) : (
              <Pending>Name and credentials</Pending>
            )}
          </h3>
          <p className="mt-2 text-[0.9375rem] text-muted">{member.role ?? <Pending>Role</Pending>}</p>
        </div>
        <p className="micro shrink-0 pt-1">{member.languages?.length ? member.languages.join(" · ") : <Pending>Languages</Pending>}</p>
      </div>
    </article>
  );
}
