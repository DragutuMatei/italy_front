import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Image from "./Image";
import useWindowSize from "../utils/useWindowSize";

function Contact() {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const reff = useRef()

  return (
    <section className="contact" ref={reff}>
      <Image publicId={"Group_40_acmlfe"} width={width} height={reff.current.offsetHeight||380} className="imgs" />
      <h2 data-aos="fade-down">{t("contact_title")}</h2>

      <div className="row">
        <h1 data-aos="fade-right">
          {t("contact_description").split("<br />")[0]}
          <br />
          {t("contact_description").split("<br />")[1] || ""}
        </h1>
        <div className="button main" data-aos="fade-left">
          <Link to="/">
            {t("contact_button")} <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;
