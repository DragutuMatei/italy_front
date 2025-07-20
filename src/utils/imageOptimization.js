// Image optimization utilities

import { useEffect, useState } from "react";

// Lazy load images with Intersection Observer
export const lazyLoadImages = () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;

            // Load the actual image
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }

            // Load WebP if supported
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }

            // Remove lazy class
            img.classList.remove("lazy");

            // Stop observing
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      }
    );

    // Observe all lazy images
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      img.classList.remove("lazy");
    });
  }
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

// Get optimized image URL with WebP support
export const getOptimizedImageUrl = async (originalUrl, options = {}) => {
  const {
    width = null,
    height = null,
    quality = 80,
    format = "auto",
  } = options;

  if (!originalUrl) return originalUrl;

  // In a real implementation, you would use a CDN or image optimization service
  // For now, we'll return the original URL
  let optimizedUrl = originalUrl;

  // Add WebP support if available
  if (format === "auto" || format === "webp") {
    const webPSupported = await supportsWebP();
    if (webPSupported && !originalUrl.includes(".webp")) {
      // Convert to WebP URL (this would be handled by your CDN)
      optimizedUrl = originalUrl.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    }
  }

  // Add size parameters if specified
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append("w", width);
    if (height) params.append("h", height);
    if (quality) params.append("q", quality);

    const separator = optimizedUrl.includes("?") ? "&" : "?";
    optimizedUrl += separator + params.toString();
  }

  return optimizedUrl;
};

// Create responsive image srcset
export const createResponsiveSrcset = async (baseUrl, sizes = []) => {
  const srcset = [];

  for (const size of sizes) {
    const optimizedUrl = await getOptimizedImageUrl(baseUrl, { width: size });
    srcset.push(`${optimizedUrl} ${size}w`);
  }

  return srcset.join(", ");
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

// Optimize background images
export const optimizeBackgroundImages = () => {
  const elementsWithBg = document.querySelectorAll("[data-bg-src]");

  elementsWithBg.forEach((element) => {
    const bgUrl = element.dataset.bgSrc;
    if (bgUrl) {
      // Load the background image
      const img = new Image();
      img.onload = () => {
        element.style.backgroundImage = `url(${bgUrl})`;
        element.classList.remove("loading-bg");
      };
      img.src = bgUrl;
    }
  });
};

// Create image placeholder
export const createImagePlaceholder = (width, height, color = "#f0f0f0") => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Fill with background color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Add a subtle pattern
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
  for (let i = 0; i < height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }

  return canvas.toDataURL();
};

// Optimize image loading for carousel/slider
export const optimizeSliderImages = (sliderContainer) => {
  const images = sliderContainer.querySelectorAll("img[data-src]");

  // Load first image immediately
  if (images.length > 0) {
    const firstImage = images[0];
    firstImage.src = firstImage.dataset.src;
    firstImage.classList.remove("lazy");
  }

  // Preload next few images
  const preloadCount = Math.min(3, images.length);
  for (let i = 1; i < preloadCount; i++) {
    const img = images[i];
    const preloadImg = new Image();
    preloadImg.src = img.dataset.src;
  }
};

// Initialize all image optimizations
export const initImageOptimizations = () => {
  // Lazy load images
  lazyLoadImages();

  // Optimize background images
  optimizeBackgroundImages();

  // Preload critical images
  const criticalImages = [
    "/assets/images/bg.png",
    "/assets/images/about1.webp",
    "/assets/images/logo.png",
  ];
  preloadCriticalImages(criticalImages);
};

// Image optimization component for React
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  lazy = true,
  placeholder = true,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(
    placeholder ? createImagePlaceholder(width, height) : ""
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    // Check WebP support
    supportsWebP().then(setSupportsWebP);

    // Load optimized image
    getOptimizedImageUrl(src, { width, height }).then((optimizedSrc) => {
      const img = new Image();
      img.onload = () => {
        setImageSrc(optimizedSrc);
        setIsLoaded(true);
      };
      img.src = optimizedSrc;
    });
  }, [src, width, height]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${lazy ? "lazy" : ""} ${
        isLoaded ? "loaded" : "loading"
      }`}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default {
  lazyLoadImages,
  supportsWebP,
  getOptimizedImageUrl,
  createResponsiveSrcset,
  preloadCriticalImages,
  optimizeBackgroundImages,
  createImagePlaceholder,
  optimizeSliderImages,
  initImageOptimizations,
  OptimizedImage,
};
