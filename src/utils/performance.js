// Performance optimization utilities for Core Web Vitals

// Lazy load images
export const lazyLoadImage = (imgElement) => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    imageObserver.observe(imgElement);
  } else {
    // Fallback for older browsers
    imgElement.src = imgElement.dataset.src;
  }
};

// Preload critical images
export const preloadCriticalImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  });
};

// Optimize images with WebP support
export const getOptimizedImageUrl = (
  originalUrl,
  width = null,
  quality = 80
) => {
  if (!originalUrl) return originalUrl;

  // For now, return original URL - in production you'd use a CDN or image optimization service
  return originalUrl;
};

// Debounce function for performance
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

// Throttle function for performance
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

// Measure Core Web Vitals
export const measureCoreWebVitals = () => {
  // Largest Contentful Paint (LCP)
  if ("PerformanceObserver" in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      // console.log("LCP:", lastEntry.startTime);

      // Send to analytics
      if (window.gtag) {
        window.gtag("event", "LCP", {
          value: Math.round(lastEntry.startTime),
          event_category: "Web Vitals",
        });
      }
    });

    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
  }

  // First Input Delay (FID)
  if ("PerformanceObserver" in window) {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // console.log("FID:", entry.processingStart - entry.startTime);

        // Send to analytics
        if (window.gtag) {
          window.gtag("event", "FID", {
            value: Math.round(entry.processingStart - entry.startTime),
            event_category: "Web Vitals",
          });
        }
      });
    });

    fidObserver.observe({ entryTypes: ["first-input"] });
  }

  // Cumulative Layout Shift (CLS)
  if ("PerformanceObserver" in window) {
    let clsValue = 0;
    let clsEntries = [];

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }
    });

    clsObserver.observe({ entryTypes: ["layout-shift"] });

    // Report CLS when page is hidden
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        // console.log("CLS:", clsValue);

        // Send to analytics
        if (window.gtag) {
          window.gtag("event", "CLS", {
            value: Math.round(clsValue * 1000) / 1000,
            event_category: "Web Vitals",
          });
        }
      }
    });
  }
};

// Optimize fonts loading
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
  });
};

// Service Worker registration for caching
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

// Optimize bundle loading
export const optimizeBundleLoading = () => {
  // Preload critical CSS
  const criticalCSS = document.createElement("link");
  criticalCSS.rel = "preload";
  criticalCSS.as = "style";
  criticalCSS.href = "/static/css/main.css";
  document.head.appendChild(criticalCSS);

  // Preload critical JS
  const criticalJS = document.createElement("link");
  criticalJS.rel = "preload";
  criticalJS.as = "script";
  criticalJS.href = "/static/js/main.js";
  document.head.appendChild(criticalJS);
};

export default {
  lazyLoadImage,
  preloadCriticalImages,
  getOptimizedImageUrl,
  debounce,
  throttle,
  measureCoreWebVitals,
  optimizeFonts,
  registerServiceWorker,
  optimizeBundleLoading,
};
