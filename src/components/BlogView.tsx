import React, { useState } from 'react';
import { BlogPost, PageRoute } from '../types';
import { BLOG_POSTS } from '../data/content';
import { AdSlot } from './AdSlot';
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, ShieldAlert, Sparkles, Tag, CheckCircle2, ChevronRight } from 'lucide-react';

interface BlogViewProps {
  currentSlug?: string;
  onSelectPost: (slug: string) => void;
  onNavigate: (page: PageRoute) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  currentSlug,
  onSelectPost,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cleaning', 'Water Damage', 'Diagnostics', 'Hardware Care'];

  const activePost = currentSlug ? BLOG_POSTS.find((p) => p.slug === currentSlug) : null;

  // Render individual blog post
  if (activePost) {
    return (
      <div id="blog-single-post" className="w-full max-w-4xl mx-auto py-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => onNavigate('blog')}
            className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Guides</span>
          </button>
          <span>/</span>
          <span className="text-cyan-400 font-medium truncate">{activePost.title}</span>
        </div>

        {/* Article Header */}
        <article className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/60">
              {activePost.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{activePost.readingTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activePost.publishDate}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {activePost.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-cyan-500 pl-4 py-1 italic bg-cyan-950/10 rounded-r-xl">
            {activePost.content.intro}
          </p>

          {/* Ad Slot inside article */}
          <AdSlot id="blog-ad-top" format="in-article" />

          {/* Article Sections */}
          <div className="space-y-8 pt-4">
            {activePost.content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span>{sec.heading}</span>
                </h2>

                <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed pl-4">
                  {sec.body.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {sec.tip && (
                  <div className="mt-3 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm flex items-start gap-2.5 ml-4">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cyan-300">Pro Tip:</strong> {sec.tip}
                    </div>
                  </div>
                )}

                {sec.warning && (
                  <div className="mt-3 p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 ml-4">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-rose-300">Warning:</strong> {sec.warning}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Conclusion */}
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-base font-bold text-white mb-2">Summary & Recommendation</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activePost.content.conclusion}
            </p>

            {/* CTA Box to relevant tool */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-950 to-blue-950/60 border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Recommended Utility
                </span>
                <h4 className="text-base font-bold text-white">
                  Ready to test or clean your device now?
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Launch the free browser tool to run precision acoustic frequencies.
                </p>
              </div>

              <button
                id="blog-recommended-tool-btn"
                onClick={() => onNavigate(activePost.content.recommendedTool)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-400/20 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>Launch {activePost.content.recommendedTool.replace('-', ' ').toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>

        {/* Other articles carousel */}
        <div className="pt-6">
          <h3 className="text-lg font-bold text-white mb-4">Related Smartphone Audio Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOG_POSTS.filter((p) => p.slug !== activePost.slug)
              .slice(0, 2)
              .map((post) => (
                <button
                  key={post.slug}
                  onClick={() => onSelectPost(post.slug)}
                  className="text-left p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <span className="text-[10px] uppercase font-mono font-bold text-cyan-400">
                    {post.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Render blog list
  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div id="blog-archive-page" className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
          <BookOpen className="w-3.5 h-3.5" />
          Technical Audio Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Speaker Cleaning Guides & Troubleshooting
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Expert step-by-step guides on smartphone acoustic maintenance, safe lint removal, emergency water recovery, and audio distortion diagnosis.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`blog-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.slug}
            id={`blog-card-${post.slug}`}
            className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  {post.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{post.publishDate}</span>
              <button
                onClick={() => onSelectPost(post.slug)}
                className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Read Full Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ad slot below blog grid */}
      <AdSlot id="blog-archive-ad" format="banner" />
    </div>
  );
};
