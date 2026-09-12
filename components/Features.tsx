import Image from "next/image";

const FEATURES = [
  {
    n: "01",
    title: "Every move has a modification",
    body: "Coaches offer them before you have to ask for one.",
  },
  {
    n: "02",
    title: "Classes cap at 12 people",
    body: "Small enough that a coach actually sees you and corrects your form by name.",
  },
  {
    n: "03",
    title: "Low impact, by design",
    body: "No jumping, no pounding. Slow, controlled, continuous resistance — tough on muscles, gentle on your spine, hips and knees.",
  },
];

const STATS = [
  { value: "40", label: "Minutes per class" },
  { value: "12", label: "People max, every class" },
  { value: "2016", label: "Locally owned since" },
];

export default function Features() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[320px] w-full md:h-auto md:min-h-[520px]">
          <Image
            src="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=1000&q=80"
            alt="A coach spotting a member through a Megaformer move"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center bg-ice px-6 py-14 sm:px-12 md:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
            If you&apos;re thinking &ldquo;I&apos;m not fit enough&rdquo;
          </p>
          <h2 className="mt-3 max-w-md font-serif text-3xl leading-tight text-navy sm:text-4xl">
            Nobody walks in already good at this.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-body">
            The Megaformer is unfamiliar to almost everyone on day one &mdash;
            including the people who now come four times a week. Your
            coach&apos;s job is to make the first class work for the body you
            walked in with.
          </p>

          <ul className="mt-8 max-w-md divide-y divide-slate-ink/10 border-t border-slate-ink/10">
            {FEATURES.map((f) => (
              <li key={f.n} className="flex gap-5 py-5">
                <span className="pt-0.5 text-xs font-semibold text-aqua-dark">
                  {f.n}
                </span>
                <div>
                  <p className="font-medium text-navy">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-body">
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-white/10 bg-navy sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="px-8 py-8 text-center sm:text-left">
            <p className="font-serif text-4xl text-aqua">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/60">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
