"use client";

import React, { useEffect, useId, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export interface BookingWidgetProps {
  /**
   * Cal.com event path or link. Defaults to 'renalytica/30min'
   * representing the 30-Minute Institutional Discovery Call.
   */
  calLink?: string;

  /**
   * Optional custom embed namespace to avoid collision when multiple widgets exist.
   */
  namespace?: string;

  /**
   * Embed color theme. Defaults to 'auto' to synchronize with Renalytica's canvas mode.
   */
  theme?: "light" | "dark" | "auto";

  /**
   * Attribution parameters (overrides query string if provided)
   */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;

  /**
   * Custom redirect path on booking confirmation. Defaults to '/thank-you'
   */
  onSuccessRedirectUrl?: string;

  /**
   * Optional pre-populated prospect data
   */
  prefill?: {
    name?: string;
    email?: string;
    notes?: string;
  };

  /**
   * Additional Tailwind or CSS class names for container
   */
  className?: string;
}

/**
 * BookingWidget
 * Enterprise-grade Cal.com scheduling embed for Renalytica.
 * Features:
 * - 30-Minute Discovery Call default configuration
 * - Automatic instant booking approval with video conferencing link
 * - Minimalist frictionless form (Name, Work Email, Project Requirements)
 * - Brand styling injection (Momentum Orange #FF8000 & Obsidian Canvas)
 * - Client-side UTM attribution tracking
 * - Smooth post-booking redirect to /thank-you
 */
export const BookingWidget: React.FC<BookingWidgetProps> = ({
  calLink = process.env.NEXT_PUBLIC_CAL_LINK || "renalytica/30min",
  namespace = "renalytica-discovery",
  theme = "auto",
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  utmTerm,
  onSuccessRedirectUrl = "/thank-you",
  prefill,
  className = "",
}) => {
  const widgetId = useId();
  const [mounted, setMounted] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");

  // Synchronize with document theme attribute
  useEffect(() => {
    setMounted(true);
    const detectTheme = () => {
      const docTheme = document.documentElement.getAttribute("data-theme");
      const isDark =
        docTheme === "dark" ||
        (!docTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setActiveTheme(isDark ? "dark" : "light");
    };

    detectTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Initialize Cal.com Embed API with Renalytica custom brand and event handlers
  useEffect(() => {
    let isSubscribed = true;

    async function initCal() {
      try {
        const cal = await getCalApi({ namespace });
        if (!cal || !isSubscribed) return;

        // 1. Inject Renalytica Brand Colors & Typography
        cal("ui", {
          styles: {
            branding: {
              brandColor: "#FF8000", // Momentum Orange
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            light: {
              "cal-brand": "#FF8000",
              "cal-brand-emphasis": "#E67300",
              "cal-brand-text": "#FFFFFF",
              "cal-border-booker": "#E5E7EB",
              "cal-bg": "#FFFFFF",
              "cal-text": "#0A0A0A",
            },
            dark: {
              "cal-brand": "#FF8000",
              "cal-brand-emphasis": "#FF9429",
              "cal-brand-text": "#0A0A0A",
              "cal-border-booker": "#27272A",
              "cal-bg": "#0A0A0A",
              "cal-text": "#F9FAFB",
            },
          },
        });

        // 2. Register Booking Success Callback with smooth redirection
        cal("on", {
          action: "bookingSuccessful",
          callback: (e: any) => {
            if (!isSubscribed) return;
            const booking = e?.data || {};
            const params = new URLSearchParams();

            if (booking.uid) params.set("booking_id", booking.uid);
            if (booking.date) params.set("date", booking.date);
            if (booking.eventTitle) params.set("title", booking.eventTitle);
            if (booking.organizer?.name) params.set("host", booking.organizer.name);

            // Forward attribution context
            const currentParams = new URLSearchParams(window.location.search);
            const source = currentParams.get("utm_source") || utmSource || "direct";
            const medium = currentParams.get("utm_medium") || utmMedium || "consultation";
            const campaign = currentParams.get("utm_campaign") || utmCampaign || "discovery_call";
            params.set("utm_source", source);
            params.set("utm_medium", medium);
            params.set("utm_campaign", campaign);

            const destination = `${onSuccessRedirectUrl}?${params.toString()}`;
            
            // Client-side smooth navigation fallback
            if (typeof window !== "undefined") {
              window.location.href = destination;
            }
          },
        });
      } catch (err) {
        console.warn("[Renalytica:Cal] Failed to initialize Cal embed API:", err);
      }
    }

    initCal();

    return () => {
      isSubscribed = false;
    };
  }, [namespace, utmSource, utmMedium, utmCampaign, onSuccessRedirectUrl]);

  // Derive UTM attribution context from current URL or props
  const getResolvedUtm = () => {
    if (typeof window === "undefined") {
      return {
        utm_source: utmSource || "renalytica",
        utm_medium: utmMedium || "web_portal",
        utm_campaign: utmCampaign || "institutional_discovery",
        utm_content: utmContent || "discovery_call_30min",
        utm_term: utmTerm || "african_market_intelligence",
      };
    }

    const searchParams = new URLSearchParams(window.location.search);
    return {
      utm_source: searchParams.get("utm_source") || utmSource || "renalytica",
      utm_medium: searchParams.get("utm_medium") || utmMedium || "consultation_page",
      utm_campaign: searchParams.get("utm_campaign") || utmCampaign || "discovery_call",
      utm_content: searchParams.get("utm_content") || utmContent || "inline_booking_widget",
      utm_term: searchParams.get("utm_term") || utmTerm || "african_market_research",
    };
  };

  const utmResolved = getResolvedUtm();

  return (
    <div
      id={`booking-widget-container-${widgetId}`}
      className={`relative w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 md:p-8 shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Telemetry Header Strip */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              ADVISORY DESK ONLINE // DIRECT CALENDAR SYNC
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-['Plus_Jakarta_Sans',sans-serif]">
            30-Minute Institutional Discovery Call
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Select a convenient time slot with our Senior Macro Research Directors. 
            All calls are automatically confirmed with instant Google Meet / Microsoft Teams credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 border border-zinc-200 dark:border-zinc-800">
            <svg className="w-3.5 h-3.5 text-[#FF8000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            30 Min
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 border border-emerald-200/50 dark:border-emerald-800/40">
            Complimentary / No Fee
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 border border-zinc-200 dark:border-zinc-800">
            Instant Confirmation
          </span>
        </div>
      </div>

      {/* Cal.com React Embed Component */}
      <div className="w-full min-h-[680px] rounded-xl overflow-hidden bg-transparent">
        {mounted && (
          <Cal
            namespace={namespace}
            calLink={calLink}
            style={{ width: "100%", height: "100%", minHeight: "680px", overflow: "scroll" }}
            config={{
              layout: "month_view",
              theme: theme === "auto" ? activeTheme : theme,
              name: prefill?.name,
              email: prefill?.email,
              notes: prefill?.notes,
              utm_source: utmResolved.utm_source,
              utm_medium: utmResolved.utm_medium,
              utm_campaign: utmResolved.utm_campaign,
              utm_content: utmResolved.utm_content,
              utm_term: utmResolved.utm_term,
            }}
          />
        )}
      </div>

      {/* Security & Confidentiality Footer */}
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>All consultation discussions are protected by Renalytica Mutual Commercial NDA.</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Encrypted via TLS 1.3</span>
          <span>&bull;</span>
          <span>Zero Spam Policy</span>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
