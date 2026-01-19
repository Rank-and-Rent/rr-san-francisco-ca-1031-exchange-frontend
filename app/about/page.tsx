import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: `Learn how ${SITE_NAME} helps investors identify 1031 exchange replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
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
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">
            About Us
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] uppercase text-[#333] mb-6">
              Our Focus
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.9]">
              This site is focused on helping you identify potential replacement properties for Section 1031 exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. We provide property identification services, timeline management, and coordination support throughout the exchange process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#333] mb-4">
                What We Do
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.8] mb-4">
                We help investors find replacement properties that qualify for 1031 exchange treatment. Our team sources properties across asset types including multifamily, industrial, retail, medical office, self storage, net lease, and mixed use properties in {PRIMARY_CITY} and surrounding areas.
              </p>
              <p className="text-[14px] text-[#666] leading-[1.8]">
                We coordinate with qualified intermediaries, attorneys, and CPAs to ensure your exchange stays compliant with IRS deadlines and requirements. We track your 45 day identification and 180 day closing milestones.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#333] mb-4">
                What We Are Not
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.8]">
                We are not a Qualified Intermediary. We are not a law firm. We are not a broker. We are not a CPA firm. We help you identify properties and coordinate with third party qualified intermediaries, lenders, and tax advisors.
              </p>
            </div>
          </div>

          <div className="border-t border-[#E5E0D8] pt-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#333] mb-4">
                  Property Matching
                </h3>
                <p className="text-[14px] text-[#666] leading-[1.8]">
                  We review your exchange requirements and source properties that meet your criteria. We provide property summaries, rent roll verification, operating statement review, and market comparable analysis. We coordinate with brokers, qualified intermediaries, and lenders to facilitate due diligence and closing.
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#333] mb-4">
                  Third Party Coordination
                </h3>
                <p className="text-[14px] text-[#666] leading-[1.8]">
                  We coordinate with qualified intermediaries to ensure escrow, legal, and lending workstreams stay synchronized. We work with lenders to support preflight and underwriting requirements. We coordinate with attorneys and CPAs to ensure compliance with IRS deadlines and reporting requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <Image
          src="/locations/1031-exchange-marina-district-ca.jpg"
          alt="Bay Area"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] uppercase text-white mb-6">
            Ready to Begin Your Exchange?
          </h2>
          <p className="text-[15px] text-white/80 mb-8">
            Contact us to discuss your 1031 exchange property identification needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
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
