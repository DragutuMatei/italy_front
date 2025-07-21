// Advanced performance optimizations for Italy Transfers
import React, { useEffect } from "react";

// Bundle splitting and code splitting
export const loadComponentLazy = (importFunc, fallback = null) => {
  const LazyComponent = React.lazy(importFunc);

  return (props) => (
    <React.Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: "/static/css/main.css", as: "style" },
    { href: "/static/js/main.js", as: "script" },
    { href: "/assets/images/logo.png", as: "image" },
  ];

  criticalResources.forEach(({ href, as }) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });
};

// Optimize third-party scripts
export const optimizeThirdPartyScripts = () => {
  // Load Google Maps API only when needed
  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) return Promise.resolve();

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  // Load PayPal only when needed
  const loadPayPal = () => {
    if (window.paypal) return Promise.resolve();

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=" +
        process.env.REACT_APP_PAYPAL_CLIENT_ID;
      script.async = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  return { loadGoogleMaps, loadPayPal };
};

// Memory management
export const useMemoryOptimization = () => {
  useEffect(() => {
    // Clean up event listeners
    const cleanup = () => {
      // Remove any global event listeners
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };

    return cleanup;
  }, []);

  // Debounce resize and scroll events
  const handleResize = debounce(() => {
    // Handle resize logic
  }, 100);

  const handleScroll = throttle(() => {
    // Handle scroll logic
  }, 16); // ~60fps
};

// Service Worker for caching
export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          // console.log("SW registration failed: ", registrationError);
        });
    });
  }
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: "dns-prefetch", href: "//maps.googleapis.com" },
    { rel: "dns-prefetch", href: "//www.paypal.com" },
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "preconnect", href: "https://maps.googleapis.com" },
    { rel: "preconnect", href: "https://www.paypal.com" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
  ];

  hints.forEach(({ rel, href }) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  });
};

// Optimize images with WebP and responsive images
export const optimizeImages = async () => {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;

          // Add WebP support
          const webPSupported = await supportsWebP();
          if (webPSupported) {
            img.src = img.src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
          }

          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      }
    });

    images.forEach((img) => imageObserver.observe(img));
  }
};

// Optimize fonts
export const optimizeFonts = () => {
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

  // Font display swap
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

// Optimize CSS delivery
export const optimizeCSSDelivery = () => {
  // Remove render-blocking CSS
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

// Performance monitoring
export const monitorPerformance = () => {
  // Monitor Core Web Vitals
  if ("PerformanceObserver" in window) {
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      // console.log("LCP:", lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // console.log("FID:", entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ["first-input"] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });

    // Report CLS when page is hidden
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        // console.log("CLS:", clsValue);
      }
    });
  }
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility
export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check WebP support
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = async () => {
  preloadCriticalResources();
  addResourceHints();
  optimizeFonts();
  optimizeCSSDelivery();
  await optimizeImages();
  registerServiceWorker();
  monitorPerformance();
};

export default {
  loadComponentLazy,
  preloadCriticalResources,
  optimizeThirdPartyScripts,
  useMemoryOptimization,
  registerServiceWorker,
  addResourceHints,
  optimizeImages,
  optimizeFonts,
  optimizeCSSDelivery,
  monitorPerformance,
  debounce,
  throttle,
  supportsWebP,
  initPerformanceOptimizations,
};
