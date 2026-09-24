import React, { useState } from 'react';
import { viralGrowthEngine } from '../lib/viralGrowthEngine';
import { Share2, Check, Copy, MessageCircle, Send, Twitter, Bell, Sparkles, TrendingUp, Users } from 'lucide-react';

export const ViralShareBar: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [reminderScheduled, setReminderScheduled] = useState(false);

  const handleCopy = async () => {
    const success = await viralGrowthEngine.shareNative({
      title: 'Clean My Speaker — Free 165Hz Speaker Cleaner',
      text: '🔊 My phone speaker was muffled from water/dust! I used Clean My Speaker (165Hz tone) and restored audio clarity. Try it free:',
      url: viralGrowthEngine.getShareUrl('copy'),
    });
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadReminder = () => {
    viralGrowthEngine.downloadMaintenanceReminder();
    setReminderScheduled(true);
    setTimeout(() => setReminderScheduled(false), 3000);
  };

  return (
    <aside aria-label="Share Clean My Speaker" className="w-full max-w-4xl mx-auto my-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 p-4 sm:p-5 shadow-xl relative overflow-hidden">
        {/* Subtle accent backdrop */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Hook copy & Live Social Proof */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded-full font-mono uppercase">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                Help a Friend Fix Muffled Audio
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <Users className="w-3 h-3" />
                Over 120k+ shares
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Know someone with a wet or quiet phone speaker?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 max-w-md">
              Share the 165Hz acoustic cleaner tool with friends, family, or social media groups to fix their phone sound instantly.
            </p>
          </div>

          {/* Right: Quick Action Viral Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            {/* WhatsApp */}
            <button
              onClick={() => viralGrowthEngine.openSocialShare('whatsapp')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-transform active:scale-95 cursor-pointer"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>

            {/* Telegram */}
            <button
              onClick={() => viralGrowthEngine.openSocialShare('telegram')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600/90 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-950/40 transition-transform active:scale-95 cursor-pointer"
              title="Share on Telegram"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </button>

            {/* X / Twitter */}
            <button
              onClick={() => viralGrowthEngine.openSocialShare('twitter')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-transform active:scale-95 cursor-pointer"
              title="Share on X"
            >
              <Twitter className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Post</span>
            </button>

            {/* Copy / Native Share */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/40 transition-transform active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-200">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Tool</span>
                </>
              )}
            </button>

            {/* Retention Calendar Reminder */}
            <button
              onClick={handleDownloadReminder}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 transition-colors cursor-pointer"
              title="Add 30-day speaker maintenance reminder to Google/Apple Calendar"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">{reminderScheduled ? 'Reminder Added!' : 'Set Monthly Reminder'}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
