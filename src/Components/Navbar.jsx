import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";
import { useTranslation } from "react-i18next";
import "../utils/translations.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <nav>
        <div className="top">
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
          <div
            style={{
              marginLeft: "auto",
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
          <h1>
            <Link to="/">Trevi-Chauffeurs</Link>
          </h1>
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
