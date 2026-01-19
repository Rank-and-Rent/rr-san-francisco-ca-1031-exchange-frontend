"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isTransparent = isHomepage && !scrolled && !mobileMenuOpen;

  // Show hero logo on transparent header, beautiful SF. logo when scrolled
  const LogoContent = () => {
    const textColor = isTransparent ? "text-white" : "text-[#5A2828]";
    const subTextColor = isTransparent ? "text-white/60" : "text-[#5A2828]/70";
    
    // Matching the screenshot exactly: SF with dot, 1031 underneath
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-baseline">
          <span className={`font-[family-name:var(--font-playfair)] text-[32px] md:text-[40px] font-normal leading-none ${textColor}`}>
            SF
          </span>
          <span className={`text-[32px] md:text-[40px] font-normal ${textColor}`}>.</span>
        </div>
        <span className={`text-[8px] md:text-[9px] font-medium tracking-[0.35em] uppercase -mt-1 ${subTextColor}`}>
          1031
        </span>
      </div>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-[#F7F5F2] border-b border-[#E5E0D8]"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <LogoContent />
          </Link>

          {/* Right side navigation */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Icon */}
            <button
              className={`p-2 transition-colors ${isTransparent ? "text-white hover:text-white/70" : "text-[#2D2D2D] hover:text-[#5A2828]"}`}
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Contact Us Button */}
            <Link
              href="/contact"
              className={`hidden md:block px-5 py-2 text-[10px] font-medium tracking-[0.2em] uppercase border transition-all duration-300 ${
                isTransparent
                  ? "border-white/60 text-white hover:bg-white hover:text-[#2D2D2D]"
                  : "border-[#5A2828] text-[#5A2828] hover:bg-[#5A2828] hover:text-white"
              }`}
            >
              Contact Us
            </Link>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${isTransparent ? "text-white" : "text-[#2D2D2D]"}`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="0" y1="1" x2="22" y2="1" />
                <line x1="0" y1="7" x2="22" y2="7" />
                <line x1="0" y1="13" x2="22" y2="13" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[54]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Half-page Menu Panel - Slides from right */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-[#F7F5F2] z-[55] transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[#E5E0D8]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center">
            <div className="flex items-baseline">
              <span className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[38px] font-normal leading-none text-[#5A2828]">
                SF
              </span>
              <span className="text-[32px] md:text-[38px] text-[#5A2828]">.</span>
            </div>
            <span className="text-[8px] md:text-[9px] font-medium tracking-[0.35em] uppercase -mt-1 text-[#5A2828]/70">
              1031
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-[#2D2D2D] hover:text-[#5A2828] transition-colors"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <nav className="px-6 lg:px-12 py-10">
          <ul className="space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/service-areas", label: "San Francisco Areas" },
              { href: "/property-types", label: "Property Types" },
              { href: "/services", label: "1031 Services" },
              { href: "/tools", label: "Exchange Tools" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#2D2D2D] hover:text-[#5A2828] transition-colors ${
                    pathname === item.href ? "text-[#5A2828]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-[#E5E0D8]">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#888] mb-4">
              Get in Touch
            </p>
            <a
              href="tel:+14159172994"
              className="block font-[family-name:var(--font-playfair)] text-[20px] text-[#5A2828] hover:text-[#C4A87C] transition-colors mb-2"
            >
              +1.415.917.2994
            </a>
            <a
              href="mailto:info@sf1031.com"
              className="block text-[14px] text-[#666] hover:text-[#5A2828] transition-colors"
            >
              info@sf1031.com
            </a>
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block px-8 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
