const STEPS = [
  {
    n: "01",
    title: "Arrive 15 minutes early",
    body: "A coach walks you through the Megaformer, the springs, and where to put your things. Say it's your first class — they'll be expecting you.",
  },
  {
    n: "02",
    title: "Grip socks on",
    body: "Required on the machine. Bring your own or grab a pair at the front desk. Water bottle, and that's it.",
  },
  {
    n: "03",
    title: "Forty minutes of shaking",
    body: "Slow, controlled, continuous. Your muscles will shake — that's time under tension doing its job, not a sign you're failing.",
  },
  {
    n: "04",
    title: "Book the next one",
    body: "Expect to feel it for a day or two. Schedule your InstaRoll session in the gap — that's what it's there for.",
  },
];

export default function Timeline() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
          Your first class
        </p>
        <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-navy sm:text-4xl">
          Exactly what happens, start to finish.
        </h2>

        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.n} className="border-t-2 border-aqua pt-4">
              <span className="text-xs font-semibold text-slate-body/60">
                {step.n}
              </span>
              <h3 className="mt-2 font-serif text-lg text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-body">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
