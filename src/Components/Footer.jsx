import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AXIOS from "../utils/Axios_config";

function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const handleNewsletter = async (e) => {
    e.preventDefault();
    setNewsletterStatus("");
    try {
      const resp = await AXIOS.post("/api/newsletter", {
        email: newsletterEmail,
      });
      if (resp.data.success) {
        setNewsletterStatus(t("newsletter_success"));
        setNewsletterEmail("");
      } else {
        setNewsletterStatus(t("error_testimonials"));
      }
    } catch {
      setNewsletterStatus(t("error_testimonials"));
    }
  };

  return !location.pathname.includes("/book") ? (
    <footer className="footer-distributed">
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
      />

      <div className="footer-left">
        <Link to="/">
          <img
            src={require("../assets/images/logo.svg").default}
            style={{ height: "120px" }}
            alt="Luxury Italy Trevi-Chauffeurs"
          />
        </Link>

        <nav
          className="footer-links"
          role="navigation"
          aria-label="Footer navigation"
        >
          <Link
            to="/"
            className="link-1"
            aria-label={`${t("home")} - Home page`}
          >
            {t("home")}
          </Link>
          <Link to="/#about" aria-label={`${t("about_us")} - About us page`}>
            {t("about_us")}
          </Link>
          <Link
            to="/#mainform"
            aria-label={`${t("book_a_ride")} - About us page`}
          >
            {t("book_a_ride")}
          </Link>

          <Link to="/#services" aria-label={`${t("services")} `}>
            {t("services")}
          </Link>
          <Link to="/#testimoniale">{t("testimonials")}</Link>
          <Link
            to="/#faq"
            aria-label={`${t("faq")} - Frequently asked questions`}
          >
            {t("faq")}
          </Link>
          <Link to="/contact" aria-label={`${t("contact")} - Contact page`}>
            {t("contact")}
          </Link>
        </nav>
        <div className="footer-company-about">
          <span style={{ marginBottom: 5 }}>Copyright</span>
          <p className="footer-company-name">© 2025 Trevi-Chauffeurs</p>
        </div>
      </div>

      <div className="footer-center">
        <address>
          <div className="add">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <p>
              <a
                href="tel:+393662629902"
                aria-label={`${t("phone")} - Call us`}
              >
                +393662629902
              </a>
            </p>
          </div>
          <div className="add">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <p>
              <a
                href="tel:+393899839992"
                aria-label={`${t("phone")} - Call us`}
              >
                +393899839992
              </a>
            </p>
          </div>

          <div className="add">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <p>
              <a
                href="mailto:nrc.servizi@gmail.com"
                aria-label={`${t("email")} - Send us an email`}
              >
                nrc.servizi@gmail.com
              </a>
            </p>
          </div>
        </address>
      </div>

      <div className="footer-right">
        <div className="footer-company-about">
          <span>{t("about_us")}</span>
          <p>{t("AboutText")}</p>
        </div>
        <form
          onSubmit={handleNewsletter}
          className="newsletter-form"
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <label
            htmlFor="newsletter-input"
            style={{ fontWeight: 600, marginBottom: 10, color: "white" }}
          >
            {t("newsletter_txt")}
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              id="newsletter-input"
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={"Email..."}
              required
              style={{
                padding: "8px",
                outline: "none",
                borderRadius: 6,
                border: "1px solid #ccc",
                flex: 1,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                background: "#ff4c00",
                outline: "none",
                color: "#fff",
                border: "none",
                fontWeight: 600,
              }}
            >
              {t("newsletter_button")}
            </button>
          </div>
          {newsletterStatus && (
            <span style={{ fontSize: 13, color: "#ff4c00" }}>
              {newsletterStatus}
            </span>
          )}
        </form>
      </div>
    </footer>
  ) : (
    <></>
  );
}

export default Footer;
