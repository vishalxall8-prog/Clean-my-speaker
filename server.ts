import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Security & HTTPS enforcement middleware
  app.use((req, res, next) => {
    // Check standard reverse proxy header for HTTPS
    const proto = req.headers['x-forwarded-proto'];
    if (proto && proto !== 'https' && process.env.NODE_ENV === 'production') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }

    // Modern Security Headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  app.use(express.json({ limit: '5mb' }));

  // Gemini API client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(apiKey),
      timestamp: Date.now(),
    });
  });

  // Multi-turn Chat endpoint with Google Search Grounding
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, enableSearch = true } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required and must not be empty.' });
      }

      if (!ai) {
        return res.status(503).json({
          error:
            'Gemini API key is not configured. Please ensure GEMINI_API_KEY is configured in your AI Studio project secrets.',
        });
      }

      // Convert messages into valid Gemini content structure
      // Roles must be 'user' or 'model'
      const contents = messages
        .filter((m: any) => m && typeof m.content === 'string' && m.content.trim().length > 0)
        .map((m: any) => ({
          role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content.trim() }],
        }));

      if (contents.length === 0) {
        return res.status(400).json({ error: 'No valid message content provided.' });
      }

      const systemInstruction = `You are CleanMySpeaker AI — an expert phone audio, speaker acoustics, and water expulsion diagnostic specialist.
Your mission is to provide accurate, safe, scientifically sound, and up-to-date guidance on:
1. Hydro-acoustic water ejection: How 165Hz sine waves, continuous tones, and pulsed acoustic pressure create physical vibrations that dislodge trapped water droplets from smartphone speaker grilles and earpieces.
2. Emergency wet phone care:
   - Immediate first steps: disconnect from charger immediately, remove cases/accessories, hold speaker pointing down onto an absorbent cloth, allow natural evaporation in a well-ventilated room.
   - What NOT to do: DO NOT insert pins, needles, cotton swabs, or sharp objects into speaker grilles. DO NOT apply direct excessive heat (e.g. hair dryers, ovens, direct radiators) as this melts waterproof adhesives and damages diaphragms. DO NOT plug in the charger while moisture may be present. DO NOT shake violently (this forces liquid deeper into internal electronics). DO NOT use uncooked rice (rice grains and starch powder seep into ports, cake with moisture, and clog speaker mesh).
3. Speaker Diagnostics:
   - How to test and diagnose muffled sound, crackling, low volume, distorted bass, and left/right stereo channel balance.
   - Differences between temporary acoustic damping from surface moisture vs permanent diaphragm tear or corrosion.
4. Smartphone Specifications & Water Resistance:
   - IP67 (immersion up to 1 meter for 30 minutes) vs IP68 (1.5 to 6 meters for 30 minutes, e.g., iPhone 12 through 16 are rated IP68 for 6 meters).
   - Clarify that water resistance degrades over time with normal wear, drops, temperature shifts, and exposure to soap/chlorine/saltwater.
   - Manufacturer warranties (Apple, Samsung, Google) do not cover liquid damage under standard limited warranties.
5. Use Google Search grounding to retrieve current, verified device specs, teardowns, and manufacturer repair advisories when specific phone models or recent tech news are mentioned.

Formatting Guidelines:
- Provide clear, direct, and concise answers with bold highlights and numbered lists for steps.
- Maintain an encouraging, helpful, and safety-conscious tone.
- When relevant, recommend using CleanMySpeaker's 165Hz Water Eject tool, Frequency Sweep, or Stereo Balance test as a safe diagnostic step.`;

      let response: any = null;
      let usedSearch = false;

      // Tier 1: Try gemini-3.8-flash with Google Search Grounding if enabled
      if (enableSearch) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
              tools: [{ googleSearch: {} }],
            },
          });
          usedSearch = true;
        } catch {
          // If search grounding hits rate limit or quota, proceed to standard prompt
        }
      }

      // Tier 2: Try gemini-3.8-flash without search tools
      if (!response) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
            },
          });
        } catch {
          // Proceed to next tier
        }
      }

      // Tier 3: Try gemini-flash-latest
      if (!response) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents,
            config: {
              systemInstruction,
            },
          });
        } catch {
          // Proceed to next tier
        }
      }

      // Tier 4: Try gemini-3.1-flash-lite
      if (!response) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents,
            config: {
              systemInstruction,
            },
          });
        } catch {
          // Proceed to local diagnostic fallback
        }
      }

      // Tier 5: If cloud Gemini models are temporarily busy or rate-limited, serve authoritative local acoustic knowledge
      if (!response) {
        const lastUserMsg =
          contents.filter((c: any) => c.role === 'user').slice(-1)[0]?.parts?.[0]?.text?.toLowerCase() || '';

        const reply = generateAcousticDiagnosticFallback(lastUserMsg);

        return res.json({
          reply,
          sources: [
            {
              title: 'CleanMySpeaker Acoustic Lab Protocols',
              url: 'https://cleanmyspeaker.app/blog/remove-water-from-phone-speaker.html',
            },
          ],
          searchQueries: ['phone speaker water removal 165hz acoustic diagnostics'],
          fallback: true,
        });
      }

      const reply = response.text || 'No response generated.';
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;

      // Extract search grounding sources if present
      const sources: { title: string; url: string }[] = [];
      const searchChunks = groundingMetadata?.groundingChunks || [];
      for (const chunk of searchChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri,
          });
        }
      }

      const searchQueries = groundingMetadata?.webSearchQueries || [];

      return res.json({
        reply,
        sources,
        searchQueries,
      });
    } catch {
      // Safe fallback on unexpected failure
      const lastUserMsg =
        req.body?.messages?.slice(-1)[0]?.content?.toLowerCase?.() || '';

      const reply = generateAcousticDiagnosticFallback(lastUserMsg);

      return res.json({
        reply,
        sources: [
          {
            title: 'CleanMySpeaker Acoustic Lab Protocols',
            url: 'https://cleanmyspeaker.app/blog/remove-water-from-phone-speaker.html',
          },
        ],
        searchQueries: ['phone speaker water removal 165hz acoustic diagnostics'],
        fallback: true,
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CleanMySpeaker full-stack server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Built-in verified acoustic engineering knowledge fallback
function generateAcousticDiagnosticFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('water') || q.includes('wet') || q.includes('drop') || q.includes('pool') || q.includes('liquid') || q.includes('sink')) {
    return `### 🚨 Immediate Wet Phone Recovery Steps

If your phone was exposed to liquid, follow these acoustic safety rules immediately:

1. **Disconnect Power Instantly**: Never plug in a charger or lightning/USB-C cable while moisture may be present. Charging while wet causes galvanic corrosion and short circuits.
2. **Remove Accessories**: Take off cases, screen protectors with trapped liquid, or connected dongles.
3. **Gravity Orientation**: Position the phone upright with the speaker openings pointed **downward** onto a clean, lint-free microfiber cloth.
4. **Run the 165Hz Water Eject Tool**: Play CleanMySpeaker's **165Hz Hydro-Acoustic Pulse** at 70%–80% volume for 2 to 3 cycles (30–60 seconds each). The physical air displacement forces trapped surface droplets out of the micro-mesh.
5. **Passive Ventilated Drying**: Allow the device to rest in a dry, well-ventilated room with gentle air circulation for several hours before resuming normal use.

⚠️ **Crucial Warnings**:
* **Never use hair dryers or ovens**: High temperatures soften acoustic waterproof adhesives and warp speaker membranes.
* **Avoid uncooked rice**: Rice dust enters speaker ports and forms a sticky paste that permanently clogs acoustic mesh.`;
  }

  if (q.includes('165') || q.includes('frequency') || q.includes('physics') || q.includes('how it works') || q.includes('sound eject')) {
    return `### 🔊 The Physics of 165Hz Acoustic Water Expulsion

Acoustic water ejection relies on **mechanical resonance and surface tension disruption**:

* **Why 165 Hz?**: Smartphone micro-speakers have small resonant cavities. A 165Hz sine wave creates the optimal balance between high cone displacement (amplitude) and cycle velocity.
* **Air Displacement (Pneumatics)**: As the speaker diaphragm pulses back and forth 165 times per second, it creates rapid pressure differentials across the acoustic mesh grille.
* **Overcoming Capillary Action**: Surface tension normally causes water droplets to cling to the micro-holes of the speaker mesh. The 165Hz pulse breaks this meniscus tension, propelling water droplets outward onto your drying towel.
* **Continuous vs Pulsed**: CleanMySpeaker uses alternating pulsed bursts to allow water to mobilize without overheating the voice coil.`;
  }

  if (q.includes('rice') || q.includes('myth') || q.includes('uncooked')) {
    return `### 🍚 Why You Should Never Put a Wet Phone in Rice

Repair technicians strongly advise against using uncooked rice:

* **Starch & Dust Contamination**: Dry rice is coated with fine talc and starch powder. When mixed with moisture inside your phone, it forms a caked paste that clogs speaker grilles, microphones, and charging ports.
* **Slow Desiccation**: Scientific tests show that rice absorbs ambient air humidity much slower than simple open-air circulation from a desk fan.
* **Corrosion Window**: Because rice dries devices very slowly, trapped liquid remains in contact with copper traces and solder joints longer, accelerating electrolytic corrosion.

💡 **Better Alternative**: Place your phone near a fan with the speaker facing downward, or seal it inside an airtight container with **silica gel packets** (desiccants).`;
  }

  if (q.includes('crackl') || q.includes('distort') || q.includes('muffl') || q.includes('buzz') || q.includes('quiet') || q.includes('earpiece')) {
    return `### 🛠️ Diagnosing Muffled or Crackling Speakers

If your audio sounds muffled or distorted, use this diagnostic triage:

1. **Surface Moisture Check**: Water trapped against the diaphragm dampens acoustic vibration, making sound quiet or muffled. Run the **165Hz Water Eject** tool to clear liquid.
2. **Frequency Sweep Test**: Run CleanMySpeaker's **20Hz – 20kHz Frequency Test**.
   * If buzzing occurs only at sub-bass (60–120Hz), there may be loose pocket debris or lint resting on the speaker grille.
   * If harsh static occurs across all frequencies, the speaker coil may be mechanically torn or damaged.
3. **Stereo Channel Test**: Use our **Left/Right Stereo Balance Test** to compare top earpiece output with the bottom primary speaker.
4. **Cleaning Pocket Lint**: Gently use a dry, soft-bristled toothbrush angled sideways across the grille. Never insert metal pins or safety pins.`;
  }

  if (q.includes('ip68') || q.includes('ip67') || q.includes('waterproof') || q.includes('warranty') || q.includes('iphone') || q.includes('samsung')) {
    return `### 📱 Smartphone Water Resistance & Warranty Facts

* **Water Resistance vs Waterproof**: Phones are **water-resistant**, not waterproof. They rely on rubber gaskets, mesh membranes, and hydrophobic adhesive seals.
* **IP67 vs IP68**:
  * **IP67**: Tested for immersion up to 1 meter for 30 minutes in fresh water.
  * **IP68**: Tested for deeper immersion (e.g., iPhone 12 through 16 are rated up to 6 meters for 30 minutes).
* **Degradation Over Time**: Water resistance degrades through daily drops, pocket flexing, thermal changes, and contact with soap, chlorine, or ocean saltwater.
* **Warranty Coverage**: Standard warranties from Apple, Samsung, and Google **do not cover liquid damage**. Built-in Liquid Contact Indicators (LCIs) turn red upon moisture contact.`;
  }

  return `### 🎧 CleanMySpeaker Audio Diagnostics & Care

Here are the verified principles for keeping smartphone speakers clear and loud:

1. **Water Expulsion**: Use calibrated 165Hz sound pulses with the phone held speaker-side down to dislodge trapped liquid droplets.
2. **Lint & Dust Clearing**: Use periodic gentle acoustic sweeps to loosen pocket debris from speaker grilles.
3. **Safe Drying Practices**: Avoid hair dryers, needles, and rice. Use gentle room airflow and silica desiccants.
4. **Stereo Health Check**: Use our Left/Right and Frequency Diagnostic tests to ensure both top earpiece and bottom speakers are performing in balance.

*(Tip: You can ask specific questions about your phone model, water exposure incidents, or sound issues at any time!)*`;
}
