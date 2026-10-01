import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, PolicyContact } from "@/components/legal/LegalPage";
import { CookieSettingsButton } from "@/components/system/CookieConsent";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Select Dental Scarborough",
  description: "How Select Dental collects, uses, protects and shares personal and personal health information.",
  path: "/privacy-policy",
});

const toc = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "What we collect" },
  { id: "use", label: "How we use it" },
  { id: "share", label: "When we share it" },
  { id: "website", label: "This website" },
  { id: "cookies", label: "Cookies and analytics" },
  { id: "protect", label: "How we protect it" },
  { id: "rights", label: "Your rights" },
  { id: "contact", label: "Contact and complaints" },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy-policy"
      updated="October 1, 2026"
      toc={toc}
      intro="Your privacy matters to us. This policy explains how Select Dental handles your personal information and personal health information, at the clinic and on this website."
    >
      <h2 id="who">Who we are</h2>
      <p>
        Select Dental is a dental clinic in Scarborough, Ontario. As a health care provider, we are a health information
        custodian under Ontario&apos;s Personal Health Information Protection Act, 2004 (PHIPA), and we follow the
        record-keeping and confidentiality requirements of the Royal College of Dental Surgeons of Ontario.
      </p>

      <h2 id="collect">What we collect</h2>
      <ul>
        <li>Contact details such as your name, address, phone number and email.</li>
        <li>Health information such as your medical and dental history, medications, x-rays, clinical notes and treatment records.</li>
        <li>Coverage and billing information, including insurance or Canadian Dental Care Plan details.</li>
        <li>Information you choose to send us through this website, such as an appointment request.</li>
      </ul>
      <p>We collect only the information we need for the purposes described in this policy.</p>

      <h2 id="use">How we use it</h2>
      <ul>
        <li>To provide safe, appropriate dental care and keep accurate records.</li>
        <li>To contact you about appointments, treatment and follow-up care.</li>
        <li>To bill you, your insurer or the CDCP for services you receive.</li>
        <li>To meet our legal, regulatory and professional obligations.</li>
        <li>With your separate, optional consent, to send clinic news. You can withdraw this consent at any time.</li>
      </ul>

      <h2 id="share">When we share it</h2>
      <p>We do not sell personal information. We share personal health information only:</p>
      <ul>
        <li>with other health care providers involved in your care, as permitted by PHIPA;</li>
        <li>with your insurer or the CDCP administrator to process claims, with your consent;</li>
        <li>with service providers who help us operate (for example, our practice management and secure forms systems), under agreements that require them to protect it; and</li>
        <li>when required or permitted by law.</li>
      </ul>

      <h2 id="website">This website</h2>
      <p>
        Appointment requests sent through this site include only the details you enter: your name, phone number, optional
        email, visit type, preferred times and a short note. Please do not include detailed health information in the
        booking form or by email. Health history is collected through our secure patient forms.
      </p>
      <p>
        The map on our contact and location sections is provided by Google and loads only when you choose to show it.
        Social media videos and links are provided by their platforms and are subject to their privacy policies.
      </p>

      <h2 id="cookies">Cookies and analytics</h2>
      <p>
        We use essential storage to remember your cookie choices. With your consent, we use Google Analytics to understand
        how visitors use the site, for example which pages are visited and which buttons are pressed. Analytics is off
        until you allow it, and you can change your choice at any time.
      </p>
      <p>
        <CookieSettingsButton className="link-smile" />
      </p>

      <h2 id="protect">How we protect it</h2>
      <p>
        We use physical, administrative and technical safeguards appropriate to the sensitivity of the information,
        including access controls, staff confidentiality training and secure systems. We keep records for the period
        required by the Royal College of Dental Surgeons of Ontario and applicable law, then dispose of them securely.
      </p>

      <h2 id="rights">Your rights</h2>
      <ul>
        <li>You may ask to see or get a copy of your records. A reasonable fee may apply, as permitted by PHIPA.</li>
        <li>You may ask us to correct information you believe is inaccurate or incomplete.</li>
        <li>You may withdraw consent for certain uses, subject to legal and contractual limits.</li>
      </ul>

      <h2 id="contact">Contact and complaints</h2>
      <p>Questions or requests about your information can be sent to our privacy contact:</p>
      <PolicyContact role="Privacy Officer" />
      <p>
        If you are not satisfied with our response, you may contact the{" "}
        <a href="https://www.ipc.on.ca/" target="_blank" rel="noopener noreferrer">
          Information and Privacy Commissioner of Ontario
        </a>
        .
      </p>
      <p>
        See also our <Link href="/terms-of-use">terms of use</Link> and <Link href="/accessibility">accessibility statement</Link>.
      </p>
    </LegalPage>
  );
}
