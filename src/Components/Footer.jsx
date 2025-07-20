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
        <img src={require("../assets/images/v_class.png")} alt="" />

        <p className="footer-links">
          <Link to="/" className="link-1">
            {t("home")}
          </Link>

          <Link to="/about">{t("about_us")}</Link>
          <Link to="/about_facultate">{t("about_faculty")}</Link>
          <Link to="/faq">{t("faq")}</Link>
          <Link to="/contact">{t("contact")}</Link>
        </p>

        <p className="footer-company-name">{t("company_name")}</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>{t("address")}</span>
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>{t("phone")}</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:osfiir@gmail.com">{t("email")}</a>
          </p>
        </div>
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
