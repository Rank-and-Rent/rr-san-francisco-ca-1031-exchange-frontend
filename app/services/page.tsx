import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

export const metadata: Metadata = {
  title: `1031 Exchange Services in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Comprehensive 1031 exchange services for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} investors. Property identification, timeline management, and compliance support.`,
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
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

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-white border border-[#E5E0D8] p-8 hover:border-[#5A2828] transition-colors"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-[20px] md:text-[22px] font-normal text-[#333] group-hover:text-[#5A2828] transition-colors mb-4">
                  {service.name}
                </h2>
                <p className="text-[14px] text-[#666] leading-relaxed mb-6">
                  {service.short}
                </p>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A2828]">
                  Learn More
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
