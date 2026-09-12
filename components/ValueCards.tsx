import Image from "next/image";

export default function ValueCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
          What $89 gets you
        </p>
        <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-navy sm:text-4xl">
          14 days with us &mdash; and two things to make them better.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col rounded-2xl bg-aqua-light p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
              The main event
            </p>
            <p className="mt-4 font-serif text-6xl text-navy">8</p>
            <p className="mt-2 font-serif text-xl text-navy">
              Megaformer classes
            </p>
            <p className="mt-3 text-sm leading-relaxed text-navy/70">
              Book any class on the Roseville schedule, at whatever pace fits
              your two weeks. Most people land on three or four a week.
            </p>
          </div>

          <div className="flex flex-col rounded-2xl border border-slate-ink/10 p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-body/60">
              Bonus
            </p>
            <p className="mt-4 font-serif text-xl text-navy">1 guest pass</p>
            <p className="mt-auto pt-6 text-sm leading-relaxed text-slate-body">
              Bring a friend to any class in your two weeks. The first one is
              always easier with someone next to you.
            </p>
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-ink/10">
            <div className="relative h-36 w-full">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
                alt="Recovery session at InstaPhysique"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-body/60">
                Bonus
              </p>
              <p className="mt-4 font-serif text-xl text-navy">
                1 InstaRoll session
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-body">
                Infrared lymphatic roll massage. Recovery is part of the
                program, not a treat you earn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
