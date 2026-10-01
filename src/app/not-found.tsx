import type { Metadata } from "next";
import { bookingHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { SmileMark } from "@/components/brand/SmileMark";

export const metadata: Metadata = {
  title: "Page not found | Select Dental",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[78vh] items-center pt-[var(--header-h)]">
      <div className="container-x py-24 text-center">
        <SmileMark className="mx-auto h-8 w-40 text-smile" strokeWidth={3} />
        <h1 className="display mx-auto mt-10 max-w-[14ch]">This page may have lost its way.</h1>
        <p className="lede mx-auto mt-6 max-w-[34ch]">Let&apos;s get you back to your smile.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href={bookingHref} variant="secondary" track="book_click">
            Book appointment
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
