"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import clsx from "clsx";
import PillButton from "./PillButton";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  textOptIn: boolean;
  emailOptIn: boolean;
  agreedToTerms: boolean;
}

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  textOptIn: false,
  emailOptIn: false,
  agreedToTerms: false,
};

type Status = "idle" | "loading" | "success" | "error";

interface LeadFormProps {
  variant?: "dark" | "light";
  title?: string;
  subtitle?: string;
}

export default function LeadForm({
  variant = "dark",
  title = "Start your two weeks.",
  subtitle = "First-time clients only, one per person. We'll reach out to get your first class on the calendar at Roseville.",
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // Honeypot value — left blank by real users, filled in by bots that
  // auto-complete every input they find. Never rendered visibly.
  const [honeypot, setHoneypot] = useState("");

  const isDark = variant === "dark";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number";
    }
    if (!form.agreedToTerms) {
      next.agreedToTerms = "Required to continue";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          marketingConsent: form.textOptIn || form.emailOptIn,
          agreeTerms: form.agreedToTerms,
          // Honeypot: real visitors never see or fill this field (see the
          // hidden input below). Sent empty by legitimate submissions.
          company: honeypot,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  const inputClasses = clsx(
    "w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-body/50",
    isDark
      ? "border-white/15 bg-white/5 text-white focus:border-aqua"
      : "border-slate-ink/15 bg-white text-slate-ink focus:border-aqua-dark"
  );

  const labelClasses = clsx(
    "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide",
    isDark ? "text-white/60" : "text-slate-body/70"
  );

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx(
          "flex min-h-[420px] flex-col items-center justify-center rounded-2xl p-8 text-center",
          isDark ? "bg-white/5" : "bg-white"
        )}
      >
        <CheckCircle2 size={44} className="text-aqua-dark" strokeWidth={1.5} />
        <h3
          className={clsx(
            "mt-4 font-serif text-2xl",
            isDark ? "text-white" : "text-navy"
          )}
        >
          You&apos;re on the schedule.
        </h3>
        <p
          className={clsx(
            "mt-2 max-w-[280px] text-sm",
            isDark ? "text-white/70" : "text-slate-body"
          )}
        >
          A coach from Roseville will text or call you shortly to book your
          first class.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className={clsx(
        "rounded-2xl p-6 sm:p-8",
        isDark ? "bg-white/[0.04] border border-white/10" : "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      )}
    >
      <h3
        className={clsx(
          "font-serif text-2xl",
          isDark ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h3>
      <p
        className={clsx(
          "mt-2 text-sm leading-relaxed",
          isDark ? "text-white/60" : "text-slate-body"
        )}
      >
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {/* Honeypot — hidden from sighted and screen-reader users alike via
            aria-hidden + off-screen positioning, but present in the DOM for
            bots that blindly fill every field. tabIndex={-1} keeps it out
            of the keyboard tab order. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
        >
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>First name</label>
            <input
              className={inputClasses}
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className={labelClasses}>Last name</label>
            <input
              className={inputClasses}
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className={labelClasses}>Email address</label>
          <input
            type="email"
            className={inputClasses}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Phone number</label>
          <input
            type="tel"
            className={inputClasses}
            placeholder="(916) 555-0142"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2.5 pt-1">
          <Checkbox
            isDark={isDark}
            checked={form.textOptIn}
            onChange={(v) => update("textOptIn", v)}
            label="Text me studio news and offers"
          />
          <Checkbox
            isDark={isDark}
            checked={form.emailOptIn}
            onChange={(v) => update("emailOptIn", v)}
            label="Email me studio news and offers"
          />
          <Checkbox
            isDark={isDark}
            checked={form.agreedToTerms}
            onChange={(v) => update("agreedToTerms", v)}
            label={
              <>
                I agree to electronically signing the{" "}
                <a href="#" className="underline hover:text-aqua-dark">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-aqua-dark">
                  Privacy Policy
                </a>
                .
              </>
            }
          />
          {errors.agreedToTerms && (
            <p className="text-xs text-red-400">{errors.agreedToTerms}</p>
          )}
        </div>

        <AnimatePresence>
          {status === "error" && serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
            >
              <AlertCircle size={16} />
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        <PillButton
          type="submit"
          fullWidth
          disabled={status === "loading"}
          className="mt-2 flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Claiming your spot...
            </>
          ) : (
            "Claim the $89 intro"
          )}
        </PillButton>
      </form>
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  isDark,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5">
      <span
        className={clsx(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-aqua-dark bg-aqua"
            : isDark
            ? "border-white/25 bg-transparent"
            : "border-slate-ink/25 bg-white"
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-navy" fill="none">
            <path
              d="M2 6l2.5 2.5L10 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={clsx("text-xs leading-relaxed", isDark ? "text-white/70" : "text-slate-body")}>
        {label}
      </span>
    </label>
  );
}
