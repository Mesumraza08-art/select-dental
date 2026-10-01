import { CDCP_OFFICIAL_URL, site } from "@/content/site";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";

const points = [
  ["For residents without dental insurance", "A federal program for Canadian residents who do not have access to dental insurance."],
  ["Income-based", "Eligibility includes an adjusted family net income below $90,000, among other criteria."],
  ["Part or all of the fee", "Depending on income, the plan covers part or all of its established fee for eligible services."],
];

export function CDCPCallout({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="section bg-smile-soft" aria-labelledby="cdcp-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Photo k="cdcpReception" ratio="4/5" reveal sizes="(min-width: 1024px) 38vw, 100vw" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>Government of Canada program</Eyebrow>
          <Lines id="cdcp-title" className="t-xl mt-6" lines={["The Canadian", "Dental Care Plan."]} />
          <p className="lede mt-6 max-w-[34rem]" data-anim="fade">
            If you are covered by the CDCP, tell us when you book. We will check how the plan applies to your visit and explain
            any amount you may need to pay before treatment begins.
          </p>
          {site.preview && !site.claims.cdcp.confirmed && (
            <p className="mt-5">
              <Pending>Confirm Select Dental accepts CDCP patients before launch</Pending>
            </p>
          )}
          <dl className="mt-10 border-t border-navy/15" data-anim="stagger">
            {points.map(([t, d]) => (
              <div key={t} className="grid gap-1 border-b border-navy/15 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-display font-semibold text-navy-ink">{t}</dt>
                <dd className="text-[0.9875rem] text-[#3d4b5e]">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-[#3d4b5e]">Eligibility and coverage are decided by the Government of Canada, not the clinic. Co-payments may apply.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {showLink && (
              <ButtonLink href="/cdcp" arrow>
                Learn about CDCP
              </ButtonLink>
            )}
            <TextLink href={CDCP_OFFICIAL_URL}>Official CDCP information</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
