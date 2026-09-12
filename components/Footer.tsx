import LeadForm from "./LeadForm";

export default function Footer() {
  return (
    <>
      <section className="bg-aqua-light py-16 sm:py-20">
        <div className="container-content grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">
                Last call &mdash; new client intro offer
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-navy sm:text-4xl">
                14 days. 1 guest pass. 1 roll massage. $89.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy/70">
                Two weeks is long enough to know whether this is your thing.
                Most people know by class four.
              </p>
            </div>

            <div className="mt-10 border-t border-navy/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                InstaPhysique Roseville
              </p>
              <p className="mt-2 text-sm text-navy">
                1470 Eureka Rd, Ste 100
                <br />
                Roseville, CA 95661
              </p>
              <p className="mt-2 text-sm text-navy/70">
                Free parking on site. Doors open 15 minutes before each class.
              </p>
              <a
                href="tel:9169133707"
                className="mt-2 inline-block text-sm font-medium text-navy underline"
              >
                Or call (916) 913-3707
              </a>
            </div>
          </div>

          <LeadForm
            variant="light"
            title="Claim it in thirty seconds."
            subtitle="Tell us where to reach you and we'll get your first class booked."
          />
        </div>
      </section>

      <footer className="bg-navy py-8">
        <div className="container-content flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <span className="font-serif text-sm text-white">
            <span className="text-aqua">Insta</span>Physique
          </span>
          <p>
            &copy; {new Date().getFullYear()} InstaPhysique &middot; Locally
            owned since 2016 &middot; Intro offer valid for first-time clients
            only, one per person.
          </p>
        </div>
      </footer>
    </>
  );
}
