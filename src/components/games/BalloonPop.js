// Balloon Pop Quiz - Elementary School
export default function BalloonPopGame(vocabulary) {
  const gameId = 'balloon-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="balloon-game" id="${gameId}">
      <div class="balloon-header">
        <h3>🎈 Balloon Pop Quiz!</h3>
        <p>Pop the balloons with the right words!</p>
        <div class="balloon-score">
          Score: <span id="${gameId}-score">0</span>
        </div>
      </div>
      
      <div class="balloon-container" id="${gameId}-container">
        <!-- Balloons will be added here -->
      </div>
      
      <div class="balloon-question" id="${gameId}-question">
        Click the balloon with: <span class="target-word" id="${gameId}-target">FORCE</span>
      </div>
      
      <div class="balloon-complete" id="${gameId}-complete" style="display: none;">
        <div class="celebration-big">🎉🎈🎊</div>
        <h3>Amazing Job!</h3>
        <p>You popped all the balloons!</p>
        <p class="final-score">Final Score: <span id="${gameId}-final">0</span></p>
        <button class="btn btn-elementary" id="${gameId}-restart">Play Again</button>
      </div>
    </div>
    
    <style>
      .balloon-game {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        padding: var(--space-8);
        border-radius: var(--border-radius-2xl);
        min-height: 500px;
        position: relative;
        overflow: hidden;
      }
      
      .balloon-header {
        text-align: center;
        color: white;
        margin-bottom: var(--space-4);
        position: relative;
        z-index: 10;
      }
      
      .balloon-header h3 {
        font-family: var(--font-elementary);
        font-size: var(--font-size-3xl);
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        margin-bottom: var(--space-2);
      }
      
      .balloon-header p {
        font-family: var(--font-elementary);
        font-size: var(--font-size-lg);
      }
      
      .balloon-score {
        font-family: var(--font-elementary);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        background: rgba(255, 255, 255, 0.3);
        padding: var(--space-2) var(--space-4);
        border-radius: var(--border-radius-full);
        display: inline-block;
        margin-top: var(--space-2);
      }
      
      .balloon-container {
        position: relative;
        height: 350px;
        margin-bottom: var(--space-4);
      }
      
      .balloon {
        position: absolute;
        width: 80px;
        height: 100px;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-elementary);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-sm);
        color: white;
        cursor: pointer;
        animation: float 3s ease-in-out infinite;
        box-shadow: inset -10px -10px 20px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.3);
        transition: transform var(--transition-fast);
      }
      
      .balloon::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 50%;
        width: 2px;
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
      }
      
      .balloon:hover {
        transform: scale(1.1);
      }
      
      .balloon.pop {
        animation: pop 0.3s ease-out forwards;
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0) rotate(-2deg);
        }
        50% {
          transform: translateY(-20px) rotate(2deg);
        }
      }
      
      @keyframes pop {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(0);
          opacity: 0;
        }
      }
      
      .balloon-question {
        text-align: center;
        font-family: var(--font-elementary);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: white;
        background: rgba(0, 0, 0, 0.2);
        padding: var(--space-4);
        border-radius: var(--border-radius-xl);
        position: relative;
        z-index: 10;
      }
      
      .target-word {
        color: #fbbf24;
        font-size: var(--font-size-2xl);
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      
      .balloon-complete {
        text-align: center;
        background: white;
        padding: var(--space-8);
        border-radius: var(--border-radius-xl);
        animation: scaleIn 0.5s ease-out;
      }
      
      .celebration-big {
        font-size: 80px;
        margin-bottom: var(--space-4);
        animation: bounce 1s ease-in-out infinite;
      }
      
      .balloon-complete h3 {
        font-family: var(--font-elementary);
        color: var(--color-elementary-primary);
        margin-bottom: var(--space-2);
      }
      
      .balloon-complete p {
        font-family: var(--font-elementary);
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-2);
      }
      
      .final-score {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-elementary-secondary);
      }
    </style>
  `;
}

// Initialize Balloon Pop Game
export function initBalloonPopGame(gameId, vocabulary) {
  const container = document.getElementById(`${gameId}-container`);
  const scoreSpan = document.getElementById(`${gameId}-score`);
  const targetSpan = document.getElementById(`${gameId}-target`);
  const questionDiv = document.getElementById(`${gameId}-question`);
  const completeDiv = document.getElementById(`${gameId}-complete`);
  const finalSpan = document.getElementById(`${gameId}-final`);
  const restartBtn = document.getElementById(`${gameId}-restart`);
  
  let score = 0;
  let currentTarget = null;
  let wordsLeft = [...vocabulary];
  
  const colors = ['#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b'];
  
  function spawnBalloons() {
    container.innerHTML = '';
    
    if (wordsLeft.length === 0) {
      showComplete();
      return;
    }
    
    // Pick target word
    currentTarget = wordsLeft[Math.floor(Math.random() * wordsLeft.length)];
    targetSpan.textContent = currentTarget;
    
    // Create 5-6 balloons
    const balloonCount = Math.min(6, wordsLeft.length + 2);
    const words = [currentTarget];
    
    // Add decoy words
    const otherWords = vocabulary.filter(w => w !== currentTarget);
    while (words.length < balloonCount && otherWords.length > 0) {
      const randomWord = otherWords.splice(Math.floor(Math.random() * otherWords.length), 1)[0];
      words.push(randomWord);
    }
    
    // Shuffle
    words.sort(() => Math.random() - 0.5);
    
    // Create balloons
    words.forEach((word, index) => {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.textContent = word;
      balloon.style.background = colors[index % colors.length];
      balloon.style.left = `${10 + (index * 15)}%`;
      balloon.style.top = `${Math.random() * 60}%`;
      balloon.style.animationDelay = `${index * 0.2}s`;
      
      balloon.addEventListener('click', () => handleBalloonClick(word, balloon));
      
      container.appendChild(balloon);
    });
  }
  
  function handleBalloonClick(word, balloon) {
    if (word === currentTarget) {
      // Correct!
      score += 10;
      scoreSpan.textContent = score;
      balloon.classList.add('pop');
      
      // Remove from words left
      wordsLeft = wordsLeft.filter(w => w !== word);
      
      setTimeout(() => {
        spawnBalloons();
      }, 500);
    } else {
      // Wrong balloon
      balloon.style.animation = 'shake 0.5s';
      setTimeout(() => {
        balloon.style.animation = 'float 3s ease-in-out infinite';
      }, 500);
    }
  }
  
  function showComplete() {
    container.style.display = 'none';
    questionDiv.style.display = 'none';
    completeDiv.style.display = 'block';
    finalSpan.textContent = score;
  }
  
  restartBtn.addEventListener('click', () => {
    location.reload();
  });
  
  // Start game
  spawnBalloons();
}

export { BalloonPopGame };
