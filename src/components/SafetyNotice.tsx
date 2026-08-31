import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle, Wrench } from 'lucide-react';

export const SafetyNotice: React.FC = () => {
  return (
    <section id="safety-guidelines-section" className="w-full my-12">
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10">
        <div className="flex items-center gap-2.5 mb-3">
          <ShieldAlert className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Speaker Safety & Honest Limitations
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed mb-6">
          CleanMySpeaker is designed to use natural physical air displacement from sound waves to assist in clearing debris and water droplets. We believe in 100% transparency regarding what sound waves can and cannot accomplish.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Safe Practices */}
          <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-5">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Recommended Safe Practices (DO)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Moderate Volume:</strong> Keep volume around 70–80% for sufficient acoustic airflow without audio amplifier clipping.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Speaker Pointing Down:</strong> Allow gravity to carry dislodged dust or liquid drops onto a dry cloth.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Soft Brushes Only:</strong> Use ultra-soft nylon bristles held at an angle to sweep surface dust away.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Allow Full Drying:</strong> If wet, let the device dry in ventilated ambient air for several hours before plugging in.</span>
              </li>
            </ul>
          </div>

          {/* Dangerous Practices */}
          <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 p-5">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm mb-3">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>Harmful Mistakes to Avoid (DON'T)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Sharp Objects:</strong> Never stick needles, safety pins, toothpicks, or paperclips into speaker holes. This pierces the waterproof seal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No High-Pressure Air:</strong> Compressed canned air canisters can rupture the delicate internal speaker cone.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Direct Liquid Submersion:</strong> Never rinse your phone in sinks or immerse it in chemical baths.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Ear Proximity:</strong> Never hold the device directly against your eardrum while running test tones.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* When to Seek Professional Repair */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
          <Wrench className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">When to visit an authorized technician:</strong> If your speaker remains completely silent, makes a loud buzzing rattle at all volumes, or was submerged in saltwater/corrosive fluids, the voice coil or mainboard may need physical replacement.
          </div>
        </div>
      </div>
    </section>
  );
};
