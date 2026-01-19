"use client";

import Link from "next/link";
import { PHONE, PHONE_DIGITS, EMAIL, OFFICE_ADDRESS, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import { SERVICES } from "@/lib/services";
import { locationsData } from "@/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Get first 10 services for display
  const displayServices = SERVICES.slice(0, 10);
  const totalServices = SERVICES.length;
  
  // Get first 10 locations for display
  const displayLocations = locationsData.slice(0, 10);
  const totalLocations = locationsData.length;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed`;

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Contact</h3>
            <div className="space-y-4">
              <p className="font-[family-name:var(--font-playfair)] text-lg text-white">
                1031 Exchange {PRIMARY_CITY}
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {OFFICE_ADDRESS}
              </p>
              <div className="space-y-2 pt-2">
                <a href={`tel:${PHONE_DIGITS}`} className="block text-sm text-white/70 hover:text-[#C4A87C] transition-colors">
                  {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`} className="block text-sm text-white/70 hover:text-[#C4A87C] transition-colors">
                  {EMAIL}
                </a>
                <p className="text-sm text-white/70">Mon-Fri: 9am-5pm PST</p>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Services</h3>
            <ul className="space-y-2">
              {displayServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="text-sm text-[#C4A87C] hover:text-white transition-colors">
                  View All {totalServices} Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Locations</h3>
            <ul className="space-y-2">
              {displayLocations.map((location) => (
                <li key={location.slug}>
                  <Link href={`/service-areas/${location.slug}`} className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">
                    {location.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/service-areas" className="text-sm text-[#C4A87C] hover:text-white transition-colors">
                  View All {totalLocations} Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Tools Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Quick Links</h3>
            <ul className="space-y-2 mb-8">
              <li><Link href="/property-types" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Property Types</Link></li>
              <li><Link href="/blog" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Contact</Link></li>
            </ul>

            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/tools/boot-calculator" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Boot Calculator</Link></li>
              <li><Link href="/tools/exchange-cost-estimator" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Exchange Cost Estimator</Link></li>
              <li><Link href="/tools/identification-rules-checker" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Identification Rules Checker</Link></li>
              <li className="pt-2">
                <Link href="/tools" className="text-sm text-[#C4A87C] hover:text-white transition-colors">
                  View All Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Map Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Legal</h3>
            <ul className="space-y-2 mb-8">
              <li><Link href="/privacy" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Terms of Service</Link></li>
              <li><Link href="/sitemap.xml" className="text-sm text-white/70 hover:text-[#C4A87C] transition-colors">Sitemap</Link></li>
            </ul>

            {/* Google Maps Embed */}
            <div className="h-32 w-full overflow-hidden bg-white/10">
              <iframe
                title={`Map of ${OFFICE_ADDRESS}`}
                src={mapSrc}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-[11px] text-white/40 leading-relaxed mb-4">
            <span className="text-white/60 font-medium">Compliance:</span> This site helps investors identify potential replacement properties for Section 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] text-white/40">
            <a href="https://www.irs.gov/forms-pubs/about-form-8824" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A87C] transition-colors">
              IRS Form 8824
            </a>
            <a href="https://www.irs.gov/irb/2008-10_IRB#REV-PROC-2008-16" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A87C] transition-colors">
              Rev. Proc. 2008-16
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-[10px] text-white/30 text-center">
            © {currentYear} 1031 Exchange {PRIMARY_CITY}. All rights reserved. Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}
