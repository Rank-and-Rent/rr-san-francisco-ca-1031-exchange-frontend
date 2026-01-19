"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContactPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem("contactPopupDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show popup after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("contactPopupDismissed", "true");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[60] animate-fadeIn"
        onClick={handleDismiss}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-[#5A2828] max-w-lg w-full p-8 md:p-12 pointer-events-auto animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="Close popup"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1 mb-6">
              <span className="font-[family-name:var(--font-playfair)] text-[42px] md:text-[52px] font-normal tracking-[0.02em] text-white">
                SF.
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-[16px] md:text-[18px] font-normal tracking-[0.2em] uppercase text-white/80">
                1031
              </span>
            </div>
            
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-white mb-4">
              Start Your 1031 Exchange Today
            </h2>
            
            <p className="text-[14px] text-white/80 leading-relaxed mb-8">
              Our team of experts is ready to help you navigate your tax-deferred exchange. Get personalized guidance for your investment goals.
            </p>

            <div className="flex justify-center">
              <Link
                href="/contact"
                onClick={handleDismiss}
                className="px-8 py-3 bg-white text-[10px] font-medium tracking-[0.25em] uppercase text-[#5A2828] hover:bg-[#F7F5F2] transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-white/50">
              No obligation. Free consultation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
