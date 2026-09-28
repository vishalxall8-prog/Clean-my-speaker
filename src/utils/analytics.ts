/**
 * Privacy-friendly, cookie-consent-respecting client analytics helper.
 * Tracks custom events, user actions (e.g. water eject started, frequency sweep played),
 * and page views. Compatible with Google Analytics (gtag) or privacy-preserving event logs.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, string | number | boolean>) => {
  try {
    // Respect user cookie consent preferences
    const consent = localStorage.getItem('cleanmyspeaker_cookie_consent_v1');
    if (consent) {
      const parsed = JSON.parse(consent);
      if (parsed.status === 'essential_only') {
        // User opted out of non-essential analytics
        return;
      }
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Fail silently
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  try {
    const consent = localStorage.getItem('cleanmyspeaker_cookie_consent_v1');
    if (consent) {
      const parsed = JSON.parse(consent);
      if (parsed.status === 'essential_only') {
        return;
      }
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
    }
  } catch {
    // Fail silently
  }
};
