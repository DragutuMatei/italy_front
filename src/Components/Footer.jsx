import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer-distributed">
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
      />

      <div className="footer-left">
        <img
          src={require("../assets/images/v_class.png")}
          alt="Italy Transfers logo"
          width={150}
          height={80}
          loading="lazy"
        />

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

          <Link to="/about" aria-label={`${t("about_us")} - About us page`}>
            {t("about_us")}
          </Link>
          <Link
            to="/about_facultate"
            aria-label={`${t("about_faculty")} - About faculty page`}
          >
            {t("about_faculty")}
          </Link>
          <Link
            to="/faq"
            aria-label={`${t("faq")} - Frequently asked questions`}
          >
            {t("faq")}
          </Link>
          <Link to="/contact" aria-label={`${t("contact")} - Contact page`}>
            {t("contact")}
          </Link>
        </nav>

        <p className="footer-company-name">{t("company_name")}</p>
      </div>

      <div className="footer-center">
        <address>
          <div>
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <p>
              <span>{t("address")}</span>
            </p>
          </div>

          <div>
            <i className="fa fa-phone" aria-hidden="true"></i>
            <p>
              <a href="tel:+406786782763" aria-label={`${t("phone")} - Call us`}>
                {t("phone")}
              </a>
            </p>
          </div>

          <div>
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <p>
              <a href="mailto:osfiir@gmail.com" aria-label={`${t("email")} - Send us an email`}>
                {t("email")}
              </a>
            </p>
          </div>
        </address>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>{t("about_osfiir")}</span>
          {t("osfiir_description")}
        </p>

        <div className="footer-icons">
          <a
            href="https://www.facebook.com/OSFIIR"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/osfiir/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/osfiir"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
