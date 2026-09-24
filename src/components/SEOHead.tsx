import React, { useEffect } from 'react';
import { PageRoute } from '../types';
import { BLOG_POSTS, FAQ_DATA } from '../data/content';

interface SEOHeadProps {
  page: PageRoute;
  blogSlug?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ page, blogSlug }) => {
  useEffect(() => {
    let title = 'Clean My Speaker — #1 Free Tool to Eject Water & Clean Speakers';
    let description = 'Clean my speaker online for free! Instantly eject water, dust, and fix muffled phone speakers using calibrated 165Hz sound waves. Safe for iPhone, Android & AirPods.';
    let canonical = 'https://cleanmyspeaker.app/';
    let jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Clean My Speaker',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any (Web Browser)',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: 'Clean my speaker online for free with calibrated 165Hz sound waves. Instantly eject water, dislodge dust, and restore loud audio.',
    };

    if (page === 'speaker-cleaner') {
      title = 'Phone Speaker Cleaner Tool — Fix Muffled Sound | CleanMySpeaker';
      description = 'Free speaker cleaning frequency tones designed to help dislodge dust, lint, and debris using 165Hz pulsed acoustic waves.';
      canonical = 'https://cleanmyspeaker.app/speaker-cleaner';
    } else if (page === 'water-eject') {
      title = 'Water Eject Tool for Phone Speaker — Remove Trapped Liquid | CleanMySpeaker';
      description = 'Eject water droplets from wet phone speakers using dedicated 165Hz pulse resonance sound. Safe, instant browser utility.';
      canonical = 'https://cleanmyspeaker.app/water-eject';
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Eject Water from Phone Speaker',
        description: 'Step-by-step method to dislodge trapped liquid using acoustic resonance pulses.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Position Phone Facing Downward',
            text: 'Hold the phone vertically with speaker holes pointing down onto a clean microfiber cloth.',
          },
          {
            '@type': 'HowToStep',
            name: 'Start Water Eject Tone',
            text: 'Run the 165Hz pulsed audio frequency at moderate volume to vibrate water droplets out.',
          },
          {
            '@type': 'HowToStep',
            name: 'Allow Passive Drying',
            text: 'Wipe away expelled moisture and allow phone to dry in a ventilated area.',
          },
        ],
      };
    } else if (page === 'speaker-test') {
      title = 'Phone Speaker Test — Frequency & Sweep Diagnostic Suite | CleanMySpeaker';
      description = 'Test phone speaker audio response from 20 Hz to 20,000 Hz. Identify distortion, blown drivers, and frequency cutoffs.';
      canonical = 'https://cleanmyspeaker.app/speaker-test';
    } else if (page === 'left-right-test') {
      title = 'Left & Right Stereo Audio Test — Channel Balance Check | CleanMySpeaker';
      description = 'Verify left and right audio channels and stereo separation for phone speakers, headphones, and earbuds in your browser.';
      canonical = 'https://cleanmyspeaker.app/left-right-test';
    } else if (page === 'volume-test') {
      title = 'Speaker Volume & Clarity Test — Sound Level Check | CleanMySpeaker';
      description = 'Test speaker output clarity, harmonic distortion, and comfortable volume listening levels safely.';
      canonical = 'https://cleanmyspeaker.app/volume-test';
    } else if (page === 'ai-chat') {
      title = 'AI Audio Doctor & Diagnostics Assistant (Gemini) | CleanMySpeaker';
      description = 'Ask CleanMySpeaker AI powered by Gemini with live Google Search Grounding. Get instant diagnostics for wet phones, muffled audio, 165Hz water ejection, and IP ratings.';
      canonical = 'https://cleanmyspeaker.app/ai-chat';
    } else if (page === 'faq') {
      title = 'Frequently Asked Questions & Speaker Safety | CleanMySpeaker';
      description = 'Answers to common questions about speaker cleaning, water ejection safety, phone compatibility, and repair advice.';
      canonical = 'https://cleanmyspeaker.app/faq';
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
    } else if (page === 'blog') {
      title = 'Speaker Cleaning Guides & Audio Hardware Tips | CleanMySpeaker Blog';
      description = 'Expert troubleshooting guides on maintaining smartphone speakers, safely removing dust and water, and audio diagnostics.';
      canonical = 'https://cleanmyspeaker.app/blog';
    } else if (page === 'blog-post' && blogSlug) {
      const post = BLOG_POSTS.find(
        (p) =>
          p.slug === blogSlug ||
          p.slug.replace(/\.html$/, '') === blogSlug.replace(/\.html$/, '') ||
          p.url === blogSlug ||
          p.url === `/blog/${blogSlug}`
      );
      if (post) {
        title = `${post.title} | CleanMySpeaker`;
        description = post.excerpt;
        canonical = `https://cleanmyspeaker.app/blog/${post.slug}`;

        // Build rich Schema with Article & FAQPage if FAQs exist
        const schemas: Record<string, unknown>[] = [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            url: `https://cleanmyspeaker.app/blog/${post.slug}`,
            keywords: post.mainKeyword || 'remove water from phone',
            datePublished: '2026-09-24T08:00:00+00:00',
            dateModified: '2026-09-24T08:00:00+00:00',
            author: {
              '@type': 'Organization',
              name: 'CleanMySpeaker Acoustic Engineering Team',
              url: 'https://cleanmyspeaker.app',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CleanMySpeaker',
              url: 'https://cleanmyspeaker.app',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://cleanmyspeaker.app/blog/${post.slug}`,
            },
          },
        ];

        if (post.content.faqs && post.content.faqs.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.content.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          });
        }

        jsonLd = schemas.length === 1 ? schemas[0] : ({ '@context': 'https://schema.org', '@graph': schemas } as Record<string, unknown>);
      }
    } else if (page === 'sitemap') {
      title = 'HTML Sitemap & SEO Directory | CleanMySpeaker';
      description = 'Index of all tools, diagnostic tests, guides, and troubleshooting resources available on CleanMySpeaker.';
      canonical = 'https://cleanmyspeaker.app/sitemap';
    } else if (page === 'about') {
      title = 'About Us — The Science & Mission Behind CleanMySpeaker';
      description = 'Learn about CleanMySpeaker, our scientific approach to non-invasive water ejection using 165Hz acoustic waves, our safety ethics, and our team.';
      canonical = 'https://cleanmyspeaker.app/about';
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About CleanMySpeaker',
        description: 'Mission and technical science behind CleanMySpeaker phone speaker cleaning and audio diagnostic utilities.',
        publisher: {
          '@type': 'Organization',
          name: 'CleanMySpeaker',
          url: 'https://cleanmyspeaker.app',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'km1631513@gmail.com',
            contactType: 'customer support',
          },
        },
      };
    } else if (page === 'contact') {
      title = 'Contact Us — CleanMySpeaker Support & Inquiries';
      description = 'Contact the CleanMySpeaker team for audio diagnostics support, suggestions, bug reports, and business inquiries at km1631513@gmail.com.';
      canonical = 'https://cleanmyspeaker.app/contact';
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact CleanMySpeaker',
        description: 'Official contact and user support channel for CleanMySpeaker.',
        mainEntity: {
          '@type': 'Organization',
          name: 'CleanMySpeaker',
          email: 'km1631513@gmail.com',
        },
      };
    } else if (page === 'privacy') {
      title = 'Privacy Policy — CleanMySpeaker';
      description = 'Privacy Policy for CleanMySpeaker explaining our client-side audio processing, Google AdSense cookies, GDPR, CCPA, and data practices.';
      canonical = 'https://cleanmyspeaker.app/privacy';
    } else if (page === 'terms') {
      title = 'Terms of Service — CleanMySpeaker';
      description = 'Terms of Service, acceptable use policies, and conditions for CleanMySpeaker phone speaker cleaning utility.';
      canonical = 'https://cleanmyspeaker.app/terms';
    } else if (page === 'disclaimer') {
      title = 'Disclaimer & Safety Warning — CleanMySpeaker';
      description = 'Important acoustic safety guidelines, hearing protection advice, and hardware limitations for CleanMySpeaker.';
      canonical = 'https://cleanmyspeaker.app/disclaimer';
    }

    // Update document head
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      if (page === 'blog-post' && blogSlug) {
        const post = BLOG_POSTS.find(
          (p) =>
            p.slug === blogSlug ||
            p.slug.replace(/\.html$/, '') === blogSlug.replace(/\.html$/, '')
        );
        if (post?.mainKeyword) {
          metaKeywords.setAttribute('content', `${post.mainKeyword}, ${post.title}, how to remove water from phone speaker, fix wet phone speaker, clean speaker`);
        }
      }
    }

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    // Injected Structured Data
    let schemaScript = document.getElementById('json-ld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(jsonLd);
  }, [page, blogSlug]);

  return null;
};
