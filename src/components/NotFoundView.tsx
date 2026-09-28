import React from 'react';
import { Volume2, Droplets, Home, ArrowLeft, Search, HelpCircle, Activity } from 'lucide-react';
import { PageRoute } from '../types';

interface NotFoundViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <div id="not-found-page" className="w-full max-w-2xl mx-auto py-12 px-4 text-center space-y-8">
      {/* 404 Glitch/Sonic Emblem */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-32 h-32 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
          <Volume2 className="w-14 h-14 text-cyan-400 opacity-60 animate-pulse" />
        </div>
        <span className="absolute -bottom-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
          HTTP 404 ERROR
        </span>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Acoustic Signal Lost (404)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
          The requested page or audio test URL does not exist or has been relocated to an updated frequency path.
        </p>
      </div>

      {/* Suggested Quick Links / Actions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-lg mx-auto text-left">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recommended Working Tools &amp; Guides</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => onNavigate('water-eject')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 transition-colors text-slate-200 cursor-pointer"
          >
            <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="font-bold block">Water Eject (165Hz)</span>
              <span className="text-[11px] text-slate-400">Clear wet speakers</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('speaker-cleaner')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-colors text-slate-200 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="font-bold block">Speaker Cleaner</span>
              <span className="text-[11px] text-slate-400">Remove dust &amp; lint</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('speaker-test')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-colors text-slate-200 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold block">Frequency Test</span>
              <span className="text-[11px] text-slate-400">Full 20Hz–20kHz sweep</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('faq')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-colors text-slate-200 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="font-bold block">Help &amp; FAQ</span>
              <span className="text-[11px] text-slate-400">Troubleshooting guides</span>
            </div>
          </button>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-950/50 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to CleanMySpeaker Home</span>
        </button>
      </div>
    </div>
  );
};
