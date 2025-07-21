// Critical CSS optimization utilities

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for above-the-fold content */
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
  }

  #root {
    min-height: 100vh;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 18px;
    color: #666;
  }

  /* Critical header styles */
  .header {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }

  .header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .header p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  /* Critical button styles */
  .button {
    display: inline-block;
    padding: 12px 24px;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 500;
    transition: background-color 0.3s ease;
    cursor: pointer;
    border: none;
  }

  .button:hover {
    background: #0056b3;
  }

  .button.main {
    background: #28a745;
  }

  .button.main:hover {
    background: #1e7e34;
  }

  /* Critical navigation styles */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    text-decoration: none;
  }

  .navbar-nav {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }

  .navbar-nav a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .navbar-nav a:hover {
    color: #007bff;
  }

  /* Critical form styles */
  .form-container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin: 2rem auto;
    max-width: 600px;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e9ecef;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #007bff;
  }

  /* Critical responsive styles */
  @media (max-width: 768px) {
    .header h1 {
      font-size: 2rem;
    }

    .header p {
      font-size: 1rem;
    }

    .navbar-nav {
      display: none;
    }

    .form-container {
      margin: 1rem;
      padding: 1.5rem;
    }
  }

  /* Critical loading states */
  .lazy {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .lazy.loaded {
    opacity: 1;
  }

  /* Critical animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  /* Critical utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-center {
    text-align: center;
  }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }

  .d-none { display: none; }
  .d-block { display: block; }
  .d-flex { display: flex; }
  .d-grid { display: grid; }

  .justify-center { justify-content: center; }
  .align-center { align-items: center; }
`;

// Inject critical CSS
export const injectCriticalCSS = () => {
  const style = document.createElement("style");
  style.textContent = criticalCSS;
  style.setAttribute("data-critical", "true");
  document.head.appendChild(style);
};

// Load non-critical CSS asynchronously
export const loadNonCriticalCSS = (cssUrl) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssUrl;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
};

// Preload CSS files
export const preloadCSS = (cssUrls) => {
  cssUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = url;
    document.head.appendChild(link);
  });
};

// Optimize font loading
export const optimizeFontLoading = () => {
  // Preload critical fonts
  const criticalFonts = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  ];

  criticalFonts.forEach((fontUrl) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = fontUrl;
    document.head.appendChild(link);

    // Load font stylesheet
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = fontUrl;
    document.head.appendChild(fontLink);
  });

  // Font display swap for better performance
  const fontDisplaySwap = `
    @font-face {
      font-family: 'Inter';
      font-display: swap;
    }
  `;

  const style = document.createElement("style");
  style.textContent = fontDisplaySwap;
  document.head.appendChild(style);
};

// Remove render-blocking CSS
export const removeRenderBlockingCSS = () => {
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => {
    if (link.href && !link.href.includes("critical")) {
      link.media = "print";
      link.onload = () => {
        link.media = "all";
      };
    }
  });
};

// Optimize CSS delivery
export const optimizeCSSDelivery = () => {
  // Inject critical CSS
  injectCriticalCSS();

  // Optimize font loading
  optimizeFontLoading();

  // Preload non-critical CSS
  const nonCriticalCSS = ["/static/css/main.css", "/static/css/components.css"];
  preloadCSS(nonCriticalCSS);

  // Load non-critical CSS after page load
  window.addEventListener("load", () => {
    nonCriticalCSS.forEach((cssUrl) => {
      loadNonCriticalCSS(cssUrl).catch(() => {});
    });
  });
};

// CSS optimization for specific components
export const componentCSS = {
  button: `
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-primary:hover {
      background: #0056b3;
    }
  `,

  card: `
    .card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
  `,

  form: `
    .form-control {
      width: 100%;
      padding: 12px;
      border: 2px solid #e9ecef;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #007bff;
    }
  `,
};

// Inject component-specific CSS
export const injectComponentCSS = (componentName) => {
  const css = componentCSS[componentName];
  if (css) {
    const style = document.createElement("style");
    style.textContent = css;
    style.setAttribute("data-component", componentName);
    document.head.appendChild(style);
  }
};

// Initialize all CSS optimizations
export const initCSSOptimizations = () => {
  optimizeCSSDelivery();
  removeRenderBlockingCSS();
};

export default {
  criticalCSS,
  injectCriticalCSS,
  loadNonCriticalCSS,
  preloadCSS,
  optimizeFontLoading,
  removeRenderBlockingCSS,
  optimizeCSSDelivery,
  componentCSS,
  injectComponentCSS,
  initCSSOptimizations,
};
