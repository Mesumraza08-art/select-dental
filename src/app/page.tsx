import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { Marquee } from "@/components/home/Marquee";
import { Approach } from "@/components/home/Approach";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeatureAligners, FeatureImplants } from "@/components/home/Features";
import { TeamPreview } from "@/components/home/TeamPreview";
import { VideoMoment } from "@/components/home/VideoMoment";
import { Journey } from "@/components/home/Journey";
import { CDCPCallout } from "@/components/sections/CDCPCallout";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BehindTheSmile } from "@/components/home/BehindTheSmile";
import { Testimonials } from "@/components/sections/Testimonials";
import { InsurancePreview } from "@/components/home/InsurancePreview";
import { LocationSection } from "@/components/sections/LocationSection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { BookingCTA } from "@/components/sections/BookingCTA";

export const metadata: Metadata = pageMetadata({
  title: "Select Dental | Dentist in Scarborough, ON",
  description:
    "Select Dental is a modern dental clinic at 215 Select Ave in Scarborough, Ontario, offering thoughtful care for every stage of your smile. Book an appointment online.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <Approach />
      <ServicesSection />
      <FeatureAligners />
      <FeatureImplants />
      <TeamPreview />
      <VideoMoment />
      <Journey />
      <CDCPCallout />
      <GalleryPreview />
      <BehindTheSmile />
      <Testimonials />
      <InsurancePreview />
      <LocationSection />
      <HomeFAQ />
      <BookingCTA />
    </>
  );
}
