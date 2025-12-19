// Simulation Card Component
export default function SimulationCard(simulation) {
  const gradeLevelClass = `badge-${simulation.gradeLevel}`;
  const cardClass = `card-${simulation.gradeLevel}`;
  const gradeLevelText = simulation.gradeLevel === 'elementary' ? 'Elementary' :
                         simulation.gradeLevel === 'middle' ? 'Middle School' : 'High School';
  
  const subjectIcon = {
    physics: '⚡',
    chemistry: '🧪',
    biology: '🧬',
    math: '📐',
    'earth-science': '🌍'
  }[simulation.subject] || '🔬';
  
  return `
    <a href="/phet-revamp/simulation/${simulation.id}" data-link class="simulation-card ${cardClass}">
      <div class="card-image">
        <img src="${simulation.thumbnail}" alt="${simulation.title}" loading="lazy">
        <div class="card-overlay">
          <span class="play-icon">▶</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-header">
          <span class="subject-icon">${subjectIcon}</span>
        </div>
        <h3 class="card-title">${simulation.title}</h3>
        <p class="card-description">${simulation.description}</p>
        <div class="card-footer">
          <span class="card-link">Explore Simulation →</span>
        </div>
      </div>
    </a>
    
    <style>
      .simulation-card {
        display: block;
        text-decoration: none;
        color: inherit;
        height: 100%;
        overflow: hidden;
      }
      
      .card-image {
        position: relative;
        width: 100%;
        height: 180px;
        overflow: hidden;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
      }
      
      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
      }
      
      .simulation-card:hover .card-image img {
        transform: scale(1.1);
      }
      
      .card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity var(--transition-base);
      }
      
      .simulation-card:hover .card-overlay {
        opacity: 1;
      }
      
      .play-icon {
        font-size: var(--font-size-4xl);
        color: white;
        transform: scale(0.8);
        transition: transform var(--transition-base);
      }
      
      .simulation-card:hover .play-icon {
        transform: scale(1);
      }
      
      .card-body {
        padding: var(--space-3);
      }
      
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-3);
      }
      
      .subject-icon {
        font-size: var(--font-size-lg);
      }
      
      .card-title {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-1);
        line-height: var(--line-height-tight);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .card-description {
        font-size: var(--font-size-xs);
        color: var(--color-gray-600);
        line-height: var(--line-height-normal);
        margin-bottom: var(--space-2);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .card-high .card-description {
        color: var(--color-gray-400);
      }
      
      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .card-link {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        color: var(--color-primary);
        transition: transform var(--transition-fast);
        display: inline-block;
      }
      
      .simulation-card:hover .card-link {
        transform: translateX(4px);
      }
    </style>
  `;
}
