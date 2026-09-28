import React from 'react';
import {
  Waves,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Droplets,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { PageRoute } from '../types';

interface AuthoritativeContentSectionProps {
  onNavigate: (page: PageRoute) => void;
}

export const AuthoritativeContentSection: React.FC<AuthoritativeContentSectionProps> = ({ onNavigate }) => {
  return (
    <section id="authoritative-guide-section" className="space-y-12 my-12 text-slate-300">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60 shadow-md">
          <Waves className="w-3.5 h-3.5 text-cyan-400" />
          <span>Acoustic Science & Hardware Care</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How Acoustic Sound Cleans Phone Speakers & Expels Water
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          An authoritative engineering breakdown of micro-transducer resonance, acoustic surface tension disruption, and safe maintenance protocols.
        </p>
      </div>

      {/* 1. THE SCIENCE OF 165HZ RESONANCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              The 165Hz Acoustic Resonance Principle
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Smartphone micro-speakers (12mm–16mm) have a natural mechanical resonant frequency between <strong>150 Hz and 180 Hz</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Synthesizing 165Hz pulsed tones maximizes cone excursion with minimal power, creating a gentle air current that propels trapped dust and moisture outward through the speaker grille.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-cyan-300 flex items-center gap-3">
            <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>Pushes trapped moisture outward safely without pulling it deeper into internal cavities.</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Overcoming Surface Tension (Capillarity)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When phones get wet, water droplets lodge in the microscopic speaker mesh holes due to capillary surface tension, creating an acoustic barrier that muffles sound.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Rapid 6Hz amplitude modulation shakes the droplet surface, breaking the capillary hold and allowing water droplets to roll out onto a cloth.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-blue-300 flex items-center gap-3">
            <Activity className="w-4 h-4 shrink-0 text-blue-400" />
            <span>Uses the same acoustic expulsion principle found in modern smartwatches with water-lock.</span>
          </div>
        </div>
      </div>

      {/* 2. DOs AND DON'Ts PROTOCOL */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Emergency Care Protocol: The Do’s and Don’ts of Wet Speakers
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Improper cleaning attempts cause far more permanent speaker failures than the water itself. Follow these lab-tested guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SAFE ACTIONS */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Safe Practices</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Orient Speaker Downward:</strong> Allow gravity to pull expelled droplets away from the phone body onto an absorbent microfiber towel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Moderate Volume Levels:</strong> Run cleaning cycles at 70% to 80% volume. Excessive hardware volume overdriving can cause thermal stress on the voice coil.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Use Anti-Static Soft Brushes:</strong> For dry dust or lint, gently sweep a super-soft makeup brush or specialized electronics brush diagonally across the grille.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Passive Desiccation with Silica Gel:</strong> If humidity remains, place the phone in a sealed container with rechargeable silica gel desiccant packs for 4 to 8 hours.</span>
              </li>
            </ul>
          </div>

          {/* DANGEROUS ACTIONS */}
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-800/40 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <XCircle className="w-4 h-4" />
              <span>Dangerous Methods to Avoid</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Never Use Needles or Safety Pins:</strong> Poking pins or SIM ejectors into speaker holes will puncture the delicate waterproof ePTFE acoustic membrane.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Never Use Compressed Canned Air:</strong> High-pressure blasts will rupture the fragile speaker cone or push dirt deeper into the motherboard cavity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Avoid the Raw Rice Myth:</strong> Rice dust, starch, and grains enter USB-C and speaker ports, mixing with moisture to form a hard, damaging residue.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>No Hair Dryers or Heat Guns:</strong> Excess heat melts the internal waterproof adhesive gaskets sealing your phone's screen and battery.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. UNDERSTANDING IP RATINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-white">IP67 Rating</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rated for complete dust protection and water submersion up to 1 meter (approx. 3.3 ft) for up to 30 minutes in still freshwater. Droplets can still cling to outer speaker ports and cause muffling.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-white">IP68 Rating</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Engineered for deeper immersion (typically up to 6 meters on modern iPhones and Samsung Galaxy devices) for 30 minutes. Acoustic grilles are protected by hydrophobic mesh that requires acoustic vibration to shed water drops.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-white">Saltwater & Chlorine Risk</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            IP ratings strictly certify freshwater tests. Saltwater, pool chlorine, and soapy bath water can corrode contacts and leave behind crystallizing salts that harden on speaker cones. Rinse gently with a tiny amount of freshwater before ejecting.
          </p>
        </div>
      </div>

      {/* 4. COMPREHENSIVE AUDIO TESTING & DIAGNOSTICS SUITE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">
              Full Diagnostic Testing Suite
            </h3>
            <p className="text-xs text-slate-400">
              After running acoustic cleaning or water ejection, verify your sound quality across our 4 specialized audio tools.
            </p>
          </div>
          <button
            onClick={() => onNavigate('speaker-test')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-lg cursor-pointer shrink-0"
          >
            <span>Launch Frequency Sweep</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('speaker-cleaner')}
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer space-y-2 group"
          >
            <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300">1. Speaker Cleaner</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Multi-mode pulses (165Hz harmonic, dynamic sweep, sub-bass push) for general dust and debris agitation.
            </p>
          </div>

          <div
            onClick={() => onNavigate('water-eject')}
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer space-y-2 group"
          >
            <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300">2. Water Eject</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Targeted high-amplitude liquid dislodgment tones with positioning timer and vibration guidance.
            </p>
          </div>

          <div
            onClick={() => onNavigate('left-right-test')}
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer space-y-2 group"
          >
            <span className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300">3. Stereo Panning</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Verify stereo separation between top earpiece speaker and bottom main loudspeaker channel.
            </p>
          </div>

          <div
            onClick={() => onNavigate('volume-test')}
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer space-y-2 group"
          >
            <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300">4. Volume & Clarity</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Calibrated decibel step ladder, pink noise testing, and voice clarity intelligibility check.
            </p>
          </div>
        </div>
      </div>

      {/* 5. EDITORIAL STANDARDS & AUTHOR CONTACT */}
      <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-semibold text-slate-200">
            Authored & Reviewed by CleanMySpeaker Audio Systems Team
          </p>
          <p className="text-[11px] text-slate-500">
            Adhering to strict E-E-A-T publisher guidelines, safe digital gain ceilings, and non-invasive acoustic methods.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('about')}
            className="text-cyan-400 hover:underline font-medium"
          >
            About Our Mission
          </button>
          <span className="text-slate-700">•</span>
          <button
            onClick={() => onNavigate('contact')}
            className="text-cyan-400 hover:underline font-medium"
          >
            Contact Support
          </button>
          <span className="text-slate-700">•</span>
          <button
            onClick={() => onNavigate('privacy')}
            className="text-cyan-400 hover:underline font-medium"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </section>
  );
};
