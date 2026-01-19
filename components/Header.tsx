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

  const isTransparent = isHomepage && !scrolled && !mobileMenuOpen;

  return (
    <>
      {/* Red accent line at top */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-[#5A2828] z-[60]" />
      
      <header
        className={`fixed top-[4px] left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-[#F7F5F2] border-b border-[#E5E0D8]"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start hover:opacity-80 transition-opacity">
            <div className="flex items-baseline">
              <span 
                className={`font-[family-name:var(--font-playfair)] text-[36px] md:text-[42px] font-light leading-none ${isTransparent ? "text-white" : "text-[#2D2D2D]"}`}
              >
                SF
              </span>
              <span 
                className={`text-[36px] md:text-[42px] ml-0.5 ${isTransparent ? "text-white" : "text-[#2D2D2D]"}`}
              >
                .
              </span>
            </div>
            <span 
              className={`text-[9px] font-medium tracking-[0.35em] uppercase -mt-1 ${isTransparent ? "text-white/80" : "text-[#666]"}`}
            >
              1031
            </span>
          </Link>

          {/* Right side navigation */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Search Icon */}
            <button
              className={`p-2 transition-colors ${isTransparent ? "text-white hover:text-white/70" : "text-[#2D2D2D] hover:text-[#5A2828]"}`}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Contact Us Button */}
            <Link
              href="/contact"
              className={`hidden md:block px-5 py-2.5 text-[10px] font-medium tracking-[0.2em] uppercase border transition-all duration-300 ${
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
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="0" y1="1" x2="24" y2="1" />
                <line x1="0" y1="8" x2="24" y2="8" />
                <line x1="0" y1="15" x2="24" y2="15" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-[#F7F5F2]">
          <div className="h-[4px] bg-[#5A2828]" />
          
          <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-start">
              <div className="flex items-baseline">
                <span className="font-[family-name:var(--font-playfair)] text-[36px] md:text-[42px] font-light leading-none text-[#2D2D2D]">
                  SF
                </span>
                <span className="text-[36px] md:text-[42px] ml-0.5 text-[#2D2D2D]">.</span>
              </div>
              <span className="text-[9px] font-medium tracking-[0.35em] uppercase -mt-1 text-[#666]">
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

          <nav className="flex flex-col items-center justify-center px-6 py-12">
            <ul className="space-y-5 text-center">
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
                    className="block font-[family-name:var(--font-playfair)] text-[26px] md:text-[32px] font-light text-[#2D2D2D] hover:text-[#5A2828] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 text-center">
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#888] mb-3">
                Get in Touch
              </p>
              <a
                href="tel:+14159172994"
                className="block font-[family-name:var(--font-playfair)] text-[20px] text-[#5A2828] hover:text-[#C4A87C] transition-colors"
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
