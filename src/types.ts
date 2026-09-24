export type PageRoute =
  | 'home'
  | 'speaker-cleaner'
  | 'water-eject'
  | 'speaker-test'
  | 'left-right-test'
  | 'volume-test'
  | 'ai-chat'
  | 'faq'
  | 'blog'
  | 'blog-post'
  | 'sitemap'
  | 'contact'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'disclaimer';

export interface ChatSource {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  sources?: ChatSource[];
  searchQueries?: string[];
  isError?: boolean;
}

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

export interface CleaningSession {
  id: string;
  toolType: 'speaker-cleaner' | 'water-eject';
  modeName: string;
  durationSeconds: number;
  timestamp: number;
  formattedDate: string;
  formattedTime: string;
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
  url?: string;
  title: string;
  mainKeyword?: string;
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
      listType?: 'ordered' | 'unordered';
      listItems?: string[];
      tip?: string;
      warning?: string;
      cta?: {
        text: string;
        target: PageRoute;
      };
    }[];
    faqs?: {
      question: string;
      answer: string;
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
