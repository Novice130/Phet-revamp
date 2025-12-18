// Home Page Component
import Navigation, { initNavigation } from '../components/Navigation.js';
import SimulationCard from '../components/SimulationCard.js';
import simulationsData from '../data/simulations.json';

export default function HomePage() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${Navigation()}
    
    <main class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content fade-in">
            <h1 class="hero-title">Explore Science Through Play</h1>
            <p class="hero-subtitle">Interactive PhET simulations with fun educational games for every grade level</p>
            <div class="hero-stats">
              <div class="stat">
                <div class="stat-number">${simulationsData.simulations.length}</div>
                <div class="stat-label">Simulations</div>
              </div>
              <div class="stat">
                <div class="stat-number">3</div>
                <div class="stat-label">Grade Levels</div>
              </div>
              <div class="stat">
                <div class="stat-number">∞</div>
                <div class="stat-label">Fun Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Main Content with Sidebar -->
      <section class="main-content">
        <div class="container">
          <div class="content-layout">
            <!-- Sidebar Filters - PhET Style -->
            <aside class="filter-sidebar">
              <!-- Subject Filter -->
              <div class="filter-section">
                <button class="filter-header" data-toggle="subject-options">
                  <span>SUBJECT</span>
                  <span class="toggle-icon">+</span>
                </button>
                <div class="filter-options" id="subject-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="subject" value="physics">
                    <span class="checkbox-custom"></span>
                    <span>Physics</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="physics-sub" value="motion">
                    <span class="checkbox-custom"></span>
                    <span>Motion</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="physics-sub" value="sound-waves">
                    <span class="checkbox-custom"></span>
                    <span>Sound & Waves</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="physics-sub" value="work-energy">
                    <span class="checkbox-custom"></span>
                    <span>Work, Energy & Power</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="physics-sub" value="heat-thermo">
                    <span class="checkbox-custom"></span>
                    <span>Heat & Thermo</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="physics-sub" value="quantum">
                    <span class="checkbox-custom"></span>
                    <span>Quantum Phenomena</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="physics-sub" value="light-radiation">
                    <span class="checkbox-custom"></span>
                    <span>Light & Radiation</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="physics-sub" value="electricity">
                    <span class="checkbox-custom"></span>
                    <span>Electricity, Magnets & Circuits</span>
                  </label>
                  
                  <label class="filter-checkbox">
                    <input type="checkbox" name="subject" value="math">
                    <span class="checkbox-custom"></span>
                    <span>Math & Statistics</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="math-sub" value="math-concepts">
                    <span class="checkbox-custom"></span>
                    <span>Math Concepts</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="math-sub" value="math-applications">
                    <span class="checkbox-custom"></span>
                    <span>Math Applications</span>
                  </label>
                  
                  <label class="filter-checkbox">
                    <input type="checkbox" name="subject" value="chemistry">
                    <span class="checkbox-custom"></span>
                    <span>Chemistry</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="chem-sub" value="general-chemistry">
                    <span class="checkbox-custom"></span>
                    <span>General Chemistry</span>
                  </label>
                  <label class="filter-checkbox sub-option">
                    <input type="checkbox" name="chem-sub" value="quantum-chemistry">
                    <span class="checkbox-custom"></span>
                    <span>Quantum Chemistry</span>
                  </label>
                  
                  <label class="filter-checkbox">
                    <input type="checkbox" name="subject" value="earth">
                    <span class="checkbox-custom"></span>
                    <span>Earth & Space</span>
                  </label>
                  
                  <label class="filter-checkbox">
                    <input type="checkbox" name="subject" value="biology">
                    <span class="checkbox-custom"></span>
                    <span>Biology</span>
                  </label>
                </div>
              </div>
              
              <!-- Grade Level Filter -->
              <div class="filter-section">
                <button class="filter-header" data-toggle="grade-options">
                  <span>GRADE LEVEL</span>
                  <span class="toggle-icon">+</span>
                </button>
                <div class="filter-options" id="grade-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="grade" value="elementary">
                    <span class="checkbox-custom"></span>
                    <span>Elementary School</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="grade" value="middle">
                    <span class="checkbox-custom"></span>
                    <span>Middle School</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="grade" value="high">
                    <span class="checkbox-custom"></span>
                    <span>High School</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="grade" value="university">
                    <span class="checkbox-custom"></span>
                    <span>University</span>
                  </label>
                </div>
              </div>
              
              <!-- Compatibility Filter (Collapsed) -->
              <div class="filter-section collapsed">
                <button class="filter-header" data-toggle="compat-options">
                  <span>COMPATIBILITY</span>
                  <span class="toggle-icon">+</span>
                </button>
                <div class="filter-options" id="compat-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="compat" value="html5">
                    <span class="checkbox-custom"></span>
                    <span>HTML5</span>
                  </label>
                </div>
              </div>
              
              <!-- Release Type Filter (Collapsed) -->
              <div class="filter-section collapsed">
                <button class="filter-header" data-toggle="release-options">
                  <span>RELEASE TYPE</span>
                  <span class="toggle-icon">+</span>
                </button>
                <div class="filter-options" id="release-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="release" value="production">
                    <span class="checkbox-custom"></span>
                    <span>Production</span>
                  </label>
                </div>
              </div>
              
              <!-- Inclusive Features Filter (Collapsed) -->
              <div class="filter-section collapsed">
                <button class="filter-header" data-toggle="inclusive-options">
                  <span>INCLUSIVE FEATURES</span>
                  <span class="toggle-icon">+</span>
                </button>
                <div class="filter-options" id="inclusive-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="inclusive" value="accessibility">
                    <span class="checkbox-custom"></span>
                    <span>Accessibility Features</span>
                  </label>
                </div>
              </div>
              
              <!-- Locale Filter (Collapsed) -->
              <div class="filter-section collapsed">
                <button class="filter-header" data-toggle="locale-options">
                  <span>LOCALE</span>
                  <span class="toggle-icon">+</span>
                </button>
                <div class="filter-options" id="locale-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="locale" value="en">
                    <span class="checkbox-custom"></span>
                    <span>English</span>
                  </label>
                </div>
              </div>
              
              <!-- Clear Filters -->
              <button class="clear-filters-btn" id="clear-filters">
                Clear Filters
              </button>
            </aside>
            
            <!-- Simulations Grid -->
            <div class="simulations-area">
              <!-- Search and Count Header -->
              <div class="grid-header">
                <div class="search-wrapper">
                  <input 
                    type="text" 
                    id="search-input" 
                    placeholder="Filter by keyword..." 
                    class="search-input"
                  >
                </div>
                <div class="result-count">
                  <span id="count-num">${simulationsData.simulations.length}</span> Simulations
                </div>
              </div>
              
              <div id="simulations-grid" class="simulations-grid">
                <!-- Cards will be inserted here -->
              </div>
              <div id="no-results" class="no-results" style="display: none;">
                <div class="no-results-icon">🔍</div>
                <h3>No simulations found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <style>
      .home-page {
        min-height: 100vh;
      }
      
      /* Hero Section */
      .hero {
        background: var(--gradient-hero);
        color: white;
        padding: var(--space-20) 0 var(--space-16);
        position: relative;
        overflow: hidden;
      }
      
      .hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><circle cx="100" cy="100" r="50" fill="rgba(255,255,255,0.1)"/><circle cx="900" cy="400" r="80" fill="rgba(255,255,255,0.05)"/><circle cx="1100" cy="150" r="60" fill="rgba(255,255,255,0.08)"/></svg>');
        background-size: cover;
        opacity: 0.5;
      }
      
      .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
      }
      
      .hero-title {
        font-size: var(--font-size-6xl);
        font-weight: var(--font-weight-extrabold);
        margin-bottom: var(--space-4);
        text-shadow: 0 2px 10px rgba(0,0,0,0.2);
      }
      
      .hero-subtitle {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-8);
        opacity: 0.95;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-12);
        margin-top: var(--space-8);
      }
      
      .stat {
        text-align: center;
      }
      
      .stat-number {
        font-size: var(--font-size-5xl);
        font-weight: var(--font-weight-extrabold);
        margin-bottom: var(--space-2);
      }
      
      .stat-label {
        font-size: var(--font-size-sm);
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      /* Main Content Layout */
      .main-content {
        background: #f8fafc;
        min-height: 80vh;
      }
      
      .content-layout {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: var(--space-6);
        padding: var(--space-6) 0;
      }
      
      /* Sidebar */
      .filter-sidebar {
        background: white;
        border-radius: var(--border-radius-xl);
        padding: var(--space-4);
        height: fit-content;
        position: sticky;
        top: 90px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      }
      
      .sidebar-search {
        margin-bottom: var(--space-4);
      }
      
      .sidebar-search .search-input {
        width: 100%;
        padding: var(--space-3);
        font-size: var(--font-size-sm);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--border-radius-lg);
        background: #f8fafc;
      }
      
      .sidebar-search .search-input:focus {
        outline: none;
        border-color: #6366f1;
        background: white;
      }
      
      /* Filter Sections */
      .filter-section {
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: var(--space-2);
        margin-bottom: var(--space-2);
      }
      
      .filter-section:last-of-type {
        border-bottom: none;
      }
      
      .filter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: none;
        border: none;
        padding: var(--space-2) 0;
        cursor: pointer;
        font-size: 11px;
        font-weight: 600;
        color: #374151;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      
      .filter-header:hover {
        color: #6b7280;
      }
      
      .toggle-icon {
        font-size: 16px;
        color: #9ca3af;
        font-weight: normal;
      }
      
      .filter-options {
        padding-top: var(--space-1);
        max-height: 500px;
        overflow-y: auto;
        transition: max-height 0.3s ease;
      }
      
      .filter-section.collapsed .filter-options {
        max-height: 0;
        overflow: hidden;
        padding: 0;
      }
      
      /* Custom Checkboxes - PhET Style */
      .filter-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0;
        cursor: pointer;
        font-size: 13px;
        color: #4b5563;
        transition: color 0.15s ease;
      }
      
      .filter-checkbox:hover {
        color: #1f2937;
      }
      
      .filter-checkbox.sub-option {
        padding-left: 20px;
        font-size: 12px;
        color: #6b7280;
      }
      
      .filter-checkbox input {
        display: none;
      }
      
      .checkbox-custom {
        width: 14px;
        height: 14px;
        border: 1px solid #9ca3af;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
        flex-shrink: 0;
        background: white;
      }
      
      .filter-checkbox:hover .checkbox-custom {
        border-color: #6b7280;
      }
      
      .filter-checkbox input:checked + .checkbox-custom {
        background: white;
        border-color: #4b5563;
      }
      
      .filter-checkbox input:checked + .checkbox-custom::after {
        content: '✓';
        color: #4b5563;
        font-size: 10px;
        font-weight: bold;
      }
      
      /* Clear Filters Button - PhET Style */
      .clear-filters-btn {
        width: 100%;
        padding: 8px 16px;
        margin-top: var(--space-4);
        font-size: 13px;
        font-weight: 500;
        color: #6366f1;
        background: white;
        border: 1px solid #6366f1;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      
      .clear-filters-btn:hover {
        background: #f5f3ff;
      }
      
      /* Grid Header */
      .grid-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-4);
        gap: var(--space-4);
      }
      
      .search-wrapper {
        flex: 1;
        max-width: 300px;
      }
      
      .search-wrapper .search-input {
        width: 100%;
        padding: 10px 16px;
        font-size: 14px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: white;
      }
      
      .search-wrapper .search-input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
      }
      
      /* Result Count */
      .result-count {
        font-size: 14px;
        color: #6b7280;
        font-weight: 500;
      }
      
      .result-count span {
        font-weight: 700;
        color: #374151;
      }
      
      /* Simulations Area */
      .simulations-area {
        min-height: 400px;
      }
      
      .simulations-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-4);
      }
      
      .no-results {
        text-align: center;
        padding: var(--space-16) var(--space-4);
        background: white;
        border-radius: var(--border-radius-xl);
      }
      
      .no-results-icon {
        font-size: var(--font-size-6xl);
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }
      
      .no-results h3 {
        color: var(--color-gray-700);
        margin-bottom: var(--space-2);
      }
      
      .no-results p {
        color: var(--color-gray-500);
      }
      
      /* Responsive */
      @media (max-width: 1100px) {
        .simulations-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 900px) {
        .content-layout {
          grid-template-columns: 1fr;
        }
        
        .filter-sidebar {
          position: static;
          margin-bottom: var(--space-4);
        }
        
        .simulations-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 768px) {
        .hero-title {
          font-size: var(--font-size-4xl);
        }
        
        .hero-subtitle {
          font-size: var(--font-size-lg);
        }
        
        .hero-stats {
          gap: var(--space-6);
        }
        
        .stat-number {
          font-size: var(--font-size-3xl);
        }
        
        .simulations-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
        }
      }
      
      @media (max-width: 500px) {
        .simulations-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
  
  // Initialize navigation
  initNavigation();
  
  // Render simulations
  renderSimulations();
  
  // Set up filters
  setupFilters();
}

// Keyword mapping for subcategory filtering
const SUBJECT_KEYWORDS = {
  // Physics Sub-categories
  'motion': ['motion', 'force', 'velocity', 'acceleration', 'friction', 'collide', 'collision', 'gravity', 'projectile', 'vector', 'balance', 'orbit', 'planet'],
  'sound-waves': ['wave', 'sound', 'light', 'interference', 'optic', 'radio', 'bending', 'fourier', 'color'],
  'work-energy': ['energy', 'work', 'power', 'kinetic', 'potential', 'conservation', 'skate', 'ramp', 'spring', 'hooke', 'thermal'],
  'heat-thermo': ['heat', 'thermal', 'temp', 'gas', 'states', 'matter', 'diffusion', 'molecule'],
  'quantum': ['quantum', 'atom', 'rutherford', 'bohr', 'stern', 'tunneling', 'spectrum', 'model'],
  'light-radiation': ['light', 'radiation', 'color', 'vision', 'optic', 'laser', 'bending', 'lens', 'mirror'],
  'electricity': ['circuit', 'voltage', 'current', 'magnet', 'charge', 'field', 'faraday', 'ohm', 'capacitor', 'wire', 'battery'],
  
  // Math Sub-categories
  'math-concepts': ['fraction', 'area', 'perimeter', 'quad', 'line', 'plot', 'graph', 'ratio', 'proportion', 'mean', 'median'],
  'math-applications': ['projectile', 'vector', 'calculus', 'probability', 'plinko'],
  
  // Chemistry Sub-categories
  'general-chemistry': ['molecule', 'atom', 'reaction', 'ph', 'acid', 'base', 'solution', 'concentration', 'molarity'],
  'quantum-chemistry': ['quantum', 'isotope', 'rutherford', 'bohr', 'spectrum']
};

// Map subtopics to their parent subjects for stricter filtering
const SUBTOPIC_PARENTS = {
  'motion': 'physics',
  'sound-waves': 'physics',
  'work-energy': 'physics',
  'heat-thermo': 'physics',
  'quantum': 'physics',
  'light-radiation': 'physics',
  'electricity': 'physics',
  'math-concepts': 'math',
  'math-applications': 'math',
  'general-chemistry': 'chemistry',
  'quantum-chemistry': 'chemistry'
};

let currentFilters = {
  search: '',
  grades: [],
  subjects: [],
  subtopics: []
};

function renderSimulations() {
  const grid = document.getElementById('simulations-grid');
  const noResults = document.getElementById('no-results');
  const countNum = document.getElementById('count-num');
  
  // Filter simulations
  const filtered = simulationsData.simulations.filter(sim => {
    // 1. Search text
    const matchesSearch = sim.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
                         sim.description.toLowerCase().includes(currentFilters.search.toLowerCase());
    
    // 2. Grade (Exact match or empty)
    const matchesGrade = currentFilters.grades.length === 0 || currentFilters.grades.includes(sim.gradeLevel);
    
    // 3. Subject/Subtopic Logic
    // If no subjects/subtopics selected -> Match All
    if (currentFilters.subjects.length === 0 && currentFilters.subtopics.length === 0) {
      return matchesSearch && matchesGrade;
    }
    
    let matchesSubject = false;
    
    // Check if Sim matches a selected Main Subject (e.g. Physics)
    if (currentFilters.subjects.includes(sim.subject)) {
      matchesSubject = true;
    }
    
    // If not matched by main subject, check selected Subtopics
    // This allows selecting "Motion" without selecting "Physics" (implied)
    // Or selecting "Physics" AND "Motion" (redundant but safe)
    if (!matchesSubject && currentFilters.subtopics.length > 0) {
      for (const topic of currentFilters.subtopics) {
        // Enforce parent subject match (e.g. 'motion' only matches physics sims)
        const parentSubject = SUBTOPIC_PARENTS[topic];
        if (parentSubject && sim.subject !== parentSubject) continue;
        
        // Check keywords
        const keywords = SUBJECT_KEYWORDS[topic] || [];
        const textToCheck = (sim.title + ' ' + sim.description).toLowerCase();
        
        if (keywords.some(k => textToCheck.includes(k))) {
          matchesSubject = true;
          break;
        }
      }
    }
    
    return matchesSearch && matchesGrade && matchesSubject;
  });
  
  // Update count
  if (countNum) countNum.textContent = filtered.length;
  
  if (filtered.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    grid.innerHTML = filtered.map(sim => SimulationCard(sim)).join('');
  }
}

function setupFilters() {
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.search = e.target.value;
      renderSimulations();
    });
  }
  
  // Collapsible sections
  const filterHeaders = document.querySelectorAll('.filter-header');
  filterHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.filter-section');
      section.classList.toggle('collapsed');
      const icon = header.querySelector('.toggle-icon');
      icon.textContent = section.classList.contains('collapsed') ? '+' : '−';
    });
  });
  
  // Subject and Sub-subject checkboxes
  const subjectCheckboxes = document.querySelectorAll('input[name="subject"], input[name$="-sub"]');
  subjectCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateSubjectFilters();
      renderSimulations();
    });
  });
  
  // Grade checkboxes
  const gradeCheckboxes = document.querySelectorAll('input[name="grade"]');
  gradeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateGradeFilters();
      renderSimulations();
    });
  });
  
  // Clear filters button
  const clearBtn = document.getElementById('clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      // Uncheck all checkboxes
      document.querySelectorAll('.filter-checkbox input').forEach(cb => cb.checked = false);
      currentFilters.grades = [];
      currentFilters.subjects = [];
      currentFilters.subtopics = [];
      currentFilters.search = '';
      if (searchInput) searchInput.value = '';
      renderSimulations();
    });
  }
}

function updateSubjectFilters() {
  currentFilters.subjects = [];
  currentFilters.subtopics = [];
  
  // Collect main subjects
  document.querySelectorAll('input[name="subject"]:checked').forEach(cb => {
    currentFilters.subjects.push(cb.value);
  });
  
  // Collect subtopics
  document.querySelectorAll('input[name$="-sub"]:checked').forEach(cb => {
    currentFilters.subtopics.push(cb.value);
  });
}

function updateGradeFilters() {
  currentFilters.grades = [];
  document.querySelectorAll('input[name="grade"]:checked').forEach(cb => {
    currentFilters.grades.push(cb.value);
  });
}

