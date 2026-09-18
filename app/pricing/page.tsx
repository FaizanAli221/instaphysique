import { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";

export const metadata: Metadata = {
  title: "Memberships & Pricing | InstaPhysique Roseville",
  description:
    "Transparent pricing for Megaformer classes and InstaRoll recovery in Roseville, CA. Intro offers, monthly recurring memberships, and class packages.",
};

const MEMBERSHIPS = [
  {
    name: "4 Classes / Month",
    price: "$109",
    period: "per month",
    perClass: "$27.25 / class",
    popular: false,
    desc: "Great for supplementing outdoor running, cycling, or other fitness routines.",
    perks: [
      "4 Megaformer or InstaRoll classes each month",
      "Rollover up to 2 unused classes with active membership",
      "10% discount on grip socks & studio retail",
      "Standard 7-day advance booking window",
    ],
  },
  {
    name: "8 Classes / Month",
    price: "$189",
    period: "per month",
    perClass: "$23.63 / class",
    popular: true,
    desc: "Our most popular membership. Perfect for 2 transformative sessions per week.",
    perks: [
      "8 Megaformer or InstaRoll classes each month",
      "Rollover up to 4 unused classes with active membership",
      "1 free guest pass every month",
      "15% discount on grip socks & studio retail",
      "Priority 14-day advance booking window",
    ],
  },
  {
    name: "Unlimited All-Access",
    price: "$299",
    period: "per month",
    perClass: "Best Value",
    popular: false,
    desc: "For dedicated clients training 3-5 times a week with complete schedule flexibility.",
    perks: [
      "Unlimited Megaformer and InstaRoll classes",
      "2 free guest passes each month",
      "20% discount on all studio retail & apparel",
      "First priority 21-day advance booking window",
      "Free freeze up to 60 days per year",
    ],
  },
];

const PACKAGES = [
  { name: "Single Class Drop-In", price: "$35", validity: "Valid 30 days" },
  { name: "5-Class Pack", price: "$160", validity: "Valid 3 months ($32/class)" },
  { name: "10-Class Pack", price: "$290", validity: "Valid 6 months ($29/class)" },
  { name: "20-Class Pack", price: "$520", validity: "Valid 12 months ($26/class)" },
  { name: "Single InstaRoll Session", price: "$40", validity: "Valid 30 days (45 min)" },
  { name: "5-Pack InstaRoll", price: "$175", validity: "Valid 6 months ($35/session)" },
];

const PERKS_COMPARISON = [
  { feature: "Classes Included", tier1: "4 / month", tier2: "8 / month", tier3: "Unlimited" },
  { feature: "Per-Class Effective Rate", tier1: "$27.25", tier2: "$23.63", tier3: "As low as $14.95" },
  { feature: "Advance Booking Window", tier1: "7 Days", tier2: "14 Days", tier3: "21 Days" },
  { feature: "Guest Passes Included", tier1: "—", tier2: "1 / month", tier3: "2 / month" },
  { feature: "Retail Discount", tier1: "10%", tier2: "15%", tier3: "20%" },
  { feature: "Unused Class Rollover", tier1: "Up to 2", tier2: "Up to 4", tier3: "N/A" },
  { feature: "Membership Freeze Allowance", tier1: "1x / year", tier2: "2x / year", tier3: "Up to 60 days" },
];

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ice py-16 sm:py-20 border-b border-slate-ink/10">
        <div className="container-content text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua-dark">
            Simple, Transparent Pricing
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-navy">
            Invest in your strongest self.
          </h1>
          <p className="mt-4 text-base text-slate-body max-w-xl mx-auto">
            No initiation fees. No hidden cancellation penalties. Choose the membership or class package that fits your lifestyle.
          </p>
        </div>
      </section>

      {/* Intro Special Banner */}
      <section className="bg-navy py-12 text-white">
        <div className="container-content">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-aqua">
                <Sparkles size={14} /> Recommended for First-Time Clients
              </div>
              <h2 className="font-serif text-3xl text-white">
                2-Week Intro Special: $89
              </h2>
              <p className="text-sm text-white/70 max-w-xl leading-relaxed">
                Take up to 8 Megaformer classes in 14 days, bring a friend with a complimentary guest pass, and receive 1 InstaRoll lymphatic massage.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link href="/#claim">
                <PillButton className="px-8 py-3.5 text-sm font-semibold flex items-center gap-2">
                  <span>Claim $89 Offer</span>
                  <ArrowRight size={15} />
                </PillButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Recurring Memberships */}
      <section className="py-16 sm:py-24">
        <div className="container-content">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-aqua-dark">
              Monthly Memberships
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-navy">
              Consistent training, maximum savings.
            </h2>
            <p className="mt-3 text-xs text-slate-body">
              Auto-renewing monthly plans with simple 30-day cancellation terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {MEMBERSHIPS.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col justify-between p-8 rounded-3xl border transition-all duration-200 relative ${
                  plan.popular
                    ? "bg-white border-aqua-dark shadow-xl scale-[1.02] ring-2 ring-aqua-dark/20"
                    : "bg-ice/40 border-slate-ink/10 hover:bg-white hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-aqua text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full border border-aqua/30 shadow-xs">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-xl font-bold text-navy">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-navy">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-body font-medium">{plan.period}</span>
                  </div>
                  <p className="text-xs text-aqua-dark font-semibold mt-1">{plan.perClass}</p>

                  <p className="mt-4 text-xs text-slate-body leading-relaxed border-b border-slate-ink/10 pb-6">
                    {plan.desc}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-xs text-navy">
                        <Check size={15} className="text-aqua-dark mt-0.5 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link href="/#claim">
                    <PillButton
                      variant={plan.popular ? "aqua" : "navy"}
                      fullWidth
                      className="py-3 text-xs font-semibold"
                    >
                      Select {plan.name}
                    </PillButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Packages */}
      <section className="bg-ice py-16 sm:py-20 border-y border-slate-ink/10">
        <div className="container-content">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-aqua-dark">
              Non-Recurring
            </span>
            <h2 className="mt-2 font-serif text-3xl text-navy">
              Class Packs &amp; Drop-Ins
            </h2>
            <p className="mt-2 text-xs text-slate-body">
              Ideal for travelers, seasonal visitors, or flexible schedules without monthly commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className="p-6 rounded-2xl bg-white border border-slate-ink/10 flex items-center justify-between shadow-xs hover:border-aqua-dark/50 transition-colors"
              >
                <div>
                  <h4 className="font-serif text-lg font-bold text-navy">{pkg.name}</h4>
                  <p className="text-xs text-slate-body mt-1">{pkg.validity}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl font-bold text-navy">{pkg.price}</p>
                  <Link href="/#claim" className="text-xs font-semibold text-aqua-dark hover:underline mt-1 inline-block">
                    Buy Pack &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Comparison Matrix */}
      <section className="py-16 sm:py-24">
        <div className="container-content">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-3xl text-navy">
              Compare Membership Perks
            </h2>
            <p className="mt-2 text-xs text-slate-body">
              Everything included across our three recurring membership tiers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-ink/10">
                  <th className="py-4 px-4 font-semibold text-navy">Feature / Benefit</th>
                  <th className="py-4 px-4 font-semibold text-navy">4 / Month</th>
                  <th className="py-4 px-4 font-semibold text-aqua-dark">8 / Month (Popular)</th>
                  <th className="py-4 px-4 font-semibold text-navy">Unlimited All-Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-ink/5">
                {PERKS_COMPARISON.map((row) => (
                  <tr key={row.feature} className="hover:bg-ice/50">
                    <td className="py-3.5 px-4 font-medium text-navy">{row.feature}</td>
                    <td className="py-3.5 px-4 text-slate-body">{row.tier1}</td>
                    <td className="py-3.5 px-4 text-navy font-semibold">{row.tier2}</td>
                    <td className="py-3.5 px-4 text-slate-body">{row.tier3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="bg-ice py-16 border-t border-slate-ink/10">
        <div className="container-content max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl text-navy">
              Frequently Asked Billing Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white border border-slate-ink/10">
              <h4 className="font-serif text-base font-bold text-navy flex items-center gap-2">
                <HelpCircle size={16} className="text-aqua-dark" /> What is the cancellation policy on memberships?
              </h4>
              <p className="mt-2 text-xs text-slate-body leading-relaxed">
                All memberships can be cancelled at any time with a simple written 30-day notice via email to roseville@instaphysique.com. There are no contracts, buyout fees, or cancellation penalties.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-ink/10">
              <h4 className="font-serif text-base font-bold text-navy flex items-center gap-2">
                <HelpCircle size={16} className="text-aqua-dark" /> Can I freeze my membership if I travel or get injured?
              </h4>
              <p className="mt-2 text-xs text-slate-body leading-relaxed">
                Yes! Members can freeze memberships for up to 60 days per calendar year. Medical freezes with physician documentation are accommodated without fee.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-ink/10">
              <h4 className="font-serif text-base font-bold text-navy flex items-center gap-2">
                <HelpCircle size={16} className="text-aqua-dark" /> Do you offer discounts for teachers, healthcare workers, or students?
              </h4>
              <p className="mt-2 text-xs text-slate-body leading-relaxed">
                Yes, we proudly offer 15% off recurring memberships for verified first responders, nurses, teachers, and active full-time college students. Inquire at the front desk or via our contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
