import { Lines, Eyebrow } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { TextLink } from "@/components/ui/Button";

const principles = [
  { n: "01", t: "Clear", d: "Plain-language explanations, and costs you understand before you agree." },
  { n: "02", t: "Comfortable", d: "Unhurried visits, a calm room and a team that checks in with you." },
  { n: "03", t: "Thoughtful", d: "Care planned around your mouth, your goals and your budget." },
];

export function Approach() {
  return (
    <section className="section" aria-labelledby="approach-title">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <Photo k="receptionTall" ratio="4/5" reveal className="w-[86%]" sizes="(min-width: 1024px) 42vw, 86vw" />
          <div className="absolute -bottom-10 right-0 w-[46%] rounded-[24px] bg-white p-2 shadow-[0_30px_70px_-30px_rgba(13,31,63,.35)] sm:-bottom-14">
            <Photo k="instruments" ratio="1/1" reveal delay={250} className="rounded-[18px]" sizes="(min-width: 1024px) 22vw, 44vw" />
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          <Eyebrow n="01">Our approach</Eyebrow>
          <Lines id="approach-title" className="t-xl mt-6" lines={["Dentistry", "should feel", "personal."]} />
          <p className="lede mt-8 max-w-[30rem]" data-anim="fade">
            Select Dental is a new Scarborough clinic built around a simple idea: a visit to the dentist should feel calm,
            clear and human.
          </p>
          <ul className="mt-12 border-t border-line" data-anim="stagger">
            {principles.map((p) => (
              <li key={p.t} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6">
                <span className="num text-sm text-smile-deep">{p.n}</span>
                <div>
                  <h3 className="t-md">{p.t}</h3>
                  <p className="body-copy mt-1.5 text-[0.9875rem]">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TextLink href="/about">About Select Dental</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
