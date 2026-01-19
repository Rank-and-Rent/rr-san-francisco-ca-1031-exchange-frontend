"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { SFLogoMinimal } from "@/components/SFLogo";

export default function Header() {
  const pathname = usePathname();
  // Auto-detect if we're on homepage for transparent header
  const variant = pathname === "/" ? "transparent" : "solid";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const isTransparent = variant === "transparent" && !scrolled && !mobileMenuOpen;
  const logoVariant = isTransparent ? "light" : "dark";
  const textColor = isTransparent ? "text-white" : "text-[#2D2D2D]";
  const borderColor = isTransparent ? "border-white/30" : "border-[#5A2828]";
  const bgClass = isTransparent 
    ? "bg-transparent" 
    : "bg-[#F7F5F2]/95 backdrop-blur-md border-b border-[#E5E0D8]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      {/* Top red line accent like Carolwood */}
      <div className="h-[3px] bg-[#5A2828]" />
      
      <nav
        className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5 lg:px-12"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <SFLogoMinimal variant={logoVariant} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {/* Search Icon */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-2 transition-colors ${textColor} hover:text-[#C4A87C]`}
            aria-label="Search"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Contact Us Button */}
          <Link
            href="/contact"
            className={`px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] border transition-all duration-300 ${borderColor} ${textColor} hover:bg-[#5A2828] hover:text-white hover:border-[#5A2828]`}
          >
            Contact Us
          </Link>

          {/* Hamburger Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${textColor}`}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              width="28"
              height="20"
              viewBox="0 0 28 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="0" y1="2" x2="28" y2="2" />
              <line x1="0" y1="10" x2="28" y2="10" />
              <line x1="0" y1="18" x2="28" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${textColor}`}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="2" y1="2" x2="22" y2="16" />
                  <line x1="22" y1="2" x2="2" y2="16" />
                </>
              ) : (
                <>
                  <line x1="0" y1="2" x2="24" y2="2" />
                  <line x1="0" y1="9" x2="24" y2="9" />
                  <line x1="0" y1="16" x2="24" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E5E0D8] p-6">
          <div className="mx-auto max-w-2xl">
            <form action="/service-areas" method="get">
              <input
                ref={searchInputRef}
                type="text"
                name="q"
                placeholder="Search properties, areas, services..."
                className="w-full border-b border-[#2D2D2D] bg-transparent py-4 text-lg font-light text-[#2D2D2D] placeholder:text-[#6E6E6E] focus:border-[#5A2828] focus:outline-none"
              />
            </form>
          </div>
        </div>
      )}

      {/* Full-screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 z-40 bg-[#F7F5F2]">
          {/* Menu Header */}
          <div className="h-[3px] bg-[#5A2828]" />
          <div className="flex items-center justify-between px-8 py-5 lg:px-12">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <SFLogoMinimal variant="dark" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#2D2D2D]"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col items-center justify-center px-8 py-12 lg:py-20">
            <ul className="space-y-6 text-center lg:space-y-8">
              {[
                { href: "/service-areas", label: "San Francisco Areas" },
                { href: "/property-types", label: "Property Types" },
                { href: "/services", label: "1031 Services" },
                { href: "/tools", label: "Exchange Tools" },
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-['Playfair_Display',Georgia,serif] text-3xl text-[#2D2D2D] transition-colors hover:text-[#5A2828] lg:text-4xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-12 space-y-4 text-center lg:mt-16">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#6E6E6E]">
                Get in Touch
              </p>
              <a
                href="tel:+14159172994"
                className="block font-['Playfair_Display',Georgia,serif] text-xl text-[#5A2828] hover:text-[#C4A87C]"
              >
                (415) 917-2994
              </a>
              <a
                href="mailto:support@1031exchangesanfrancisco.com"
                className="block text-sm text-[#6E6E6E] hover:text-[#5A2828]"
              >
                support@1031exchangesanfrancisco.com
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
