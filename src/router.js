// Simple client-side router
class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

    // Handle browser back/forward
    window.addEventListener("popstate", () => this.handleRoute());

    // Handle link clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.href);
      }
    });

    // Initial route
    this.handleRoute();
  }

  navigate(url) {
    history.pushState(null, null, url);
    this.handleRoute();
  }

  handleRoute() {
    const base = this.basePath;
    const pathname = window.location.pathname;
    const path =
      base !== "/" && pathname.startsWith(base)
        ? pathname.slice(base.length) || "/"
        : pathname || "/";

    // Find matching route
    let matchedRoute = null;
    let params = {};

    for (const route of this.routes) {
      const match = this.matchRoute(path, route.path);
      if (match) {
        matchedRoute = route;
        params = match;
        break;
      }
    }

    // Default to 404 if no match
    if (!matchedRoute) {
      matchedRoute =
        this.routes.find((r) => r.path === "/404") || this.routes[0];
    }

    this.currentRoute = matchedRoute;
    matchedRoute.component(params);
  }

  matchRoute(path, routePath) {
    // Simple pattern matching for routes like /simulation/:id
    const routeParts = routePath.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);

    if (routeParts.length !== pathParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        // Dynamic parameter
        const paramName = routeParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        // Static part doesn't match
        return null;
      }
    }

    return params;
  }
}

export default Router;
