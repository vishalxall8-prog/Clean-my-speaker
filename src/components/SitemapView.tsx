import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BLOG_POSTS } from '../data/content';
import { Globe, FileText, Code2, Copy, Check, ExternalLink } from 'lucide-react';

interface SitemapViewProps {
  onNavigate: (page: PageRoute) => void;
  onSelectBlog: (slug: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({ onNavigate, onSelectBlog }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'robots'>('visual');
  const [copied, setCopied] = useState(false);

  const pages: { path: string; name: string; page: PageRoute; changefreq: string; priority: string; desc: string }[] = [
    { path: '/', name: 'Homepage (CleanMySpeaker)', page: 'home', changefreq: 'daily', priority: '1.0', desc: 'Main hub with embedded speaker cleaner, how it works, and diagnostics.' },
    { path: '/speaker-cleaner', name: 'Speaker Cleaner Tool', page: 'speaker-cleaner', changefreq: 'weekly', priority: '0.9', desc: 'Dedicated 165Hz acoustic pulse cleaning suite with multi-modes.' },
    { path: '/water-eject', name: 'Water Eject Tool', page: 'water-eject', changefreq: 'weekly', priority: '0.9', desc: 'Resonance water expulsion tool with positioning guidelines.' },
    { path: '/speaker-test', name: 'Speaker Frequency Test', page: 'speaker-test', changefreq: 'weekly', priority: '0.8', desc: '20Hz - 20kHz logarithmic frequency generator & sine sweep.' },
    { path: '/left-right-test', name: 'Left / Right Stereo Test', page: 'left-right-test', changefreq: 'weekly', priority: '0.8', desc: 'Stereo panning and channel separation diagnostic test.' },
    { path: '/volume-test', name: 'Volume & Decibel Ladder Test', page: 'volume-test', changefreq: 'weekly', priority: '0.8', desc: 'Calibrated acoustic ladder and distortion test.' },
    { path: '/ai-chat', name: 'AI Audio Doctor (Gemini + Search)', page: 'ai-chat', changefreq: 'daily', priority: '0.9', desc: 'AI diagnostics for wet phones, muffled audio, 165Hz physics, with live Google Search grounding.' },
    { path: '/faq', name: 'Frequently Asked Questions', page: 'faq', changefreq: 'monthly', priority: '0.7', desc: 'Comprehensive answers to speaker maintenance and safety.' },
    { path: '/blog', name: 'Technical Audio Guides & Articles', page: 'blog', changefreq: 'weekly', priority: '0.8', desc: 'Troubleshooting guides for iPhone, Android, and audio hardware.' },
    { path: '/about', name: 'About CleanMySpeaker', page: 'about', changefreq: 'monthly', priority: '0.7', desc: 'Mission, acoustic science background, team ethics, and hardware safety standards.' },
    { path: '/contact', name: 'Contact Us', page: 'contact', changefreq: 'monthly', priority: '0.7', desc: 'Official support and technical contact email: km1631513@gmail.com' },
    { path: '/privacy', name: 'Privacy Policy', page: 'privacy', changefreq: 'monthly', priority: '0.6', desc: 'GDPR, CCPA, and Google AdSense cookie compliance documentation.' },
    { path: '/terms', name: 'Terms of Service', page: 'terms', changefreq: 'monthly', priority: '0.6', desc: 'Conditions of use and terms governing CleanMySpeaker acoustic utilities.' },
    { path: '/disclaimer', name: 'Safety & Hardware Disclaimer', page: 'disclaimer', changefreq: 'monthly', priority: '0.6', desc: 'Hearing safety guidelines and acoustic physics hardware limitations.' },
  ];

  const xmlSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>https://cleanmyspeaker.app${p.path}</loc>
    <lastmod>2026-08-31</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
${BLOG_POSTS.map(
  (b) => `  <url>
    <loc>https://cleanmyspeaker.app/blog/${b.slug}</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
).join('\n')}
</urlset>`;

  const robotsTxtContent = `User-agent: *
Allow: /

Sitemap: https://cleanmyspeaker.app/sitemap.xml`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="sitemap-view" className="w-full max-w-4xl mx-auto space-y-6">
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60 mb-2">
              <Globe className="w-3.5 h-3.5" />
              Technical SEO & Architecture
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Website Directory & Sitemap
            </h1>
          </div>

          {/* Format Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'visual'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual Directory
            </button>
            <button
              onClick={() => setActiveTab('xml')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'xml'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              sitemap.xml
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'robots'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              robots.txt
            </button>
          </div>
        </div>

        {/* Visual Directory Tab */}
        {activeTab === 'visual' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Core Website Pages & Utilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pages.map((p) => (
                  <button
                    key={p.path}
                    onClick={() => onNavigate(p.page)}
                    className="text-left p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-950 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-cyan-400 font-bold">
                        {p.path}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        Priority: {p.priority}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 mt-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Technical Guides & Articles ({BLOG_POSTS.length} Indexed)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BLOG_POSTS.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => onSelectBlog(b.slug)}
                    className="text-left p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-950 transition-all group"
                  >
                    <span className="font-mono text-[11px] text-cyan-400 font-medium">
                      /blog/{b.slug}
                    </span>
                    <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 mt-1 line-clamp-1">
                      {b.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* XML Sitemap Tab */}
        {activeTab === 'xml' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Valid XML Schema: http://www.sitemaps.org/schemas/sitemap/0.9
              </span>
              <button
                onClick={() => copyToClipboard(xmlSitemapContent)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied XML' : 'Copy XML'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-96 leading-relaxed">
              {xmlSitemapContent}
            </pre>
          </div>
        )}

        {/* robots.txt Tab */}
        {activeTab === 'robots' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Standard robots.txt configuration for search indexers
              </span>
              <button
                onClick={() => copyToClipboard(robotsTxtContent)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy robots.txt'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {robotsTxtContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
