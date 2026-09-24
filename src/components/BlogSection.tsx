import React from 'react';
import { PageRoute, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/content';
import { BookOpen, Clock, Calendar, ArrowRight, Droplets, Sparkles, Tag, ChevronRight, CheckCircle2 } from 'lucide-react';

interface BlogSectionProps {
  onSelectPost: (slug: string) => void;
  onNavigate: (page: PageRoute) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost, onNavigate }) => {
  const featuredPost = BLOG_POSTS.find((p) => p.slug === 'remove-water-from-phone-speaker.html') || BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== featuredPost.slug).slice(0, 3);

  return (
    <section id="blog-section" className="w-full max-w-6xl mx-auto space-y-8 pt-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Audio Care Knowledge Base & Blog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Speaker Cleaning Guides & Technical Articles
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Expert step-by-step instructions on ejecting water safely, cleaning micro-mesh grilles, and diagnosing muffled phone audio.
          </p>
        </div>

        <button
          id="view-all-blog-posts-btn"
          onClick={() => onNavigate('blog')}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
        >
          <span>View All {BLOG_POSTS.length} Guides</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Featured Article Banner */}
      {featuredPost && (
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/90 px-3 py-1 rounded-lg border border-cyan-700/60 shadow-sm">
                  Featured Article
                </span>
                <span className="text-xs font-mono font-medium text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-800/60 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-400" />
                  <span>Main Keyword: {featuredPost.mainKeyword || 'remove water from phone'}</span>
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                  <span>URL: /blog/{featuredPost.slug}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-cyan-200 transition-colors leading-tight">
                {featuredPost.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              {/* Quick highlights preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Immediate safe drying steps</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <Droplets className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>165Hz sound expulsion</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>FAQ & mistakes to avoid</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                id="featured-read-article-btn"
                onClick={() => onSelectPost(featuredPost.slug)}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 text-slate-950 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featuredPost.readingTime}
                </span>
                <span>•</span>
                <span>{featuredPost.publishDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Popular Blog Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {otherPosts.map((post) => (
          <div
            key={post.slug}
            id={`home-blog-card-${post.slug}`}
            className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900 transition-all group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/50">
                  {post.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {post.readingTime}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                {post.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-mono">{post.publishDate}</span>
              <button
                onClick={() => onSelectPost(post.slug)}
                className="text-cyan-400 font-bold group-hover:text-cyan-300 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Read Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
