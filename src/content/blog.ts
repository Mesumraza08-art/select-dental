/**
 * Blog articles. Each article should be reviewed by a Select Dental dentist before
 * publishing; set reviewedBy once that has happened.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category:
    | "General Dentistry"
    | "Dental Health"
    | "Children's Dentistry"
    | "Cosmetic Dentistry"
    | "Orthodontics"
    | "Dental Implants"
    | "Emergency Dentistry"
    | "CDCP"
    | "Clinic News";
  author: string;
  reviewedBy: string | null;
  published: string;
  updated?: string;
  readingMinutes: number;
  shot: string;
  body: Block[];
  references?: { label: string; url: string }[];
};

export const blogCategories: Post["category"][] = [
  "General Dentistry",
  "Dental Health",
  "Children's Dentistry",
  "Cosmetic Dentistry",
  "Orthodontics",
  "Dental Implants",
  "Emergency Dentistry",
  "CDCP",
  "Clinic News",
];

export const posts: Post[] = [
  {
    slug: "canadian-dental-care-plan-explained",
    title: "The Canadian Dental Care Plan, explained in plain language",
    description:
      "Who can qualify for the CDCP, how co-payments work, and what to bring to your dental visit if you are enrolled.",
    category: "CDCP",
    author: "Select Dental team",
    reviewedBy: null,
    published: "2026-10-01",
    readingMinutes: 4,
    shot: "Patient at reception handing over a card, warm and candid",
    body: [
      {
        type: "p",
        text: "The Canadian Dental Care Plan (CDCP) is a federal program that helps eligible Canadian residents without access to dental insurance pay for oral health care. Health Canada oversees the plan, and Sun Life administers it on the government's behalf.",
      },
      { type: "h2", text: "Who may be eligible" },
      { type: "p", text: "Eligibility is set by the Government of Canada. In general, you must:" },
      {
        type: "ul",
        items: [
          "be a Canadian resident for tax purposes",
          "not have access to dental insurance, for example through an employer, a pension or a family member's plan",
          "have an adjusted family net income under $90,000",
          "have filed your tax return for the previous year",
        ],
      },
      { type: "h2", text: "How co-payments work" },
      {
        type: "p",
        text: "Depending on your adjusted family net income, the plan covers a share of the CDCP established fee for covered services. Households under $70,000 have no co-payment. Between $70,000 and $79,999, the co-payment is 40%. Between $80,000 and $89,999, it is 60%.",
      },
      {
        type: "p",
        text: "A dental office's fee can be higher than the CDCP established fee. When that happens, the difference is the patient's responsibility, and the office should tell you about any extra cost before treatment.",
      },
      { type: "h2", text: "Before your visit" },
      {
        type: "ul",
        items: [
          "Tell the clinic you are a CDCP member when you book.",
          "Bring your CDCP member information and photo ID.",
          "Ask what your treatment plan will cost you before you agree to it.",
          "Some services need approval from the plan before treatment, which can take extra time.",
        ],
      },
      {
        type: "note",
        text: "Program details can change. Always confirm your eligibility and coverage on the official Government of Canada website.",
      },
    ],
    references: [
      { label: "Canadian Dental Care Plan, Government of Canada", url: "https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html" },
    ],
  },
  {
    slug: "your-first-visit-to-a-new-dentist",
    title: "Your first visit to a new dentist: what to expect",
    description: "A calm, step-by-step look at a first dental visit, and the few things worth bringing along.",
    category: "General Dentistry",
    author: "Select Dental team",
    reviewedBy: null,
    published: "2026-10-01",
    readingMinutes: 3,
    shot: "Bright reception desk, welcoming team member, morning light",
    body: [
      {
        type: "p",
        text: "Starting with a new dental office can feel like a lot, especially if it has been a while since your last checkup. Knowing what happens at a first visit makes it easier.",
      },
      { type: "h2", text: "Before you arrive" },
      {
        type: "ul",
        items: [
          "Complete your patient forms ahead of time if the clinic offers secure online forms.",
          "Bring photo ID and your insurance or CDCP member details.",
          "Make a list of your medications, including vitamins and supplements.",
          "If you can, ask your previous dentist to send your records and recent x-rays.",
        ],
      },
      { type: "h2", text: "During the visit" },
      {
        type: "p",
        text: "Your dentist will review your health history, ask about any concerns and examine your teeth, gums, bite and the soft tissues of your mouth. X-rays may be taken if they are needed. Depending on the appointment type, a cleaning may happen at the same visit or be booked separately.",
      },
      { type: "h2", text: "After the exam" },
      {
        type: "p",
        text: "You should leave with a clear picture of your oral health, any treatment that is recommended and why, and what it will cost. You never have to decide on the spot. A good dental team is happy to answer questions and give you time.",
      },
      {
        type: "note",
        text: "Feeling anxious? Say so when you book. It helps the team plan a visit that feels manageable for you.",
      },
    ],
  },
  {
    slug: "dental-emergency-what-to-do",
    title: "Dental emergency? What to do before you reach the clinic",
    description: "General first steps for toothache, a knocked-out tooth, a broken tooth or a lost crown, and when to call 911.",
    category: "Emergency Dentistry",
    author: "Select Dental team",
    reviewedBy: null,
    published: "2026-10-01",
    readingMinutes: 4,
    shot: "Calm phone call at the front desk, reassuring expression",
    body: [
      {
        type: "p",
        text: "Dental problems rarely arrive at a convenient time. These general first steps can help until you are seen by a dentist. They are not a substitute for an assessment.",
      },
      {
        type: "note",
        text: "Call 911 or go to the nearest emergency department if you have swelling that affects your breathing or swallowing, bleeding that will not stop, or a serious injury to your face or jaw.",
      },
      { type: "h2", text: "Toothache" },
      {
        type: "p",
        text: "Rinse with warm water and floss gently to remove anything caught between teeth. A cold compress on the outside of the cheek can ease swelling. Do not place medication directly on the gum, and call the clinic to be seen.",
      },
      { type: "h2", text: "A knocked-out adult tooth" },
      {
        type: "ul",
        items: [
          "Pick the tooth up by the crown, the part you normally see, not the root.",
          "If it is dirty, rinse it briefly without scrubbing.",
          "If you can, gently place it back in the socket and bite on a clean cloth to hold it.",
          "Otherwise keep it moist in milk or inside your cheek, and get to a dentist as quickly as possible.",
        ],
      },
      { type: "h2", text: "A broken or chipped tooth" },
      {
        type: "p",
        text: "Save any pieces, rinse your mouth with warm water and use a cold compress for swelling. Call the clinic so the tooth can be checked.",
      },
      { type: "h2", text: "A lost filling or crown" },
      {
        type: "p",
        text: "Keep the crown somewhere safe and bring it with you. Avoid chewing on that side and do not use household glue to reattach it.",
      },
      { type: "h2", text: "Bleeding after treatment" },
      {
        type: "p",
        text: "Bite firmly on clean gauze for 30 minutes. If bleeding continues, call the clinic, or seek emergency care if it is heavy.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
