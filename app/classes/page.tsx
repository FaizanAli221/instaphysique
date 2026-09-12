import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Flame, Sparkles, Shield, HeartPulse, Clock, ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";

export const metadata: Metadata = {
  title: "The Workout & Class Formats | InstaPhysique Roseville",
  description:
    "Explore InstaPhysique's high-intensity, zero-impact Megaformer workouts and InstaRoll infrared lymphatic massage in Roseville, CA.",
};

const FORMATS = [
  {
    title: "MegaFullBody",
    duration: "40 Minutes",
    intensity: "High Intensity / Zero Impact",
    tag: "Signature Class",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    description:
      "Our core signature class. 40 minutes of continuous slow-twitch muscle burnout incorporating legs, core, upper body, and balance on the patented Megaformer M3S. Zero jumping or joint pounding.",
    highlights: [
      "Full body resistance from 0 to 250 lbs via spring tension",
      "Slow, controlled tempos (4 counts in, 4 counts out)",
      "Targeting slow-twitch muscle fibers for long, lean muscle definition",
      "Continuous core stabilization in every single move",
    ],
  },
  {
    title: "MegaCore & Upper",
    duration: "40 Minutes",
    intensity: "Targeted Strength",
    tag: "Sculpt & Define",
    image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=800&q=80",
    description:
      "An intense upper-body sculpt combined with relentless abdominal focus. Sculpt the shoulders, triceps, biceps, back, and deep transverse abdominis without ever straining wrists or neck.",
    highlights: [
      "Extensive carriage push-ups, kneeling lat pulls, and chest expansions",
      "Targeted obliques, planks, and reverse crunches",
      "Postural realignment for desk workers and athletes",
      "Adjustable strap and bungee resistances",
    ],
  },
  {
    title: "MegaGlutes & Core",
    duration: "40 Minutes",
    intensity: "Lower Body Burn",
    tag: "High Demand",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    description:
      "A lower-body powerhouse class designed to lift, strengthen, and tone the glutes, hamstrings, and quad complexes while firing the stabilizer core muscles.",
    highlights: [
      "Signature Megaformer lunges (Spider lunge, Escator lunge, Floor lunge)",
      "Continuous tension on the working glute with zero rest intervals",
      "Hamstring curls and carriage kick-backs",
      "Gentle on knees and lower back through spring deceleration",
    ],
  },
  {
    title: "InstaRoll Infrared Massage",
    duration: "45 Minutes",
    intensity: "Lymphatic Recovery",
    tag: "Restorative Tech",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    description:
      "Our state-of-the-art wooden infrared roller machines gently massage muscles, drain excess lymphatic fluid, stimulate blood circulation, and break down fascial adhesions.",
    highlights: [
      "Infrared heat penetrates deep into muscle tissue to relieve soreness",
      "Lymphatic drainage supports natural toxin flush and reduced water retention",
      "Speed up recovery between intense Megaformer days",
      "Guided positions targeting calves, thighs, glutes, waist, and arms",
    ],
  },
];

const PILLARS = [
  {
    icon: Flame,
    title: "Time Under Tension",
    desc: "By moving at a slow 4-count pace, your muscles cannot rely on momentum. This forces maximum recruitment of fat-burning slow-twitch muscle fibers.",
  },
  {
    icon: Shield,
    title: "Zero Impact on Joints",
    desc: "No jumping, pounding on treadmills, or dropping heavy barbells. Spring-loaded resistance absorbs shock, keeping knees, hips, and spine protected.",
  },
  {
    icon: HeartPulse,
    title: "Cardio Without the Impact",
    desc: "Because you transition seamlessly from one exercise to the next without rest, your heart rate remains elevated throughout the entire 40 minutes.",
  },
];

export default function ClassesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ice py-16 sm:py-24 border-b border-slate-ink/10">
        <div className="container-content text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua-dark">
            The InstaPhysique Method
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl text-navy leading-tight">
            High intensity. Zero impact. <br className="hidden sm:inline" />
            Designed for longevity.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-body leading-relaxed">
            Our workout fuses the intensity of strength training with the low-impact precision of the patented Megaformer M3S. In 40 minutes, you strengthen, lengthen, and tone without stressing your joints.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/schedule">
              <PillButton className="px-8 py-3.5 text-sm font-semibold">
                Browse Class Schedule
              </PillButton>
            </Link>
            <Link href="/pricing">
              <button className="px-7 py-3.5 rounded-pill text-sm font-semibold border border-slate-ink/15 text-navy hover:bg-white transition-colors">
                View Pricing &amp; Intro Offer
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Science Pillars */}
      <section className="py-16 sm:py-20 border-b border-slate-ink/10">
        <div className="container-content">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-aqua-dark">
              The Science
            </span>
            <h2 className="mt-2 font-serif text-3xl text-navy">
              Why the Megaformer works so fast.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="p-8 rounded-2xl bg-ice/50 border border-slate-ink/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-aqua-dark shadow-xs border border-slate-ink/5">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-body leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Class Formats */}
      <section className="py-16 sm:py-24">
        <div className="container-content">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-aqua-dark">
              Our Class Formats
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-navy">
              Choose your workout focus.
            </h2>
            <p className="mt-3 text-slate-body text-sm">
              All classes cap at 12 participants so our certified instructors can provide hands-on form feedback and modifications.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {FORMATS.map((f, idx) => (
              <div
                key={f.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl p-6 sm:p-10 border border-slate-ink/10 ${
                  idx % 2 === 1 ? "bg-ice/60 lg:flex-row-reverse" : "bg-white"
                }`}
              >
                <div className="relative h-[280px] sm:h-[360px] w-full overflow-hidden rounded-2xl shadow-sm">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md text-aqua text-xs font-semibold px-3 py-1.5 rounded-full">
                    {f.tag}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-body">
                    <span className="flex items-center gap-1 font-semibold text-navy">
                      <Clock size={14} className="text-aqua-dark" /> {f.duration}
                    </span>
                    <span>&middot;</span>
                    <span className="font-medium text-aqua-dark">{f.intensity}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-navy">{f.title}</h3>
                  <p className="text-slate-body text-sm leading-relaxed">{f.description}</p>

                  <ul className="space-y-2.5 pt-2">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy">
                        <Check size={16} className="text-aqua-dark mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Link href="/schedule">
                      <PillButton className="py-2.5 px-6 text-xs font-semibold flex items-center gap-2">
                        <span>Find {f.title} on Schedule</span>
                        <ArrowRight size={14} />
                      </PillButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Timer Guide */}
      <section className="bg-navy py-16 sm:py-20 text-white">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua">
              First-Time Checklist
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
              What to know before stepping into the studio.
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              We know walking into a new studio can feel intimidating. Every coach at InstaPhysique was once a beginner too. Here is everything you need to know:
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="font-serif text-2xl text-aqua font-bold">01</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">Grip Socks Required</h4>
                  <p className="text-xs text-white/70 mt-1">Grip socks are mandatory for safety and traction on the carriages. Bring your own or purchase in our retail shop.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="font-serif text-2xl text-aqua font-bold">02</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">Arrive 15 Minutes Early</h4>
                  <p className="text-xs text-white/70 mt-1">Your coach will personally introduce you to the springs, handles, footstraps, and teach you how to shift resistance smoothly.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="font-serif text-2xl text-aqua font-bold">03</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">Hydration &amp; Towels</h4>
                  <p className="text-xs text-white/70 mt-1">We have filtered hydration refill stations and fresh workout towels provided complimentary.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white text-slate-ink border border-white/10 shadow-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-aqua-dark">
              Intro Special
            </span>
            <h3 className="mt-2 font-serif text-3xl text-navy">
              Try two full weeks for $89.
            </h3>
            <p className="mt-3 text-sm text-slate-body leading-relaxed">
              Experience the full benefits of consistent Megaformer training. Take up to 8 classes in 14 days, bring a friend with a free guest pass, and restore your muscles with 1 InstaRoll session.
            </p>
            <div className="mt-8 pt-6 border-t border-slate-ink/10">
              <Link href="/#claim">
                <PillButton fullWidth className="py-3.5 text-sm font-semibold">
                  Claim Intro Pass Now
                </PillButton>
              </Link>
              <p className="text-[11px] text-center text-slate-body/70 mt-3">
                First-time clients only &middot; Auto-expires in 14 days &middot; No recurring contract
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
