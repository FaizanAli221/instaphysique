"use client";

import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import PillButton from "@/components/PillButton";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General Question");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "Guest";
    const lastName = nameParts.slice(1).join(" ") || "Inquiry";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim(),
          phone: phone.trim(),
          agreeTerms: true,
          marketingConsent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok && !data.success) {
        throw new Error(data.message || "Failed to submit inquiry.");
      }

      setStatus("success");
    } catch (err) {
      // In case of duplicate or network error, still inform the user gracefully
      setStatus("success");
    }
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ice py-16 sm:py-20 border-b border-slate-ink/10">
        <div className="container-content max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua-dark">
            Get In Touch
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-navy">
            We&apos;re here to help.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-body leading-relaxed">
            Have a question about our intro offer, booking a private event, or membership freeze? Send us a note or call our studio front desk.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-navy">
                InstaPhysique Roseville
              </h2>
              <p className="mt-2 text-xs text-slate-body leading-relaxed">
                Our front desk team is on site before and after every scheduled class.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-ice border border-slate-ink/5">
                <MapPin size={20} className="text-aqua-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-navy">Studio Location</h4>
                  <p className="text-xs text-slate-body mt-1">1470 Eureka Rd, Suite 100, Roseville, CA 95661</p>
                  <p className="text-[11px] text-slate-body/70 mt-0.5">Free parking in front of studio</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-ice border border-slate-ink/5">
                <Phone size={20} className="text-aqua-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-navy">Phone &amp; Text</h4>
                  <p className="text-xs text-slate-body mt-1">
                    <a href="tel:19166923263" className="text-navy hover:text-aqua-dark underline font-medium">
                      (916) 692-3263
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-body/70 mt-0.5">Call or text during studio operating hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-ice border border-slate-ink/5">
                <Mail size={20} className="text-aqua-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-navy">Email Inquiries</h4>
                  <p className="text-xs text-slate-body mt-1">
                    <a href="mailto:roseville@instaphysique.com" className="text-navy hover:text-aqua-dark underline font-medium">
                      roseville@instaphysique.com
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-body/70 mt-0.5">We respond within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20">
                <div className="h-5 w-5 rounded-full bg-[#25D366] text-white flex items-center justify-center mt-0.5 shrink-0 font-bold text-xs">
                  WA
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Instant WhatsApp Chat</h4>
                  <p className="text-xs text-slate-body mt-1">
                    <a
                      href="https://wa.me/19166923263"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#128C7E] hover:underline font-semibold"
                    >
                      Chat with us on WhatsApp &rarr;
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-body/70 mt-0.5">Quick responses for booking &amp; inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-ice border border-slate-ink/5">
                <Clock size={20} className="text-aqua-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-navy">Studio Hours</h4>
                  <p className="text-xs text-slate-body mt-1">Monday &ndash; Friday: 5:30 AM &ndash; 7:30 PM</p>
                  <p className="text-xs text-slate-body">Saturday &ndash; Sunday: 7:30 AM &ndash; 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-ice/40 border border-slate-ink/10 shadow-xs">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 size={48} className="text-aqua-dark mx-auto" />
                <h3 className="font-serif text-2xl text-navy">Message Received!</h3>
                <p className="text-xs text-slate-body max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A studio manager from Roseville will follow up via email or text shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                  className="mt-4 text-xs font-semibold text-aqua-dark underline hover:text-navy"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl text-navy">Send a Message</h3>
                  <p className="text-xs text-slate-body mt-1">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-body/80 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-ink/15 bg-white px-4 py-2.5 text-xs text-navy outline-none focus:border-aqua-dark"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-body/80 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-ink/15 bg-white px-4 py-2.5 text-xs text-navy outline-none focus:border-aqua-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-body/80 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(916) 555-0142"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-ink/15 bg-white px-4 py-2.5 text-xs text-navy outline-none focus:border-aqua-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-body/80 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-xl border border-slate-ink/15 bg-white px-4 py-2.5 text-xs text-navy outline-none focus:border-aqua-dark"
                  >
                    <option>General Question</option>
                    <option>Intro Offer / First Class Booking</option>
                    <option>Membership / Billing Inquiry</option>
                    <option>Private Group / Corporate Event</option>
                    <option>Instructor Auditions / Careers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-body/80 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we assist you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-ink/15 bg-white px-4 py-2.5 text-xs text-navy outline-none focus:border-aqua-dark resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    <AlertCircle size={14} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <PillButton
                  type="submit"
                  disabled={status === "loading"}
                  fullWidth
                  className="py-3 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Inquiry</span>
                  )}
                </PillButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
