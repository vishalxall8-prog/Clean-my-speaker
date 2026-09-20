import React from 'react';
import {
  ShieldCheck,
  Volume2,
  Droplets,
  Heart,
  Sparkles,
  Award,
  Globe,
  CheckCircle2,
  Mail,
  ArrowRight,
  Cpu,
  Layers,
  Users,
} from 'lucide-react';
import { PageRoute } from '../types';

interface AboutViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div id="about-us-page" className="w-full max-w-5xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 shadow-lg shadow-cyan-950/40">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>About CleanMySpeaker • Mission & Science</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Restoring Crystal-Clear Audio Through{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Acoustic Science
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          CleanMySpeaker is a free, browser-based audio utility developed to help smartphone users safely diagnose, test,
          and clear trapped water droplets and loose dust from mobile speakers without risking hardware damage.
        </p>
      </div>

      {/* Origin Story & Mission Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Our Founding Story</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why We Built CleanMySpeaker
            </h2>

            <p>
              Every single day, millions of people worldwide face a sudden scare: an accidental drop in the kitchen sink,
              walking through heavy monsoon rain, or getting splashed at the pool leaves their smartphone speaker sounding
              muffled, distorted, or completely inaudible.
            </p>

            <p>
              Unfortunately, the most common Internet advice advises users to insert safety pins, blow blazing hot air with
              hair dryers, or submerge devices in bowls of raw rice. These dangerous myths routinely result in permanently
              punctured diaphragms, melted adhesive gaskets, and starch powder ruining delicate audio transducers.
            </p>

            <p>
              We established <strong>CleanMySpeaker</strong> to provide a completely safe, non-invasive, and scientific
              alternative. By utilizing the modern W3C Web Audio API to generate calibrated 165Hz acoustic pulses and resonant
              harmonic frequencies, our tool transforms the speaker’s own voice coil and diaphragm into a miniature air pump—pushing
              liquids outward through physics, with zero physical tools required.
            </p>
          </div>

          {/* Quick Metrics / Mission Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base">Pure Acoustic Science</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Calibrated resonant frequencies (165Hz carrier tone) optimized for mobile speaker diaphragm displacement without clipping.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base">Zero App Downloads</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                100% web-native. Runs instantly in Safari, Chrome, Edge, and Firefox on iOS, Android, macOS, and Windows with zero tracking.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base">Worldwide & Multilingual</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Empowering users across the globe with comprehensive educational troubleshooting guides in English and Hindi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values / Editorial Integrity */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Core Principles & Ethics
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            We hold ourselves to rigorous standards of user transparency, audio engineering, and hardware safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-lg">Radical Honesty</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We never make false marketing promises. Sound waves can eject dislodged moisture and loosened dust, but cannot
              repair physically torn diaphragms or internal motherboard corrosion. We state these limits clearly to protect users.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-lg">Safe Audio Architecture</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              All sound frequencies are generated client-side with safe volume limiters to ensure mobile voice coils are never
              overdriven or subjected to harsh distortion that could fatigue speaker suspensions.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-lg">Community First</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              CleanMySpeaker is permanently free to access without subscription paywalls, intrusive pop-ups, or personal data collection.
              Our goal is to be the web's most trustworthy audio maintenance utility.
            </p>
          </div>
        </div>
      </div>

      {/* How Our Tool Works - Technical Overview */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">The Engineering Behind Sound Ejection</h3>
            <p className="text-xs text-slate-400">How Web Audio API drives physical particle displacement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              1. Acoustic Resonance at 165Hz
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              Standard smartphone micro-transducers exhibit natural mechanical resonance between 150Hz and 180Hz. Generating sound
              in this bandwidth maximizes diaphragm excursion (the physical distance the membrane moves forward and backward)
              without requiring dangerous wattage.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              2. Breaking Liquid Surface Tension
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              Water clings to fine acoustic grill mesh via surface tension. The rhythmic push-pull wave cycles generate miniature
              shockwaves that overcome this adhesive bond, atomizing trapped moisture and propelling droplets out through the mesh openings.
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Feedback Callout */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-800/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>Have Questions or Suggestions?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            We actively listen to community feedback, device test reports, and audio feature suggestions. 
            Reach out directly to our team anytime at <strong className="text-cyan-300 font-mono">km1631513@gmail.com</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Try Speaker Cleaner
          </button>
        </div>
      </div>
    </div>
  );
};
