import React from 'react';
import { AFFILIATE_PRODUCTS } from '../data/content';
import { Star, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

export const AffiliateSection: React.FC = () => {
  return (
    <section id="affiliate-care-section" className="w-full my-12">
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                Hardware Maintenance Tools
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Recommended Speaker Care & Cleaning Kits
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Physical maintenance tools tested for safe smartphone grille care. We select tools that will never pierce or tear internal acoustic membranes.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Affiliate Disclosure: We may earn a small commission on qualifying purchases at no extra cost to you.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AFFILIATE_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              id={`affiliate-card-${prod.id}`}
              className="rounded-2xl bg-slate-950/70 border border-slate-800/90 p-5 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono">
                    {prod.category}
                  </span>
                  {prod.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {prod.name}
                </h3>

                <div className="flex items-center gap-1 my-2 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-slate-200">{prod.rating}</span>
                  <span className="text-slate-500 text-[11px]">/ 5.0</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {prod.description}
                </p>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-300 leading-normal">
                  <strong className="text-cyan-300">Why we pick this:</strong> {prod.whyWeRecommend}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60">
                <a
                  href={prod.externalLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Check Availability</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
