import React, { useState, useEffect } from 'react';
import { CleaningSession, PageRoute } from '../types';
import { cleaningHistory } from '../lib/cleaningHistory';
import { History, Volume2, Droplets, CheckCircle2, Clock, Trash2, ArrowRight } from 'lucide-react';

interface RecentActivitySectionProps {
  onNavigate?: (page: PageRoute) => void;
}

export const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({ onNavigate }) => {
  const [history, setHistory] = useState<CleaningSession[]>([]);

  useEffect(() => {
    // Initial load
    setHistory(cleaningHistory.getHistory());

    // Listen for local updates dispatched by cleaning tools
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setHistory(e.detail);
      } else {
        setHistory(cleaningHistory.getHistory());
      }
    };

    window.addEventListener('cleaning_history_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('cleaning_history_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleClear = () => {
    cleaningHistory.clearHistory();
    setHistory([]);
  };

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <section id="recent-activity-section" className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-7 shadow-xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Recent Activity</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60 font-medium">
                  Last 5 Sessions
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Local device log of completed acoustic cleaning cycles
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/50 transition-colors cursor-pointer"
              title="Clear cleaning history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Content List */}
        {history.length === 0 ? (
          <div className="py-6 px-4 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center flex flex-col items-center justify-center gap-2">
            <Clock className="w-7 h-7 text-slate-600 mb-1" />
            <p className="text-sm font-medium text-slate-300">
              No cleaning sessions recorded yet
            </p>
            <p className="text-xs text-slate-500 max-w-md">
              Run a 165Hz Water Ejection or Speaker Cleaner cycle above to automatically track and display your speaker maintenance history.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {history.map((session, index) => {
              const isWaterEject = session.toolType === 'water-eject';
              return (
                <div
                  key={session.id || index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  {/* Left: Icon & Title */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isWaterEject
                          ? 'bg-blue-950/80 border-blue-800/60 text-blue-400'
                          : 'bg-cyan-950/80 border-cyan-800/60 text-cyan-400'
                      }`}
                    >
                      {isWaterEject ? (
                        <Droplets className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {session.modeName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-slate-300">
                          {session.durationSeconds}s cycle
                        </span>
                        <span>•</span>
                        <span>{session.formattedDate}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-400">{session.formattedTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Relative Time */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-slate-400 font-mono shrink-0 pl-12 sm:pl-0">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                      {formatRelativeTime(session.timestamp)}
                    </span>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate(session.toolType)}
                        className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold inline-flex items-center gap-1 hover:underline ml-1 cursor-pointer"
                      >
                        <span>Repeat</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
