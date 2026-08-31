import { CleanerPreset, FrequencyPreset, FAQItem, BlogPost, AffiliateProduct } from '../types';

export const CLEANER_PRESETS: CleanerPreset[] = [
  {
    id: 'deep',
    name: '165Hz Acoustic Pulse',
    tagline: 'Recommended for general clearing',
    description: 'Generates a 165 Hz harmonic tone modulated with a 6 Hz square pulse wave to produce maximum acoustic displacement in small speaker grills.',
    icon: 'Sparkles',
    baseFreq: 165,
    pulseRate: 6,
    waveType: 'sawtooth',
    accentColor: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'pulse',
    name: 'Dual-Resonance Alternation',
    tagline: 'High & low frequency cycle',
    description: 'Alternates rapidly between 160 Hz and 420 Hz, dislodging fine particles settled in acoustic mesh corners.',
    icon: 'Zap',
    baseFreq: 160,
    pulseRate: 8,
    waveType: 'triangle',
    accentColor: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'sweep',
    name: 'Dynamic Sweep (120Hz – 2.2kHz)',
    tagline: 'Full acoustic spectrum wave',
    description: 'Continuously glides through the entire phone speaker frequency spectrum to hit physical resonant nodes.',
    icon: 'Activity',
    baseFreq: 120,
    pulseRate: 1,
    waveType: 'sine',
    accentColor: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'vibrate',
    name: 'Sub-Bass Diaphragm Push',
    tagline: 'Physical diaphragm vibration',
    description: 'Uses dual low-frequency sine waves (65 Hz & 70 Hz) creating an acoustic beat frequency to gently flex speaker membranes.',
    icon: 'Vibrate',
    baseFreq: 65,
    pulseRate: 5,
    waveType: 'sine',
    accentColor: 'from-violet-500 to-purple-600',
  },
  {
    id: 'gentle',
    name: 'Delicate Acoustic Cycle',
    tagline: 'Softer volume for older devices',
    description: 'A smooth stepped harmonic sequence with safe amplitude thresholds, ideal for vintage or sensitive drivers.',
    icon: 'Shield',
    baseFreq: 250,
    pulseRate: 2,
    waveType: 'sine',
    accentColor: 'from-amber-500 to-orange-600',
  },
];

export const FREQUENCY_PRESETS: FrequencyPreset[] = [
  {
    id: 'sub-bass',
    name: 'Sub-Bass Range',
    hzRange: '20 Hz – 60 Hz',
    defaultHz: 50,
    minHz: 20,
    maxHz: 60,
    description: 'Tests the lowest audible vibrations and phone vibration motor harmony. Most small phone speakers have steep roll-offs below 80 Hz.',
    targetAcoustics: 'Sub-woofer simulation & diaphragm excursion check',
  },
  {
    id: 'bass',
    name: 'Bass Range',
    hzRange: '60 Hz – 250 Hz',
    defaultHz: 165,
    minHz: 60,
    maxHz: 250,
    description: 'The core fundamental resonance zone for modern smartphone micro-speakers. Ideal for water droplet agitation.',
    targetAcoustics: 'Bass presence, bottom speaker resonance & vibration feel',
  },
  {
    id: 'mid',
    name: 'Mid-Range (Vocal Clarity)',
    hzRange: '250 Hz – 4,000 Hz',
    defaultHz: 1000,
    minHz: 250,
    maxHz: 4000,
    description: 'Crucial for phone call intelligibility, podcasts, and vocals. Check for fuzziness or crackling when speech frequencies play.',
    targetAcoustics: 'Vocal clarity, earpiece speaker & stereo mid-range',
  },
  {
    id: 'high',
    name: 'Treble / High-Frequencies',
    hzRange: '4,000 Hz – 16,000 Hz',
    defaultHz: 8000,
    minHz: 4000,
    maxHz: 16000,
    description: 'Tests fine acoustic mesh penetration and high-frequency sparkle. Dust clogging often muffles this register first.',
    targetAcoustics: 'Airiness, cymbal crispness, fine mesh clarity',
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'How does sound-based speaker cleaning actually work?',
    answer: 'Sound waves are physical air pressure vibrations created by the speaker diaphragm moving back and forth. When playing specific low-frequency tones (especially around 165 Hz) with pulsed waveforms, the rapid physical movement pushes air outward through the tiny holes of the speaker grille. This airflow can help dislodge loose surface dust, pocket lint, or trapped water droplets.',
  },
  {
    id: 'faq-2',
    category: 'Water Removal',
    question: 'Can this tool remove water from a dropped or wet phone?',
    answer: 'Yes, playing resonant pulsed sound creates micro-vibrations that can help push surface liquid droplets out of the external speaker mesh. However, it is not a magical fix for internal water damage. For best results: tilt the phone so the speaker faces downward onto an absorbent microfiber cloth, shake gently, and run the Water Eject tool for 30–60 seconds at a moderate volume. If liquid has entered deep circuit components, turn off the phone and let it dry in a warm, ventilated area.',
  },
  {
    id: 'faq-3',
    category: 'Safety',
    question: 'Can playing loud cleaning tones damage my phone speaker?',
    answer: 'Our tool is calibrated with safe digital gain limits to prevent audio clipping. However, you should NEVER hold the phone directly against your ear while playing test tones, and you should avoid setting your device hardware volume to 100% distortion levels. Start at 60–75% volume, which provides sufficient acoustic energy without overdriving the amplifier.',
  },
  {
    id: 'faq-4',
    category: 'Compatibility',
    question: 'Does CleanMySpeaker work on iPhone and Android?',
    answer: 'Yes! CleanMySpeaker runs directly in any modern mobile or desktop web browser (Safari on iOS, Chrome on Android, Firefox, Edge, and Opera) using the standard HTML5 Web Audio API. No app store download or permissions are required.',
  },
  {
    id: 'faq-5',
    category: 'Safety',
    question: 'Should I insert a needle, toothpick, or compressed air into the speaker holes?',
    answer: 'STRICTLY NO. Inserting sharp metal needles, toothpicks, or high-pressure canned air can easily puncture the delicate waterproof acoustic membrane (GORE-TEX or mesh seal) behind the grille, permanently ruining water resistance and tearing the speaker cone. Use gentle acoustic vibration, soft anti-static brushes, or a bulb blower instead.',
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'Is CleanMySpeaker 100% free?',
    answer: 'Yes, CleanMySpeaker is completely free to use without subscriptions, hidden fees, or mandatory account registrations. You can run all cleaning modes, water eject cycles, and diagnostic frequency tests as often as needed.',
  },
  {
    id: 'faq-7',
    category: 'Water Removal',
    question: 'Why does my speaker still sound muffled after running the cleaner?',
    answer: 'If sound remains muffled after 2–3 cleaning cycles, either water remains trapped deeper in the acoustic cavity (requiring 2–12 hours of passive drying in a dry room with silica gel), or dried residue (like sugary drinks, saltwater, or compacted grime) has coated the mesh. If the speaker crackles at all volumes even after drying, the voice coil or membrane may have suffered physical trauma and requires professional hardware service.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-clean-phone-speaker-safely',
    title: 'How to Clean a Phone Speaker Safely (Without Damaging the Mesh)',
    excerpt: 'A comprehensive guide on removing pocket lint, dust, and grime from smartphone speaker grilles safely without puncturing internal waterproof membranes.',
    readingTime: '5 min read',
    publishDate: 'August 28, 2026',
    category: 'Cleaning',
    coverImageAlt: 'Cleaning smartphone speaker with soft brush and acoustic sound',
    content: {
      intro: 'Smartphone speakers are exposed to pockets, bags, dirt, and moisture every day. Over time, pocket lint and microscopic dust get trapped in the microscopic speaker grille holes, degrading volume and muffling call clarity. Here is how to clean your speaker safely using acoustic resonance and safe physical tools.',
      sections: [
        {
          heading: '1. Why Traditional Cleaning Methods Often Ruin Speakers',
          body: [
            'Many people instinctively reach for sewing needles, safety pins, or paperclips to scrape out grime. This is one of the most common causes of permanent smartphone speaker death.',
            'Modern smartphones feature an ultra-fine acoustic mesh and a hydrophobic breathable membrane designed to let sound waves out while blocking water ingress. Jamming a sharp metal object punctures this membrane in a fraction of a second, destroying your water-resistance rating and potentially tearing the speaker coil.',
            'Similarly, high-pressure canned air can blast debris deeper into the acoustic chamber or burst the speaker diaphragm from excess pneumatic force.',
          ],
          warning: 'Never insert metal pins, safety needles, or high-pressure air canisters into your speaker holes.',
        },
        {
          heading: '2. The Acoustic Sound Cleaning Method',
          body: [
            'Before touching the speaker with any physical tools, run a 30 to 60-second acoustic cleaning cycle.',
            'By generating pulsed frequencies (specifically around 165 Hz and sweeping tones), the speaker diaphragm pumps air rapidly outward through the grille, loosening dry dust particles.',
            'Hold the phone facing downward over a clean microfiber cloth while running the cleaner so dislodged particles fall freely out of the ports.',
          ],
          tip: 'Set your volume to approximately 70-80% for optimal acoustic airflow without harsh distortion.',
        },
        {
          heading: '3. Using a Soft Anti-Static Bristle Brush',
          body: [
            'After running the audio cleaner, inspect the grille under good lighting. If stubborn surface lint remains, take a very soft, dry, clean anti-static bristle brush (or a soft makeup brush / ultra-soft toothbrush).',
            'Hold the phone at an angle facing downward and gently sweep across the surface of the holes. Never press hard inward; brush diagonally across the grille openings.',
          ],
        },
        {
          heading: '4. When to Use Adhesive Cleaning Putty',
          body: [
            'For microscopic dust that remains stuck in the corners, high-grade electronics cleaning putty (or reusable adhesive tack) can be lightly pressed onto the exterior grille. Gently lift it straight off to pull dirt with it without leaving sticky residue.',
          ],
        },
      ],
      conclusion: 'By combining non-invasive acoustic pulse frequencies with gentle dry brushing, you can safely restore maximum volume and clarity without voiding your warranty or risking hardware damage.',
      recommendedTool: 'speaker-cleaner',
    },
  },
  {
    slug: 'how-to-remove-water-from-phone-speaker',
    title: 'How to Remove Water from a Phone Speaker: Step-by-Step Guide',
    excerpt: 'Dropped your phone in water or the sink? Follow this emergency step-by-step checklist to eject moisture and prevent corrosion.',
    readingTime: '6 min read',
    publishDate: 'August 24, 2026',
    category: 'Water Damage',
    coverImageAlt: 'Smartphone with water droplets on speaker and screen',
    content: {
      intro: 'Accidentally dropping your phone in the sink, pool, or rain can leave the speaker sounding like it is submerged underwater. Water droplets get trapped by surface tension inside the tiny mesh perforations, preventing the diaphragm from projecting sound clearly.',
      sections: [
        {
          heading: 'Step 1: Immediately Dry the Phone Exterior',
          body: [
            'Remove any case, screen protectors that are peeling, and unplug all charging cables or wired headphones immediately.',
            'Wipe the exterior thoroughly with a dry microfiber cloth. Do NOT plug in a charging cable while the ports or speakers are wet, as electrical current can cause short circuits and pin corrosion.',
          ],
          warning: 'Do NOT connect your phone to a charger until all ports and speakers are completely dry.',
        },
        {
          heading: 'Step 2: Position the Phone Speaker Facing Downward',
          body: [
            'Gravity is your best friend when removing liquids. Hold the phone vertically with the primary bottom speaker facing down toward a dry cloth.',
            'Give the phone a few gentle, controlled taps against the palm of your hand to shake loose large droplets trapped at the mouth of the speaker cavity.',
          ],
        },
        {
          heading: 'Step 3: Run the Water Eject Acoustic Pulse Tool',
          body: [
            'Open the CleanMySpeaker Water Eject tool on your browser.',
            'Set your phone volume to a healthy 75–85% level and press Start Water Eject.',
            'The tool plays a specially engineered 165Hz pulsed waveform. The high-amplitude air oscillation vibrates trapped droplets, breaking their surface tension and forcing them outward onto the cloth.',
            'Run 2 to 3 consecutive 30-second cycles, dabbing away expelled moisture with the cloth between runs.',
          ],
          tip: 'Look closely at the speaker grille: you may see tiny micro-droplets bubbling out of the holes during the low-frequency pulses.',
        },
        {
          heading: 'Step 4: Allow Passive Air Drying (Skip the Rice!)',
          body: [
            'Forget the old myth of putting your phone in a bowl of dry rice. Rice dust and starch can enter the ports, mix with the moisture, and form a concrete-like sludge that ruins internal components.',
            'Instead, leave your phone in an upright position in a well-ventilated room with a gentle fan blowing cool air across the bottom edge. For best results, place the phone in an airtight container with silica gel packets for several hours.',
          ],
        },
      ],
      conclusion: 'Sound waves are an effective, immediate first step for dislodging surface water tension. Give your device adequate time to dry completely before resuming heavy use or charging.',
      recommendedTool: 'water-eject',
    },
  },
  {
    slug: 'why-is-my-phone-speaker-muffled',
    title: 'Why Is My Phone Speaker Muffled? Top Causes and Fixes',
    excerpt: 'Diagnose whether your muffled sound is caused by clogged dust, trapped liquid, software Bluetooth glitches, or hardware damage.',
    readingTime: '5 min read',
    publishDate: 'August 20, 2026',
    category: 'Diagnostics',
    coverImageAlt: 'Audio diagnostic sound wave visualization',
    content: {
      intro: 'If your smartphone suddenly sounds quiet, distant, muddy, or tinny during calls and media playback, finding the exact cause will save you unnecessary repair bills. Here are the 5 most common reasons and how to test for them.',
      sections: [
        {
          heading: '1. Debris & Pocket Lint Accumulation',
          body: [
            'By far the most common culprit is compacted pocket lint. Clothes pockets generate fine cotton fibers that mix with skin oils and ambient dust, settling into a dense felt layer over the speaker mesh.',
            'Fix: Run the 165Hz Acoustic Pulse cleaner tool followed by a gentle sweep with a soft, clean bristle brush.',
          ],
        },
        {
          heading: '2. Trapped Moisture or High Humidity',
          body: [
            'Taking your phone into steamy bathrooms during showers or outdoor workouts can cause condensation inside the speaker chamber.',
            'Fix: Run the Water Eject tool to dislodge droplets and let the phone sit in dry air.',
          ],
        },
        {
          heading: '3. Bluetooth Output or Accessibility Balance Glitches',
          body: [
            'Sometimes your phone is routing audio to a nearby connected smartwatch, car stereo, or wireless earbud in your bag. In other cases, the stereo balance slider in Settings > Accessibility > Audio may have been shifted accidentally.',
            'Fix: Toggle Bluetooth off and on, check your system audio balance slider, and run the Left / Right Audio Test to verify stereo separation.',
          ],
        },
        {
          heading: '4. Protective Case Blocking the Ports',
          body: [
            'Some thick or budget phone cases have misaligned cutouts that partially cover the bottom speaker holes or trap acoustic sound inside the case bumper.',
            'Fix: Remove the case completely and test audio playback.',
          ],
        },
        {
          heading: '5. Blown Voice Coil or Physical Membrane Tear',
          body: [
            'If the speaker produces harsh buzzing, rattling, or crackling sounds at both low and high volumes, the delicate speaker coil or diaphragm may have suffered physical shock from a drop or blown from sustained overload.',
            'Fix: Run the Frequency Sweep diagnostic test. If distortion occurs across all frequency bands, a physical speaker module replacement is necessary.',
          ],
        },
      ],
      conclusion: 'Methodically testing each possible cause helps you isolate whether the issue is simple surface dust, trapped moisture, or physical hardware wear.',
      recommendedTool: 'speaker-test',
    },
  },
  {
    slug: 'phone-speaker-sounds-distorted-crackling',
    title: 'Phone Speaker Sounds Distorted or Crackling: Diagnostic Guide',
    excerpt: 'Learn how to identify whether speaker distortion is caused by audio clipping, loose debris vibration, software equalizer settings, or a blown speaker cone.',
    readingTime: '4 min read',
    publishDate: 'August 16, 2026',
    category: 'Diagnostics',
    coverImageAlt: 'Distortion waveform analysis and speaker diagnostics',
    content: {
      intro: 'A crackling or buzzing smartphone speaker can make listening to music or answering speakerphone calls intolerable. Understanding the difference between mechanical vibration, digital clipping, and hardware failure is key to fixing it.',
      sections: [
        {
          heading: '1. Mechanical Grille Rattling vs. Blown Driver',
          body: [
            'Often, what sounds like a "blown speaker" is actually a tiny hard sand grain or metal particle resting against the outside of the vibrating mesh. When bass notes play, the particle rattles violently against the grille.',
            'Use our Frequency Sweep test to see if the rattle only occurs at specific bass frequencies (resonance point). If so, acoustic pulsing and a gentle vacuum/air bulb can remove the rattling speck.',
          ],
        },
        {
          heading: '2. Software Equalizers & Volume Boosters',
          body: [
            'Third-party "Volume Booster" apps work by multiplying digital gain beyond 0 dBFS. This causes severe digital clipping, turning smooth sine waves into harsh, distorted square waves that overheat the speaker amplifier.',
            'Uninstall any volume boosting plugins and reset your system equalizer (EQ) to flat or default.',
          ],
        },
        {
          heading: '3. Testing with Pink Noise and Sine Waves',
          body: [
            'Pure sine waves are the gold standard for audio technicians. By playing a pure 1 kHz tone through our Volume Test tool, you should hear a smooth, clean whistle. If you hear harmonic buzzes or gravelly undertones, the driver is rubbing against its magnet assembly.',
          ],
        },
      ],
      conclusion: 'Run our diagnostic suite before heading to a repair store — you might just have a loose piece of grit or an overdriven equalizer setting.',
      recommendedTool: 'volume-test',
    },
  },
  {
    slug: 'iphone-speaker-cleaning-guide',
    title: 'iPhone Speaker Cleaning & Maintenance Guide (All Models)',
    excerpt: 'Detailed care recommendations for iPhone earpiece and bottom stereo speakers, covering dust removal, water ejection, and water-resistance ratings.',
    readingTime: '5 min read',
    publishDate: 'August 12, 2026',
    category: 'Hardware Care',
    coverImageAlt: 'iPhone speaker grille cleaning and care guide',
    content: {
      intro: 'Modern iPhones (from iPhone 7 through iPhone 16 and beyond) boast impressive stereo acoustic design with IP68 water resistance. However, their laser-cut micro-perforations can still collect daily pocket dust. Here is the safest way to maintain iPhone speakers according to technical standards.',
      sections: [
        {
          heading: '1. Understanding the Top Earpiece vs. Bottom Speaker',
          body: [
            'Your iPhone has two primary speaker outputs for stereo sound: the primary downward-firing speaker next to the Lightning / USB-C port, and the forward-facing earpiece receiver located along the top bezel or Dynamic Island.',
            'The top earpiece collects makeup, face oil, and sweat during phone calls. The bottom speaker collects pocket lint and moisture.',
          ],
        },
        {
          heading: '2. Cleaning the Top Receiver Mesh',
          body: [
            'Because the top speaker is narrow and angled, dirt can create a thin crust that makes phone calls sound extremely faint.',
            'To clean it, lightly dampen a clean microfiber cloth with a single drop of 70% Isopropyl alcohol (never wet, just slightly damp) and gently wipe across the top slot, then use our 4 kHz to 8 kHz Treble Test tone to shake loose any dried flakes.',
          ],
        },
        {
          heading: '3. Ejecting Water on iPhone using Web Audio',
          body: [
            'While iPhones have internal gasket seals, water caught in the outer port muffles sound for hours. Running the CleanMySpeaker Water Eject tool acts like the Apple Watch water lock expulsion sound, using 165 Hz resonance pulses to quickly push droplets out.',
          ],
        },
      ],
      conclusion: 'Regular 30-second acoustic maintenance keeps your iPhone speakers crisp, loud, and free of call-muffling debris.',
      recommendedTool: 'water-eject',
    },
  },
  {
    slug: 'android-speaker-troubleshooting-guide',
    title: 'Android Speaker Troubleshooting: Low Volume & Clogged Grilles',
    excerpt: 'Step-by-step troubleshooting for Samsung Galaxy, Google Pixel, Xiaomi, OnePlus, and Motorola phone speakers.',
    readingTime: '6 min read',
    publishDate: 'August 08, 2026',
    category: 'Hardware Care',
    coverImageAlt: 'Android smartphone speaker troubleshooting and diagnostics',
    content: {
      intro: 'With hundreds of Android smartphone models from Samsung, Google, Xiaomi, and OnePlus, speaker designs vary from bottom grille slots to front-firing stereo dual speakers. Here is a universal troubleshooting protocol for muffled or quiet Android speakers.',
      sections: [
        {
          heading: '1. Check Dolby Atmos and Sound Alive Presets',
          body: [
            'Many Android devices (especially Samsung Galaxy) feature built-in Dolby Atmos or sound adapt profiles. Sometimes changing an EQ profile to "Voice" or "Cinema" reduces overall master volume.',
            'Go to Settings > Sounds and Vibration > Sound Quality and Effects and test audio with Dolby Atmos toggled on and off.',
          ],
        },
        {
          heading: '2. Check Absolute Volume in Developer Options',
          body: [
            'If your speaker or Bluetooth volume seems stuck at half power despite pressing the physical rocker buttons, "Disable Absolute Volume" in Android Developer Options may resolve synchronization issues between phone and amplifier.',
          ],
        },
        {
          heading: '3. Clean Multi-Slot Speaker Ports',
          body: [
            'Many Android phones feature 4 to 6 discrete drilled holes rather than a single mesh bar. Use a soft-bristle brush held at a 45-degree angle while playing our Dual-Resonance Alternating pulse.',
          ],
        },
      ],
      conclusion: 'Combining software configuration checks with acoustic frequency cleaning will solve 90% of low-volume complaints on Android phones.',
      recommendedTool: 'speaker-test',
    },
  },
];

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'prod-1',
    name: 'Pro Electronics Anti-Static Cleaning Brush Kit',
    category: 'Cleaning Tools',
    description: 'Ultra-soft nylon bristle brushes specifically shaped to sweep phone speaker grilles and charging ports without scratching metallic finishes.',
    whyWeRecommend: 'Non-conductive bristles prevent electrostatic discharge, and the ultra-fine tips reach inside micro-drilled speaker holes safely.',
    rating: 4.8,
    badge: 'Top Pick',
    externalLink: '#',
  },
  {
    id: 'prod-2',
    name: 'Precision Rubber Air Bulb Blower',
    category: 'Maintenance',
    description: 'Delivers a controlled, safe stream of ambient air to blow away dislodged dust particles without the dangerous high pressures of canned chemical air.',
    whyWeRecommend: 'Zero chemical propellant, reusable, and gentle enough to protect delicate acoustic membranes.',
    rating: 4.9,
    badge: 'Safety Choice',
    externalLink: '#',
  },
  {
    id: 'prod-3',
    name: 'High-Density Microfiber Detailing Cloths (6-Pack)',
    category: 'Drying & Polishing',
    description: 'Lint-free, ultra-absorbent microfiber cloths ideal for absorbing expelled water droplets when running the Water Eject tool.',
    whyWeRecommend: 'Absorbs up to 8x its weight in liquid and prevents microscopic scratch swirls on delicate glass and camera lenses.',
    rating: 4.9,
    badge: 'Essential',
    externalLink: '#',
  },
  {
    id: 'prod-4',
    name: 'Rechargeable Sealed Silica Gel Dehumidifier Case',
    category: 'Water Recovery',
    description: 'Color-indicating desiccants designed to rapidly absorb moisture from electronics dropped in water, far superior to harmful rice.',
    whyWeRecommend: 'The scientifically proven method for drying internal electronics condensation safely without dust contamination.',
    rating: 4.7,
    badge: 'Emergency Kit',
    externalLink: '#',
  },
];
