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
import { locationsData, poshNeighborhoods } from "@/data/locations";

// Hero images for the carousel
const HERO_IMAGES = [
  {
    src: "/san-francisco-hero.jpg",
    alt: "San Francisco skyline at dusk",
  },
  {
    src: "/locations/1031-exchange-pacific-heights-ca.jpg",
    alt: "Pacific Heights luxury real estate",
  },
  {
    src: "/locations/1031-exchange-marina-district-ca.jpg",
    alt: "Marina District waterfront properties",
  },
];

// Stats for the hero section
const HERO_STATS = [
  { value: "$850M", label: "Exchange Volume" },
  { value: "500+", label: "Exchanges Completed" },
  { value: "$2.1B", label: "Properties Identified" },
];

// Property types we handle (like the "Featured In" logos but for property types)
const PROPERTY_TYPES_SHOWCASE = [
  { name: "NNN", description: "Triple Net Lease" },
  { name: "RESIDENTIAL", description: "Single & Multi-Family" },
  { name: "COMMERCIAL", description: "Office & Retail" },
  { name: "INDUSTRIAL", description: "Warehouse & Flex" },
  { name: "MULTIFAMILY", description: "Apartments" },
  { name: "MEDICAL", description: "Healthcare Facilities" },
  { name: "SELF STORAGE", description: "Storage Units" },
];

// San Francisco premium areas for the carousel
const SF_PREMIUM_AREAS = [
  {
    slug: "pacific-heights-ca",
    name: "Pacific Heights",
    price: "$5.2M Average",
    image: "/locations/1031-exchange-pacific-heights-ca.jpg",
  },
  {
    slug: "marina-district-ca",
    name: "Marina District",
    price: "$2.8M Average",
    image: "/locations/1031-exchange-marina-district-ca.jpg",
  },
  {
    slug: "financial-district-ca",
    name: "Financial District",
    price: "$1.8M Average",
    image: "/locations/1031-exchange-financial-district-ca.jpg",
  },
  {
    slug: "soma-ca",
    name: "SOMA",
    price: "$1.5M Average",
    image: "/locations/1031-exchange-soma-ca.jpg",
  },
  {
    slug: "mission-bay-ca",
    name: "Mission Bay",
    price: "$1.6M Average",
    image: "/locations/1031-exchange-mission-bay-ca.jpg",
  },
  {
    slug: "palo-alto-ca",
    name: "Palo Alto",
    price: "$3.8M Average",
    image: "/locations/1031-exchange-palo-alto-ca.jpg",
  },
  {
    slug: "oakland-ca",
    name: "Oakland",
    price: "$980K Average",
    image: "/locations/1031-exchange-oakland-ca.jpg",
  },
  {
    slug: "berkeley-ca",
    name: "Berkeley",
    price: "$1.2M Average",
    image: "/locations/1031-exchange-berkeley-ca.jpg",
  },
];

// FAQs for structured data
const FAQS = [
  {
    question: "What are the 45 and 180 day rules?",
    answer: "Day 0 begins when you close on the relinquished property. You must identify replacement property in writing to your qualified intermediary by midnight of Day 45, and you must close on the selected property by midnight of Day 180.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer: "Real property held for investment or productive use in a trade or business qualifies for like-kind treatment when exchanged for other real property with the same intent.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer: "Boot is any cash, debt relief, or non-like-kind value received during the exchange. Boot is taxable as capital gain in the year of the exchange.",
  },
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Carousel navigation
  const scrollCarousel = useCallback((direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const newScroll = direction === "left" 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    }
  }, []);

  // JSON-LD structured data
  const jsonLdGraph = useMemo(() => {
    const faqEntities = FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: PHONE_DIGITS,
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: PHONE_DIGITS,
              contactType: "customer service",
              areaServed: "US-CA",
              availableLanguage: ["English"],
            },
          ],
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
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: faqEntities,
        },
        {
          "@type": "RealEstateAgent",
          name: SITE_NAME,
          url: SITE_URL,
          description: "San Francisco 1031 Exchange specialists helping investors defer capital gains through like-kind property exchanges.",
          areaServed: {
            "@type": "State",
            name: "California",
          },
          knowsAbout: [
            "1031 Exchange",
            "Like-Kind Exchange",
            "Tax Deferred Exchange",
            "Qualified Intermediary Coordination",
            "Investment Property",
          ],
        },
      ],
    });
  }, []);

  return (
    <>
      {/* Hero Section - Full viewport height with image carousel */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        {/* Background Image Carousel */}
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? "opacity-100" : "opacity-0"
            }`}
          >
              <Image
              src={image.src}
              alt={image.alt}
                fill
              className="object-cover animate-kenburns"
              priority={index === 0}
                sizes="100vw"
              />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
            </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="font-['Playfair_Display',Georgia,serif] text-4xl font-light uppercase tracking-[0.15em] md:text-5xl lg:text-6xl">
              Premier 1031 Exchange Services
              </h1>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-white/90 md:text-lg">
              Exclusive property identification and qualified intermediary coordination for San Francisco Bay Area investors seeking tax-deferred exchanges.
            </p>
              </div>

          {/* Stats Bar */}
          <div className="absolute bottom-0 left-0 right-0 glass-panel">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 px-8 py-8 md:flex-row md:gap-16">
              {HERO_STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    index < HERO_STATS.length - 1
                      ? "md:border-r md:border-white/20 md:pr-16"
                      : ""
                  }`}
                >
                  <div className="font-['Playfair_Display',Georgia,serif] text-3xl font-light text-white md:text-4xl">
                    {stat.value}
              </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                    {stat.label}
              </div>
              </div>
              ))}
              </div>
            {/* Scroll indicator */}
            <div className="flex justify-center pb-6">
              <button
                onClick={() => {
                  document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white/60 transition-colors hover:text-white"
                aria-label="Scroll down"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
                </div>
              </div>
        </div>
          </section>

      {/* About Section */}
      <section id="about-section" className="relative min-h-[600px] overflow-hidden">
        <Image
          src="/locations/1031-exchange-san-francisco-ca.jpg"
          alt="San Francisco real estate"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 flex min-h-[600px] items-center justify-center px-6 py-20">
          <div className="max-w-3xl space-y-6 text-center text-white">
            <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl font-light uppercase tracking-[0.1em] md:text-5xl">
              SF 1031 Exchange
            </h2>
            <p className="text-base font-light leading-relaxed text-white/90 md:text-lg">
              SF 1031 Exchange is a boutique property identification and exchange coordination firm based in San Francisco, founded by an organic collaboration of highly successful real estate and tax professionals. Leveraging our stellar network and supported by the most refined resources in the industry, SF 1031 Exchange is driven by an unrelenting focus on discretion, transactional excellence and exceeding client expectation.
                </p>
              </div>
              </div>
      </section>

      {/* Property Types Showcase - Like "Featured In" */}
      <section className="bg-[#F7F5F2] py-16">
        <div className="mx-auto max-w-[1400px] px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#6E6E6E]">
              Property Types
            </span>
            {PROPERTY_TYPES_SHOWCASE.map((type) => (
              <div
                key={type.name}
                className="text-center"
              >
                <span className="font-['Playfair_Display',Georgia,serif] text-xl font-light text-[#4A4A4A] md:text-2xl">
                  {type.name}
                </span>
              </div>
                ))}
              </div>
              </div>
          </section>

      {/* San Francisco Areas Carousel - Like "Carolwood Sold" */}
      <section className="bg-[#F7F5F2] py-20">
        <div className="mx-auto max-w-[1400px] px-8">
          <h2 className="mb-12 text-center font-['Playfair_Display',Georgia,serif] text-3xl font-light uppercase tracking-[0.15em] text-[#2D2D2D] md:text-4xl">
            San Francisco Areas
          </h2>

          {/* Carousel */}
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {SF_PREMIUM_AREAS.map((area) => (
                    <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group relative flex-shrink-0"
                >
                  <div className="relative h-[400px] w-[350px] overflow-hidden md:h-[500px] md:w-[450px]">
                            <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 350px, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl font-light uppercase tracking-wide text-white">
                        {area.name}
                      </h3>
                      <p className="mt-1 text-sm text-white/80">{area.price}</p>
                          </div>
                      </div>
                    </Link>
              ))}
              </div>

            {/* Carousel Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="flex h-10 w-10 items-center justify-center border border-[#5A2828] text-[#5A2828] transition-colors hover:bg-[#5A2828] hover:text-white"
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                      </svg>
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="flex h-10 w-10 items-center justify-center border border-[#5A2828] text-[#5A2828] transition-colors hover:bg-[#5A2828] hover:text-white"
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                      </svg>
                </button>
                    </div>
                <Link
                href="/service-areas"
                className="border border-[#5A2828] px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] text-[#5A2828] transition-colors hover:bg-[#5A2828] hover:text-white"
                >
                See All
                </Link>
              </div>
              </div>
              </div>
      </section>

      {/* 1031 Exchange Partnership Section - Like Forbes Section */}
      <section className="relative min-h-[500px] overflow-hidden">
                          <Image
          src="/locations/1031-exchange-palo-alto-ca.jpg"
          alt="Bay Area luxury property"
                            fill
                            className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div className="relative z-10 flex min-h-[500px] items-center justify-center px-6 py-20">
          <div className="glass-panel max-w-2xl space-y-6 p-12 text-center">
            <div className="font-['Playfair_Display',Georgia,serif] text-3xl font-light text-white">
              IRS Section 1031
                        </div>
            <p className="text-sm font-light leading-relaxed text-white/90">
              Section 1031 of the Internal Revenue Code provides investors the opportunity to defer capital gains taxes when exchanging like-kind investment properties. SF 1031 Exchange is your exclusive partner in the San Francisco Bay Area, connecting you with our network of qualified intermediaries, tax advisors, and replacement properties across all 50 states.
            </p>
            <Link
              href="/services"
              className="inline-block bg-[#5A2828] px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#4A1F1F]"
            >
              Learn More
            </Link>
                  </div>
                </div>
          </section>

      {/* Services Overview */}
      <section className="bg-[#F7F5F2] py-20">
        <div className="mx-auto max-w-[1400px] px-8">
          <h2 className="mb-12 text-center font-['Playfair_Display',Georgia,serif] text-3xl font-light uppercase tracking-[0.15em] text-[#2D2D2D] md:text-4xl">
            Our Services
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Property Identification",
                description: "We identify replacement properties nationwide that meet your investment criteria and IRS like-kind requirements within the critical 45-day window.",
                href: "/services",
              },
              {
                title: "QI Coordination",
                description: "Seamless coordination between your Qualified Intermediary, escrow, title, lenders, and CPA to keep your exchange compliant.",
                href: "/services",
              },
              {
                title: "Exchange Structuring",
                description: "Expert guidance on forward, reverse, and improvement exchanges tailored to your specific investment goals.",
                href: "/services",
              },
              {
                title: "Due Diligence Support",
                description: "Comprehensive property analysis including financials, environmental reviews, and market assessments.",
                href: "/services",
              },
              {
                title: "Timeline Management",
                description: "Rigorous tracking of the 45-day identification and 180-day closing deadlines to ensure IRS compliance.",
                href: "/services",
              },
              {
                title: "Tax Advisory Network",
                description: "Access to our network of CPAs and tax attorneys specializing in real estate and 1031 exchanges.",
                href: "/services",
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group border border-[#E5E0D8] bg-white p-8 transition-all duration-300 hover:border-[#5A2828] hover:shadow-lg"
              >
                <h3 className="mb-4 font-['Playfair_Display',Georgia,serif] text-xl font-light text-[#2D2D2D] group-hover:text-[#5A2828]">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6E6E6E]">
                  {service.description}
                </p>
              </Link>
            ))}
              </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-block border border-[#5A2828] px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#5A2828] transition-colors hover:bg-[#5A2828] hover:text-white"
            >
              View All Services
            </Link>
                        </div>
                    </div>
          </section>

      {/* Tools Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-8">
          <h2 className="mb-4 text-center font-['Playfair_Display',Georgia,serif] text-3xl font-light uppercase tracking-[0.15em] text-[#2D2D2D] md:text-4xl">
            Exchange Tools
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-[#6E6E6E]">
            Interactive calculators to help you plan and execute your 1031 exchange with confidence.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Boot Calculator",
                description: "Calculate boot and estimate tax implications for your 1031 exchange.",
                href: "/tools/boot-calculator",
              },
              {
                title: "Exchange Cost Estimator",
                description: "Calculate QI fees, escrow costs, title insurance, and recording fees.",
                href: "/tools/exchange-cost-estimator",
              },
              {
                title: "Identification Rules Checker",
                description: "Validate your property identification against IRS rules.",
                href: "/tools/identification-rules-checker",
              },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group bg-[#5A2828] p-8 text-white transition-all duration-300 hover:bg-[#4A1F1F]"
              >
                <h3 className="mb-4 font-['Playfair_Display',Georgia,serif] text-xl font-light">
                  {tool.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {tool.description}
                </p>
              </Link>
            ))}
              </div>

          <div className="mt-12 text-center">
            <Link
              href="/tools"
              className="inline-block border border-[#5A2828] px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#5A2828] transition-colors hover:bg-[#5A2828] hover:text-white"
            >
              View All Tools
            </Link>
                </div>
                </div>
          </section>

      {/* CTA Section */}
      <section className="bg-[#5A2828] py-20">
        <div className="mx-auto max-w-3xl px-8 text-center text-white">
          <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
            Ready to Begin Your Exchange?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/80">
            Our San Francisco team specializes in 1031 exchanges for discerning investors. Contact us for a confidential consultation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-block border border-white px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-white hover:text-[#5A2828]"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${PHONE_DIGITS}`}
              className="inline-block bg-white px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#5A2828] transition-colors hover:bg-[#F7F5F2]"
            >
              Call (415) 917-2994
                </a>
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
    </>
  );
}
