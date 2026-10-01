import type { Metadata } from "next";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site } from "@/content/site";
import { openings } from "@/content/careers";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Pending } from "@/components/ui/Pending";
import { Split, NoteGrid } from "@/components/ui/Split";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Careers | Select Dental Scarborough";
const description = "Join the team at Select Dental, a new dental clinic in Scarborough. Current openings and general applications.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/careers" });

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Careers", path: "/careers" }]}
        title="Work at Select Dental."
        intro="We are building a team that cares about patients and about each other. If that sounds like you, we would like to hear from you."
        aside={<Media priority ratio="4/3" tone="warm" shot="Team moment in the staff area, candid and relaxed" sizes="(min-width:1024px) 40vw, 100vw" />}
      />

      <Split id="culture" tone="mist" title="Clinic culture">
        <NoteGrid
          items={[
            { title: "Patients first", text: "We take the time to listen and explain, and we expect to be given that time too." },
            { title: "Respect and teamwork", text: "Every role matters, from the front desk to the treatment room." },
            { title: "Learning", text: "We value curiosity and keeping our skills current." },
            { title: "A new clinic", text: "The chance to help shape a new practice and how it cares for patients." },
          ]}
        />
        <p className="mt-6">
          <Pending>Benefits and perks, once confirmed</Pending>
        </p>
      </Split>

      <Split id="openings" title="Current openings">
        {openings.length ? (
          <ul className="border-t border-line">
            {openings.map((o) => (
              <li key={o.id} className="flex flex-col gap-4 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="h4">{o.title}</h3>
                  <p className="text-sm text-muted">{o.type}</p>
                  <p className="body-copy mt-2 text-[0.9375rem]">{o.summary}</p>
                </div>
                {o.applyUrl && (
                  <ButtonLink href={o.applyUrl} variant="secondary" size="sm">
                    Apply
                  </ButtonLink>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="body-copy text-[1.0625rem]">There are no open positions right now. You are welcome to send a general application below.</p>
        )}
      </Split>

      <Split id="apply" tone="mist" title="General applications">
        <p className="body-copy text-[1.0625rem]">
          Send your resume and a short note about the role you are interested in. We keep applications on file and will
          contact you if a suitable position opens.
        </p>
        <div className="mt-6">
          {site.email ? (
            <ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent("Career enquiry")}`} track="email_click">
              Email your resume
            </ButtonLink>
          ) : (
            <Pending>Careers email address</Pending>
          )}
        </div>
      </Split>
      <JsonLd data={webPageSchema("Careers", "/careers", description)} />
    </>
  );
}
