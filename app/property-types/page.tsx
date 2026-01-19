import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import { getPropertyTypeImagePath } from "@/lib/image-utils";

export const metadata: Metadata = {
  title: `1031 Exchange Property Types in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Explore property types eligible for 1031 exchange treatment in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Multifamily, industrial, retail, medical office, and more.`,
  alternates: {
    canonical: `${SITE_URL}/property-types`,
  },
};

const PROPERTY_TYPES = [
  {
    title: "SINGLE-TENANT NNN",
    slug: "nnn",
    imageSlug: "nnn",
    description: `Credit-backed, long lease assets that balance cash flow needs.`,
  },
  {
    title: "MULTIFAMILY",
    slug: "multifamily",
    imageSlug: "multifamily",
    description: `Stabilized or value-add multifamily communities with professional management.`,
  },
  {
    title: "COMMERCIAL",
    slug: "retail",
    imageSlug: "retail",
    description: `Retail properties with credit tenants and stable income streams.`,
  },
  {
    title: "INDUSTRIAL",
    slug: "industrial",
    imageSlug: "industrial",
    description: `Distribution, flex, and research facilities with mission critical tenant improvements.`,
  },
  {
    title: "MEDICAL",
    slug: "medical-office",
    imageSlug: "medical-office",
    description: `OSHPD compliant facilities, labs, and life science campuses.`,
  },
  {
    title: "SELF STORAGE",
    slug: "self-storage",
    imageSlug: "self-storage",
    description: `Self storage facilities with verified occupancy rates and revenue streams.`,
  },
  {
    title: "RESIDENTIAL",
    slug: "residential",
    imageSlug: "multifamily",
    description: `Single-family and multi-family residential investment properties.`,
  },
  {
    title: "MIXED USE",
    slug: "mixed-use",
    imageSlug: "retail",
    description: `Combined residential and commercial properties in prime locations.`,
  },
];

export default function PropertyTypesPage() {
  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/property-types/1031-exchange-industrial-san-francisco-ca.jpg"
          alt="Property Types for 1031 Exchange"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">
            Property Types
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-white/80">
            Explore property types eligible for 1031 exchange treatment in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
        </div>
      </section>

      {/* Property Types Grid - Matching locations aesthetic */}
      <section className="py-16 md:py-20">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {PROPERTY_TYPES.map((type) => {
              const imagePath = getPropertyTypeImagePath(type.imageSlug || type.slug, PRIMARY_CITY, PRIMARY_STATE_ABBR);
              const imageExt = type.imageSlug === 'multifamily' ? '.png' : '.jpg';
              const imageSrc = `${imagePath}${imageExt}`;
              
              return (
                <Link
                  key={type.slug}
                  href={`/property-types/${type.slug}`}
                  className="group relative block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={type.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="font-[family-name:var(--font-playfair)] text-[13px] md:text-[16px] font-normal tracking-[0.05em] text-white leading-tight mb-1">
                        {type.title}
                      </h2>
                      <p className="text-[10px] md:text-[11px] text-white/70 line-clamp-2 hidden md:block">
                        {type.description}
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
          src="/locations/1031-exchange-oakland-ca.jpg"
          alt="Bay Area"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] uppercase text-white mb-6">
            Ready to Find Your Replacement Property?
          </h2>
          <p className="text-[15px] text-white/80 mb-8">
            Contact us to discuss property types for your 1031 exchange in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
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
