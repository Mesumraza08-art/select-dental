import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { LegalPage, PolicyContact } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility | Select Dental Scarborough",
  description: "Select Dental's commitment to an accessible website and clinic, and how to ask for help or give feedback.",
  path: "/accessibility",
});

const toc = [
  { id: "commitment", label: "Our commitment" },
  { id: "website", label: "This website" },
  { id: "clinic", label: "At the clinic" },
  { id: "formats", label: "Alternate formats" },
  { id: "feedback", label: "Feedback" },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      path="/accessibility"
      updated="October 1, 2026"
      toc={toc}
      intro="Everyone should be able to find information about their dental care and visit us comfortably. Here is how we approach accessibility, and how to tell us when something does not work for you."
    >
      <h2 id="commitment">Our commitment</h2>
      <p>
        Select Dental is committed to meeting the needs of people with disabilities in a timely way, in line with the
        Accessibility for Ontarians with Disabilities Act, 2005 (AODA). We aim for this website to meet the Web Content
        Accessibility Guidelines (WCAG) 2.2 at Level AA.
      </p>

      <h2 id="website">This website</h2>
      <ul>
        <li>Every page can be used with a keyboard, with a visible focus indicator and a link to skip to the main content.</li>
        <li>Text and controls are designed to meet WCAG colour contrast requirements.</li>
        <li>Images have text alternatives, and decorative graphics are hidden from screen readers.</li>
        <li>Animations are reduced or turned off when your device asks for reduced motion.</li>
        <li>Forms have visible labels, clear error messages and do not rely on colour alone.</li>
        <li>Videos do not autoplay with sound. Captions will be provided for videos with speech.</li>
        <li>Pages work at up to 400% zoom and on small screens.</li>
      </ul>
      <p>
        We test with automated tools and by hand, and we continue to improve. Some content from other providers, such as
        Google Maps and social media platforms, may not be fully accessible.
      </p>

      <h2 id="clinic">At the clinic</h2>
      {site.accessibility ? <p>{site.accessibility}</p> : <p>Please call us before your visit and we will help with any access needs.</p>}
      {site.preview && !site.accessibility && (
        <p>
          <span className="pending">Physical accessibility details: entrance, washroom, parking</span>
        </p>
      )}
      <p>Support persons and service animals are welcome. Let us know when you book if you need any accommodation.</p>

      <h2 id="formats">Alternate formats</h2>
      <p>
        Information on this website is available in alternate formats or with communication support on request, at no
        cost to you.
      </p>

      <h2 id="feedback">Feedback</h2>
      <p>If you have trouble using this website or our clinic, or have ideas to make it better, please tell us:</p>
      <PolicyContact role="Accessibility contact" />
      <p>We will respond as soon as we can.</p>
    </LegalPage>
  );
}
