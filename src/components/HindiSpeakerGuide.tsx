import React, { useState } from 'react';
import {
  Volume2,
  Droplets,
  Wind,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  BookOpen,
  Globe,
  Languages,
  Mail,
} from 'lucide-react';

export const HindiSpeakerGuide: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCopyText = () => {
    const targetId = lang === 'en' ? 'english-guide-raw-text' : 'hindi-guide-raw-text';
    const fullText = document.getElementById(targetId)?.innerText || '';
    if (navigator.clipboard && fullText) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <article
      id="speaker-cleaner-global-guide"
      className="w-full max-w-5xl mx-auto my-12 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar with Language Switcher */}
      <div className="relative z-10 border-b border-slate-800/80 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {lang === 'en'
                  ? 'Worldwide SEO Master Guide • 1200+ Words'
                  : 'SEO संपूर्ण गाइड • 1000+ Words Quality Guide'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'en' ? 'Global Audience' : 'भारतीय पाठक'}</span>
            </div>
          </div>

          <h1
            itemProp="headline"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug"
          >
            {lang === 'en'
              ? 'How to Clean Phone Speakers: Remove Water & Dust with Sound Waves'
              : 'मोबाइल स्पीकर से पानी और धूल कैसे निकालें? (संपूर्ण गाइड)'}
          </h1>
          <p className="text-slate-400 text-sm mt-1.5">
            {lang === 'en'
              ? 'The comprehensive engineering guide to acoustic water ejection, speaker damage prevention, safe usage instructions, and long-term maintenance.'
              : 'Clean My Speaker टूल का सही उपयोग, वैज्ञानिक कार्यप्रणाली, स्पीकर की सुरक्षा और रखरखाव के अचूक उपाय'}
          </p>
        </div>

        {/* Controls: Language Switcher & Copy Button */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center shrink-0">
          {/* Language Toggle Pills */}
          <div className="inline-flex p-1 bg-slate-950/80 border border-slate-800 rounded-xl shadow-inner">
            <button
              onClick={() => {
                setLang('en');
                setOpenFaq(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Read Worldwide English Guide"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
            <button
              onClick={() => {
                setLang('hi');
                setOpenFaq(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                lang === 'hi'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="हिंदी में गाइड पढ़ें"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>हिन्दी</span>
            </button>
          </div>

          {/* Copy Guide Button */}
          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            title={lang === 'en' ? 'Copy complete English guide' : 'पूरा हिंदी टेक्स्ट कॉपी करें'}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">
                  {lang === 'en' ? 'Copied!' : 'कॉपी हो गया!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>{lang === 'en' ? 'Copy Text' : 'कॉपी करें'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ENGLISH (GLOBAL / WORLDWIDE) GUIDE */}
      {/* ========================================================================= */}
      {lang === 'en' && (
        <div id="english-guide-raw-text" className="relative z-10 text-slate-300 text-base leading-relaxed space-y-8">
          {/* Executive Intro */}
          <section className="space-y-4">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              In modern daily life, smartphones are our primary communication hubs, entertainment centers, and work devices.
              Whether joining an urgent conference call, listening to high-fidelity music, or streaming video, we expect our
              device’s loudspeakers to deliver clean, loud, and crisp audio. However, it is an alarmingly common experience for
              a phone’s sound to suddenly become <strong>muffled, faint, raspy, or completely distorted</strong>. In nearly 95% of
              cases, this degradation is caused by two notorious culprits: <strong>microscopic water droplets trapped inside the speaker grille</strong>{' '}
              or <strong>accumulated pocket lint, dust, and sebum oils</strong> blocking the acoustic mesh.
            </p>
            <p>
              When a smartphone is accidentally dropped into water, exposed to sudden rain showers, or subjected to humid bathroom
              environments, liquid enters the speaker aperture and sticks to the delicate speaker diaphragm via surface tension.
              Panicked users frequently make catastrophic mistakes—poking needles into the speaker holes, blasting hot air with
              hair dryers, or burying the phone in a container of raw kitchen rice. These ill-advised methods can permanently puncture
              speaker diaphragms, dissolve adhesive gaskets, and melt acoustic dampening membranes.
            </p>
            <p>
              This definitive, 1,200+ word engineering guide breaks down the underlying physics of speaker acoustic damage, explains how
              our <strong>Clean My Speaker</strong> resonance tone generator safely expels liquids and loosened debris without physical
              contact, provides 5 manufacturer-approved speaker maintenance protocols, and answers the most critical troubleshooting questions.
            </p>
          </section>

          {/* Section 1: How Water & Dust Damage Speakers */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. How Water and Dust Mechanically Damage Mobile Phone Speakers
              </h2>
            </div>

            <p>
              A smartphone micro-speaker is an astonishing marvel of precision mechanical miniaturization. Measuring only a few millimeters
              in diameter, it comprises an ultra-thin polymer or Mylar diaphragm, a neodymium permanent magnet, and a microscopic copper
              voice coil suspended in a magnetic air gap. When audio currents pass through the coil, it vibrates thousands of times per
              second to compress air and produce sound waves. When foreign contaminants invade this micro-chamber, severe acoustic and
              electrical failures occur:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Mass-Loading & Muffled Acoustic Output
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The speaker diaphragm relies on being virtually weightless to oscillate at high frequencies. When water molecules seep
                  through the outer mesh, surface tension causes them to coalesce into a liquid film on top of the diaphragm. This creates
                  severe "mass loading"—the diaphragm becomes too heavy to oscillate freely. Mid and high frequencies are choked off,
                  leaving only a dull, muffled thud that sounds like speaking underwater.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  Voice Coil Corrosion & Electrochemical Oxidation
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  If trapped liquid remains stagnant for more than a few hours, atmospheric oxygen and electrical micro-potentials initiate
                  rapid corrosion across the voice coil's fine copper wire and solder joints. Once corrosion forms green or white oxide
                  crusts, the voice coil begins scraping against the permanent magnet, generating permanent crackling, buzzing, and
                  irreversible audio degradation that no software can reverse.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Thermal Runaway & Voice Coil Burnout
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Smartphone speakers dissipate heat through normal airflow created by the diaphragm’s rapid displacement. When the speaker
                  chamber is clogged with liquid or packed lint, ventilation ceases. If an unsuspecting user continues playing media or
                  alarms at 100% volume in an attempt to hear better, the voice coil rapidly overheats, breaking the insulation lacquer
                  and short-circuiting the audio amplifier IC.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Hygroscopic Lint & Sebum Cementation
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Inside trouser pockets and bags, phones are exposed to cotton fibers, fine particulate dust, skin flakes, and natural sebum
                  oils. These airborne particles settle onto the speaker mesh. When exposed to ambient humidity or ear sweat during phone
                  calls, the mixture coagulates into a cement-like plug that blocks the acoustic ports, diminishing overall volume by 40% to 70%.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Step-by-Step Instructions */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Volume2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Step-by-Step Instructions: How to Safely Clean Speakers with Acoustic Resonance
              </h2>
            </div>

            <p>
              Our <strong>Clean My Speaker</strong> engine utilizes calibrated low-frequency acoustic sweeps, specialized 165Hz pulses,
              and physical resonance. By cycling high-displacement sound waves, the speaker diaphragm acts as a miniature mechanical air
              pump, shattering liquid surface tension and propelling water droplets outward through the acoustic grille holes. Follow these
              6 essential steps for optimal recovery:
            </p>

            <ol className="space-y-4 list-none pl-0">
              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Remove Protective Phone Case & Blot Exterior Surfaces
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Immediately remove any bumper cases, rugged covers, or silicone skins, as trapped moisture pools in the seams. Take a
                    dry, lint-free microfiber cloth and gently dab down the phone’s chassis, buttons, charging port, and speaker perimeter.
                    Do not connect any charging cables or wired headphones at this stage.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Position Device Downward for Gravity Assistance
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Hold your smartphone vertically or rest it at a 45-degree angle on a dry, absorbent paper towel with the primary bottom
                    speaker ports pointing directly downward. Natural gravity combines with acoustic pressure waves, allowing dislodged
                    droplets to fall outward rather than re-draining into internal phone cavities.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Set Device Volume to Safe Optimal Ceiling (70% - 85%)
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Avoid cranking device volume to an extreme 100%. While loud sound is necessary to generate kinetic air displacement,
                    an unbuffered 100% volume burst on a fluid-dampened voice coil can introduce clipping distortion. A volume level between
                    70% and 85% provides maximum acoustic expulsion force within a safe mechanical threshold.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Initiate 165Hz Acoustic Pulse or Water Eject Sweep
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    On the tool panel at the top of this page, select <strong>Water Eject</strong> or <strong>Deep Clean (165Hz Pulse)</strong>{' '}
                    and tap Start. You will hear an oscillating, low-frequency hum accompanied by rhythmic audio beats. This specific tone
                    induces optimal physical excursion in smartphone drivers.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Execute a 30-to-60 Second Expulsion Cycle & Wipe Droplets
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Allow the acoustic cycle to run continuously for 30 to 60 seconds. Observe the speaker holes closely: you will often see
                    minute droplets of water emerging and beading on the metal rim. Dab these droplets away immediately with your dry cloth
                    before they have a chance to retract into the grill.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  6
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Verify Audio Clarity with Stereo Frequency Diagnostics
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Once the cleaning cycle completes, navigate to our built-in <strong>Speaker Test</strong> or{' '}
                    <strong>Left/Right Stereo Channel Test</strong>. Listen across bass (100Hz–250Hz), vocal mid-range (1kHz–3kHz), and high
                    treble frequencies (8kHz–12kHz) to ensure no rattling, distortion, or channel imbalance remains. Repeat the cycle once or
                    twice if subtle muffling persists.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Section 3: 5 Maintenance Tips */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Five Essential Rules to Maintain & Protect Your Mobile Speakers
              </h2>
            </div>

            <p>
              Preventative maintenance is infinitely more cost-effective than replacing micro-transducers. Follow these 5 manufacturer-grade
              protective protocols to ensure your smartphone’s speakers deliver pristine acoustics for years to come:
            </p>

            <div className="space-y-4 pt-2">
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    Rule 1: Never Insert Needles, Safety Pins, Toothpicks, or SIM Tools
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    This is the single most common cause of fatal speaker damage. Directly behind the external decorative grill lies a
                    delicate semi-permeable water-resistant acoustic membrane and the speaker diaphragm itself, located less than 2mm beneath
                    the surface. Inserting metallic or wooden probes inevitably punctures or tears these components. Once ruptured, the speaker
                    cannot be repaired and loses all factory water resistance.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    Rule 2: Strictly Avoid Hot Hair Dryers & Compressed Air Cans
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    Hair dryers blast high-temperature air that softens and liquefies the structural glues and water-resistant gaskets holding
                    the speaker module together. Furthermore, industrial canned compressed air delivers sudden shockwaves exceeding 60 PSI,
                    which force moisture deep into the logic board and can instantly tear the speaker’s microscopic diaphragm.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    Rule 3: Beware of Hot Bathroom Steam & Sauna Humidity (IP68 Myth)
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    Users often believe their IP68 water-resistant phone is immune to moisture in all forms. In reality, international ingress
                    protection ratings test only static, room-temperature fresh water. Hot bathroom steam consists of vapor molecules orders
                    of magnitude smaller than water droplets, easily bypassing acoustic mesh gaskets and condensing directly onto cold
                    internal circuits, inducing corrosion over time.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    Rule 4: Monthly Dry Brushing with an Ultra-Soft Bristle Brush
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    Keep a dedicated brand-new ultra-soft nylon makeup brush or extra-soft bristled toothbrush. Once every month, invert your
                    phone so the speaker grill faces downward and brush diagonally outwards across the holes using light, sweeping strokes.
                    This sweeps loose lint and environmental dust away before it can pack into an impermeable crust.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    Rule 5: Invest in Cases with Wide, Unobstructed Acoustic Porting
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    Inexpensive or poorly molded cases frequently feature misaligned speaker cutouts. Not only does this choke sound waves
                    and cause unwanted internal resonance, but it creates enclosed micro-pockets that trap moisture, lint, and sweat directly
                    against the speaker ports. Always inspect your phone case to ensure speaker openings are wide, clean, and perfectly aligned.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Comprehensive FAQs */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Frequently Asked Questions (FAQ) — Global Troubleshooting Guide
              </h2>
            </div>

            <p className="text-sm text-slate-400">
              Clear, expert-backed answers to the most common questions smartphone users face regarding speaker maintenance and water damage:
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  q: 'Does acoustic sound ejection actually work to expel water?',
                  a: 'Yes, conclusively. The technology relies on established laws of acoustic physics and mechanical resonance. In fact, this is the exact same engineering mechanism Apple officially engineers into the Apple Watch for its native "Water Lock Eject" feature. Specific frequencies (around 165Hz) induce maximum physical displacement (excursion) in the speaker diaphragm without clipping, transforming the speaker into an acoustic air pump that overcomes water surface tension and forces moisture outward.',
                },
                {
                  q: 'Can high-frequency sound damage my phone’s hardware or audio drivers?',
                  a: 'No. Clean My Speaker is engineered strictly within the safe frequency response and harmonic tolerance limits of smartphone audio hardware. Because modern smartphones feature built-in digital signal processors (DSPs) with automated limiting, standard browser playback cannot exceed hardware safety limits as long as you maintain volume between 70% and 85%. Standard 1-to-2 minute cleaning cycles are completely safe.',
                },
                {
                  q: 'What should I do if the liquid was soda, coffee, beer, or saltwater?',
                  a: 'Sugary, carbonated, or saline liquids represent a severe hazard because when they dry, they leave behind sticky syrups or corrosive salt crystals that seize the speaker diaphragm. Immediately power down the device, lightly dampen a clean microfiber cloth with 99% isopropyl alcohol (IPA) or distilled water, and gently wipe the external grill. Run the Clean My Speaker cycle immediately to eject the fluid before it can crystallize. If distortion persists, have the module professionally cleaned with ultrasonic bath equipment.',
                },
                {
                  q: 'Does putting a wet phone in a bowl of raw uncooked rice actually help?',
                  a: 'No—this is a dangerous, widely debunked urban legend. Major smartphone manufacturers (including Apple, Samsung, and Google) explicitly warn against burying phones in rice. Dry uncooked rice has minimal desiccant absorption capability compared to the open air. Worse, raw rice sheds microscopic starch powder and small grains that enter speaker grilles and charging ports, combining with moisture to create a rock-hard paste that ruins ports and speakers.',
                },
                {
                  q: 'How many times should I run the cleaning cycle?',
                  a: 'For minor splashes or slight muffling, 2 to 3 consecutive cycles of 30 to 60 seconds are typically sufficient. Always wipe away expelled droplets after each cycle so they are not drawn back inside. For preventative maintenance, running a 30-second cycle once a month helps dislodge accumulated dry lint.',
                },
                {
                  q: 'Does Clean My Speaker work across all iPhone, Android, and tablet devices?',
                  a: 'Yes. Clean My Speaker operates entirely through the standard W3C Web Audio API supported natively in modern web browsers (Safari, Chrome, Firefox, Edge, Brave, Opera). It requires no external app downloads, works across all versions of iOS, Android, iPadOS, macOS, and Windows, and directly drives the physical speaker hardware via your browser.',
                },
                {
                  q: 'What should I do if the speaker remains muffled after multiple attempts?',
                  a: 'If sound remains faint or heavily distorted after running 4 to 5 cycles and allowing the device to dry in a ventilated area with silica gel for 12 hours, liquid may have permeated deep into the internal amplifier electronics, or the diaphragm was mechanically torn prior to cleaning. Turn off the device and visit an authorized service center for diagnostic inspection.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 sm:px-5 pb-5 text-slate-300 text-xs sm:text-sm border-t border-slate-800/60 pt-3 leading-relaxed bg-slate-950/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-gradient-to-r from-cyan-950/30 via-slate-900 to-blue-950/30 border border-cyan-800/30 rounded-2xl p-6 sm:p-8 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Conclusion & Final Takeaways</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Preserving crystal-clear smartphone audio requires understanding the delicate mechanics inside your device. Whenever water
              or dust compromises your acoustic output, resist the urge to probe holes with sharp pins or expose circuits to damaging heat.
              Rely instead on non-invasive acoustic physics. With <strong>Clean My Speaker</strong>, you have a free, accessible, and
              instant engineering utility to restore your phone’s original acoustic fidelity anywhere in the world.
            </p>
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">Have feedback or need technical help?</span>
              <a
                href="mailto:km1631513@gmail.com"
                className="inline-flex items-center gap-1.5 font-mono text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Contact: km1631513@gmail.com</span>
              </a>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HINDI (हिन्दी) GUIDE */}
      {/* ========================================================================= */}
      {lang === 'hi' && (
        <div id="hindi-guide-raw-text" className="relative z-10 text-slate-300 text-base leading-relaxed space-y-8">
          {/* Intro */}
          <section className="space-y-4">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              आज के समय में स्मार्टफोन हमारे दैनिक जीवन का सबसे अभिन्न अंग बन चुका है। ऑफिस कॉल्स, ऑनलाइन मीटिंग्स,
              वीडियो देखने से लेकर संगीत सुनने तक, हम हर काम के लिए अपने फोन के लाउडस्पीकर पर निर्भर रहते हैं। लेकिन क्या आपने
              कभी महसूस किया है कि अचानक आपके फोन की आवाज धीमी, दबी हुई (muffled) या फटी-फटी आने लगी है? इसका सबसे आम कारण
              होता है — स्पीकर ग्रिल के अंदर <strong>पानी की बूंदें फंस जाना</strong> या महीनों से जमा <strong>बारीक धूल और मैल</strong>।
            </p>
            <p>
              जब फोन गलती से पानी में गिर जाता है, बारिश में भीग जाता है या रसोई व बाथरूम की नमी के संपर्क में आता है, तो पानी की
              छोटी-छोटी बूंदें स्पीकर की जाली (mesh grill) के सूक्ष्म छेदों में फंस जाती हैं। ठीक इसी तरह जेब की लिंट (रूई) और वातावरण
              की धूल स्पीकर के भीतर जाकर जम जाती है। कई लोग घबराकर सुई, हेयर ड्रायर या चावल में फोन डालने जैसी गलतियां करते हैं,
              जिससे स्पीकर हमेशा के लिए खराब हो सकता है।
            </p>
            <p>
              इस विस्तृत गाइड में हम आसान और सरल भाषा में समझेंगे कि पानी और धूल फोन स्पीकर को किस प्रकार नुकसान पहुंचाते हैं,
              <strong>Clean My Speaker</strong> टूल की उच्च-आवृत्ति ध्वनि तरंगें (Acoustic Sound Waves) इसे कैसे सुरक्षित बाहर निकालती हैं,
              और आप अपने मोबाइल स्पीकर की उम्र कैसे कई गुना बढ़ा सकते हैं।
            </p>
          </section>

          {/* Section 1: Water & Dust Damage */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. फोन स्पीकर में पानी और धूल से क्या-क्या नुकसान होता है?
              </h2>
            </div>

            <p>
              स्मार्टफोन का स्पीकर एक अत्यंत संवेदनशील माइक्रो-इलेक्ट्रोमैकेनिकल कंपोनेंट होता है। इसमें मुख्य रूप से एक
              पतला डायफ्राम (Diaphragm), एक मैग्नेट (चुंबक) और एक नाजुक वॉइस कॉइल (Voice Coil) होती है। जब इसमें बाहरी तत्व प्रवेश
              करते हैं, तो निम्नलिखित गंभीर समस्याएं पैदा होती हैं:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  डायफ्राम पर भार और आवाज का दबना (Muffled Sound)
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  स्पीकर से आवाज तभी निकलती है जब उसका डायफ्राम प्रति सेकंड हजारों बार आगे-पीछे कांपता (vibrate) है। जब पानी
                  की बूंदें डायफ्राम पर चिपक जाती हैं, तो उसके सतही तनाव (surface tension) के कारण डायफ्राम भारी हो जाता है और
                  खुलकर हिल नहीं पाता। परिणामस्वरुप आवाज बहुत धीमी, खोखली या पानी के अंदर से आती हुई महसूस होती है।
                </p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  आंतरिक जंग और करोश़न (Corrosion & Rusting)
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  पानी यदि कुछ घंटों तक स्पीकर चैंबर के भीतर रुका रह जाए, तो वह धातु के सूक्ष्म संपर्कों (contacts) और वॉइस कॉइल
                  के तारों में जंग पैदा कर देता है। एक बार जंग लग जाने के बाद स्पीकर में स्थायी तौर पर खरखराहट (crackling) आने
                  लगती है, जिसे किसी भी सॉफ्टवेयर या टूल से ठीक नहीं किया जा सकता।
                </p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  वॉइस कॉइल का ओवरहीटिंग और शॉर्ट-सर्किट
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  जब स्पीकर गीला या जाम होता है, तब भी यदि यूजर तेज आवाज में गाने या कॉल्स बजाता रहता है, तो वॉइस कॉइल पर
                  अत्यधिक दबाव पड़ता है। पर्याप्त वायु प्रवाह (airflow) न होने से कॉइल गर्म होकर जल सकती है या करंट का शार्ट सर्किट
                  हो सकता है।
                </p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  धूल और पसीने का ठोस परत बन जाना
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  दैनिक उपयोग में जब कान का तेल, पसीना और जेब की बारीक धूल स्पीकर की मेश ग्रिल पर मिलती है, तो वह सीमेंट जैसी
                  कठोर परत बना लेती है। यह परत साउंड वेव्स को बाहर आने से पूरी तरह रोक देती है, जिससे ईयरपीस की आवाज 50% से 70% तक
                  घट जाती है।
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Step-by-Step Instructions */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Volume2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Clean My Speaker टूल का सुरक्षित और सही इस्तेमाल कैसे करें? (स्टेप-बाय-स्टेप गाइड)
              </h2>
            </div>

            <p>
              हमारा <strong>Clean My Speaker</strong> ऑनलाइन टूल विशेष 165Hz एकॉस्टिक पल्स और रेजोनेंट फ्रीक्वेंसी टोन उत्पन्न करता है।
              यह ध्वनि तरंगें स्पीकर के डायफ्राम को तेजी से पुश करती हैं, जिससे अंदर से हवा का शक्तिशाली झोंका बाहर निकलता है और पानी
              व धूल की बूंदें खुद-ब-खुद बाहर छिटक जाती हैं। सर्वोत्तम परिणामों के लिए इन 6 चरणों का पालन करें:
            </p>

            <ol className="space-y-4 list-none pl-0">
              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">फोन का बाहरी पानी अच्छी तरह पोंछें</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    फोन का बैक कवर और केस तुरंत उतार लें। एक सूखे और साफ माइक्रोफाइबर कपड़े या सूती रूमाल से फोन की बाहरी बॉडी,
                    चार्जिंग पोर्ट और किनारों को हल्के हाथ से पोंछ लें। फोन को चार्जिंग पर बिल्कुल न लगाएं।
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">फोन को सही दिशा में पकड़ें (Gravity Assist)</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    फोन को इस तरह पकड़ें कि उसका मुख्य निचला स्पीकर (Bottom Speaker) नीचे की ओर हो। गुरुत्वाकर्षण (Gravity) पानी
                    की बूंदों को नीचे खींचने में मदद करता है। फोन को किसी सूखे टिशू पेपर या कपड़े के ऊपर 45 डिग्री के कोण पर रखें।
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">वॉल्यूम को 70% से 85% के सुरक्षित स्तर पर रखें</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    कई लोग गलती से वॉल्यूम 100% फुल कर देते हैं। अत्यधिक तेज आवाज से अचानक डायफ्राम पर ओवरलोड हो सकता है। 70% से 85%
                    का वॉल्यूम स्तर अधिकतम वायु दबाव (acoustic pressure) पैदा करने के लिए वैज्ञानिक रूप से सबसे सुरक्षित और प्रभावी माना गया है।
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">टूल का 'Start Cleaner' या 'Water Eject' बटन दबाएं</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    पेज के ऊपर दिए गए टूल पर जाएं और <strong>165Hz Acoustic Pulse</strong> या <strong>Water Eject</strong> मोड चुनें।
                    बटन दबाते ही आपको एक खास तरह की बीटिंग और वाइब्रेटिंग ध्वनि सुनाई देगी।
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">30 से 60 सेकंड का चक्र पूरा होने दें</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    ध्वनि तरंगों को कम से कम 30 से 60 सेकंड तक लगातार चलने दें। यदि फोन में पानी अधिक था, तो आप स्पीकर ग्रिल के
                    किनारों पर पानी की सूक्ष्म बूंदों को बाहर निकलते हुए देख सकेंगे। बाहर निकली बूंदों को साफ कपड़े से धीरे से पोंछ लें।
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start bg-slate-900/80 border border-slate-800/90 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  6
                </span>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">साउंड टेस्ट द्वारा स्पष्टता की जांच करें</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    सफाई प्रक्रिया पूरी होने के बाद हमारे 'Speaker Test' टूल से बाएं/दाएं चैनल और अलग-अलग फ्रीक्वेंसी की आवाज सुनकर देखें।
                    यदि आवाज अभी भी हल्की दबी लग रही है, तो इस प्रक्रिया को 1-2 बार दोबारा दोहराएं।
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Section 3: 5 Maintenance Tips */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. फोन स्पीकर को लंबे समय तक सुरक्षित और साफ रखने के 5 जरूरी टिप्स
              </h2>
            </div>

            <p>
              फोन रिपेयर सेंटर में आने वाले 60% से अधिक स्पीकर नुकसान का कारण पानी नहीं, बल्कि उपयोगकर्ताओं द्वारा सफाई के दौरान की
              गई गलतियां होती हैं। अपने स्पीकर को वर्षों तक क्रिस्टल क्लियर बनाए रखने के लिए इन 5 नियमों का कड़ाई से पालन करें:
            </p>

            <div className="space-y-4 pt-2">
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    टिप 1: सुई, टूथपिक, सेफ्टी पिन या सिम इजेक्टर का प्रयोग कभी न करें
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    यह सबसे खतरनाक और आम गलती है। स्पीकर की बाहरी जाली के ठीक 1-2 मिलीमीटर पीछे बहुत नाजुक वाटरप्रूफ मेश और
                    प्लास्टिक डायफ्राम होता है। जब आप किसी नुकीली चीज को छेद में डालते हैं, तो वह सीधे डायफ्राम को फाड़ देती है।
                    एक बार डायफ्राम फट गया तो स्पीकर को केवल बदलकर ही ठीक किया जा सकता है।
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    टिप 2: हेयर ड्रायर (गर्म हवा) और तेज कंप्रेस्ड एयर से सख्त परहेज करें
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    हेयर ड्रायर की गर्म हवा फोन के भीतर लगे वॉटर-रेसिस्टेंट सील और गोंद (adhesives) को पिघला देती है। इसके अलावा,
                    तेज हवा का दबाव पानी की बूंदों को बाहर निकालने के बजाय फोन के मदरबोर्ड और बैटरी की तरफ और गहरे धकेल देता है,
                    जिससे फोन पूरी तरह डेड हो सकता है।
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    टिप 3: बाथरूम, शॉवर और भाप (Steam) वाली जगहों पर फोन न ले जाएं
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    भले ही आपका फोन IP68 वॉटर-रेसिस्टेंट क्यों न हो, यह रेटिंग केवल सामान्य ठंडे पानी के लिए होती है, गर्म भाप
                    के लिए नहीं। गर्म भाप के कण पानी की बूंदों से कई गुना छोटे होते हैं और वे स्पीकर के गैस्केट के अंदर आसानी से
                    दाखिल होकर आंतरिक घटकों में धीरे-धीरे नमी और जंग पैदा कर देते हैं।
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    टिप 4: महीने में एक बार अल्ट्रा-सॉफ्ट सूखे ब्रिसल से ग्रिल साफ करें
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    एक नया, अत्यंत मुलायम ब्रिसल वाला टूथब्रश या मेकअप ब्रश लें। फोन को नीचे की तरफ झुकाकर रखें और हल्के हाथ से
                    स्पीकर की जाली पर बाहर की दिशा में झाड़ें (brush diagonally outwards)। इससे सूखी धूल बाहर गिर जाती है और
                    भीतर नहीं धंसती।
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    टिप 5: स्पीकर वेंट को अवरुद्ध न करने वाले सटीक फोन कवर का चुनाव करें
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    सस्ते या गलत कटिंग वाले मोबाइल केस स्पीकर के छेदों को आंशिक रूप से ढक देते हैं। इससे धूल-मिट्टी के जमा होने के लिए
                    खाली पॉकेट बन जाती है और ध्वनि में गूंज व विकृति आ जाती है। हमेशा ऐसे केस का उपयोग करें जिसमें स्पीकर कटआउट
                    चौड़ा और पूरी तरह खुला हो।
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Detailed FAQs */}
          <section className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. अक्सर पूछे जाने वाले सवाल (Frequently Asked Questions)
              </h2>
            </div>

            <p className="text-sm text-slate-400">
              उपयोगकर्ताओं द्वारा मोबाइल स्पीकर की सफाई और पानी निकालने से संबंधित सबसे महत्वपूर्ण सवाल और उनके प्रामाणिक उत्तर:
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  q: 'क्या ध्वनि (Sound Wave) से फोन के स्पीकर से पानी सचमुच बाहर निकल सकता है?',
                  a: 'हां, बिल्कुल। यह पूरी तरह से भौतिकी (Physics) के एकॉस्टिक रेजोनेंस सिद्धांत पर काम करता है। ठीक इसी तकनीक का इस्तेमाल Apple अपनी Apple Watch में स्विमिंग के बाद "Water Lock Eject" फीचर के लिए करता है। 165Hz जैसी विशेष आवृत्तियां स्पीकर डायफ्राम को अधिक आयाम (amplitude) के साथ कंपन कराती हैं, जिससे पीछे से हवा का दबाव बनता है और फंसा हुआ पानी बाहर की ओर निकल जाता है।',
                },
                {
                  q: 'क्या इस टूल की उच्च-आवृत्ति आवाज से मेरे फोन के स्पीकर को कोई नुकसान पहुंच सकता है?',
                  a: 'नहीं। Clean My Speaker को सुरक्षित ऑडियो थ्रेशोल्ड और मानक मोबाइल ड्राइवरों की क्षमता को ध्यान में रखकर तैयार किया गया है। यदि आप वॉल्यूम को 70% से 85% के बीच रखते हैं, तो यह पूरी तरह सुरक्षित है। लगातार घंटों तक 100% वॉल्यूम पर किसी भी ध्वनि को चलाने से बचें; 1 से 2 मिनट का सामान्य चक्र पूरी तरह निरापद होता है।',
                },
                {
                  q: 'अगर फोन में सादे पानी की जगह चाय, कॉफी, कोल्ड-ड्रिंक या खारा समुद्री पानी चला गया हो तो क्या करें?',
                  a: 'मीठे या खारे तरल पदार्थ सूखने के बाद चिपचिपा अवशेष या नमक के क्रिस्टल छोड़ देते हैं, जो स्पीकर को जाम कर सकते हैं। ऐसी स्थिति में तुरंत एक साफ सूती कपड़े को हल्का-सा आइसोप्रोपिल अल्कोहल (99% IPA) या हल्के डिस्टिल्ड पानी से केवल नम (damp) करें और बाहरी सतह पोंछें। इसके तुरंत बाद Clean My Speaker टूल चलाकर तरल बाहर निकालें। यदि चिपचिपाहट बहुत अधिक हो, तो पेशेवर तकनीशियन से संपर्क करना श्रेयस्कर है।',
                },
                {
                  q: 'क्या फोन को सूखे चावल (Rice) के डिब्बे में रखना सचमुच मददगार है?',
                  a: 'यह एक पुराना और खतरनाक मिथक है। आधुनिक इलेक्ट्रॉनिक्स विशेषज्ञ और स्मार्टफोन निर्माता (जैसे Apple और Samsung) चावल में फोन रखने की सख्त मनाही करते हैं। चावल में मौजूद बारीक स्टार्च पाउडर नमी के साथ मिलकर स्पीकर और चार्जिंग पोर्ट में चिपक जाता है और सूखकर सीमेंट जैसा कड़ा हो जाता है। चावल के बजाय सिलिका जेल पैकेट्स (Silica Gel) और पंखे की सामान्य हवा का उपयोग करना अत्यधिक सुरक्षित है।',
                },
                {
                  q: 'इस टूल को कितनी बार चलाना चाहिए?',
                  a: 'सामान्य तौर पर 30 से 60 सेकंड के 2 से 3 चक्र (cycles) फंसे हुए पानी और ढीली धूल को बाहर निकालने के लिए पर्याप्त होते हैं। हर चक्र के बाद स्पीकर ग्रिल को सूखे कपड़े से पोंछते रहें। दैनिक रख-रखाव के लिए महीने में एक बार 30 सेकंड का प्रिवेंटिव साइकिल चलाना उत्तम रहता है।',
                },
                {
                  q: 'क्या यह टूल iPhone, Samsung, Xiaomi, OnePlus आदि सभी फोनों पर काम करता है?',
                  a: 'हां, यह टूल किसी भी ऑपरेटिंग सिस्टम (iOS, Android, Windows, macOS) और किसी भी आधुनिक वेब ब्राउज़र (Safari, Chrome, Firefox, Edge) में बिना किसी ऐप या सॉफ्टवेयर डाउनलोड के सीधे काम करता है। क्योंकि यह सीधे हार्डवेयर लेवल पर मानक ब्राउज़र वेब ऑडियो एपीआई (Web Audio API) से कनेक्ट होता है।',
                },
                {
                  q: 'अगर टूल चलाने के बाद भी स्पीकर की आवाज ठीक न हो, तो क्या करना चाहिए?',
                  a: 'यदि कई बार टूल चलाने के बाद भी आवाज बहुत धीमी या भारी आ रही है, तो इसके दो कारण हो सकते हैं: पहला, पानी स्पीकर के अंदरूनी इलेक्ट्रॉनिक बोर्ड तक पहुंच गया है; दूसरा, डायफ्राम पहले ही भौतिक रूप से क्षतिग्रस्त हो चुका है। इस स्थिति में फोन को तुरंत स्विच ऑफ कर दें और अधिक नुकसान से बचने के लिए अधिकृत सर्विस सेंटर पर जांच कराएं।',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 sm:px-5 pb-5 text-slate-300 text-xs sm:text-sm border-t border-slate-800/60 pt-3 leading-relaxed bg-slate-950/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-gradient-to-r from-cyan-950/30 via-slate-900 to-blue-950/30 border border-cyan-800/30 rounded-2xl p-6 sm:p-8 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>निष्कर्ष (Conclusion)</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              स्मार्टफोन के स्पीकर की हिफाजत करना बिल्कुल मुश्किल नहीं है, बस आपको सही जानकारी और उचित तरीकों का ज्ञान होना चाहिए।
              जब भी पानी या धूल की समस्या हो, घबराहट में कोई भी आक्रामक तरीका (जैसे सुई या हेयर ड्रायर) आजमाने के बजाय हमेशा गैर-आक्रामक
              (non-invasive) वैज्ञानिक पद्धतियों को प्राथमिकता दें। <strong>Clean My Speaker</strong> के एकॉस्टिक टूल की मदद से आप घर
              बैठे बिना एक भी रुपया खर्च किए अपने फोन की खोई हुई आवाज और स्पष्टता को चुटकियों में पुनः प्राप्त कर सकते हैं।
            </p>
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">सहायता, सुझाव या तकनीकी पूछताछ के लिए:</span>
              <a
                href="mailto:km1631513@gmail.com"
                className="inline-flex items-center gap-1.5 font-mono text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>ईमेल: km1631513@gmail.com</span>
              </a>
            </div>
          </section>
        </div>
      )}
    </article>
  );
};
