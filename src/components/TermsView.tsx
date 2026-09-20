import React from 'react';
import { FileText, ArrowLeft, ShieldAlert, CheckCircle, Scale, AlertTriangle, Mail } from 'lucide-react';
import { PageRoute } from '../types';

interface TermsViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 20, 2026';
  const supportEmail = 'km1631513@gmail.com';

  return (
    <div id="terms-of-service-page" className="w-full max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60 shadow-lg">
          <Scale className="w-3.5 h-3.5 text-blue-400" />
          <span>Legal Agreement</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: <span className="text-slate-200 font-medium">{lastUpdated}</span> • CleanMySpeaker
        </p>
      </div>

      {/* Main Content Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 text-slate-300 text-sm leading-relaxed shadow-xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or using <strong>CleanMySpeaker</strong> (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access or use the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>2. Nature and Intended Use of the Service</span>
          </h2>
          <p>
            CleanMySpeaker is an acoustic frequency generator designed to play calibrated sound tones (such as 165Hz pulses, harmonic sweeps, and channel separation signals) through your device speakers. The utility is intended to assist in agitating loose debris, pocket lint, or trapped water droplets at the surface of acoustic grilles.
          </p>
          <p>
            The Service is provided free of charge for personal, non-commercial convenience.
          </p>
        </section>

        <section className="space-y-3 p-5 rounded-2xl bg-slate-950/70 border border-amber-800/40">
          <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>3. Limitation of Liability & Hardware Disclaimer</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            <strong>Use at your own discretion:</strong> CleanMySpeaker does not guarantee that sound waves will recover any device from water damage or physical debris accumulation. Water damage is a complex physical and chemical process that can cause electrical short circuits or corrosion to internal motherboard traces.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400 mt-2">
            <li>We are not liable for any pre-existing or progressive liquid damage to your mobile phone or accessory.</li>
            <li>Users are strictly responsible for maintaining reasonable volume levels. Do NOT hold speakers directly against ears during playback.</li>
            <li>Sound waves cannot physically reconstruct torn speaker diaphragms or burned voice coils.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-400" />
            <span>4. Prohibited Uses</span>
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
            <li>Use the website in any way that causes, or may cause, damage to the website or impairment of availability.</li>
            <li>Conduct any automated data collection activities (scraping, data mining, harvesting) without express written consent.</li>
            <li>Attempt to reverse-engineer or circumvent client-side security sandboxes.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            5. Intellectual Property
          </h2>
          <p>
            The CleanMySpeaker name, branding, custom audio generator algorithms, interface design, guides, and educational articles are the intellectual property of CleanMySpeaker and protected by applicable copyright and trademark laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. Material changes will be indicated by updating the "Last Updated" date at the top of this page.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-800 space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>7. Contact Us</span>
          </h2>
          <p>
            Questions regarding our Terms of Service should be directed to:{' '}
            <a href={`mailto:${supportEmail}`} className="text-cyan-300 font-mono font-semibold hover:underline">
              {supportEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};
