import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiMoneyBill } from "react-icons/ci";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { PiSteeringWheel } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { SampleNextArrow, SamplePrevArrow } from "../utils/Arrows";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";
import Form from "../Components/Form";
import { SEO, SEO_CONFIGS } from "../utils/SEO";

function Home() {
  const { t } = useTranslation();
  const toggle = (index) => {
    const ans = document.querySelectorAll(".ans");
    ans[index].classList.toggle("active");

    const faq = document.querySelectorAll(".q-wrapper .q");
    faq[index].classList.toggle("active");
  };
  function CustomSlide(props) {
    const { index, ...otherProps } = props;
    const { t } = useTranslation();

    return (
      <div className={`custom custom-${index}`} {...otherProps}>
        <h1 data-aos="fade-down">{t("italy_transfers_title")}</h1>
        <p data-aos="fade-right">{t("italy_transfers_text")}</p>
        <div className="buttons" data-aos="fade-right" data-aos-delay="50">
          <div className="button main">
            <a
              href="#about"
              aria-label={`${t("see_more")} - ${t("About Us")} section`}
            >
              {t("see_more")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow className="arrow next" />,
    prevArrow: <SamplePrevArrow className="arrow prev" />,
  };

  function CustomSlide2(props) {
    const { index, img, ...otherProps } = props;
    return (
      <div className="services_slide" {...otherProps}>
        <img
          src={img}
          alt={`${t("slide_title")} - ${t("slide_text")}`}
          width={400}
          height={300}
          loading="lazy"
          decoding="async"
          fetchPriority="high"
        />
        <h1>{t("slide_title")}</h1>
        <p>{t("slide_text")}</p>
      </div>
    );
  }

  const settings2 = {
    infinite: true,
    speed: 200,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow className="arrow next" />,
    prevArrow: <SamplePrevArrow className="arrow prev" />,
  };

  return (
    <>
      <SEO {...SEO_CONFIGS.home} />
      <section className="header">
        <div className="slider-container">
          <Slider {...settings}>
            <CustomSlide index={1} />
            <CustomSlide index={2} />
            <CustomSlide index={3} />
          </Slider>
        </div>
      </section>

      <Form />

      <section className="about" id="about">
        <div className="left">
          <h2>{t("About Us")}</h2>
          <h1>{t("ITALY TRANSFERS")}</h1>
          <div className="icons">
            <div className="icon">
              <CiMoneyBill />
              <h3>{t("Lorem1")}</h3>
            </div>
            <div className="icon">
              <PiSteeringWheel />
              <h3>{t("Lorem2")}</h3>
            </div>
          </div>
          <p>{t("AboutText")}</p>
          <div className="button main">
            <Link to="/">{t("Home")}</Link>
          </div>
        </div>
        <div className="right">
          <img
            src={require("../assets/images/about1.webp")}
            alt="Professional transfer service vehicle"
            className="img img1"
            width={400}
            height={300}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="img img2"
            role="img"
            aria-label={`${t("10+")} ${t("Years of experience")}`}
          >
            <h1>{t("10+")}</h1>
            <h2>{t("Years of experience")}</h2>
          </div>
          <img
            src={require("../assets/images/about2.webp")}
            alt="Luxury transportation service"
            className="img img3"
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <Contact />

      <section className="services" id="services">
        <h2>{t("Our Services")}</h2>
        <h1>{t("The Best Service For You")}</h1>
        <p>{t("ServicesText")}</p>
        <div className="slider-container">
          <Slider {...settings2}>
            <CustomSlide2
              index={1}
              img={require("../assets/images/vito.png")}
            />
            <CustomSlide2
              index={2}
              img={require("../assets/images/v_class.png")}
            />
            <CustomSlide2
              index={3}
              img={require("../assets/images/sedan.png")}
            />
          </Slider>
        </div>
      </section>

      <Testimonials />

      <section className="faq" id="faq">
        <h2>{t("Some Important FAQ's")}</h2>
        <div className="row">
          <div className="left">
            <h1>{t("Common Frequently Asked Questions?")}</h1>
            <p>{t("ServicesText")}</p>
          </div>
          <div className="right">
            {[...Array(6)].map((_, i) => (
              <div className="q-wrapper" key={i}>
                <div
                  className="q"
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(i);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded="false"
                  aria-controls={`faq-answer-${i}`}
                >
                  <h3>{t(`Q${i + 1}`)}</h3>
                  <IoIosArrowDown aria-hidden="true" />
                </div>
                <div
                  className="ans"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                >
                  <p>{t(`A${i + 1}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
