"use client";

import { useState } from "react";
import { Clock, User, Sparkles, Flame, CheckCircle, ChevronRight } from "lucide-react";
import clsx from "clsx";
import PillButton from "./PillButton";
import { openLeadModal } from "./LeadModal";

interface ClassSession {
  id: string;
  time: string;
  period: "morning" | "midday" | "evening";
  title: string;
  duration: string;
  coach: string;
  spotsLeft: number;
  intensity: "High" | "Recovery";
  room: string;
}

const SCHEDULE_DATA: Record<string, ClassSession[]> = {
  Mon: [
    { id: "m1", time: "6:00 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Kristin V.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
    { id: "m2", time: "7:15 AM", period: "morning", title: "MegaCore & Upper", duration: "40 min", coach: "Kristin V.", spotsLeft: 4, intensity: "High", room: "Megaformer Studio" },
    { id: "m3", time: "8:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 1, intensity: "High", room: "Megaformer Studio" },
    { id: "m4", time: "9:45 AM", period: "morning", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 3, intensity: "Recovery", room: "Roll Suite" },
    { id: "m5", time: "12:00 PM", period: "midday", title: "MegaGlutes & Core", duration: "40 min", coach: "Chloe M.", spotsLeft: 5, intensity: "High", room: "Megaformer Studio" },
    { id: "m6", time: "4:30 PM", period: "evening", title: "MegaFullBody", duration: "40 min", coach: "Sarah B.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "m7", time: "5:45 PM", period: "evening", title: "MegaCore & Upper", duration: "40 min", coach: "Sarah B.", spotsLeft: 0, intensity: "High", room: "Megaformer Studio" },
    { id: "m8", time: "6:45 PM", period: "evening", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 4, intensity: "Recovery", room: "Roll Suite" },
  ],
  Tue: [
    { id: "t1", time: "5:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Sarah B.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "t2", time: "6:45 AM", period: "morning", title: "MegaGlutes & Core", duration: "40 min", coach: "Sarah B.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
    { id: "t3", time: "8:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Kristin V.", spotsLeft: 4, intensity: "High", room: "Megaformer Studio" },
    { id: "t4", time: "10:00 AM", period: "morning", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 2, intensity: "Recovery", room: "Roll Suite" },
    { id: "t5", time: "12:15 PM", period: "midday", title: "MegaFullBody", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 1, intensity: "High", room: "Megaformer Studio" },
    { id: "t6", time: "4:45 PM", period: "evening", title: "MegaGlutes & Core", duration: "40 min", coach: "Chloe M.", spotsLeft: 4, intensity: "High", room: "Megaformer Studio" },
    { id: "t7", time: "6:00 PM", period: "evening", title: "MegaFullBody", duration: "40 min", coach: "Chloe M.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
  ],
  Wed: [
    { id: "w1", time: "6:00 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Kristin V.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "w2", time: "7:15 AM", period: "morning", title: "MegaCore & Upper", duration: "40 min", coach: "Kristin V.", spotsLeft: 1, intensity: "High", room: "Megaformer Studio" },
    { id: "w3", time: "8:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 4, intensity: "High", room: "Megaformer Studio" },
    { id: "w4", time: "11:30 AM", period: "midday", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 3, intensity: "Recovery", room: "Roll Suite" },
    { id: "w5", time: "12:30 PM", period: "midday", title: "MegaFullBody", duration: "40 min", coach: "Sarah B.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
    { id: "w6", time: "4:30 PM", period: "evening", title: "MegaGlutes & Core", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "w7", time: "5:45 PM", period: "evening", title: "MegaFullBody", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 0, intensity: "High", room: "Megaformer Studio" },
  ],
  Thu: [
    { id: "th1", time: "5:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Sarah B.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
    { id: "th2", time: "6:45 AM", period: "morning", title: "MegaCore & Upper", duration: "40 min", coach: "Sarah B.", spotsLeft: 4, intensity: "High", room: "Megaformer Studio" },
    { id: "th3", time: "8:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Chloe M.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "th4", time: "10:15 AM", period: "morning", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 2, intensity: "Recovery", room: "Roll Suite" },
    { id: "th5", time: "12:00 PM", period: "midday", title: "MegaGlutes & Core", duration: "40 min", coach: "Kristin V.", spotsLeft: 1, intensity: "High", room: "Megaformer Studio" },
    { id: "th6", time: "5:00 PM", period: "evening", title: "MegaFullBody", duration: "40 min", coach: "Chloe M.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "th7", time: "6:15 PM", period: "evening", title: "MegaFullBody", duration: "40 min", coach: "Chloe M.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
  ],
  Fri: [
    { id: "f1", time: "6:00 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Kristin V.", spotsLeft: 1, intensity: "High", room: "Megaformer Studio" },
    { id: "f2", time: "7:15 AM", period: "morning", title: "MegaGlutes & Core", duration: "40 min", coach: "Kristin V.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "f3", time: "8:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Sarah B.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
    { id: "f4", time: "9:45 AM", period: "morning", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 4, intensity: "Recovery", room: "Roll Suite" },
    { id: "f5", time: "12:00 PM", period: "midday", title: "MegaFullBody - Flash Friday", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 0, intensity: "High", room: "Megaformer Studio" },
    { id: "f6", time: "4:30 PM", period: "evening", title: "MegaFullBody", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 4, intensity: "High", room: "Megaformer Studio" },
  ],
  Sat: [
    { id: "sa1", time: "7:30 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Kristin V.", spotsLeft: 1, intensity: "High", room: "Megaformer Studio" },
    { id: "sa2", time: "8:45 AM", period: "morning", title: "MegaGlutes & Core", duration: "40 min", coach: "Sarah B.", spotsLeft: 0, intensity: "High", room: "Megaformer Studio" },
    { id: "sa3", time: "10:00 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
    { id: "sa4", time: "11:15 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Chloe M.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "sa5", time: "12:30 PM", period: "midday", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 3, intensity: "Recovery", room: "Roll Suite" },
  ],
  Sun: [
    { id: "su1", time: "8:00 AM", period: "morning", title: "MegaFullBody", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 2, intensity: "High", room: "Megaformer Studio" },
    { id: "su2", time: "9:15 AM", period: "morning", title: "MegaCore & Upper", duration: "40 min", coach: "Rosslyn D.", spotsLeft: 0, intensity: "High", room: "Megaformer Studio" },
    { id: "su3", time: "10:30 AM", period: "morning", title: "MegaGlutes & Core", duration: "40 min", coach: "Chloe M.", spotsLeft: 3, intensity: "High", room: "Megaformer Studio" },
    { id: "su4", time: "11:45 AM", period: "morning", title: "InstaRoll Recovery", duration: "45 min", coach: "Staff Coach", spotsLeft: 2, intensity: "Recovery", room: "Roll Suite" },
  ],
};

const DAYS = [
  { key: "Mon", label: "Monday" },
  { key: "Tue", label: "Tuesday" },
  { key: "Wed", label: "Wednesday" },
  { key: "Thu", label: "Thursday" },
  { key: "Fri", label: "Friday" },
  { key: "Sat", label: "Saturday" },
  { key: "Sun", label: "Sunday" },
];

export default function ScheduleGrid() {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [filterPeriod, setFilterPeriod] = useState<"all" | "morning" | "midday" | "evening">("all");
  const [filterType, setFilterType] = useState<"all" | "mega" | "roll">("all");

  const classes = SCHEDULE_DATA[selectedDay] || [];

  const filteredClasses = classes.filter((item) => {
    if (filterPeriod !== "all" && item.period !== filterPeriod) return false;
    if (filterType === "mega" && !item.title.startsWith("Mega")) return false;
    if (filterType === "roll" && !item.title.startsWith("InstaRoll")) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Day Tabs */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 border-b border-slate-ink/10">
        {DAYS.map((d) => {
          const isActive = selectedDay === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
              className={clsx(
                "px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap flex flex-col items-center gap-0.5",
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white text-slate-body hover:text-navy hover:bg-ice border border-slate-ink/10"
              )}
            >
              <span className="text-xs uppercase tracking-wider opacity-70">{d.key}</span>
              <span className="font-semibold text-sm">{d.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-ice p-4 rounded-xl border border-slate-ink/5">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-navy mr-1">Time:</span>
          {(["all", "morning", "midday", "evening"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setFilterPeriod(period)}
              className={clsx(
                "px-3 py-1.5 rounded-lg capitalize transition-colors font-medium",
                filterPeriod === period
                  ? "bg-aqua text-navy font-semibold"
                  : "bg-white text-slate-body hover:text-navy"
              )}
            >
              {period === "all" ? "All Times" : period}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-navy mr-1">Type:</span>
          {(["all", "mega", "roll"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={clsx(
                "px-3 py-1.5 rounded-lg transition-colors font-medium",
                filterType === type
                  ? "bg-navy text-white font-semibold"
                  : "bg-white text-slate-body hover:text-navy"
              )}
            >
              {type === "all" ? "All Formats" : type === "mega" ? "Megaformer" : "InstaRoll"}
            </button>
          ))}
        </div>
      </div>

      {/* Class List */}
      <div className="space-y-3">
        {filteredClasses.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-ink/10 text-slate-body text-sm">
            No classes scheduled matching your selected filters for this day.
          </div>
        ) : (
          filteredClasses.map((item) => {
            const isWaitlist = item.spotsLeft === 0;
            const isRoll = item.title.includes("InstaRoll");

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white border border-slate-ink/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-aqua-dark/50 hover:shadow-md transition-all gap-4"
              >
                {/* Time & Format */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex flex-col items-center justify-center min-w-[90px] px-3 py-2.5 rounded-xl bg-ice text-center border border-slate-ink/5">
                    <span className="font-serif text-base font-bold text-navy">{item.time}</span>
                    <span className="text-[11px] text-slate-body flex items-center gap-1 mt-0.5">
                      <Clock size={11} /> {item.duration}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-serif text-lg font-bold text-navy">{item.title}</h4>
                      {isRoll ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                          <Sparkles size={11} /> Lymphatic Roll
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-aqua-light text-navy px-2 py-0.5 rounded-full">
                          <Flame size={11} className="text-aqua-dark" /> Megaformer
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-body mt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-ink">
                        <User size={12} className="text-aqua-dark" /> Coach {item.coach}
                      </span>
                      <span>&middot;</span>
                      <span>{item.room}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Book Action */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-ink/5">
                  <div className="text-right">
                    {isWaitlist ? (
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        Waitlist Only
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle size={12} /> {item.spotsLeft} {item.spotsLeft === 1 ? "spot" : "spots"} left
                      </span>
                    )}
                  </div>

                  <PillButton
                    onClick={() => openLeadModal()}
                    variant={isWaitlist ? "navy" : "aqua"}
                    className="py-2.5 px-5 text-xs font-semibold whitespace-nowrap flex items-center gap-1"
                  >
                    <span>{isWaitlist ? "Join Waitlist" : "Book Class"}</span>
                    <ChevronRight size={14} />
                  </PillButton>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
