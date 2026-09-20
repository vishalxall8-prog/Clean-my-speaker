export type PageRoute =
  | 'home'
  | 'speaker-cleaner'
  | 'water-eject'
  | 'speaker-test'
  | 'left-right-test'
  | 'volume-test'
  | 'faq'
  | 'blog'
  | 'blog-post'
  | 'sitemap'
  | 'contact'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'disclaimer';

export type CleanerMode = 'deep' | 'pulse' | 'sweep' | 'vibrate' | 'gentle';

export interface CleanerPreset {
  id: CleanerMode;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  baseFreq: number;
  pulseRate: number; // Hz
  waveType: OscillatorType;
  accentColor: string;
}

export type FrequencyBand = 'sub-bass' | 'bass' | 'mid' | 'high' | 'sweep' | 'custom';

export interface FrequencyPreset {
  id: FrequencyBand;
  name: string;
  hzRange: string;
  defaultHz: number;
  minHz: number;
  maxHz: number;
  description: string;
  targetAcoustics: string;
}

export type ChannelSide = 'left' | 'right' | 'both' | 'alternate';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  publishDate: string;
  category: 'Cleaning' | 'Diagnostics' | 'Water Damage' | 'Hardware Care';
  coverImageAlt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      tip?: string;
      warning?: string;
    }[];
    conclusion: string;
    recommendedTool: PageRoute;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Water Removal' | 'Safety' | 'Compatibility';
}

export interface AffiliateProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  whyWeRecommend: string;
  rating: number;
  badge?: string;
  externalLink: string;
}

export interface AnalyticsEvent {
  eventName: string;
  params?: Record<string, string | number | boolean>;
  timestamp: number;
}
