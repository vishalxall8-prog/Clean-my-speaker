import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Volume2, Droplets, Activity, Headphones, HelpCircle, BookOpen, Menu, X, Sliders } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'speaker-cleaner', label: 'Speaker Cleaner', icon: <Volume2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'water-eject', label: 'Water Eject', icon: <Droplets className="w-4 h-4 text-blue-400" />, badge: 'Popular' },
    { id: 'speaker-test', label: 'Speaker Test', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
    { id: 'left-right-test', label: 'L/R Audio', icon: <Headphones className="w-4 h-4 text-indigo-400" /> },
    { id: 'volume-test', label: 'Volume Test', icon: <Sliders className="w-4 h-4 text-amber-400" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4 text-slate-400" /> },
    { id: 'blog', label: 'Guides', icon: <BookOpen className="w-4 h-4 text-slate-400" /> },
  ];

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 transition-transform hover:scale-[1.01]"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Volume2 className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-300 rounded-full border border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  CleanMySpeaker
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium hidden sm:block">
                Clean. Test. Restore Your Sound.
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-navbar" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 shadow-sm border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              id="header-cta-clean-btn"
              onClick={() => handleNav('water-eject')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-400 transition-all cursor-pointer active:scale-95"
            >
              <Droplets className="w-4 h-4" />
              <span>Eject Water</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden bg-[#0e1420] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-btn-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              id="mobile-drawer-eject-btn"
              onClick={() => handleNav('water-eject')}
              className="w-full py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
            >
              <Droplets className="w-5 h-5" />
              <span>Water Eject Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
