"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PHONE, PHONE_DIGITS } from "@/lib/config";

export default function StickyCTA() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Hide on homepage to match Carolwood clean aesthetic
  if (pathname === "/") {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E0D8] bg-[#F7F5F2] shadow-lg transition-transform duration-300 ${
        isCollapsed ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="text-sm font-medium text-[#2D2D2D]">
              Ready to begin your 1031 exchange?
            </p>
            <p className="text-xs text-[#666]">
              Our California team helps you meet deadlines and protect your gains.
            </p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
            <a
              href={`tel:${PHONE_DIGITS}`}
              className="bg-[#5A2828] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4A1F1F] md:hidden"
            >
              Call {PHONE}
            </a>
            <Link
              href="/contact"
              className="bg-[#5A2828] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4A1F1F]"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[#5A2828] md:hidden"
              aria-label={isCollapsed ? "Expand" : "Collapse"}
            >
              <span className="text-xl">{isCollapsed ? "^" : "v"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
