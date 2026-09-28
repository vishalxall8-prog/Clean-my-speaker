import React, { useState } from 'react';
import {
  Mail,
  Send,
  Check,
  Copy,
  Clock,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { PageRoute } from '../types';

interface ContactViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const supportEmail = 'km1631513@gmail.com';
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot
  const [mathAnswer, setMathAnswer] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string; math?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(supportEmail).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const validateForm = (): boolean => {
    const errs: { name?: string; email?: string; message?: string; math?: string } = {};

    if (!name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters so we can assist you effectively.';
    }

    if (mathAnswer.trim() !== '9') {
      errs.math = 'Please answer the anti-spam verification: 5 + 4 = 9.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot detection: bots automatically fill hidden inputs
    if (honeypot.trim()) {
      console.warn('Bot submission blocked via honeypot.');
      return;
    }

    if (!validateForm()) return;

    // Compose a mailto link so the user's native email client opens with all fields populated
    const mailSubject = encodeURIComponent(`[CleanMySpeaker - ${category.toUpperCase()}] ${subject || 'User Query'}`);
    const mailBody = encodeURIComponent(
      `Name: ${name || 'User'}\nSender Email: ${email || 'Not specified'}\nCategory: ${category}\n\nMessage:\n${message}`
    );
    
    // Trigger mail client
    window.location.href = `mailto:${supportEmail}?subject=${mailSubject}&body=${mailBody}`;

    setSubmitted(true);
  };

  return (
    <div id="contact-us-page" className="w-full max-w-5xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 shadow-lg shadow-cyan-950/40">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Official Support & Inquiries</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Contact{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            CleanMySpeaker
          </span>
        </h1>

        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Have a question about ejecting water, troubleshooting your device speaker, or advertising with us? 
          We are here to help and respond within 24–48 hours.
        </p>
      </div>

      {/* Main Grid: Contact Card + Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Email & Support Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Primary Email Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Primary Contact Email
                </span>
                <h3 className="text-xl font-bold text-white">Direct Email</h3>
              </div>
            </div>

            {/* Email Box with Copy Button */}
            <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-2 overflow-hidden">
                <a
                  href={`mailto:${supportEmail}`}
                  className="font-mono text-sm sm:text-base font-semibold text-cyan-300 hover:text-cyan-200 transition-colors truncate"
                  title="Send email directly"
                >
                  {supportEmail}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${supportEmail}?subject=CleanMySpeaker%20Inquiry`}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>Compose Mail Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Response Time & Transparency */}
            <div className="space-y-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-semibold block">Response Guarantee</span>
                  <span>We reply to all genuine technical and user inquiries within 24 to 48 business hours.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-semibold block">Privacy Assurance</span>
                  <span>Your email address will only be used to answer your question. We never spam or sell data.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-semibold block">Topics We Welcome</span>
                  <span>Audio bug reports, device compatibility feedback, partnership/advertising, and feature requests.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ shortcut */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Looking for instant answers?
              </h4>
              <p className="text-xs text-slate-400">
                Check our Frequently Asked Questions for fast solutions.
              </p>
            </div>
            <button
              onClick={() => onNavigate('faq')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              View FAQ
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
            <h2 className="text-xl font-bold text-white mb-1.5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Send Us a Direct Message</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Fill out the form below. Clicking send will open your default email app pre-populated with your details to{' '}
              <strong className="text-cyan-300">km1631513@gmail.com</strong>.
            </p>

            {submitted ? (
              <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Email Client Triggered!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your message has been formatted for <strong>km1631513@gmail.com</strong>. If your email app did not open automatically, please send your email manually to{' '}
                  <span className="text-cyan-300 font-mono">km1631513@gmail.com</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="mt-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from genuine users, filled by spam bots) */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="website-url-check">Leave this empty</label>
                  <input
                    id="website-url-check"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Alex Kumar"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors ${
                        errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="your.email@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="troubleshooting">Speaker / Water Troubleshooting</option>
                      <option value="bug-report">Bug or Audio Glitch Report</option>
                      <option value="feature">New Audio Feature Request</option>
                      <option value="advertising">AdSense / Business Partnership</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Phone speaker still muffled"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Describe your query, phone model, or suggestion here in detail (minimum 15 characters)..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors resize-y leading-relaxed ${
                      errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Anti-spam Verification Challenge */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-slate-200 block">
                      Spam Protection Verification <span className="text-cyan-400">*</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      What is <strong className="text-cyan-300 font-mono">5 + 4</strong>? (Enter digit to verify you are human)
                    </span>
                  </div>
                  <div className="w-24">
                    <input
                      type="text"
                      maxLength={2}
                      value={mathAnswer}
                      onChange={(e) => {
                        setMathAnswer(e.target.value);
                        if (errors.math) setErrors((prev) => ({ ...prev, math: undefined }));
                      }}
                      placeholder="?"
                      className={`w-full px-3 py-1.5 text-center font-mono font-bold rounded-lg bg-slate-900 border text-white text-sm focus:outline-none ${
                        errors.math ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                </div>
                {errors.math && (
                  <p className="text-[11px] text-rose-400">{errors.math}</p>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to km1631513@gmail.com</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
