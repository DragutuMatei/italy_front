// Google Analytics and tracking utilities

// Initialize Google Analytics
export const initGoogleAnalytics = () => {
  // Google Analytics 4
  const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID; // Replace with your GA4 tracking ID

  // Load Google Analytics script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });
};

// Track page views
export const trackPageView = (pageTitle, pagePath) => {
  if (window.gtag) {
    window.gtag("config", process.env.REACT_APP_GA_TRACKING_ID, {
      page_title: pageTitle,
      page_location: pagePath,
      send_page_view: true,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName) => {
  trackEvent("form_submit", "engagement", formName);
};

// Track button clicks
export const trackButtonClick = (buttonName, pageLocation) => {
  trackEvent("button_click", "engagement", buttonName, pageLocation);
};

// Track booking events
export const trackBookingEvent = (step, vehicleType, price) => {
  trackEvent("booking_step", "booking", step, vehicleType);

  if (price) {
    trackEvent("booking_value", "ecommerce", vehicleType, price);
  }
};

// Track search events
export const trackSearchEvent = (searchTerm, resultsCount) => {
  trackEvent("search", "engagement", searchTerm, resultsCount);
};

// Track phone calls
export const trackPhoneCall = (phoneNumber) => {
  trackEvent("phone_call", "contact", phoneNumber);
  trackConversion("phone_call_made", 1);
};

// Track email clicks
export const trackEmailClick = (emailAddress) => {
  trackEvent("email_click", "contact", emailAddress);
};

// Track social media clicks
export const trackSocialClick = (platform, url) => {
  trackEvent("social_click", "social", platform, url);
};

// Track scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0;
  let ticking = false;

  const updateScrollDepth = () => {
    // Cache values to avoid forced reflow
    const scrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const innerHeight = window.innerHeight;
    
    const scrollPercent = Math.round(
      (scrollY / (scrollHeight - innerHeight)) * 100
    );

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      // Track at 25%, 50%, 75%, 100%
      if (maxScroll >= 25 && maxScroll < 50) {
        trackEvent("scroll_depth", "engagement", "25%");
      } else if (maxScroll >= 50 && maxScroll < 75) {
        trackEvent("scroll_depth", "engagement", "50%");
      } else if (maxScroll >= 75 && maxScroll < 100) {
        trackEvent("scroll_depth", "engagement", "75%");
      } else if (maxScroll >= 100) {
        trackEvent("scroll_depth", "engagement", "100%");
      }
    }

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDepth);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestTick);
};

// Track time on page
export const trackTimeOnPage = () => {
  const startTime = Date.now();

  window.addEventListener("beforeunload", () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackEvent("time_on_page", "engagement", "seconds", timeOnPage);
  });
};

// Track user engagement
export const trackUserEngagement = () => {
  // Track scroll depth
  trackScrollDepth();

  // Track time on page
  trackTimeOnPage();

  // Track clicks on important elements
  document.addEventListener("click", (e) => {
    const target = e.target;

    // Track navigation clicks
    if (target.tagName === "A" && target.href) {
      const linkText = target.textContent.trim();
      const linkUrl = target.href;
      trackEvent("link_click", "navigation", linkText, linkUrl);
    }

    // Track button clicks
    if (target.tagName === "BUTTON" || target.closest("button")) {
      const buttonText =
        target.textContent.trim() ||
        target.closest("button").textContent.trim();
      trackEvent("button_click", "engagement", buttonText);
    }
  });
};

// Enhanced ecommerce tracking
export const trackEcommerceEvent = (eventType, productData) => {
  if (window.gtag) {
    window.gtag("event", eventType, {
      currency: "EUR",
      value: productData.price,
      items: [
        {
          item_id: productData.id,
          item_name: productData.name,
          price: productData.price,
          quantity: productData.quantity || 1,
        },
      ],
    });
  }
};

// Track conversion goals
export const trackConversion = (goalName, value) => {
  trackEvent("conversion", "goal", goalName, value);
};

// Initialize all tracking
export const initTracking = () => {
  // Initialize Google Analytics
  initGoogleAnalytics();

  // Track user engagement
  trackUserEngagement();

  // Track page views on route changes
  if (window.location.pathname) {
    trackPageView(document.title, window.location.pathname);
  }
};

// Utility functions for tracking
export const trackBookingStart = (origin, destination) => {
  trackEvent("booking_start", "booking", `${origin} to ${destination}`);
};

export const trackBookingComplete = (bookingId, totalPrice) => {
  trackEvent("booking_complete", "booking", bookingId, totalPrice);
  trackConversion("booking_completed", totalPrice);
};

export const trackContactForm = (formType) => {
  trackFormSubmission(formType);
  trackConversion("contact_form_submitted", 1);
};

export default {
  initGoogleAnalytics,
  trackPageView,
  trackEvent,
  trackFormSubmission,
  trackButtonClick,
  trackBookingEvent,
  trackSearchEvent,
  trackPhoneCall,
  trackEmailClick,
  trackSocialClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackUserEngagement,
  trackEcommerceEvent,
  trackConversion,
  initTracking,
  trackBookingStart,
  trackBookingComplete,
  trackContactForm,
};
