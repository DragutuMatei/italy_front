import React, { useState, useEffect } from "react";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";
import { useTranslation } from "react-i18next";
import "../utils/translations.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const { user, signUserOut, signInWithGoogle } = useAuth();
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    // console.log("Changing language to:", lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };
  const { t } = useTranslation();

  const currentLanguage = i18n.language || "en";

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "it" : "en";
    changeLanguage(newLang);
  };

  // Detectează dacă e mobil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 780);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Închide dropdown la click în afara lui
  useEffect(() => {
    if (!showContactDropdown) return;
    const handleClick = (e) => {
      if (
        !e.target.closest(".contact-dropdown") &&
        !e.target.closest(".contact-toggle")
      ) {
        setShowContactDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showContactDropdown]);

  return (
    <>
      <nav>
        <div className="top" style={{ position: "relative" }}>
          {isMobile ? (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <button
                className="contact-toggle"
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  fontWeight: 500,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                  padding: 0,
                  color: "#fdffff",
                }}
                onClick={() => setShowContactDropdown((v) => !v)}
              >
                <IoIosMail style={{ color: "#ff4c00", fontSize: 18 }} />
                {t("contact_title")}
              </button>
              {showContactDropdown && (
                <div
                  className="contact-dropdown-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 99999,
                    background: "rgba(30,38,61,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "fadeIn 0.2s",
                  }}
                  onClick={() => setShowContactDropdown(false)}
                >
                  <div
                    className="contact-dropdown"
                    style={{
                      background: "#fff",
                      border: "1px solid #ff4c00",
                      borderRadius: 16,
                      boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
                      padding: 24,
                      minWidth: 240,
                      maxWidth: "95vw",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      alignItems: "flex-start",
                      position: "relative",
                      animation: "slideDown 0.25s cubic-bezier(.4,1.3,.6,1)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 9,
                        background: "none",
                        border: "none",
                        fontSize: 22,
                        color: "#ff4c00",
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                      aria-label="Close"
                      onClick={() => setShowContactDropdown(false)}
                    >
                      <IoIosClose />
                    </button>
                    <a
                      href="mailto:nrc.servizi@gmail.com"
                      style={{
                        color: "#1e263d",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 17,
                        fontWeight: 500,
                        borderRadius: 8,
                        padding: "8px 0",
                        width: "100%",
                        transition: "background 0.2s",
                      }}
                      onClick={() => setShowContactDropdown(false)}
                    >
                      <IoIosMail style={{ color: "#ff4c00", fontSize: 20 }} />
                      nrc.servizi@gmail.com
                    </a>
                    <a
                      href="tel:+393662629902"
                      style={{
                        color: "#1e263d",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 17,
                        fontWeight: 500,
                        borderRadius: 8,
                        padding: "8px 0",
                        width: "100%",
                        transition: "background 0.2s",
                      }}
                      onClick={() => setShowContactDropdown(false)}
                    >
                      <FaPhone style={{ color: "#ff4c00", fontSize: 18 }} />
                      +393662629902
                    </a>
                    <a
                      href="tel:+393899839992"
                      style={{
                        color: "#1e263d",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 17,
                        fontWeight: 500,
                        borderRadius: 8,
                        padding: "8px 0",
                        width: "100%",
                        transition: "background 0.2s",
                      }}
                      onClick={() => setShowContactDropdown(false)}
                    >
                      <FaPhone style={{ color: "#ff4c00", fontSize: 18 }} />
                      +393899839992
                    </a>
                  </div>
                  <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                  `}</style>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="mailto:nrc.servizi@gmail.com">
                <IoIosMail />
                nrc.servizi@gmail.com
              </a>
              <div className="line"></div>
              <a href="tel:+393662629902">
                <FaPhone />
                +393662629902
              </a>
              <div className="line"></div>
              <a href="tel:+393899839992">
                <FaPhone />
                +393899839992
              </a>
            </>
          )}
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <div className="language-switch">
              <div className="switch-container">
                <input
                  type="checkbox"
                  id="language-toggle"
                  className="switch-input"
                  checked={currentLanguage === "it"}
                  onChange={toggleLanguage}
                />
                <label htmlFor="language-toggle" className="switch-label">
                  <span className="switch-slider"></span>
                  <span className="switch-text switch-text-en">EN</span>
                  <span className="switch-text switch-text-it">IT</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="down">
        <div className="logo">
            <Link to="/">
              <img
                src={require("../assets/images/logo.svg").default}
                style={{ height: "70px" }}
                alt="Luxury Italy Trevi-Chauffeurs"
              />
            </Link>
        </div>

        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`drop ${isOpen ? "active" : ""}`}>
          <div className="links">
            <div className="link">
              <Link to="/#about">{t("about")}</Link>
            </div>
            <div className="link">
              <Link to="/#mainform">{t("book_a_ride")}</Link>
            </div>
            <div className="link">
              <Link to="/#services">{t("services")}</Link>
            </div>
            <div className="link">
              <Link to="/#testimonials">{t("testimonials")}</Link>
            </div>
            <div className="link">
              <Link to="/#faq">{t("faq")}</Link>
            </div>
            <div className="link">
              <Link to="/contact">{t("contact")}</Link>
            </div>
            {user && (
              <div className="link">
                <Link to="/profile">{t("my_profile")}</Link>
              </div>
            )}
          </div>
          <div className="buts">
            {user ? (
              <div className="button second" onClick={signUserOut}>
                <h4>{t("logout")}</h4>
              </div>
            ) : (
              <div className="button main" onClick={signInWithGoogle}>
                <h4>{t("login")}</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
