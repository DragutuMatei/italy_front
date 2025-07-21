// Accessibility utilities for Italy Transfers
import { useEffect, useRef, useState } from "react";

// Skip to main content link
export const SkipToMainContent = () => {
  const handleClick = () => {
    const mainContent = document.querySelector('main[role="main"]');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      Skip to main content
    </a>
  );
};

// Focus trap for modals and dropdowns
export const useFocusTrap = (ref, isActive = true) => {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, ref]);
};

// Announce changes to screen readers
export const announceToScreenReader = (message, priority = "polite") => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Enhanced button component with accessibility
export const AccessibleButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) => {
  const buttonRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled && !loading) {
        onClick?.(e);
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`accessible-button ${variant} ${size} ${className} ${
        disabled ? "disabled" : ""
      } ${loading ? "loading" : ""} ${isPressed ? "pressed" : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className="loading-spinner" aria-hidden="true" />}
      <span className="button-text">{children}</span>
    </button>
  );
};

// Enhanced link component with accessibility
export const AccessibleLink = ({
  children,
  href,
  external = false,
  className = "",
  ...props
}) => {
  const linkProps = {
    href,
    className: `accessible-link ${className}`,
    ...props,
  };

  if (external) {
    linkProps.rel = "noopener noreferrer";
    linkProps.target = "_blank";
    linkProps["aria-label"] = `${children} (opens in new window)`;
  }

  return <a {...linkProps}>{children}</a>;
};

// Form field with accessibility
export const AccessibleFormField = ({
  label,
  id,
  type = "text",
  error,
  required = false,
  helperText,
  className = "",
  ...props
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  const ariaDescribedBy = [error && errorId, helperText && helperId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`form-field ${className} ${error ? "has-error" : ""}`}>
      <label htmlFor={fieldId} className="field-label">
        {label}
        {required && (
          <span className="required" aria-label="required">
            *
          </span>
        )}
      </label>

      <input
        id={fieldId}
        type={type}
        aria-describedby={ariaDescribedBy || undefined}
        aria-invalid={error ? "true" : "false"}
        aria-required={required}
        {...props}
      />

      {helperText && (
        <div id={helperId} className="helper-text">
          {helperText}
        </div>
      )}

      {error && (
        <div id={errorId} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

// Modal component with accessibility
export const AccessibleModal = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  ...props
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={`modal ${className}`}
        tabIndex={-1}
        {...props}
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <AccessibleButton
            onClick={onClose}
            variant="icon"
            aria-label="Close modal"
            className="close-button"
          >
            ×
          </AccessibleButton>
        </header>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

// Collapsible component with accessibility
export const AccessibleCollapsible = ({
  title,
  children,
  defaultOpen = false,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const buttonId = `collapsible-${Math.random().toString(36).substr(2, 9)}`;
  const contentId = `${buttonId}-content`;

  return (
    <div
      className={`collapsible ${className} ${isOpen ? "open" : ""}`}
      {...props}
    >
      <AccessibleButton
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        variant="text"
        className="collapsible-trigger"
      >
        {title}
        <span className="icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </AccessibleButton>

      <div
        id={contentId}
        ref={contentRef}
        className="collapsible-content"
        aria-hidden={!isOpen}
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Loading spinner with accessibility
export const AccessibleLoadingSpinner = ({
  size = "medium",
  label = "Loading...",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`loading-spinner ${size} ${className}`}
      role="status"
      aria-label={label}
      {...props}
    >
      <div className="spinner" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

// Screen reader only text
export const ScreenReaderOnly = ({ children, className = "", ...props }) => {
  return (
    <span className={`sr-only ${className}`} {...props}>
      {children}
    </span>
  );
};

// Initialize accessibility features
export const initAccessibility = () => {
  // Add skip link to page
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to main content";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add focus indicators
  const style = document.createElement("style");
  style.textContent = `
    .skip-link {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
    }
    
    .skip-link:focus {
      top: 6px;
    }
    
    *:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
  document.head.appendChild(style);

  // Announce page changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        const newContent = Array.from(mutation.addedNodes)
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent)
          .join(" ");

        if (newContent.trim()) {
          announceToScreenReader(newContent);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

export default {
  SkipToMainContent,
  useFocusTrap,
  announceToScreenReader,
  AccessibleButton,
  AccessibleLink,
  AccessibleFormField,
  AccessibleModal,
  AccessibleCollapsible,
  AccessibleLoadingSpinner,
  ScreenReaderOnly,
  initAccessibility,
};
