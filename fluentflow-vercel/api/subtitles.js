// api/subtitles.js — Vercel Serverless Function

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SUBDL_KEY = process.env.SUBDL_API_KEY;
  if (!SUBDL_KEY) return res.status(500).json({ error: 'SUBDL_API_KEY não configurada.' });

  const { action, query, url: subtitleUrl } = req.body;

  if (action === 'search') {
    try {
      const params = new URLSearchParams({
        api_key: SUBDL_KEY, film_name: query,
        type: 'tv', languages: 'EN', subs_per_page: '5'
      });
      const r = await fetch(`https://api.subdl.com/api/v1/subtitles?${params}`);
      if (!r.ok) throw new Error('SubDL error ' + r.status);
      const data = await r.json();
      if (!data.status || !data.subtitles?.length) return res.status(200).json({ results: [] });
      const results = data.subtitles.slice(0, 5).map(s => ({
        name: s.name, releaseName: s.release_name, lang: s.lang,
        season: s.season, episode: s.episode,
        downloadUrl: s.url ? `https://dl.subdl.com${s.url}` : null,
      })).filter(r => r.downloadUrl);
      return res.status(200).json({ results, showInfo: data.results?.[0] });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (action === 'download') {
    if (!subtitleUrl) return res.status(400).json({ error: 'url required' });
    try {
      const r = await fetch(subtitleUrl, { headers: { 'User-Agent': 'FluentFlow/6.0' } });
      if (!r.ok) throw new Error('Download error ' + r.status);
      const buffer = await r.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const srtContent = extractSRTFromZip(bytes);
      if (!srtContent) throw new Error('No SRT found in ZIP');
      const lines = parseSRT(srtContent);
      const excerpt = extractExcerpt(lines, 10);
      return res.status(200).json({ excerpt, totalLines: lines.length });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(400).json({ error: 'action must be "search" or "download"' });
}

function extractSRTFromZip(bytes) {
  let i = 0;
  while (i < bytes.length - 30) {
    if (bytes[i] === 0x50 && bytes[i+1] === 0x4B && bytes[i+2] === 0x03 && bytes[i+3] === 0x04) {
      const fnameLen = bytes[i+26] | (bytes[i+27] << 8);
      const extraLen = bytes[i+28] | (bytes[i+29] << 8);
      const compSize = bytes[i+18] | (bytes[i+19] << 8) | (bytes[i+20] << 16) | (bytes[i+21] << 24);
      const nameStart = i + 30;
      const fname = String.fromCharCode(...bytes.slice(nameStart, nameStart + fnameLen));
      const dataStart = nameStart + fnameLen + extraLen;
      if (fname.toLowerCase().endsWith('.srt') && compSize > 0) {
        const data = bytes.slice(dataStart, dataStart + compSize);
        try { return new TextDecoder('utf-8').decode(data); } catch { return new TextDecoder('latin1').decode(data); }
      }
      i = dataStart + compSize;
    } else { i++; }
  }
  return null;
}

function parseSRT(srt) {
  const lines = [];
  for (const block of srt.trim().split(/\n\n+/)) {
    const parts = block.split('\n');
    if (parts.length < 3) continue;
    const text = parts.slice(2).join(' ').replace(/<[^>]+>/g, '').replace(/\{[^}]+\}/g, '').trim();
    if (text && text.length > 3 && text.length < 200) lines.push(text);
  }
  return lines;
}

function extractExcerpt(lines, count) {
  if (lines.length <= count) return lines;
  let bestStart = 0, bestScore = 0;
  for (let i = 0; i < lines.length - count; i++) {
    const score = lines.slice(i, i + count).filter(l => l.length > 5 && l.length < 100 && !l.startsWith('[') && !/^\d/.test(l)).length;
    if (score > bestScore) { bestScore = score; bestStart = i; }
  }
  return lines.slice(bestStart, bestStart + count);
}
