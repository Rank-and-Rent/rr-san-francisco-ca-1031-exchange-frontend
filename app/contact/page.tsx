"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FormEvent, useEffect, useState, useId, Suspense, useRef, useMemo } from "react";
import Script from "next/script";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE,
  PHONE_DIGITS,
  EMAIL,
  OFFICE_ADDRESS,
} from "@/lib/config";
import { SERVICES } from "@/lib/services";

type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  property: string;
  estimatedCloseDate: string;
  city: string;
  timeline: string;
  message: string;
};

const INITIAL_FORM: ContactFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  property: "",
  estimatedCloseDate: "",
  city: "",
  timeline: "",
  message: "",
};

const serviceOptions = [
  "Forward Exchange",
  "Reverse Exchange",
  "Qualified Intermediary Services",
  "Property Identification",
  "NNN Property Identification",
  "Exchange Consultation",
  "Form 8824 Preparation",
  "Boot Analysis",
];

const timelineOptions = ["Immediate", "45 days", "180 days", "Planning phase"];

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const statusRegionId = useId();
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  // Combine service options with SERVICES data
  const allServices = useMemo(() => {
    const serviceNames = SERVICES.map((s) => s.title);
    const combined = new Set([...serviceOptions, ...serviceNames]);
    return Array.from(combined).sort();
  }, []);

  useEffect(() => {
    const projectType = searchParams.get("projectType");
    if (projectType) {
      setFormData((prev) => ({
        ...prev,
        projectType: decodeURIComponent(projectType),
      }));
    }
  }, [searchParams]);

  const handlePhoneChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, phone: numbersOnly }));
  };

  useEffect(() => {
    const loadTurnstile = () => {
      if (typeof window !== "undefined" && (window as any).turnstile) {
        (window as any).turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
          callback: (token: string) => setTurnstileToken(token),
          "error-callback": () => setTurnstileToken(""),
          "expired-callback": () => setTurnstileToken(""),
        });
      }
    };
    if (turnstileRef.current) {
      const timer = setTimeout(loadTurnstile, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const validateForm = (data: ContactFormData) => {
    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!data.name.trim()) nextErrors.name = "Name is required.";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Valid email is required.";
    }
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a 10 digit phone number.";
    }
    if (!data.projectType.trim()) nextErrors.projectType = "Please select a service.";
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateForm(formData);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields.");
      return;
    }
    if (!turnstileToken) {
      setStatus("error");
      setStatusMessage("Please complete the security verification.");
      return;
    }
    try {
      setStatus("loading");
      setStatusMessage("Submitting your details...");
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          details: formData.message,
          turnstileToken
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      setStatusMessage("Thank you. A San Francisco exchange specialist will follow up within one business day.");
      setFormData(INITIAL_FORM);
      setErrors({});
      setTurnstileToken("");
      if (typeof window !== "undefined" && (window as any).turnstile) {
        (window as any).turnstile.reset();
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("Something went wrong. Please call us or try again.");
    }
  };

  const inputClasses = "w-full border-b border-[#E5E0D8] bg-transparent py-3 text-[14px] text-[#333] placeholder:text-[#999] focus:border-[#5A2828] focus:outline-none transition-colors";
  const labelClasses = "block text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-2";
  const hintClasses = "text-[10px] text-[#999] mt-1";

  if (status === "success") {
    return (
      <div className="bg-[#F7F5F2]">
        <section className="relative h-[40vh] min-h-[300px]">
          <Image src="/locations/1031-exchange-soma-ca.jpg" alt="Contact SF 1031 Exchange" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
            <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">Thank You</h1>
          </div>
        </section>
        <section className="py-20 md:py-28">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-[#5A2828]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-[#5A2828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal tracking-[0.08em] uppercase text-[#333] mb-6">Request Received</h2>
            <p className="text-[15px] text-[#666] leading-[1.8] mb-8">A San Francisco exchange specialist will contact you within one business day to discuss your 1031 exchange needs.</p>
            <a href="/" className="inline-block px-10 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors">Return Home</a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F2]">
      <section className="relative h-[40vh] min-h-[300px]">
        <Image src="/locations/1031-exchange-soma-ca.jpg" alt="Contact SF 1031 Exchange" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">Contact Us</h1>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[32px] font-normal tracking-[0.08em] uppercase text-[#333] mb-8">Get in Touch</h2>
              <p className="text-[15px] text-[#666] leading-[1.8] mb-10">Contact us to discuss your 1031 exchange property identification needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.</p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-2">Phone</h3>
                  <a href={`tel:${PHONE_DIGITS}`} className="font-[family-name:var(--font-playfair)] text-[22px] text-[#5A2828] hover:text-[#C4A87C] transition-colors">{PHONE}</a>
                </div>
                <div>
                  <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-2">Email</h3>
                  <a href={`mailto:${EMAIL}`} className="text-[16px] text-[#5A2828] hover:text-[#C4A87C] transition-colors">{EMAIL}</a>
                </div>
                <div>
                  <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-2">Office</h3>
                  <p className="text-[14px] text-[#666]">{OFFICE_ADDRESS}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-2">Hours</h3>
                  <p className="text-[14px] text-[#666]">Monday - Friday: 9am - 5pm PST</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal tracking-[0.08em] uppercase text-[#333] mb-6">Start Your Exchange Plan</h3>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Row 1: Name + Email */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClasses}>Name *</label>
                    <input type="text" id="contact-name" value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Primary investor or advisor name"
                      className={inputClasses} aria-invalid={!!errors.name} required />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClasses}>Email *</label>
                    <input type="email" id="contact-email" value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="We send a confirmation and checklist"
                      className={inputClasses} aria-invalid={!!errors.email} required />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Phone + Company */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-phone" className={labelClasses}>Phone *</label>
                    <input type="tel" id="contact-phone" value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="We confirm timelines within one business day"
                      className={inputClasses} aria-invalid={!!errors.phone} required />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-company" className={labelClasses}>Company</label>
                    <input type="text" id="contact-company" value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Company or organization (optional)"
                      className={inputClasses} />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="contact-project-type" className={labelClasses}>Service *</label>
                  <select id="contact-project-type" value={formData.projectType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, projectType: e.target.value }))}
                    className={`${inputClasses} bg-[#F7F5F2]`} aria-invalid={!!errors.projectType} required>
                    <option value="">Select the service you are interested in</option>
                    {allServices.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.projectType && <p className="mt-1 text-xs text-red-600">{errors.projectType}</p>}
                </div>

                {/* Row 3: City + Timeline */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-city" className={labelClasses}>City</label>
                    <input type="text" id="contact-city" value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      placeholder="Primary metro or submarket (optional)"
                      className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="contact-timeline" className={labelClasses}>Timeline</label>
                    <select id="contact-timeline" value={formData.timeline}
                      onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                      className={`${inputClasses} bg-[#F7F5F2]`}>
                      <option value="">Select timeline (optional)</option>
                      {timelineOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Property Being Sold */}
                <div>
                  <label htmlFor="contact-property" className={labelClasses}>Property Being Sold</label>
                  <input type="text" id="contact-property" value={formData.property}
                    onChange={(e) => setFormData((prev) => ({ ...prev, property: e.target.value }))}
                    placeholder="Property type, location, and estimated value (optional)"
                    className={inputClasses} />
                </div>

                {/* Estimated Close Date */}
                <div>
                  <label htmlFor="contact-close-date" className={labelClasses}>Estimated Close Date</label>
                  <input type="date" id="contact-close-date" value={formData.estimatedCloseDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, estimatedCloseDate: e.target.value }))}
                    className={inputClasses} />
                  <p className={hintClasses}>Determines your 45 day and 180 day milestones (optional)</p>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClasses}>Message</label>
                  <textarea id="contact-message" value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4} className={`${inputClasses} resize-none`}
                    placeholder="Outline goals, replacement preferences, or coordination needs (optional)" />
                </div>

                <div ref={turnstileRef} className="flex justify-start" />
                <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />

                <button type="submit"
                  className="w-full px-10 py-4 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors disabled:opacity-50"
                  disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>

                <p id={statusRegionId} role="status" aria-live="polite"
                  className={`text-sm ${status === "error" ? "text-red-600" : "text-[#666]"}`}>
                  {statusMessage}
                </p>

                <p className="text-[11px] text-[#999]">Consult your QI, CPA, and legal counsel before executing exchange strategies.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="bg-[#F7F5F2] min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}
