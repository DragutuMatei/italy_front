import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// SEO Component for managing meta tags
export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  structuredData = null,
}) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta tags
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update basic meta tags
    if (description) {
      updateMetaTag("description", description);
      updatePropertyTag("og:description", description);
      updatePropertyTag("twitter:description", description);
    }

    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Update Open Graph tags
    if (title) {
      updatePropertyTag("og:title", title);
      updatePropertyTag("twitter:title", title);
    }

    if (image) {
      updatePropertyTag("og:image", image);
      updatePropertyTag("twitter:image", image);
    }

    if (url) {
      updatePropertyTag("og:url", url);
      updatePropertyTag("twitter:url", url);
    }

    updatePropertyTag("og:type", type);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href;

    // Add structured data if provided
    if (structuredData) {
      // Remove existing structured data
      const existingScripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      existingScripts.forEach((script) => {
        if (script.dataset.seo === "true") {
          script.remove();
        }
      });

      // Add new structured data
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "true";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove dynamic meta tags on unmount
      const dynamicMetaTags = document.querySelectorAll(
        'meta[data-seo="true"]'
      );
      dynamicMetaTags.forEach((tag) => tag.remove());
    };
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    structuredData,
    location,
  ]);

  return null;
};

// SEO configurations for different pages
export const SEO_CONFIGS = {
  home: {
    title:
      "Italy Transfers - Professional Private Transportation Services | DVC Chauffeurs",
    description:
      "Professional private transfer services across Italy. Luxury vans, sedans, and business class vehicles. Airport transfers, city tours, and corporate transportation. Book your ride today!",
    keywords:
      "Italy transfers, private transportation, airport transfers, luxury car service, chauffeur service, Italy travel",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Italy Transfers - DVC Chauffeurs",
      description: "Professional private transfer services across Italy",
      url: "https://italytransfers.com",
      telephone: "+39-XXX-XXX-XXXX",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.9028,
        longitude: 12.4964,
      },
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "€€",
    },
  },
  book: {
    title:
      "Book Your Transfer - Italy Transfers | Professional Transportation Services",
    description:
      "Book your professional transfer service in Italy. Easy online booking for airport transfers, city tours, and corporate transportation. Instant confirmation and competitive prices.",
    keywords:
      "book transfer, Italy transportation booking, airport transfer booking, online booking, transfer reservation",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Transfer Booking Service",
      description: "Online booking for professional transfer services in Italy",
      provider: {
        "@type": "Organization",
        name: "Italy Transfers",
      },
      areaServed: "Italy",
    },
  },
  contact: {
    title:
      "Contact Us - Italy Transfers | Get in Touch for Professional Transportation",
    description:
      "Contact Italy Transfers for professional transportation services. 24/7 customer support, instant quotes, and personalized service. Call, email, or use our contact form.",
    keywords:
      "contact Italy transfers, customer service, transportation support, transfer quotes, Italy travel help",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Italy Transfers",
      description:
        "Contact information for Italy Transfers transportation services",
    },
  },
  services: {
    title:
      "Our Services - Italy Transfers | Airport Transfers, City Tours & Corporate Transportation",
    description:
      "Comprehensive transportation services across Italy. Airport transfers, city tours, corporate transportation, luxury transfers, and special events. Professional drivers and modern fleet.",
    keywords:
      "Italy transportation services, airport transfers, city tours, corporate transportation, luxury transfers, special events",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Italy Transportation Services",
      description: "Comprehensive transportation services across Italy",
      provider: {
        "@type": "Organization",
        name: "Italy Transfers",
      },
      areaServed: "Italy",
    },
  },
  testimonials: {
    title: "Customer Testimonials - Italy Transfers | What Our Clients Say",
    description:
      "Read authentic customer reviews and testimonials about Italy Transfers. Real experiences from satisfied clients who used our professional transportation services across Italy.",
    keywords:
      "Italy transfers reviews, customer testimonials, transportation reviews, transfer service feedback",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Customer Testimonials",
      description: "Customer reviews and testimonials for Italy Transfers",
    },
  },
  faq: {
    title:
      "FAQ - Italy Transfers | Frequently Asked Questions About Our Services",
    description:
      "Find answers to frequently asked questions about Italy Transfers services. Information about booking, pricing, vehicles, cancellation policies, and more.",
    keywords:
      "Italy transfers FAQ, frequently asked questions, transfer service information, booking questions",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I book a transfer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book a transfer through our website, by phone, or email. We offer 24/7 booking support.",
          },
        },
        {
          "@type": "Question",
          name: "Are your prices fixed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all our prices are fixed with no hidden fees. The price you see is the price you pay.",
          },
        },
      ],
    },
  },
};

// City-specific SEO configurations
export const getCitySEO = (cityName) => ({
  title: `${cityName} Transfers - Professional Transportation Services | Italy Transfers`,
  description: `Professional transfer services in ${cityName}, Italy. Airport transfers, city tours, and local transportation. Book your ${cityName} transfer with Italy Transfers.`,
  keywords: `${cityName} transfers, ${cityName} transportation, ${cityName} airport transfers, ${cityName} car service, ${cityName} chauffeur`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Italy Transfers - ${cityName}`,
    description: `Professional transfer services in ${cityName}, Italy`,
    areaServed: {
      "@type": "City",
      name: cityName,
    },
  },
});

// Airport-specific SEO configurations
export const getAirportSEO = (airportName, cityName) => ({
  title: `${airportName} Airport Transfers - ${cityName} | Italy Transfers`,
  description: `Professional airport transfer services to and from ${airportName} Airport in ${cityName}. Reliable, comfortable, and punctual transportation. Book your transfer today.`,
  keywords: `${airportName} airport transfers, ${cityName} airport transportation, ${airportName} car service, ${airportName} shuttle`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${airportName} Airport Transfers`,
    description: `Professional airport transfer services to and from ${airportName} Airport`,
    provider: {
      "@type": "Organization",
      name: "Italy Transfers",
    },
    areaServed: {
      "@type": "Airport",
      name: airportName,
      address: {
        "@type": "PostalAddress",
        addressLocality: cityName,
        addressCountry: "IT",
      },
    },
  },
});

export default SEO;
