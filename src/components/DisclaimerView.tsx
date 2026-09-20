import React from 'react';
import { AlertCircle, ArrowLeft, ShieldCheck, HeartPulse, HelpCircle, Mail } from 'lucide-react';
import { PageRoute } from '../types';

interface DisclaimerViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const DisclaimerView: React.FC<DisclaimerViewProps> = ({ onNavigate }) => {
  const supportEmail = 'km1631513@gmail.com';

  return (
    <div id="disclaimer-page" className="w-full max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-lg">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Safety & Hardware Notice</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Disclaimer
        </h1>
        <p className="text-xs text-slate-400">
          CleanMySpeaker • Safety, Technical & Hardware Boundaries
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 text-slate-300 text-sm leading-relaxed shadow-xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-red-400" />
            <span>1. Auditory Health & Hearing Protection</span>
          </h2>
          <p>
            CleanMySpeaker plays synthetic acoustic frequencies, high-displacement pulses, and swept tones across various Hz ranges.
          </p>
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/50 text-red-200 text-xs sm:text-sm">
            <strong>CRITICAL WARNING:</strong> Never place your phone speaker directly against your ears, ear canal, or eyes while test tones are active. Prolonged exposure to concentrated high-decibel audio frequencies can cause temporary or permanent hearing discomfort or damage. Keep the phone at arm’s length.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>2. Technical Limitations of Sound Waves</span>
          </h2>
          <p>
            The acoustic cleaning and water eject algorithms function on mechanical principles of air movement: speaker cones move rapidly back and forth, generating physical air pressure pulses that can shake loose superficial moisture droplets or uncompacted dust on exterior grilles.
          </p>
          <p>
            However, acoustic waves cannot:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
            <li>Reverse chemical corrosion on copper motherboard traces caused by saltwater, soda, or chlorinated water.</li>
            <li>Re-bond or physically patch torn silicone speaker suspensions or punctured acoustic membranes.</li>
            <li>Eliminate sticky sugar residues once completely dried without proper professional isopropyl cleaning.</li>
            <li>Replace professional hardware diagnosis from certified manufacturer technicians (Apple Authorized, Samsung Service Centers).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>3. No Professional Warranty Implied</span>
          </h2>
          <p>
            All information and tools provided on CleanMySpeaker are published in good faith and for general educational and convenience purposes only. CleanMySpeaker does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-800 space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>4. Questions?</span>
          </h2>
          <p>
            If you need further clarification regarding this disclaimer, please contact us at:{' '}
            <a href={`mailto:${supportEmail}`} className="text-cyan-300 font-mono font-semibold hover:underline">
              {supportEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};
