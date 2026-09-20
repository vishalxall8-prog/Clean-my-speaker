import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, FileText, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';

interface PrivacyPolicyViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 20, 2026';
  const supportEmail = 'km1631513@gmail.com';

  return (
    <div id="privacy-policy-page" className="w-full max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Google AdSense & GDPR/CCPA Compliant</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: <span className="text-slate-200 font-medium">{lastUpdated}</span> • CleanMySpeaker
        </p>
      </div>

      {/* Main Content Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 text-slate-300 text-sm leading-relaxed shadow-xl">
        {/* Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>1. Introduction & Overview</span>
          </h2>
          <p>
            At <strong>CleanMySpeaker</strong> (accessible from <a href="https://cleanmyspeaker.app" className="text-cyan-400 hover:underline">https://cleanmyspeaker.app</a>), the privacy of our visitors is one of our top priorities. This Privacy Policy document outlines the types of information collected and recorded by CleanMySpeaker and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at{' '}
            <a href={`mailto:${supportEmail}`} className="text-cyan-300 font-mono hover:underline">
              {supportEmail}
            </a>.
          </p>
        </section>

        {/* Client-Side Web Audio Processing */}
        <section className="space-y-3 p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>2. No Audio Recording or Microphone Access</span>
          </h2>
          <p>
            CleanMySpeaker generates all acoustic frequencies (including 165Hz pulses, tone sweeps, and stereo channels) entirely on your device using the client-side W3C Web Audio API. 
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
            <li>We do <strong>not</strong> access, record, or stream your microphone or any surrounding ambient audio.</li>
            <li>We do <strong>not</strong> upload your device sound data to any external server.</li>
            <li>All frequency synthesis occurs solely within your browser’s memory sandbox.</li>
          </ul>
        </section>

        {/* Google AdSense & Advertising Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cookie className="w-5 h-5 text-amber-400" />
            <span>3. Google AdSense & Third-Party Cookies</span>
          </h2>
          <p>
            CleanMySpeaker may use third-party advertising vendors, including Google LLC, to serve advertisements when you visit our website.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <strong>Google as a Third-Party Vendor:</strong> Google uses cookies (including the DoubleClick cookie) to serve ads to users based on their prior visits to this website or other websites on the Internet.
            </li>
            <li>
              <strong>Personalized Advertising:</strong> Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opting Out of Personalized Ads:</strong> Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline inline-flex items-center gap-1"
              >
                Google Ads Settings
              </a>. Alternatively, users can opt out of third-party vendors' use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline"
              >
                www.aboutads.info
              </a>.
            </li>
          </ul>
        </section>

        {/* Log Files */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>4. Log Files & Analytics</span>
          </h2>
          <p>
            CleanMySpeaker follows standard industry procedures for using log files. These files log visitors when they visit websites. Information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of this information is for analyzing trends, administering the site, tracking users' aggregate movement on the website, and gathering demographic information.
          </p>
        </section>

        {/* Privacy Policies of Third Parties */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <span>5. Third-Party Privacy Policies</span>
          </h2>
          <p>
            CleanMySpeaker's Privacy Policy does not apply to other advertisers, external affiliate links, or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers or networks for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
          </p>
        </section>

        {/* CCPA Privacy Rights (Do Not Sell My Personal Information) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            6. CCPA Privacy Rights (Do Not Sell My Personal Information)
          </h2>
          <p>Under the California Consumer Privacy Act (CCPA), California consumers have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
            <li>Request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p>
            CleanMySpeaker does <strong>not</strong> sell any personal information. If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at{' '}
            <span className="text-cyan-300 font-mono">{supportEmail}</span>.
          </p>
        </section>

        {/* GDPR Data Protection Rights */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            7. GDPR Data Protection Rights (European Union)
          </h2>
          <p>We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request correction of any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request erasure of your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request restriction of the processing of your personal data.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data.</li>
          </ul>
        </section>

        {/* Children's Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            8. Children's Online Privacy Protection (COPPA)
          </h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. CleanMySpeaker does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>

        {/* Consent and Contact */}
        <section className="pt-6 border-t border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>9. Contact Information & Consent</span>
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
          <p>
            For any questions, concerns, or data requests, please write to our Data Controller at:{' '}
            <a href={`mailto:${supportEmail}`} className="text-cyan-300 font-mono font-semibold hover:underline">
              {supportEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};
