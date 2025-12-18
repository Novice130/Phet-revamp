// Game Selector Component - Allows choosing between different game types
export default function GameSelector(simulation) {
  const gameId = 'selector-' + Math.random().toString(36).substr(2, 9);
  
  // Define available games based on grade level
  const games = {
    elementary: [
      { id: 'matching', name: '🎨 Word Matching', description: 'Match pairs of words' },
      { id: 'balloon', name: '🎈 Balloon Pop', description: 'Pop balloons with correct words' }
    ],
    middle: [
      { id: 'quiz', name: '🎮 Knowledge Quiz', description: 'Answer questions about concepts' },
      { id: 'quiz', name: '⚡ Energy Challenge', description: 'Interactive concept quiz' }
    ],
    high: [
      { id: 'wordle', name: '🎯 Vocabulary Wordle', description: 'Guess scientific terms' },
      { id: 'snake', name: '🐍 Concept Snake', description: 'Eat words from the same concept' }
    ]
  };
  
  const availableGames = games[simulation.gradeLevel] || games.high;
  
  return `
    <div class="game-selector" id="${gameId}">
      <div class="selector-header">
        <h3>Choose Your Game!</h3>
        <p>Pick a fun way to test your knowledge</p>
      </div>
      
      <div class="game-options">
        ${availableGames.map((game, index) => `
          <button class="game-option" data-game="${game.id}" data-index="${index}">
            <div class="game-icon">${game.name.split(' ')[0]}</div>
            <div class="game-info">
              <div class="game-name">${game.name.substring(2)}</div>
              <div class="game-desc">${game.description}</div>
            </div>
          </button>
        `).join('')}
      </div>
      
      <div class="game-content" id="${gameId}-content" style="display: none;">
        <!-- Selected game will load here -->
      </div>
    </div>
    
    <style>
      .game-selector {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .selector-header {
        text-align: center;
        margin-bottom: var(--space-6);
      }
      
      .selector-header h3 {
        font-size: var(--font-size-3xl);
        margin-bottom: var(--space-2);
        background: var(--gradient-hero);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .selector-header p {
        color: var(--color-gray-600);
        font-size: var(--font-size-lg);
      }
      
      .game-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-4);
        margin-bottom: var(--space-6);
      }
      
      .game-option {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-5);
        background: white;
        border: 3px solid var(--color-gray-200);
        border-radius: var(--border-radius-xl);
        cursor: pointer;
        transition: all var(--transition-base);
        text-align: left;
      }
      
      .game-option:hover {
        border-color: var(--color-primary);
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
      }
      
      .game-icon {
        font-size: var(--font-size-5xl);
        flex-shrink: 0;
      }
      
      .game-info {
        flex: 1;
      }
      
      .game-name {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--color-gray-900);
        margin-bottom: var(--space-1);
      }
      
      .game-desc {
        font-size: var(--font-size-sm);
        color: var(--color-gray-600);
      }
      
      @media (max-width: 640px) {
        .game-options {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}

export { GameSelector };
