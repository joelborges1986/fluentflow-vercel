// api/gemini.js — Vercel Serverless Function

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) return res.status(500).json({ error: 'GEMINI_API_KEY não configurada.' });

  const { mode, model, payload } = req.body;
  const geminiModel = model || 'gemini-2.0-flash';

  if (mode === 'stream') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:streamGenerateContent?alt=sse&key=${GEMINI_KEY}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const e = await response.json().catch(() => ({}));
        return res.status(response.status).json({ error: e.error?.message || 'Gemini error' });
      }
      const raw = await response.text();
      let fullText = '';
      for (const line of raw.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const chunk = JSON.parse(data).candidates?.[0]?.content?.parts?.[0]?.text;
          if (chunk) fullText += chunk;
        } catch {}
      }
      return res.status(200).json({ text: fullText });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (mode === 'json') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${GEMINI_KEY}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const e = await response.json().catch(() => ({}));
        return res.status(response.status).json({ error: e.error?.message || 'Gemini error' });
      }
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(400).json({ error: 'mode deve ser "stream" ou "json"' });
}
