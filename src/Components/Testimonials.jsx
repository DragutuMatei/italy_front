// import React, { useEffect, useState } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { SampleNextArrow, SamplePrevArrow } from "../utils/Arrows";

// import { CiStar } from "react-icons/ci";
// import { FaStar } from "react-icons/fa6";
// import { FaQuoteRight } from "react-icons/fa";
// import { useAuth } from "../utils/AuthContext";
// import AXIOS from "../utils/Axios_config";
// import {
//   toast_error,
//   toast_promise,
//   toast_success,
//   toast_warn,
// } from "./Toasts";

// function Testimonials() {
//   function CustomSlide3(props) {
//     const { index, name, profesie, mesaj, img, rating, ...otherProps } = props;
//     return (
//       <div className="testimonial_slide">
//         <div className="quote">
//           <FaQuoteRight />
//         </div>
//         <div className="row">
//           <img src={img} alt="" />
//           <div className="info">
//             <h1>{name}</h1>
//             <h3>{profesie}</h3>
//             <div className="stars">
//               {[...Array(5)].map((_, i) => {
//                 return (
//                   <span key={i}>
//                     {i < rating ? <FaStar color="#f5b50a" /> : <CiStar />}
//                   </span>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//         <div className="row sec">
//           <p>{mesaj}</p>
//         </div>
//       </div>
//     );
//   }
//   const settings3 = {
//     infinite: true,
//     speed: 200,
//     autoplay: true,
//     slidesToShow:2,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1780,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 1279,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//       {
//         breakpoint: 860,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//       {
//         breakpoint: 670,
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

//   const { user, loading } = useAuth();

//   const [name, setName] = useState("");
//   const [profesie, setProfesie] = useState("");
//   const [mesaj, setMesaj] = useState("");
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(null);

//   const send = async () => {
//     const data = {
//       name,
//       profesie,
//       rating,
//       mesaj,
//       img: user?.photoURL,
//       accept: false,
//       timestamp: Date.now(),
//     };
//     if (name === "" || profesie === "" || mesaj === "") {
//       toast_warn("Completează toate câmpurile!");
//       return;
//     }

//     await toast_promise(AXIOS.post("/testimonials/insert", { data }));
//   };

//   const [data, setData] = useState([]);
//   const getAllByField = async () => {
//     const rasp = await AXIOS.get("/testimonials/getAllByField/accept/true");
//     if (rasp.data.success) {
//       setData(rasp.data.data);
//     }
//   };
//   useEffect(() => {
//     getAllByField();
//   }, []);

//   return (
//     <section className="testimoniale" id="testimoniale">
//       <h2>Testimoniale</h2>
//       <div className="row">
//         <div className="left">
//           <h1>Powerfull Praise Heare From Our Customers</h1>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
//             euismod massa in cursus cursus. Sed eget lectus sodales, elementum
//             magna non, luctus magna. Nam non porta turpis.
//           </p>
//           <div className="form">
//             <input
//               type="text"
//               data-aos="fade-up"
//               placeholder="Nume"
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               data-aos="fade-up"
//               placeholder="Profesie"
//               onChange={(e) => setProfesie(e.target.value)}
//             />
//             <textarea
//               data-aos="fade-up"
//               onChange={(e) => setMesaj(e.target.value)}
//               name=""
//               placeholder="Lasă un mesaj"
//               id=""
//             ></textarea>
//             <div className="rating" onMouseLeave={() => setHover(null)}>
//               {[...Array(5)].map((_, index) => {
//                 const currentStar = index + 1;
//                 return (
//                   <span
//                     data-aos="fade-up"
//                     key={currentStar}
//                     onClick={() => setRating(currentStar)}
//                     onMouseEnter={() => setHover(currentStar)}
//                     onMouseLeave={() => setHover(null)}
//                   >
//                     {currentStar <= (hover || rating) ? (
//                       <FaStar color="#f5b50a" />
//                     ) : (
//                       <CiStar />
//                     )}
//                   </span>
//                 );
//               })}
//             </div>
//             <button className="button main" data-aos="fade-up" onClick={send}>
//               <h3>Lasă un review</h3>
//             </button>
//           </div>
//         </div>
//         <div className="right" data-aos="fade-left">
//           <div className="slider-container">
//             <Slider {...settings3}>
//               {data &&
//                 data.map((item, index) => {
//                   console.log(index, item);
//                   return (
//                     <CustomSlide3
//                       key={index}
//                       index={index}
//                       name={item.name}
//                       profesie={item.profesie}
//                       mesaj={item.mesaj}
//                       img={item.img}
//                       rating={item.rating}
//                     />
//                   );
//                 })}
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Testimonials;

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../utils/Arrows";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";
import AXIOS from "../utils/Axios_config";
import { toast_promise, toast_warn } from "./Toasts";

import { useTranslation } from "react-i18next";

function Testimonials() {
  const { t } = useTranslation();

  function CustomSlide3(props) {
    const { index, name, profesie, mesaj, img, rating, ...otherProps } = props;

    return (
      <div className="testimonial_slide">
        <div className="quote">
          <FaQuoteRight />
        </div>
        <div className="row">
          <img src={img ? img : require("../assets/images/user.png")} alt="" />
          <div className="info">
            <h1>{name}</h1>
            <h3>{profesie}</h3>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < rating ? <FaStar color="#f5b50a" /> : <CiStar />}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="row sec">
          <p>{mesaj}</p>
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
      { breakpoint: 1780, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 1279,
        settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 },
      },
      {
        breakpoint: 860,
        settings: { slidesToShow: 2, slidesToScroll: 1, initialSlide: 1 },
      },
      {
        breakpoint: 670,
        settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 },
      },
    ],
    nextArrow: <SampleNextArrow className="arrow next" />,
    prevArrow: <SamplePrevArrow className="arrow prev" />,
  };

  const { user } = useAuth();

  const [name, setName] = useState("");
  const [profesie, setProfesie] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const send = async () => {
    const data = {
      name,
      profesie,
      rating,
      mesaj,
      img: user?.photoURL,
      accept: false,
      timestamp: Date.now(),
    };

    if (name === "" || profesie === "" || mesaj === "") {
      toast_warn(t("WarningIncomplete"));
      return;
    }

    await toast_promise(AXIOS.post("/testimonials/insert", { data }));
  };

  const [data, setData] = useState([]);
  const getAllByField = async () => {
    const rasp = await AXIOS.get("/testimonials/getAllByField/accept/true");
    if (rasp.data.success) {
      setData(rasp.data.data);
    }
  };

  useEffect(() => {
    getAllByField();
  }, []);

  return (
    <section className="testimoniale" id="testimoniale">
      <h2>{t("Testimonials")}</h2>
      <div className="row">
        <div className="left">
          <h1>{t("TestimonialsTitle")}</h1>
          <p>{t("TestimonialsDescription")}</p>
          <div className="form">
            <input
              type="text"
              data-aos="fade-up"
              placeholder={t("NamePlaceholder")}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              data-aos="fade-up"
              placeholder={t("ProfessionPlaceholder")}
              onChange={(e) => setProfesie(e.target.value)}
            />
            <textarea
              data-aos="fade-up"
              onChange={(e) => setMesaj(e.target.value)}
              placeholder={t("MessagePlaceholder")}
            ></textarea>
            <div className="rating" onMouseLeave={() => setHover(null)}>
              {[...Array(5)].map((_, index) => {
                const currentStar = index + 1;
                return (
                  <span
                    data-aos="fade-up"
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
            <button className="button main" data-aos="fade-up" onClick={send}>
              <h3>{t("LeaveReview")}</h3>
            </button>
          </div>
        </div>
        <div className="right" data-aos="fade-left">
          <div className="slider-container">
            <Slider {...settings3}>
              {data &&
                data.map((item, index) => (
                  <CustomSlide3
                    key={index}
                    index={index}
                    name={item.name}
                    profesie={item.profesie}
                    mesaj={item.mesaj}
                    img={item.img}
                    rating={item.rating}
                  />
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
