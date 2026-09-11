"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState<string | null>(null);
  const [hostName, setHostName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setBookingId(params.get("booking_id") || "RNL-" + Math.floor(100000 + Math.random() * 900000));
      setBookingDate(params.get("date") || "Your selected calendar window");
      setEventTitle(params.get("title") || "30-Minute Institutional Discovery Call");
      setHostName(params.get("host") || "Renalytica Research Directorate");
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 font-['Plus_Jakarta_Sans',sans-serif] transition-colors pb-24">
      {/* Top Banner Accent */}
      <div className="h-2 w-full bg-gradient-to-r from-[#FF8000] via-amber-500 to-emerald-500" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-[#FF8000] dark:text-zinc-400 dark:hover:text-[#FF8000] transition-colors"
          >
            &larr; Return to Renalytica Terminal
          </Link>
        </div>

        {/* Hero Confirmation Card */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              CALL CONFIRMED // CALENDAR INVITE DISPATCHED
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              You&apos;re Confirmed. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#FF8000] to-amber-500 bg-clip-text text-transparent">
                We Look Forward to Meeting You.
              </span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Your 30-minute discovery briefing has been booked with the Renalytica Research Directorate.
              An automated calendar invitation containing secure video conference links has been sent to your work email.
            </p>

            {/* Booking Details HUD Box */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs">
              <div>
                <span className="text-zinc-400 uppercase block mb-1">Session Type</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{eventTitle}</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase block mb-1">Booking Ref</span>
                <span className="font-bold text-[#FF8000]">{bookingId}</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase block mb-1">Advisory Desk</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{hostName}</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase block mb-1">Meeting Platform</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Google Meet / Teams</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps & Resource Hub Showcase */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FF8000]">
                PRE-CALL INTELLIGENCE // RECOMMENDED READING
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Explore Renalytica Research Blueprints
              </h2>
            </div>
            <span className="hidden sm:inline-flex text-xs font-mono text-zinc-400">
              PRE-SESSION ASSETS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Methodology Blueprint */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between hover:border-[#FF8000] transition-colors shadow-sm group">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase mb-4">
                  01 // Methodology
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#FF8000] transition-colors">
                  Triangulated Field Intelligence Architecture
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Review how our dual-track field surveying, port throughput audits, and econometric modeling produce institutional-grade certainty.
                </p>
              </div>
              <a
                href="/methodology.html"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#FF8000] group-hover:translate-x-1 transition-transform"
              >
                Read Methodology Blueprint &rarr;
              </a>
            </div>

            {/* Card 2: Research Catalog */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between hover:border-[#FF8000] transition-colors shadow-sm group">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-orange-50 dark:bg-orange-950/40 text-[#FF8000] text-xs font-mono font-bold uppercase mb-4">
                  02 // Flagship Store
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#FF8000] transition-colors">
                  Published Reports &amp; Sector Forecasts
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Inspect our catalog of 10 comprehensive market reports covering African AI adoption, stablecoins, renewable energy, and FMCG supply chains.
                </p>
              </div>
              <a
                href="/reports.html"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#FF8000] group-hover:translate-x-1 transition-transform"
              >
                Explore Report Catalog &rarr;
              </a>
            </div>

            {/* Card 3: Market Insights & Case Studies */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between hover:border-[#FF8000] transition-colors shadow-sm group">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
                  03 // Insights Hub
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#FF8000] transition-colors">
                  Institutional Case Studies &amp; Whitepapers
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Analyze real advisory engagements, cross-border payment modeling, and enterprise scenario stress tests.
                </p>
              </div>
              <a
                href="/insights.html"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#FF8000] group-hover:translate-x-1 transition-transform"
              >
                Browse Whitepapers &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Immediate Assistance & Rescheduling Help */}
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Need to reschedule or add colleagues?</span>
            <span>Use the link directly inside your calendar invitation, or contact the advisory desk directly.</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/2348137538723"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
            >
              WhatsApp Desk &rarr;
            </a>
            <a
              href="mailto:info@renalytica.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-colors"
            >
              Email Advisory
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
