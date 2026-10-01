export const mainNav = [
  { label: "About", href: "/about" },
  { label: "Meet the team", href: "/team" },
  { label: "Services", href: "/services", mega: true },
  { label: "New patients", href: "/new-patients" },
  { label: "CDCP", href: "/cdcp" },
  { label: "Smile gallery", href: "/smile-gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  clinic: [
    { label: "About", href: "/about" },
    { label: "Meet the team", href: "/team" },
    { label: "Smile gallery", href: "/smile-gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  patients: [
    { label: "Book an appointment", href: "/book-appointment" },
    { label: "New patients", href: "/new-patients" },
    { label: "Patient forms", href: "/patient-forms" },
    { label: "Insurance & payment", href: "/insurance-payment" },
    { label: "CDCP", href: "/cdcp" },
    { label: "Emergency dentist", href: "/emergency-dentist" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-use" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
