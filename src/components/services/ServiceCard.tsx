import Link from "next/link";
import type { Service } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

/** Compact text card for related services and the services index. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col justify-between gap-6 rounded-[var(--radius-media)] bg-white p-6 ring-1 ring-line transition-shadow duration-300 hover:ring-navy/40 sm:p-7"
    >
      <span>
        <span className="h4 block text-[1.125rem]">{service.name}</span>
        <span className="mt-2 block text-[0.9375rem] leading-relaxed text-muted">{service.summary}</span>
      </span>
      <span className="flex items-center gap-1.5 font-display text-sm font-semibold text-navy">
        Learn more
        <Icon name="chevron" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
