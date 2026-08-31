import React from 'react';

interface AdSlotProps {
  id?: string;
  format?: 'banner' | 'rectangle' | 'in-article';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id = 'ad-slot-default',
  format = 'banner',
  className = '',
}) => {
  return (
    <div
      id={id}
      className={`w-full mx-auto my-6 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950/40 border border-dashed border-slate-800/80 text-center transition-colors hover:border-slate-700/60 ${className}`}
      style={{
        minHeight: format === 'banner' ? '90px' : format === 'rectangle' ? '250px' : '120px',
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          Advertisement
        </span>
      </div>
      <p className="text-xs text-slate-500 font-medium">
        Google AdSense Placeholder
      </p>
      <span className="text-[10px] text-slate-600 font-mono mt-0.5">
        Responsive Slot ({format}) • Clean, non-intrusive layout
      </span>
    </div>
  );
};
