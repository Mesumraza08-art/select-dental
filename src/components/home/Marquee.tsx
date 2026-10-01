import { services } from "@/content/services";
import { SmileMark } from "@/components/brand/SmileMark";

/** One slow line of services. Decorative: the same links exist in navigation. */
export function Marquee() {
  const items = ["General dentistry", "Cosmetic dentistry", "Clear aligners", "Dental implants", "Family care", "Children's dentistry", "Emergency care", ...services.slice(4, 8).map((s) => s.name)];
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-[0.95rem] font-medium tracking-[-0.01em] text-navy/70">
          {t}
          <SmileMark className="h-2 w-5 text-smile" strokeWidth={10} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line py-5" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
