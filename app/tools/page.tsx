import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/config";

export const metadata: Metadata = {
  title: `1031 Exchange Tools & Calculators | ${SITE_NAME}`,
  description: `Free interactive 1031 exchange calculators and tools for investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Calculate boot, exchange costs, and validate identification rules.`,
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
};

const TOOLS = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange.",
    icon: "calculator",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange.",
    icon: "dollar",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your property identification against the 3-property, 200%, and 95% identification rules.",
    icon: "checklist",
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/locations/1031-exchange-mission-bay-ca.jpg"
          alt="1031 Exchange Tools"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">
            Exchange Tools
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-white/80">
            Interactive calculators and tools for {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} investors.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block bg-white border border-[#E5E0D8] p-8 hover:border-[#5A2828] transition-colors text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center border border-[#E5E0D8] text-[#5A2828] group-hover:border-[#5A2828] transition-colors">
                    {tool.icon === "calculator" && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <path d="M8 6h8" />
                        <path d="M8 10h8" />
                        <path d="M8 14h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 18h.01" />
                        <path d="M12 18h.01" />
                        <path d="M16 18h.01" />
                      </svg>
                    )}
                    {tool.icon === "dollar" && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    )}
                    {tool.icon === "checklist" && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    )}
                  </div>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#333] group-hover:text-[#5A2828] transition-colors mb-4">
                  {tool.name}
                </h2>
                <p className="text-[14px] text-[#666] leading-relaxed mb-6">
                  {tool.description}
                </p>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A2828]">
                  Try It Now
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <Image
          src="/locations/1031-exchange-palo-alto-ca.jpg"
          alt="Bay Area"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] uppercase text-white mb-6">
            Need Expert Guidance?
          </h2>
          <p className="text-[15px] text-white/80 mb-8">
            These tools provide estimates only. Contact us to discuss your specific 1031 exchange needs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
