import Link from "next/link";
import { SFLogoLarge } from "@/components/SFLogo";
import {
  SITE_NAME,
  PHONE,
  PHONE_DIGITS,
  EMAIL,
  OFFICE_ADDRESS,
} from "@/lib/config";
import { servicesData } from "@/data";
import { locationsData } from "@/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const topLocations = locationsData.slice(0, 8);
  const topServices = servicesData.slice(0, 6);

  return (
    <footer className="bg-[#5A2828] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-8 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Side - Logo and Locations */}
          <div className="space-y-10">
            {/* Large Logo */}
            <SFLogoLarge variant="light" />

            {/* Locations */}
            <div className="space-y-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                Locations
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-white/90">50 California Street</p>
                <p className="text-white/90">San Francisco, CA 94111</p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-white/90">525 University Avenue</p>
                <p className="text-white/90">Palo Alto, CA 94301</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
                aria-label="YouTube"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl font-light italic tracking-wide">
                NEWSLETTER
              </h2>
              <p className="text-sm text-white/80">
                Subscribe to our Newsletter for latest news and updates. Stay tuned!
              </p>
            </div>

            {/* Newsletter Form */}
            <form className="space-y-6">
              <div className="border-b border-white/30">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-[#C4A87C] focus:ring-[#C4A87C]"
                  required
                />
                <label htmlFor="consent" className="text-xs leading-relaxed text-white/60">
                  I agree to be contacted by SF 1031 via call, email, and text for real estate services. To opt out, you can reply &apos;stop&apos; at any time or reply &apos;help&apos; for assistance. You can also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.{" "}
                  <Link href="/privacy" className="underline hover:text-white">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="border border-white/30 px-10 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-[#5A2828]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-8 py-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-xs text-white/50">
              Website Designed &amp; Developed by{" "}
              <a href="#" className="underline hover:text-white/80">
                SF 1031 Exchange
              </a>
            </p>
            <p className="text-xs text-white/50">
              Copyright {currentYear} |{" "}
              <Link href="/privacy" className="underline hover:text-white/80">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-white/10 bg-[#4A1F1F]">
        <div className="mx-auto max-w-[1400px] px-8 py-6 lg:px-12">
          <p className="text-[10px] uppercase leading-relaxed tracking-wide text-white/40">
            &copy;{currentYear} SF 1031 EXCHANGE INC. THIS SITE PROVIDES INFORMATION ABOUT 1031 EXCHANGES AND HELPS INVESTORS IDENTIFY REPLACEMENT PROPERTIES. THIS SITE IS NOT A QUALIFIED INTERMEDIARY, TAX ADVISOR, OR LEGAL COUNSEL. USERS SHOULD CONSULT LICENSED PROFESSIONALS BEFORE PROCEEDING WITH ANY EXCHANGE. ALL PROPERTY INFORMATION IS OBTAINED FROM VARIOUS SOURCES AND SHOULD BE INDEPENDENTLY VERIFIED.
          </p>
          <p className="mt-4 text-[10px] uppercase leading-relaxed tracking-wide text-white/40">
            THE PROPERTIES AND SERVICES DISPLAYED HEREIN ARE FOR INFORMATIONAL PURPOSES ONLY. SF 1031 EXCHANGE DOES NOT GUARANTEE THE ACCURACY OF PROPERTY DETAILS, PRICING, OR AVAILABILITY. SOME PHOTOGRAPHY MAY BE DIGITALLY ALTERED FOR ILLUSTRATIVE PURPOSES AND MAY NOT REPRESENT CURRENT CONDITIONS.
          </p>
        </div>
      </div>
    </footer>
  );
}
