/**
 * Service content. Written conservatively for patient education.
 * Have a Select Dental dentist review every page before launch, and remove
 * any service the clinic does not offer.
 */

export type CategoryKey = "general" | "restorative" | "cosmetic" | "orthodontics" | "comfort";

export type Category = {
  key: CategoryKey;
  name: string;
  blurb: string;
  /** Art direction for the photo or film that will fill this slot */
  shot: string;
};

export type Service = {
  slug: string;
  name: string;
  category: CategoryKey;
  summary: string;
  intro: string;
  what: string[];
  whoMayBenefit: string[];
  expect: string[];
  process: { title: string; text: string }[];
  considerations: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  shot: string;
  footnote?: string;
};

/*
 * Note on naming: in Ontario only registered specialists may describe themselves
 * as specialists. The brief's "Specialty & comfort care" group is labelled
 * "Comfort & advanced care" so it cannot be read as a specialist claim.
 * Change the label here if the clinic's compliance review approves otherwise.
 */
export const categories: Category[] = [
  {
    key: "general",
    name: "General dentistry",
    blurb:
      "Everyday care that keeps your mouth healthy, from routine checkups and cleanings to gentle visits for children and care for your gums.",
    shot: "Hygienist and patient in relaxed conversation, natural daylight",
  },
  {
    key: "restorative",
    name: "Restorative dentistry",
    blurb:
      "Treatment that repairs, rebuilds or replaces teeth so you can eat, speak and smile comfortably again.",
    shot: "Dentist talking a patient through an x-ray on screen",
  },
  {
    key: "cosmetic",
    name: "Cosmetic dentistry",
    blurb: "Considered changes to the colour and shape of your teeth, planned around what looks natural on you.",
    shot: "Soft, close portrait of a natural smile, no heavy retouching",
  },
  {
    key: "orthodontics",
    name: "Orthodontics",
    blurb: "Straightening options for teens and adults, from clear aligners to traditional braces.",
    shot: "Clear aligner case on a clean counter, shallow depth of field",
  },
  {
    key: "comfort",
    name: "Comfort & advanced care",
    blurb: "Support for nervous patients, jaw discomfort, grinding, snoring and sleep-related breathing concerns.",
    shot: "Calm treatment room, folded blanket on the chair, soft side light",
  },
];

export const services: Service[] = [
  {
    slug: "checkups-cleanings",
    name: "Checkups & cleanings",
    category: "general",
    summary: "A careful exam and professional cleaning to catch small issues early and keep your gums healthy.",
    intro:
      "Regular checkups are the foundation of a healthy mouth. Each visit combines a careful examination with a professional cleaning, and time to talk through anything you have noticed.",
    what: [
      "A checkup is a full look at your teeth, gums, bite and the soft tissues of your mouth. Your dentist checks for early signs of decay, gum disease, worn or cracked teeth and other changes, and may recommend x-rays when they are needed to see between teeth or below the gumline.",
      "A professional cleaning removes hardened plaque, called tartar, that brushing and flossing at home cannot. Your teeth are then polished, and your hygienist can share brushing and flossing tips suited to your mouth.",
    ],
    whoMayBenefit: [
      "Adults and children who want to keep their teeth and gums healthy",
      "Anyone who has not had a checkup in a while",
      "Patients with sensitivity, bleeding gums or a change they would like looked at",
      "People whose general health can affect their mouth, such as during pregnancy or with diabetes",
    ],
    expect: [
      "We review your health history, examine your mouth, clean and polish your teeth, then explain what we found in plain language. If treatment is recommended, you receive a clear plan and estimate before anything is booked. The length of the visit depends on what you need.",
    ],
    process: [
      { title: "Health history", text: "We review your medical history, medications and any concerns you bring." },
      { title: "Examination", text: "Your dentist checks teeth, gums, bite and soft tissues, with x-rays only when needed." },
      { title: "Cleaning", text: "Tartar is removed, teeth are polished and home care tips are shared." },
      { title: "Your plan", text: "We explain the findings and recommend when to come back." },
    ],
    considerations: [
      "How often you need a checkup depends on your individual risk. Some patients benefit from more frequent visits.",
      "Let us know about medical changes or new medications, as they can affect oral health.",
      "Mild tenderness after a more thorough cleaning is normal and usually settles quickly.",
    ],
    faqs: [
      {
        q: "How often should I have a checkup and cleaning?",
        a: "It depends on your oral health. Many people come every six months, while others need more or less frequent visits. Your dental team will recommend an interval that suits you.",
      },
      {
        q: "Do I need x-rays at every visit?",
        a: "No. X-rays are taken based on your individual needs and history, not on a fixed routine.",
      },
    ],
    related: ["fillings", "gum-treatment", "childrens-dentistry"],
    shot: "Hygienist explaining a cleaning to a relaxed patient",
  },
  {
    slug: "fillings",
    name: "Fillings",
    category: "general",
    summary: "Repairs for cavities and small chips, usually in a tooth-coloured material that blends in.",
    intro:
      "When decay or a small fracture damages a tooth, a filling restores its shape and strength and helps stop the problem from spreading.",
    what: [
      "A filling replaces the part of a tooth lost to decay or damage. The affected area is gently removed, the tooth is cleaned, and the space is filled and shaped to match your bite.",
      "Most fillings today use tooth-coloured composite resin, which bonds to the tooth and can be matched to its natural shade. Your dentist will discuss the right material for the size and position of the repair.",
    ],
    whoMayBenefit: [
      "Teeth with cavities found at a checkup or on an x-ray",
      "Small chips or cracks",
      "Worn or failing older fillings",
      "Sensitivity caused by exposed areas of a tooth",
    ],
    expect: [
      "The area is numbed with local anesthetic so you stay comfortable, and most fillings are completed in a single visit. Your lip and cheek may feel numb for a few hours afterwards, so take care with hot drinks and chewing until feeling returns.",
    ],
    process: [
      { title: "Numbing", text: "Local anesthetic keeps the tooth comfortable throughout." },
      { title: "Preparing", text: "Decay or damaged tooth structure is gently removed and the tooth is cleaned." },
      { title: "Filling", text: "The material is placed in layers and shaped to the natural form of the tooth." },
      { title: "Checking your bite", text: "We adjust and polish until your bite feels right." },
    ],
    considerations: [
      "Some sensitivity to cold or pressure for a few days is common.",
      "Very large cavities may need a crown or other treatment to protect the tooth.",
      "Small cavities are simpler to treat, which is one reason regular checkups matter.",
    ],
    faqs: [
      {
        q: "Does getting a filling hurt?",
        a: "The tooth is numbed before treatment, so most people feel pressure rather than pain. Tell your dentist at any point if you feel discomfort.",
      },
      {
        q: "How long do fillings last?",
        a: "It varies with the size of the filling, the material, your bite and your home care. Your dentist checks your fillings at each visit.",
      },
    ],
    related: ["checkups-cleanings", "crowns-bridges", "root-canals"],
    shot: "Close detail of a dentist's gloved hands and a shade guide",
  },
  {
    slug: "childrens-dentistry",
    name: "Children's dentistry",
    category: "general",
    summary: "Gentle, unhurried visits that help children feel at ease and build healthy habits early.",
    intro:
      "A positive start makes a lifelong difference. We keep visits for children calm, friendly and paced to how they feel on the day.",
    what: [
      "Children's dentistry covers checkups, cleanings and preventive care for babies, children and teens. Visits focus on catching problems early, protecting growing teeth and helping children become comfortable in the dental chair.",
      "Preventive options may include fluoride varnish, which helps strengthen enamel, and sealants, a thin protective coating on the chewing surfaces of back teeth where cavities often start.",
    ],
    whoMayBenefit: [
      "Babies, ideally within six months of their first tooth or by their first birthday",
      "Children due for a regular checkup",
      "Kids who feel nervous about the dentist",
      "Teens with questions about crooked teeth or wisdom teeth",
    ],
    expect: [
      "First visits are short and relaxed. We let your child see the chair and tools, count their teeth together and keep things positive. We will talk with you beforehand about how your child is feeling and where you would like to be during the visit, and share practical tips on brushing, snacks and habits such as thumb sucking.",
    ],
    process: [
      { title: "Say hello", text: "A short, friendly introduction to the chair and the tools." },
      { title: "Gentle exam", text: "We check teeth, gums and jaw growth at your child's pace." },
      { title: "Clean and protect", text: "A light cleaning, with fluoride or sealants if recommended." },
      { title: "Tips for home", text: "Practical advice for brushing, flossing and snacks." },
    ],
    considerations: [
      "Baby teeth matter. They help with eating and speech and hold space for adult teeth.",
      "Some children need a few short visits to feel comfortable, and that is completely fine.",
      "Children with complex needs may be referred to a pediatric dental specialist.",
    ],
    faqs: [
      {
        q: "When should my child first see a dentist?",
        a: "The Canadian Dental Association recommends a first dental assessment within six months of the first tooth appearing, or by age one.",
      },
      {
        q: "Can children be covered by the Canadian Dental Care Plan?",
        a: "Children under 18 can qualify if their family meets the program's eligibility criteria. Our CDCP page has an overview and a link to official Government of Canada information.",
      },
    ],
    related: ["checkups-cleanings", "fillings", "invisalign-braces"],
    shot: "Child in the chair laughing with a team member, parent nearby",
  },
  {
    slug: "gum-treatment",
    name: "Gum treatment",
    category: "general",
    summary: "Care for bleeding, swollen or receding gums, from early gingivitis to ongoing periodontal maintenance.",
    intro:
      "Healthy gums hold your teeth in place. When they become inflamed or infected, early treatment can make a real difference.",
    what: [
      "Gum disease begins as gingivitis, an inflammation of the gums usually caused by plaque build-up. Gums may look red, feel tender or bleed when you brush. At this stage it is usually reversible with professional cleaning and good home care.",
      "If it progresses to periodontitis, the gums and supporting bone can be affected and teeth may loosen over time. Treatment may include deep cleaning below the gumline, known as scaling and root planing, followed by regular maintenance visits.",
    ],
    whoMayBenefit: [
      "Gums that bleed when brushing or flossing",
      "Persistent bad breath or a bad taste",
      "Gums that look swollen or seem to be pulling away from the teeth",
      "Teeth that feel loose or have shifted",
    ],
    expect: [
      "We start by measuring the space between your gums and teeth to understand how healthy they are. Deep cleaning is often done with local anesthetic, sometimes over more than one visit. We then suggest a maintenance schedule that suits your gums.",
    ],
    process: [
      { title: "Assessment", text: "Gum measurements, and x-rays if needed, show how your gums are doing." },
      { title: "Deep cleaning", text: "Tartar and bacteria are removed from below the gumline." },
      { title: "Re-evaluation", text: "We check how your gums have responded after healing." },
      { title: "Maintenance", text: "Regular visits help keep gum health stable over time." },
    ],
    considerations: [
      "Smoking, diabetes and some medications can affect gum health.",
      "Advanced cases may be referred to a periodontist, a gum specialist.",
      "Results depend heavily on daily home care between visits.",
    ],
    faqs: [
      {
        q: "Is it normal for my gums to bleed when I floss?",
        a: "Bleeding is a common sign of gum inflammation and worth having checked. It often improves with professional cleaning and consistent flossing.",
      },
      {
        q: "Can gum disease be cured?",
        a: "Gingivitis can usually be reversed. Periodontitis can be managed and stabilized with treatment and maintenance, although bone that has been lost does not typically grow back on its own.",
      },
    ],
    related: ["checkups-cleanings", "dental-implants", "dentures"],
    shot: "Hygienist gently explaining gum health with a hand mirror",
  },
  {
    slug: "crowns-bridges",
    name: "Crowns & bridges",
    category: "restorative",
    summary: "Custom restorations that strengthen damaged teeth or fill the gap left by a missing tooth.",
    intro:
      "Crowns protect teeth that have been weakened, and bridges replace missing teeth by anchoring to the teeth beside the gap.",
    what: [
      "A crown is a custom cap that covers a tooth completely, restoring its shape and strength. Crowns are often recommended for teeth with large fillings, cracks, or for back teeth after root canal treatment.",
      "A bridge replaces one or more missing teeth. It is made of a replacement tooth held in place by crowns on the neighbouring teeth, or in some cases supported by dental implants.",
    ],
    whoMayBenefit: [
      "Teeth with large or failing fillings",
      "Cracked or heavily worn teeth",
      "Back teeth after root canal treatment",
      "A missing tooth with healthy teeth on either side",
    ],
    expect: [
      "Treatment usually takes two visits. At the first, the tooth is shaped, an impression or digital scan is taken and a temporary crown is placed. At the second, the permanent crown or bridge is checked for fit and colour, then cemented in place.",
    ],
    process: [
      { title: "Assessment", text: "We confirm a crown or bridge is the right option and discuss alternatives." },
      { title: "Preparation", text: "The tooth is shaped and an impression or scan is taken." },
      { title: "Temporary", text: "A temporary restoration protects the tooth while yours is made." },
      { title: "Fitting", text: "Your final crown or bridge is checked, adjusted and cemented." },
    ],
    considerations: [
      "Preparing a tooth for a crown removes some natural tooth structure.",
      "Bridges need extra care to clean underneath, and your hygienist will show you how.",
      "Your dentist will compare a bridge with options such as an implant or a partial denture.",
    ],
    faqs: [
      {
        q: "How long does a crown last?",
        a: "Many crowns last for years with good care, but lifespan depends on the material, your bite, habits such as grinding, and home care.",
      },
      {
        q: "Will my crown look natural?",
        a: "Crowns can be made in tooth-coloured materials and matched to the shade of the teeth around them.",
      },
    ],
    related: ["root-canals", "dental-implants", "fillings"],
    shot: "Dentist matching a crown shade against a patient's teeth",
  },
  {
    slug: "root-canals",
    name: "Root canals",
    category: "restorative",
    summary: "Treatment that relieves pain from an infected or inflamed tooth and lets you keep it.",
    intro:
      "Root canal treatment has a reputation it no longer deserves. With modern techniques and good anesthetic, many patients find it feels much like having a filling, and it can save a tooth that would otherwise be lost.",
    what: [
      "Inside each tooth is soft tissue called the pulp, which contains nerves and blood vessels. Deep decay, a crack or an injury can cause the pulp to become inflamed or infected, which may lead to pain, swelling or an abscess.",
      "During a root canal, the damaged pulp is removed, the inside of the tooth is cleaned and shaped, and the canals are filled and sealed. Back teeth usually need a crown afterwards for protection.",
    ],
    whoMayBenefit: [
      "Lingering sensitivity to hot or cold",
      "Severe toothache, especially when biting",
      "Swelling or a pimple-like bump on the gum",
      "A tooth that has darkened after an injury",
    ],
    expect: [
      "The tooth is numbed and isolated with a small protective sheet. Treatment may be completed in one or two visits depending on the tooth. Some tenderness for a few days afterwards is common, and your dentist will advise you on pain relief.",
    ],
    process: [
      { title: "Diagnosis", text: "An exam and x-ray confirm what is happening inside the tooth." },
      { title: "Cleaning", text: "The inflamed or infected pulp is removed and the canals are cleaned." },
      { title: "Sealing", text: "The canals are filled and sealed to keep bacteria out." },
      { title: "Protecting", text: "A filling or crown restores the tooth for everyday use." },
    ],
    considerations: [
      "Complex cases may be referred to an endodontist, a root canal specialist.",
      "Delaying treatment can allow an infection to spread.",
      "The alternative is usually removing the tooth, which leaves a gap to consider replacing.",
    ],
    faqs: [
      {
        q: "Is a root canal painful?",
        a: "The tooth is numbed first, and many patients find it feels much like having a filling. Treatment often relieves the pain the infection was causing.",
      },
      {
        q: "Why do I need a crown after a root canal?",
        a: "Treated back teeth can become more brittle, and a crown helps protect them from cracking under biting forces.",
      },
    ],
    related: ["crowns-bridges", "extractions-wisdom-teeth", "fillings"],
    shot: "Dentist reviewing a dental x-ray with a calm patient",
  },
  {
    slug: "dentures",
    name: "Dentures",
    category: "restorative",
    summary: "Complete and partial dentures made to fit comfortably and look natural.",
    intro: "Dentures replace missing teeth and the surrounding gum, helping you chew, speak and smile with more confidence.",
    what: [
      "Complete dentures replace all the teeth in the upper or lower jaw. Partial dentures replace some teeth and clip securely onto the natural teeth that remain.",
      "In some cases dentures can be secured to dental implants for added stability. Your dentist will talk you through which type suits your mouth, your budget and your goals.",
    ],
    whoMayBenefit: [
      "People missing several or all of their teeth",
      "Denture wearers whose current dentures feel loose or worn",
      "Patients looking for a removable way to replace missing teeth",
    ],
    expect: [
      "Making dentures takes several appointments, including impressions, bite records and a try-in so you can see and approve how they look before they are finished. Expect an adjustment period while you get used to eating and speaking with them. Follow-up visits fine-tune the fit.",
    ],
    process: [
      { title: "Consultation", text: "We look at your mouth and discuss complete, partial and implant-supported options." },
      { title: "Impressions", text: "Precise impressions and bite records guide the design." },
      { title: "Try-in", text: "You preview the look and fit before your dentures are finished." },
      { title: "Fitting and follow-up", text: "We fit your dentures and adjust any sore spots." },
    ],
    considerations: [
      "Your jaw changes shape over time, so dentures may need relining or replacing.",
      "New dentures can cause sore spots at first, which adjustments can relieve.",
      "Clean dentures daily and follow your dental team's advice on overnight care.",
    ],
    faqs: [
      {
        q: "How long does it take to get used to dentures?",
        a: "It varies from person to person. Many people adapt over several weeks, and follow-up adjustments help along the way.",
      },
      {
        q: "Can I eat normally with dentures?",
        a: "Most people return to a varied diet. Starting with softer foods cut into small pieces makes the adjustment easier.",
      },
    ],
    related: ["dental-implants", "crowns-bridges", "extractions-wisdom-teeth"],
    shot: "Older patient smiling in conversation with the dentist",
  },
  {
    slug: "dental-implants",
    name: "Dental implants",
    category: "restorative",
    summary: "A long-term way to replace missing teeth, planned carefully around your bone and gum health.",
    intro:
      "A dental implant replaces the root of a missing tooth and provides a stable base for a crown, bridge or denture that looks and functions much like a natural tooth.",
    what: [
      "An implant is a small post, usually made of titanium, placed in the jawbone where a tooth is missing. Over several months the bone heals around it, a process called osseointegration. Once it is secure, a crown, bridge or denture is attached.",
      "Because implants are anchored in bone, they do not rely on neighbouring teeth for support, and they can help maintain the jawbone in that area.",
    ],
    whoMayBenefit: [
      "People missing one or more teeth",
      "Denture wearers who want a more stable fit",
      "Adults in good general health with enough bone to support an implant, or who are suitable for bone grafting",
    ],
    expect: [
      "Implant treatment begins with a detailed assessment, which may include x-rays and, where needed, 3D imaging arranged by your dentist. Placement is done with local anesthetic. Healing typically takes a few months before the final tooth is attached, and your dentist will give you a timeline specific to your case.",
    ],
    process: [
      { title: "Assessment and planning", text: "Your health, gums and bone are reviewed and a treatment plan is prepared." },
      { title: "Placement", text: "The implant is placed in the jawbone under local anesthetic." },
      { title: "Healing", text: "The bone bonds with the implant over the following months." },
      { title: "Restoration", text: "Your custom crown, bridge or denture is attached." },
    ],
    considerations: [
      "Implants need enough healthy bone, and some patients need a bone graft first.",
      "Smoking and some medical conditions can affect healing and long-term success.",
      "Implant treatment involves surgery and takes several months from start to finish.",
      "Some steps may be completed with, or referred to, a dental specialist.",
    ],
    faqs: [
      {
        q: "Am I a candidate for dental implants?",
        a: "Most adults in good general health can be assessed. Your dentist will review your medical history, gums and bone before recommending implants.",
      },
      {
        q: "How long do implants last?",
        a: "With good home care and regular checkups, implants can last many years. The crown on top may need replacing over time.",
      },
    ],
    related: ["crowns-bridges", "dentures", "extractions-wisdom-teeth"],
    shot: "Dentist walking a patient through an implant model",
  },
  {
    slug: "extractions-wisdom-teeth",
    name: "Extractions & wisdom teeth",
    category: "restorative",
    summary: "Careful removal of teeth that cannot be saved, including wisdom teeth that are causing problems.",
    intro:
      "Saving a natural tooth is always the first goal. When that is not possible, or when wisdom teeth are causing trouble, a careful extraction protects your oral health.",
    what: [
      "An extraction is the removal of a tooth. It may be recommended for a tooth that is badly decayed, broken, loose because of gum disease, or crowding other teeth.",
      "Wisdom teeth are the last molars to come in, usually in the late teens or early twenties. When there is not enough room they can become impacted, partly erupted or angled, which may lead to pain, infection or damage to nearby teeth.",
    ],
    whoMayBenefit: [
      "Teeth that are too damaged to repair",
      "Wisdom teeth causing pain, swelling or repeated infection",
      "Crowding before orthodontic treatment",
      "Baby teeth that have not fallen out on their own",
    ],
    expect: [
      "The area is numbed before treatment. Straightforward extractions are often quick, while surgical extractions take a little longer. You go home with clear aftercare instructions covering bleeding, swelling, eating and pain relief.",
    ],
    process: [
      { title: "Assessment", text: "An exam and x-ray show the tooth's position and roots." },
      { title: "Comfort", text: "Local anesthetic, with sedation discussed if suitable." },
      { title: "Removal", text: "The tooth is removed as gently as possible." },
      { title: "Aftercare", text: "You receive instructions and a follow-up if needed." },
    ],
    considerations: [
      "Follow aftercare advice closely to lower the risk of complications such as dry socket.",
      "Avoid smoking and drinking through a straw while the area heals.",
      "Complex wisdom teeth may be referred to an oral surgeon.",
      "Your dentist will discuss whether and how to replace a removed tooth.",
    ],
    faqs: [
      {
        q: "Do all wisdom teeth need to be removed?",
        a: "No. Wisdom teeth that are healthy, fully erupted and easy to clean can often stay. Your dentist will monitor them with exams and x-rays.",
      },
      {
        q: "How long is recovery?",
        a: "Many people feel better within a few days, although full healing takes longer. Your dentist will explain what to expect for your extraction.",
      },
    ],
    related: ["dental-implants", "sedation-dentistry", "root-canals"],
    shot: "Calm consultation in a bright treatment room before a procedure",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth whitening",
    category: "cosmetic",
    summary: "Professionally supervised whitening for a brighter smile that still looks like you.",
    intro:
      "Coffee, tea, red wine and time all leave their mark. Professional whitening lightens natural tooth colour safely, with honest guidance on the result to expect.",
    what: [
      "Whitening uses a peroxide-based gel to break down stains within the enamel. Professionally supervised options can include in-office whitening or custom trays worn at home with a gel provided by the clinic.",
      "Before whitening, your dentist checks that your teeth and gums are healthy and explains how your natural shade, existing fillings or crowns may affect the result.",
    ],
    whoMayBenefit: [
      "Yellowing or staining from food, drink or tobacco",
      "Adults with healthy teeth and gums",
      "Anyone who would like a refresh before an important event",
    ],
    expect: [
      "We start with an exam and a shade check, then explain the whitening options available so you can choose what suits your routine. Results build over the treatment period, and we will tell you how to look after them.",
    ],
    process: [
      { title: "Exam and shade check", text: "We confirm your teeth and gums are healthy and record your starting shade." },
      { title: "Choosing an approach", text: "In-office or take-home, based on your goals and routine." },
      { title: "Whitening", text: "Treatment is carried out or supervised as planned." },
      { title: "Keeping it bright", text: "Simple habits and occasional touch-ups help results last." },
    ],
    considerations: [
      "Whitening does not change the colour of crowns, veneers or fillings.",
      "Temporary sensitivity is common and usually settles after treatment.",
      "Results fade gradually and can be refreshed.",
      "Whitening is usually postponed during pregnancy and may not suit very sensitive teeth.",
    ],
    faqs: [
      {
        q: "Is professional whitening safe?",
        a: "When supervised by a dental professional after an exam, whitening is considered safe for most adults. Your dentist will check that it suits you first.",
      },
      {
        q: "How long do results last?",
        a: "It varies with diet and habits. Limiting heavily staining foods and drinks and keeping up with cleanings helps results last longer.",
      },
    ],
    related: ["veneers", "checkups-cleanings", "invisalign-braces"],
    shot: "Natural smile in soft window light, true-to-life colour",
  },
  {
    slug: "veneers",
    name: "Veneers",
    category: "cosmetic",
    summary: "Thin, custom-made shells that refine the shape, colour and alignment of front teeth.",
    intro:
      "Veneers can change the look of chipped, worn, discoloured or uneven front teeth. They are planned around your face and features so the result looks natural rather than overdone.",
    what: [
      "A veneer is a thin layer of porcelain or composite resin bonded to the front surface of a tooth. Porcelain veneers are made in a dental laboratory, while composite veneers can often be built up directly in the chair.",
      "Porcelain veneers usually require removing a small amount of enamel so they sit naturally, which means the treatment cannot be reversed.",
    ],
    whoMayBenefit: [
      "Chipped, worn or uneven front teeth",
      "Discolouration that does not respond to whitening",
      "Small gaps between teeth",
      "Patients with healthy teeth and gums",
    ],
    expect: [
      "Veneer treatment starts with a conversation about what you would like to change, followed by photographs, scans and a plan. You may be able to preview the planned shape before treatment begins. Porcelain veneers usually take two or more visits.",
    ],
    process: [
      { title: "Consultation", text: "We talk about your goals and check that your teeth and gums are healthy." },
      { title: "Planning", text: "Photos and scans guide the shape, length and shade." },
      { title: "Preparation", text: "Teeth are prepared as needed and temporaries may be placed." },
      { title: "Bonding", text: "Your veneers are fitted, bonded and polished." },
    ],
    considerations: [
      "Porcelain veneers involve permanently altering the tooth surface.",
      "Veneers can chip, and habits such as nail biting or grinding increase that risk.",
      "Whitening, bonding or orthodontics may be simpler alternatives for some smiles.",
    ],
    faqs: [
      {
        q: "Do veneers look natural?",
        a: "Well-planned veneers are designed around your face, skin tone and other teeth, so they read as a natural part of your smile.",
      },
      {
        q: "How long do veneers last?",
        a: "Lifespan varies with the material and your habits. Your dentist will explain what to expect for the type chosen.",
      },
    ],
    related: ["teeth-whitening", "crowns-bridges", "invisalign-braces"],
    shot: "Dentist and patient reviewing smile photos together",
  },
  {
    slug: "invisalign-braces",
    name: "Invisalign & braces",
    category: "orthodontics",
    summary: "Straightening options for teens and adults, from clear aligners to traditional braces.",
    intro:
      "Straighter teeth can be easier to clean and more comfortable to bite with. We will help you understand which approach fits your teeth, your routine and your goals.",
    what: [
      "Invisalign is a system of clear, removable aligners. Each set moves the teeth gradually, and you switch to a new set on a regular schedule. Aligners need to be worn most of the day, typically 20 to 22 hours, and removed for eating and brushing.",
      "Braces use brackets and wires fixed to the teeth to guide them into position over time. They work continuously and suit a wide range of cases, including some that are more complex.",
    ],
    whoMayBenefit: [
      "Crowded or crooked teeth",
      "Gaps between teeth",
      "Bite concerns such as an overbite, underbite or crossbite",
      "Adults whose teeth have shifted after earlier orthodontic treatment",
    ],
    expect: [
      "Your first step is a consultation with an exam, photographs and x-rays or scans. We explain the options suited to your case, the expected length of treatment and the commitment involved. After treatment, retainers help keep teeth in their new position.",
    ],
    process: [
      { title: "Consultation", text: "An exam, photos and scans show what is possible." },
      { title: "Your plan", text: "We compare aligners and braces for your case and timeline." },
      { title: "Treatment", text: "Regular check-ins keep progress on track." },
      { title: "Retention", text: "Retainers protect your result for the long term." },
    ],
    considerations: [
      "Aligners only work when worn as directed.",
      "Treatment length varies with the complexity of the case.",
      "Retainers are needed long term to stop teeth from shifting back.",
      "Some complex cases are best treated by an orthodontist, a specialist we can refer you to.",
    ],
    faqs: [
      {
        q: "Which is better, Invisalign or braces?",
        a: "Neither is better for everyone. The right choice depends on your teeth, your bite and how consistently you can wear aligners. Your dentist will explain the trade-offs for your case.",
      },
      {
        q: "Am I too old for orthodontic treatment?",
        a: "Adults of any age with healthy teeth and gums can often be treated.",
      },
    ],
    related: ["teeth-whitening", "veneers", "childrens-dentistry"],
    shot: "Patient holding a clear aligner, candid and natural",
    footnote: "Invisalign is a trademark of Align Technology, Inc.",
  },
  {
    slug: "sedation-dentistry",
    name: "Sedation dentistry",
    category: "comfort",
    summary: "Options that help anxious patients feel calmer and more relaxed during treatment.",
    intro:
      "Feeling nervous about the dentist is common, and never something to be embarrassed about. We take time to understand what worries you and talk through ways to make treatment easier.",
    what: [
      "Sedation dentistry uses medication to help you feel relaxed during treatment. Depending on what is suitable and available, options can range from inhaled nitrous oxide, often called laughing gas, to oral sedation taken before your appointment.",
      "Sedation is always planned around your medical history, your current medications and the treatment you need. Your dentist will explain the options offered at Select Dental and whether they are appropriate for you.",
    ],
    whoMayBenefit: [
      "Patients with dental anxiety or fear",
      "People with a strong gag reflex",
      "Longer or more involved treatments",
      "Patients who find it hard to sit still for long periods",
    ],
    expect: [
      "We start with a conversation about your concerns and a review of your health history. If sedation is suitable, you receive clear instructions on eating, drinking and medications before your visit. With some types of sedation you will need someone to take you home.",
    ],
    process: [
      { title: "Conversation", text: "Tell us what worries you, at your own pace." },
      { title: "Health review", text: "We check your history and medications to find a safe option." },
      { title: "Treatment", text: "Your comfort is monitored throughout the visit." },
      { title: "Recovery", text: "You rest until you are ready, then head home with support if needed." },
    ],
    considerations: [
      "Not every patient is suitable for every type of sedation.",
      "Follow your pre-visit instructions exactly, for your safety.",
      "Plan for a responsible adult to accompany you home when advised.",
      "Non-medication approaches, such as breaks and a signal to pause, help many people too.",
    ],
    faqs: [
      {
        q: "Will I be asleep?",
        a: "Most dental sedation keeps you relaxed but awake and able to respond. Your dentist will explain exactly what to expect with the option recommended for you.",
      },
      {
        q: "Is sedation safe?",
        a: "Sedation is planned around your health history and monitored during treatment. Your dentist will discuss the risks and benefits with you before you decide.",
      },
    ],
    related: ["extractions-wisdom-teeth", "dental-implants", "root-canals"],
    shot: "Patient resting comfortably, team member reassuring them",
  },
  {
    slug: "tmj-sleep-apnea",
    name: "TMJ & sleep apnea",
    category: "comfort",
    summary: "Assessment and oral appliance options for jaw discomfort, grinding, snoring and sleep apnea.",
    intro:
      "Jaw pain, morning headaches, worn teeth and loud snoring can all have links to the mouth. A dental assessment is a sensible place to start.",
    what: [
      "The temporomandibular joints, or TMJ, connect your lower jaw to your skull. Problems in these joints and the muscles around them can cause jaw pain, clicking, limited opening or headaches. Clenching and grinding, often during sleep, can contribute and wear down teeth.",
      "Obstructive sleep apnea is a condition in which the airway repeatedly narrows or closes during sleep. It is diagnosed by a physician, usually after a sleep study. For some patients, a custom oral appliance made by a dentist, which holds the lower jaw slightly forward, can help keep the airway open.",
    ],
    whoMayBenefit: [
      "Jaw pain, clicking or difficulty opening",
      "Morning headaches or tired jaw muscles",
      "Worn, chipped or flattened teeth from grinding",
      "Snoring, or a sleep apnea diagnosis from your physician",
    ],
    expect: [
      "We ask about your symptoms, examine your jaw joints, muscles and bite, and look for signs of grinding. Depending on the findings, options may include a custom night guard, an oral appliance for sleep apnea in coordination with your physician, or a referral for further care.",
    ],
    process: [
      { title: "Assessment", text: "A careful look at your jaw, muscles, bite and teeth." },
      { title: "Coordination", text: "For sleep apnea, we work alongside your physician or sleep clinic." },
      { title: "Custom appliance", text: "A night guard or oral appliance is made to fit you." },
      { title: "Follow-up", text: "We check comfort and fine-tune the fit." },
    ],
    considerations: [
      "Sleep apnea must be diagnosed by a physician. A dentist cannot diagnose it.",
      "Oral appliances are not suitable for everyone and may need adjustment.",
      "Jaw problems can have several causes, and some need care from other health professionals.",
    ],
    faqs: [
      {
        q: "Can a dentist help with snoring?",
        a: "A dentist can assess your mouth and, where appropriate and in coordination with your physician, make a custom oral appliance. Snoring can be a sign of sleep apnea, so a medical assessment matters.",
      },
      {
        q: "What is a night guard?",
        a: "A custom-fitted appliance worn during sleep that protects teeth from grinding and can ease strain on the jaw.",
      },
    ],
    related: ["checkups-cleanings", "sedation-dentistry", "crowns-bridges"],
    shot: "Dentist gently assessing a patient's jaw movement",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesIn = (key: CategoryKey) => services.filter((s) => s.category === key);
export const categoryByKey = (key: CategoryKey) => categories.find((c) => c.key === key)!;
