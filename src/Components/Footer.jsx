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
          alt="Trevi Chauffeurs logo"
          width={150}
          height={80}
          loading="lazy"
          decoding="async"
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
        <p className="footer-company-about">
          <span style={{ marginBottom: 5 }}>Copyright</span>
          <p className="footer-company-name">© 2025 Trevi-Chauffeurs</p>
        </p>
      </div>

      <div className="footer-center">
        <address>
          <div>
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
          <div>
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

          <div>
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
        <p className="footer-company-about">
          <span>{t("about_us")}</span>
          {t("company_description")}
        </p>

        {/* <div className="footer-icons">
          <a
            href="https://www.facebook.com/trevichauffeurs"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/trevichauffeurs"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/trevichauffeurs"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-linkedin"></i>
          </a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
