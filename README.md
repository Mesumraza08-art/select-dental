# Select Dental website

The complete website for Select Dental, 215 Select Ave Unit A4, Scarborough, ON M1X 0B5.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Framer Motion. Every page from the brief is included: home (with the "Open with a smile" logo intro), about, team and profiles, services and 14 treatment pages, emergency, new patients, insurance and payment, CDCP, booking, contact, FAQs, blog and articles, patient forms, careers, smile gallery, privacy, terms, accessibility, a custom 404 page, sitemap and robots.

Nothing about the clinic has been invented. Anything that still has to come from the clinic (phone, email, hours, team, photos, reviews and so on) is a clearly labelled placeholder. See the launch checklist below.

---

## Part 1: See the website on your own computer

You only need to do steps 1 to 3 once.

### Step 1. Install Node.js

1. Go to https://nodejs.org
2. Download the version marked **LTS** (version 20.9 or newer).
3. Run the installer and click Next through every screen. Keep all the default options.

### Step 2. Install VS Code (a free code editor)

1. Go to https://code.visualstudio.com and download it.
2. Install it with the default options.

### Step 3. Open the project

1. Unzip `select-dental.zip`. Put the `select-dental` folder somewhere easy, for example `C:\Work\select-dental`.
2. Open VS Code.
3. Click **File**, then **Open Folder**, and choose the `select-dental` folder.
4. Open a terminal inside VS Code: click **Terminal** in the top menu, then **New Terminal**. A panel opens at the bottom.

### Step 4. Install the project's packages

Type this in the terminal and press Enter:

```
npm install
```

It takes a minute or two. Warnings in yellow are normal. Wait until you can type again.

### Step 5. Start the website

```
npm run dev
```

When you see `Ready`, open your browser and go to **http://localhost:3000**

To stop the website, click in the terminal and press **Ctrl + C**.

Tip: the logo intro plays once per browser tab. To see it again, close the tab and open http://localhost:3000 in a new one.

---

## Part 2: Where to change things

You do not need to touch the page code for normal updates. All content lives in `src/content/`.

| What you want to change | File |
| --- | --- |
| Phone, email, hours, parking, transit, accessibility, social links, booking link, patient forms link | `src/content/site.ts` |
| Trust badges such as "New patients welcome" or "CDCP welcome" | `src/content/site.ts` (the `claims` section) |
| Services and their page text | `src/content/services.ts` |
| Team members | `src/content/team.ts` |
| FAQs | `src/content/faqs.ts` |
| Blog articles | `src/content/blog.ts` |
| Google reviews | `src/content/reviews.ts` |
| Before and after cases | `src/content/gallery.ts` |
| Social videos | `src/content/social.ts` |
| Job openings | `src/content/careers.ts` |
| "Why choose us" points and clinic principles | `src/content/values.ts` |
| Menu links | `src/content/nav.ts` |
| Colours and fonts | `src/app/globals.css` (top of the file) |

### Example: adding the phone number and hours

Open `src/content/site.ts` and change:

```ts
phone: null as null | { display: string; e164: string },
```

to:

```ts
phone: { display: "(416) 555-0100", e164: "+14165550100" } as null | { display: string; e164: string },
```

The phone number then appears automatically in the header, footer, mobile call button, contact page, emergency page and structured data for Google.

Hours work the same way:

```ts
hours: [
  { day: "Monday", open: "9:00 AM", close: "6:00 PM" },
  { day: "Tuesday", open: "9:00 AM", close: "6:00 PM" },
  { day: "Sunday", closed: true },
] as Hours[] | null,
```

### Turning on a trust badge

Each badge only shows on the live site once it is confirmed. In `site.ts`:

```ts
cdcp: { label: "CDCP welcome", confirmed: true },
```

### Adding photos

1. Put the photo in `public/media/` (for example `public/media/hero.jpg`).
2. Use large, sharp images: at least 2000px wide for wide shots, 1200px tall for portraits.
3. Team portraits go in `public/media/team/` and are linked from `team.ts`:

```ts
photo: { src: "/media/team/dr-name.jpg", alt: "Dr. Name smiling in a treatment room" },
```

Every image placeholder on the site shows a short description of the shot it needs.

---

## Part 3: Launch checklist

The site runs in **preview mode** until you switch it off. In preview mode, missing details show as dashed labels so you can see where everything goes. When preview mode is off, those gaps are hidden.

### Clinic details

- [ ] Phone number, email, opening hours
- [ ] Parking, nearest TTC routes, wheelchair access details
- [ ] Instagram and TikTok links, Google Business Profile link
- [ ] Cancellation policy and after-hours instructions
- [ ] Accepted payment methods and any payment plans
- [ ] Privacy officer contact (privacy policy page)

### Claims that must be confirmed before they show

- [ ] New patients welcome
- [ ] Family dentistry
- [ ] Direct billing (and with which insurers)
- [ ] CDCP: confirm the clinic is registered with Sun Life to see CDCP patients
- [ ] Remove any service in `services.ts` the clinic does not offer (for example sedation options, TMJ or sleep apnea care, implants, Invisalign)
- [ ] Invisalign: only keep the name if the clinic is an Invisalign provider
- [ ] Only list technology the clinic actually has (About page)

### Team

- [ ] Real names, roles, credentials, bios, languages and professional memberships, confirmed by each person
- [ ] Professional portraits

### Compliance reviews

- [ ] **RCDSO advertising rules**: have the clinic review testimonials, before and after photos and any "specialty" or "specialist" wording before publishing. The brief's "Specialty & comfort care" group was renamed "Comfort & advanced care" because only registered specialists may use specialty language in Ontario.
- [ ] A Select Dental dentist reviews every service page and blog article. Add their name to `reviewedBy` in `blog.ts`.
- [ ] A lawyer or privacy professional reviews the privacy policy, terms and accessibility pages.
- [ ] Before and after photos: written patient consent on file for every case.
- [ ] Reviews: copy genuine Google reviews exactly as written. Never write or edit reviews.

### Brand and media

- [ ] Ask the logo designer for the original vector logo. The current logo is a high quality trace of the supplied image and is fine for launch, but the original file is always best.
- [ ] Photography of the clinic and team
- [ ] Optional hero film and social videos (see Part 6)

### Technical

- [ ] Connect the booking form (Part 5)
- [ ] Add the secure patient forms portal link (Part 5)
- [ ] Add the Google Analytics ID (Part 4)
- [ ] Switch preview mode off and allow search engines (Part 4)

---

## Part 4: Put the website online (Hostinger)

The site is built as plain HTML, CSS and JavaScript (a "static export"), so it runs on any Hostinger plan, including basic shared hosting. No Node.js server is needed on Hostinger.

### How it works

1. Code is pushed to the `main` branch on GitHub.
2. A GitHub Action (`.github/workflows/hostinger.yml`) builds the site and puts the finished files on a branch called `hostinger`.
3. Hostinger pulls the `hostinger` branch into `public_html`.

`public/.htaccess` is included in the build. It forces HTTPS, serves the custom 404 page, adds security headers and sets caching.

### Step 1. Set the environment variables on GitHub

On GitHub open the repository, then **Settings**, **Secrets and variables**, **Actions**, the **Variables** tab, and add:

| Name | Preview / review | Launch day |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | your Hostinger address | `https://www.yourdomain.ca` |
| `NEXT_PUBLIC_PREVIEW_PLACEHOLDERS` | `true` | `false` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` | `true` |
| `NEXT_PUBLIC_GA_ID` | leave empty | your GA4 ID, for example `G-XXXXXXX` |
| `NEXT_PUBLIC_BOOKING_ENDPOINT` | leave empty | address from your booking system |

These values are baked in when the site is built. After changing one, open the **Actions** tab, choose **Build for Hostinger**, and click **Run workflow**.

To run the site on your own computer with these settings, copy `.env.example` to a new file called `.env.local` and fill it in.

### Step 2. Connect Hostinger to GitHub

1. Wait for the first **Build for Hostinger** run in the **Actions** tab to finish (green tick). This creates the `hostinger` branch.
2. In Hostinger hPanel open your website, then **Advanced**, then **Git**.
3. Repository: `https://github.com/Mesumraza08-art/select-dental.git`, Branch: `hostinger`, Install path: leave empty (deploys to `public_html`). `public_html` must be empty first.
4. If the repository is private, copy the SSH key Hostinger shows and add it on GitHub under **Settings**, **Deploy keys**.
5. Click **Create**, then **Deploy**.
6. For automatic updates, turn on **Auto deployment** in Hostinger and add the webhook URL it gives you on GitHub under **Settings**, **Webhooks** (content type `application/json`, event: push).

### Manual upload (alternative)

Run `npm run build` on your computer, then upload everything inside the `out` folder (including the hidden `.htaccess` file) to `public_html` with Hostinger's **File Manager** or FTP.

### Step 3. Add your domain

In hPanel, point the domain at this website and turn on the free SSL certificate under **Security**, **SSL**.

### Launch day

1. Set `NEXT_PUBLIC_PREVIEW_PLACEHOLDERS` to `false`.
2. Set `NEXT_PUBLIC_ALLOW_INDEXING` to `true`.
3. Run the **Build for Hostinger** workflow again (and deploy in Hostinger if auto deployment is off).
4. Submit `https://www.yourdomain.ca/sitemap.xml` in Google Search Console.

---

## Part 5: Connecting the clinic's systems

### Booking requests

The booking form sends a request, never a confirmed appointment. It never pretends a booking went through.

Option A, hosted booking page: if the practice software gives you an online booking link, paste it into `site.ts` under `booking.externalUrl`. Every "Book" button on the site will then go there.

Option B, keep the on-site form: set `NEXT_PUBLIC_BOOKING_ENDPOINT` to an address that accepts a JSON POST. Your developer or the booking provider sets this up. The form sends:

```json
{
  "type": "new | returning | emergency | treatment",
  "name": "...",
  "phone": "...",
  "email": "... or null",
  "service": "... or null",
  "times": ["Mornings", "Evenings"],
  "coverage": "insurance | cdcp | self | not-sure",
  "message": "... or null",
  "marketingConsent": false,
  "submittedAt": "ISO date",
  "source": "selectdental-website"
}
```

Until it is connected, the form tells visitors plainly that online requests are not connected yet and asks them to call.

### Patient forms

Health information is never collected by this website. Add the practice management system's secure intake portal address to `site.ts` under `patientForms.portalUrl`. The Patient Forms page then shows a "Start your secure forms" button.

### AI receptionist

A launcher for an after-hours assistant is built in at `src/components/system/ReceptionistSlot.tsx`. Connect your provider there (for example the Shapesoft AI Receptionist). It already shows a "no medical advice" note. Turn it off with `features.receptionist: false` in `site.ts`.

### Google Analytics 4

Add your measurement ID as `NEXT_PUBLIC_GA_ID`. Analytics loads only after a visitor accepts analytics cookies. These events are tracked: `book_click`, `phone_click`, `email_click`, `directions_click`, `instagram_click`, `tiktok_click`, `forms_click`, `emergency_call`, `emergency_request`, `map_load`, `booking_submit`.

---

## Part 6: Video and Higgsfield slots

The site works fully without video. When you have media, drop the files in `public/media/` and point to them in `site.ts` under `media`:

| Slot | Setting | Spec |
| --- | --- | --- |
| Intro film (optional, replaces the built-in logo animation) | `media.introVideo` | MP4, 2 to 3 seconds, white background, under 1.5 MB |
| Hero film | `media.heroVideo` (with a poster image) | MP4, 6 to 10 second seamless loop, no audio, under 4 MB |
| Hero photo (if no film) | `media.heroImage` | JPG, at least 2000px wide |
| Social videos | `src/content/social.ts` | MP4 1080x1920, under 8 MB each, plus a poster JPG |

Suggested Higgsfield prompts:

- **Hero loop:** "Bright, modern dental clinic in natural daylight. A dentist and a relaxed adult patient in easy conversation beside the chair, soft focus background, calm handheld camera drifting slowly, navy and light blue accents, no text, photorealistic, 6 seconds, seamless loop."
- **About page film:** "Slow walkthrough of a calm dental clinic reception and treatment room in morning light, clean surfaces, plants, no people's faces in close up, soft natural colour, no text."

Only use generated footage for mood and spaces. Never present it as real patients, real results or real staff.

---

## Opening animation and preview media

- The opening animation is the clinic's own film: `public/media/intro/select-dental-intro.mp4` (with a smaller `.webm` backup). Its settings are in `src/content/site.ts` under `media.introVideo`. Set `introVideo` to `null` to use the built-in drawn version instead.
- The photos in `public/media/img/` and short films in `public/media/video/` were generated with Higgsfield for the presentation. They are temporary: replace them with real Select Dental photography and video before launch. People shown are not Select Dental staff or patients.
- Which photo or film appears where is set in `src/content/media.ts`, `src/content/videos.ts` and `src/content/serviceMedia.ts`.

---

## Part 7: For developers

```
npm run dev          start the development server
npm run build        production build
npm run start        run the production build
npm run typecheck    TypeScript check
npm run lint:dashes  confirms there are no em or en dashes in the copy (house style)
```

### Structure

```
src/
  app/            pages (one folder per address) plus sitemap, robots, icon
  components/
    home/         homepage sections and the logo intro
    layout/       header, mega menu, mobile menu, mobile action bar, footer
    sections/     shared sections (CDCP, emergency, location, booking CTA, reviews)
    services/     service navigator and cards
    booking/      booking request form
    system/       cookie consent, analytics, AI receptionist slot
    ui/           buttons, media frames, placeholders, accordion, breadcrumbs
    brand/        logo and smile mark
  content/        all editable content
  lib/            SEO metadata and structured data helpers
public/
  brand/          logo files (navy, white, smile only)
  media/          photos and videos go here
  og.png          image shown when the site is shared on social media
```

### Design notes

- Colours are sampled from the logo: navy `#1B396B`, smile blue `#6EC1EC`.
- Type: Manrope for headings, Inter for body text.
- Motion is deliberately limited: the logo intro, the hero smile line, a few large image reveals and the service panel crossfade. Everything respects "reduce motion" settings.
- The logo intro plays once per browser session on the homepage only. If the page loads slowly it is skipped so nobody waits, and it can be skipped with any key, click or scroll.
- Search engines are blocked until `NEXT_PUBLIC_ALLOW_INDEXING=true`.

### Accessibility

Built to WCAG 2.2 AA: keyboard access everywhere, visible focus, a skip link, labelled form fields with clear errors, touch targets of at least 44px, and reduced motion support. Add captions to any video with speech. Test again after adding real content and images (check alt text and colour contrast of any new graphics).

### Information sources

CDCP details reflect the Government of Canada program as of October 2026: https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html. Check this page before launch, since program details can change.
