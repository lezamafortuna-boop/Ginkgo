"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_ID, isGaEnabled, trackEvent } from "@/lib/analytics";

// Outside production, events are flagged so they show up in GA4's DebugView
// and are easy to tell apart from real traffic.
const IS_DEV = process.env.NODE_ENV !== "production";

// Loads GA4 and tracks, site-wide and without touching individual links:
//   - page views (including client-side navigation between pages)
//   - clicks on WhatsApp, phone (tel:) and email (mailto:) links
// Form submissions are tracked in lib/leadClient.js.
export default function Analytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // The first page view is sent by the init script below (after gtag is
  // configured); this effect handles every navigation after that.
  useEffect(() => {
    if (!isGaEnabled) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    if (!isGaEnabled) return;

    function handleClick(event) {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const params = { link_location: window.location.pathname };

      if (href.startsWith("tel:")) trackEvent("click_phone", params);
      else if (href.startsWith("mailto:")) trackEvent("click_email", params);
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//.test(href))
        trackEvent("click_whatsapp", params);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!isGaEnabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false${IS_DEV ? ", debug_mode: true" : ""} });
          gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_location: window.location.href,
            page_title: document.title
          });
        `}
      </Script>
    </>
  );
}
