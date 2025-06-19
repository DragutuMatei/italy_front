import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { PiSteeringWheel } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Home() {
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
            <Link to="/">Home</Link>
          </div>
          <div className="button second">
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <IoIosArrowForward />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <IoIosArrowBack />
      </div>
    );
  }
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow className="arrow next" />,
    prevArrow: (
      <SamplePrevArrow
        className="arrow prev"
        style={{
          background: "#0e121d",
          position: "relative",
          left: "30px",
          width: 100,
          height: 100,
          display: "flex",
        }}
      />
    ),
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
  function CustomSlide3(props) {
    const { index, ...otherProps } = props;
    return (
      <div className="testimonial_slide">
        <div className="quote">
          <FaQuoteRight />
        </div>
        <div className="row">
          <img
            src={require("../assets/images/pexels-vladalex94-1402787 1.png")}
            alt=""
          />
          <div className="info">
            <h1>Dragutu Matei</h1>
            <h3>Profession</h3>
            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <CiStar />
            </div>
          </div>
        </div>
        <div className="row sec">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vitae
            repudiandae corporis nobis totam assumenda tempora distinctio,
            magni, nemo odit ex facilis sint sed beatae temporibus commodi
            voluptatem vero quaerat.
          </p>
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
  const settings3 = {
    infinite: true,
    speed: 200,
    // autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      // {
      //   breakpoint: 1779,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //     infinite: true,
      //   },
      // },
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },{
        breakpoint: 670,
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
            <CustomSlide index={4} />
            <CustomSlide index={5} />
            <CustomSlide index={6} />
          </Slider>
        </div>
      </section>
      <section className="about">
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
            src={require("../assets/images/pexels-vladalex94-1402787 1.png")}
            alt=""
            className="img img1"
          />
          <div className="img img2">
            <h1>10+</h1>
            <h2>Years of experience</h2>
          </div>{" "}
          <img
            src={require("../assets/images/pexels-vladalex94-1402787 1.png")}
            alt=""
            className="img img3"
          />
        </div>
      </section>
      <section className="contact">
        <h2>Contact</h2>

        <div className="row">
          <h1>
            We provide professional car services for our <br /> customers
          </h1>
          <div className="button main">
            <Link to="/">
              Contact <FaLongArrowAltRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="services">
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
      <section className="testimoniale">
        <h2>Testimoniale</h2>
        <div className="row">
          <div className="left">
            <h1>Powerfull Praise Heare From Our Customers</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              euismod massa in cursus cursus. Sed eget lectus sodales, elementum
              magna non, luctus magna. Nam non porta turpis.
            </p>
          </div>
          <div className="right">
            <div className="slider-container">
              <Slider {...settings3}>
                <CustomSlide3 index={1} />
                <CustomSlide3 index={2} />
                <CustomSlide3 index={3} />
                <CustomSlide3 index={4} />
                <CustomSlide3 index={5} />
                <CustomSlide3 index={6} />
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className="faq">
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
