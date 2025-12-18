// Simulation Overlay Component - Run or Fullscreen options
export default function SimulationOverlay(simulationUrl, simulationId, thumbnailUrl) {
  const overlayId = 'overlay-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="sim-overlay-container" id="${overlayId}" style="background-image: url('${thumbnailUrl}'); background-size: cover; background-position: center;">
      <div class="sim-overlay" id="${overlayId}-overlay">
        <div class="overlay-content">
          <div class="overlay-icon">🎮</div>
          <h3>Ready to Explore?</h3>
          <p>Choose how you'd like to run this simulation</p>
          <div class="overlay-buttons">
            <button class="overlay-btn btn-run" id="${overlayId}-run">
              <span class="btn-icon">▶️</span>
              <span class="btn-text">Run Here</span>
              <span class="btn-desc">Play in current view</span>
            </button>
            <button class="overlay-btn btn-fullscreen" id="${overlayId}-fullscreen">
              <span class="btn-icon">⛶</span>
              <span class="btn-text">Fullscreen</span>
              <span class="btn-desc">Immersive experience</span>
            </button>
          </div>
        </div>
      </div>
      <iframe 
        id="${overlayId}-iframe"
        class="simulation-iframe hidden"
        src=""
        data-src="${simulationUrl}"
        allowfullscreen
        allow="fullscreen"
      ></iframe>
    </div>
    
    <style>
      .sim-overlay-container {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        min-height: 400px;
        border-radius: var(--border-radius-xl);
        overflow: hidden;
        background: #1a1a2e;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      }
      
      .sim-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(2px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: opacity 0.3s ease-out;
      }
      
      .sim-overlay.hidden {
        opacity: 0;
        pointer-events: none;
      }
      
      .overlay-content {
        text-align: center;
        color: white;
        padding: var(--space-8);
        background: rgba(0, 0, 0, 0.5);
        border-radius: var(--border-radius-2xl);
        backdrop-filter: blur(10px);
      }
      
      .overlay-icon {
        font-size: 80px;
        margin-bottom: var(--space-4);
        animation: bounce 2s ease-in-out infinite;
      }
      
      .overlay-content h3 {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
        text-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      
      .overlay-content p {
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-8);
        opacity: 0.9;
      }
      
      .overlay-buttons {
        display: flex;
        gap: var(--space-6);
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .overlay-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-6);
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--border-radius-2xl);
        color: white;
        cursor: pointer;
        transition: all var(--transition-base);
        min-width: 200px;
      }
      
      .overlay-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.6);
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      }
      
      .overlay-btn:active {
        transform: translateY(-2px) scale(1.02);
      }
      
      .btn-icon {
        font-size: var(--font-size-4xl);
      }
      
      .btn-text {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
      }
      
      .btn-desc {
        font-size: var(--font-size-sm);
        opacity: 0.8;
      }
      
      .simulation-iframe {
        width: 100%;
        height: 100%;
        border: none;
        transition: opacity 0.3s ease-in;
      }
      
      .simulation-iframe.hidden {
        opacity: 0;
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      
      @media (max-width: 640px) {
        .overlay-buttons {
          flex-direction: column;
        }
        
        .overlay-btn {
          min-width: 100%;
        }
      }
    </style>
  `;
}

// Initialize Simulation Overlay
export function initSimulationOverlay(overlayId) {
  const overlay = document.getElementById(`${overlayId}-overlay`);
  const iframe = document.getElementById(`${overlayId}-iframe`);
  const runBtn = document.getElementById(`${overlayId}-run`);
  const fullscreenBtn = document.getElementById(`${overlayId}-fullscreen`);
  
  runBtn.addEventListener('click', () => {
    // Load simulation in current view
    iframe.src = iframe.dataset.src;
    overlay.classList.add('hidden');
    iframe.classList.remove('hidden');
  });
  
  fullscreenBtn.addEventListener('click', () => {
    // Load simulation and go fullscreen
    iframe.src = iframe.dataset.src;
    overlay.classList.add('hidden');
    iframe.classList.remove('hidden');
    
    // Request fullscreen
    setTimeout(() => {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }, 500);
  });
}

export { SimulationOverlay };
