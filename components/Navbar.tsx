"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import PillButton from "./PillButton";
import { openLeadModal } from "./LeadModal";

const NAV_LINKS = [
  { href: "/classes", label: "The Workout" },
  { href: "/schedule", label: "Schedule" },
  { href: "/pricing", label: "Pricing" },
  { href: "/coaches", label: "Coaches" },
  { href: "/locations", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  function handleClaim() {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const claimEl = document.getElementById("claim");
      if (claimEl) {
        claimEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    openLeadModal();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-ink/10 bg-white/95 backdrop-blur">
      <div className="container-content flex h-[76px] items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-0.5 whitespace-nowrap">
          <span className="font-serif text-2xl font-bold tracking-tight text-aqua-dark">
            Insta
          </span>
          <span className="font-serif text-2xl font-bold tracking-tight text-navy">
            Physique
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-aqua-dark",
                  isActive ? "text-aqua-dark font-semibold" : "text-slate-body"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Info & CTA */}
        <div className="hidden items-center gap-5 sm:flex">
          <a
            href="tel:9169133707"
            className="hidden items-center gap-1.5 text-xs font-semibold text-slate-body hover:text-aqua-dark xl:flex"
          >
            <Phone size={14} strokeWidth={2} className="text-aqua-dark" />
            (916) 913-3707
          </a>

          <PillButton
            onClick={handleClaim}
            className="whitespace-nowrap px-5 py-2.5 text-xs font-semibold md:px-6 md:py-3 md:text-sm shadow-sm hover:shadow"
          >
            Claim $89 Intro
          </PillButton>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <PillButton
            onClick={handleClaim}
            className="px-3.5 py-2 text-xs font-semibold sm:hidden"
          >
            $89 Intro
          </PillButton>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-ink/10 text-navy hover:bg-slate-ink/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-slate-ink/10 bg-white lg:hidden"
          >
            <div className="container-content space-y-4 py-6">
              <nav className="flex flex-col space-y-3">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium transition-colors",
                        isActive
                          ? "bg-aqua-light text-navy font-semibold"
                          : "text-navy hover:bg-slate-ink/5"
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={16} className="text-slate-body/60" />
                    </Link>
                  );
                })}
              </nav>

              <div className="rounded-xl bg-ice p-4 text-xs text-slate-body space-y-2 border border-slate-ink/5">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-aqua-dark" />
                  <div>
                    <span className="font-semibold text-navy">Roseville Studio:</span> 1470 Eureka Rd, Ste 100, Roseville, CA
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} className="shrink-0 text-aqua-dark" />
                  <a href="tel:9169133707" className="font-medium text-navy underline">
                    (916) 913-3707
                  </a>
                </div>
              </div>

              <PillButton
                onClick={handleClaim}
                fullWidth
                className="py-3 text-sm flex items-center justify-center gap-2"
              >
                <span>Claim the $89 Intro Offer</span>
                <ArrowRight size={16} />
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
