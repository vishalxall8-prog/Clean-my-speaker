import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { SpeakerCleanerTool } from './components/SpeakerCleanerTool';
import { WaterEjectTool } from './components/WaterEjectTool';
import { SpeakerTestTool } from './components/SpeakerTestTool';
import { LeftRightTestTool } from './components/LeftRightTestTool';
import { VolumeTestTool } from './components/VolumeTestTool';
import { SafetyNotice } from './components/SafetyNotice';
import { FAQSection } from './components/FAQSection';
import { AffiliateSection } from './components/AffiliateSection';
import { HindiSpeakerGuide } from './components/HindiSpeakerGuide';
import { BlogView } from './components/BlogView';
import { BlogSection } from './components/BlogSection';
import { SitemapView } from './components/SitemapView';
import { ContactView } from './components/ContactView';
import { AboutView } from './components/AboutView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsView } from './components/TermsView';
import { DisclaimerView } from './components/DisclaimerView';
import { NotFoundView } from './components/NotFoundView';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AuthoritativeContentSection } from './components/AuthoritativeContentSection';
import { AIChatView } from './components/AIChatView';
import { FloatingAIChatWidget } from './components/FloatingAIChatWidget';
import { RecentActivitySection } from './components/RecentActivitySection';
import { ViralShareBar } from './components/ViralShareBar';
import { AdSlot } from './components/AdSlot';
import { BLOG_POSTS } from './data/content';
import { audioEngine } from './lib/audioEngine';
import { analytics } from './lib/analytics';
import { viralGrowthEngine } from './lib/viralGrowthEngine';
import {
  Volume2,
  Droplets,
  Activity,
  Headphones,
  Sliders,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Smartphone,
  Globe,
  ArrowRight,
  HelpCircle,
  Bot,
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [blogSlug, setBlogSlug] = useState<string | undefined>(undefined);

  // Sync with browser URL / hash
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.replace(/^\/+/, '');
      const hash = window.location.hash.replace(/^#\/?/, '');
      const target = hash || path;

      if (target.startsWith('blog/')) {
        let slug = target.replace('blog/', '');
        const matched = BLOG_POSTS.find(
          (p) =>
            p.slug === slug ||
            p.slug.replace(/\.html$/, '') === slug.replace(/\.html$/, '') ||
            p.url === `/blog/${slug}`
        );
        if (matched) {
          slug = matched.slug;
        }
        setCurrentPage('blog-post');
        setBlogSlug(slug);
      } else if (
        [
          'speaker-cleaner',
          'water-eject',
          'speaker-test',
          'left-right-test',
          'volume-test',
          'ai-chat',
          'faq',
          'blog',
          'sitemap',
          'contact',
          'about',
          'privacy',
          'terms',
          'disclaimer',
          'guide',
          '404',
        ].includes(target)
      ) {
        setCurrentPage(target as PageRoute);
        setBlogSlug(undefined);
      } else if (!target || target === '' || target === 'home') {
        setCurrentPage('home');
        setBlogSlug(undefined);
      } else {
        // Unknown route -> render custom 404 page
        setCurrentPage('404');
        setBlogSlug(undefined);
      }
    };

    // Track inbound marketing channels & viral referral codes
    viralGrowthEngine.captureInboundReferral();

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (page: PageRoute, slug?: string) => {
    // Smoothly stop any audio before navigating
    audioEngine.stop();

    if (page === 'blog-post' && slug) {
      setCurrentPage('blog-post');
      setBlogSlug(slug);
      window.history.pushState(null, '', `#blog/${slug}`);
      analytics.track('page_view', { page: 'blog-post', slug });
    } else {
      setCurrentPage(page);
      setBlogSlug(undefined);
      const hashStr = page === 'home' ? '#' : `#${page}`;
      window.history.pushState(null, '', hashStr);
      analytics.track('page_view', { page });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = (slug: string) => {
    navigateTo('blog-post', slug);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic SEO Head Manager */}
      <SEOHead page={currentPage} blogSlug={blogSlug} />

      {/* Main Header & Navbar */}
      <Navbar currentPage={currentPage} onNavigate={(p) => navigateTo(p)} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* HOMEPAGE VIEW */}
        {currentPage === 'home' && (
          <div className="space-y-16 sm:space-y-20">
            {/* HERO SECTION */}
            <section id="hero-section" className="text-center max-w-3xl mx-auto pt-2 sm:pt-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 shadow-lg shadow-cyan-950/40">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Clean. Test. Restore Your Sound.</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Clean My Speaker —{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  Eject Water & Fix Sound
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Clean my speaker online for free with calibrated 165Hz sound waves. Instantly eject trapped water, dislodge dust, and restore loud, crystal-clear audio on iPhone and Android.
              </p>

              {/* Primary & Secondary Hero CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  id="hero-primary-cta"
                  onClick={() => {
                    const el = document.getElementById('embedded-cleaner-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-5 h-5 fill-current" />
                  <span>Start Speaker Cleaner</span>
                </button>

                <button
                  id="hero-secondary-cta"
                  onClick={() => navigateTo('speaker-test')}
                  className="px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span>Test My Speaker</span>
                </button>
              </div>
            </section>

            {/* EMBEDDED MAIN SPEAKER CLEANER TOOL */}
            <section id="embedded-cleaner-section" className="w-full">
              <SpeakerCleanerTool
                onNavigateToTest={() => navigateTo('speaker-test')}
              />
            </section>

            {/* RECENT CLEANING ACTIVITY LOG */}
            <RecentActivitySection onNavigate={(p) => navigateTo(p)} />

            {/* VIRAL SOCIAL SHARING & GROWTH BAR */}
            <ViralShareBar />

            {/* Non-intrusive Top Banner Ad */}
            <AdSlot id="home-ad-top" format="banner" />

            {/* HOW IT WORKS SECTION */}
            <section id="how-it-works-section" className="w-full max-w-5xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Simple 3-Step Process
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  How It Works
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Acoustic pressure waves generate rapid outward air pulses without damaging delicate parts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Open the speaker tool</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Launch CleanMySpeaker directly in Safari, Chrome, or any mobile browser without downloading apps or plugins.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400 font-mono font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Choose a cleaning/test mode</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Select 165Hz Acoustic Pulse, Water Eject, or Frequency Sweep depending on whether you have water or dry lint.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Play the sound at a safe volume</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Turn your device volume to 70–80%, hold the speaker facing down, and let the acoustic vibration do the work.
                  </p>
                </div>
              </div>
            </section>

            {/* WHY USE CLEANMYSPEAKER SECTION */}
            <section id="why-use-section" className="w-full max-w-5xl mx-auto">
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    User-First Architecture
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Why Use CleanMySpeaker?
                  </h2>
                  <p className="text-sm text-slate-400 mt-2">
                    Engineered with modern Web Audio APIs for speed, privacy, and zero device friction.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">100% Free</h3>
                    <p className="text-xs text-slate-400 mt-1">No hidden fees, paywalls, or feature limits.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">No App Installation</h3>
                    <p className="text-xs text-slate-400 mt-1">Saves storage space; runs instantly in browser.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5">
                      <Globe className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Works in Browser</h3>
                    <p className="text-xs text-slate-400 mt-1">Compatible with iOS Safari, Chrome, Edge, Firefox.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2.5">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Mobile Friendly</h3>
                    <p className="text-xs text-slate-400 mt-1">Large touch targets and clear responsive design.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Simple Controls</h3>
                    <p className="text-xs text-slate-400 mt-1">Start, pause, and stop with a single tap.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-2.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">No Account Required</h3>
                    <p className="text-xs text-slate-400 mt-1">Private and instant without sign-ups or ads clutter.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* POPULAR TOOLS SECTION */}
            <section id="popular-tools-section" className="w-full max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    All-in-One Audio Suite
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Popular Speaker Tools & Diagnostics
                  </h2>
                </div>
                <button
                  onClick={() => navigateTo('sitemap')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View All Utilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Speaker Cleaner Card */}
                <div
                  onClick={() => navigateTo('speaker-cleaner')}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/60 hover:bg-slate-900 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Speaker Cleaner
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Custom 165Hz pulse waves, 30s/60s modes, and animated speaker diaphragm visualization.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                    <span>Open Tool →</span>
                  </div>
                </div>

                {/* 2. Water Eject Card */}
                <div
                  onClick={() => navigateTo('water-eject')}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-blue-500/60 hover:bg-slate-900 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      Water Eject Mode
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Specialized surface tension agitating pulses designed to shake water drops out of wet speakers.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-blue-400 group-hover:text-blue-300">
                    <span>Open Tool →</span>
                  </div>
                </div>

                {/* 3. Speaker Test Card */}
                <div
                  onClick={() => navigateTo('speaker-test')}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/60 hover:bg-slate-900 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Speaker Test & Sweep
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Multi-band frequency generator and full 20Hz to 20kHz logarithmic sine sweep diagnostics.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                    <span>Open Tool →</span>
                  </div>
                </div>

                {/* 4. Left/Right Test Card */}
                <div
                  onClick={() => navigateTo('left-right-test')}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/60 hover:bg-slate-900 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Left / Right Audio Test
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Verify stereo balance, channel separation, and ear-piece receiver output.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                    <span>Open Tool →</span>
                  </div>
                </div>

                {/* 5. Volume Test Card */}
                <div
                  onClick={() => navigateTo('volume-test')}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/60 hover:bg-slate-900 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      Volume & Distortion Test
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Calibrated decibel ladder and speech frequency clarity checker with safe thresholds.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    <span>Open Tool →</span>
                  </div>
                </div>

                {/* 6. Guides & Articles Card */}
                <div
                  onClick={() => navigateTo('blog')}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/60 hover:bg-slate-900 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 mb-4 group-hover:scale-110 transition-transform">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Troubleshooting Guides
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      6 comprehensive technical articles on iPhone, Android, and hardware speaker maintenance.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-slate-400 group-hover:text-white">
                    <span>Read Guides →</span>
                  </div>
                </div>
              </div>
            </section>

            {/* AUTHORITATIVE ACOUSTIC & HARDWARE CARE GUIDE (E-E-A-T) */}
            <AuthoritativeContentSection onNavigate={(p) => navigateTo(p)} />

            {/* MASTER GUIDE CTA CARD */}
            <section id="master-guide-preview-card" className="w-full max-w-5xl mx-auto">
              <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>English &amp; हिन्दी Audio Guide</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Need Step-by-Step Instructions &amp; Safe Care Protocols?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Read our complete guide covering how sound waves agitate pocket dust and safely eject water droplets without needles or heat. Available in both English and Hindi.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('guide')}
                  className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* SAFETY INFORMATION SECTION */}
            <SafetyNotice />

            {/* AI AUDIO DOCTOR & DIAGNOSTICS BANNER */}
            <section id="ai-doctor-banner" className="w-full max-w-5xl mx-auto">
              <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/50 border border-indigo-800/50 p-6 sm:p-8 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/60 text-purple-300 border border-purple-700/50">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        AI Speaker Diagnostics
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        Live Google Search Grounded
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Have a Wet Phone or Muffled Speaker?
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Chat with CleanMySpeaker AI powered by <strong>Gemini 3.8 Flash</strong>. Get instant, device-tailored instructions on water expulsion, acoustic physics, and safe drying steps backed by real-time Google search data.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                    <button
                      onClick={() => navigateTo('ai-chat')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-lg shadow-purple-500/25 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <Bot className="w-4 h-4" />
                      <span>Ask AI Doctor Now</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                    <button
                      onClick={() => navigateTo('water-eject')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Droplets className="w-3.5 h-3.5 text-blue-400" />
                      <span>Eject Water with 165Hz</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* BLOG SECTION FOR ARTICLE SEO & TROUBLESHOOTING GUIDES */}
            <BlogSection onSelectPost={handleSelectBlog} onNavigate={(p) => navigateTo(p)} />

            {/* Non-intrusive AdSlot */}
            <AdSlot id="home-ad-mid" format="banner" />

            {/* AFFILIATE SECTION */}
            <AffiliateSection />

            {/* FAQ SECTION */}
            <FAQSection />
          </div>
        )}

        {/* DEDICATED SPEAKER CLEANER ROUTE */}
        {currentPage === 'speaker-cleaner' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                <Volume2 className="w-3.5 h-3.5" />
                Acoustic Frequency Cleaner
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Phone Speaker Cleaner Utility
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Play targeted 165Hz resonance pulse waves designed to dislodge loose pocket lint, dust particles, and minor moisture.
              </p>
            </div>

            <SpeakerCleanerTool onNavigateToTest={() => navigateTo('speaker-test')} />
            <AdSlot id="cleaner-page-ad" format="banner" />
            <SafetyNotice />
          </div>
        )}

        {/* DEDICATED WATER EJECT ROUTE */}
        {currentPage === 'water-eject' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800/60">
                <Droplets className="w-3.5 h-3.5" />
                Hydro-Acoustic Expulsion
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Water Eject Tool for Phone Speaker
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate high-displacement 165Hz pulsed tones to shake trapped surface water droplets out of speaker grilles.
              </p>
            </div>

            <WaterEjectTool
              onNavigateToCleaner={() => navigateTo('speaker-cleaner')}
              onNavigateToTest={() => navigateTo('speaker-test')}
            />
            <AdSlot id="water-eject-page-ad" format="banner" />
            <SafetyNotice />
          </div>
        )}

        {/* DEDICATED SPEAKER TEST ROUTE */}
        {currentPage === 'speaker-test' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                <Activity className="w-3.5 h-3.5" />
                Full-Spectrum Diagnostics
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Phone Speaker Frequency Test & Sweep
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Test audio response across sub-bass, mid-range, treble, and full 20Hz – 20kHz logarithmic frequency sweep.
              </p>
            </div>

            <SpeakerTestTool />
            <AdSlot id="speaker-test-ad" format="banner" />
          </div>
        )}

        {/* DEDICATED LEFT/RIGHT AUDIO TEST ROUTE */}
        {currentPage === 'left-right-test' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                <Headphones className="w-3.5 h-3.5" />
                Stereo Balance & Panning
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Left / Right Stereo Channel Audio Test
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Isolate left and right audio channels to verify stereo separation on phone speakers, earbuds, and headphones.
              </p>
            </div>

            <LeftRightTestTool />
            <AdSlot id="lr-test-ad" format="banner" />
          </div>
        )}

        {/* DEDICATED VOLUME TEST ROUTE */}
        {currentPage === 'volume-test' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
                <Sliders className="w-3.5 h-3.5" />
                Sound Level & Distortion
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Speaker Volume & Clarity Test
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Test loudness levels, harmonic headroom, and pink noise sound response safely.
              </p>
            </div>

            <VolumeTestTool />
            <AdSlot id="volume-test-ad" format="banner" />
          </div>
        )}

        {/* DEDICATED AI CHATBOT ROUTE */}
        {currentPage === 'ai-chat' && (
          <AIChatView onNavigate={(p) => navigateTo(p)} />
        )}

        {/* FAQ ROUTE */}
        {currentPage === 'faq' && (
          <div className="space-y-10">
            <FAQSection />
            <SafetyNotice />
          </div>
        )}

        {/* BLOG & ARTICLE ROUTES */}
        {(currentPage === 'blog' || currentPage === 'blog-post') && (
          <BlogView
            currentSlug={blogSlug}
            onSelectPost={handleSelectBlog}
            onNavigate={(p) => navigateTo(p)}
          />
        )}

        {/* SITEMAP / DIRECTORY ROUTE */}
        {currentPage === 'sitemap' && (
          <SitemapView
            onNavigate={(p) => navigateTo(p)}
            onSelectBlog={handleSelectBlog}
          />
        )}

        {/* CONTACT US ROUTE */}
        {currentPage === 'contact' && (
          <ContactView onNavigate={(p) => navigateTo(p)} />
        )}

        {/* ABOUT US ROUTE */}
        {currentPage === 'about' && (
          <AboutView onNavigate={(p) => navigateTo(p)} />
        )}

        {/* PRIVACY POLICY ROUTE */}
        {currentPage === 'privacy' && (
          <PrivacyPolicyView onNavigate={(p) => navigateTo(p)} />
        )}

        {/* TERMS OF SERVICE ROUTE */}
        {currentPage === 'terms' && (
          <TermsView onNavigate={(p) => navigateTo(p)} />
        )}

        {/* DISCLAIMER ROUTE */}
        {currentPage === 'disclaimer' && (
          <DisclaimerView onNavigate={(p) => navigateTo(p)} />
        )}

        {/* DEDICATED MASTER GUIDE (ENGLISH & HINDI) ROUTE */}
        {currentPage === 'guide' && (
          <div className="space-y-10">
            <HindiSpeakerGuide />
            <SafetyNotice />
          </div>
        )}

        {/* CUSTOM 404 NOT FOUND ROUTE */}
        {currentPage === '404' && (
          <NotFoundView onNavigate={(p) => navigateTo(p)} />
        )}
      </main>

      {/* Main Footer */}
      <Footer onNavigate={(p) => navigateTo(p)} />

      {/* Floating AI Chat Assistant Widget */}
      <FloatingAIChatWidget currentPage={currentPage} onNavigate={navigateTo} />

      {/* GDPR / CCPA Cookie Consent Banner */}
      <CookieConsentBanner onNavigate={(p) => navigateTo(p)} />
    </div>
  );
}
