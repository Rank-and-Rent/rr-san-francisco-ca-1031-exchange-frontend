import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getServiceBySlug,
  getRelatedServices,
  searchServices,
  getServiceDataFromBatches,
} from "@/lib/services";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE_DIGITS,
} from "@/lib/config";
import SearchInput from "@/components/SearchInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import Script from "next/script";

export async function generateStaticParams() {
  const { SERVICES } = await import("@/lib/services");
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | ${SITE_NAME}`,
    description: service.description,
    alternates: {
      canonical: `${SITE_URL}/services/${resolvedParams.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) {
    notFound();
  }

  // Find service data from all batch files
  const serviceData = getServiceDataFromBatches(resolvedParams.slug);

  const relatedServices = getRelatedServices(resolvedParams.slug, 4);
  const query = resolvedSearchParams.q || "";
  const filteredRelated = query
    ? searchServices(query).filter((s) => s.slug !== resolvedParams.slug).slice(0, 4)
    : relatedServices;

  // Use FAQs from batch data or fallback
  const faqs = serviceData?.faqs || [
    {
      question: `How does ${service.title.toLowerCase()} work in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${service.description} Our team coordinates with qualified intermediaries, attorneys, and CPAs throughout ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} to ensure compliance with IRS deadlines and requirements.`,
    },
    {
      question: `What timeline should I expect for ${service.title.toLowerCase()}?`,
      answer: `Timelines vary based on your specific exchange structure and property requirements in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We track your 45 day identification and 180 day closing deadlines to ensure timely completion.`,
    },
    {
      question: `Do you work with qualified intermediaries in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Yes. We coordinate with qualified intermediaries throughout ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} to ensure escrow, legal, and lending workstreams stay synchronized. We are not a Qualified Intermediary ourselves.`,
    },
    {
      question: `How do I get started with ${service.title.toLowerCase()}?`,
      answer: `Contact us to discuss your 1031 exchange goals in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We will review your situation and connect you with qualified intermediaries and tax advisors as needed.`,
    },
  ];

  // Service images mapping for hero
  const SERVICE_HERO_IMAGES: Record<string, string> = {
    "forward-exchange": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    "reverse-exchange": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    "improvement-exchange": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2196&auto=format&fit=crop",
    "dst-investments": "https://images.unsplash.com/photo-1464938050520-ef2571f65114?q=80&w=2074&auto=format&fit=crop",
    "qualified-intermediary": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    "property-identification": "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2187&auto=format&fit=crop",
    "timeline-management": "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2070&auto=format&fit=crop",
    "tax-deferral": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2072&auto=format&fit=crop",
  };

  const heroImage = SERVICE_HERO_IMAGES[resolvedParams.slug] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px]">
        <Image
          src={heroImage}
          alt={service.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[38px] lg:text-[48px] font-normal tracking-[0.08em] uppercase text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${service.slug}` },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
        <div className="mb-12">
          <div
            className="text-[15px] leading-relaxed text-[#555]"
            dangerouslySetInnerHTML={{
              __html: serviceData?.mainDescription || service.description
            }}
          />
        </div>

        {serviceData?.inclusions && serviceData.inclusions.length > 0 && (
          <div className="bg-white border border-[#E5E0D8] p-8 mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#5A2828] mb-6">
              What's Included
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {serviceData.inclusions.map((inclusion: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-[#5A2828]">•</span>
                  <span className="text-[14px] leading-relaxed text-[#555]">
                    {inclusion}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {serviceData?.commonSituations && serviceData.commonSituations.length > 0 && (
          <div className="bg-white border border-[#E5E0D8] p-8 mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#5A2828] mb-6">
              Common Situations
            </h2>
            <ul className="space-y-3">
              {serviceData.commonSituations.map((situation: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-[#5A2828]">•</span>
                  <span className="text-[14px] leading-relaxed text-[#555]">
                    {situation}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

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

        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#2D2D2D] mb-6">
            Related Services
          </h2>
          <div className="mb-6">
            <SearchInput
              placeholder="Search related services..."
              defaultValue={query}
              action={`/services/${resolvedParams.slug}`}
            />
          </div>

          {filteredRelated.length === 0 ? (
            <div className="bg-white border border-[#E5E0D8] p-8 text-center">
              <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#2D2D2D] mb-2">
                We can help with "{query}"
              </h3>
              <p className="text-[14px] text-[#555] mb-4">
                Contact us to discuss your specific service needs.
              </p>
              <Link
                href={`/contact?projectType=${encodeURIComponent(query)}`}
                className="inline-block px-8 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredRelated.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group flex flex-col gap-3 bg-white border border-[#E5E0D8] p-5 hover:border-[#5A2828]/30 transition"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] group-hover:text-[#5A2828] transition">
                    {related.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#666]">
                    {related.shortDescription}
                  </p>
                  <span className="text-[12px] font-medium text-[#5A2828] tracking-wide uppercase">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {serviceData?.exampleCapability && (
          <div className="bg-white border border-[#E5E0D8] p-8 mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#5A2828] mb-4">
              Example Capability
            </h2>
            <p className="text-[12px] italic text-[#888] mb-6">
              {serviceData.exampleCapability.disclaimer}
            </p>
            <div className="space-y-5">
              {serviceData.exampleCapability.location && (
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                    Location
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {serviceData.exampleCapability.location}
                  </p>
                </div>
              )}
              {serviceData.exampleCapability.scope && (
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                    Scope
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {serviceData.exampleCapability.scope}
                  </p>
                </div>
              )}
              {serviceData.exampleCapability.clientSituation && (
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                    Client Situation
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {serviceData.exampleCapability.clientSituation}
                  </p>
                </div>
              )}
              {serviceData.exampleCapability.ourApproach && (
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                    Our Approach
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {serviceData.exampleCapability.ourApproach}
                  </p>
                </div>
              )}
              {serviceData.exampleCapability.expectedOutcome && (
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#2D2D2D] mb-2">
                    Expected Outcome
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {serviceData.exampleCapability.expectedOutcome}
                  </p>
                </div>
              )}
              {serviceData.exampleCapability.contactCTA && (
                <div className="pt-4">
                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {serviceData.exampleCapability.contactCTA}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {serviceData?.complianceNote && (
          <div className="bg-[#F7F5F2] border border-[#E5E0D8] p-6 mb-12">
            <p className="text-[11px] leading-relaxed text-[#888] italic">
              {serviceData.complianceNote}
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-[#D4C4B0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.1em] uppercase text-[#5A2828] mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-[14px] text-[#5A2828]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us to discuss your 1031 exchange needs in {PRIMARY_CITY},{" "}
            {PRIMARY_STATE_ABBR}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/contact?projectType=${encodeURIComponent(service.title)}`}
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
        id={`service-jsonld-${resolvedParams.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          areaServed: {
            "@type": "City",
            name: PRIMARY_CITY,
            addressRegion: PRIMARY_STATE_ABBR,
          },
        })}
      </Script>

      <Script
        id={`breadcrumb-jsonld-${resolvedParams.slug}`}
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
              name: "Services",
              item: `${SITE_URL}/services`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.title,
              item: `${SITE_URL}/services/${resolvedParams.slug}`,
            },
          ],
        })}
      </Script>
    </div>
  );
}

