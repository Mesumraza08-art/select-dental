"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mainNav } from "@/content/nav";
import { categories, servicesIn } from "@/content/services";
import { site, bookingHref, fullAddress } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button, summary");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white xl:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Logo height={34} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-lg text-navy"
            >
              <Icon name="close" className="size-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex-1 pb-8 pt-4">
            <ul className="border-t border-line">
              {mainNav.map((item) =>
                "mega" in item ? (
                  <li key={item.href} className="border-b border-line">
                    <details className="faq-item">
                      <summary className="flex min-h-[60px] items-center justify-between font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-navy-ink">
                        {item.label}
                        <span className="faq-icon grid size-9 place-items-center rounded-full bg-mist text-navy">
                          <Icon name="plus" className="size-4" />
                        </span>
                      </summary>
                      <div className="space-y-5 pb-6">
                        {categories.map((c) => (
                          <div key={c.key}>
                            <p className="text-sm font-semibold text-navy">{c.name}</p>
                            <ul className="mt-1">
                              {servicesIn(c.key).map((s) => (
                                <li key={s.slug}>
                                  <Link href={`/services/${s.slug}`} onClick={onClose} className="block py-2 text-muted">
                                    {s.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href="/services" onClick={onClose} className="link-smile">
                          All services
                        </Link>
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex min-h-[60px] items-center font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-navy-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href={bookingHref} onClick={onClose} data-track="book_click" className="btn btn-primary w-full">
                <Icon name="calendar" className="size-[18px]" /> Book appointment
              </Link>
              <a
                href={site.phone ? `tel:${site.phone.e164}` : "/contact"}
                data-track="phone_click"
                className="btn btn-secondary w-full"
              >
                <Icon name="phone" className="size-[18px]" /> {site.phone ? site.phone.display : "Call Select Dental"}
              </a>
            </div>

            <dl className="mt-8 space-y-4 text-[0.9375rem]">
              <div className="flex gap-3">
                <dt className="sr-only">Address</dt>
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-navy" />
                <dd className="text-muted">{fullAddress}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Hours</dt>
                <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-navy" />
                <dd className="text-muted">
                  {site.hours ? (
                    <Link href="/contact" onClick={onClose} className="underline underline-offset-4">
                      See opening hours
                    </Link>
                  ) : site.preview ? (
                    <span className="pending">Opening hours</span>
                  ) : (
                    <Link href="/contact" onClick={onClose}>Contact us for hours</Link>
                  )}
                </dd>
              </div>
            </dl>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
