import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    quote: "Megaformer workouts are so humbling yet so exhilarating.",
    body: "And InstaPhysique is the place to explore it — the coaches are amazing. I appreciate seeing the fellow coaches taking classes along with members and supporting each other.",
  },
  {
    quote: "So attentive in offering modifications so I can do the workout safely.",
    body: "Coach Kristin's hands-on corrections help me so much in completing the sets with accuracy. Coach Rosslyn's calming voice and live demo really help me pull through the challenging sessions.",
  },
  {
    quote: "Tough but rewarding — and the studio is clean and inviting.",
    body: "The instructors are highly knowledgeable and experienced, providing helpful adjustments and guidance throughout the classes. A supportive, open, energetic atmosphere.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ice py-16 sm:py-20">
      <div className="container-content">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
              Member stories
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-navy sm:text-4xl">
              What Roseville says.
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <span className="font-serif text-2xl text-navy">5.0</span>
            <div>
              <div className="flex gap-0.5 text-aqua-dark">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-body/60">
                89 Google reviews
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.quote}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            >
              <Quote size={20} className="text-aqua-dark" fill="currentColor" strokeWidth={0} />
              <blockquote className="mt-4 font-serif text-lg leading-snug text-navy">
                {r.quote}
              </blockquote>
              <p className="mt-3 text-sm leading-relaxed text-slate-body">
                {r.body}
              </p>
              <figcaption className="mt-5 flex items-center gap-2 pt-4">
                <div className="flex gap-0.5 text-aqua-dark">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-body/70">
                  Google Review &middot; Roseville
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
