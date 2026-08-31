import React from 'react';
import { PageRoute } from '../types';
import { Volume2, Droplets, Activity, Headphones, Sliders, HelpCircle, BookOpen, ShieldCheck, Heart, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="w-full bg-[#070a10] border-t border-slate-800/80 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                CleanMySpeaker
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Free, fast, browser-based tools designed to test smartphone audio, clear surface debris with acoustic vibrations, and eject trapped liquid.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Web Audio API Powered • No App Install Required</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Diagnostic Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('speaker-cleaner')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Speaker Cleaner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('water-eject')}
                  className="hover:text-blue-300 transition-colors flex items-center gap-1.5"
                >
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  <span>Water Eject (165Hz)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('speaker-test')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Frequency Sweep Test</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('left-right-test')}
                  className="hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Left / Right Stereo Test</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('volume-test')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Volume & Decibel Test</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Guides & Help
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Audio Knowledge Base</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Frequently Asked Questions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sitemap')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sitemap & robots.txt</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Safety Notice Short */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Safety & Transparency
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Results may vary based on phone make and speaker condition. Acoustic frequencies create physical air pressure, but cannot repair mechanically torn membranes or deep internal corrosion.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CleanMySpeaker. All rights reserved. Clean. Test. Restore Your Sound.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy & Disclaimers
            </button>
            <button
              onClick={() => onNavigate('sitemap')}
              className="hover:text-slate-300 transition-colors"
            >
              Directory
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
