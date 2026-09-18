import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, Car, Sparkles, Navigation, CheckCircle2 } from "lucide-react";
import PillButton from "@/components/PillButton";

export const metadata: Metadata = {
  title: "Roseville Studio & Amenities | InstaPhysique",
  description:
    "Explore InstaPhysique Roseville at 1470 Eureka Rd. 14 Megaformers, InstaRoll recovery suite, free parking, luxury cubbies, and studio directions.",
};

const AMENITIES = [
  { title: "14 Megaformer M3S Machines", desc: "Custom-calibrated spring tension and padded carriages sanitized thoroughly after every single session." },
  { title: "InstaRoll Infrared Suite", desc: "Private recovery lounge featuring wooden rollers and therapeutic infrared light." },
  { title: "Complimentary Towel & Hydration Bar", desc: "Chilled eucalyptus towels and triple-filtered alkaline water bottle refill station." },
  { title: "Luxury Cubbies & Lockers", desc: "Clean, spacious storage for coats, gym bags, shoes, and valuables during your class." },
  { title: "Grip Sock & Activewear Boutique", desc: "Curated performance grip socks (Pointe Studio, Tavi) and signature InstaPhysique apparel." },
  { title: "100+ Free On-Site Parking Spots", desc: "Expansive private parking lot right in front of the studio doors — zero meters or street parking hassle." },
];

export default function LocationsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ice py-16 sm:py-24 border-b border-slate-ink/10">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-aqua-dark">
                <MapPin size={14} /> Flagship Location
              </span>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-navy leading-tight">
                InstaPhysique Roseville
              </h1>
              <p className="mt-4 text-base text-slate-body leading-relaxed max-w-lg">
                Conveniently located in Roseville, our boutique studio was designed from the ground up to offer a pristine, focused, and elevated fitness sanctuary.
              </p>

              <div className="mt-8 space-y-3 text-sm text-slate-body">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-aqua-dark mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-navy">Address:</span>
                    <p>1470 Eureka Rd, Suite 100, Roseville, CA 95661</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-aqua-dark shrink-0" />
                  <div>
                    <span className="font-semibold text-navy">Studio Phone:</span>{" "}
                    <a href="tel:19166923263" className="text-navy hover:text-aqua-dark underline">
                      (916) 692-3263
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-aqua-dark mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-navy">Hours:</span>
                    <p>Mon &ndash; Fri: 5:30 AM &ndash; 7:30 PM</p>
                    <p>Sat &ndash; Sun: 7:30 AM &ndash; 1:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=1470+Eureka+Rd+Ste+100+Roseville+CA+95661"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PillButton className="px-6 py-3 text-xs font-semibold flex items-center gap-2">
                    <Navigation size={15} />
                    <span>Get Directions</span>
                  </PillButton>
                </a>
                <Link href="/schedule">
                  <button className="px-6 py-3 rounded-pill text-xs font-semibold border border-slate-ink/15 text-navy hover:bg-white transition-colors">
                    View Roseville Schedule
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative h-[340px] sm:h-[460px] w-full overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
                alt="InstaPhysique Roseville studio interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Studio Amenities */}
      <section className="py-16 sm:py-24">
        <div className="container-content">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-aqua-dark">
              The Experience
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-navy">
              Every detail considered.
            </h2>
            <p className="mt-3 text-xs text-slate-body">
              Cleanliness, equipment maintenance, and client comfort are top priorities at InstaPhysique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES.map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-ice/40 border border-slate-ink/5 hover:bg-white hover:border-aqua-dark/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 text-aqua-dark">
                  <CheckCircle2 size={18} />
                  <h3 className="font-serif text-lg font-bold text-navy">{item.title}</h3>
                </div>
                <p className="mt-3 text-xs text-slate-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parking & Arrival Tips */}
      <section className="bg-navy py-16 text-white">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua">
                Hassle-Free Arrival
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                Plenty of parking, every time.
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Located in Eureka Park Plaza near Rocky Ridge Dr, our studio features open, well-lit surface parking right outside our front door. You will never have to search for a parking garage or circle the block.
              </p>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mt-4">
                <Car size={20} className="text-aqua mt-0.5 shrink-0" />
                <div className="text-xs text-white/80 leading-relaxed">
                  <strong className="text-white font-semibold">First-Time Arrival Tip:</strong> Doors open 15 minutes prior to class time. We suggest arriving 15 minutes early so your instructor can review safety locks, springs, and carriage settings.
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-8 text-center space-y-4">
              <Sparkles size={36} className="text-aqua mx-auto" />
              <h3 className="font-serif text-2xl text-white">Start With the $89 Intro</h3>
              <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                Claim your two weeks of Megaformer training at our Roseville location today.
              </p>
              <Link href="/#claim">
                <PillButton className="px-8 py-3 text-xs font-semibold">
                  Claim $89 Intro Pass
                </PillButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
