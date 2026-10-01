"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/content/nav";
import { site, bookingHref } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "./MobileNav";

export type MegaCategory = {
  key: string;
  name: string;
  blurb: string;
  image: { src: string; blur: string };
  services: { slug: string; name: string }[];
};

export function Header({ mega }: { mega: MegaCategory[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        megaBtnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!megaRef.current?.contains(e.target as Node) && !megaBtnRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const solid = scrolled || megaOpen;
  const openSoon = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(true), 120);
  };
  const closeSoon = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 200);
  };
  const cat = mega[activeCat];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-white/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-white/0"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center gap-6">
        <Link href="/" className="header-logo shrink-0 rounded-md py-2" aria-label="Select Dental, home">
          <span data-header-logo className="block">
            <Logo height={38} priority />
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden xl:block">
          <ul className="flex items-center">
            {mainNav.map((item) =>
              "mega" in item ? (
                <li key={item.href} onMouseEnter={openSoon} onMouseLeave={closeSoon}>
                  <button
                    ref={megaBtnRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-services"
                    onClick={() => setMegaOpen((v) => !v)}
                    className={`nav-link flex min-h-[44px] items-center gap-1 px-3 text-[0.9375rem] font-medium transition-colors hover:text-navy ${
                      pathname.startsWith("/services") ? "text-navy" : "text-ink"
                    }`}
                  >
                    {item.label}
                    <Icon name="chevronDown" className={`size-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                  </button>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`nav-link flex min-h-[44px] items-center px-3 text-[0.9375rem] font-medium transition-colors hover:text-navy ${
                      pathname === item.href ? "text-navy" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          {site.phone ? (
            <a
              href={`tel:${site.phone.e164}`}
              data-track="phone_click"
              className="hidden min-h-[44px] items-center gap-2 px-2 text-[0.9375rem] font-semibold text-navy lg:flex"
            >
              <Icon name="phone" className="size-[18px]" />
              {site.phone.display}
            </a>
          ) : site.preview ? (
            <span className="pending hidden lg:inline-flex" title="Placeholder: supply before launch">
              <Icon name="phone" className="size-3.5" /> Phone
            </span>
          ) : null}
          <Link href={bookingHref} data-track="book_click" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Book appointment
            <Icon name="arrow" className="arrow size-4" />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-navy xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="menu" className="size-6" />
          </button>
        </div>
      </div>

      {/* Services mega menu with image preview */}
      <div
        id="mega-services"
        ref={megaRef}
        onMouseEnter={openSoon}
        onMouseLeave={closeSoon}
        className={`absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_40px_80px_-40px_rgba(13,31,63,.25)] transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out)] xl:block ${
          megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="container-x grid grid-cols-12 gap-10 py-10">
          <div className="col-span-8 grid grid-cols-5 gap-6">
            {mega.map((c, i) => (
              <div key={c.key} onMouseEnter={() => setActiveCat(i)} onFocus={() => setActiveCat(i)}>
                <p className={`micro mb-4 transition-colors ${i === activeCat ? "text-navy" : ""}`}>{c.name}</p>
                <ul className="space-y-0.5">
                  {c.services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group/l flex items-center gap-1.5 rounded-md py-1.5 text-[0.9375rem] text-ink transition-colors hover:text-navy"
                      >
                        <span>{s.name}</span>
                        <Icon
                          name="arrow"
                          className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/l:translate-x-0 group-hover/l:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-span-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-mist">
              {mega.map((c, i) => (
                <Image
                  key={c.key}
                  src={c.image.src}
                  alt=""
                  fill
                  sizes="420px"
                  placeholder="blur"
                  blurDataURL={c.image.blur}
                  className={`object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out)] ${
                    i === activeCat ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-ink/80 to-transparent p-5 pt-16 text-white">
                <p className="font-display text-lg font-semibold">{cat?.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-white/80">{cat?.blurb}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Link href="/services" className="link-smile text-[0.9375rem]">
                <span className="label">All services</span>
                <Icon name="arrow" className="arrow size-4" />
              </Link>
              <Link href={bookingHref} data-track="book_click" className="btn btn-secondary btn-sm">
                Book a checkup
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
