"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState, useId, Suspense, useRef } from "react";
import Script from "next/script";
import {
  SITE_NAME,
  SITE_URL,
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
  details: string;
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
  details: "",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");
  const statusRegionId = useId();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const projectType = searchParams.get("projectType");
    if (projectType) {
      setFormData((prev) => ({
        ...prev,
        projectType: decodeURIComponent(projectType),
      }));
      setTimeout(() => {
        const element = document.getElementById("contact-form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchParams]);

  const handleProjectTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }));
    if (value.length > 1) {
      const matches = SERVICES.filter((s) =>
        s.title.toLowerCase().includes(value.toLowerCase())
      )
        .slice(0, 5)
        .map((s) => s.title);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, phone: numbersOnly }));
  };

  useEffect(() => {
    const loadTurnstile = () => {
      if (typeof window !== "undefined" && (window as any).turnstile) {
        const widgetId = (window as any).turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "error-callback": () => {
            setTurnstileToken("");
          },
          "expired-callback": () => {
            setTurnstileToken("");
          },
        });
        return widgetId;
      }
    };

    if (turnstileRef.current) {
      const timer = setTimeout(loadTurnstile, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const validateForm = (data: ContactFormData) => {
    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!data.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Valid email is required.";
    }
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a 10 digit phone number.";
    }
    if (!data.projectType.trim()) {
      nextErrors.projectType = "Project type is required.";
    }
    if (!data.timeline.trim()) {
      nextErrors.timeline = "Timeline is required.";
    }
    if (!data.details.trim()) {
      nextErrors.details = "Details are required.";
    }
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setStatusMessage(
        "Thank you. Our team will respond within one business day."
      );
      setFormData(INITIAL_FORM);
      setErrors({});
      setTurnstileToken("");
      if (typeof window !== "undefined" && (window as any).turnstile) {
        (window as any).turnstile.reset();
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage(
        "Something went wrong. Please call us or try submitting again."
      );
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="mb-12">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          Contact Us
        </h1>
        <p className="text-lg text-[#1E1E1E]/80">
          Get in touch to discuss your 1031 exchange property identification
          needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div id="contact-form">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Name *
              </label>
              <input
                type="text"
                id="contact-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                required
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-company"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Company
              </label>
              <input
                type="text"
                id="contact-company"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Email *
              </label>
              <input
                type="email"
                id="contact-email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                required
              />
              {errors.email && (
                <p id="contact-email-error" className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Phone *
              </label>
              <input
                type="tel"
                id="contact-phone"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                placeholder="(415) 555-1234"
                required
              />
              {errors.phone && (
                <p id="contact-phone-error" className="mt-1 text-xs text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="contact-project-type"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Project Type *
              </label>
              <select
                id="contact-project-type"
                value={formData.projectType}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, projectType: e.target.value }))
                }
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                aria-invalid={!!errors.projectType}
                aria-describedby={
                  errors.projectType ? "contact-project-type-error" : undefined
                }
                required
              >
                <option value="">Select a project type</option>
                {[...SERVICES]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((service) => (
                    <option key={service.slug} value={service.title}>
                      {service.title}
                    </option>
                  ))}
              </select>
              {errors.projectType && (
                <p
                  id="contact-project-type-error"
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.projectType}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-property"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Property Being Sold
              </label>
              <input
                type="text"
                id="contact-property"
                value={formData.property}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, property: e.target.value }))
                }
                placeholder="Include property type, location, and estimated value (optional)"
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-estimated-close-date"
                  className="mb-2 block text-sm font-medium text-[#0C1E2E]"
                >
                  Estimated Close Date
                </label>
                <input
                  type="date"
                  id="contact-estimated-close-date"
                  value={formData.estimatedCloseDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, estimatedCloseDate: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-city"
                  className="mb-2 block text-sm font-medium text-[#0C1E2E]"
                >
                  City
                </label>
                <input
                  type="text"
                  id="contact-city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Primary metro or submarket (optional)"
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-timeline"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Timeline *
              </label>
              <input
                type="text"
                id="contact-timeline"
                value={formData.timeline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, timeline: e.target.value }))
                }
                placeholder="e.g., Closing in 30 days"
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                aria-invalid={!!errors.timeline}
                aria-describedby={errors.timeline ? "contact-timeline-error" : undefined}
                required
              />
              {errors.timeline && (
                <p id="contact-timeline-error" className="mt-1 text-xs text-red-600">
                  {errors.timeline}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-details"
                className="mb-2 block text-sm font-medium text-[#0C1E2E]"
              >
                Details *
              </label>
              <textarea
                id="contact-details"
                value={formData.details}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, details: e.target.value }))
                }
                rows={5}
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
                aria-invalid={!!errors.details}
                aria-describedby={errors.details ? "contact-details-error" : undefined}
                required
              />
              {errors.details && (
                <p id="contact-details-error" className="mt-1 text-xs text-red-600">
                  {errors.details}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F]"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Submit"}
            </button>

            <p
              id={statusRegionId}
              role="status"
              aria-live="polite"
              className={`text-sm ${
                status === "error"
                  ? "text-red-600"
                  : status === "success"
                    ? "text-green-600"
                    : "text-[#1E1E1E]/70"
              }`}
            >
              {statusMessage}
            </p>

            <div ref={turnstileRef} className="flex justify-center" />
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="lazyOnload"
            />
            <p className="text-xs text-[#1E1E1E]/60">
              Educational content only. Not tax or legal advice.
            </p>
          </form>
        </div>

        <div>
          <div className="mb-8 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8">
            <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
              Contact Information
            </h2>
            <div className="space-y-4 text-sm text-[#1E1E1E]/80">
              <div>
                <p className="font-medium text-[#0C1E2E]">Phone</p>
                <a
                  href={`tel:${PHONE_DIGITS}`}
                  className="text-[#F5B32F] transition hover:text-[#F5B32F]/80"
                >
                  {PHONE}
                </a>
              </div>
              <div>
                <p className="font-medium text-[#0C1E2E]">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="break-words text-[#F5B32F] transition hover:text-[#F5B32F]/80"
                >
                  {EMAIL}
                </a>
              </div>
              <div>
                <p className="font-medium text-[#0C1E2E]">Hours</p>
                <p>Mon-Fri: 9am-5pm PST</p>
              </div>
            </div>
          </div>

          <div className="h-64 w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] md:h-96 overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${OFFICE_ADDRESS}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}

