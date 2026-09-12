"use client";

import { Phone } from "lucide-react";
import PillButton from "./PillButton";

const CLAIM_HREF = "#claim";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-ink/10 bg-white/95 backdrop-blur">
      <div className="container-content flex h-[76px] items-center justify-between gap-4">
        <a href="#top" className="flex items-baseline gap-0.5 whitespace-nowrap">
          <span className="font-serif text-xl font-semibold tracking-tight text-aqua-dark">
            Insta
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-navy">
            Physique
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm text-slate-body md:flex">
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-body/70">
              Roseville
            </p>
            <p className="text-slate-ink">1470 Eureka Rd, Ste 100</p>
          </div>
          <a
            href="tel:9169133707"
            className="flex items-center gap-1.5 font-medium text-slate-ink hover:text-aqua-dark"
          >
            <Phone size={15} strokeWidth={2} />
            (916) 913-3707
          </a>
        </div>

        <a href={CLAIM_HREF}>
          <PillButton className="whitespace-nowrap px-5 py-2.5 text-xs md:px-7 md:py-3.5 md:text-sm">
            Claim the $89 intro
          </PillButton>
        </a>
      </div>
    </header>
  );
}
