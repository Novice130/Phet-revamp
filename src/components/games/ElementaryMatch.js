// Enhanced Matching Game - Flip Card Memory Game with Timer & Leaderboard
export default function ElementaryMatch(vocabulary) {
  const gameId = 'match-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="flip-match-game" id="${gameId}">
      <div class="game-header">
        <h3>🎨 Word Matching Fun!</h3>
        <p>Match the words by clicking pairs!</p>
        <div class="game-stats">
          <div class="stat-item">
            <span class="stat-label">Matches:</span>
            <span class="stat-value" id="${gameId}-matches">0 / ${Math.floor(vocabulary.length / 2)}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">⏱️ Time:</span>
            <span class="stat-value" id="${gameId}-timer">0:00</span>
          </div>
        </div>
      </div>
      
      <div class="cards-grid" id="${gameId}-grid">
        <!-- Cards will be inserted here -->
      </div>
      
      <div class="game-complete" id="${gameId}-complete" style="display: none;">
        <div class="complete-animation">🎉</div>
        <h3>Congratulations!</h3>
        <p class="complete-time">Time: <span id="${gameId}-final-time">0:00</span></p>
        <p class="complete-matches">Matches: <span id="${gameId}-final-matches">0</span></p>
        
        <div class="name-input-section" id="${gameId}-name-section">
          <p>🏆 Enter your name for the leaderboard!</p>
          <input type="text" id="${gameId}-player-name" placeholder="Your Name" maxlength="20" class="name-input">
          <button class="btn btn-elementary" id="${gameId}-submit-score">Submit Score</button>
        </div>
        
        <div class="leaderboard" id="${gameId}-leaderboard">
          <h4>🏆 Top 10 High Scores</h4>
          <div class="leaderboard-list" id="${gameId}-leaderboard-list">
            <!-- Leaderboard will be inserted here -->
          </div>
        </div>
        
        <button class="btn btn-elementary" id="${gameId}-restart">Play Again</button>
      </div>
    </div>
    
    <style>
      .flip-match-game {
        background: linear-gradient(135deg, #ff6b9d 0%, #ffa94d 100%);
        padding: var(--space-8);
        border-radius: var(--border-radius-2xl);
        max-width: 800px;
        margin: 0 auto;
      }
      
      .game-header {
        text-align: center;
        color: white;
        margin-bottom: var(--space-6);
      }
      
      .game-header h3 {
        font-family: var(--font-elementary);
        font-size: var(--font-size-3xl);
        margin-bottom: var(--space-2);
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
      }
      
      .game-header p {
        font-family: var(--font-elementary);
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-4);
      }
      
      .game-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-8);
        background: rgba(255, 255, 255, 0.2);
        padding: var(--space-3);
        border-radius: var(--border-radius-xl);
        backdrop-filter: blur(10px);
      }
      
      .stat-item {
        display: flex;
        gap: var(--space-2);
        font-family: var(--font-elementary);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
      }
      
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--space-4);
        margin-bottom: var(--space-6);
      }
      
      .flip-card {
        aspect-ratio: 1;
        perspective: 1000px;
        cursor: pointer;
      }
      
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }
      
      .flip-card.flipped .flip-card-inner {
        transform: rotateY(180deg);
      }
      
      .flip-card-front,
      .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: var(--border-radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-elementary);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-lg);
        box-shadow: var(--shadow-lg);
      }
      
      .flip-card-front {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: var(--font-size-4xl);
      }
      
      .flip-card-back {
        background: white;
        color: var(--color-gray-900);
        transform: rotateY(180deg);
        padding: var(--space-2);
        text-align: center;
        word-break: break-word;
      }
      
      .flip-card.matched {
        opacity: 0.5;
        pointer-events: none;
      }
      
      .flip-card.matched .flip-card-back {
        background: linear-gradient(135deg, #10b981, #34d399);
        color: white;
      }
      
      .game-complete {
        text-align: center;
        background: white;
        padding: var(--space-8);
        border-radius: var(--border-radius-2xl);
        animation: scaleIn 0.5s ease-out;
      }
      
      .complete-animation {
        font-size: 80px;
        animation: bounce 1s ease-in-out infinite;
      }
      
      .game-complete h3 {
        font-family: var(--font-elementary);
        color: var(--color-elementary-primary);
        margin: var(--space-4) 0;
      }
      
      .complete-time,
      .complete-matches {
        font-size: var(--font-size-xl);
        margin: var(--space-2) 0;
        font-family: var(--font-elementary);
      }
      
      .complete-time span,
      .complete-matches span {
        color: var(--color-elementary-secondary);
        font-weight: var(--font-weight-bold);
      }
      
      .name-input-section {
        margin: var(--space-6) 0;
        padding: var(--space-4);
        background: var(--color-gray-50);
        border-radius: var(--border-radius-xl);
      }
      
      .name-input-section p {
        font-family: var(--font-elementary);
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-3);
      }
      
      .name-input {
        width: 100%;
        max-width: 300px;
        padding: var(--space-3);
        font-size: var(--font-size-lg);
        border: 2px solid var(--color-elementary-primary);
        border-radius: var(--border-radius-lg);
        margin-bottom: var(--space-3);
        font-family: var(--font-elementary);
      }
      
      .leaderboard {
        margin: var(--space-6) 0;
      }
      
      .leaderboard h4 {
        font-family: var(--font-elementary);
        color: var(--color-elementary-primary);
        margin-bottom: var(--space-4);
      }
      
      .leaderboard-list {
        background: var(--color-gray-50);
        border-radius: var(--border-radius-xl);
        padding: var(--space-4);
        max-height: 300px;
        overflow-y: auto;
      }
      
      .leaderboard-entry {
        display: flex;
        justify-content: space-between;
        padding: var(--space-3);
        margin-bottom: var(--space-2);
        background: white;
        border-radius: var(--border-radius-lg);
        font-family: var(--font-elementary);
        box-shadow: var(--shadow-sm);
      }
      
      .leaderboard-entry.top-3 {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: white;
        font-weight: var(--font-weight-bold);
      }
      
      .entry-rank {
        font-weight: var(--font-weight-bold);
        margin-right: var(--space-3);
      }
      
      .entry-name {
        flex: 1;
      }
      
      .entry-time {
        font-weight: var(--font-weight-semibold);
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      
      @keyframes scaleIn {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @media (max-width: 640px) {
        .cards-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        
        .flip-card-back {
          font-size: var(--font-size-sm);
        }
      }
    </style>
  `;
}

// Initialize Flip Match Game
export function initElementaryMatch(gameId, vocabulary) {
  const grid = document.getElementById(`${gameId}-grid`);
  const matchesSpan = document.getElementById(`${gameId}-matches`);
  const timerSpan = document.getElementById(`${gameId}-timer`);
  const completeDiv = document.getElementById(`${gameId}-complete`);
  const finalTimeSpan = document.getElementById(`${gameId}-final-time`);
  const finalMatchesSpan = document.getElementById(`${gameId}-final-matches`);
  const nameSection = document.getElementById(`${gameId}-name-section`);
  const playerNameInput = document.getElementById(`${gameId}-player-name`);
  const submitScoreBtn = document.getElementById(`${gameId}-submit-score`);
  const leaderboardList = document.getElementById(`${gameId}-leaderboard-list`);
  const restartBtn = document.getElementById(`${gameId}-restart`);
  
  let flippedCards = [];
  let matchedPairs = 0;
  let totalPairs = Math.floor(vocabulary.length / 2);
  let startTime = Date.now();
  let timerInterval;
  let gameTime = 0;
  
  // Create pairs from vocabulary
  const pairs = vocabulary.slice(0, totalPairs * 2);
  const cards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
  
  // Render cards
  cards.forEach((word, index) => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.dataset.word = word;
    card.dataset.index = index;
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">?</div>
        <div class="flip-card-back">${word}</div>
      </div>
    `;
    card.addEventListener('click', () => handleCardClick(card));
    grid.appendChild(card);
  });
  
  // Start timer
  timerInterval = setInterval(updateTimer, 1000);
  
  function updateTimer() {
    gameTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    timerSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  function handleCardClick(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) {
      return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
    const word1 = card1.dataset.word;
    const word2 = card2.dataset.word;
    
    if (word1 === word2 && card1.dataset.index !== card2.dataset.index) {
      // Match!
      setTimeout(() => {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        matchesSpan.textContent = `${matchedPairs} / ${totalPairs}`;
        flippedCards = [];
        
        if (matchedPairs === totalPairs) {
          gameComplete();
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  function gameComplete() {
    clearInterval(timerInterval);
    grid.style.display = 'none';
    document.querySelector(`#${gameId} .game-header`).style.display = 'none';
    completeDiv.style.display = 'block';
    
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    finalTimeSpan.textContent = timeString;
    finalMatchesSpan.textContent = matchedPairs;
    
    loadLeaderboard();
  }
  
  function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('matchingGameLeaderboard') || '[]');
    displayLeaderboard(leaderboard);
  }
  
  function displayLeaderboard(leaderboard) {
    if (leaderboard.length === 0) {
      leaderboardList.innerHTML = '<p style="text-align: center; color: #999;">No scores yet. Be the first!</p>';
      return;
    }
    
    leaderboardList.innerHTML = leaderboard.map((entry, index) => `
      <div class="leaderboard-entry ${index < 3 ? 'top-3' : ''}">
        <span class="entry-rank">#${index + 1}</span>
        <span class="entry-name">${entry.name}</span>
        <span class="entry-time">${entry.time}</span>
      </div>
    `).join('');
  }
  
  submitScoreBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
      alert('Please enter your name!');
      return;
    }
    
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    let leaderboard = JSON.parse(localStorage.getItem('matchingGameLeaderboard') || '[]');
    leaderboard.push({
      name: playerName,
      time: timeString,
      timeSeconds: gameTime,
      date: new Date().toISOString()
    });
    
    // Sort by time (fastest first)
    leaderboard.sort((a, b) => a.timeSeconds - b.timeSeconds);
    
    // Keep only top 10
    leaderboard = leaderboard.slice(0, 10);
    
    localStorage.setItem('matchingGameLeaderboard', JSON.stringify(leaderboard));
    
    nameSection.style.display = 'none';
    displayLeaderboard(leaderboard);
  });
  
  restartBtn.addEventListener('click', () => {
    location.reload();
  });
}

export { ElementaryMatch };
