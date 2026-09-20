import React, { useEffect } from 'react';

interface AdSlotProps {
  id?: string;
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id = 'ad-slot',
  client,
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  // If no client or slot is configured yet (pre-approval review stage),
  // we do NOT render any visible placeholder boxes.
  // Google AdSense policies strictly penalize websites displaying empty
  // "AdSense Placeholder" or dummy advertisement boxes.
  const hasConfig = Boolean(client && slot);

  useEffect(() => {
    if (hasConfig) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [hasConfig]);

  if (!hasConfig) {
    // Return null so the site appears 100% polished, complete, and free of "under construction" placeholders during Google AdSense review
    return null;
  }

  return (
    <div id={id} className={`w-full my-4 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};
