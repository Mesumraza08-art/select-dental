"use client";

import Link from "next/link";
import { useState } from "react";
import { site, bookingHref } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Integration point for the after-hours AI receptionist.
 * Scope: hours, general service information, navigation, booking links, general clinic questions.
 * It must never diagnose, give personalized clinical advice, or replace emergency services.
 * Replace the panel body with the provider's widget once it is supplied.
 */
export function ReceptionistSlot() {
  const [open, setOpen] = useState(false);
  if (!site.features.receptionist) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[44] hidden lg:block">
      {open && (
        <div
          id="receptionist-panel"
          role="dialog"
          aria-label="Ask Select Dental"
          className="mb-3 w-[340px] rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-20px_rgba(15,35,70,.35)]"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="h4">Ask Select Dental</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="-m-2 grid size-10 place-items-center text-muted">
              <Icon name="close" className="size-5" />
            </button>
          </div>
          <p className="mt-2 text-[0.9375rem] text-muted">
            Our after-hours assistant will answer questions about hours, services and booking here.
          </p>
          {site.preview && <p className="pending mt-3 whitespace-normal">Assistant integration point</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={bookingHref} className="btn btn-primary btn-sm" data-track="book_click">
              Book appointment
            </Link>
            <Link href="/faqs" className="btn btn-secondary btn-sm">
              Read FAQs
            </Link>
          </div>
          <p className="mt-4 border-t border-line pt-3 text-[0.8125rem] leading-relaxed text-muted">
            The assistant cannot give medical advice. In an emergency, call 911.
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="receptionist-panel"
        className="ml-auto flex h-12 items-center gap-2 rounded-full bg-white px-5 font-display text-[0.9375rem] font-semibold text-navy shadow-[0_0_0_1px_var(--color-line),0_12px_30px_-12px_rgba(15,35,70,.35)] hover:shadow-[0_0_0_1px_var(--color-navy),0_12px_30px_-12px_rgba(15,35,70,.35)]"
      >
        <Icon name="chat" className="size-5" />
        Ask a question
      </button>
    </div>
  );
}
