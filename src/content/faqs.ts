export type Faq = { q: string; a: string; group: "Visiting us" | "Insurance & payment" | "Care & treatment" };

export const faqs: Faq[] = [
  {
    group: "Visiting us",
    q: "How do I book my first appointment?",
    a: "Request an appointment online or call the clinic. Our team will confirm the next available new patient visit and let you know what to bring.",
  },
  {
    group: "Visiting us",
    q: "What should I bring to my first visit?",
    a: "Photo ID, your dental insurance details or CDCP member information if you have them, a list of the medications you take, and any previous dental records or x-rays you can access.",
  },
  {
    group: "Visiting us",
    q: "Can I fill out my forms before I arrive?",
    a: "Yes. Our patient forms page will link to secure digital forms so you can complete them ahead of time. Please do not email health information.",
  },
  {
    group: "Visiting us",
    q: "Where is Select Dental?",
    a: "We are at 215 Select Ave, Unit A4, Scarborough, ON M1X 0B5. The contact page has a map and directions.",
  },
  {
    group: "Insurance & payment",
    q: "Do you accept the Canadian Dental Care Plan?",
    a: "Let us know you are a CDCP member when you book. We will confirm how your coverage applies to your visit and tell you about any costs before treatment.",
  },
  {
    group: "Insurance & payment",
    q: "Can you bill my insurance directly?",
    a: "Ask our team when you book. We will confirm whether we can submit claims directly to your insurer and explain your share of the cost before treatment.",
  },
  {
    group: "Insurance & payment",
    q: "Will I know the cost before treatment?",
    a: "Yes. We explain recommended treatment and provide an estimate before anything is booked. For larger treatment, we can help you request a predetermination from your insurer.",
  },
  {
    group: "Care & treatment",
    q: "What should I do in a dental emergency?",
    a: "Call the clinic as soon as you can. If you have swelling that affects your breathing or swallowing, uncontrolled bleeding, or a serious injury, call 911 or go to the nearest emergency department.",
  },
  {
    group: "Care & treatment",
    q: "How often should I have a checkup?",
    a: "It depends on your oral health. Many people come every six months, while others need more or less frequent visits. Your dental team will recommend what suits you.",
  },
  {
    group: "Care & treatment",
    q: "I feel anxious about the dentist. Can you help?",
    a: "Absolutely. Tell us when you book. We will go at your pace, explain each step, agree on a signal to pause and discuss comfort options that may suit you.",
  },
];

export const homeFaqs = [faqs[0], faqs[1], faqs[4], faqs[6], faqs[7], faqs[9]];
