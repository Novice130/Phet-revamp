// Navigation Component
export default function Navigation() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return `
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <!-- Original Logo -->
          <a href="${baseUrl}" data-link class="nav-brand">
            <div class="brand-logo">
              <img src="${baseUrl}assets/logo.png" alt="Abraar Learning" class="logo-image">
            </div>
            <div class="brand-text">
              <span class="brand-name">ABRAAR</span>
              <span class="brand-subtitle">Learning</span>
            </div>
          </a>
          
          <!-- Mobile Donate Button (visible only on mobile) -->
          <a href="https://learnnovice.com/citcd-website/donate.html" class="mobile-donate-btn" target="_blank">Donate</a>
          
          <!-- CITCD Logo in corner -->
          <a href="https://learnnovice.com/citcd-website/" class="citcd-logo-link" target="_blank" title="Visit CITCD">
            <img src="${baseUrl}assets/citcd-logo.png" alt="CITCD" class="citcd-logo">
          </a>
          
          <button class="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <!-- CITCD Navigation Links -->
          <div class="nav-links">
            <a href="https://learnnovice.com/citcd-website/abraar-academy.html" class="nav-link" target="_blank">Abraar Academy</a>
            <a href="https://learnnovice.com/citcd-website/cemetery.html" class="nav-link" target="_blank">Cemetery Services</a>
            <a href="https://learnnovice.com/citcd-website/contact.html" class="nav-link" target="_blank">Contact</a>
            <a href="https://learnnovice.com/citcd-website/#testimonials" class="nav-link" target="_blank">Testimonials</a>
            <a href="https://learnnovice.com/citcd-website/donate.html" class="nav-link donate-btn" target="_blank">Donate</a>
          </div>
        </div>
      </div>
    </nav>
    
    <style>
      .navbar {
        background: linear-gradient(135deg, #1a3c5e 0%, #2a5a8a 50%, #1a3c5e 100%);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        position: sticky;
        top: 0;
        z-index: var(--z-sticky);
        border-bottom: 3px solid #d4af37;
      }
      
      .nav-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-3) 0;
        gap: var(--space-4);
      }
      
      .nav-brand {
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: transform var(--transition-base);
        flex-shrink: 0;
        order: 1;
      }
      
      .nav-brand:hover {
        transform: scale(1.05);
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
        border: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      .brand-text {
        display: flex;
        flex-direction: column;
        margin-left: var(--space-2);
      }
      
      .brand-name {
        font-family: 'Poppins', sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 2px;
        text-transform: uppercase;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }
      
      .brand-subtitle {
        font-family: 'Poppins', sans-serif;
        font-size: 0.8rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      
      
      .nav-links {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        flex: 1;
        justify-content: center;
        order: 2;
      }
      
      .nav-link {
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
        text-decoration: none;
        position: relative;
        transition: all var(--transition-fast);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--border-radius-md);
        letter-spacing: 0.3px;
      }
      
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: #d4af37;
        transition: width var(--transition-base);
      }
      
      .nav-link:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
      
      .nav-link:hover::after {
        width: 80%;
      }
      
      /* Donate Button */
      .donate-btn {
        background: linear-gradient(135deg, #d4af37 0%, #f4cf47 50%, #d4af37 100%);
        color: #1a3c5e !important;
        font-weight: 600;
        padding: var(--space-2) var(--space-4) !important;
        border-radius: 25px;
        box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
        transition: all var(--transition-base);
      }
      
      .donate-btn::after {
        display: none;
      }
      
      .donate-btn:hover {
        background: linear-gradient(135deg, #e5c048 0%, #fff5a0 50%, #e5c048 100%);
        color: #1a3c5e !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.5);
      }
      
      /* CITCD Logo */
      .citcd-logo-link {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        transition: transform var(--transition-base);
        margin-left: auto;
        order: 3;
      }
      
      .citcd-logo-link:hover {
        transform: scale(1.08);
      }
      
      .citcd-logo {
        height: 48px;
        width: auto;
        object-fit: contain;
        border-radius: 50%;
        border: 2px solid #d4af37;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .mobile-menu-toggle {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--space-2);
        z-index: 100;
      }
      
      .mobile-menu-toggle span {
        width: 26px;
        height: 3px;
        background: #ffffff;
        border-radius: 2px;
        transition: all var(--transition-base);
      }
      
      /* Mobile Donate Button - hidden on desktop */
      .mobile-donate-btn {
        display: none;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #d4af37 0%, #f4cf47 50%, #d4af37 100%);
        color: #1a3c5e;
        font-weight: 600;
        font-size: 0.85rem;
        padding: 8px 18px;
        border-radius: 20px;
        text-decoration: none;
        box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
        transition: all var(--transition-base);
      }
      
      .mobile-donate-btn:hover {
        background: linear-gradient(135deg, #e5c048 0%, #fff5a0 50%, #e5c048 100%);
        transform: translateY(-1px);
        box-shadow: 0 3px 12px rgba(212, 175, 55, 0.5);
      }
      
      @media (max-width: 900px) {
        .nav-links {
          gap: var(--space-3);
        }
        
        .nav-link {
          font-size: var(--font-size-sm);
          padding: var(--space-1) var(--space-2);
        }
      }
      
      @media (max-width: 768px) {
        .nav-content {
          justify-content: center;
          gap: var(--space-3);
        }
        
        .nav-brand {
          order: 1;
          flex: 0 0 auto;
          margin-right: auto;
        }
        
        .mobile-donate-btn {
          display: block;
          order: 2;
          flex: 0 0 auto;
        }
        
        .citcd-logo-link {
          order: 3;
          flex: 0 0 auto;
        }
        
        .mobile-menu-toggle {
          display: flex;
          order: 4;
          flex: 0 0 auto;
        }
        
        .nav-links {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #1a3c5e 0%, #2a5a8a 100%);
          flex-direction: column;
          padding: var(--space-4);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: all var(--transition-base);
          gap: var(--space-2);
          order: 5;
        }
        
        .nav-links.active {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        
        .nav-link {
          width: 100%;
          text-align: center;
          padding: var(--space-3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .nav-link:last-child {
          border-bottom: none;
        }
        
        /* Hide desktop donate button in mobile dropdown */
        .donate-btn {
          display: none;
        }
        
        .logo-image {
          height: 40px;
        }
        
        .citcd-logo {
          height: 40px;
        }
        
        .brand-text {
          display: none;
        }
      }
      
      @media (max-width: 480px) {
        .logo-image {
          height: 35px;
        }
        
        .citcd-logo {
          height: 35px;
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
