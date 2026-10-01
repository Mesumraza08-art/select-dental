import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { fullAddress } from "@/content/site";
import { LegalPage, PolicyContact } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use | Select Dental Scarborough",
  description: "The terms that apply to your use of the Select Dental website.",
  path: "/terms-of-use",
});

const toc = [
  { id: "about", label: "About these terms" },
  { id: "advice", label: "Not dental advice" },
  { id: "bookings", label: "Appointment requests" },
  { id: "accuracy", label: "Accuracy" },
  { id: "links", label: "Other websites" },
  { id: "ip", label: "Content and trademarks" },
  { id: "liability", label: "Limitation of liability" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      path="/terms-of-use"
      updated="October 1, 2026"
      toc={toc}
      intro="By using this website, you agree to these terms. If you do not agree, please do not use the site."
    >
      <h2 id="about">About these terms</h2>
      <p>
        This website is operated by Select Dental, {fullAddress}. We may update these
        terms from time to time. The date at the top of this page shows when they last changed.
      </p>

      <h2 id="advice">Not dental advice</h2>
      <p>
        Information on this website is provided for educational purposes only and is not a substitute for diagnosis or
        treatment from a qualified dental professional. Using this site, sending us a message or using any chat assistant
        does not create a dentist and patient relationship. If you have an urgent concern, call the clinic. In an
        emergency, call 911.
      </p>

      <h2 id="bookings">Appointment requests</h2>
      <p>
        Requests sent through this website are not confirmed appointments. An appointment is confirmed only when our team
        contacts you to agree on a date and time.
      </p>

      <h2 id="accuracy">Accuracy</h2>
      <p>
        We work to keep information current and accurate, including details about services, hours, insurance and the
        Canadian Dental Care Plan. Programs, fees and policies can change, so please confirm important details with the
        clinic or the official source.
      </p>

      <h2 id="links">Other websites</h2>
      <p>
        Links to other websites, such as government program pages or social media platforms, are provided for
        convenience. We are not responsible for their content or privacy practices.
      </p>

      <h2 id="ip">Content and trademarks</h2>
      <p>
        The Select Dental name, logo, text, photographs and videos on this site belong to Select Dental or are used with
        permission. Please do not copy or reuse them without written permission. Other trademarks belong to their
        owners.
      </p>

      <h2 id="liability">Limitation of liability</h2>
      <p>
        To the extent permitted by law, Select Dental is not liable for any loss arising from use of, or reliance on,
        this website. This does not affect any rights you have that cannot be limited by law.
      </p>

      <h2 id="law">Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.</p>

      <h2 id="contact">Contact</h2>
      <PolicyContact role="Select Dental" />
      <p>
        See also our <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
