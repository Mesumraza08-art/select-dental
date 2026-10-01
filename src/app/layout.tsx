import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { LogoIntro } from "@/components/home/LogoIntro";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { CookieConsent } from "@/components/system/CookieConsent";
import { Analytics } from "@/components/system/Analytics";
import { RevealObserver } from "@/components/system/RevealObserver";
import { ReceptionistSlot } from "@/components/system/ReceptionistSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories, servicesIn } from "@/content/services";
import { categoryMedia } from "@/content/serviceMedia";
import { img } from "@/content/media";
import { dentistSchema, websiteSchema } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap", weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Select Dental | Dentist in Scarborough, ON", template: "%s" },
  description: "Thoughtful, modern dental care for every stage of your smile at Select Dental, 215 Select Ave, Scarborough, Ontario.",
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint. Decides whether the logo intro plays:
 * homepage only, once per browser session, never with reduced motion.
 * Failsafes: if the page scripts have not started the intro within 2.4s (slow
 * connection), or anything stalls, the intro is skipped so the site is never blocked.
 */
const introScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var p=sessionStorage.getItem('sd-intro');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var play=!p&&!rm&&location.pathname==='/';d.setAttribute('data-intro',play?'play':'skip');if(play){var k=function(){d.setAttribute('data-intro','skip');};setTimeout(function(){if(d.getAttribute('data-intro')==='play'&&!d.hasAttribute('data-intro-started'))k();},2400);setTimeout(function(){var s=d.getAttribute('data-intro');if(s==='play'||s==='fading')k();},9000);}}catch(e){}})();`;

const megaMenu = categories.map((c) => {
  const m = img[categoryMedia[c.key].image];
  return {
    key: c.key,
    name: c.name,
    blurb: c.blurb,
    image: { src: m.src, blur: m.blur },
    services: servicesIn(c.key).map((s) => ({ slug: s.slug, name: s.name })),
  };
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${jakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header mega={megaMenu} />
        <LogoIntro />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <CookieConsent />
        <ReceptionistSlot />
        <Analytics />
        <RevealObserver />
        <JsonLd data={[dentistSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
