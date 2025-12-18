// Interactive quiz game for middle school simulations
export default function MiddleSchoolQuiz(questions) {
  const gameId = 'quiz-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="quiz-game" id="${gameId}">
      <div class="quiz-header">
        <h3>🎮 Knowledge Quiz</h3>
        <div class="quiz-progress">
          <span id="${gameId}-current">1</span> / <span id="${gameId}-total">${questions.length}</span>
        </div>
      </div>
      
      <div class="quiz-content" id="${gameId}-content">
        <!-- Question will be inserted here -->
      </div>
      
      <div class="quiz-score" id="${gameId}-score" style="display: none;">
        <div class="score-circle">
          <div class="score-number" id="${gameId}-score-number">0</div>
          <div class="score-label">out of ${questions.length}</div>
        </div>
        <h3 id="${gameId}-score-message"></h3>
        <button class="btn btn-middle" id="${gameId}-restart">Try Again</button>
      </div>
    </div>
    
    <style>
      .quiz-game {
        background: linear-gradient(135deg, var(--color-middle-bg), white);
        padding: var(--space-8);
        border-radius: var(--border-radius-xl);
        max-width: 700px;
        margin: 0 auto;
        border: 3px solid var(--color-middle-primary);
      }
      
      .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
        padding-bottom: var(--space-4);
        border-bottom: 2px solid var(--color-middle-primary);
      }
      
      .quiz-header h3 {
        font-family: var(--font-middle);
        color: var(--color-middle-primary);
        margin: 0;
      }
      
      .quiz-progress {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-middle-secondary);
      }
      
      .quiz-question {
        margin-bottom: var(--space-6);
      }
      
      .question-text {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        color: var(--color-gray-800);
        margin-bottom: var(--space-6);
        line-height: var(--line-height-relaxed);
      }
      
      .quiz-options {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
      
      .quiz-option {
        padding: var(--space-4);
        background: white;
        border: 3px solid var(--color-gray-300);
        border-radius: var(--border-radius-lg);
        cursor: pointer;
        transition: all var(--transition-base);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        text-align: left;
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }
      
      .option-letter {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--color-middle-primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--font-weight-bold);
        flex-shrink: 0;
      }
      
      .quiz-option:hover:not(.disabled) {
        border-color: var(--color-middle-primary);
        transform: translateX(8px);
        box-shadow: var(--shadow-lg);
      }
      
      .quiz-option.selected {
        border-color: var(--color-middle-primary);
        background: linear-gradient(to right, var(--color-middle-bg), white);
      }
      
      .quiz-option.correct {
        border-color: var(--color-success);
        background: linear-gradient(to right, rgba(72, 187, 120, 0.1), white);
      }
      
      .quiz-option.correct .option-letter {
        background: var(--color-success);
      }
      
      .quiz-option.incorrect {
        border-color: var(--color-error);
        background: linear-gradient(to right, rgba(245, 101, 101, 0.1), white);
      }
      
      .quiz-option.incorrect .option-letter {
        background: var(--color-error);
      }
      
      .quiz-option.disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .quiz-feedback {
        margin-top: var(--space-4);
        padding: var(--space-4);
        border-radius: var(--border-radius-lg);
        animation: slideInRight 0.3s ease-out;
      }
      
      .quiz-feedback.correct {
        background: rgba(72, 187, 120, 0.1);
        border-left: 4px solid var(--color-success);
      }
      
      .quiz-feedback.incorrect {
        background: rgba(245, 101, 101, 0.1);
        border-left: 4px solid var(--color-error);
      }
      
      .feedback-title {
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
      }
      
      .feedback-title.correct {
        color: var(--color-success);
      }
      
      .feedback-title.incorrect {
        color: var(--color-error);
      }
      
      .quiz-next {
        margin-top: var(--space-6);
        width: 100%;
      }
      
      .quiz-score {
        text-align: center;
        padding: var(--space-8) 0;
      }
      
      .score-circle {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: var(--gradient-middle);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--space-6);
        box-shadow: var(--shadow-2xl);
        animation: scaleIn 0.5s ease-out;
      }
      
      .score-number {
        font-size: var(--font-size-6xl);
        font-weight: var(--font-weight-extrabold);
      }
      
      .score-label {
        font-size: var(--font-size-lg);
        opacity: 0.9;
      }
      
      #quiz-score-message {
        color: var(--color-middle-primary);
        margin-bottom: var(--space-6);
      }
      
      @media (max-width: 480px) {
        .quiz-game {
          padding: var(--space-4);
        }
        
        .question-text {
          font-size: var(--font-size-lg);
        }
        
        .score-circle {
          width: 150px;
          height: 150px;
        }
        
        .score-number {
          font-size: var(--font-size-4xl);
        }
      }
    </style>
  `;
}

// Initialize the quiz game
export function initMiddleSchoolQuiz(gameId, questions) {
  let currentQuestion = 0;
  let score = 0;
  
  const content = document.getElementById(`${gameId}-content`);
  const currentSpan = document.getElementById(`${gameId}-current`);
  const scoreDiv = document.getElementById(`${gameId}-score`);
  const scoreNumber = document.getElementById(`${gameId}-score-number`);
  const scoreMessage = document.getElementById(`${gameId}-score-message`);
  const restartBtn = document.getElementById(`${gameId}-restart`);
  
  function renderQuestion() {
    const q = questions[currentQuestion];
    currentSpan.textContent = currentQuestion + 1;
    
    content.innerHTML = `
      <div class="quiz-question">
        <div class="question-text">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((option, i) => `
            <button class="quiz-option" data-index="${i}">
              <span class="option-letter">${String.fromCharCode(65 + i)}</span>
              <span>${option}</span>
            </button>
          `).join('')}
        </div>
        <div id="${gameId}-feedback"></div>
      </div>
    `;
    
    // Add click handlers
    content.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
    });
  }
  
  function handleAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const options = content.querySelectorAll('.quiz-option');
    const feedback = document.getElementById(`${gameId}-feedback`);
    
    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Mark selected
    options[selectedIndex].classList.add('selected');
    
    const isCorrect = selectedIndex === q.correct;
    
    if (isCorrect) {
      score++;
      options[selectedIndex].classList.add('correct');
      feedback.innerHTML = `
        <div class="quiz-feedback correct">
          <div class="feedback-title correct">✅ Correct!</div>
          <div>${q.explanation}</div>
        </div>
      `;
    } else {
      options[selectedIndex].classList.add('incorrect');
      options[q.correct].classList.add('correct');
      feedback.innerHTML = `
        <div class="quiz-feedback incorrect">
          <div class="feedback-title incorrect">❌ Not quite!</div>
          <div>${q.explanation}</div>
        </div>
      `;
    }
    
    // Add next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-middle quiz-next';
    nextBtn.textContent = currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results';
    nextBtn.addEventListener('click', nextQuestion);
    feedback.appendChild(nextBtn);
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    content.style.display = 'none';
    scoreDiv.style.display = 'block';
    
    scoreNumber.textContent = score;
    
    const percentage = (score / questions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
      message = '🏆 Perfect Score! You\'re a genius!';
    } else if (percentage >= 80) {
      message = '🌟 Excellent work! Keep it up!';
    } else if (percentage >= 60) {
      message = '👍 Good job! You\'re learning!';
    } else {
      message = '💪 Keep practicing! You\'ll get better!';
    }
    
    scoreMessage.textContent = message;
  }
  
  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    content.style.display = 'block';
    scoreDiv.style.display = 'none';
    renderQuestion();
  });
  
  // Start quiz
  renderQuestion();
}

export { MiddleSchoolQuiz };
