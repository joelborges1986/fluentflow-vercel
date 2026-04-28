// ══════════════════════════════════════════════
//  V6 — LEARNING MODE ENGINE
// ══════════════════════════════════════════════
let currentMode = 'text'; // 'text' | 'music' | 'series' | 'conversation'
let musicData = null;    // { song, youtubeId, lyricsExcerpt, exercises }
let seriesData = null;   // { show, episode, dialogue, exercises }
let convoHistory = [];   // conversation messages for convo mode

// ── API callers ──
async function callGenius(action, params) {
  const res = await fetch('/api/genius', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...params })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

async function callSubtitles(action, params) {
  const res = await fetch('/api/subtitles', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...params })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

async function callYouTube(query) {
  const res = await fetch('/api/youtube', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

// ══════════════════════════════════════════════
//  V6: MODE SELECTOR in topic chooser
// ══════════════════════════════════════════════
function renderTopicChooser() {
  const hasKey = isProxyAvailable();
  const profile = state.profile || { style: 'text', motivation: 'work', time: 30 };

  // Auto-select mode from profile
  if (!currentMode || currentMode === 'text') {
    currentMode = profile.style || 'text';
  }

  document.getElementById('session-inner').innerHTML = `
    <h2 style="font-family:'DM Serif Display',serif;font-size:24px;margin-bottom:6px">Choose today's topic</h2>
    <p style="color:var(--text2);font-size:14px;margin-bottom:20px">
      ${hasKey
        ? '<span class="ai-badge"><span class="ai-dot"></span>Gemini ativo</span> &nbsp;<span class="live-badge"><span class="live-dot"></span>Google Search</span>'
        : 'IA disponível apenas na versão hospedada.'}
    </p>

    <div class="section-title">Como quer aprender hoje?</div>
    <div class="mode-selector" style="margin-bottom:24px">
      <button class="mode-selector-btn ${currentMode==='text'?'active':''}" onclick="setLearningMode('text')">
        <div class="mode-icon">📖</div><div class="mode-name">Texto</div>
      </button>
      <button class="mode-selector-btn music-mode ${currentMode==='music'?'active':''}" onclick="setLearningMode('music')">
        <div class="mode-icon">🎵</div><div class="mode-name">Música</div>
      </button>
      <button class="mode-selector-btn series-mode ${currentMode==='series'?'active':''}" onclick="setLearningMode('series')">
        <div class="mode-icon">🎬</div><div class="mode-name">Série</div>
      </button>
      <button class="mode-selector-btn conversation-mode ${currentMode==='conversation'?'active':''}" onclick="setLearningMode('conversation')">
        <div class="mode-icon">💬</div><div class="mode-name">Conversação</div>
      </button>
    </div>

    <div id="mode-description" style="background:var(--bg3);border-radius:var(--radius-sm);padding:12px 14px;font-size:13px;color:var(--text2);margin-bottom:20px"></div>

    <div style="margin-bottom:20px">
      <div class="section-title">Tema personalizado</div>
      <div class="custom-input-row">
        <input class="custom-input" id="session-custom-input" placeholder="Digite qualquer tema…"/>
        <button class="btn btn-primary" onclick="startCustomSession()">Gerar →</button>
      </div>
    </div>
    <div class="topic-chooser">
      ${NEWS_TOPICS.map((t, i) => `
        <button class="topic-btn" onclick="selectTopic(${i})">
          <div class="topic-btn-icon">${t.icon}</div>
          <div class="topic-btn-name">${t.title}</div>
          <div class="topic-btn-desc">${t.tag.toUpperCase()}</div>
        </button>`).join('')}
    </div>
    <div>
      <div class="section-title">Sessão padrão</div>
      ${SEED_SESSIONS.map((s, i) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:14px;color:var(--text2)">${s.topic}</span>
          <button class="btn btn-ghost btn-sm" onclick="startBuiltinSession(${i})">Usar →</button>
        </div>`).join('')}
    </div>`;

  updateModeDescription();
}

function setLearningMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-selector-btn').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');
  updateModeDescription();
}

function updateModeDescription() {
  const el = document.getElementById('mode-description');
  if (!el) return;
  const descs = {
    text:         '📖 Texto e leitura — shadowing com artigos e textos profissionais, frases aplicáveis no trabalho.',
    music:        '🎵 Música real — escolha uma música, veja o trecho da letra, ouça no YouTube e faça shadowing com ela.',
    series:       '🎬 Série real — diálogo real de episódio de série em inglês, aprenda como os personagens falam de verdade.',
    conversation: '💬 Conversação livre — pratique falando com a IA em tempo real sobre o tema escolhido.',
  };
  el.textContent = descs[currentMode] || descs.text;
}

// ══════════════════════════════════════════════
//  V6: LAUNCH SESSION by mode
// ══════════════════════════════════════════════
async function launchSession(searchTopic, displayTitle) {
  state.currentTopic = displayTitle || searchTopic;
  saveState();

  if (!isProxyAvailable()) { startBuiltinSession(0); showToast('IA disponível apenas no Netlify'); return; }

  if (currentMode === 'music') {
    await launchMusicSession(searchTopic);
  } else if (currentMode === 'series') {
    await launchSeriesSession(searchTopic);
  } else if (currentMode === 'conversation') {
    launchConversationSession(searchTopic, displayTitle);
  } else {
    showGenerating(displayTitle || searchTopic);
    try { const s = await generateSessionLive(searchTopic); startGeneratedSession(s); }
    catch (e) { showToast('Erro na IA — conteúdo padrão'); startBuiltinSession(0); }
  }
}

// ══════════════════════════════════════════════
//  V6: MUSIC SESSION
// ══════════════════════════════════════════════
async function launchMusicSession(topic) {
  document.getElementById('session-inner').innerHTML = `
    <div class="generating-overlay">
      <div class="gen-spinner"></div>
      <div class="gen-text">🎵 Buscando música relacionada a <strong style="color:var(--text)">${topic}</strong></div>
      <div class="gen-sub">Genius + YouTube + Gemini gerando seus exercícios…</div>
    </div>`;

  try {
    // 1. Search for songs related to topic via Genius
    const { hits } = await callGenius('search', { query: topic + ' english song' });
    if (!hits || hits.length === 0) throw new Error('Nenhuma música encontrada');

    // 2. Get first song details
    const song = hits[0];
    const songDetail = await callGenius('song', { songId: song.id });

    // 3. Search YouTube for the music video
    let youtubeId = songDetail.youtubeId;
    if (!youtubeId) {
      const ytResult = await callYouTube(`${song.title} ${song.artist}`);
      youtubeId = ytResult.videos?.[0]?.videoId;
    }

    // 4. Use Gemini to generate exercises based on the song
    const exercises = await generateMusicExercises(songDetail, topic);

    musicData = { song: songDetail, youtubeId, exercises };
    currentSession = {
      topic: `${songDetail.title} — ${songDetail.artist}`,
      mode: 'music',
      isLive: true,
      ...exercises
    };
    sessionState = { block: 0, startTime: Date.now() };
    renderMusicBlock0();

  } catch (e) {
    showToast('Erro ao buscar música: ' + e.message + ' — usando modo texto');
    currentMode = 'text';
    showGenerating(topic);
    try { const s = await generateSessionLive(topic); startGeneratedSession(s); }
    catch { startBuiltinSession(0); }
  }
}

async function generateMusicExercises(song, topic) {
  const lvls = state.levels || { reading: 'B1', speaking: 'B1' };
  const system = `You are an English teacher using music to teach English. Create engaging exercises based on a real song. Always respond with valid JSON only.`;
  const prompt = `Create English learning exercises based on this song:
Title: "${song.title}"
Artist: "${song.artist}"
About: "${song.description || 'Popular English song'}"
Topic context: "${topic}"
Student level: Reading ${lvls.reading}, Speaking ${lvls.speaking}

Search for the actual lyrics of this song and use a short excerpt (4-6 lines max — fair use for education).

Return ONLY this JSON:
{
  "shadowing": {
    "title": "${song.title} by ${song.artist}",
    "text": "4-6 lines from the song lyrics. Mark key vocabulary with <em>tags</em>. Keep it short — this is for shadowing practice.",
    "audio_text": "Same without HTML tags.",
    "styleNote": "From the song '${song.title}' by ${song.artist}"
  },
  "lyricsContext": "2-3 sentences explaining what this part of the song is about and why it's good for English practice",
  "phrases": [
    { "en": "Phrase from or inspired by the song", "pt": "Tradução", "example": "How to use this phrase in real life, outside the song." }
  ],
  "questions": [
    { "q": "Question connecting the song's theme to real life or the topic '${topic}'", "tip": "Try: *This song makes me think of...*, *In my experience...*" }
  ],
  "challenge": {
    "tag": "Music & Language",
    "title": "Write your own verse",
    "prompt": "Inspired by '${song.title}', write 3-4 lines in English about ${topic}. Don't worry about rhyming — focus on using natural English and expressing your own ideas.",
    "cues": [
      { "label": "Start with a feeling", "example": "Sometimes I wonder if..." },
      { "label": "Add a contrast", "example": "But then I realize..." },
      { "label": "End with an insight", "example": "What matters most is..." }
    ]
  }
}
Rules: 5 phrases, 3 questions. Keep lyrics excerpt to max 6 lines (fair use). Make exercises connect the song to real life.`;

  return callGeminiJSON(prompt, system, true);
}

function renderMusicBlock0() {
  const song = musicData.song;
  const ytId = musicData.youtubeId;
  const exercises = musicData.exercises;
  const s = currentSession.shadowing;

  const blocks = ['A','B','C','D'];
  const prog = blocks.map((b,i) => `<div class="prog-seg ${i===0?'active':''}" title="Block ${b}"></div>`).join('');

  const ytEmbed = ytId
    ? `<iframe class="yt-embed" src="https://www.youtube.com/embed/${ytId}?rel=0" allowfullscreen allow="autoplay; encrypted-media"></iframe>`
    : `<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">Vídeo não disponível — ouça no Spotify ou YouTube manualmente.</div>`;

  document.getElementById('session-inner').innerHTML = `
    <div class="session-progress-bar">${prog}</div>
    <div class="block-header">
      <div class="block-letter A" style="background:rgba(167,139,250,.15);color:var(--accent2)">🎵</div>
      <div><div class="block-title">Music Shadowing</div><div class="block-desc">Ouça a música, leia a letra, e repita junto com o ritmo.</div></div>
    </div>

    <div class="music-player">
      <div class="music-player-header">
        ${song.thumbnail ? `<img class="music-thumb" src="${song.thumbnail}" alt="${song.title}">` : '<div class="music-thumb"></div>'}
        <div class="music-info">
          <div class="music-title">${song.title}</div>
          <div class="music-artist">${song.artist}</div>
        </div>
        <span class="music-badge">🎵 Real song</span>
      </div>
      ${ytEmbed}
    </div>

    ${exercises.lyricsContext ? `<div style="font-size:13px;color:var(--text2);margin-bottom:14px;padding:12px 14px;background:rgba(167,139,250,.06);border-radius:var(--radius-sm);border-left:3px solid var(--accent2)">${exercises.lyricsContext}</div>` : ''}

    <div class="lyrics-box">
      <div class="lyrics-label">📝 Trecho da letra — faça shadowing</div>
      <div class="lyrics-line">${s.text}</div>
    </div>

    <button class="play-btn" id="play-btn" onclick="playAudio(${JSON.stringify(s.audio_text)})" style="border-color:rgba(167,139,250,.4)">
      <div class="play-icon" style="background:var(--accent2)"><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6L1 13V1z"/></svg></div>
      Ouvir pronunciação do trecho (TTS)
    </button>
    <div style="margin-top:12px;font-size:12px;color:var(--text3)">💡 Ouça a música no player acima, depois tente cantar/falar o trecho junto. Repita 3x.</div>

    <div class="nav-bottom">
      <div class="block-check"><div class="check-toggle" id="check-A" onclick="toggleCheck('A')"></div><span>Mark as done</span></div>
      <button class="btn btn-primary btn-sm" onclick="renderBlock(1)">Next →</button>
    </div>`;
}

// ══════════════════════════════════════════════
//  V6: SERIES SESSION
// ══════════════════════════════════════════════
async function launchSeriesSession(topic) {
  document.getElementById('session-inner').innerHTML = `
    <div class="generating-overlay">
      <div class="gen-spinner"></div>
      <div class="gen-text">🎬 Buscando diálogo de série sobre <strong style="color:var(--text)">${topic}</strong></div>
      <div class="gen-sub">OpenSubtitles + Gemini gerando seus exercícios…</div>
    </div>`;

  try {
    // 1. Search for relevant episode via OpenSubtitles
    const { results } = await callSubtitles('search', { query: topic });
    if (!results || results.length === 0) throw new Error('Nenhum episódio encontrado');

    const episode = results[0];

    // 2. Download and extract dialogue excerpt
    const { excerpt } = await callSubtitles('download', { fileId: episode.fileId });
    if (!excerpt || excerpt.length === 0) throw new Error('Não foi possível extrair o diálogo');

    // 3. Gemini generates exercises based on the real dialogue
    const exercises = await generateSeriesExercises(episode, excerpt, topic);

    seriesData = { episode, excerpt, exercises };
    currentSession = {
      topic: `${episode.title} S${episode.season}E${episode.episode}`,
      mode: 'series',
      isLive: true,
      ...exercises
    };
    sessionState = { block: 0, startTime: Date.now() };
    renderSeriesBlock0();

  } catch (e) {
    showToast('Erro ao buscar série: ' + e.message + ' — usando modo texto');
    currentMode = 'text';
    showGenerating(topic);
    try { const s = await generateSessionLive(topic); startGeneratedSession(s); }
    catch { startBuiltinSession(0); }
  }
}

async function generateSeriesExercises(episode, excerpt, topic) {
  const lvls = state.levels || { reading: 'B1', speaking: 'B1' };
  const dialogueText = excerpt.join('\n');
  const system = `You are an English teacher using TV series to teach real spoken English. Create practical exercises based on a real dialogue. Always respond with valid JSON only.`;
  const prompt = `Create English learning exercises based on this real TV dialogue:

Show: "${episode.title}"
Episode: S${episode.season}E${episode.episode} — "${episode.episodeTitle || 'Episode'}"
Topic connection: "${topic}"
Student level: Reading ${lvls.reading}, Speaking ${lvls.speaking}

Real dialogue excerpt:
${dialogueText}

Return ONLY this JSON:
{
  "shadowing": {
    "title": "${episode.title} — S${episode.season}E${episode.episode}",
    "text": "Select the 3-4 most useful lines from the dialogue above. Format as natural flowing text, mark key expressions with <em>tags</em>.",
    "audio_text": "Same without HTML tags.",
    "styleNote": "Real dialogue from ${episode.title}, Season ${episode.season} Episode ${episode.episode}"
  },
  "dialogueLines": [
    { "text": "Line from dialogue", "highlight": true/false }
  ],
  "contextNote": "2 sentences explaining the context of this scene and why it's useful for English learners",
  "phrases": [
    { "en": "Expression from this dialogue", "pt": "Tradução", "example": "How you'd use this in real professional/casual life." }
  ],
  "questions": [
    { "q": "Question connecting this dialogue's situation to the learner's real life related to '${topic}'", "tip": "Try: *In a similar situation I would...*, *This reminds me of...*" }
  ],
  "challenge": {
    "tag": "Role Play",
    "title": "Reencenar a cena",
    "prompt": "Imagine you are in a situation similar to this scene from ${episode.title}. The topic is '${topic}'. How would you handle this conversation? Write your version of the dialogue from your own perspective.",
    "cues": [
      { "label": "Set the scene", "example": "The situation is similar to..." },
      { "label": "Your opening line", "example": "I would start by saying..." },
      { "label": "How you'd resolve it", "example": "In the end, I'd..." }
    ]
  }
}
Rules: 5 phrases, 3 questions. Use the actual dialogue lines. Connect to real-life professional situations.`;

  return callGeminiJSON(prompt, system, false);
}

function renderSeriesBlock0() {
  const ep = seriesData.episode;
  const exc = seriesData.excerpt;
  const ex = seriesData.exercises;
  const s = currentSession.shadowing;

  const blocks = ['A','B','C','D'];
  const prog = blocks.map((b,i) => `<div class="prog-seg ${i===0?'active':''}" title="Block ${b}"></div>`).join('');

  // Format dialogue with alternating speakers
  const dialogueHTML = exc.map((line, i) => `
    <div class="dialogue-line">
      <div class="dialogue-speaker ${i % 2 === 0 ? 'A' : 'B'}">${i % 2 === 0 ? 'A' : 'B'}</div>
      <div class="dialogue-text">${line}</div>
    </div>`).join('');

  document.getElementById('session-inner').innerHTML = `
    <div class="session-progress-bar">${prog}</div>
    <div class="block-header">
      <div class="block-letter A" style="background:rgba(52,211,153,.15);color:var(--green)">🎬</div>
      <div><div class="block-title">Series Dialogue</div><div class="block-desc">Leia o diálogo real, ouça e repita. Foco no ritmo e entonação natural.</div></div>
    </div>

    <div class="series-card">
      <div class="series-meta">
        <span class="series-title-tag">${ep.title}</span>
        <span class="series-ep-tag">S${ep.season}E${ep.episode}</span>
        ${ep.episodeTitle ? `<span class="series-ep-tag">"${ep.episodeTitle}"</span>` : ''}
        <span class="live-badge" style="font-size:10px"><span class="live-dot"></span>Diálogo real</span>
      </div>
      ${ex.contextNote ? `<div style="font-size:13px;color:var(--text2);margin-bottom:12px">${ex.contextNote}</div>` : ''}
      <div class="dialogue-box">${dialogueHTML}</div>
    </div>

    <button class="play-btn" id="play-btn" onclick="playAudio(${JSON.stringify(s.audio_text)})" style="border-color:rgba(52,211,153,.4)">
      <div class="play-icon" style="background:var(--green)"><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6L1 13V1z"/></svg></div>
      Ouvir trecho (TTS)
    </button>
    <div style="margin-top:12px;font-size:12px;color:var(--text3)">💡 Leia junto com o áudio tentando imitar o ritmo e a entonação dos personagens.</div>

    <div class="nav-bottom">
      <div class="block-check"><div class="check-toggle" id="check-A" onclick="toggleCheck('A')"></div><span>Mark as done</span></div>
      <button class="btn btn-primary btn-sm" onclick="renderBlock(1)">Next →</button>
    </div>`;
}

// ══════════════════════════════════════════════
//  V6: CONVERSATION MODE
// ══════════════════════════════════════════════
function launchConversationSession(topic, displayTitle) {
  const lvls = state.levels || { speaking: 'B1' };
  const motivation = state.profile?.motivation || 'work';

  convoHistory = [];
  currentSession = {
    topic: displayTitle || topic,
    mode: 'conversation',
    isLive: true,
    convoTopic: topic,
    convoLevel: lvls.speaking,
    convoMotivation: motivation,
    // Minimal shadowing/phrases for blocks B, C, D
    shadowing: { title: topic, text: 'Conversation mode — see Block A', audio_text: topic },
    phrases: [],
    questions: [
      { q: `How comfortable are you talking about "${topic}" in English right now?`, tip: 'Try: *I feel confident about...*, *I struggle with...*' },
      { q: 'What vocabulary related to this topic do you find hardest to use naturally?', tip: 'Try: *Words like...*, *Phrases such as...*' },
      { q: 'Describe a real situation where this topic came up in English.', tip: 'Try: *Once at work...*, *I remember when...*' }
    ],
    challenge: {
      tag: 'Conversation recap',
      title: 'Summarize your conversation',
      prompt: `After your conversation practice about "${topic}", write a 4-5 sentence summary of what you discussed. Include at least 2 phrases you used during the conversation.`,
      cues: [
        { label: 'Start', example: 'We talked about...' },
        { label: 'Key points', example: 'The main things I practiced were...' },
        { label: 'Takeaway', example: 'What I learned is...' }
      ]
    }
  };

  sessionState = { block: 0, startTime: Date.now() };
  renderConversationBlock();
}

function renderConversationBlock() {
  const blocks = ['A','B','C','D'];
  const prog = blocks.map((b,i) => `<div class="prog-seg ${i===0?'active':''}" title="Block ${b}"></div>`).join('');
  const topic = currentSession.convoTopic;
  const lvl = currentSession.convoLevel;
  const motivation = currentSession.convoMotivation;

  const motivCtx = {
    work: 'a professional context',
    travel: 'a travel situation',
    culture: 'a casual/cultural conversation',
    general: 'everyday conversation'
  }[motivation] || 'everyday conversation';

  // Initial AI message
  const aiOpener = `Hi! Let's practice talking about "${topic}" in ${motivCtx}. I'll play a conversation partner — respond naturally as you would in real life. Don't worry about mistakes, just keep the conversation going! Ready? Let's start: **What's your take on ${topic}?**`;

  document.getElementById('session-inner').innerHTML = `
    <div class="session-progress-bar">${prog}</div>
    <div class="block-header">
      <div class="block-letter A" style="background:rgba(45,212,191,.15);color:var(--teal)">💬</div>
      <div><div class="block-title">Free Conversation</div><div class="block-desc">Converse livremente sobre o tema. A IA responde e dá feedback natural.</div></div>
    </div>

    <div style="background:rgba(45,212,191,.08);border:1px solid rgba(45,212,191,.2);border-radius:var(--radius-sm);padding:12px 14px;font-size:13px;color:var(--text2);margin-bottom:14px">
      🎯 Fale sobre <strong style="color:var(--teal)">${topic}</strong> · Nível: <strong style="color:var(--teal)">${lvl}</strong> · ${Object.values({work:'Contexto profissional',travel:'Situação de viagem',culture:'Conversa cultural',general:'Inglês geral'})[['work','travel','culture','general'].indexOf(motivation)]||'Inglês geral'}
    </div>

    <div class="convo-box" id="convo-box">
      <div class="convo-message ai">
        <div class="convo-avatar">AI</div>
        <div class="convo-bubble">${aiOpener}</div>
      </div>
    </div>

    <div class="convo-input-row">
      <input class="convo-input" id="convo-input" placeholder="Type your response or use voice below…" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendConvoMessage();}"/>
      <button class="convo-send" onclick="sendConvoMessage()" id="convo-send-btn">Send →</button>
    </div>
    ${hasSpeechSupport() ? `
    <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
      <button class="mic-btn" id="convo-mic-btn" onclick="toggleConvoRecording()" style="border-radius:20px;padding:8px 16px">
        <span style="font-size:14px">🎙</span><span id="convo-mic-label">Gravar</span>
      </button>
      <span style="font-size:12px;color:var(--text3)">ou fale sua resposta</span>
    </div>` : ''}
    <div style="margin-top:10px;font-size:12px;color:var(--text3)">
      💡 Dica: tente usar frases completas, não apenas palavras soltas. A IA vai corrigir naturalmente.
    </div>

    <div class="nav-bottom">
      <div class="block-check"><div class="check-toggle" id="check-A" onclick="toggleCheck('A')"></div><span>Mark as done</span></div>
      <button class="btn btn-primary btn-sm" onclick="stopAllRecording();renderBlock(1)">Próximo bloco →</button>
    </div>`;

  convoHistory = [{ role: 'assistant', text: aiOpener }];
  document.getElementById('convo-input')?.focus();
}

async function sendConvoMessage() {
  const input = document.getElementById('convo-input');
  const sendBtn = document.getElementById('convo-send-btn');
  const box = document.getElementById('convo-box');
  const text = input?.value.trim();
  if (!text || !box) return;

  // Add user message
  input.value = '';
  sendBtn.disabled = true;
  box.innerHTML += `
    <div class="convo-message user">
      <div class="convo-avatar">Eu</div>
      <div class="convo-bubble">${text}</div>
    </div>`;
  box.scrollTop = box.scrollHeight;
  convoHistory.push({ role: 'user', text });

  // Typing indicator
  const typingId = 'typing-' + Date.now();
  box.innerHTML += `<div class="convo-message ai" id="${typingId}"><div class="convo-avatar">AI</div><div class="convo-bubble"><div class="convo-typing"><span></span><span></span><span></span></div></div></div>`;
  box.scrollTop = box.scrollHeight;

  // Build conversation context
  const topic = currentSession.convoTopic;
  const lvl = currentSession.convoLevel;
  const history = convoHistory.map(m => `${m.role === 'user' ? 'Student' : 'Teacher'}: ${m.text}`).join('\n');

  const system = `You are an engaging English conversation partner for a Brazilian professional at ${lvl} level. Keep responses SHORT (2-4 sentences max). React naturally to what they said, ask a follow-up question, and occasionally (every 3-4 exchanges) gently correct a grammar mistake inline. Topic: "${topic}". Be warm, encouraging, and keep the conversation flowing.`;
  const prompt = `Conversation history:\n${history}\n\nRespond naturally as a conversation partner. Keep it conversational and short.`;

  let reply = '';
  await callGemini(prompt, system,
    chunk => { reply += chunk; },
    () => {
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.querySelector('.convo-bubble').textContent = reply;
      box.scrollTop = box.scrollHeight;
      convoHistory.push({ role: 'assistant', text: reply });
      sendBtn.disabled = false;
      document.getElementById('convo-input')?.focus();
    },
    err => {
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.querySelector('.convo-bubble').textContent = 'Erro: ' + err;
      sendBtn.disabled = false;
    }
  );
}

// Voice for conversation mode
let convoRecognition = null;
function toggleConvoRecording() {
  const btn = document.getElementById('convo-mic-btn');
  const lbl = document.getElementById('convo-mic-label');
  const input = document.getElementById('convo-input');

  if (convoRecognition) {
    convoRecognition.stop();
    convoRecognition = null;
    if (btn) btn.classList.remove('recording');
    if (lbl) lbl.textContent = 'Gravar';
    // Auto-send after voice
    setTimeout(() => sendConvoMessage(), 300);
    return;
  }
  if (!SpeechRecognitionAPI || isIOS) { showToast('Use o teclado no iOS'); return; }

  const rec = new SpeechRecognitionAPI();
  rec.lang = 'en-US'; rec.interimResults = true; rec.continuous = false;
  let final = '';
  rec.onstart = () => { btn?.classList.add('recording'); if (lbl) lbl.textContent = 'Parar'; };
  rec.onresult = e => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) final += e.results[i][0].transcript;
      else interim = e.results[i][0].transcript;
    }
    if (input) input.value = final + (interim ? ' ' + interim : '');
  };
  rec.onend = () => {
    convoRecognition = null;
    btn?.classList.remove('recording');
    if (lbl) lbl.textContent = 'Gravar';
    if (final.trim()) setTimeout(() => sendConvoMessage(), 200);
  };
  rec.onerror = () => { convoRecognition = null; btn?.classList.remove('recording'); if (lbl) lbl.textContent = 'Gravar'; };
  convoRecognition = rec;
  try { rec.start(); } catch(e) { showToast('Erro no microfone'); }
}

// ══════════════════════════════════════════════
//  V6: OVERRIDE renderBlock for mode-aware routing
// ══════════════════════════════════════════════
function renderBlock(idx) {
  if (idx >= 4) { completeSession(); return; }
  const blocks = ['A','B','C','D'];
  const prog = blocks.map((b,i) => `<div class="prog-seg ${i<idx?'done':i===idx?'active':''}" title="Block ${b}"></div>`).join('');

  // Block A is mode-specific — already rendered by launch functions
  // Blocks B, C, D are the same for all modes
  if (idx === 0) {
    if (currentSession?.mode === 'music') renderMusicBlock0();
    else if (currentSession?.mode === 'series') renderSeriesBlock0();
    else if (currentSession?.mode === 'conversation') renderConversationBlock();
    else renderBlockA(prog);
  } else if (idx === 1) renderBlockB(prog);
  else if (idx === 2) renderBlockC(prog);
  else if (idx === 3) renderBlockD(prog);
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
window.speechSynthesis?.getVoices();
initFirebase();
