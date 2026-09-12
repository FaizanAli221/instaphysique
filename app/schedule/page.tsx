import { Metadata } from "next";
import { Clock, Info, ShieldCheck, MapPin, Phone } from "lucide-react";
import ScheduleGrid from "@/components/ScheduleGrid";
import PillButton from "@/components/PillButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Class Schedule | InstaPhysique Roseville",
  description:
    "View live Megaformer and InstaRoll class schedules at InstaPhysique Roseville. Early morning, lunchtime, and evening classes 7 days a week.",
};

export default function SchedulePage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-ice py-12 sm:py-16 border-b border-slate-ink/10">
        <div className="container-content">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
                <MapPin size={14} /> Roseville Flagship Studio
              </div>
              <h1 className="mt-2 font-serif text-3xl sm:text-5xl text-navy">
                Studio Class Schedule
              </h1>
              <p className="mt-3 text-sm text-slate-body max-w-xl">
                Classes run 7 days a week from 5:30 AM to 7:30 PM. Each Megaformer class is capped at 12 machines for personal instruction.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/pricing">
                <button className="px-5 py-2.5 rounded-pill text-xs font-semibold border border-slate-ink/15 text-navy hover:bg-white transition-colors">
                  Memberships &amp; Pricing
                </button>
              </Link>
              <Link href="/#claim">
                <PillButton className="px-6 py-2.5 text-xs font-semibold">
                  Claim $89 Intro Pass
                </PillButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Schedule Component */}
      <section className="py-12 sm:py-16">
        <div className="container-content">
          <ScheduleGrid />
        </div>
      </section>

      {/* Booking Policies & Help */}
      <section className="bg-ice/50 py-16 border-t border-slate-ink/10">
        <div className="container-content">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl text-navy">
              Studio Booking Policies
            </h2>
            <p className="mt-2 text-xs text-slate-body">
              Everything you need to know about booking, cancellations, and waitlists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-ink/10 shadow-xs">
              <div className="flex items-center gap-2.5 font-serif text-lg font-bold text-navy">
                <Clock size={18} className="text-aqua-dark" />
                <span>12-Hour Cancellation</span>
              </div>
              <p className="mt-3 text-xs text-slate-body leading-relaxed">
                Cancel up to 12 hours before class start without penalty. Late cancellations or no-shows forfeit the class credit to keep spots open for others.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-ink/10 shadow-xs">
              <div className="flex items-center gap-2.5 font-serif text-lg font-bold text-navy">
                <ShieldCheck size={18} className="text-aqua-dark" />
                <span>Automatic Waitlist</span>
              </div>
              <p className="mt-3 text-xs text-slate-body leading-relaxed">
                If a class is full, join the waitlist. As soon as a spot opens, you will receive an automatic text or email alert booking you into the session.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-ink/10 shadow-xs">
              <div className="flex items-center gap-2.5 font-serif text-lg font-bold text-navy">
                <Info size={18} className="text-aqua-dark" />
                <span>Need Assistance?</span>
              </div>
              <p className="mt-3 text-xs text-slate-body leading-relaxed">
                Having trouble booking or modifying your schedule? Call or text our front desk team directly at{" "}
                <a href="tel:9169133707" className="font-semibold text-navy underline">
                  (916) 913-3707
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
