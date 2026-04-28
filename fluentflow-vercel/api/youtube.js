// api/youtube.js — Vercel Serverless Function

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const YT_KEY = process.env.YOUTUBE_API_KEY;
  if (!YT_KEY) return res.status(500).json({ error: 'YOUTUBE_API_KEY não configurada.' });

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'query required' });

  try {
    const params = new URLSearchParams({
      part: 'snippet', q: query + ' official audio',
      type: 'video', maxResults: '3',
      videoCategoryId: '10', key: YT_KEY
    });
    const r = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
    if (!r.ok) throw new Error('YouTube API error ' + r.status);
    const data = await r.json();
    const videos = (data.items || []).map(item => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
      channel: item.snippet?.channelTitle,
      thumbnail: item.snippet?.thumbnails?.medium?.url,
    })).filter(v => v.videoId);
    return res.status(200).json({ videos });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
