// api/genius.js — Vercel Serverless Function

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const GENIUS_KEY = process.env.GENIUS_API_KEY;
  if (!GENIUS_KEY) return res.status(500).json({ error: 'GENIUS_API_KEY não configurada.' });

  const { action, query, songId } = req.body;

  if (action === 'search') {
    try {
      const r = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}&per_page=5`, {
        headers: { 'Authorization': `Bearer ${GENIUS_KEY}` }
      });
      if (!r.ok) throw new Error('Genius search error ' + r.status);
      const data = await r.json();
      const hits = (data.response?.hits || [])
        .filter(h => h.type === 'song')
        .map(h => ({
          id: h.result.id,
          title: h.result.title,
          artist: h.result.primary_artist?.name,
          thumbnail: h.result.song_art_image_thumbnail_url,
          url: h.result.url,
        }));
      return res.status(200).json({ hits });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (action === 'song') {
    try {
      const r = await fetch(`https://api.genius.com/songs/${songId}?text_format=plain`, {
        headers: { 'Authorization': `Bearer ${GENIUS_KEY}` }
      });
      if (!r.ok) throw new Error('Genius song error ' + r.status);
      const data = await r.json();
      const song = data.response?.song;
      const ytUrl = song.media?.find(m => m.provider === 'youtube')?.url || null;
      const ytMatch = ytUrl?.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
      return res.status(200).json({
        id: song.id,
        title: song.title,
        artist: song.primary_artist?.name,
        album: song.album?.name,
        description: song.description?.plain?.slice(0, 500),
        thumbnail: song.song_art_image_url,
        url: song.url,
        youtubeId: ytMatch ? ytMatch[1] : null,
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(400).json({ error: 'action must be "search" or "song"' });
}
