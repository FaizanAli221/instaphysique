import Image from "next/image";
import { Check } from "lucide-react";

const PERKS = [
  "20% off your first month",
  "First month upgraded to All-Access",
  "20% off your first retail purchase",
];

export default function Pricing() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
            After the two weeks
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-navy sm:text-4xl">
            No pressure. Here&apos;s what it costs if you stay.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-body">
            Memberships start at{" "}
            <span className="font-semibold text-navy">$109 a month</span> for
            4 classes and go up to{" "}
            <span className="font-semibold text-navy">$299</span> for 18.
            Most people who finish the intro land somewhere in the middle.
          </p>

          <div className="mt-6 max-w-md rounded-xl bg-aqua-light p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
              New member sign-up special
            </p>
            <ul className="mt-3 space-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-navy">
                  <Check size={16} className="mt-0.5 shrink-0 text-aqua-dark" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px]">
          <Image
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80"
            alt="A coach guiding a member on the Megaformer"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
