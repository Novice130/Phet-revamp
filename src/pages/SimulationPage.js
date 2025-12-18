// Simulation Page Component
import Navigation, { initNavigation } from '../components/Navigation.js';
import WordleGame, { initWordleGame } from '../components/games/WordleGame.js';
import MiddleSchoolQuiz, { initMiddleSchoolQuiz } from '../components/games/MiddleSchoolQuiz.js';
import ElementaryMatch, { initElementaryMatch } from '../components/games/ElementaryMatch.js';
import ConceptSnakeGame, { initConceptSnakeGame } from '../components/games/ConceptSnake.js';
import BalloonPopGame, { initBalloonPopGame } from '../components/games/BalloonPop.js';
import GameSelector from '../components/GameSelector.js';
import SimulationOverlay, { initSimulationOverlay } from '../components/SimulationOverlay.js';
import simulationsData from '../data/simulations.json';

export default function SimulationPage(params) {
  const simulation = simulationsData.simulations.find(s => s.id === params.id);
  
  if (!simulation) {
    window.location.href = '/phet-revamp/404';
    return;
  }
  
  const app = document.getElementById('app');
  const themeClass = `theme-${simulation.gradeLevel}`;
  const gradeLevelText = simulation.gradeLevel === 'elementary' ? 'Elementary School' :
                         simulation.gradeLevel === 'middle' ? 'Middle School' : 'High School';
  
  app.innerHTML = `
    ${Navigation()}
    
    <main class="simulation-page ${themeClass}">
      <!-- Breadcrumb -->
      <section class="breadcrumb-section">
        <div class="container">
          <nav class="breadcrumb">
            <a href="/phet-revamp/" data-link>Home</a>
            <span class="separator">›</span>
            <span class="current">${simulation.title}</span>
          </nav>
        </div>
      </section>
      
      <!-- Simulation Header -->
      <section class="sim-header">
        <div class="container">
          <div class="header-content fade-in">
            <span class="badge badge-${simulation.gradeLevel}">${gradeLevelText}</span>
            <h1 class="sim-title">${simulation.title}</h1>
            <p class="sim-description">${simulation.description}</p>
          </div>
        </div>
      </section>
      
      <!-- PhET Simulation Embed -->
      <section class="simulation-section">
        <div class="container">
          <div class="simulation-container">
            ${SimulationOverlay(simulation.phetUrl, simulation.id, simulation.thumbnail)}
          </div>
          <p class="sim-credit">
            Simulation powered by <a href="https://phet.colorado.edu" target="_blank">PhET Interactive Simulations</a>, 
            University of Colorado Boulder, licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC-BY-4.0</a>
          </p>
        </div>
      </section>
      
      <!-- Learning Objectives -->
      <section class="objectives-section">
        <div class="container">
          <h2 class="section-title">📚 What You'll Learn</h2>
          <ul class="objectives-list">
            ${simulation.objectives.map(obj => `
              <li class="objective-item slide-in-right">${obj}</li>
            `).join('')}
          </ul>
        </div>
      </section>
      
      <!-- Real Life Examples -->
      <section class="examples-section">
        <div class="container">
          <h2 class="section-title">🌍 Real Life Examples</h2>
          <div class="examples-grid">
            ${simulation.realLifeExamples.map((example, i) => `
              <div class="example-card scale-in" style="animation-delay: ${i * 0.1}s">
                <div class="example-icon">${['🔬', '🌟', '⚡'][i] || '💡'}</div>
                <h3 class="example-title">${example.title}</h3>
                <p class="example-description">${example.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- Game Section -->
      <section class="game-section" id="game-section">
        <div class="container">
          <h2 class="section-title">🎮 Test Your Knowledge!</h2>
          <p class="game-intro">Ready to practice what you learned? Choose a game!</p>
          
          <div class="game-selector-buttons">
            ${renderGameButtons(simulation)}
          </div>
          
          <div class="game-container" id="game-container-${simulation.id}">
            ${renderGame(simulation, 'default')}
          </div>
        </div>
      </section>
      
      <!-- Scroll to Game Button -->
      <div class="scroll-to-game">
        <button class="btn btn-${simulation.gradeLevel} btn-lg" id="scroll-to-game">
          Play the Game! 🎮
        </button>
      </div>
    </main>
    
    <style>
      .simulation-page {
        min-height: 100vh;
        padding-bottom: var(--space-16);
      }
      
      /* Theme Variations */
      .theme-elementary {
        --theme-primary: var(--color-elementary-primary);
        --theme-secondary: var(--color-elementary-secondary);
        --theme-bg: var(--color-elementary-bg);
        font-family: var(--font-elementary);
      }
      
      .theme-middle {
        --theme-primary: var(--color-middle-primary);
        --theme-secondary: var(--color-middle-secondary);
        --theme-bg: var(--color-middle-bg);
        font-family: var(--font-middle);
      }
      
      .theme-high {
        --theme-primary: var(--color-high-primary);
        --theme-secondary: var(--color-high-secondary);
        --theme-bg: var(--color-high-bg);
        font-family: var(--font-high);
        background: var(--color-high-bg);
        color: var(--color-high-text);
      }
      
      /* Breadcrumb */
      .breadcrumb-section {
        background: white;
        padding: var(--space-4) 0;
        border-bottom: 1px solid var(--color-gray-200);
      }
      
      .theme-high .breadcrumb-section {
        background: var(--color-high-card);
        border-bottom-color: rgba(255, 255, 255, 0.1);
      }
      
      .breadcrumb {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--font-size-sm);
      }
      
      .breadcrumb a {
        color: var(--theme-primary);
        transition: opacity var(--transition-fast);
      }
      
      .breadcrumb a:hover {
        opacity: 0.7;
      }
      
      .separator {
        color: var(--color-gray-400);
      }
      
      .current {
        color: var(--color-gray-600);
      }
      
      .theme-high .current {
        color: var(--color-gray-400);
      }
      
      /* Header */
      .sim-header {
        background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary));
        color: white;
        padding: var(--space-6) 0;
        text-align: center;
      }
      
      .header-content {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .sim-title {
        font-size: var(--font-size-4xl);
        margin: var(--space-2) 0;
        text-shadow: 0 2px 10px rgba(0,0,0,0.2);
      }
      
      .sim-description {
        font-size: var(--font-size-xl);
        opacity: 0.95;
        line-height: var(--line-height-relaxed);
      }
      
      /* Simulation Section */
      .simulation-section {
        background: #f8fafc;
        padding: var(--space-8) 0;
        position: relative;
        z-index: 1;
      }
      
      .simulation-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 var(--space-4);
      }
      
      /* Simulation Embed */
      .sim-embed-section {
        padding: var(--space-12) 0 var(--space-8);
      }
      
      .sim-embed-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        background: var(--color-gray-900);
        border-radius: var(--border-radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-2xl);
      }
      
      .sim-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
      
      .sim-credit {
        text-align: center;
        font-size: var(--font-size-sm);
        color: var(--color-gray-600);
        margin-top: var(--space-4);
      }
      
      .theme-high .sim-credit {
        color: var(--color-gray-400);
      }
      
      .sim-credit a {
        color: var(--theme-primary);
      }
      
      /* Section Styles */
      .objectives-section,
      .examples-section,
      .game-section {
        padding: var(--space-12) 0;
      }
      
      .section-title {
        text-align: center;
        font-size: var(--font-size-4xl);
        color: var(--theme-primary);
        margin-bottom: var(--space-8);
      }
      
      /* Objectives */
      .objectives-list {
        max-width: 700px;
        margin: 0 auto;
        list-style: none;
      }
      
      .objective-item {
        background: white;
        padding: var(--space-4) var(--space-6);
        margin-bottom: var(--space-3);
        border-radius: var(--border-radius-lg);
        border-left: 4px solid var(--theme-primary);
        box-shadow: var(--shadow-md);
        font-size: var(--font-size-lg);
        transition: transform var(--transition-base);
      }
      
      .theme-high .objective-item {
        background: var(--color-high-card);
      }
      
      .objective-item:hover {
        transform: translateX(8px);
      }
      
      /* Examples */
      .examples-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--space-6);
      }
      
      .example-card {
        background: white;
        padding: var(--space-6);
        border-radius: var(--border-radius-xl);
        box-shadow: var(--shadow-lg);
        text-align: center;
        transition: transform var(--transition-base);
      }
      
      .theme-high .example-card {
        background: var(--color-high-card);
      }
      
      .example-card:hover {
        transform: translateY(-8px);
      }
      
      .example-icon {
        font-size: var(--font-size-6xl);
        margin-bottom: var(--space-4);
      }
      
      .example-title {
        font-size: var(--font-size-xl);
        color: var(--theme-primary);
        margin-bottom: var(--space-3);
      }
      
      .example-description {
        color: var(--color-gray-700);
        line-height: var(--line-height-relaxed);
      }
      
      .theme-high .example-description {
        color: var(--color-gray-300);
      }
      
      /* Game Section */
      .game-section {
        background: var(--theme-bg);
        padding: var(--space-16) 0;
      }
      
      .game-intro {
        text-align: center;
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-8);
        color: var(--color-gray-700);
      }
      
      .theme-high .game-intro {
        color: var(--color-gray-300);
      }
      
      /* Game Selector Buttons */
      .game-selector-buttons {
        display: flex;
        justify-content: center;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
        flex-wrap: wrap;
      }
      
      .game-select-btn {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-3) var(--space-6);
        background: white;
        border: 3px solid var(--color-gray-300);
        border-radius: var(--border-radius-xl);
        cursor: pointer;
        transition: all var(--transition-base);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
      }
      
      .theme-high .game-select-btn {
        background: var(--color-high-card);
        color: var(--color-high-text);
      }
      
      .game-select-btn:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--theme-primary);
      }
      
      .game-select-btn.active {
        background: var(--theme-primary);
        color: white;
        border-color: var(--theme-primary);
      }
      
      .btn-icon {
        font-size: var(--font-size-2xl);
      }
      
      .btn-name {
        font-family: var(--font-middle);
      }
      
      .game-container {
        max-width: 900px;
        margin: 0 auto;
      }
      
      /* Scroll to Game Button */
      .scroll-to-game {
        position: fixed;
        bottom: var(--space-8);
        right: var(--space-8);
        z-index: var(--z-fixed);
        animation: bounce 2s ease-in-out infinite;
      }
      
      .scroll-to-game button {
        box-shadow: var(--shadow-2xl);
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .sim-title {
          font-size: var(--font-size-3xl);
        }
        
        .section-title {
          font-size: var(--font-size-2xl);
        }
        
        .examples-grid {
          grid-template-columns: 1fr;
        }
        
        .scroll-to-game {
          bottom: var(--space-4);
          right: var(--space-4);
        }
      }
    </style>
  `;
  
  // Initialize navigation
  initNavigation();
  
  // Initialize simulation overlay
  const overlayContainer = document.querySelector('.sim-overlay-container');
  if (overlayContainer) {
    const overlayId = overlayContainer.id;
    initSimulationOverlay(overlayId);
  }
  
  // Initialize the game after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeGame(simulation);
    setupGameSelector(simulation);
  }, 100);
  
  // Scroll to game button
  const scrollBtn = document.getElementById('scroll-to-game');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      document.getElementById('game-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

function renderGameButtons(simulation) {
  const buttons = {
    elementary: [
      { type: 'matching', icon: '🎨', name: 'Matching' },
      { type: 'balloon', icon: '🎈', name: 'Balloon Pop' }
    ],
    middle: [
      { type: 'quiz', icon: '🎮', name: 'Quiz' }
    ],
    high: [
      { type: 'wordle', icon: '🎯', name: 'Wordle' },
      { type: 'snake', icon: '🐍', name: 'Snake' }
    ]
  };
  
  const gameButtons = buttons[simulation.gradeLevel] || buttons.high;
  
  return gameButtons.map((btn, index) => `
    <button class="game-select-btn ${index === 0 ? 'active' : ''}" data-game-type="${btn.type}" data-sim-id="${simulation.id}">
      <span class="btn-icon">${btn.icon}</span>
      <span class="btn-name">${btn.name}</span>
    </button>
  `).join('');
}

function renderGame(simulation, gameType = 'default') {
  // Use default game type if not specified
  if (gameType === 'default') {
    gameType = simulation.gameType;
  }
  
  switch (gameType) {
    case 'wordle':
      return WordleGame(simulation.wordleWords, simulation);
    case 'quiz':
      return MiddleSchoolQuiz(simulation.gameQuestions);
    case 'matching':
      return ElementaryMatch(simulation.gameVocabulary);
    case 'snake':
      return ConceptSnakeGame(simulation.wordleWords || simulation.gameVocabulary, simulation);
    case 'balloon':
      return BalloonPopGame(simulation.gameVocabulary);
    default:
      return '<p>Game coming soon!</p>';
  }
}

function initializeGame(simulation, gameType = null) {
  // Use default game type if not specified
  if (!gameType) {
    gameType = simulation.gameType;
  }
  
  // Find the game container
  const gameContainer = document.querySelector(`#game-container-${simulation.id} > div`);
  if (!gameContainer) return;
  
  const gameId = gameContainer.id;
  
  switch (gameType) {
    case 'wordle':
      initWordleGame(gameId, simulation.wordleWords);
      break;
    case 'quiz':
      initMiddleSchoolQuiz(gameId, simulation.gameQuestions);
      break;
    case 'matching':
      initElementaryMatch(gameId, simulation.gameVocabulary);
      break;
    case 'snake':
      initConceptSnakeGame(gameId, simulation.wordleWords || simulation.gameVocabulary, simulation);
      break;
    case 'balloon':
      initBalloonPopGame(gameId, simulation.gameVocabulary);
      break;
  }
}

// Handle game selector button clicks
function setupGameSelector(simulation) {
  const buttons = document.querySelectorAll('.game-select-btn');
  const gameContainer = document.getElementById(`game-container-${simulation.id}`);
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Get selected game type
      const gameType = btn.dataset.gameType;
      
      // Re-render game
      gameContainer.innerHTML = renderGame(simulation, gameType);
      
      // Re-initialize game
      setTimeout(() => {
        initializeGame(simulation, gameType);
      }, 100);
    });
  });
}

