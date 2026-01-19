"use client";

import Script from "next/script";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SITE_NAME,
  SITE_URL,
  PHONE_DIGITS,
  HAS_STAFFED_OFFICE,
} from "@/lib/config";

// Hero images for the carousel - exactly like Carolwood
const HERO_IMAGES = [
  "/san-francisco-hero.jpg",
  "/locations/1031-exchange-pacific-heights-ca.jpg",
  "/locations/1031-exchange-marina-district-ca.jpg",
];

// Stats for the hero section - like Carolwood's $1.3B, $5B, $2.2B
const HERO_STATS = [
  { value: "$850M", label: "EXCHANGE VOLUME" },
  { value: "500+", label: "EXCHANGES COMPLETED" },
  { value: "$2.1B", label: "PROPERTIES IDENTIFIED" },
];

// Property types - replaces Carolwood's "Featured In" publications
const PROPERTY_TYPES = [
  "NNN",
  "RESIDENTIAL", 
  "COMMERCIAL",
  "INDUSTRIAL",
  "MULTIFAMILY",
  "MEDICAL",
  "SELF STORAGE",
];

// San Francisco premium areas - like Carolwood Sold properties
const SF_AREAS = [
  {
    slug: "pacific-heights-ca",
    name: "PACIFIC HEIGHTS",
    price: "$5,200,000",
    image: "/locations/1031-exchange-pacific-heights-ca.jpg",
  },
  {
    slug: "marina-district-ca",
    name: "MARINA DISTRICT", 
    price: "$2,800,000",
    image: "/locations/1031-exchange-marina-district-ca.jpg",
  },
  {
    slug: "financial-district-ca",
    name: "FINANCIAL DISTRICT",
    price: "$1,800,000",
    image: "/locations/1031-exchange-financial-district-ca.jpg",
  },
  {
    slug: "soma-ca",
    name: "SOMA",
    price: "$1,500,000",
    image: "/locations/1031-exchange-soma-ca.jpg",
  },
  {
    slug: "mission-bay-ca",
    name: "MISSION BAY",
    price: "$1,600,000",
    image: "/locations/1031-exchange-mission-bay-ca.jpg",
  },
  {
    slug: "palo-alto-ca",
    name: "PALO ALTO",
    price: "$3,800,000",
    image: "/locations/1031-exchange-palo-alto-ca.jpg",
  },
  {
    slug: "oakland-ca",
    name: "OAKLAND",
    price: "$980,000",
    image: "/locations/1031-exchange-oakland-ca.jpg",
  },
  {
    slug: "berkeley-ca",
    name: "BERKELEY",
    price: "$1,200,000",
    image: "/locations/1031-exchange-berkeley-ca.jpg",
  },
];

// FAQs for structured data
const FAQS = [
  {
    question: "What are the 45 and 180 day rules?",
    answer: "Day 0 begins when you close on the relinquished property. You must identify replacement property by Day 45 and close by Day 180.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer: "Real property held for investment or productive use qualifies for like-kind treatment when exchanged for other real property.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer: "Boot is any cash or non-like-kind value received during the exchange. Boot is taxable as capital gain.",
  },
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-rotate hero images like Carolwood
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Carousel navigation
  const scrollCarousel = useCallback((direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 500;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // JSON-LD structured data
  const jsonLdGraph = useMemo(() => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: PHONE_DIGITS,
          address: {
            "@type": "PostalAddress",
            streetAddress: HAS_STAFFED_OFFICE ? "50 California St" : "",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94111",
            addressCountry: "US",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
        {
          "@type": "RealEstateAgent",
          name: SITE_NAME,
          url: SITE_URL,
          description: "San Francisco 1031 Exchange specialists helping investors defer capital gains.",
          areaServed: { "@type": "State", name: "California" },
        },
      ],
    });
  }, []);

  return (
    <div className="bg-[#F7F5F2]">
      {/* ==================== HERO SECTION ==================== */}
      {/* Exactly like Carolwood - full screen with rotating images */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Images with Ken Burns effect */}
        {HERO_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              index === currentHeroIndex ? "opacity-100" : "opacity-0"
            }`}
          >
              <Image
              src={src}
              alt="San Francisco luxury real estate"
              fill
              className="object-cover scale-105"
              style={{
                animation: index === currentHeroIndex ? "kenburns 8s ease-out forwards" : "none",
              }}
              priority={index === 0}
                sizes="100vw"
              />
            </div>
        ))}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content - Centered text like Carolwood */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
          <h1 
            className="text-[32px] md:text-[42px] lg:text-[52px] font-light tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Access Premium 1031 Properties
              </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[17px] font-light tracking-wide leading-relaxed">
            Exclusive property identification. Contact SF 1031 for private access to investment-grade replacement properties.
          </p>
              </div>

        {/* Stats Bar at Bottom - Like Carolwood's glass panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-white/20">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="py-8 px-4 text-center text-white">
                  <div 
                    className="text-[28px] md:text-[36px] font-light"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[10px] md:text-[11px] font-medium tracking-[0.25em] uppercase opacity-80">
                    {stat.label}
                  </div>
                </div>
                  ))}
                </div>
              </div>
          
          {/* Scroll Down Arrow */}
          <div className="flex justify-center pb-6">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Scroll down"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
              </div>
        </div>
          </section>

      {/* ==================== ABOUT SECTION ==================== */}
      {/* Like Carolwood's "Carolwood Estates" section with background image */}
      <section id="about" className="relative min-h-[600px]">
        <Image
          src="/locations/1031-exchange-san-francisco-ca.jpg"
          alt="San Francisco"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 flex min-h-[600px] items-center justify-center px-6 py-24">
          <div className="max-w-3xl text-center text-white">
            <h2 
              className="text-[36px] md:text-[48px] font-light tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              SF 1031 Exchange
            </h2>
            <p className="mt-8 text-[15px] md:text-[17px] font-light leading-[1.9] tracking-wide">
              SF 1031 Exchange is a boutique property identification and exchange coordination firm based in San Francisco, founded by an organic collaboration of highly successful real estate and tax professionals. Leveraging its stellar leadership and supported by the most refined resources in the industry, SF 1031 Exchange is driven by an unrelenting focus on discretion, transactional excellence and exceeding client expectation.
            </p>
              </div>
        </div>
          </section>

      {/* ==================== PROPERTY TYPES SECTION ==================== */}
      {/* Like Carolwood's "Featured In" with publication logos */}
      <section className="bg-[#F7F5F2] py-12 border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#888]">
              Property Types
            </span>
            {PROPERTY_TYPES.map((type) => (
              <span
                key={type}
                className="text-[18px] md:text-[22px] font-light text-[#555] tracking-wide"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {type}
                      </span>
                  ))}
              </div>
                </div>
          </section>

      {/* ==================== SF AREAS CAROUSEL ==================== */}
      {/* Like Carolwood's "CAROLWOOD SOLD" section */}
      <section className="bg-[#F7F5F2] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-center text-[32px] md:text-[40px] font-light tracking-[0.15em] uppercase text-[#333] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            San Francisco Areas
          </h2>

          {/* Carousel */}
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {SF_AREAS.map((area) => (
                    <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group flex-shrink-0 relative"
                >
                  <div className="relative w-[320px] md:w-[420px] h-[400px] md:h-[520px] overflow-hidden">
                            <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="420px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 
                        className="text-[20px] md:text-[24px] font-light tracking-[0.1em] text-white"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {area.name}
                </h3>
                      <p className="mt-1 text-[14px] text-white/80">{area.price}</p>
              </div>
                    </div>
                  </Link>
              ))}
            </div>

            {/* Carousel Controls - Like Carolwood */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-3">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 flex items-center justify-center border border-[#5A2828] text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
                  aria-label="Previous"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                      </svg>
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 flex items-center justify-center border border-[#5A2828] text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
                  aria-label="Next"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                      </svg>
                </button>
                    </div>
                <Link
                href="/service-areas"
                className="px-8 py-3 border border-[#5A2828] text-[11px] font-medium tracking-[0.25em] uppercase text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
                >
                See All
                </Link>
              </div>
              </div>
              </div>
      </section>

      {/* ==================== 1031 EXCHANGE SECTION ==================== */}
      {/* Like Carolwood's Forbes Global Properties section */}
      <section className="relative min-h-[500px]">
                          <Image
          src="/locations/1031-exchange-palo-alto-ca.jpg"
          alt="Bay Area property"
                            fill
                            className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        
        <div className="relative z-10 flex min-h-[500px] items-center justify-center px-6 py-20">
          <div className="max-w-2xl text-center bg-white/10 backdrop-blur-md border border-white/20 p-12">
            <div 
              className="text-[28px] md:text-[36px] font-light text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              IRS Section 1031
                        </div>
            <p className="mt-6 text-[14px] md:text-[15px] font-light leading-[1.9] text-white/90">
              Section 1031 of the Internal Revenue Code provides investors the opportunity to defer capital gains taxes when exchanging like-kind investment properties. SF 1031 Exchange is your exclusive partner in the San Francisco Bay Area, connecting you with our network of qualified intermediaries, tax advisors, and replacement properties across all 50 states.
            </p>
            <Link
              href="/services"
              className="inline-block mt-8 px-10 py-4 bg-[#5A2828] text-[11px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
            >
              Learn More
            </Link>
                </div>
                </div>
          </section>

      {/* JSON-LD */}
        <Script
        id="sf-1031-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {jsonLdGraph}
        </Script>
    </div>
  );
}
