// Optimization configuration for Italy Transfers

export const PERFORMANCE_CONFIG = {
  // Image optimization
  images: {
    formats: ["webp", "avif", "jpg"],
    sizes: [320, 640, 768, 1024, 1280, 1920],
    quality: 80,
    lazyLoading: true,
    preloadCritical: true,
  },

  // Font optimization
  fonts: {
    preload: [
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    ],
    display: "swap",
    fallback: "system-ui, -apple-system, sans-serif",
  },

  // Third-party scripts
  thirdParty: {
    googleMaps: {
      loadOnDemand: true,
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    },
    paypal: {
      loadOnDemand: true,
      clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    },
    analytics: {
      enabled: true,
      trackingId: process.env.REACT_APP_GA_TRACKING_ID,
    },
  },

  // Caching
  caching: {
    serviceWorker: true,
    cacheFirst: ["images", "fonts", "css"],
    networkFirst: ["api", "dynamic"],
    staleWhileRevalidate: ["js"],
  },

  // Resource hints
  resourceHints: [
    { rel: "dns-prefetch", href: "//maps.googleapis.com" },
    { rel: "dns-prefetch", href: "//www.paypal.com" },
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "preconnect", href: "https://maps.googleapis.com" },
    { rel: "preconnect", href: "https://www.paypal.com" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
  ],

  // Critical resources
  criticalResources: [
    { href: "/static/css/main.css", as: "style" },
    { href: "/static/js/main.js", as: "script" },
    { href: "/assets/images/logo.png", as: "image" },
  ],
};

export const ACCESSIBILITY_CONFIG = {
  // ARIA labels
  ariaLabels: {
    navigation: "Main navigation",
    footer: "Footer navigation",
    search: "Search form",
    contact: "Contact form",
    booking: "Booking form",
  },

  // Focus management
  focus: {
    visible: true,
    trapInModals: true,
    restoreOnClose: true,
    skipLinks: true,
  },

  // Screen reader
  screenReader: {
    announcements: true,
    liveRegions: true,
    landmarks: true,
  },

  // Keyboard navigation
  keyboard: {
    tabIndex: true,
    arrowKeys: true,
    escapeKey: true,
    enterKey: true,
    spaceKey: true,
  },

  // Color and contrast
  contrast: {
    minimumRatio: 4.5,
    highContrast: true,
    darkMode: true,
  },

  // Motion and animation
  motion: {
    reducedMotion: true,
    pauseAnimation: true,
    disableAnimation: false,
  },
};

export const SEO_CONFIG = {
  // Meta tags
  meta: {
    viewport: "width=device-width, initial-scale=1",
    charset: "utf-8",
    robots: "index, follow",
    themeColor: "#ee6c4d",
  },

  // Open Graph
  openGraph: {
    type: "website",
    siteName: "Italy Transfers",
    locale: "en_US",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    creator: "@italytransfers",
  },

  // Structured data
  structuredData: {
    organization: {
      type: "LocalBusiness",
      name: "Italy Transfers - DVC Chauffeurs",
      description: "Professional private transfer services across Italy",
      url: "https://italytransfers.com",
      telephone: "+39-XXX-XXX-XXXX",
      address: {
        type: "PostalAddress",
        addressCountry: "IT",
      },
      geo: {
        type: "GeoCoordinates",
        latitude: 41.9028,
        longitude: 12.4964,
      },
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "€€",
    },
  },
};

export const ANALYTICS_CONFIG = {
  // Google Analytics
  googleAnalytics: {
    trackingId: process.env.REACT_APP_GA_TRACKING_ID,
    anonymizeIp: true,
    pageViews: true,
    events: true,
    ecommerce: true,
  },

  // Custom events
  events: {
    booking: {
      start: "booking_start",
      complete: "booking_complete",
      step: "booking_step",
    },
    contact: {
      form: "contact_form",
      phone: "phone_call",
      email: "email_click",
    },
    navigation: {
      menu: "menu_click",
      search: "search_performed",
      scroll: "scroll_depth",
    },
  },

  // Performance monitoring
  performance: {
    coreWebVitals: true,
    customMetrics: true,
    errorTracking: true,
  },
};

export const SECURITY_CONFIG = {
  // Content Security Policy
  csp: {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      "https://maps.googleapis.com",
      "https://www.paypal.com",
      "https://www.googletagmanager.com",
    ],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "img-src": ["'self'", "data:", "https:"],
    "font-src": ["'self'", "https://fonts.gstatic.com"],
    "connect-src": [
      "'self'",
      "https://maps.googleapis.com",
      "https://www.paypal.com",
      "https://www.google-analytics.com",
    ],
  },

  // Security headers
  headers: {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  },
};

export const MONITORING_CONFIG = {
  // Error tracking
  errors: {
    capture: true,
    report: true,
    ignore: ["Script error.", "ResizeObserver loop limit exceeded"],
  },

  // Performance monitoring
  performance: {
    metrics: ["LCP", "FID", "CLS", "FCP", "TTFB"],
    thresholds: {
      LCP: 2500,
      FID: 100,
      CLS: 0.1,
      FCP: 1800,
      TTFB: 800,
    },
  },

  // User experience
  ux: {
    sessionRecording: false,
    heatmaps: false,
    feedback: true,
  },
};

export default {
  PERFORMANCE_CONFIG,
  ACCESSIBILITY_CONFIG,
  SEO_CONFIG,
  ANALYTICS_CONFIG,
  SECURITY_CONFIG,
  MONITORING_CONFIG,
};
