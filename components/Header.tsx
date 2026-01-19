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

  // Determine header style based on homepage + scroll state
  const isTransparent = isHomepage && !scrolled && !mobileMenuOpen;

  return (
    <>
      {/* Red accent line at top - like Carolwood */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-[#5A2828] z-[60]" />
      
      <header
        className={`fixed top-[4px] left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-[#F7F5F2] border-b border-[#E5E0D8]"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 py-5">
          {/* Logo - SF. with 1031 underneath, like Carolwood's C. ESTATES */}
          <Link href="/" className="flex flex-col items-start hover:opacity-80 transition-opacity">
            <div className="flex items-baseline">
              <span 
                className={`text-[42px] font-light leading-none ${isTransparent ? "text-white" : "text-[#2D2D2D]"}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                SF
              </span>
              <span 
                className={`text-[42px] ml-0.5 ${isTransparent ? "text-white" : "text-[#2D2D2D]"}`}
              >
                .
              </span>
            </div>
            <span 
              className={`text-[10px] font-medium tracking-[0.35em] uppercase -mt-1 ${isTransparent ? "text-white/80" : "text-[#666]"}`}
            >
              1031
            </span>
          </Link>

          {/* Right side navigation - exactly like Carolwood */}
          <div className="flex items-center gap-5">
            {/* Search Icon */}
            <button
              className={`p-2 transition-colors ${isTransparent ? "text-white hover:text-white/70" : "text-[#2D2D2D] hover:text-[#5A2828]"}`}
              aria-label="Search"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Contact Us Button - bordered, like Carolwood */}
            <Link
              href="/contact"
              className={`hidden md:block px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase border transition-all duration-300 ${
                isTransparent
                  ? "border-white/50 text-white hover:bg-white hover:text-[#2D2D2D]"
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
              <svg width="26" height="18" viewBox="0 0 26 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="0" y1="1" x2="26" y2="1" />
                <line x1="0" y1="9" x2="26" y2="9" />
                <line x1="0" y1="17" x2="26" y2="17" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Menu Overlay - like Carolwood */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-[#F7F5F2]">
          {/* Top red line */}
          <div className="h-[4px] bg-[#5A2828]" />
          
          {/* Menu Header */}
          <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 py-5">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-start">
              <div className="flex items-baseline">
                <span 
                  className="text-[42px] font-light leading-none text-[#2D2D2D]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  SF
                </span>
                <span className="text-[42px] ml-0.5 text-[#2D2D2D]">.</span>
              </div>
              <span className="text-[10px] font-medium tracking-[0.35em] uppercase -mt-1 text-[#666]">
                1031
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#2D2D2D]"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col items-center justify-center px-6 py-16">
            <ul className="space-y-6 text-center">
              {[
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
                    className="block text-[28px] md:text-[36px] font-light text-[#2D2D2D] hover:text-[#5A2828] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#888] mb-4">
                Get in Touch
              </p>
              <a
                href="tel:+14159172994"
                className="block text-[24px] text-[#5A2828] hover:text-[#C4A87C] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                +1.415.917.2994
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
