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
import AXIOS from "../utils/Axios_config";
import PayPalCardFields from "../Components/Paypal";
import { SEO, SEO_CONFIGS } from "../utils/SEO";
import { announceToScreenReader } from "../utils/accessibility";

function Home() {
  const { t } = useTranslation();

  //   async function testNccgestReadData(
  //     token,
  //     startDate,
  //     endDate,
  //     subclass = "",
  //     paxname = ""
  //   ) {
  //     // API endpoint URL
  //     const baseUrl = "https://api.nccgest.com/api/rest_api.php";
  //     const dominio = "nrcvlad";
  //     const cmd = "cmd_read";

  //     // Construct query parameters
  //     const queryParams = new URLSearchParams({
  //       dominio,
  //       token,
  //       start_date: startDate, // Format: dd/mm/yyyy (e.g., '27/06/2025')
  //       end_date: endDate, // Format: dd/mm/yyyy (e.g., '27/06/2025')
  //       cmd,
  //       subclass: subclass || "", // Optional
  //       paxname: paxname || "", // Optional
  //     });

  //     // Full URL with encoded parameters
  //     const url = `${baseUrl}?${queryParams.toString()}`;

  //     try {
  //       // Make the GET request
  //       const #response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       // Check if response is OK
  //       // if (!response.ok) {
  //       //     throw new Error(`HTTP error! Status: ${response.status}`);
  //       // }

  //       // Parse JSON response
  //       const result = await response.json();

  //       // Handle the response
  //       if (result.success) {
  //         console.log("Success! Retrieved services:", result.data);
  //         return result.data; // Array of service objects
  //       } else {
  //         console.log("API Error:", result.error);
  //         // throw new Error(result.error);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching data from NCCGEST API:", error.message);
  //       throw error;
  //     }
  //   }
  // // ok4kcc0os0w0g0gw8ss4gskk84cocksss8wc4w88c8cksowkkk8g4g4cw4s4sssk
  //   const test = async () => {
  //     const token =
  //       "ok4kcc0os0w0g0gw8ss4gskk84cocksss8wc4w88c8cksowkkk8g4g4cw4s4sssk"; // Replace with your actual token
  //     const startDate = "27/06/2025";
  //     const endDate = "27/06/2025";
  //     const subclass = ""; // Optional: specify cost center or service code
  //     const paxname = ""; // Optional: passenger name

  //     try {
  //       const services = await testNccgestReadData(
  //         token,
  //         startDate,
  //         endDate,
  //         subclass,
  //         paxname
  //       );
  //       // Process the services data
  //       console.log(services);
  //       // services.forEach(service => {
  //       //     console.log(`Service ID: ${service.id}, Date: ${service.date}, Pickup: ${service.pickup_address}, Status: ${service.status}`);
  //       // });
  //     } catch (error) {
  //       console.log("Failed to retrieve services:", error.message);
  //     }#
  //   };

  //   useEffect(() => {
  //     test();
  //   }, []);
  const toggle = (index) => {
    const ans = document.querySelectorAll(".ans");
    ans[index].classList.toggle("active");

    const faq = document.querySelectorAll(".q-wrapper .q");
    faq[index].classList.toggle("active");

    // Announce to screen readers
    const isExpanded = ans[index].classList.contains("active");
    const questionText = faq[index].querySelector("h3")?.textContent || "";
    announceToScreenReader(
      `${questionText} ${isExpanded ? "expanded" : "collapsed"}`
    );
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
  // return (
  //   <>
  //     <section className="header">
  //       <div className="slider-container">
  //         <Slider {...settings}>
  //           <CustomSlide index={1} />
  //           <CustomSlide index={2} />
  //           <CustomSlide index={3} />
  //         </Slider>
  //       </div>
  //     </section>
  //     <Form />
  //     <section className="about" id="about">
  //       <div className="left">
  //         <h2 data-aos="fade-DOWN">About us</h2>
  //         <h1 data-aos="fade-right">Italy Transfers</h1>
  //         <div className="icons">
  //           <div className="icon" data-aos="fade-right">
  //             <CiMoneyBill />
  //             <h3>
  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //               eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //             </h3>
  //           </div>
  //           <div className="icon" data-aos="fade-right">
  //             <PiSteeringWheel />
  //             <h3>
  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //               eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //             </h3>
  //           </div>
  //         </div>
  //         <p data-aos="fade-right">
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </p>
  //         <div className="button main" data-aos="fade-down">
  //           <Link to="/">asd</Link>
  //         </div>
  //       </div>
  //       <div className="right">
  //         <img
  //           data-aos="fade-left"
  //           src={require("../assets/images/about1.webp")}
  //           alt=""
  //           className="img img1"
  //         />
  //         <div className="img img2" data-aos="fade-right">
  //           <h1 data-aos="fade-up" data-aos-delay="50">
  //             10+
  //           </h1>
  //           <h2 data-aos="fade-up" data-aos-delay="50">
  //             Years of experience
  //           </h2>
  //         </div>{" "}
  //         <img
  //           src={require("../assets/images/about2.webp")}
  //           alt=""
  //           data-aos="fade-right"
  //           className="img img3"
  //         />
  //       </div>
  //     </section>
  //     <Contact />
  //     <section className="services" id="services">
  //       <h2 data-aos="fade-down">Our services</h2>
  //       <h1 data-aos="fade-down">Best service for you</h1>
  //       <p data-aos="fade-down">
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //         eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //       </p>
  //       <div className="slider-container" data-aos="fade-down">
  //         <Slider {...settings2}>
  //           <CustomSlide2
  //             index={1}
  //             img={require("../assets/images/sedan.png")}
  //           />
  //           <CustomSlide2
  //             index={2}
  //             img={require("../assets/images/v_class.png")}
  //           />
  //           <CustomSlide2
  //             index={3}
  //             img={require("../assets/images/vito.png")}
  //           />
  //           <CustomSlide2
  //             index={4}
  //             img={require("../assets/images/sedan.png")}
  //           />
  //           <CustomSlide2
  //             index={5}
  //             img={require("../assets/images/v_class.png")}
  //           />
  //           <CustomSlide2
  //             index={6}
  //             img={require("../assets/images/vito.png")}
  //           />
  //         </Slider>
  //       </div>
  //     </section>
  //     <Testimonials />
  //     <section className="faq" id="faq">
  //       <h2 data-aos="fade-left">Some important FAQs</h2>
  //       <div className="row">
  //         <div className="left">
  //           <h1 data-aos="fade-down">Common frequently asked questions</h1>
  //           <p data-aos="fade-down">
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //             eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //           </p>
  //         </div>
  //         <div className="right">
  //           <div className="q-wrapper" data-aos="fade-down">
  //             <div className="q" onClick={() => toggle(0)}>
  //               <h3>Cum pot inchiria o masina?</h3>
  //               <IoIosArrowDown />
  //             </div>
  //             <div className="ans">
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                 iste tenetur commodi modi laboriosam blanditiis dolore.
  //                 Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                 adipisci possimus numquam voluptatem vel hic!
  //               </p>
  //             </div>
  //           </div>
  //           <div className="q-wrapper" data-aos="fade-down">
  //             <div className="q" onClick={() => toggle(1)}>
  //               <h3>Cum pot inchiria o masina?</h3>
  //               {/* <IoIosArrowUp /> */}
  //               <IoIosArrowDown />
  //             </div>
  //             <div className="ans">
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                 iste tenetur commodi modi laboriosam blanditiis dolore.
  //                 Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                 adipisci possimus numquam voluptatem vel hic!
  //               </p>
  //             </div>
  //           </div>
  //           <div className="q-wrapper" data-aos="fade-down">
  //             <div className="q" onClick={() => toggle(2)}>
  //               <h3>Cum pot inchiria o masina?</h3>
  //               {/* <IoIosArrowUp /> */}
  //               <IoIosArrowDown />
  //             </div>
  //             <div className="ans">
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                 iste tenetur commodi modi laboriosam blanditiis dolore.
  //                 Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                 adipisci possimus numquam voluptatem vel hic!
  //               </p>
  //             </div>
  //           </div>
  //           <div className="q-wrapper" data-aos="fade-down">
  //             <div className="q" onClick={() => toggle(3)}>
  //               <h3>Cum pot inchiria o masina?</h3>
  //               {/* <IoIosArrowUp /> */}
  //               <IoIosArrowDown />
  //             </div>
  //             <div className="ans">
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                 iste tenetur commodi modi laboriosam blanditiis dolore.
  //                 Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                 adipisci possimus numquam voluptatem vel hic!
  //               </p>
  //             </div>
  //           </div>
  //           <div className="q-wrapper" data-aos="fade-down">
  //             <div className="q" onClick={() => toggle(4)}>
  //               <h3>Cum pot inchiria o masina?</h3>
  //               {/* <IoIosArrowUp /> */}
  //               <IoIosArrowDown />
  //             </div>
  //             <div className="ans">
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                 iste tenetur commodi modi laboriosam blanditiis dolore.
  //                 Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                 adipisci possimus numquam voluptatem vel hic!
  //               </p>
  //             </div>
  //           </div>
  //           <div className="q-wrapper" data-aos="fade-down">
  //             <div className="q" onClick={() => toggle(5)}>
  //               <h3>Cum pot inchiria o masina?</h3>
  //               <IoIosArrowDown />
  //             </div>
  //             <div className="ans">
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                 iste tenetur commodi modi laboriosam blanditiis dolore.
  //                 Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                 adipisci possimus numquam voluptatem vel hic!
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </>
  // );
  //  return (
  //    <>

  //       <section className="header">
  //         <div className="slider-container">
  //           <Slider {...settings}>
  //             <CustomSlide index={1} />
  //             <CustomSlide index={2} />
  //             <CustomSlide index={3} />
  //           </Slider>
  //         </div>
  //      </section>
  //      <Form/>
  //       <section className="about" id="about">
  //         <div className="left">
  //           <h2>About Us</h2>
  //           <h1>ITALY TRANSFERS</h1>
  //           <div className="icons">
  //             <div className="icon">
  //               <CiMoneyBill />
  //               <h3>Lorem ipsum dolor</h3>
  //             </div>
  //             <div className="icon">
  //               <PiSteeringWheel />
  //               <h3>Lorem ipsum dolor sit amet</h3>
  //             </div>
  //           </div>
  //           <p>
  //             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
  //             corrupti molestias voluptatum, facere aliquam fugiat quos magni,
  //             veritatis enim labore illo accusantium optio? Impedit recusandae
  //             aliquid, dolor consequuntur fuga architecto. Lorem ipsum dolor sit
  //             amet, consectetur adipisicing elit. Ipsa, voluptatibus minus aperiam
  //             deserunt, facilis eligendi earum eos explicabo repellendus dolores
  //             illum? Provident eos pariatur temporibus totam non aliquam
  //             voluptates quos!
  //           </p>
  //           <div className="button main">
  //             <Link to="/">Home</Link>
  //           </div>
  //         </div>
  //         <div className="right">
  //           <img
  //             src={require("../assets/images/about1.webp")}
  //             alt=""
  //             className="img img1"
  //           />
  //           <div className="img img2">
  //             <h1>10+</h1>
  //             <h2>Years of experience</h2>
  //           </div>{" "}
  //           <img
  //             src={require("../assets/images/about2.webp")}
  //             alt=""
  //             className="img img3"
  //           />
  //         </div>
  //       </section>
  //       <Contact />
  //       <section className="services" id="services">
  //         <h2>Our Services</h2>
  //         <h1>The Best Service For You</h1>
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod
  //           massa in cursus cursus. Sed eget lectus sodales, elementum magna non,
  //           luctus magna. Nam non porta turpis. Maecenas at tincidunt lacus. Nam
  //           ornare tortor eu feugiat tempus. Pellentesque convallis mollis
  //           blandit. Vivamus at nulla velit. In pellentesque libero sed ligula
  //           dignissim varius.
  //         </p>
  //         <div className="slider-container">
  //           <Slider {...settings2}>
  //             <CustomSlide2 index={1}img={require("../assets/images/vito.png")} />
  //             <CustomSlide2 index={2}img={require("../assets/images/v_class.png")} />
  //             <CustomSlide2 index={3}img={require("../assets/images/sedan.png")} />
  //           </Slider>
  //         </div>
  //       </section>
  //       <Testimonials />
  //       <section className="faq" id="faq">
  //         <h2>Some Important FAQ's</h2>
  //         <div className="row">
  //           <div className="left">
  //             <h1>Common Frequently Asked Questions?</h1>
  //             <p>
  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
  //               euismod massa in cursus cursus. Sed eget lectus sodales, elementum
  //               magna non, luctus magna. Nam non porta turpis. Maecenas at
  //               tincidunt lacus. Nam ornare tortor eu feugiat tempus. Pellentesque
  //               convallis mollis blandit. Vivamus at nulla velit. In pellentesque
  //               libero sed ligula dignissim varius. Nam non porta turpis. Maecenas
  //               at tincidunt lacus. Nam ornare tortor eu feugiat tempus.
  //               Pellentesque convallis mollis blandit. Vivamus at nulla velit. In
  //               pellentesque libero sed ligula dignissim varius.
  //             </p>
  //           </div>
  //           <div className="right">
  //             <div className="q-wrapper">
  //               <div className="q" onClick={() => toggle(0)}>
  //                 <h3>Q: Cum pot sa inchiriez o masina?</h3>
  //                 {/* <IoIosArrowUp /> */}
  //                 <IoIosArrowDown />
  //               </div>
  //               <div className="ans">
  //                 <p>
  //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                   iste tenetur commodi modi laboriosam blanditiis dolore.
  //                   Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                   adipisci possimus numquam voluptatem vel hic!
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="q-wrapper">
  //               <div className="q" onClick={() => toggle(1)}>
  //                 <h3>Q: Cum pot sa inchiriez o masina?</h3>
  //                 {/* <IoIosArrowUp /> */}
  //                 <IoIosArrowDown />
  //               </div>
  //               <div className="ans">
  //                 <p>
  //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                   iste tenetur commodi modi laboriosam blanditiis dolore.
  //                   Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                   adipisci possimus numquam voluptatem vel hic!
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="q-wrapper">
  //               <div className="q" onClick={() => toggle(2)}>
  //                 <h3>Q: Cum pot sa inchiriez o masina?</h3>
  //                 {/* <IoIosArrowUp /> */}
  //                 <IoIosArrowDown />
  //               </div>
  //               <div className="ans">
  //                 <p>
  //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                   iste tenetur commodi modi laboriosam blanditiis dolore.
  //                   Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                   adipisci possimus numquam voluptatem vel hic!
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="q-wrapper">
  //               <div className="q" onClick={() => toggle(3)}>
  //                 <h3>Q: Cum pot sa inchiriez o masina?</h3>
  //                 {/* <IoIosArrowUp /> */}
  //                 <IoIosArrowDown />
  //               </div>
  //               <div className="ans">
  //                 <p>
  //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                   iste tenetur commodi modi laboriosam blanditiis dolore.
  //                   Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                   adipisci possimus numquam voluptatem vel hic!
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="q-wrapper">
  //               <div className="q" onClick={() => toggle(4)}>
  //                 <h3>Q: Cum pot sa inchiriez o masina?</h3>
  //                 {/* <IoIosArrowUp /> */}
  //                 <IoIosArrowDown />
  //               </div>
  //               <div className="ans">
  //                 <p>
  //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                   iste tenetur commodi modi laboriosam blanditiis dolore.
  //                   Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                   adipisci possimus numquam voluptatem vel hic!
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="q-wrapper">
  //               <div className="q" onClick={() => toggle(5)}>
  //                 <h3>Q: Cum pot sa inchiriez o masina?</h3>
  //                 <IoIosArrowDown />
  //               </div>
  //               <div className="ans">
  //                 <p>
  //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
  //                   iste tenetur commodi modi laboriosam blanditiis dolore.
  //                   Voluptas natus harum quos. Minima accusamus eligendi eveniet
  //                   adipisci possimus numquam voluptatem vel hic!
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     </>
  //   );

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
