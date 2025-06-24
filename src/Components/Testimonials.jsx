import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../utils/Arrows";

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa";

function Testimonials() {
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
  const settings3 = {
    infinite: true,
    speed: 200,
    autoplay: true,
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
      },
      {
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

  const [name, setName] = useState("");
  const [profesie, setProfesie] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const send = async () => {
    console.log({
      name,
      profesie,
      rating,
      mesaj,
    });
  };

  return (
    <section className="testimoniale" id="testimoniale">
      <h2>Testimoniale</h2>
      <div className="row">
        <div className="left">
          <h1>Powerfull Praise Heare From Our Customers</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            euismod massa in cursus cursus. Sed eget lectus sodales, elementum
            magna non, luctus magna. Nam non porta turpis.
          </p>
          <div className="form">
            <input type="text" placeholder="Nume" />
            <input type="text" placeholder="Profesie" />
            <textarea name="" placeholder="Lasa un mesaj" id=""></textarea>
            <div className="rating" onMouseLeave={() => setHover(null)}>
              {[...Array(5)].map((_, index) => {
                const currentStar = index + 1;
                return (
                  <span
                    key={currentStar}
                    onClick={() => setRating(currentStar)}
                    onMouseEnter={() => setHover(currentStar)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {currentStar <= (hover || rating) ? (
                      <FaStar color="#f5b50a" />
                    ) : (
                      <CiStar />
                    )}
                  </span>
                );
              })}
            </div>
            <button className="button main" onClick={send}>
              <h3>Lasa un review</h3>
            </button>
          </div>
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
  );
}

export default Testimonials;
