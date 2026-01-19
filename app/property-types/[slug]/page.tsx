import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPropertyTypeImagePath } from "@/lib/image-utils";

const PROPERTY_TYPES = [
  {
    title: "Multifamily Communities",
    slug: "multifamily",
    imageSlug: "multifamily",
    description: `Stabilized or value-add multifamily communities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with professional management and verified rent rolls.`,
    longDescription: `<p>Multifamily properties represent one of the most popular property types for 1031 exchange investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. These properties include apartment buildings, condominiums, and townhouse complexes that generate rental income from multiple tenants.</p><p>When identifying multifamily replacement properties for your 1031 exchange, we focus on properties with verified rent rolls, professional management, and stable occupancy rates. Multifamily properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} offer investors the opportunity to defer capital gains tax while building a portfolio of income-producing assets.</p><p>Our team helps investors evaluate multifamily properties for their exchange requirements, including property value, debt structure, and timeline compatibility with your 45 day identification and 180 day closing deadlines.</p>`,
    benefits: [
      "Stable rental income from multiple tenants",
      "Professional property management available",
      "Verified rent rolls and occupancy rates",
      "Long-term appreciation potential",
      "Diversification across multiple units",
    ],
  },
  {
    title: "Retail Properties",
    slug: "retail",
    imageSlug: "retail",
    description: `Retail properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with credit tenants and stable income streams.`,
    longDescription: `<p>Retail properties offer 1031 exchange investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} access to commercial real estate with credit tenants and predictable cash flow. These properties include shopping centers, strip malls, and single-tenant retail buildings.</p><p>Retail replacement properties for 1031 exchanges often feature triple net leases where tenants pay property taxes, insurance, and maintenance costs. This structure provides investors with passive income while qualifying for like-kind treatment in their exchange.</p><p>We help investors identify retail properties that meet their exchange requirements, including tenant credit quality, lease terms, and location fundamentals in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} and nationwide.</p>`,
    benefits: [
      "Credit tenants with strong financials",
      "Triple net lease structures available",
      "Predictable cash flow",
      "Prime retail locations",
      "Long-term lease terms",
    ],
  },
  {
    title: "Industrial and R&D",
    slug: "industrial",
    imageSlug: "industrial",
    description: `Distribution, flex, and research facilities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with mission critical tenant improvements.`,
    longDescription: `<p>Industrial and research and development properties provide 1031 exchange investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with opportunities in warehouses, distribution centers, flex spaces, and research facilities. These properties serve essential functions in supply chains and technology sectors.</p><p>Industrial replacement properties often feature mission-critical tenant improvements and long-term leases with credit tenants. Properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} benefit from proximity to major transportation corridors and technology hubs.</p><p>Our team helps investors identify industrial and R&D properties that qualify for like-kind treatment, including properties with specialized improvements, environmental compliance, and strong location fundamentals.</p>`,
    benefits: [
      "Mission-critical tenant improvements",
      "Long-term leases with credit tenants",
      "Essential supply chain functions",
      "Strong location fundamentals",
      "Environmental compliance verified",
    ],
  },
  {
    title: "Medical and Life Science",
    slug: "medical-office",
    imageSlug: "medical-office",
    description: `OSHPD compliant facilities, labs, and life science campuses in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with specialized lease structures.`,
    longDescription: `<p>Medical office buildings and life science facilities represent specialized property types for 1031 exchange investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. These properties include medical office buildings, urgent care centers, dialysis facilities, and research laboratories.</p><p>Medical properties often require OSHPD compliance and specialized lease structures that accommodate healthcare operations. Properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} benefit from proximity to major medical centers and research institutions.</p><p>We help investors identify medical and life science replacement properties that meet their exchange requirements, including compliance verification, lease structure review, and location evaluation near healthcare hubs.</p>`,
    benefits: [
      "OSHPD compliance verified",
      "Specialized lease structures",
      "Proximity to medical centers",
      "Credit healthcare tenants",
      "Long-term stability",
    ],
  },
  {
    title: "Single-Tenant NNN",
    slug: "nnn",
    imageSlug: "nnn",
    description: `Credit-backed, long lease assets in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} that balance cash flow needs for investors.`,
    longDescription: `<p>Single-tenant triple net lease properties provide 1031 exchange investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with opportunities for truly passive income generation requiring little operational oversight. These commercial assets feature corporate-backed tenants who assume responsibility for all property-related expenses including real estate taxes, insurance coverage, and maintenance costs.</p><p>Triple net replacement properties deliver consistent revenue streams and meet IRS like-kind standards for 1031 exchange transactions. Properties available in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} and across the United States enable investors to diversify geographically while preserving tax-deferred investment growth.</p><p>Triple net lease structures come in several forms. Absolute triple net leases represent long-term corporate-guaranteed agreements where tenants cover all expenses including capital improvements, providing investors with virtually no operational duties. Standard triple net leases also feature corporate guarantees but may include provisions where property owners retain limited responsibilities for parking lots, roofs, or structural elements. Triple net ground leases involve land-only arrangements where tenants handle all development, improvement, and operational costs.</p><p>These properties typically house businesses that demonstrate resilience during economic challenges, including essential retailers, discount stores, quick-service restaurants, fuel stations with convenience stores, pharmacies, medical clinics, and other corporate tenants with strong credit profiles. Triple net investments offer advantages including significantly lower tenant default rates, stable property values without dramatic fluctuations, consistent monthly income that escalates over time, and tax optimization opportunities through 1031 exchanges and cost segregation depreciation.</p><p>Our team assists investors in identifying triple net properties featuring corporate credit tenants, extended lease terms spanning 10 to 25-plus years, and strong location fundamentals that align with exchange requirements and investment goals.</p>`,
    benefits: [
      "Corporate tenants with investment-grade credit ratings",
      "Triple net lease arrangements with minimal landlord duties",
      "Virtually hands-off ownership experience",
      "Steady revenue streams with scheduled increases",
      "Nationwide geographic diversification opportunities",
    ],
  },
  {
    title: "Self Storage",
    slug: "self-storage",
    imageSlug: "self-storage",
    description: `Self storage facilities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with verified occupancy rates and revenue streams.`,
    longDescription: `<p>Self storage facilities provide 1031 exchange investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with opportunities in a recession-resistant property type with strong fundamentals. These properties generate income from multiple tenants storing personal and business items.</p><p>Self storage replacement properties offer investors stable cash flow with relatively low operating expenses. Properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} benefit from high population density and strong demand for storage solutions.</p><p>Our team helps investors identify self storage properties with verified occupancy rates, revenue streams, and operational metrics that meet their exchange requirements and investment criteria.</p>`,
    benefits: [
      "Recession-resistant asset class",
      "Verified occupancy rates",
      "Multiple revenue streams",
      "Low operating expenses",
      "Strong demand fundamentals",
    ],
  },
];

function getPropertyTypeBySlug(slug: string) {
  return PROPERTY_TYPES.find((pt) => pt.slug === slug);
}

export async function generateStaticParams() {
  return PROPERTY_TYPES.map((type) => ({
    slug: type.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const propertyType = getPropertyTypeBySlug(resolvedParams.slug);
  
  if (!propertyType) {
    return {
      title: "Property Type Not Found",
    };
  }

  return {
    title: `${propertyType.title} | 1031 Exchange ${PRIMARY_CITY} | ${SITE_NAME}`,
    description: propertyType.description,
    alternates: {
      canonical: `${SITE_URL}/property-types/${resolvedParams.slug}`,
    },
  };
}

export default async function PropertyTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const propertyType = getPropertyTypeBySlug(resolvedParams.slug);

  if (!propertyType) {
    notFound();
  }

  const imagePath = getPropertyTypeImagePath(
    propertyType.imageSlug || propertyType.slug,
    PRIMARY_CITY,
    PRIMARY_STATE_ABBR
  );
  const imageExt = propertyType.imageSlug === "multifamily" ? ".png" : ".jpg";
  const imageSrc = `${imagePath}${imageExt}`;

  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px]">
        <Image
          src={imageSrc}
          alt={propertyType.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[38px] lg:text-[48px] font-normal tracking-[0.1em] uppercase text-white">
            {propertyType.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] md:text-[16px] text-white/80">
            1031 Exchange Properties in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Property Types", href: "/property-types" },
            { label: propertyType.title, href: `/property-types/${propertyType.slug}` },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div className="mb-12">
          <div
            className="text-[15px] leading-relaxed text-[#555]"
            dangerouslySetInnerHTML={{
              __html: propertyType.longDescription,
            }}
          />
        </div>

        {propertyType.benefits && propertyType.benefits.length > 0 && (
          <div className="bg-white border border-[#E5E0D8] p-8 mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[28px] font-normal text-[#5A2828] mb-6">
              Key Benefits
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {propertyType.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-[#5A2828]">•</span>
                  <span className="text-[14px] leading-relaxed text-[#555]">
                    {benefit}
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
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[20px] font-normal text-[#2D2D2D] mb-2">
                What types of {propertyType.title.toLowerCase()} qualify for 1031 exchange treatment in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}?
              </h3>
              <p className="text-[14px] leading-relaxed text-[#555]">
                {propertyType.title} that are held for investment or business use qualify for like-kind treatment in 1031 exchanges. Properties in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} must meet IRS requirements for similar use and hold the same or greater depreciation potential as your relinquished property.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[20px] font-normal text-[#2D2D2D] mb-2">
                How do I identify {propertyType.title.toLowerCase()} replacement properties within 45 days?
              </h3>
              <p className="text-[14px] leading-relaxed text-[#555]">
                We help investors in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} identify {propertyType.title.toLowerCase()} replacement properties during the 45 day identification period. Our team evaluates properties for investment suitability, location quality, and timeline compatibility with your exchange deadlines.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[20px] font-normal text-[#2D2D2D] mb-2">
                Can I identify {propertyType.title.toLowerCase()} properties outside {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}?
              </h3>
              <p className="text-[14px] leading-relaxed text-[#555]">
                Yes, you can identify {propertyType.title.toLowerCase()} replacement properties anywhere in the United States for your 1031 exchange from {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. Like-kind property can be located in any state as long as it meets IRS qualification requirements.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[20px] font-normal text-[#2D2D2D] mb-2">
                How do I coordinate with qualified intermediaries for {propertyType.title.toLowerCase()} exchanges?
              </h3>
              <p className="text-[14px] leading-relaxed text-[#555]">
                We coordinate with qualified intermediaries throughout {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} to ensure escrow, legal, and lending workstreams stay synchronized for {propertyType.title.toLowerCase()} exchanges. While we are not a Qualified Intermediary ourselves, we work closely with QIs to facilitate compliant exchanges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-[#D4C4B0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.1em] uppercase text-[#5A2828] mb-6">
            Find {propertyType.title} Replacement Properties
          </h2>
          <p className="text-[14px] text-[#5A2828]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us to discuss {propertyType.title.toLowerCase()} properties for your 1031 exchange in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/contact?projectType=${encodeURIComponent(propertyType.title)}`}
              className="px-10 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/property-types"
              className="px-10 py-3 border border-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
            >
              View All Property Types
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

