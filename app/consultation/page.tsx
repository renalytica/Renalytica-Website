import React from "react";
import BookingWidget from "@/components/BookingWidget";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule a Discovery Call | Institutional Research Advisory — Renalytica",
  description:
    "Book a complimentary 30-minute institutional discovery call with Renalytica's senior macroeconomic analysts and industry researchers.",
  openGraph: {
    title: "Schedule a Discovery Call — Renalytica Research Advisory",
    description:
      "Direct 1-on-1 discovery briefing on African market entry, commodity forecasting, and custom research scopes.",
    url: "https://www.renalytica.com/consultation",
  },
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16 border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            {/* Status Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF8000] animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FF8000]">
                DIRECT ADVISORY ACCESS // NO SALES MIDDLEMEN
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans',sans-serif] leading-tight">
              Schedule Your 30-Minute <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#FF8000] to-amber-500 bg-clip-text text-transparent">
                Institutional Discovery Call
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              Meet directly with a lead macroeconomic researcher. We will review your 
              strategic objectives, evaluate relevant datasets, and structure custom 
              intelligence deliverables tailored to your mandate.
            </p>
          </div>

          {/* Value Props Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-[#FF8000] shrink-0 font-bold">
                01
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Zero Commercial Friction</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Complimentary 30-minute discovery call with no automated billing or sales pressure.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-[#FF8000] shrink-0 font-bold">
                02
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Senior Research Directors</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Speak with actual econometricians and field research heads, not SDRs.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-[#FF8000] shrink-0 font-bold">
                03
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Instant Calendar Sync</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Automated Google Meet or Microsoft Teams invitations dispatched in seconds.</p>
              </div>
            </div>
          </div>

          {/* Phase 3 & 4: Inline Booking Widget */}
          <div className="max-w-4xl mx-auto">
            <BookingWidget
              calLink="renalytica/30min"
              onSuccessRedirectUrl="/thank-you"
              utmSource="renalytica_portal"
              utmMedium="consultation_route"
              utmCampaign="discovery_call_30min"
            />
          </div>
        </div>
      </section>

      {/* Advisory Desk FAQs */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-center mb-8">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h4 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
              What happens during the 30-minute discovery call?
            </h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We review your specific investment thesis, regional market entry questions, or data requirements. 
              Our team shares sample methodologies, discusses relevant proprietary indices, and scopes next steps if custom research is needed.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h4 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
              Can we sign an NDA prior to our conversation?
            </h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Yes. Renalytica routinely executes mutual confidentiality agreements with institutional funds, sovereign wealth advisors, and corporate strategists prior to exploratory briefings.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h4 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
              How do I reschedule or invite team colleagues?
            </h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The confirmation email from Cal.com includes a one-click rescheduling link and ICS calendar file. You can also forward the invite to any colleagues who should join the briefing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
