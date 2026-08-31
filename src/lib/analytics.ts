import { AnalyticsEvent } from '../types';

/**
 * Clean, privacy-conscious event tracker
 * Connects with standard dataLayer (GA4 / GTM) if present,
 * and maintains a lightweight in-memory session log for testing.
 */
class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];

  public track(eventName: string, params?: Record<string, string | number | boolean>): void {
    const event: AnalyticsEvent = {
      eventName,
      params,
      timestamp: Date.now(),
    };

    this.events.push(event);

    // Push to Google Tag / GA4 dataLayer if integrated
    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: eventName,
        ...params,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[CleanMySpeaker Analytics]`, eventName, params || {});
    }
  }

  public getRecentEvents(): AnalyticsEvent[] {
    return [...this.events].slice(-20);
  }
}

export const analytics = new AnalyticsTracker();
