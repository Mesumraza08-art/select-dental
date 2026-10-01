import Link from "next/link";
import { site, bookingHref, directionsUrl } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Sticky Call / Book / Directions bar on small screens. The body reserves space for it. */
export function MobileActionBar() {
  const item = "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[0.75rem] font-semibold";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/98 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="flex">
        <a href={site.phone ? `tel:${site.phone.e164}` : "/contact"} data-track="phone_click" className={`${item} text-navy`}>
          <Icon name="phone" className="size-5" />
          Call
        </a>
        <Link href={bookingHref} data-track="book_click" className={`${item} bg-navy text-white`}>
          <Icon name="calendar" className="size-5" />
          Book
        </Link>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" data-track="directions_click" className={`${item} text-navy`}>
          <Icon name="pin" className="size-5" />
          Directions
        </a>
      </div>
    </nav>
  );
}
