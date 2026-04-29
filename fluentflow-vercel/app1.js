// ═════════════════════════════
// CONFIG
// ═════════════════════════════
const API_PROXY = '/api/gemini';

// ═════════════════════════════
// STATE
// ═════════════════════════════
const DEFAULT_STATE = {
  currentTopic: null,
  levels: null,
  profile: null
};

let state = { ...DEFAULT_STATE };
let currentSession = null;

// ═════════════════════════════
// UI HELPERS
// ═════════════════════════════
function renderPlayButton(audioText) {
  return `
    <button class="play-btn" onclick='playAudio(${JSON.stringify(audioText)})'>
      <div class="play-icon">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
          <path d="M1 1l10 6L1 13V1z"/>
        </svg>
      </div>
      Play audio
    </button>
  `;
}

function renderShadowBlock(s) {
  return `
    <div class="shadow-text">${s.text}</div>
    ${renderPlayButton(s.audio_text)}
  `;
}

// ═════════════════════════════
// NAVIGATION
// ═════════════════════════════
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page)?.classList.add('active');
}

// ═════════════════════════════
// SESSION CORE
// ═════════════════════════════
function startSession(session) {
  currentSession = session;
  renderBlockA();
}

function renderBlockA() {
  const s = currentSession.shadowing;

  document.getElementById('session-inner').innerHTML = `
    <div class="block-header">
      <h2>Shadowing</h2>
      <p>Read, listen and repeat</p>
    </div>

    ${renderShadowBlock(s)}

    <button class="btn btn-primary" onclick="renderBlockB()">Next →</button>
  `;
}

function renderBlockB() {
  document.getElementById('session-inner').innerHTML = `
    <h2>Next block</h2>
    <button onclick="renderBlockA()">← Back</button>
  `;
}

// ═════════════════════════════
// TOPIC CHOOSER (único agora)
// ═════════════════════════════
function renderTopicChooser() {
  const container = document.getElementById('session-inner');

  container.innerHTML = `
    <h2>Choose topic</h2>

    <input id="topic-input" placeholder="Digite um tema" />

    <button onclick="startCustomSession()">Gerar</button>

    <div style="margin-top:20px">
      <button onclick="setLearningMode('text')">Texto</button>
      <button onclick="setLearningMode('music')">Música</button>
      <button onclick="setLearningMode('series')">Série</button>
      <button onclick="setLearningMode('conversation')">Conversação</button>
    </div>
  `;
}

function startCustomSession() {
  const topic = document.getElementById('topic-input').value.trim();
  if (!topic) return alert('Digite um tema');

  launchSession(topic);
}
