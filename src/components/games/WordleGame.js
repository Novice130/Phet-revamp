// Enhanced Wordle-style vocabulary game for high school simulations
export default function WordleGame(words, simulation) {
  const gameId = 'wordle-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="wordle-game-enhanced" id="${gameId}">
      <div class="wordle-header">
        <div class="wordle-title">
          <h3>🎯 Scientific Vocabulary Challenge</h3>
          <p class="wordle-subtitle">Learn key terms from ${simulation?.title || 'this simulation'}!</p>
        </div>
        <div class="wordle-stats">
          <div class="stat-item">
            <span class="stat-label">Attempts</span>
            <span class="stat-value" id="${gameId}-attempts">0/6</span>
          </div>
        </div>
      </div>
      
      <div class="word-hint-section">
        <div class="current-word-info">
          <span class="hint-label">💡 Hint:</span>
          <span class="hint-text" id="${gameId}-hint">Start guessing to reveal hints!</span>
        </div>
      </div>
      
      <div class="wordle-board" id="${gameId}-board"></div>
      
      <div class="wordle-keyboard" id="${gameId}-keyboard"></div>
      
      <div class="wordle-message" id="${gameId}-message"></div>
      
      <div class="word-learning-section" id="${gameId}-learning" style="display: none;">
        <h4>📚 What You Learned</h4>
        <div class="word-definition" id="${gameId}-definition"></div>
        <button class="btn btn-high" id="${gameId}-next">Try Another Word →</button>
      </div>
    </div>
    
    <style>
      .wordle-game-enhanced {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        color: white;
        padding: var(--space-8);
        border-radius: var(--border-radius-2xl);
        max-width: 600px;
        margin: 0 auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
      }
      
      .wordle-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-6);
        padding-bottom: var(--space-4);
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      }
      
      .wordle-title h3 {
        font-family: var(--font-high);
        font-size: var(--font-size-2xl);
        margin-bottom: var(--space-2);
        background: linear-gradient(135deg, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .wordle-subtitle {
        font-size: var(--font-size-sm);
        color: rgba(255, 255, 255, 0.7);
      }
      
      .wordle-stats {
        background: rgba(255, 255, 255, 0.1);
        padding: var(--space-3);
        border-radius: var(--border-radius-lg);
        backdrop-filter: blur(10px);
      }
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-1);
      }
      
      .stat-label {
        font-size: var(--font-size-xs);
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .stat-value {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: #60a5fa;
      }
      
      .word-hint-section {
        background: linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(167, 139, 250, 0.2));
        padding: var(--space-4);
        border-radius: var(--border-radius-lg);
        margin-bottom: var(--space-6);
        border: 1px solid rgba(96, 165, 250, 0.3);
      }
      
      .current-word-info {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }
      
      .hint-label {
        font-weight: var(--font-weight-bold);
        color: #fbbf24;
      }
      
      .hint-text {
        font-size: var(--font-size-base);
        color: rgba(255, 255, 255, 0.9);
      }
      
      .wordle-board {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin-bottom: var(--space-6);
      }
      
      .wordle-row {
        display: flex;
        gap: var(--space-2);
        justify-content: center;
      }
      
      .wordle-cell {
        width: 56px;
        height: 56px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        font-family: var(--font-high);
        transition: all var(--transition-base);
        background: rgba(255, 255, 255, 0.05);
      }
      
      .wordle-cell.filled {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.1);
        animation: pop 0.15s ease-in-out;
      }
      
      .wordle-cell.correct {
        background: linear-gradient(135deg, #10b981, #059669);
        border-color: #10b981;
        color: white;
        animation: flip 0.5s ease-in-out;
      }
      
      .wordle-cell.present {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        border-color: #f59e0b;
        color: white;
        animation: flip 0.5s ease-in-out;
      }
      
      .wordle-cell.absent {
        background: rgba(71, 85, 105, 0.5);
        border-color: rgba(71, 85, 105, 0.5);
        color: rgba(255, 255, 255, 0.4);
        animation: flip 0.5s ease-in-out;
      }
      
      .wordle-keyboard {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }
      
      .keyboard-row {
        display: flex;
        gap: var(--space-1);
        justify-content: center;
      }
      
      .key {
        min-width: 36px;
        height: 52px;
        padding: 0 var(--space-2);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius-md);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        cursor: pointer;
        transition: all var(--transition-fast);
        backdrop-filter: blur(10px);
      }
      
      .key:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
      }
      
      .key:active:not(:disabled) {
        transform: translateY(0);
      }
      
      .key-special {
        min-width: 70px;
        font-size: var(--font-size-xs);
      }
      
      .key.correct {
        background: linear-gradient(135deg, #10b981, #059669);
        border-color: #10b981;
      }
      
      .key.present {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        border-color: #f59e0b;
      }
      
      .key.absent {
        background: rgba(71, 85, 105, 0.3);
        border-color: rgba(71, 85, 105, 0.3);
        color: rgba(255, 255, 255, 0.3);
      }
      
      .wordle-message {
        text-align: center;
        font-weight: var(--font-weight-semibold);
        min-height: 32px;
        margin-top: var(--space-4);
        font-size: var(--font-size-lg);
        padding: var(--space-2);
        border-radius: var(--border-radius-md);
      }
      
      .wordle-message.success {
        background: rgba(16, 185, 129, 0.2);
        color: #6ee7b7;
        border: 1px solid rgba(16, 185, 129, 0.3);
      }
      
      .wordle-message.error {
        background: rgba(239, 68, 68, 0.2);
        color: #fca5a5;
        border: 1px solid rgba(239, 68, 68, 0.3);
      }
      
      .word-learning-section {
        margin-top: var(--space-6);
        padding: var(--space-6);
        background: linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(167, 139, 250, 0.15));
        border-radius: var(--border-radius-xl);
        border: 1px solid rgba(96, 165, 250, 0.3);
        animation: fadeIn 0.5s ease-out;
      }
      
      .word-learning-section h4 {
        color: #60a5fa;
        margin-bottom: var(--space-4);
        font-size: var(--font-size-xl);
      }
      
      .word-definition {
        background: rgba(0, 0, 0, 0.2);
        padding: var(--space-4);
        border-radius: var(--border-radius-lg);
        margin-bottom: var(--space-4);
        line-height: var(--line-height-relaxed);
      }
      
      @keyframes pop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      @keyframes flip {
        0% { transform: rotateX(0); }
        50% { transform: rotateX(90deg); }
        100% { transform: rotateX(0); }
      }
      
      @media (max-width: 480px) {
        .wordle-cell {
          width: 44px;
          height: 44px;
          font-size: var(--font-size-xl);
        }
        
        .key {
          min-width: 30px;
          height: 46px;
        }
        
        .key-special {
          min-width: 60px;
        }
      }
    </style>
  `;
}

// Word definitions for learning
const wordDefinitions = {
  'REACTANT': 'A substance that participates in and undergoes change during a chemical reaction.',
  'PRODUCT': 'A substance formed as a result of a chemical reaction.',
  'BALANCE': 'The state where the number of atoms of each element is equal on both sides of a chemical equation.',
  'COEFFICIENT': 'A number placed before a chemical formula to balance an equation.',
  'MOLECULE': 'A group of atoms bonded together, representing the smallest unit of a chemical compound.',
  'CONSERVATION': 'The principle that matter cannot be created or destroyed in a chemical reaction.',
  'STOICHIOMETRY': 'The calculation of reactants and products in chemical reactions.',
  'TRAJECTORY': 'The path followed by a projectile flying through space.',
  'PARABOLA': 'The curved path of a projectile, shaped like a U or an arch.',
  'VELOCITY': 'The speed of something in a given direction.',
  'GRAVITY': 'The force that attracts objects toward the center of the Earth.',
  'KINEMATIC': 'Relating to motion without considering the forces that cause it.',
  'HORIZONTAL': 'Parallel to the ground or horizon; side-to-side motion.',
  'VERTICAL': 'Perpendicular to the ground; up-and-down motion.'
};

// Word hints
const wordHints = {
  'REACTANT': 'What you start with in a chemical reaction',
  'PRODUCT': 'What you end up with after a reaction',
  'BALANCE': 'Making both sides of an equation equal',
  'COEFFICIENT': 'The number in front of a chemical formula',
  'MOLECULE': 'The smallest unit of a compound',
  'CONSERVATION': 'Matter can\'t be created or destroyed',
  'STOICHIOMETRY': 'Math for chemical reactions',
  'TRAJECTORY': 'The path of a flying object',
  'PARABOLA': 'The curved arc shape of projectile motion',
  'VELOCITY': 'Speed with direction',
  'GRAVITY': 'What pulls objects down to Earth',
  'KINEMATIC': 'Describing motion mathematically',
  'HORIZONTAL': 'Side to side movement',
  'VERTICAL': 'Up and down movement'
};

// Initialize the game
export function initWordleGame(gameId, words) {
  const targetWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  const maxAttempts = 6;
  let currentRow = 0;
  let currentGuess = '';
  let gameOver = false;
  
  const board = document.getElementById(`${gameId}-board`);
  const keyboard = document.getElementById(`${gameId}-keyboard`);
  const message = document.getElementById(`${gameId}-message`);
  const attemptsSpan = document.getElementById(`${gameId}-attempts`);
  const hintText = document.getElementById(`${gameId}-hint`);
  const learningSection = document.getElementById(`${gameId}-learning`);
  const definition = document.getElementById(`${gameId}-definition`);
  const nextBtn = document.getElementById(`${gameId}-next`);
  
  // Show hint
  hintText.textContent = wordHints[targetWord] || 'A scientific term from this simulation';
  
  // Create board
  for (let i = 0; i < maxAttempts; i++) {
    const row = document.createElement('div');
    row.className = 'wordle-row';
    row.dataset.row = i;
    
    for (let j = 0; j < targetWord.length; j++) {
      const cell = document.createElement('div');
      cell.className = 'wordle-cell';
      row.appendChild(cell);
    }
    
    board.appendChild(row);
  }
  
  // Create keyboard
  const keyboardLayout = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
  keyboardLayout.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    
    row.split('').forEach(letter => {
      const key = document.createElement('button');
      key.className = 'key';
      key.dataset.key = letter;
      key.textContent = letter;
      key.addEventListener('click', () => handleKey(letter));
      rowDiv.appendChild(key);
    });
    
    keyboard.appendChild(rowDiv);
  });
  
  // Special keys
  const specialRow = document.createElement('div');
  specialRow.className = 'keyboard-row';
  
  const backspace = document.createElement('button');
  backspace.className = 'key key-special';
  backspace.textContent = '⌫ Delete';
  backspace.addEventListener('click', () => handleKey('BACKSPACE'));
  
  const enter = document.createElement('button');
  enter.className = 'key key-special';
  enter.textContent = 'Enter ✓';
  enter.addEventListener('click', () => handleKey('ENTER'));
  
  specialRow.appendChild(backspace);
  specialRow.appendChild(enter);
  keyboard.appendChild(specialRow);
  
  // Physical keyboard
  document.addEventListener('keydown', handlePhysicalKey);
  
  function handlePhysicalKey(e) {
    if (gameOver) return;
    
    if (e.key === 'Enter') {
      handleKey('ENTER');
    } else if (e.key === 'Backspace') {
      handleKey('BACKSPACE');
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < targetWord.length) {
      handleKey(e.key.toUpperCase());
    }
  }
  
  function handleKey(key) {
    if (gameOver) return;
    
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      removeLetter();
    } else if (currentGuess.length < targetWord.length) {
      addLetter(key);
    }
  }
  
  function addLetter(letter) {
    currentGuess += letter;
    updateBoard();
  }
  
  function removeLetter() {
    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
  }
  
  function updateBoard() {
    const row = board.querySelector(`[data-row="${currentRow}"]`);
    const cells = row.querySelectorAll('.wordle-cell');
    
    cells.forEach((cell, i) => {
      if (i < currentGuess.length) {
        cell.textContent = currentGuess[i];
        cell.classList.add('filled');
      } else {
        cell.textContent = '';
        cell.classList.remove('filled');
      }
    });
    
    attemptsSpan.textContent = `${currentRow}/${maxAttempts}`;
  }
  
  function submitGuess() {
    if (currentGuess.length !== targetWord.length) {
      showMessage(`Word must be ${targetWord.length} letters!`, 'error');
      return;
    }
    
    const row = board.querySelector(`[data-row="${currentRow}"]`);
    const cells = row.querySelectorAll('.wordle-cell');
    const letterCount = {};
    
    for (let letter of targetWord) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }
    
    const result = Array(targetWord.length).fill('absent');
    
    // First pass: correct positions
    for (let i = 0; i < targetWord.length; i++) {
      if (currentGuess[i] === targetWord[i]) {
        result[i] = 'correct';
        letterCount[currentGuess[i]]--;
      }
    }
    
    // Second pass: present letters
    for (let i = 0; i < targetWord.length; i++) {
      if (result[i] === 'absent' && letterCount[currentGuess[i]] > 0) {
        result[i] = 'present';
        letterCount[currentGuess[i]]--;
      }
    }
    
    // Apply colors
    cells.forEach((cell, i) => {
      setTimeout(() => {
        cell.classList.add(result[i]);
        updateKeyboard(currentGuess[i], result[i]);
      }, i * 100);
    });
    
    // Check win/loss
    setTimeout(() => {
      attemptsSpan.textContent = `${currentRow + 1}/${maxAttempts}`;
      
      if (currentGuess === targetWord) {
        showMessage('🎉 Excellent! You got it!', 'success');
        gameOver = true;
        showLearning();
      } else if (currentRow === maxAttempts - 1) {
        showMessage(`The word was: ${targetWord}`, 'error');
        gameOver = true;
        showLearning();
      } else {
        currentRow++;
        currentGuess = '';
      }
    }, targetWord.length * 100 + 200);
  }
  
  function updateKeyboard(letter, status) {
    const key = keyboard.querySelector(`[data-key="${letter}"]`);
    if (!key) return;
    
    const currentStatus = key.classList.contains('correct') ? 'correct' :
                         key.classList.contains('present') ? 'present' : 'absent';
    
    if (status === 'correct' || (status === 'present' && currentStatus !== 'correct')) {
      key.classList.remove('absent', 'present', 'correct');
      key.classList.add(status);
    } else if (status === 'absent' && currentStatus === 'absent') {
      key.classList.add('absent');
    }
  }
  
  function showMessage(text, type) {
    message.textContent = text;
    message.className = 'wordle-message ' + type;
    setTimeout(() => {
      if (type === 'error') message.textContent = '';
    }, 2000);
  }
  
  function showLearning() {
    learningSection.style.display = 'block';
    definition.innerHTML = `
      <strong style="color: #60a5fa; font-size: 1.2em;">${targetWord}</strong><br><br>
      ${wordDefinitions[targetWord] || 'A key scientific term from this simulation.'}
    `;
  }
  
  nextBtn.addEventListener('click', () => {
    location.reload();
  });
  
  // Cleanup function
  return () => {
    document.removeEventListener('keydown', handlePhysicalKey);
  };
}

export { WordleGame };
