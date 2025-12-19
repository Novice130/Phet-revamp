// Unified knowledge quiz with Leaderboard and Question Batching
// Features: Random 5 questions per round, Persistent High Scores (Local & Global)

export default function KnowledgeQuiz(simulation) {
  const gameId = "quiz-" + Math.random().toString(36).substr(2, 9);
  // Store all available questions
  const allQuestions = simulation.gameQuestions || [];

  return `
    <div class="knowledge-quiz" id="${gameId}">
      <div class="quiz-header">
        <h3>🧠 Knowledge Quiz</h3>
        <div class="quiz-progress" id="${gameId}-progress-container" style="display:none;">
          <span id="${gameId}-current">1</span> / <span id="${gameId}-total">5</span>
        </div>
      </div>

      <div class="quiz-content" id="${gameId}-content">
        <!-- Questions load here -->
      </div>

      <!-- Score View -->
      <div class="quiz-score" id="${gameId}-score" style="display:none;">
        <div class="score-circle">
          <div class="score-number" id="${gameId}-score-number">0</div>
          <div class="score-label">out of 5</div>
        </div>
        <h3 class="score-message" id="${gameId}-score-message"></h3>
        
        <!-- High Score Entry -->
        <div id="${gameId}-highscore-entry" class="highscore-entry" style="display:none;">
          <p>🏆 New High Score! Enter your name:</p>
          <div class="input-group">
            <input type="text" id="${gameId}-player-name" placeholder="Your Name" maxlength="15">
            <button class="btn btn-${simulation.gradeLevel} btn-sm" id="${gameId}-save-score">Save</button>
          </div>
        </div>

        <button class="btn btn-${simulation.gradeLevel} btn-lg" id="${gameId}-restart">Play Again (New Questions)</button>
        <button class="btn btn-outline" id="${gameId}-show-leaderboard">View Leaderboard</button>
      </div>

      <!-- Leaderboard View -->
      <div class="quiz-leaderboard" id="${gameId}-leaderboard" style="display:none;">
        <div class="leaderboard-tabs">
          <button class="tab-btn active" data-tab="sim">This Simulation</button>
          <button class="tab-btn" data-tab="global">Global Top 10</button>
        </div>
        <div class="leaderboard-list" id="${gameId}-leaderboard-list">
          <!-- Rows go here -->
        </div>
        <button class="btn btn-${simulation.gradeLevel}" id="${gameId}-back-score">Back</button>
      </div>

    </div>

    <style>
      .knowledge-quiz {
        background: linear-gradient(135deg, rgba(255,255,255,0.95), white);
        padding: var(--space-8);
        border-radius: var(--border-radius-xl);
        max-width: 820px;
        margin: 0 auto;
        border: 3px solid var(--theme-primary);
        box-shadow: var(--shadow-xl);
      }
      .theme-high .knowledge-quiz {
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
        border-color: rgba(255, 255, 255, 0.15);
      }
      .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
        border-bottom: 2px solid rgba(0,0,0,0.05);
        padding-bottom: var(--space-4);
      }
      .quiz-header h3 { margin: 0; color: var(--theme-primary); font-size: var(--font-size-2xl); }
      .theme-high .quiz-header h3 { color: white; }
      
      .quiz-progress { font-size: var(--font-size-lg); font-weight: bold; color: var(--theme-secondary); }

      .question-text {
        font-size: var(--font-size-xl);
        font-weight: 600;
        margin-bottom: var(--space-6);
        color: var(--color-gray-900);
      }
      .theme-high .question-text { color: rgba(255,255,255,0.95); }

      .quiz-options { display: flex; flex-direction: column; gap: var(--space-3); }
      .quiz-option {
        padding: var(--space-4);
        background: white;
        border: 2px solid var(--color-gray-200);
        border-radius: var(--border-radius-lg);
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
        display: flex; align-items: center; gap: var(--space-3);
        font-size: var(--font-size-base);
      }
      .theme-high .quiz-option { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: white; }
      .quiz-option:hover:not(.disabled) { border-color: var(--theme-primary); transform: translateX(5px); }
      
      .option-letter {
        width: 32px; height: 32px; border-radius: 50%;
        background: var(--theme-primary); color: white;
        display: flex; align-items: center; justify-content: center;
        font-weight: bold; flex-shrink: 0;
      }
      
      .quiz-option.correct { border-color: #10b981; background: #ecfdf5; }
      .quiz-option.incorrect { border-color: #ef4444; background: #fef2f2; }
      .theme-high .quiz-option.correct { background: rgba(16, 185, 129, 0.2); }
      .theme-high .quiz-option.incorrect { background: rgba(239, 68, 68, 0.2); }

      .quiz-feedback {
        margin-top: var(--space-6);
        padding: var(--space-4);
        background: rgba(0,0,0,0.03);
        border-left: 4px solid var(--theme-primary);
        border-radius: 0 var(--border-radius-lg) var(--border-radius-lg) 0;
      }
      .theme-high .quiz-feedback { background: rgba(255,255,255,0.05); }

      /* Score & High Score */
      .quiz-score { text-align: center; padding: var(--space-8) 0; }
      .score-circle {
        width: 180px; height: 180px;
        background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary));
        border-radius: 50%;
        color: white;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        margin: 0 auto var(--space-6);
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
      }
      .score-number { font-size: 4rem; font-weight: 800; line-height: 1; }
      
      .highscore-entry {
        background: var(--color-warning-light);
        padding: var(--space-6);
        border-radius: var(--border-radius-lg);
        margin: var(--space-6) auto;
        max-width: 400px;
        border: 2px solid var(--color-warning);
      }
      .input-group { display: flex; gap: var(--space-2); margin-top: var(--space-2); }
      input[type="text"] {
        flex: 1; padding: var(--space-2) var(--space-3);
        border: 2px solid var(--color-gray-300);
        border-radius: var(--border-radius-md);
      }

      /* Leaderboard */
      .leaderboard-tabs { display: flex; justify-content: center; gap: var(--space-2); margin-bottom: var(--space-4); }
      .tab-btn {
        padding: var(--space-2) var(--space-4);
        border: none; background: transparent;
        border-bottom: 3px solid transparent;
        cursor: pointer; font-weight: bold;
        color: var(--color-gray-500);
      }
      .tab-btn.active { border-bottom-color: var(--theme-primary); color: var(--theme-primary); }
      .theme-high .tab-btn.active { color: white; border-bottom-color: white; }

      .leaderboard-list {
        background: white;
        border: 1px solid var(--color-gray-200);
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        margin-bottom: var(--space-6);
      }
      .theme-high .leaderboard-list { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
      
      .lb-row {
        display: flex; justify-content: space-between;
        padding: var(--space-3) var(--space-4);
        border-bottom: 1px solid var(--color-gray-100);
      }
      .theme-high .lb-row { border-bottom-color: rgba(255,255,255,0.05); }
      .lb-row:last-child { border-bottom: none; }
      .lb-rank { font-weight: bold; width: 30px; color: var(--theme-secondary); }
      .lb-name { flex: 1; text-align: left; }
      .lb-score { font-weight: bold; color: var(--theme-primary); }
    </style>
  `;
}

export function initKnowledgeQuiz(gameId, allQuestions, gradeLevel, simId) {
  const BATCH_SIZE = 5;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  // Key for localStorage
  const STORE_KEY = `phet_lb_${simId}`;
  const GLOBAL_KEY = `phet_lb_global`;

  // DOM Elements
  const el = {
    content: document.getElementById(`${gameId}-content`),
    progress: document.getElementById(`${gameId}-progress-container`),
    currentSpan: document.getElementById(`${gameId}-current`),
    scoreView: document.getElementById(`${gameId}-score`),
    scoreNum: document.getElementById(`${gameId}-score-number`),
    scoreMsg: document.getElementById(`${gameId}-score-message`),
    hsEntry: document.getElementById(`${gameId}-highscore-entry`),
    inputName: document.getElementById(`${gameId}-player-name`),
    saveBtn: document.getElementById(`${gameId}-save-score`),
    restartBtn: document.getElementById(`${gameId}-restart`),
    lbView: document.getElementById(`${gameId}-leaderboard`),
    lbList: document.getElementById(`${gameId}-leaderboard-list`),
    showLbBtn: document.getElementById(`${gameId}-show-leaderboard`),
    backScoreBtn: document.getElementById(`${gameId}-back-score`),
    tabs: document.querySelectorAll(`#${gameId}-leaderboard .tab-btn`)
  };

  function startNewRound() {
    // Shuffle and pick 5
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0, BATCH_SIZE);
    
    currentQuestionIndex = 0;
    score = 0;
    
    el.content.style.display = 'block';
    el.progress.style.display = 'block';
    el.scoreView.style.display = 'none';
    el.lbView.style.display = 'none';
    
    renderQuestion();
  }

  function renderQuestion() {
    if (currentQuestions.length === 0) {
      el.content.innerHTML = '<p>No questions available.</p>';
      return;
    }

    const q = currentQuestions[currentQuestionIndex];
    el.currentSpan.textContent = currentQuestionIndex + 1;

    el.content.innerHTML = `
      <div class="question-text">${q.q || q.question}</div>
      <div class="quiz-options">
        ${(q.a || q.options).map((opt, i) => `
          <button class="quiz-option" data-idx="${i}">
            <span class="option-letter">${String.fromCharCode(65+i)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div id="${gameId}-feedback_area"></div>
    `;

    // Bind events
    el.content.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(q, btn));
    });
  }

  function handleAnswer(q, btn) {
    if (btn.classList.contains('disabled')) return;
    
    // Disable all
    el.content.querySelectorAll('.quiz-option').forEach(b => {
      b.classList.add('disabled');
    });

    const selectedIdx = parseInt(btn.dataset.idx);
    const correctIdx = q.c !== undefined ? q.c : q.correctIndex; // handle both formats
    const isCorrect = selectedIdx === correctIdx;

    if (isCorrect) {
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('incorrect');
      // Highlight correct
      const correctBtn = el.content.querySelector(`.quiz-option[data-idx="${correctIdx}"]`);
      if(correctBtn) correctBtn.classList.add('correct');
    }

    // Show feedback
    const fbArea = document.getElementById(`${gameId}-feedback_area`);
    fbArea.innerHTML = `
      <div class="quiz-feedback fade-in">
        <div><strong>${isCorrect ? "Correct!" : "Correct Answer:"}</strong> ${(q.a||q.options)[correctIdx]}</div>
        <div style="margin-top:5px; font-size:0.9em; opacity:0.8">${q.explanation || ''}</div>
        <button class="btn btn-${gradeLevel} quiz-next" style="margin-top:10px; width:100%">
          ${currentQuestionIndex < BATCH_SIZE - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    `;

    fbArea.querySelector('button').addEventListener('click', nextQuestion);
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= BATCH_SIZE) {
      endRound();
    } else {
      renderQuestion();
    }
  }

  function endRound() {
    el.content.style.display = 'none';
    el.progress.style.display = 'none';
    el.scoreView.style.display = 'block';
    
    el.scoreNum.textContent = score;
    el.scoreMsg.textContent = score === 5 ? "Perfect Score!" : score >= 3 ? "Great Job!" : "Keep Practicing!";

    // Check High Score (Top 10)
    const currentHighScores = getLocalScores(STORE_KEY);
    const lowestTop10 = currentHighScores.length < 10 ? 0 : currentHighScores[9].score;

    if (score > 0 && (currentHighScores.length < 10 || score > lowestTop10)) {
      el.hsEntry.style.display = 'block';
      el.inputName.value = '';
      el.inputName.focus();
    } else {
      el.hsEntry.style.display = 'none';
    }
  }

  function getLocalScores(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch { return []; }
  }

  function saveHighScore() {
    const name = el.inputName.value.trim() || 'Anonymous';
    const entry = { name, score, date: new Date().toISOString() };
    
    // Save Local
    const local = getLocalScores(STORE_KEY);
    local.push(entry);
    local.sort((a,b) => b.score - a.score); // Descending
    localStorage.setItem(STORE_KEY, JSON.stringify(local.slice(0, 10)));

    // Save Global
    const global = getLocalScores(GLOBAL_KEY);
    // Add simulation name to global entry
    const globalEntry = { ...entry, sim: simId }; 
    global.push(globalEntry);
    global.sort((a,b) => b.score - a.score);
    localStorage.setItem(GLOBAL_KEY, JSON.stringify(global.slice(0, 10)));

    el.hsEntry.style.display = 'none';
    showLeaderboard();
  }

  function showLeaderboard(tab = 'sim') {
    el.scoreView.style.display = 'none';
    el.lbView.style.display = 'block';
    
    // Update Tabs
    el.tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));

    const key = tab === 'sim' ? STORE_KEY : GLOBAL_KEY;
    const scores = getLocalScores(key);

    el.lbList.innerHTML = scores.length === 0 
      ? '<div style="padding:20px; text-align:center; opacity:0.6">No high scores yet. Be the first!</div>'
      : scores.map((s, i) => `
        <div class="lb-row">
          <div class="lb-rank">#${i+1}</div>
          <div class="lb-name">${s.name} ${s.sim ? `<span style="font-size:0.8em; opacity:0.6">(${s.sim})</span>`:''}</div>
          <div class="lb-score">${s.score}/5</div>
        </div>
      `).join('');
  }

  // Event Listeners
  el.saveBtn.addEventListener('click', saveHighScore);
  el.restartBtn.addEventListener('click', startNewRound);
  el.showLbBtn.addEventListener('click', () => showLeaderboard('sim'));
  el.backScoreBtn.addEventListener('click', () => {
    el.lbView.style.display = 'none';
    el.scoreView.style.display = 'block';
  });
  
  el.tabs.forEach(t => {
    t.addEventListener('click', () => showLeaderboard(t.dataset.tab));
  });

  // Start first round
  startNewRound();
}

