// import React, { useEffect, useState, Suspense } from "react";
// import { useTranslation } from "react-i18next";
// import { CiMoneyBill } from "react-icons/ci";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { PiSteeringWheel } from "react-icons/pi";
// import { IoIosArrowDown } from "react-icons/io";
// import { SampleNextArrow, SamplePrevArrow } from "../utils/Arrows";
// import Image from "../Components/Image";
// import useWindowSize from "../utils/useWindowSize";
// import Svg from "../Components/Svg";
// const Testimonials = React.lazy(() => import("../Components/Testimonials"));
// const Contact = React.lazy(() => import("../Components/Contact"));
// const Form = React.lazy(() => import("../Components/Form"));
// const FloatingWhatsAppButton = React.lazy(() =>
//   import("../Components/FloatingWhatsAppButton")
// );

// function Home() {
//   const { t } = useTranslation();
//   const toggle = (index) => {
//     const ans = document.querySelectorAll(".ans");
//     ans[index].classList.toggle("active");

//     const faq = document.querySelectorAll(".q-wrapper .q");
//     faq[index].classList.toggle("active");
//   };

//   const { width, height } = useWindowSize();
//   function CustomSlide(props) {
//     const { index, src, ...otherProps } = props;
//     const { t } = useTranslation();
//     return (
//       <div
//         className={`custom custom-${index}`}
//         style={{ position: "relative", overflow: "hidden" }}
//         {...otherProps}
//       >
//         <Image publicId={src} className="bbg" width={width} height={height} />
//         {width > 450 && (
//           <Svg
//             publicId={"Vector_gxwmcc"}
//             className="style"
//             width={400}
//             height={height - 300}
//           />
//         )}
//         <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
//           <h1 data-aos="fade-down">{t(`italy_transfers_title-${index}`)}</h1>
//           <p data-aos="fade-right">{t(`italy_transfers_text-${index}`)}</p>
//           <div className="buttons" data-aos="fade-right" data-aos-delay="50">
//             <div className="button main">
//               <a
//                 href="#about"
//                 aria-label={`${t("see_more")} - ${t("About Us")} section`}
//               >
//                 {t("see_more")}
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const settings = {
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow className="arrow next" />,
//     prevArrow: <SamplePrevArrow className="arrow prev" />,
//   };

//   function CustomSlide2(props) {
//     const { index, img, ...otherProps } = props;
//     return (
//       <div className="services_slide" {...otherProps}>
//         <Image publicId={img} width={400} height={300} className="asdasda" />
//         <h1>{t("slide_title")}</h1>
//         <p>{t("slide_text")}</p>
//       </div>
//     );
//   }

//   const settings2 = {
//     infinite: true,
//     speed: 200,
//     autoplay: true,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//     nextArrow: <SampleNextArrow className="arrow next" />,
//     prevArrow: <SamplePrevArrow className="arrow prev" />,
//   };

//   return (
//     <>
//       <section className="header">
//         <div className="slider-container">
//           <Slider {...settings}>
//             <CustomSlide index={1} src="Frame_54_tyttcw" />
//             <CustomSlide index={2} src="Frame_55_h5uclj" />
//             <CustomSlide index={3} src="Frame_56_h7dgyz" />
//           </Slider>
//         </div>
//       </section>

//       <Suspense
//         fallback={
//           <div aria-busy="true" aria-live="polite">
//             Loading form...
//           </div>
//         }
//       >
//         <Form />
//       </Suspense>

//       <section className="about" id="about">
//         <div className="left">
//           <h2>{t("About Us")}</h2>
//           <h1>{t("Trevi-Chauffeurs")}</h1>
//           <div className="icons">
//             <div className="icon">
//               <CiMoneyBill />
//               <h3>{t("Lorem1")}</h3>
//             </div>
//             <div className="icon">
//               <PiSteeringWheel />
//               <h3>{t("Lorem2")}</h3>
//             </div>
//           </div>
//           <p>{t("AboutText")}</p>
//           <div className="button main">
//             <Link to="#mainform">{t("Search")}</Link>
//           </div>
//         </div>
//         <div className="right">
//           <Image
//             publicId={"WhatsApp_Image_2025-06-13_at_11.27.49_d1058790_t6yahx"}
//             className="img img1"
//             width={400}
//             height={450}
//           />
//           <div
//             className="img img2"
//             role="img"
//             aria-label={`${t("10+")} ${t("Years of experience")}`}
//           >
//             <h1>{t("10+")}</h1>
//             <h2>{t("Years of experience")}</h2>
//           </div>
//           <Image
//             publicId={"WhatsApp_Image_2025-06-13_at_11.27.49_7e7e6393_elng4w"}
//             className="img img3"
//             width={400}
//             height={300}
//           />
//         </div>
//       </section>

//       <Suspense
//         fallback={
//           <div aria-busy="true" aria-live="polite">
//             Loading contact...
//           </div>
//         }
//       >
//         <Contact />
//       </Suspense>

//       <section className="services" id="services">
//         <h2>{t("Our Services")}</h2>
//         <h1>{t("The Best Service For You")}</h1>
//         <p>{t("ServicesText")}</p>
//         <div className="slider-container">
//           <Slider {...settings2}>
//             <CustomSlide2 index={1} img={"sedan_mg2kqg"} />
//             <CustomSlide2 index={2} img={"vito_yli6o7"} />
//             <CustomSlide2 index={3} img={"v_class_ak4dyq"} />
//           </Slider>
//         </div>
//       </section>

//       <Suspense
//         fallback={
//           <div aria-busy="true" aria-live="polite">
//             Loading testimonials...
//           </div>
//         }
//       >
//         <Testimonials />
//       </Suspense>

//       <section className="faq" id="faq">
//         <h2>{t("Some Important FAQ's")}</h2>
//         <div className="row">
//           <div className="left">
//             <h1>{t("Common Frequently Asked Questions?")}</h1>
//             <p>{t("ServicesText")}</p>
//           </div>
//           <div className="right">
//             {[...Array(6)].map((_, i) => (
//               <div className="q-wrapper" key={i}>
//                 <div
//                   className="q"
//                   onClick={() => toggle(i)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" || e.key === " ") {
//                       e.preventDefault();
//                       toggle(i);
//                     }
//                   }}
//                   role="button"
//                   tabIndex={0}
//                   aria-expanded="false"
//                   aria-controls={`faq-answer-${i}`}
//                 >
//                   <h3>{t(`Q${i + 1}`)}</h3>
//                   <IoIosArrowDown aria-hidden="true" />
//                 </div>
//                 <div
//                   className="ans"
//                   id={`faq-answer-${i}`}
//                   role="region"
//                   aria-labelledby={`faq-question-${i}`}
//                 >
//                   <p>{t(`A${i + 1}`)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Suspense fallback={null}>
//         <FloatingWhatsAppButton />
//       </Suspense>
//     </>
//   );
// }

// export default Home;
import React, { useEffect, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { CiMoneyBill } from "react-icons/ci";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { PiSteeringWheel } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { SampleNextArrow, SamplePrevArrow } from "../utils/Arrows";
import Image from "../Components/Image";
import useWindowSize from "../utils/useWindowSize";
import Svg from "../Components/Svg";
const Testimonials = React.lazy(() => import("../Components/Testimonials"));
const Contact = React.lazy(() => import("../Components/Contact"));
const Form = React.lazy(() => import("../Components/Form"));
const FloatingWhatsAppButton = React.lazy(() =>
  import("../Components/FloatingWhatsAppButton")
);

function Home() {
  useEffect(() => {
    if (localStorage.getItem("bookData")) {
      localStorage.removeItem("bookData");
    }
  }, []);
  const { t } = useTranslation();
  const toggle = (index) => {
    const ans = document.querySelectorAll(".ans");
    ans[index].classList.toggle("active");

    const faq = document.querySelectorAll(".q-wrapper .q");
    faq[index].classList.toggle("active");
  };

  const { width, height } = useWindowSize();
  function CustomSlide(props) {
    const { index, src, titleKey, textKey, ...otherProps } = props;
    const { t } = useTranslation();
    return (
      <div
        className={`custom custom-${index}`}
        style={{ position: "relative", overflow: "hidden" }}
        {...otherProps}
      >
        <Image publicId={src} className="bbg" width={width} height={height} />
        {width > 450 && (
          <Svg
            publicId={"Vector_gxwmcc"}
            className="style"
            width={400}
            height={height - 300}
          />
        )}
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 data-aos="fade-down">{t(titleKey)}</h1>
          <p data-aos="fade-right">{t(textKey)}</p>
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
    const { title, description, img, ...otherProps } = props;
    return (
      <div className="services_slide" {...otherProps}>
        <Image publicId={img} width={400} height={300} className="asdasda" />
        <h1>{title}</h1>
        <p>{description}</p>
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
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 },
      },
    ],
    nextArrow: <SampleNextArrow className="arrow next" />,
    prevArrow: <SamplePrevArrow className="arrow prev" />,
  };

  return (
    <>
      <section className="header">
        <div className="slider-container">
          <Slider {...settings}>
            <CustomSlide
              index={1}
              src="Frame_54_tyttcw"
              titleKey="italy_transfers_title-1"
              textKey="italy_transfers_text-1"
            />
            <CustomSlide
              index={2}
              src="Frame_55_h5uclj"
              titleKey="italy_transfers_title-2"
              textKey="italy_transfers_text-2"
            />
            <CustomSlide
              index={3}
              src="Frame_56_h7dgyz"
              titleKey="italy_transfers_title-3"
              textKey="italy_transfers_text-3"
            />
          </Slider>
        </div>
      </section>

      <Suspense
        fallback={
          <div
            aria-busy="true"
            className="loading-container"
            aria-live="polite"
          >
            <span className="loader"></span>
          </div>
        }
      >
        <Form />
      </Suspense>

      <section className="about" id="about">
        <div className="left">
          <h2>{t("About Us")}</h2>
          <h1>{t("Trevi-Chauffeurs")}</h1>
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
            <Link to="#mainform">{t("search")}</Link>
          </div>
        </div>
        <div className="right">
          <Image
            publicId={"WhatsApp_Image_2025-06-13_at_11.27.49_d1058790_t6yahx"}
            className="img img1"
            width={400}
            height={450}
          />
          <div
            className="img img2"
            role="img"
            aria-label={`${t("10+")} ${t("Years of experience")}`}
          >
            <h1>{t("experience_number")}</h1>
            <h2>{t("experience_label")}</h2>
          </div>
          <Image
            publicId={"WhatsApp_Image_2025-06-13_at_11.27.49_7e7e6393_elng4w"}
            className="img img3"
            width={400}
            height={300}
          />
        </div>
      </section>

      <Suspense
        fallback={
          <div
            aria-busy="true"
            className="loading-container"
            aria-live="polite"
          >
            <span className="loader"></span>
          </div>
        }
      >
        <Contact />
      </Suspense>

      <section className="services" id="services">
        <h2>{t("service_section_heading")}</h2>
        <h1>{t("service_section_title")}</h1>
        <p>{t("service_section_description")}</p>
        <div className="slider-container">
          <Slider {...settings2}>
            <CustomSlide2
              title={t("service1_title")}
              description={t("service1_text")}
              img={"sedan_mg2kqg"}
            />
            <CustomSlide2
              title={t("service2_title")}
              description={t("service2_text")}
              img={"vito_yli6o7"}
            />
            <CustomSlide2
              title={t("service3_title")}
              description={t("service3_text")}
              img={"v_class_ak4dyq"}
            />
          </Slider>
        </div>
      </section>

      <Suspense
        fallback={
          <div
            aria-busy="true"
            className="loading-container"
            aria-live="polite"
          >
            <span className="loader"></span>
          </div>
        }
      >
        <Testimonials />
      </Suspense>

      <section className="faq" id="faq">
        <h2>{t("faq_heading")}</h2>
        <div className="row">
          <div className="left">
            <h1>{t("faq_subheading")}</h1>
            <p>{t("faq_paragraph")}</p>
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

      <Suspense fallback={null}>
        <FloatingWhatsAppButton />
      </Suspense>
    </>
  );
}

export default Home;
