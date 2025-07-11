import React, { useEffect, useState } from "react";
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

function Home() {
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
  //       const response = await fetch(url, {
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
  //     }
  //   };

  //   useEffect(() => {
  //     test();
  //   }, []);
  const toggle = (index) => {
    const ans = document.querySelectorAll(".ans");
    ans[index].classList.toggle("active");

    const faq = document.querySelectorAll(".q-wrapper .q");
    faq[index].classList.toggle("active");
  };

  function CustomSlide(props) {
    const { index, ...otherProps } = props;
    return (
      <div className={`custom custom-${index}`} {...otherProps}>
        <h1>Italy 111Transfers</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vitae
          repudiandae corporis nobis totam assumenda tempora distinctio, magni,
          nemo odit ex facilis sint sed beatae temporibus commodi voluptatem
          vero quaerat.
        </p>
        <div className="buttons">
          <div className="button main">
            <a href="#about">See more</a>
          </div>
          <div className="button second">
            <Link to="/form">See cars</Link>
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
    const { index, ...otherProps } = props;
    return (
      <div className="services_slide" {...otherProps}>
        <img
          src={require("../assets/images/pexels-vladalex94-1402787 1.png")}
          alt=""
        />
        <h1>Title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vitae
          repudiandae corporis nobis totam assumenda tempora distinctio, magni,
          nemo odit ex facilis sint sed beatae temporibus commodi voluptatem
          vero quaerat.
        </p>
        <div className="button second">
          <Link to="/">Home</Link>
        </div>
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
          <h2>About Us</h2>
          <h1>ITALY TRANSFERS</h1>
          <div className="icons">
            <div className="icon">
              <CiMoneyBill />
              <h3>Lorem ipsum dolor</h3>
            </div>
            <div className="icon">
              <PiSteeringWheel />
              <h3>Lorem ipsum dolor sit amet</h3>
            </div>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            corrupti molestias voluptatum, facere aliquam fugiat quos magni,
            veritatis enim labore illo accusantium optio? Impedit recusandae
            aliquid, dolor consequuntur fuga architecto. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Ipsa, voluptatibus minus aperiam
            deserunt, facilis eligendi earum eos explicabo repellendus dolores
            illum? Provident eos pariatur temporibus totam non aliquam
            voluptates quos!
          </p>
          <div className="button main">
            <Link to="/">Home</Link>
          </div>
        </div>
        <div className="right">
          <img
            src={require("../assets/images/about1.webp")}
            alt=""
            className="img img1"
          />
          <div className="img img2">
            <h1>10+</h1>
            <h2>Years of experience</h2>
          </div>{" "}
          <img
            src={require("../assets/images/about2.webp")}
            alt=""
            className="img img3"
          />
        </div>
      </section>
      <Contact />
      <section className="services" id="services">
        <h2>Our Services</h2>
        <h1>The Best Service For You</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod
          massa in cursus cursus. Sed eget lectus sodales, elementum magna non,
          luctus magna. Nam non porta turpis. Maecenas at tincidunt lacus. Nam
          ornare tortor eu feugiat tempus. Pellentesque convallis mollis
          blandit. Vivamus at nulla velit. In pellentesque libero sed ligula
          dignissim varius.
        </p>
        <div className="slider-container">
          <Slider {...settings2}>
            <CustomSlide2 index={1} />
            <CustomSlide2 index={2} />
            <CustomSlide2 index={3} />
            <CustomSlide2 index={4} />
            <CustomSlide2 index={5} />
            <CustomSlide2 index={6} />
          </Slider>
        </div>
      </section>
      <Testimonials />
      <section className="faq" id="faq">
        <h2>Some Important FAQ's</h2>
        <div className="row">
          <div className="left">
            <h1>Common Frequently Asked Questions?</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              euismod massa in cursus cursus. Sed eget lectus sodales, elementum
              magna non, luctus magna. Nam non porta turpis. Maecenas at
              tincidunt lacus. Nam ornare tortor eu feugiat tempus. Pellentesque
              convallis mollis blandit. Vivamus at nulla velit. In pellentesque
              libero sed ligula dignissim varius. Nam non porta turpis. Maecenas
              at tincidunt lacus. Nam ornare tortor eu feugiat tempus.
              Pellentesque convallis mollis blandit. Vivamus at nulla velit. In
              pellentesque libero sed ligula dignissim varius.
            </p>
          </div>
          <div className="right">
            <div className="q-wrapper">
              <div className="q" onClick={() => toggle(0)}>
                <h3>Q: Cum pot sa inchiriez o masina?</h3>
                {/* <IoIosArrowUp /> */}
                <IoIosArrowDown />
              </div>
              <div className="ans">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  iste tenetur commodi modi laboriosam blanditiis dolore.
                  Voluptas natus harum quos. Minima accusamus eligendi eveniet
                  adipisci possimus numquam voluptatem vel hic!
                </p>
              </div>
            </div>
            <div className="q-wrapper">
              <div className="q" onClick={() => toggle(1)}>
                <h3>Q: Cum pot sa inchiriez o masina?</h3>
                {/* <IoIosArrowUp /> */}
                <IoIosArrowDown />
              </div>
              <div className="ans">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  iste tenetur commodi modi laboriosam blanditiis dolore.
                  Voluptas natus harum quos. Minima accusamus eligendi eveniet
                  adipisci possimus numquam voluptatem vel hic!
                </p>
              </div>
            </div>
            <div className="q-wrapper">
              <div className="q" onClick={() => toggle(2)}>
                <h3>Q: Cum pot sa inchiriez o masina?</h3>
                {/* <IoIosArrowUp /> */}
                <IoIosArrowDown />
              </div>
              <div className="ans">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  iste tenetur commodi modi laboriosam blanditiis dolore.
                  Voluptas natus harum quos. Minima accusamus eligendi eveniet
                  adipisci possimus numquam voluptatem vel hic!
                </p>
              </div>
            </div>
            <div className="q-wrapper">
              <div className="q" onClick={() => toggle(3)}>
                <h3>Q: Cum pot sa inchiriez o masina?</h3>
                {/* <IoIosArrowUp /> */}
                <IoIosArrowDown />
              </div>
              <div className="ans">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  iste tenetur commodi modi laboriosam blanditiis dolore.
                  Voluptas natus harum quos. Minima accusamus eligendi eveniet
                  adipisci possimus numquam voluptatem vel hic!
                </p>
              </div>
            </div>
            <div className="q-wrapper">
              <div className="q" onClick={() => toggle(4)}>
                <h3>Q: Cum pot sa inchiriez o masina?</h3>
                {/* <IoIosArrowUp /> */}
                <IoIosArrowDown />
              </div>
              <div className="ans">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  iste tenetur commodi modi laboriosam blanditiis dolore.
                  Voluptas natus harum quos. Minima accusamus eligendi eveniet
                  adipisci possimus numquam voluptatem vel hic!
                </p>
              </div>
            </div>
            <div className="q-wrapper">
              <div className="q" onClick={() => toggle(5)}>
                <h3>Q: Cum pot sa inchiriez o masina?</h3>
                <IoIosArrowDown />
              </div>
              <div className="ans">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  iste tenetur commodi modi laboriosam blanditiis dolore.
                  Voluptas natus harum quos. Minima accusamus eligendi eveniet
                  adipisci possimus numquam voluptatem vel hic!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
