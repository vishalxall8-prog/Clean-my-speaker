import { CleaningSession } from '../types';

const STORAGE_KEY = 'cleanmyspeaker_cleaning_history';
const MAX_SESSIONS = 5;

export const cleaningHistory = {
  getHistory(): CleaningSession[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, MAX_SESSIONS);
      }
      return [];
    } catch (e) {
      console.error('Failed to read cleaning history:', e);
      return [];
    }
  },

  recordSession(data: {
    toolType: 'speaker-cleaner' | 'water-eject';
    modeName: string;
    durationSeconds: number;
  }): CleaningSession {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newSession: CleaningSession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      toolType: data.toolType,
      modeName: data.modeName,
      durationSeconds: data.durationSeconds,
      timestamp: now.getTime(),
      formattedDate,
      formattedTime,
    };

    if (typeof window !== 'undefined') {
      try {
        const existing = cleaningHistory.getHistory();
        const updated = [newSession, ...existing].slice(0, MAX_SESSIONS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('cleaning_history_updated', { detail: updated }));
      } catch (e) {
        console.error('Failed to save cleaning session to history:', e);
      }
    }

    return newSession;
  },

  clearHistory(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('cleaning_history_updated', { detail: [] }));
      } catch (e) {
        console.error('Failed to clear cleaning history:', e);
      }
    }
  },
};
