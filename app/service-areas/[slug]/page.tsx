import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLocationBySlug, getLocationDataFromBatches } from "@/lib/locations";
import { locationsData } from "@/data";
import { servicesData } from "@/data";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE_DIGITS,
} from "@/lib/config";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getLocationImagePath } from "@/lib/image-utils";

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);
  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `1031 Exchange Properties in ${location.name}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    description: `Find 1031 exchange replacement properties in ${location.name}, ${PRIMARY_STATE_ABBR}.`,
    alternates: {
      canonical: `${SITE_URL}/service-areas/${resolvedParams.slug}`,
    },
  };
}

export default async function LocationPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);
  if (!location) {
    notFound();
  }

  // Find location data from all batch files
  const locationData = getLocationDataFromBatches(resolvedParams.slug);

  // Get services and property types related to this location's popular paths
  const popularPaths = locationData?.popularPaths || [];
  const locationServices = popularPaths
    .filter((path: any) => path.type === "service")
    .slice(0, 6)
    .map((path: any) => {
      const service = servicesData.find((s) => s.slug === path.slug);
      return service
        ? {
            slug: service.slug,
            name: service.name,
            short: service.short,
            whyPopular: path.whyPopular,
          }
        : null;
    })
    .filter((s: { slug: string; name: string; short: string; whyPopular?: string } | null): s is { slug: string; name: string; short: string; whyPopular?: string } => s !== null);

  // Use FAQs from batch data or fallback
  const faqs = locationData?.faqs || [
    {
      question: `What types of 1031 exchange properties are available in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${location.name}, ${PRIMARY_STATE_ABBR} offers various replacement property options including multifamily, industrial, retail, and mixed use assets. We help investors identify properties that meet their exchange requirements and timeline.`,
    },
    {
      question: `How do I identify replacement properties in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `We help investors in ${location.name}, ${PRIMARY_STATE_ABBR} identify replacement properties that qualify for 1031 exchange treatment. Our team coordinates with qualified intermediaries and local brokers to source suitable assets.`,
    },
    {
      question: `What are the 45 and 180 day deadlines for exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `The 45 day identification and 180 day closing deadlines apply to all 1031 exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}. We track these deadlines and coordinate with qualified intermediaries to ensure compliance.`,
    },
    {
      question: `Do you work with qualified intermediaries in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Yes. We coordinate with qualified intermediaries throughout ${location.name}, ${PRIMARY_STATE_ABBR} to ensure escrow, legal, and lending workstreams stay synchronized. We are not a Qualified Intermediary ourselves.`,
    },
  ];

  const imagePath = getLocationImagePath(resolvedParams.slug, location.name, PRIMARY_STATE_ABBR);

  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px]">
        <Image
          src={`${imagePath}.jpg`}
          alt={`${location.name}, ${PRIMARY_STATE_ABBR} - 1031 Exchange Properties`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[38px] lg:text-[48px] font-normal tracking-[0.1em] uppercase text-white">
            {location.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] md:text-[16px] text-white/80">
            1031 Exchange Properties in {location.name}, {PRIMARY_STATE_ABBR}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: location.name, href: `/service-areas/${location.slug}` },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
        <div className="mb-12">
          {locationData?.mainDescription ? (
            <div
              className="text-[15px] leading-relaxed text-[#555]"
              dangerouslySetInnerHTML={{
                __html: locationData.mainDescription,
              }}
            />
          ) : (
            <p className="text-[15px] leading-relaxed text-[#555]">
              Find 1031 exchange replacement properties in {location.name}, {PRIMARY_STATE_ABBR}. We help investors identify properties across the Bay Area and nationwide.
            </p>
          )}
        </div>

        <div className="bg-white border border-[#E5E0D8] p-8 mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#5A2828] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq: { question: string; answer: string }, index: number) => (
              <div key={index}>
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[20px] font-normal text-[#2D2D2D] mb-2">
                  {faq.question}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#555]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {popularPaths.length > 0 && (
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#2D2D2D] mb-6">
              Popular Property Paths in {location.name}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {popularPaths.slice(0, 6).map((path: any, index: number) => {
                if (path.type === "service") {
                  const service = servicesData.find((s) => s.slug === path.slug);
                  if (!service) return null;
                  return (
                    <Link
                      key={`service-${path.slug}`}
                      href={`/services/${service.slug}`}
                      className="group flex flex-col gap-3 bg-white border border-[#E5E0D8] p-5 hover:border-[#5A2828]/30 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center bg-[#5A2828]/10 text-[12px] font-medium text-[#5A2828]">
                          {path.rank}
                        </span>
                        <h3 className="font-[family-name:var(--font-playfair)] text-[16px] font-normal text-[#2D2D2D] group-hover:text-[#5A2828] transition">
                          {path.name}
                        </h3>
                      </div>
                      {path.whyPopular && (
                        <p className="text-[13px] leading-relaxed text-[#666]">
                          {path.whyPopular}
                        </p>
                      )}
                      <span className="text-[12px] font-medium text-[#5A2828] tracking-wide uppercase">
                        Learn more →
                      </span>
                    </Link>
                  );
                }
                // Handle property types
                return (
                  <div
                    key={`property-${path.slug}-${index}`}
                    className="flex flex-col gap-3 bg-white border border-[#E5E0D8] p-5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center bg-[#5A2828]/10 text-[12px] font-medium text-[#5A2828]">
                        {path.rank}
                      </span>
                      <h3 className="font-[family-name:var(--font-playfair)] text-[16px] font-normal text-[#2D2D2D]">
                        {path.name}
                      </h3>
                    </div>
                    {path.whyPopular && (
                      <p className="text-[13px] leading-relaxed text-[#666]">
                        {path.whyPopular}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {locationData?.exampleCapability && (
          <div className="bg-white border border-[#E5E0D8] p-8 mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#5A2828] mb-4">
              Example Capability
            </h2>
            <p className="text-[12px] italic text-[#888] mb-6">
              {locationData.exampleCapability.disclaimer}
            </p>
            <div className="space-y-5">
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                  Situation
                </h3>
                <p className="text-[14px] leading-relaxed text-[#555]">
                  {locationData.exampleCapability.situation}
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                  Our Approach
                </h3>
                <p className="text-[14px] leading-relaxed text-[#555]">
                  {locationData.exampleCapability.ourApproach}
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                  Expected Outcome
                </h3>
                <p className="text-[14px] leading-relaxed text-[#555]">
                  {locationData.exampleCapability.expectedOutcome}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CTA Section */}
      <section className="bg-[#D4C4B0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.1em] uppercase text-[#5A2828] mb-6">
            Find Replacement Properties in {location.name}
          </h2>
          <p className="text-[14px] text-[#5A2828]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us to discuss 1031 exchange properties in {location.name}, {PRIMARY_STATE_ABBR}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${PHONE_DIGITS}`}
              className="px-10 py-3 border border-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Script
        id={`location-jsonld-${resolvedParams.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Place",
          name: `${location.name}, ${PRIMARY_STATE_ABBR}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: location.name,
            addressRegion: PRIMARY_STATE_ABBR,
            addressCountry: "US",
          },
        })}
      </Script>

      <Script
        id={`breadcrumb-location-jsonld-${resolvedParams.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Service Areas",
              item: `${SITE_URL}/service-areas`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: location.name,
              item: `${SITE_URL}/service-areas/${resolvedParams.slug}`,
            },
          ],
        })}
      </Script>
    </div>
  );
}

