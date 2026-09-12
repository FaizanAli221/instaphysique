import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Music, Award, Zap, ArrowRight, Heart } from "lucide-react";
import PillButton from "@/components/PillButton";

export const metadata: Metadata = {
  title: "Our Elite Coaches | InstaPhysique Roseville",
  description:
    "Meet the certified Lagree and Megaformer coaches at InstaPhysique Roseville. Dedicated to form, safe modifications, and empowering instruction.",
};

const COACHES = [
  {
    name: "Kristin V.",
    role: "Lead Trainer & Master Coach",
    experience: "8+ Years at InstaPhysique",
    certs: "Master Lagree Certified, NASM-CPT",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80",
    bio: "Kristin brings high energy, technical precision, and compassionate encouragement. She zeroes in on alignment and micro-adjustments so you maximize each slow-twitch contraction without hurting your lower back.",
    musicVibe: "Deep house remixes & melodic electronic beats",
    favMove: "Spider Lunge on the back platform",
    quote: "You don't get stronger by rushing the count. Find the shake and stay there.",
  },
  {
    name: "Rosslyn D.",
    role: "Senior Coach & Recovery Lead",
    experience: "6+ Years at InstaPhysique",
    certs: "Lagree Method Certified, Lymphatic Specialist",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    bio: "Rosslyn is known for her soothing, encouraging cues paired with deceptive, sweat-inducing choreography. She oversees our InstaRoll recovery protocol and specializes in joint-friendly adaptations.",
    musicVibe: "Upbeat R&B, remixes, and 2000s throwback hip-hop",
    favMove: "Giant Wheelbarrow with bungee resistance",
    quote: "Strength is what happens in the silent moments when your brain wants to quit.",
  },
  {
    name: "Sarah B.",
    role: "Senior Coach & Community Director",
    experience: "5+ Years at InstaPhysique",
    certs: "Lagree Fitness Certified, ACE-CPT",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80",
    bio: "Sarah's early morning classes are famous for their relentless positivity and fiery oblique blocks. She tracks each member's milestones and ensures every first-timer feels supported from minute one.",
    musicVibe: "High-octane EDM, club anthems, and festival mixes",
    favMove: "Escalator Lunge with 2 yellow springs",
    quote: "Celebrate showing up today. Forty minutes will change your entire mindset.",
  },
  {
    name: "Chloe M.",
    role: "Coach & Form Specialist",
    experience: "4+ Years at InstaPhysique",
    certs: "Lagree Certified, Classical Pilates Mat",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "With a background in dance and physical therapy assistance, Chloe has a laser eye for body mechanics. She gives hands-on corrections that ensure you feel the move in the intended muscle, never the joints.",
    musicVibe: "Indie electro-pop, Kygo vibes & energetic soul",
    favMove: "Catfish to Reverse Plank to Pike",
    quote: "Slow is smooth, and smooth is strong. Trust the spring tension.",
  },
];

export default function CoachesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ice py-16 sm:py-24 border-b border-slate-ink/10">
        <div className="container-content text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua-dark">
            Our Elite Roster
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-navy">
            Coaches who care about your form.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-body leading-relaxed max-w-2xl mx-auto">
            Every coach at InstaPhysique undergoes extensive proprietary training on the Megaformer M3S. No cheerleading scripts &mdash; only authentic cues, personal attention, and modifications tailored to your body.
          </p>
          <div className="mt-8">
            <Link href="/schedule">
              <PillButton className="px-8 py-3.5 text-sm font-semibold">
                See Coaches On Schedule
              </PillButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="py-16 sm:py-24">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {COACHES.map((coach) => (
              <div
                key={coach.name}
                className="flex flex-col rounded-3xl bg-ice/40 border border-slate-ink/10 overflow-hidden hover:border-aqua-dark/50 hover:shadow-xl transition-all duration-200"
              >
                <div className="relative h-[320px] sm:h-[380px] w-full">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-wider text-aqua font-semibold">
                      {coach.role}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
                      <Award size={13} className="text-aqua" /> {coach.certs}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-body leading-relaxed">
                      {coach.bio}
                    </p>

                    <blockquote className="border-l-2 border-aqua-dark pl-3 italic text-xs text-navy font-serif">
                      &ldquo;{coach.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-ink/10 text-xs">
                    <div className="flex items-center gap-2 text-slate-body">
                      <Music size={14} className="text-aqua-dark shrink-0" />
                      <span>
                        <strong className="text-navy font-medium">Playlist:</strong> {coach.musicVibe}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-body">
                      <Zap size={14} className="text-aqua-dark shrink-0" />
                      <span>
                        <strong className="text-navy font-medium">Signature Move:</strong> {coach.favMove}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/schedule">
                      <PillButton variant="navy" fullWidth className="py-2.5 text-xs font-semibold">
                        Book With {coach.name}
                      </PillButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Coach */}
      <section className="bg-navy py-16 text-white">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua">
              Careers &middot; InstaPhysique
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
              Passionate about the Megaformer? Join our coaching team.
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-lg">
              We provide an intensive, fully paid mentorship and teacher training program for high-energy fitness enthusiasts, Pilates practitioners, and certified trainers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link href="/contact">
              <PillButton className="px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
                <span>Inquire About Auditions</span>
                <ArrowRight size={16} />
              </PillButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
