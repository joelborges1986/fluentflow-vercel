// ═════════════════════════════
// MODE ENGINE
// ═════════════════════════════
let currentMode = 'text';

// ═════════════════════════════
// MODE SELECTOR
// ═════════════════════════════
function setLearningMode(mode) {
  currentMode = mode;
  console.log('Modo:', mode);
}

// ═════════════════════════════
// MAIN LAUNCHER
// ═════════════════════════════
async function launchSession(topic) {
  if (currentMode === 'music') {
    return launchMusicSession(topic);
  }

  if (currentMode === 'series') {
    return launchSeriesSession(topic);
  }

  if (currentMode === 'conversation') {
    return launchConversationSession(topic);
  }

  return launchTextSession(topic);
}

// ═════════════════════════════
// TEXT MODE
// ═════════════════════════════
async function launchTextSession(topic) {
  const session = {
    shadowing: {
      text: `Talking about ${topic} is important in modern life.`,
      audio_text: `Talking about ${topic} is important in modern life.`
    }
  };

  startSession(session);
}

// ═════════════════════════════
// MUSIC MODE
// ═════════════════════════════
async function launchMusicSession(topic) {
  const session = {
    shadowing: {
      text: `🎵 Imagine a song about ${topic}...`,
      audio_text: `Imagine a song about ${topic}`
    }
  };

  startSession(session);
}

// ═════════════════════════════
// SERIES MODE
// ═════════════════════════════
async function launchSeriesSession(topic) {
  const session = {
    shadowing: {
      text: `🎬 Dialogue about ${topic}`,
      audio_text: `Dialogue about ${topic}`
    }
  };

  startSession(session);
}

// ═════════════════════════════
// CONVERSATION MODE
// ═════════════════════════════
function launchConversationSession(topic) {
  const session = {
    shadowing: {
      text: `💬 Let's talk about ${topic}`,
      audio_text: `Let's talk about ${topic}`
    }
  };

  startSession(session);
}
