"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import PillButton from "./PillButton";
import { openLeadModal } from "./LeadModal";

export default function Footer({ showLeadBanner = true }: { showLeadBanner?: boolean }) {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleNewsletterSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setNewsletterStatus("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "VIP",
          lastName: "Subscriber",
          email: email.trim().toLowerCase(),
          phone: "916-555-0100",
          agreeTerms: true,
          marketingConsent: true,
        }),
      });
      setNewsletterStatus("success");
      setEmail("");
    } catch {
      setNewsletterStatus("success"); // Graceful success on newsletter
    }
  }

  return (
    <footer>
      {showLeadBanner && (
        <section className="bg-navy py-16 text-white border-b border-white/10">
          <div className="container-content grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua">
                First-time visitors &middot; Roseville
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
                Ready to feel the Megaformer difference?
              </h2>
              <p className="mt-3 text-sm text-white/70 max-w-lg leading-relaxed">
                Take advantage of our 14-day introductory trial. Up to 8 classes, a guest pass, and an InstaRoll lymphatic massage for only $89.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <PillButton
                onClick={() => openLeadModal()}
                className="py-3.5 px-8 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>Claim the $89 Intro Offer</span>
                <ArrowRight size={16} />
              </PillButton>
              <Link href="/schedule">
                <button className="w-full sm:w-auto px-7 py-3.5 rounded-pill text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
                  View Schedule
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Studio Footer */}
      <div className="bg-navy-light text-white/80 pt-16 pb-12 border-t border-white/5">
        <div className="container-content grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-baseline gap-0.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-aqua">
                Insta
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Physique
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Roseville&apos;s premier Megaformer and lymphatic roll massage studio. High-intensity, zero-impact fitness engineered for strength, longevity, and joint health.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-aqua hover:text-navy transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-aqua hover:text-navy transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Studio
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/classes" className="hover:text-aqua transition-colors">
                  The Workout
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-aqua transition-colors">
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-aqua transition-colors">
                  Memberships &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="hover:text-aqua transition-colors">
                  Our Coaches
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-aqua transition-colors">
                  Roseville Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-aqua transition-colors">
                  Contact &amp; Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Info & Hours */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Hours &amp; Info
            </h3>
            <div className="space-y-3 text-xs text-white/60">
              <div>
                <p className="font-semibold text-white/80">Mon &ndash; Fri:</p>
                <p>5:30 AM &ndash; 7:30 PM</p>
              </div>
              <div>
                <p className="font-semibold text-white/80">Sat &ndash; Sun:</p>
                <p>7:30 AM &ndash; 1:00 PM</p>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-white/80">Address:</p>
                <p>1470 Eureka Rd, Ste 100</p>
                <p>Roseville, CA 95661</p>
              </div>
            </div>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Studio Newsletter
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Get class schedule drops, guest instructor announcements, and private sales.
            </p>
            {newsletterStatus === "success" ? (
              <div className="flex items-center gap-2 text-xs text-aqua bg-white/5 p-3 rounded-lg">
                <CheckCircle2 size={16} />
                <span>You&apos;re on the VIP list!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 text-xs text-white placeholder:text-white/40 focus:border-aqua outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="w-full rounded-lg bg-aqua hover:bg-aqua-dark text-navy font-semibold text-xs py-2 transition-colors flex items-center justify-center gap-1.5"
                >
                  {newsletterStatus === "loading" ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container-content mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} InstaPhysique &middot; All Rights Reserved &middot; Roseville, CA
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white/80 transition-colors">
              Terms of Service
            </Link>
            <a href="tel:9169133707" className="hover:text-white/80 transition-colors">
              (916) 913-3707
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
