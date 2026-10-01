import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { Split } from "@/components/ui/Split";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Patient Forms | Select Dental Scarborough";
const description = "Complete your Select Dental patient forms securely online before your visit to save time at reception.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/patient-forms" });

const forms = [
  { name: "New patient registration", text: "Contact details, emergency contact and how you heard about us." },
  { name: "Medical and dental history", text: "Your health, medications and allergies, so treatment is safe for you." },
  { name: "Insurance or CDCP details", text: "Coverage information, if you have it, so we can explain your costs." },
  { name: "Privacy and consent", text: "How we protect and use your personal health information." },
];

export default function PatientFormsPage() {
  const portal = site.patientForms.portalUrl;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Patient forms", path: "/patient-forms" }]}
        title="Patient forms, done before you arrive."
        intro="Completing your forms online saves time at reception and gives your dental team what they need to plan a safe, comfortable visit."
        actions={
          portal ? (
            <ButtonLink href={portal} track="forms_click">
              <Icon name="shield" className="size-[18px]" />
              Start your secure forms
            </ButtonLink>
          ) : undefined
        }
      >
        {!portal && (
          <div className="mt-8 flex max-w-[56ch] gap-4 rounded-[var(--radius-media)] bg-mist p-6">
            <Icon name="shield" className="mt-0.5 size-6 shrink-0 text-navy" />
            <div>
              <p className="font-display font-semibold text-navy-ink">Secure online forms are being set up.</p>
              <p className="mt-1 text-[0.9375rem] text-muted">
                Until they are ready, our team will help you complete your forms when you arrive. Please allow a little
                extra time at reception.
              </p>
              <p className="mt-3">
                <Pending>Add the practice system&apos;s secure portal URL in content/site.ts</Pending>
              </p>
            </div>
          </div>
        )}
      </PageHero>

      <Split id="forms" tone="mist" title="What you will be asked">
        <ul className="hairline-grid grid gap-px overflow-hidden rounded-[var(--radius-media)] bg-line sm:grid-cols-2">
          {forms.map((f) => (
            <li key={f.name} className="flex gap-4 bg-white p-6 sm:p-7">
              <Icon name="file" className="mt-0.5 size-5 shrink-0 text-navy" />
              <div>
                <h3 className="h4">{f.name}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Split>

      <Split id="security" title="Your information is protected">
        <div className="body-copy space-y-4 text-[1.0625rem]">
          <p>
            Patient forms are completed through a secure, encrypted portal provided by our practice management system.
            Your information goes directly into your confidential patient record.
          </p>
          <p>
            For your privacy, please do not send health information, insurance numbers or identification by email or
            social media message. Ontario&apos;s Personal Health Information Protection Act (PHIPA) guides how we
            collect, use and protect your information.
          </p>
        </div>
        {site.preview && (
          <div className="mt-8 rounded-[var(--radius-media)] border border-dashed border-line-strong p-6 text-[0.9375rem] text-muted">
            <p className="font-medium text-ink">Integration point</p>
            <p className="mt-1">
              Connect the clinic&apos;s practice management system intake (for example its hosted patient portal) by adding
              its URL to <code className="rounded bg-mist px-1.5 py-0.5 text-[0.85em]">site.patientForms.portalUrl</code>.
              Health information is never collected by this website directly.
            </p>
          </div>
        )}
      </Split>

      <JsonLd data={webPageSchema("Patient forms", "/patient-forms", description)} />
    </>
  );
}
