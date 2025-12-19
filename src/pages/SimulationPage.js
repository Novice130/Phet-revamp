// Simulation Page Component
import Navigation, { initNavigation } from "../components/Navigation.js";
import KnowledgeQuiz, {
  initKnowledgeQuiz,
} from "../components/games/KnowledgeQuiz.js";
import SimulationOverlay, {
  initSimulationOverlay,
} from "../components/SimulationOverlay.js";
import simulationsData from "../data/simulations.json";
import { enrichSimulation } from "../utils/simulationContent.js";

export default function SimulationPage(params) {
  const rawSimulation = simulationsData.simulations.find(
    (s) => s.id === params.id
  );
  const simulation = rawSimulation ? enrichSimulation(rawSimulation) : null;

  const placeholderImageUrl = `${
    import.meta.env.BASE_URL
  }assets/real-life/placeholder.svg`;

  if (!simulation) {
    window.location.href = "/phet-revamp/404";
    return;
  }

  const app = document.getElementById("app");
  const themeClass = `theme-${simulation.gradeLevel}`;
  const gradeLevelText =
    simulation.gradeLevel === "elementary"
      ? "Elementary School"
      : simulation.gradeLevel === "middle"
      ? "Middle School"
      : "High School";

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
            <span class="badge badge-${
              simulation.gradeLevel
            }">${gradeLevelText}</span>
            <h1 class="sim-title">${simulation.title}</h1>
            <p class="sim-description">${simulation.description}</p>
          </div>
        </div>
      </section>
      
      <!-- PhET Simulation Embed -->
      <section class="simulation-section">
        <div class="container">
          <div class="simulation-container">
            ${SimulationOverlay(
              simulation.phetUrl,
              simulation.id,
              simulation.thumbnail,
              simulation.simType
            )}
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
            ${(simulation.whatYoullLearn || simulation.objectives || [])
              .map(
                (obj) => `
              <li class="objective-item slide-in-right">${obj}</li>
            `
              )
              .join("")}
          </ul>
        </div>
        </div>
      </section>

      <!-- Key Formulas Section -->
      ${
        simulation.formulas && simulation.formulas.length > 0
          ? `
      <section class="formulas-section">
        <div class="container">
          <h2 class="section-title">📐 Key Formulas</h2>
          <div class="formulas-grid">
            ${simulation.formulas
              .map(
                (formula) => `
              <div class="formula-card slide-in-right">
                <span class="formula-text">${formula}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
      `
          : ""
      }
      
      <!-- Real Life Examples -->
      <section class="examples-section">
        <div class="container">
          <h2 class="section-title">🌍 Real Life Examples</h2>
          <div class="examples-grid">
            ${(simulation.realLifeExamples || [])
              .slice(0, 2)
              .map(
                (example, i) => `
              <div class="example-card scale-in" style="animation-delay: ${
                i * 0.1
              }s">
                <div class="example-image-container">
                  <img src="${example.imageUrl || placeholderImageUrl}" alt="${
                  example.title
                }" class="example-image" loading="lazy"
                  >
                  <div class="example-overlay">
                    <p class="example-overlay-text">${
                      example.overlayText || example.description || ""
                    }</p>
                    ${
                      example.imageAttributionUrl
                        ? `
                      <a class="example-attribution" href="${
                        example.imageAttributionUrl
                      }" target="_blank" rel="noopener noreferrer">${
                            example.imageAttributionText || "Image source"
                          }</a>
                    `
                        : ""
                    }
                  </div>
                </div>
                <div class="example-content">
                  <h3 class="example-title">${example.title}</h3>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>

      ${
        simulation.learningResources && simulation.learningResources.length > 0
          ? `
      <section class="resources-section">
        <div class="container">
          <h2 class="section-title">🔗 More Learning Resources</h2>
          <ul class="resources-list">
            ${simulation.learningResources
              .map(
                (resource) => `
              <li class="resource-item slide-in-right">
                <a href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.label}</a>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      </section>
      `
          : ""
      }
      
      <!-- Game Section -->
      <section class="game-section" id="game-section">
        <div class="container">
          <h2 class="section-title">🎮 Test Your Knowledge!</h2>
          <p class="game-intro">Answer a few questions to check your understanding.</p>
          
          <div class="game-container" id="game-container-${simulation.id}">
            ${renderGame(simulation)}
          </div>
        </div>
      </section>
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
      .resources-section,
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
      
      .game-container {
        max-width: 900px;
        margin: 0 auto;
      }

      /* Resources */
      .resources-list {
        max-width: 900px;
        margin: 0 auto;
        list-style: none;
        padding: 0;
        display: grid;
        gap: var(--space-3);
      }

      .resource-item {
        background: white;
        border: 2px solid var(--color-gray-200);
        border-radius: var(--border-radius-xl);
        padding: var(--space-4);
      }

      .theme-high .resource-item {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .resource-item a {
        color: var(--theme-primary);
        font-weight: var(--font-weight-semibold);
      }

      .theme-high .resource-item a {
        color: rgba(255, 255, 255, 0.9);
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
        
      }
        .formulas-section {
          background: white;
          padding: var(--space-8) 0;
        }
        
        .formulas-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          justify-content: center;
        }
        
        .formula-card {
          background: var(--theme-bg);
          padding: var(--space-4) var(--space-8);
          border-radius: var(--border-radius-lg);
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: var(--font-size-xl);
          border: 2px solid var(--theme-primary);
          box-shadow: var(--shadow-sm);
        }

        .example-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          margin-bottom: var(--space-4);
        }
        
        .example-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }
        
        .example-card:hover .example-image {
          transform: scale(1.1);
        }
        
        .example-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.05));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity var(--transition-base);
          padding: var(--space-4);
          flex-direction: column;
          gap: var(--space-3);
        }
        
        .example-card:hover .example-overlay {
          opacity: 1;
        }
        
        .example-overlay-text {
          color: white;
          text-align: center;
          font-size: var(--font-size-lg);
          font-weight: 600;
          line-height: var(--line-height-relaxed);
        }

        .example-attribution {
          color: rgba(255, 255, 255, 0.9);
          font-size: var(--font-size-xs);
          text-decoration: underline;
        }
    </style>
  `;

  // Initialize navigation
  initNavigation();

  // Initialize simulation overlay
  const overlayContainer = document.querySelector(".sim-overlay-container");
  if (overlayContainer) {
    const overlayId = overlayContainer.id;
    initSimulationOverlay(overlayId);
  }

  // Initialize the game after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeGame(simulation);
  }, 100);
}

function renderGame(simulation) {
  return KnowledgeQuiz(simulation);
}

function initializeGame(simulation, gameType = null) {
  // Find the game container
  const gameContainer = document.querySelector(
    `#game-container-${simulation.id} > div`
  );
  if (!gameContainer) return;

  const gameId = gameContainer.id;
  initKnowledgeQuiz(
    gameId,
    simulation.gameQuestions,
    simulation.gradeLevel,
    simulation.id
  );
}
