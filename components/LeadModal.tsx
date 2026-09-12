"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LeadForm from "./LeadForm";

export function openLeadModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-lead-modal"));
  }
}

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
    }
    window.addEventListener("open-lead-modal", handleOpen);
    return () => window.removeEventListener("open-lead-modal", handleOpen);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg z-10 my-8 rounded-2xl bg-white shadow-2xl border border-slate-ink/10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-body hover:text-navy hover:bg-slate-ink/5 transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="p-2 sm:p-4">
              <LeadForm
                variant="light"
                title="Claim your $89 Intro Offer"
                subtitle="14 days, up to 8 Megaformer classes, 1 guest pass, and 1 InstaRoll session at Roseville."
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
