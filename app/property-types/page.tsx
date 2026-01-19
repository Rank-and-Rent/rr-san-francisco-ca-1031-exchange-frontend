import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
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
    title: "Multifamily Communities",
    slug: "multifamily",
    imageSlug: "multifamily",
    description: `Stabilized or value-add multifamily communities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with professional management and verified rent rolls.`,
  },
  {
    title: "Retail Properties",
    slug: "retail",
    imageSlug: "retail",
    description: `Retail properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with credit tenants and stable income streams.`,
  },
  {
    title: "Industrial and R&D",
    slug: "industrial",
    imageSlug: "industrial",
    description: `Distribution, flex, and research facilities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with mission critical tenant improvements.`,
  },
  {
    title: "Medical and Life Science",
    slug: "medical-office",
    imageSlug: "medical-office",
    description: `OSHPD compliant facilities, labs, and life science campuses in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with specialized lease structures.`,
  },
  {
    title: "Single-Tenant NNN",
    slug: "nnn",
    imageSlug: "nnn",
    description: `Credit-backed, long lease assets in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} that balance cash flow needs for investors.`,
  },
  {
    title: "Self Storage",
    slug: "self-storage",
    imageSlug: "self-storage",
    description: `Self storage facilities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with verified occupancy rates and revenue streams.`,
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

      {/* Property Types Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROPERTY_TYPES.map((type) => {
              const imagePath = getPropertyTypeImagePath(type.imageSlug || type.slug, PRIMARY_CITY, PRIMARY_STATE_ABBR);
              const imageExt = type.imageSlug === 'multifamily' ? '.png' : '.jpg';
              const imageSrc = `${imagePath}${imageExt}`;
              
              return (
                <Link
                  key={type.slug}
                  href={`/property-types/${type.slug}`}
                  className="group block bg-white border border-[#E5E0D8] overflow-hidden hover:border-[#5A2828] transition-colors"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={type.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#333] group-hover:text-[#5A2828] transition-colors mb-3">
                      {type.title}
                    </h2>
                    <p className="text-[14px] text-[#666] leading-relaxed mb-4">
                      {type.description}
                    </p>
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A2828]">
                      Learn More
                    </span>
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
