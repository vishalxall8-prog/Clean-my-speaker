import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, Check, ExternalLink } from 'lucide-react';
import { PageRoute } from '../types';

interface CookieConsentBannerProps {
  onNavigate: (page: PageRoute) => void;
}

const STORAGE_KEY = 'cleanmyspeaker_cookie_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Subtle delay so user isn't immediately flashed on cold load
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access denied or blocked
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: 'accepted', timestamp: Date.now() }));
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: 'essential_only', timestamp: Date.now() }));
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      id="cookie-consent-banner"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/60 text-slate-300 text-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <Cookie className="w-4 h-4" />
            </div>
            <span>Cookie &amp; Privacy Notice</span>
          </div>
          <button
            onClick={handleEssentialOnly}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close cookie consent banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
          CleanMySpeaker generates precision audio frequencies purely inside your local browser. We use cookies and privacy-friendly telemetry to analyze site speed, secure connections, and provide relevant Google AdSense content in compliance with GDPR &amp; CCPA.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800">
          <button
            type="button"
            onClick={() => onNavigate('privacy')}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>Read Privacy Policy</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="cookie-essential-btn"
              onClick={handleEssentialOnly}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <button
              type="button"
              id="cookie-accept-all-btn"
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-[11px] transition-all shadow-md shadow-cyan-950/40 cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
