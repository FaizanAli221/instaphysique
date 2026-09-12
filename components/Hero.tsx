"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import PillButton from "./PillButton";

export default function Hero() {
  return (
    <section id="top" className="bg-ice">
      <div className="container-content grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-2 md:py-0 md:min-h-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[520px]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
            New client intro offer &middot; Roseville
          </p>

          <h1 className="mt-4 font-serif text-[40px] leading-[1.1] text-navy sm:text-5xl">
            Two weeks on the Megaformer.{" "}
            <span className="text-aqua-dark">$89.</span>
          </h1>

          <p className="mt-5 text-[15px] leading-relaxed text-slate-body">
            Up to 8 classes, plus a guest pass and one InstaRoll lymphatic
            massage. 40 minutes a class. 12 people max. Tough on muscles,
            gentle on your joints.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-aqua-dark">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-ink">
              5.0 &middot; 89 Google reviews
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-body">
            <Award size={16} className="text-aqua-dark" />
            Voted Best Fitness Center in Sacramento, 2025
          </div>

          <a href="#claim" className="mt-8 inline-block">
            <PillButton>Claim the $89 intro</PillButton>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px] md:h-[480px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
            alt="Members mid-class on Megaformer machines at InstaPhysique Roseville"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
