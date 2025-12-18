// Main application entry point
import Router from './router.js';
import HomePage from './pages/HomePage.js';
import SimulationPage from './pages/SimulationPage.js';

// Initialize router with routes
const router = new Router([
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/simulation/:id',
    component: SimulationPage
  },
  {
    path: '/404',
    component: () => {
      const app = document.getElementById('app');
      app.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 2rem;">
          <h1 style="font-size: 6rem; margin: 0; background: var(--gradient-hero); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">404</h1>
          <h2 style="margin: 1rem 0;">Page Not Found</h2>
          <p style="color: var(--color-gray-600); margin-bottom: 2rem;">The simulation you're looking for doesn't exist.</p>
          <a href="/phet-revamp/" data-link class="btn btn-primary">Back to Home</a>
        </div>
      `;
    }
  }
]);

// Export router for use in other modules
export { router };
