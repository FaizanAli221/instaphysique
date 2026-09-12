import Link from "next/link";
import { ArrowRight, Calendar, Dumbbell, Users, MapPin, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import LeadCapture from "@/components/LeadCapture";
import ValueCards from "@/components/ValueCards";
import Features from "@/components/Features";
import Timeline from "@/components/Timeline";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

const EXPLORE_CARDS = [
  {
    title: "The Workout & Formats",
    description: "Discover our 40-minute high-intensity low-impact Megaformer method and InstaRoll recovery.",
    href: "/classes",
    icon: Dumbbell,
    tag: "The Method",
  },
  {
    title: "Weekly Class Schedule",
    description: "Browse 35+ weekly classes from 5:30 AM to evening with real-time coach & spot availability.",
    href: "/schedule",
    icon: Calendar,
    tag: "Live Schedule",
  },
  {
    title: "Meet Our Elite Coaches",
    description: "Master Lagree-certified trainers dedicated to spotting your form and pushing your limits safely.",
    href: "/coaches",
    icon: Users,
    tag: "The Team",
  },
  {
    title: "Roseville Studio & Tour",
    description: "14 custom Megaformer M3S machines, private roll suite, luxury amenities, and free parking.",
    href: "/locations",
    icon: MapPin,
    tag: "Studio Tour",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <LeadCapture />

      {/* Explore Studio Hub */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-ink/10">
        <div className="container-content">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
                <Sparkles size={14} /> Explore InstaPhysique
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-navy">
                More than just a workout.
              </h2>
            </div>
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-aqua-dark hover:text-navy transition-colors"
            >
              <span>Explore all class formats</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPLORE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex flex-col justify-between p-6 rounded-2xl bg-ice border border-slate-ink/5 hover:border-aqua-dark/40 hover:bg-white hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white group-hover:bg-aqua transition-colors text-navy shadow-xs">
                        <Icon size={20} className="text-navy" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-body/60">
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-bold text-navy group-hover:text-aqua-dark transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-body">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-ink/5 flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-aqua-dark transition-colors">
                    <span>Learn more</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ValueCards />
      <Features />
      <Timeline />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  );
}
