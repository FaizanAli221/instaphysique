import LeadForm from "./LeadForm";

const PACKAGE_ITEMS = [
  { count: "8", label: "Megaformer classes in 14 days" },
  { count: "1", label: "Guest pass for a friend" },
  { count: "1", label: "InstaRoll infrared lymphatic massage" },
];

export default function LeadCapture() {
  return (
    <section id="claim" className="bg-navy py-16 sm:py-20">
      <div className="container-content grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-[440px]">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Start your two weeks.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            First-time clients only, one per person. We&apos;ll reach out to
            get your first class on the calendar at Roseville.
          </p>

          <ul className="mt-8 space-y-5 border-t border-white/10 pt-6">
            {PACKAGE_ITEMS.map((item) => (
              <li key={item.label} className="flex items-baseline gap-4">
                <span className="font-serif text-3xl text-aqua">
                  {item.count}
                </span>
                <span className="text-[15px] text-white/85">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
