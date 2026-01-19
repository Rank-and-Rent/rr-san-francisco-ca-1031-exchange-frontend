import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE_DIGITS,
} from "@/lib/config";

export const metadata: Metadata = {
  title: `IRS Section 1031 Exchange | ${SITE_NAME}`,
  description: `Learn about IRS Section 1031 tax-deferred exchanges for investment properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Defer capital gains taxes when exchanging like-kind real estate.`,
  alternates: {
    canonical: `${SITE_URL}/irs-section-1031`,
  },
};

const KEY_RULES = [
  {
    title: "Like-Kind Property",
    description: "Both the relinquished and replacement properties must be held for investment or business use. Personal residences do not qualify.",
  },
  {
    title: "45-Day Identification Period",
    description: "You must identify potential replacement properties within 45 days of selling your relinquished property. This deadline is strict and cannot be extended.",
  },
  {
    title: "180-Day Exchange Period",
    description: "The exchange must be completed within 180 days of the sale of the relinquished property, or by the due date of your tax return (with extensions), whichever is earlier.",
  },
  {
    title: "Qualified Intermediary Requirement",
    description: "A qualified intermediary must hold the exchange funds. You cannot touch the proceeds or the exchange will be disqualified.",
  },
  {
    title: "Equal or Greater Value",
    description: "To fully defer capital gains, the replacement property must be of equal or greater value than the relinquished property.",
  },
  {
    title: "Reinvest All Equity",
    description: "All equity from the sale must be reinvested. Any cash received (boot) is taxable.",
  },
];

const FAQS = [
  {
    question: "What is IRS Section 1031?",
    answer: "Section 1031 of the Internal Revenue Code allows investors to defer capital gains taxes when selling investment property, provided they reinvest the proceeds into a like-kind replacement property within specific timeframes.",
  },
  {
    question: "What types of property qualify for a 1031 exchange?",
    answer: "Any real property held for investment or business purposes qualifies. This includes commercial buildings, rental properties, raw land, and certain types of real estate holdings. Personal residences and property held primarily for sale (dealer property) do not qualify.",
  },
  {
    question: "Can I do a 1031 exchange across state lines?",
    answer: "Yes. You can exchange property in one state for property in another state. However, some states have specific rules about withholding or reporting requirements.",
  },
  {
    question: "What happens if I miss the 45-day deadline?",
    answer: "The 45-day identification deadline is strict. If you miss it, the entire exchange fails and you will owe capital gains taxes on the sale of your relinquished property.",
  },
  {
    question: "How much can I save with a 1031 exchange?",
    answer: "Savings depend on your capital gains and tax bracket. Federal capital gains tax can be up to 20%, plus the 3.8% Net Investment Income Tax. California has no special capital gains rate, so gains are taxed as ordinary income up to 13.3%.",
  },
];

export default function IRSSection1031Page() {
  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/locations/1031-exchange-san-francisco-ca.jpg"
          alt="San Francisco skyline"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.08em] uppercase text-white">
            IRS Section 1031
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-white/80">
            Tax-deferred exchanges for investment properties in {PRIMARY_CITY} and nationwide
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] text-[#2D2D2D] mb-6">
              Understanding 1031 Exchanges
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#555] leading-relaxed max-w-3xl mx-auto">
              Section 1031 of the Internal Revenue Code provides investors the opportunity to defer capital gains taxes when exchanging like-kind investment properties. Originally established in 1921, this powerful wealth-building tool has helped generations of investors grow their portfolios by reinvesting equity that would otherwise be lost to taxation.
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-8 md:p-10 mb-12">
            <h3 className="font-[family-name:var(--font-playfair)] text-[22px] md:text-[26px] font-normal text-[#5A2828] mb-4">
              How It Works
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#555] leading-relaxed mb-4">
              When you sell an investment property, you typically owe capital gains taxes on any profit. With a 1031 exchange, you can defer these taxes by reinvesting the proceeds into a new like-kind property. This allows you to preserve your equity and continue building wealth through real estate.
            </p>
            <p className="text-[14px] md:text-[15px] text-[#555] leading-relaxed">
              The exchange must be facilitated by a qualified intermediary who holds the funds between the sale and purchase. Direct receipt of sale proceeds will disqualify the exchange.
            </p>
          </div>
        </div>
      </section>

      {/* Key Rules */}
      <section className="bg-[#5A2828] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] text-white text-center mb-12">
            Key Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {KEY_RULES.map((rule, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-6"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[20px] font-normal text-white mb-3">
                  {rule.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/80 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] text-[#2D2D2D] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-[#E5E0D8] p-6 md:p-8"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[20px] font-normal text-[#5A2828] mb-3">
                  {faq.question}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#555] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#D4C4B0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.1em] uppercase text-[#5A2828] mb-6">
            Start Your 1031 Exchange
          </h2>
          <p className="text-[14px] text-[#5A2828]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact our team to discuss your 1031 exchange property identification needs in {PRIMARY_CITY}. We coordinate with qualified intermediaries, CPAs, and attorneys to help you navigate the exchange process.
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
              Call {PHONE_DIGITS.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-[#F7F5F2] py-8 border-t border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[10px] text-[#888] leading-relaxed text-center">
            This information is provided for educational purposes only and does not constitute tax or legal advice. SF 1031 Exchange is not a qualified intermediary, tax advisor, or legal counsel. Please consult with qualified professionals before proceeding with any 1031 exchange transaction.
          </p>
        </div>
      </section>
    </div>
  );
}
