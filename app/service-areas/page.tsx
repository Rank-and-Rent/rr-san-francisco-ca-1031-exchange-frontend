import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { locationsData } from "@/data";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import { getLocationImagePath } from "@/lib/image-utils";

export const metadata: Metadata = {
  title: `1031 Exchange Locations Near ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Find 1031 exchange replacement properties in ${PRIMARY_CITY} and surrounding areas. We help investors identify properties across the Bay Area.`,
  alternates: {
    canonical: `${SITE_URL}/service-areas`,
  },
};

export default function LocationsPage() {
  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/locations/1031-exchange-pacific-heights-ca.jpg"
          alt="San Francisco Bay Area"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">
            San Francisco Areas
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-white/80">
            We help investors identify 1031 exchange replacement properties throughout {PRIMARY_CITY} and surrounding areas.
          </p>
        </div>
      </section>

      {/* Locations Grid - Edge to edge like homepage */}
      <section className="py-16 md:py-20">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {locationsData.map((location) => {
              const imagePath = getLocationImagePath(location.slug, location.name, PRIMARY_STATE_ABBR);
              return (
                <Link
                  key={location.slug}
                  href={`/service-areas/${location.slug}`}
                  className="group relative block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={`${imagePath}.jpg`}
                      alt={`${location.name}, ${PRIMARY_STATE_ABBR}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="font-[family-name:var(--font-playfair)] text-[13px] md:text-[16px] font-normal tracking-[0.05em] text-white leading-tight">
                        {location.name.toUpperCase()}
                      </h2>
                      {location.medianPrice && (
                        <p className="mt-1 text-[11px] md:text-[12px] text-white/70">
                          {location.medianPrice}
                        </p>
                      )}
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
          src="/locations/1031-exchange-berkeley-ca.jpg"
          alt="Bay Area"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] uppercase text-white mb-6">
            Ready to Find Replacement Properties?
          </h2>
          <p className="text-[15px] text-white/80 mb-8">
            Contact us to discuss 1031 exchange properties in {PRIMARY_CITY} and surrounding areas.
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
