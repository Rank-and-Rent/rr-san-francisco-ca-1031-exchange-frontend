"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
  };

  return (
    <footer className="bg-[#5A2828]">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side - Logo and Locations */}
          <div className="space-y-10">
            {/* Large Logo - like Carolwood's C. ESTATES */}
            <div className="flex flex-col items-start">
              <div className="flex items-baseline">
                <span 
                  className="text-[100px] lg:text-[140px] font-light leading-none text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  SF
                </span>
                <span className="text-[100px] lg:text-[140px] text-white">.</span>
              </div>
              <span className="text-[12px] font-medium tracking-[0.4em] uppercase text-white/70 -mt-4 ml-1">
                1031
              </span>
            </div>

            {/* Locations */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/50">
                Locations
              </h3>
              <div className="space-y-1 text-[14px] text-white/80">
                <p>50 California Street</p>
                <p>San Francisco, CA 94111</p>
              </div>
              <div className="space-y-1 text-[14px] text-white/80 mt-4">
                <p>525 University Avenue</p>
                <p>Palo Alto, CA 94301</p>
              </div>
            </div>

            {/* Social Icons - like Carolwood */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div className="space-y-6">
            <h2 
              className="text-[28px] md:text-[32px] font-light italic tracking-wide text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              NEWSLETTER
            </h2>
            <p className="text-[14px] text-white/70">
              Subscribe to our Newsletter for latest news and updates. Stay tuned!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-white/30">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-3 text-[14px] text-white placeholder:text-white/40 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-none border-white/30 bg-transparent"
                  required
                />
                <label htmlFor="consent" className="text-[11px] leading-relaxed text-white/50">
                  I agree to be contacted by SF 1031 via call, email, and text for real estate services. To opt out, you can reply &apos;stop&apos; at any time or reply &apos;help&apos; for assistance. You can also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.{" "}
                  <Link href="/privacy" className="underline hover:text-white/70">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="px-10 py-3 border border-white/30 text-[11px] font-medium tracking-[0.25em] uppercase text-white hover:bg-white hover:text-[#5A2828] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Credit Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
            <p>
              Website Designed &amp; Developed by{" "}
              <span className="underline">SF 1031 Exchange</span>
            </p>
            <p>
              Copyright {currentYear} |{" "}
              <Link href="/privacy" className="underline hover:text-white/60">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer - like Carolwood */}
      <div className="border-t border-white/10 bg-[#4A1F1F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <p className="text-[9px] uppercase leading-[1.8] tracking-[0.05em] text-white/30">
            &copy;{currentYear} SF 1031 EXCHANGE INC. THIS SITE PROVIDES INFORMATION ABOUT 1031 EXCHANGES AND HELPS INVESTORS IDENTIFY REPLACEMENT PROPERTIES. THIS SITE IS NOT A QUALIFIED INTERMEDIARY, TAX ADVISOR, OR LEGAL COUNSEL. USERS SHOULD CONSULT LICENSED PROFESSIONALS BEFORE PROCEEDING WITH ANY EXCHANGE. ALL PROPERTY INFORMATION IS OBTAINED FROM VARIOUS SOURCES AND SHOULD BE INDEPENDENTLY VERIFIED. EQUAL HOUSING OPPORTUNITY.
          </p>
          <p className="mt-4 text-[9px] uppercase leading-[1.8] tracking-[0.05em] text-white/30">
            THE PROPERTIES DISPLAYED HEREIN ARE FOR INFORMATIONAL PURPOSES ONLY. SF 1031 EXCHANGE DOES NOT GUARANTEE THE ACCURACY OF PROPERTY DETAILS, PRICING, OR AVAILABILITY. SOME PHOTOGRAPHY MAY BE DIGITALLY ALTERED FOR ILLUSTRATIVE PURPOSES AND MAY NOT REPRESENT CURRENT CONDITIONS.
          </p>
        </div>
      </div>
    </footer>
  );
}
