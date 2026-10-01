"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";

type Kind = "new" | "returning" | "emergency" | "treatment";

const KINDS: { value: Kind; label: string; hint: string }[] = [
  { value: "new", label: "New patient", hint: "First visit to Select Dental" },
  { value: "returning", label: "Returning patient", hint: "You have visited us before" },
  { value: "emergency", label: "Emergency", hint: "Pain, swelling or injury" },
  { value: "treatment", label: "Specific treatment", hint: "Whitening, Invisalign and more" },
];

const TIMES = ["Mornings", "Afternoons", "Evenings", "Weekends"];

type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "consent", string>>;

/**
 * Appointment request form.
 * It sends a request only and never shows a booking as confirmed: the clinic confirms by phone or email.
 * Connect it by setting NEXT_PUBLIC_BOOKING_ENDPOINT (see README).
 */
export function BookingForm({
  endpoint,
  services,
  phone,
  preview,
}: {
  endpoint: string | null;
  services: string[];
  phone: { display: string; e164: string } | null;
  preview: boolean;
}) {
  const [kind, setKind] = useState<Kind>("new");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "not-connected" | "error">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && KINDS.some((k) => k.value === t)) setKind(t as Kind);
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "not-connected" || status === "error") resultRef.current?.focus();
  }, [status]);

  const validate = (fd: FormData): Errors => {
    const e: Errors = {};
    const name = String(fd.get("name") || "").trim();
    const digits = String(fd.get("phone") || "").replace(/\D/g, "");
    const email = String(fd.get("email") || "").trim();
    if (name.length < 2) e.name = "Please enter your name.";
    if (digits.length < 10) e.phone = "Please enter a phone number with area code.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please check your email address.";
    if (kind === "treatment" && !fd.get("service")) e.service = "Please choose the treatment you are interested in.";
    if (!fd.get("consent")) e.consent = "Please agree so we can contact you about this request.";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    if (fd.get("company")) return; // spam trap
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    window.dispatchEvent(new CustomEvent("sd-track", { detail: { event: "booking_submit", type: kind } }));
    if (!endpoint) {
      setStatus("not-connected");
      return;
    }
    setStatus("sending");
    try {
      const payload = {
        type: kind,
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email") || null,
        service: fd.get("service") || null,
        times: fd.getAll("times"),
        coverage: fd.get("coverage"),
        message: fd.get("message") || null,
        marketingConsent: Boolean(fd.get("marketing")),
        submittedAt: new Date().toISOString(),
        source: "selectdental-website",
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const linkCls = "font-semibold text-navy underline decoration-smile underline-offset-4";
  const callLine = phone ? (
    <a href={`tel:${phone.e164}`} className={linkCls} data-track="phone_click">
      {phone.display}
    </a>
  ) : (
    <Link href="/contact" className={linkCls}>
      contact the clinic
    </Link>
  );

  if (status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[var(--radius-media)] bg-mist p-8 outline-none sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-white text-navy ring-1 ring-line">
          <Icon name="check" className="size-6" />
        </span>
        <h2 className="h3 mt-6">Thank you. Your request has been sent.</h2>
        <p className="body-copy mt-3 max-w-[52ch]">
          This is a request, not a confirmed appointment. Our team will contact you to confirm a date and time. If your
          situation is urgent, please {phone ? <>call {callLine}</> : callLine}.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link-smile mt-6">
          Send another request
        </button>
      </div>
    );
  }

  const field =
    "mt-2 block w-full min-h-[48px] rounded-[var(--radius-ui)] border border-line-strong bg-white px-4 py-3 text-ink transition-colors placeholder:text-muted/70 focus:border-navy aria-[invalid=true]:border-[#b42318]";
  const errText = "mt-2 text-sm font-medium text-[#b42318]";
  const errorList = Object.entries(errors).filter(([, v]) => v);

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-10" aria-describedby="booking-note">
      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-[var(--radius-ui)] border border-[#b42318]/40 bg-[#fef3f2] p-5 outline-none">
          <p className="font-semibold text-[#912018]">Please check the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9375rem] text-[#912018]">
            {errorList.map(([k, v]) => (
              <li key={k}>
                <a href={`#f-${k}`} className="underline">
                  {v}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset>
        <legend className="h4">What kind of visit is this?</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {KINDS.map((k) => (
            <label
              key={k.value}
              className={`flex min-h-[64px] cursor-pointer items-start gap-3 rounded-[var(--radius-ui)] border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
                kind === k.value ? "border-navy bg-smile-soft/60" : "border-line-strong hover:border-navy/50"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={k.value}
                checked={kind === k.value}
                onChange={() => setKind(k.value)}
                className="mt-1 size-4 shrink-0 accent-[#1b396b] focus-visible:outline-none"
              />
              <span>
                <span className="block font-display font-semibold text-navy-ink">{k.label}</span>
                <span className="block text-sm text-muted">{k.hint}</span>
              </span>
            </label>
          ))}
        </div>
        {kind === "emergency" && (
          <p className="mt-4 flex gap-3 rounded-[var(--radius-ui)] bg-mist p-4 text-[0.9375rem] text-ink">
            <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-navy" />
            <span>
              For the fastest help, please {phone ? <>call {callLine}</> : callLine}. If you have swelling that affects
              breathing or swallowing, heavy bleeding or a serious injury, call 911.
            </span>
          </p>
        )}
      </fieldset>

      {kind === "treatment" && (
        <div>
          <label htmlFor="f-service" className="h4">
            Which treatment are you interested in?
          </label>
          <select
            id="f-service"
            name="service"
            defaultValue=""
            className={field}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "e-service" : undefined}
          >
            <option value="" disabled>
              Choose a treatment
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="e-service" className={errText}>
              {errors.service}
            </p>
          )}
        </div>
      )}

      <fieldset>
        <legend className="h4">Your details</legend>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="f-name" className="text-[0.9375rem] font-medium text-ink">
              Full name
            </label>
            <input
              id="f-name"
              name="name"
              autoComplete="name"
              required
              className={field}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "e-name" : undefined}
            />
            {errors.name && (
              <p id="e-name" className={errText}>
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="f-phone" className="text-[0.9375rem] font-medium text-ink">
              Phone
            </label>
            <input
              id="f-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              className={field}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "e-phone" : undefined}
            />
            {errors.phone && (
              <p id="e-phone" className={errText}>
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="f-email" className="text-[0.9375rem] font-medium text-ink">
              Email <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="f-email"
              name="email"
              type="email"
              autoComplete="email"
              className={field}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "e-email" : undefined}
            />
            {errors.email && (
              <p id="e-email" className={errText}>
                {errors.email}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="h4">When suits you best?</legend>
        <p className="mt-1 text-sm text-muted">Choose any that work. We will offer the closest available time.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {TIMES.map((t) => (
            <label
              key={t}
              className="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-[var(--radius-ui)] border border-line-strong px-4 has-[:checked]:border-navy has-[:checked]:bg-smile-soft/60 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy"
            >
              <input type="checkbox" name="times" value={t} className="size-4 accent-[#1b396b] focus-visible:outline-none" />
              <span className="text-[0.9375rem]">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="f-coverage" className="h4">
          How do you expect to pay?
        </label>
        <select id="f-coverage" name="coverage" defaultValue="not-sure" className={field}>
          <option value="insurance">Private dental insurance</option>
          <option value="cdcp">Canadian Dental Care Plan (CDCP)</option>
          <option value="self">Paying myself</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="f-message" className="h4">
          Anything we should know? <span className="font-sans text-sm font-normal text-muted">(optional)</span>
        </label>
        <p id="msg-hint" className="mt-1 text-sm text-muted">
          A short note is enough, for example &quot;chipped front tooth&quot;. Please do not include detailed health or
          insurance information here. We will ask for it securely.
        </p>
        <textarea id="f-message" name="message" rows={4} maxLength={500} className={field} aria-describedby="msg-hint" />
      </div>

      {/* Spam trap, hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4 border-t border-line pt-8">
        <label htmlFor="f-consent" className="flex cursor-pointer gap-3 text-[0.9375rem] text-ink">
          <input
            id="f-consent"
            type="checkbox"
            name="consent"
            className="mt-1 size-4 shrink-0 accent-[#1b396b]"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "e-consent" : undefined}
          />
          <span>
            I agree that Select Dental may contact me by phone or email about this request, as described in the{" "}
            <Link href="/privacy-policy" className="text-navy underline decoration-smile underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="e-consent" className={errText}>
            {errors.consent}
          </p>
        )}
        <label htmlFor="f-marketing" className="flex cursor-pointer gap-3 text-[0.9375rem] text-muted">
          <input id="f-marketing" type="checkbox" name="marketing" className="mt-1 size-4 shrink-0 accent-[#1b396b]" />
          <span>Optional: send me occasional clinic news and oral health tips. I can unsubscribe at any time.</span>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Request appointment"}
        </button>
        <p id="booking-note" className="text-sm text-muted">
          This sends a request. Your appointment is confirmed only when our team contacts you.
        </p>
      </div>

      {(status === "not-connected" || status === "error") && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-[var(--radius-ui)] border border-line-strong bg-mist p-5 outline-none">
          {status === "not-connected" ? (
            <>
              <p className="font-semibold text-navy-ink">Online requests are not connected yet.</p>
              <p className="mt-1 text-[0.9375rem] text-muted">
                Your request has not been sent. Please {phone ? <>call {callLine}</> : callLine} to book.
                {preview && " (Developer note: set NEXT_PUBLIC_BOOKING_ENDPOINT to connect this form.)"}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-navy-ink">Something went wrong and your request was not sent.</p>
              <p className="mt-1 text-[0.9375rem] text-muted">
                Please try again, or {phone ? <>call {callLine}</> : callLine}.
              </p>
            </>
          )}
        </div>
      )}
    </form>
  );
}
