// Navigation Component
export default function Navigation() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return `
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <a href="${baseUrl}" data-link class="nav-brand">
            <div class="brand-logo">
              <img src="${baseUrl}assets/logo.png" alt="LearnNovice" class="logo-image">
            </div>
            <div class="brand-divider"></div>
            <div class="brand-text">
              <span class="brand-name">LearnNovice - PhET Revamp</span>
              <span class="brand-subtitle">Interactive Simulations</span>
            </div>
          </a>
          
          <button class="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div class="nav-links">
            <a href="${baseUrl}" data-link class="nav-link">Home</a>
            <a href="https://learnnovice.com" class="nav-link" target="_blank">LearnNovice</a>
            <a href="https://phet.colorado.edu" class="nav-link" target="_blank">PhET Official</a>
          </div>
        </div>
      </div>
    </nav>
    
    <style>
      .navbar {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98));
        backdrop-filter: blur(10px);
        box-shadow: var(--shadow-md);
        position: sticky;
        top: 0;
        z-index: var(--z-sticky);
        border-bottom: 2px solid var(--color-gray-100);
      }
      
      .nav-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-4) 0;
      }
      
      .nav-brand {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        text-decoration: none;
        transition: transform var(--transition-base);
      }
      
      .nav-brand:hover {
        transform: scale(1.02);
      }
      
      .brand-logo {
        display: flex;
        align-items: center;
      }
      
      .logo-image {
        height: 50px;
        width: auto;
        object-fit: contain;
        border-radius: var(--border-radius-md);
      }
      
      .brand-divider {
        width: 2px;
        height: 40px;
        background: linear-gradient(to bottom, transparent, var(--color-gray-300), transparent);
      }
      
      .brand-text {
        display: flex;
        flex-direction: column;
      }
      
      .brand-name {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-bold);
        color: var(--color-gray-800);
      }
      
      .brand-subtitle {
        font-size: var(--font-size-xs);
        color: var(--color-gray-600);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .nav-links {
        display: flex;
        align-items: center;
        gap: var(--space-6);
      }
      
      .nav-link {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        color: var(--color-gray-700);
        text-decoration: none;
        position: relative;
        transition: color var(--transition-fast);
      }
      
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--gradient-hero);
        transition: width var(--transition-base);
      }
      
      .nav-link:hover {
        color: var(--color-primary);
      }
      
      .nav-link:hover::after {
        width: 100%;
      }
      
      .mobile-menu-toggle {
        display: none;
        flex-direction: column;
        gap: 4px;
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--space-2);
      }
      
      .mobile-menu-toggle span {
        width: 24px;
        height: 3px;
        background: var(--color-gray-700);
        border-radius: 2px;
        transition: all var(--transition-base);
      }
      
      @media (max-width: 768px) {
        .mobile-menu-toggle {
          display: flex;
        }
        
        .nav-links {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          flex-direction: column;
          padding: var(--space-4);
          box-shadow: var(--shadow-lg);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: all var(--transition-base);
        }
        
        .nav-links.active {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        
        .brand-name {
          font-size: var(--font-size-sm);
        }
        
        .brand-subtitle {
          display: none;
        }
        
        .logo-image {
          height: 35px;
        }
        
        .brand-divider {
          height: 30px;
        }
      }
    </style>
  `;
}

// Initialize mobile menu toggle
export function initNavigation() {
  setTimeout(() => {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        toggle.classList.toggle("active");
      });

      // Close menu when clicking a link
      navLinks.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          toggle.classList.remove("active");
        });
      });
    }
  }, 0);
}
