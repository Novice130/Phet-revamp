// Concept Snake Game - High School
export default function ConceptSnakeGame(words, simulation) {
  const gameId = 'snake-' + Math.random().toString(36).substr(2, 9);
  
  // Group words by concept (for this demo, we'll use the simulation title as the concept)
  const correctConcept = simulation?.title || 'Science';
  
  return `
    <div class="snake-game" id="${gameId}">
      <div class="snake-header">
        <h3>🐍 Concept Snake Challenge</h3>
        <p>Eat words from "${correctConcept}" to grow! Avoid unrelated words!</p>
        <div class="snake-stats">
          <div class="stat">
            <span class="stat-label">Score</span>
            <span class="stat-value" id="${gameId}-score">0</span>
          </div>
          <div class="stat">
            <span class="stat-label">Length</span>
            <span class="stat-value" id="${gameId}-length">3</span>
          </div>
        </div>
      </div>
      
      <canvas id="${gameId}-canvas" class="snake-canvas" width="600" height="400"></canvas>
      
      <div class="snake-controls">
        <div class="control-hint">Use Arrow Keys or WASD to move</div>
        <div class="control-buttons">
          <button class="control-btn" id="${gameId}-up">↑</button>
          <div class="control-row">
            <button class="control-btn" id="${gameId}-left">←</button>
            <button class="control-btn" id="${gameId}-down">↓</button>
            <button class="control-btn" id="${gameId}-right">→</button>
          </div>
        </div>
      </div>
      
      <div class="snake-message" id="${gameId}-message"></div>
      
      <div class="snake-gameover" id="${gameId}-gameover" style="display: none;">
        <h3>Game Over!</h3>
        <p class="final-score">Final Score: <span id="${gameId}-final-score">0</span></p>
        <p class="final-length">Snake Length: <span id="${gameId}-final-length">3</span></p>
        <button class="btn btn-high" id="${gameId}-restart">Play Again</button>
      </div>
    </div>
    
    <style>
      .snake-game {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        padding: var(--space-6);
        border-radius: var(--border-radius-2xl);
        max-width: 700px;
        margin: 0 auto;
        color: white;
      }
      
      .snake-header {
        text-align: center;
        margin-bottom: var(--space-4);
      }
      
      .snake-header h3 {
        font-size: var(--font-size-2xl);
        margin-bottom: var(--space-2);
        background: linear-gradient(135deg, #10b981, #34d399);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .snake-header p {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: var(--space-4);
      }
      
      .snake-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-8);
      }
      
      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .stat-label {
        font-size: var(--font-size-xs);
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
      }
      
      .stat-value {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: #10b981;
      }
      
      .snake-canvas {
        width: 100%;
        max-width: 600px;
        height: auto;
        border-radius: var(--border-radius-lg);
        background: #1e293b;
        border: 3px solid #10b981;
        display: block;
        margin: 0 auto var(--space-4);
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
      }
      
      .snake-controls {
        text-align: center;
        margin-bottom: var(--space-4);
      }
      
      .control-hint {
        font-size: var(--font-size-sm);
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: var(--space-3);
      }
      
      .control-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
      }
      
      .control-row {
        display: flex;
        gap: var(--space-2);
      }
      
      .control-btn {
        width: 50px;
        height: 50px;
        background: rgba(16, 185, 129, 0.2);
        border: 2px solid #10b981;
        border-radius: var(--border-radius-md);
        color: #10b981;
        font-size: var(--font-size-xl);
        cursor: pointer;
        transition: all var(--transition-fast);
      }
      
      .control-btn:hover {
        background: rgba(16, 185, 129, 0.4);
        transform: scale(1.1);
      }
      
      .control-btn:active {
        transform: scale(0.95);
      }
      
      .snake-message {
        text-align: center;
        min-height: 30px;
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-lg);
      }
      
      .snake-message.good {
        color: #10b981;
      }
      
      .snake-message.bad {
        color: #ef4444;
      }
      
      .snake-gameover {
        text-align: center;
        padding: var(--space-6);
        background: rgba(0, 0, 0, 0.5);
        border-radius: var(--border-radius-xl);
        animation: fadeIn 0.5s ease-out;
      }
      
      .snake-gameover h3 {
        color: #ef4444;
        margin-bottom: var(--space-4);
      }
      
      .final-score, .final-length {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-2);
      }
      
      .final-score span, .final-length span {
        color: #10b981;
        font-weight: var(--font-weight-bold);
      }
      
      @media (max-width: 640px) {
        .snake-canvas {
          width: 100%;
        }
        
        .control-btn {
          width: 45px;
          height: 45px;
        }
      }
    </style>
  `;
}

// Initialize Concept Snake Game
export function initConceptSnakeGame(gameId, words, simulation) {
  const canvas = document.getElementById(`${gameId}-canvas`);
  const ctx = canvas.getContext('2d');
  const scoreSpan = document.getElementById(`${gameId}-score`);
  const lengthSpan = document.getElementById(`${gameId}-length`);
  const message = document.getElementById(`${gameId}-message`);
  const gameoverDiv = document.getElementById(`${gameId}-gameover`);
  const finalScoreSpan = document.getElementById(`${gameId}-final-score`);
  const finalLengthSpan = document.getElementById(`${gameId}-final-length`);
  const restartBtn = document.getElementById(`${gameId}-restart`);
  
  // Game constants
  const gridSize = 20;
  const tileCount = canvas.width / gridSize;
  
  // Game state
  let snake = [{x: 10, y: 10}];
  let dx = 1;
  let dy = 0;
  let food = null;
  let score = 0;
  let gameRunning = true;
  let gameSpeed = 150;
  
  // Food types
  const correctWords = words.slice(0, Math.min(5, words.length));
  const wrongWords = ['RANDOM', 'UNRELATED', 'DIFFERENT', 'WRONG', 'OTHER'];
  
  function spawnFood() {
    const isCorrect = Math.random() > 0.3; // 70% correct words
    const wordList = isCorrect ? correctWords : wrongWords;
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
      word: word,
      isCorrect: isCorrect
    };
  }
  
  function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < tileCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(canvas.width, i * gridSize);
      ctx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
      const gradient = ctx.createLinearGradient(
        segment.x * gridSize, segment.y * gridSize,
        (segment.x + 1) * gridSize, (segment.y + 1) * gridSize
      );
      gradient.addColorStop(0, index === 0 ? '#10b981' : '#059669');
      gradient.addColorStop(1, index === 0 ? '#059669' : '#047857');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
      
      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = 'white';
        ctx.fillRect(segment.x * gridSize + 5, segment.y * gridSize + 5, 4, 4);
        ctx.fillRect(segment.x * gridSize + 11, segment.y * gridSize + 5, 4, 4);
      }
    });
    
    // Draw food - BIGGER and more visible
    if (food) {
      const foodWidth = gridSize * 3;
      const foodHeight = gridSize * 2;
      const foodX = food.x * gridSize;
      const foodY = food.y * gridSize;
      
      // Draw food background
      ctx.fillStyle = food.isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
      ctx.fillRect(foodX - gridSize, foodY - gridSize/2, foodWidth, foodHeight);
      
      // Draw food border
      ctx.strokeStyle = food.isCorrect ? '#10b981' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.strokeRect(foodX - gridSize, foodY - gridSize/2, foodWidth, foodHeight);
      
      // Draw FULL word
      ctx.fillStyle = food.isCorrect ? '#10b981' : '#ef4444';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(food.word, foodX + gridSize/2, foodY + gridSize/2);
      
      // Draw icon
      ctx.font = '20px Arial';
      ctx.fillText(food.isCorrect ? '✓' : '✗', foodX - gridSize/2, foodY + gridSize/2);
    }
  }
  
  function update() {
    if (!gameRunning) return;
    
    // Move snake
    let newX = snake[0].x + dx;
    let newY = snake[0].y + dy;
    
    // WRAP AROUND - No wall collision! (Nokia style)
    if (newX < 0) newX = tileCount - 1;
    if (newX >= tileCount) newX = 0;
    if (newY < 0) newY = tileCount - 1;
    if (newY >= tileCount) newY = 0;
    
    const head = {x: newX, y: newY};
    
    // Check self collision ONLY
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      gameOver();
      return;
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (food && head.x === food.x && head.y === food.y) {
      if (food.isCorrect) {
        // Correct word - grow snake
        score += 10;
        showMessage('✓ Correct concept! +10', 'good');
        scoreSpan.textContent = score;
        lengthSpan.textContent = snake.length;
      } else {
        // Wrong word - shrink snake
        if (snake.length > 3) {
          snake.pop();
          snake.pop();
        }
        score = Math.max(0, score - 5);
        showMessage('✗ Wrong concept! -5', 'bad');
        scoreSpan.textContent = score;
        lengthSpan.textContent = snake.length;
      }
      spawnFood();
    } else {
      snake.pop();
    }
    
    drawGame();
  }
  
  function showMessage(text, type) {
    message.textContent = text;
    message.className = 'snake-message ' + type;
    setTimeout(() => {
      message.textContent = '';
      message.className = 'snake-message';
    }, 1500);
  }
  
  function gameOver() {
    gameRunning = false;
    canvas.style.display = 'none';
    document.querySelector(`#${gameId} .snake-controls`).style.display = 'none';
    gameoverDiv.style.display = 'block';
    finalScoreSpan.textContent = score;
    finalLengthSpan.textContent = snake.length;
  }
  
  function changeDirection(newDx, newDy) {
    // Prevent reversing
    if (dx === -newDx && dy === -newDy) return;
    dx = newDx;
    dy = newDy;
  }
  
  // Controls
  document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        changeDirection(0, -1);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        changeDirection(0, 1);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        changeDirection(-1, 0);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        changeDirection(1, 0);
        break;
    }
  });
  
  // Button controls
  document.getElementById(`${gameId}-up`).addEventListener('click', () => changeDirection(0, -1));
  document.getElementById(`${gameId}-down`).addEventListener('click', () => changeDirection(0, 1));
  document.getElementById(`${gameId}-left`).addEventListener('click', () => changeDirection(-1, 0));
  document.getElementById(`${gameId}-right`).addEventListener('click', () => changeDirection(1, 0));
  
  restartBtn.addEventListener('click', () => {
    location.reload();
  });
  
  // Start game
  spawnFood();
  drawGame();
  setInterval(update, gameSpeed);
}

export { ConceptSnakeGame };
