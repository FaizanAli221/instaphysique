"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const FAQS = [
  {
    q: "I've never done Lagree or Megaformer. Is this beginner friendly?",
    a: "Yes — most first-timers land in this class. Coaches walk you through the machine and every move before class starts, and offer easier variations throughout without you needing to ask.",
  },
  {
    q: "Is it safe for my back and knees?",
    a: "The Megaformer's spring-based resistance is low-impact by design: no jumping, no pounding. Coaches will cue joint-friendly modifications if you flag any concerns before class.",
  },
  {
    q: "Will the class times actually work for me?",
    a: "The Roseville schedule runs early morning through evening on weekdays, plus weekend classes. You can book any class during your two weeks — most people settle into three or four a week.",
  },
  {
    q: "When can I use the guest pass and the roll massage?",
    a: "Both are valid any time during your 14 days. Most people bring a friend to one of their first few classes and book the InstaRoll session in the day or two after a tough class.",
  },
  {
    q: "What does the Roseville studio have?",
    a: "Grip sock rentals, filtered water, and free on-site parking. Doors open 15 minutes before each class so you have time to settle in.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-ice py-16 sm:py-20">
      <div className="container-content grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aqua-dark">
            Before you book
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-navy">
            Questions we get every week.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-body">
            Still stuck? Call the studio at{" "}
            <a href="tel:19166923263" className="font-medium text-aqua-dark underline">
              (916) 692-3263
            </a>{" "}
            &mdash; a real person picks up.
          </p>
        </div>

        <div className="divide-y divide-slate-ink/10 border-t border-slate-ink/10">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-medium text-navy">{item.q}</span>
                  <Plus
                    size={18}
                    className={clsx(
                      "shrink-0 text-aqua-dark transition-transform duration-200",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm leading-relaxed text-slate-body">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
