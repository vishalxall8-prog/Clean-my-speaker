/**
 * Haptic Feedback API Utility
 * Provides subtle tactile feedback on mobile devices using navigator.vibrate
 * Safe fallback for browsers/platforms without Vibration API support.
 */

export const haptic = {
  /**
   * Light tactile tap (button clicks, mode changes)
   */
  light(): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Silently ignore if blocked by user preference or platform
      }
    }
  },

  /**
   * Medium confirmation tap (e.g. Start cleaning cycle)
   */
  start(): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        // Short double-pulse: [30ms vibration, 40ms pause, 40ms vibration]
        navigator.vibrate([30, 40, 40]);
      } catch {
        // Silently ignore
      }
    }
  },

  /**
   * Stop / Pause tactile pulse (e.g. Stop cleaning cycle)
   */
  stop(): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        // Single firm buzz: 45ms
        navigator.vibrate(45);
      } catch {
        // Silently ignore
      }
    }
  },

  /**
   * Success / Cycle finished pattern
   */
  success(): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        // Cheerful pattern: [30ms, 30ms, 60ms]
        navigator.vibrate([30, 30, 60]);
      } catch {
        // Silently ignore
      }
    }
  },
};
