import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

export const metadata: Metadata = {
  title: `1031 Exchange Services in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Comprehensive 1031 exchange services for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} investors. Property identification, timeline management, and compliance support.`,
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

// Service images mapping
const SERVICE_IMAGES: Record<string, string> = {
  "forward-exchange": "/locations/1031-exchange-pacific-heights-ca.jpg",
  "reverse-exchange": "/locations/1031-exchange-marina-district-ca.jpg",
  "improvement-exchange": "/locations/1031-exchange-soma-ca.jpg",
  "dst-investments": "/locations/1031-exchange-financial-district-ca.jpg",
  "qualified-intermediary": "/locations/1031-exchange-palo-alto-ca.jpg",
  "property-identification": "/locations/1031-exchange-oakland-ca.jpg",
  "timeline-management": "/locations/1031-exchange-mission-bay-ca.jpg",
  "tax-deferral": "/locations/1031-exchange-berkeley-ca.jpg",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/locations/1031-exchange-financial-district-ca.jpg"
          alt="San Francisco Financial District"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">
            1031 Exchange Services
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-white/80">
            Comprehensive property identification and exchange coordination services for investors in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
        </div>
      </section>

      {/* Services Grid - Mirror Locations Aesthetic */}
      <section className="py-16 md:py-20">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {servicesData.map((service) => {
              const imageSrc = SERVICE_IMAGES[service.slug] || "/locations/1031-exchange-pacific-heights-ca.jpg";
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="font-[family-name:var(--font-playfair)] text-[13px] md:text-[16px] font-normal tracking-[0.05em] text-white leading-tight mb-1">
                        {service.name}
                      </h2>
                      <p className="text-[10px] md:text-[11px] text-white/70 line-clamp-2 hidden md:block">
                        {service.short}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <Image
          src="/locations/1031-exchange-palo-alto-ca.jpg"
          alt="Bay Area property"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] uppercase text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-[15px] text-white/80 mb-8">
            Contact us to discuss your 1031 exchange needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
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
