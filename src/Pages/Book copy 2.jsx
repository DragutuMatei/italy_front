import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { FaSuitcaseRolling } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import useWindowSize from "../utils/useWindowSize";
import { useAuth } from "../utils/AuthContext";
import PayPalCardFields from "../Components/Paypal";
import { useJsApiLoader } from "@react-google-maps/api";
import AXIOS from "../utils/Axios_config";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { toast_error, toast_success, toast_warn } from "../Components/Toasts";

const pricingData = [
  {
    type: "Sedan",
    img: require("../assets/images/sedan.png"),
    baseFare: 70.0,
    baseKm: 10,
    pers: 3,
    bags: 2,
    hourlyRate: 55,
    rates: [
      { from: 10, to: 50, price: 1.5 },
      { from: 50, to: 100, price: 3.0 },
      { from: 100, to: 200, price: 2.8 },
      { from: 200, to: 500, price: 1.8 },
    ],
  },
  {
    type: "Private Van (V CLASS)",
    img: require("../assets/images/v_class.png"),
    baseFare: 70.0,
    pers: 6,
    bags: 6,
    baseKm: 10,
    hourlyRate: 70,
    rates: [
      { from: 10, to: 50, price: 2.5 },
      { from: 50, to: 100, price: 3.5 },
      { from: 100, to: 200, price: 3.2 },
      { from: 200, to: 500, price: 2.1 },
    ],
  },
  {
    type: "Private Van (VITO)",
    img: require("../assets/images/vito.png"),
    baseFare: 80.0,
    pers: 8,
    bags: 6,
    baseKm: 10,
    hourlyRate: 80,
    rates: [
      { from: 10, to: 50, price: 3.0 },
      { from: 50, to: 100, price: 4.0 },
      { from: 100, to: 200, price: 4.0 },
      { from: 200, to: 500, price: 2.8 },
    ],
  },
];
function Book() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [searchParams] = useSearchParams();
  const destination = JSON.parse(searchParams.get("optional"));
  const origin = JSON.parse(searchParams.get("origin"));
  const dist = JSON.parse(searchParams.get("dist"));
  const option = searchParams.get("option").replaceAll('"', "");
  const date = searchParams.get("date").replaceAll('"', "");
  const time = searchParams.get("time").replaceAll('"', "");
  const [selectedCar, setSelectedCar] = useState({});
  const [checked2, setChecked2] = useState("me");
  const [checked, setChecked] = useState("");
  const [some, setSome] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
  });
  const [notes, setNotes] = useState("");
  const [code, setCod] = useState("");

  const [payFull, setPayFull] = useState(true);
  const { width } = useWindowSize();

  const [is24h, setIs24h] = useState(
    isLessThan24Hours(
      searchParams.get("date").replaceAll('"', ""),
      searchParams.get("time").replaceAll('"', "")
    )
  );

  const addTime = (time1, time2) => {
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);

    let totalOre = h1 + h2;
    let totalMin = m1 + m2;

    if (totalMin >= 60) {
      totalOre += Math.floor(totalMin / 60);
      totalMin = totalMin % 60;
    }

    const minFormatat = totalMin.toString().padStart(2, "0");
    return `${totalOre}:${minFormatat}`;
  };
  function calculateArrivalTime(departureDate, departureTime, travelDuration) {
    // Parse departure date and time
    const [year, month, day] = departureDate.split("-").map(Number);
    const [hours, minutes] = departureTime.split(":").map(Number);

    // Create Date object (month is 0-based in JS, so subtract 1)
    const departure = new Date(year, month - 1, day, hours, minutes);

    // Parse travel duration
    const [travelHours, travelMinutes] = travelDuration.split(":").map(Number);

    // Add travel duration
    departure.setHours(departure.getHours() + travelHours);
    departure.setMinutes(departure.getMinutes() + travelMinutes);

    // Format the result
    const arrivalYear = departure.getFullYear();
    const arrivalMonth = String(departure.getMonth() + 1).padStart(2, "0");
    const arrivalDay = String(departure.getDate()).padStart(2, "0");
    const arrivalHours = String(departure.getHours()).padStart(2, "0");
    const arrivalMinutes = String(departure.getMinutes()).padStart(2, "0");

    return `${arrivalYear}-${arrivalMonth}-${arrivalDay} - ${arrivalHours}:${arrivalMinutes}`;
  }
  const calculateTripPrice2 = (vehicleType, option = "km") => {
    const distanceKm = Number(dist.km); // Ensure distance is a number

    // Validate vehicle type
    const vehicle = pricingData.find((v) => v.type === vehicleType);
    if (!vehicle) {
      return { error: "Invalid vehicle type" };
    }

    // Validate distance
    if (isNaN(distanceKm) || distanceKm < 0) {
      return { error: "Invalid distance" };
    }

    // Case 1: Hourly pricing
    if (option === "hour") {
      const hours = Number(destination);
      if (isNaN(hours) || hours <= 0) {
        return { error: "Invalid hours for hourly pricing" };
      }
      const total = vehicle.hourlyRate * hours;
      return {
        total: parseFloat(total.toFixed(2)),
        option,
        date,
        time,
      };
    }

    // Case 2: Per kilometer pricing
    // Remove or adjust the 500 km cap if needed
    const cappedDistance = distanceKm; // Comment out capping for testing: Math.min(distanceKm, 500);

    if (cappedDistance <= vehicle.baseKm) {
      // console.log(
      //   `Base case: Distance ${cappedDistance} km <= ${vehicle.baseKm} km, Base Fare: ${vehicle.baseFare}`
      // );
      return {
        total: vehicle.baseFare,
        km: distanceKm,
        option,
        date,
        time,
      };
    }

    let total = vehicle.baseFare;
    let remainingKm = cappedDistance - vehicle.baseKm;

    // console.log(
    //   `Calculating for ${remainingKm} km beyond base ${vehicle.baseKm} km`
    // );

    for (const rate of vehicle.rates) {
      if (remainingKm <= 0) break;

      const kmInRange = Math.min(remainingKm, rate.to - rate.from);
      const cost = kmInRange * rate.price;
      total += cost;

      // console.log(
      //   `Range ${rate.from}-${rate.to} km: ${kmInRange} km * ${rate.price}/km = ${cost}, Total so far: ${total}`
      // );

      remainingKm -= kmInRange;
    }

    // Handle any remaining distance beyond the last rate range (e.g., >500 km)
    if (remainingKm > 0) {
      const lastRate = vehicle.rates[vehicle.rates.length - 1].price;
      total += remainingKm * lastRate;
      // console.log(
      //   `Remaining ${remainingKm} km at ${lastRate}/km = ${
      //     remainingKm * lastRate
      //   }, Final Total: ${total}`
      // );
    }

    return {
      total: parseFloat(total.toFixed(2)),
      km: distanceKm,
      option,
      date,
      time,
    };
  };

  const calculateTripPrice = (vehicleType) => {
    const distanceKm = dist.km;
    const ore = dist.ore.full;

    if (typeof distanceKm !== "number" || distanceKm < 0) {
      return { error: "Invalid distance" };
    }
    if (!pricingData.find((v) => v.type === vehicleType)) {
      return { error: "Invalid vehicle type" };
    }

    // Cap distance at 500 km
    const cappedDistance = Math.min(distanceKm, 500);
    const vehicle = pricingData.find((v) => v.type === vehicleType);

    // If distance is within base km, return base fare
    if (cappedDistance <= vehicle.baseKm) {
      return {
        total: vehicle.baseFare,
        km: distanceKm,
        ore,
        option,
        date,
        time,
      };
    }

    // Calculate additional cost beyond base km
    let total = vehicle.baseFare;
    let remainingKm = cappedDistance - vehicle.baseKm;

    for (const rate of vehicle.rates) {
      if (remainingKm <= 0) break;
      const kmInRange = Math.min(remainingKm, rate.to - rate.from);
      total += kmInRange * rate.price;
      remainingKm -= kmInRange;
    }

    return {
      total: parseFloat(total.toFixed(2)),
      km: distanceKm,
      ore,
      option,
      date,
      time,
    };
  };
  //console.log(selectedCar);

  const select = (car, results, index) => {
    const cars = document.querySelectorAll(".masina");
    if (cars[index].classList.contains("active")) {
      cars[index].classList.remove("active");
      setSelectedCar({});
      setComplete((old) => ({ ...old, ["0"]: false }));
    } else {
      cars.forEach((car) => {
        if (car.classList.contains("active")) {
          car.classList.remove("active");
        }
      });
      cars[index].classList.add("active");
      setSelectedCar({ ...car, results });
      setComplete((old) => ({ ...old, ["0"]: true }));
    }
  };

  const steps = [
    "Service Class",
    "Pickup Info",
    "Log in",
    "Payment",
    "Checkout",
  ];
  const [tab, setTab] = useState(0);
  const isEmpty = (val) => {
    return JSON.stringify(val) === "{}";
  };

  const [complete, setComplete] = useState({
    0: false,
    1: false,
    2: user ? true : false,
    3: false,
    4: false,
  });

  const next = (step, pas = false) => {
    //   console.log(complete, tab);
    if (
      tab + step < 5 &&
      tab + step >= 0 &&
      (complete[tab] || step < 0 || pas)
    ) {
      if (tab + step == 3 && is24h) {
        setTab((old) => old + step + 1);
        return;
      }
      window.scroll(0, 0);
      setTab((old) => old + step);
    } else {
      toast_warn("Completeaza toate optiunile!");
    }
  };

  const [payrasp, setPayRasp] = useState({});
  // console.log(payrasp);
  useEffect(() => {
    emailjs.init({
      publicKey: process.env.REACT_APP_EMAILJS,
      blockHeadless: true,
      blockList: {},
      limitRate: {
        id: "app",
        throttle: 1000,
      },
    });
  }, []);
  useEffect(() => {
    if (user) {
      setComplete((old) => ({ ...old, [2]: true }));
    }
  }, [, user]);
  useEffect(() => {
    if (option !== "hour") t();
    // }
    window.scroll(0, 0);
  }, [, tab]);
  function isLessThan24Hours(dateStr, timeStr) {
    const targetDate = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();

    const diffMs = targetDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours > 0 && diffHours < 24;
  }
  // console.log(payFull);
  const autofocus = (key, pas = 1, ch = false) => {
    if (pas == 2) {
      if (key == "me") {
        if (ch) {
          setPayFull(true);
        } else {
          setPayFull(false);
        }
      } else {
        if (ch) {
          setPayFull(false);
        } else {
          setPayFull(true);
        }
      }
    }
    setChecked(key);
    const checks = document.querySelectorAll("input[type=radio]");
    if (key === "some") {
      checks[0].checked = false;
      checks[1].checked = true;
    } else {
      checks[1].checked = false;
      checks[0].checked = true;
    }
  };
  const autofocus3 = (key, pas = 1, ch = false) => {
    if (pas == 2) {
      setPayFull(ch);
      // if (key == "me") {
      //   if (ch) {
      //     setPayFull(true);
      //   } else {
      //     setPayFull(false);
      //   }
      // } else {
      //   if (ch) {
      //     setPayFull(false);
      //   } else {
      //     setPayFull(true);
      //   }
      // }
    }
    setChecked2(key);
    const checks = document.querySelectorAll("input[type=radio].price");
    if (key === "some") {
      checks[0].checked = false;
      checks[1].checked = true;
    } else {
      checks[1].checked = false;
      checks[0].checked = true;
    }
  };
  const inputRefssss = useRef({});

  // Funcție pentru a seta ref-ul pentru fiecare câmp
  const setRef = (key) => (el) => {
    if (el) {
      inputRefssss.current[key] = el;
    }
  };

  const autofocus2 = (key) => {
    const el = inputRefssss.current[key];
    if (el) {
      el.focus();
      el.click();
    }
  };
  const save = () => {
    if (checked !== "" && some !== "" && code !== "" && notes !== "") {
      if (checked === "some" && Object.values(some).some((v) => v.length < 1)) {
        toast_warn("Completeaza toate campurile!");
      }

      // if (e.target.value.length < 1) {
      //   setComplete((old) => ({ ...old, [1]: false }));
      // }
      else {
        setComplete((old) => ({ ...old, [1]: true }));
        next(1, true);
      }
    } else {
      toast_warn("Completeaza toate campurile!");
    }
    // console.log(checked, some, notes, code);
  };

  const [img, setImg] = useState("");
  const t = async () => {
    const r = await getRouteImage();
    if (!r.error) {
      setImg(r.imageUrl);
    } else {
      // console.log(r.error);
    }
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your Google Maps API key
    libraries: ["places"],
  });
  const getRouteImage = async () => {
    if (!origin || !destination) {
      return { error: "Please select both origin and destination." };
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const route = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: { lat: origin.lat, lng: origin.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              resolve(response);
            } else {
              reject("Error fetching route: " + status);
            }
          }
        );
      });

      const polyline = route.routes[0].overview_polyline;
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Replace with your API key
      const mapUrl =
        `https://maps.googleapis.com/maps/api/staticmap?` +
        `size=1200x200` +
        `&maptype=roadmap` +
        `&path=enc:${encodeURIComponent(polyline)}` +
        `&markers=color:red|label:A|${origin.lat},${origin.lng}` +
        `&markers=color:blue|label:B|${destination.lat},${destination.lng}` +
        `&key=${apiKey}`;

      return { imageUrl: mapUrl };
    } catch (error) {
      return { error: "Failed to generate route image: " + error.message };
    }
  };

  const [finalModif, setFinalModif] = useState({
    // name: user && user.displayName,
    // email: user && user.email,
    // notes: notes,
    // code: code,
    // pay: payrasp && payrasp,
    // payFull: payFull,
    // book: checked,
    // for: checked === "some" && { ...some },
    // masina: selectedCar,
    // time: time,
    // date: date,
    // origin: origin,
    // destination: destination,
  });

  useEffect(() => {
    setFinalModif({
      name: user ? (some["name"] !== "" ? some["name"] : user.displayName) : "",
      email: user ? (some["email"] !== "" ? some["email"] : user.email) : "",
      notes: notes,
      code: code,
      pay: !isEmpty(payrasp) && {
        total: payrasp?.purchase_units[0]?.payments.captures[0].amount.value,
        details: { ...payrasp },
      },
      payFull: payFull,
      book: checked,
      phone: some["phone"] !== "" ? some.phone : "",
      // for: checked === "some" && { ...some },
      masina: selectedCar,
      time: time,
      date: date,
      origin: origin,
      is24h,
      option,
      destination: destination,
    });
  }, [, tab, user, notes, code, payrasp, payFull, checked, some, selectedCar]);
  function getEmptyFields(obj) {
    const emptyFields = [];

    for (const key in obj) {
      const value = obj[key];

      const isEmptyValue =
        value === "" ||
        value === null ||
        value === undefined ||
        (typeof value === "number" && isNaN(value)) ||
        (typeof value === "object" &&
          value !== null &&
          Object.keys(value).length === 0);

      if (isEmptyValue) {
        emptyFields.push(key);
      }
    }
    let has = false;
    if (emptyFields.length > 0) has = true;
    return { emptyFields, has };
  }

  const book_fct = async (test = false) => {
    // if (!test) {
    let fields = getEmptyFields(finalModif);
    if (fields.has) {
      toast_error("Completeaza toate campurile");
      return;
      // } else {
      //   toast_success("You book your ride!");
    }
    // }
    const send = {
      cartype: selectedCar.type,
      price: selectedCar.results.total,
      impincassato: Number(finalModif.pay.total),
      bags: selectedCar.bags,
      servincassato:
        selectedCar.results.total == Number(finalModif.pay.total) ? 2 : 1,
      operator_note: notes + ".",
      service_note: code + ".",
      paxmail: finalModif.email,
      pickup: origin.name,
      dropoff: destination.name,
      date: `${date.split("-")[2]}/${date.split("-")[1]}/${date.split("-")[0]}`,
      pickup_time: time,
      pax: selectedCar.pers,
      paxname: finalModif.name,
      paxphone: finalModif.phone,
      token: "g40oow84sck4s0kwgcco048s00kkwcgwo4swcgc0s04c8kwk0k8gck0gooogccsg",
    };
    let success = false;
    // console.log(send);
    const salv_book = await AXIOS.post("/books/insert", {
      data: {
        uid: user && user.uid,
        ...finalModif,
        accept_book: !test,
      },
    });
    if (salv_book.data.success) {
      success = true;
    } else {
      success = false;
    }
    const salve_user = await AXIOS.post("/api/updatebooks", {
      uid: user && user.uid,
      data: salv_book.data.uid,
    });
    // console.log(salv_book.data, salve_user);
    if (salve_user.data.success) {
      success = true;
    } else {
      success = false;
    }
    if (!test) {
      const api_to_nccgest = await axios.post(
        `https://api.nccgest.com/api/rest_api.php?dominio=nrcvlad&token=g40oow84sck4s0kwgcco048s00kkwcgwo4swcgc0s04c8kwk0k8gck0gooogccsg&cmd=cmd_insert`,
        send,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // console.log(api_to_nccgest.data);
      send["service"] = api_to_nccgest.data.serviceid;
    } else {
      emailjs.send("service_cnqi9ni", "template_221xvxm", {
        ...send,
      });
      send["car_img"] = selectedCar.img;
      emailjs.send("service_cnqi9ni", "template_772oxbr", {
        ...send,
      });
    }

    if (success) {
      toast_success("Your booking has been saved successfully!");
    } else {
      toast_error("There was an error saving your booking. Please try again.");
    }
  };

  return (
    <section className="book">
      <div className="steps">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((_, index) => {
          return (
            <div className={`step ${index == tab ? "active" : ""}`}>
              <p
                style={{
                  cursor: index <= tab ? "pointer" : "not-allowed",
                  display: width < 500 && index != tab ? "none" : "flex",
                }}
                onClick={() => {
                  if (index <= tab) setTab(index);
                }}
              >
                {steps[index]}
              </p>

              {index <= tab ? <FaCircle /> : <FaRegCircle />}
              <div className="line"></div>
            </div>
          );
        })}
      </div>
      <div className="book_info">
        {is24h && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Pentru ca vrei sa faci o rezervare in mai putin de 24 de ore, te
              va contacta un operator in cel mai scurt timp! <br />
              Multumim de intelegere!
            </h2>
            <br />
          </>
        )}
        <h2>
          {date} at {time}
        </h2>
        <p>
          {option == "way" ? (
            <>
              {origin.name} <FaLongArrowAltRight /> {destination.name}
            </>
          ) : (
            <>From {origin.name}</>
          )}
        </p>
        <p>
          Estimated arrival:{" "}
          {calculateArrivalTime(
            date,
            time,
            option !== "hour"
              ? `${dist.ore.ore}:${dist.ore.mins}`
              : `${destination}:00`
          )}
          <FaCircle style={{ fontSize: 8 }} />
          {option !== "hour"
            ? `${Math.round(dist.km)} km`
            : `Max. ${Math.round(destination * 20)} km`}
        </p>
      </div>
      {tab == 0 ? (
        <>
          <div className="select">
            <h1>Select a vehicle</h1>
            <p>All prices include estimated VAT, fees, and tolls</p>
            <div className="masini">
              {pricingData.map((masina, index) => {
                // console.log(masina.type, option == "hour" ? option : "km");
                const results = calculateTripPrice2(
                  masina.type,
                  option == "hour" ? option : "km"
                );
                return (
                  <div
                    className={`masina ${
                      masina.type == selectedCar.type && "active"
                    }`}
                    onClick={() => select(masina, results, index)}
                  >
                    <img
                      src={masina.img}
                      alt={`${masina.type} vehicle`}
                      width={200}
                      height={150}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="right">
                      <div className="left">
                        <h2>{masina.type}</h2>
                        <div className="icons">
                          <div className="icon">
                            <IoPeopleSharp />
                            <h3>{masina.pers}</h3>
                          </div>
                          <div className="icon">
                            <FaSuitcaseRolling />
                            <h3>{masina.bags}</h3>
                          </div>
                        </div>
                      </div>
                      <h1>{results.total}€</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="select ">
            <div className="masini plus">
              <p>All cars include:</p>
              <h3>
                <FaCheckCircle /> Free cancellation up until 12 hours before
                pickup
              </h3>
              <h3>
                <FaCheckCircle /> Free 15 minutes of wait time
              </h3>
              <h3>
                <FaCheckCircle /> Meet & Greet
              </h3>
              <h3>
                <FaCheckCircle /> Complimentary bottle of water
              </h3>
            </div>
          </div>
          <div className="select ">
            <div className="masini plus">
              <p>Please note:</p>
              <h3>
                <FaCheckCircle />{" "}
                <span>
                  Guest/luggage capacities must be abided by for safety reasons.
                  If you are unsure, select a larger class as chauffeurs may
                  turn down service when they are exceeded
                </span>
              </h3>
              <h3>
                <FaCheckCircle /> The vehicle images above are examples. You may
                get a different vehicle of similar quality.
              </h3>
            </div>
          </div>
        </>
      ) : tab == 1 ? (
        <>
          <div className="select ">
            <h2>Select who you are booking for</h2>
            <div className="masini plus">
              <h3 onClick={() => autofocus("me")} style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  checked={checked == "me" ? true : false}
                  onChange={(e) => setChecked("me")}
                />
                Book for myself
              </h3>
              <h3
                onClick={() => autofocus("some")}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="radio"
                  checked={checked == "some" ? true : false}
                  onChange={(e) => setChecked("some")}
                />
                Book for someone else
              </h3>
            </div>
          </div>
          {checked === "some" && (
            <div className="select ">
              <h2>Provide additional information</h2>
              <div className="masini plus">
                <div className="input" onClick={() => autofocus2("title")}>
                  <MdOutlineTitle />
                  <label htmlFor="title" className="r">
                    <h4>Title*</h4>
                    <select
                      id="title"
                      value={some["title"]}
                      ref={setRef("title")}
                      onChange={(e) =>
                        setSome((old) => ({
                          ...old,
                          ["title"]: e.target.value,
                        }))
                      }
                    >
                      <option value=""></option>
                      <option value="mr">Mr.</option>
                      <option value="ms">Ms.</option>
                      <option value="mx">Mx.</option>
                    </select>
                  </label>
                </div>
                <div className="input" onClick={() => autofocus2("name")}>
                  <MdDriveFileRenameOutline />
                  <label htmlFor="name" className="r">
                    <h4>Name*</h4>
                    <input
                      type="text"
                      htmlFor="name"
                      ref={setRef("name")}
                      value={some["name"]}
                      onChange={(e) => {
                        setSome((old) => ({
                          ...old,
                          ["name"]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                <div className="input" onClick={() => autofocus2("email")}>
                  <MdAlternateEmail />
                  <label htmlFor="email" className="r">
                    <h4>Email*</h4>
                    <input
                      type="email"
                      htmlFor="email"
                      ref={setRef("email")}
                      value={some["email"]}
                      onChange={(e) => {
                        setSome((old) => ({
                          ...old,
                          ["email"]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                <div className="input" onClick={() => autofocus2("phone")}>
                  <FaPhone />
                  <label htmlFor="phone" className="r">
                    <h4>Guest phone number*</h4>
                    <input
                      type="tel"
                      htmlFor="phone"
                      value={some["phone"]}
                      ref={setRef("phone")}
                      onChange={(e) => {
                        setSome((old) => ({
                          ...old,
                          ["phone"]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                <h3>
                  Please enter the phone number on which the guest would like to
                  receive notifications
                </h3>
              </div>
            </div>
          )}
          <div className="select ">
            <h2>Provide additional information</h2>
            <div className="masini plus">
              <textarea
                name=""
                value={notes}
                id=""
                onChange={(e) => {
                  if (e.target.value.length < 1) {
                    // console.log(e.target.value.length);
                    setComplete((old) => ({ ...old, [1]: false }));
                  }
                  setNotes(e.target.value);
                }}
                rows={5}
                placeholder="Notes for the chauffeur"
              ></textarea>
              <h3>
                Add special requests, e.g. number of bags, child seats, etc.
                Please do not include confidential information.
              </h3>
              <textarea
                name=""
                rows={3}
                value={code}
                onChange={(e) => {
                  if (e.target.value.length < 1) {
                    setComplete((old) => ({ ...old, [1]: false }));
                  }
                  setCod(e.target.value);
                }}
                id=""
                placeholder="Reference code or cost center"
              ></textarea>
              <h3>
                Booking for business? What you enter above will appear on the
                invoice.
              </h3>
            </div>
          </div>
          <div className="select">
            <div className="masini plus">
              <h3>
                <FaCircleExclamation />
                The contact info entered will receive ride updates and booking
                confirmation.
              </h3>
              <h3>
                <FaCircleExclamation />
                Invoices are sent only to the booker, not the guest.
              </h3>
            </div>
          </div>
        </>
      ) : tab == 2 ? (
        <>
          {!user && !loading ? (
            <div className="select">
              <h2 style={{ textAlign: "center" }}>Log into your account!</h2>
              <button
                className="button main"
                onClick={() => {
                  signInWithGoogle();
                }}
              >
                <h2>Login with Google</h2>
              </button>
            </div>
          ) : (
            <>
              <h2>Esti logat ca {user && user.email}</h2>
              <br />
              <button className="button main" onClick={signInWithGoogle}>
                <h3>Schimba contul</h3>
              </button>
            </>
          )}
        </>
      ) : tab == 3 ? (
        <>
          <div className="select ">
            <div className="masini plus">
              <h3
                onClick={() => autofocus3("me", 2, true)}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="radio"
                  className="price"
                  checked={checked2 == "me" ? true : false}
                  onClick={(e) => {
                    //  console.log(e.target.checked, e.target);
                    if (e.target.checked) {
                      //    console.log("true me");
                      setPayFull(true);
                    } else {
                      //  console.log("false me");
                      setPayFull(false);
                    }
                    setChecked2("me");
                  }}
                />
                Plateste integral: {selectedCar.results.total}€
              </h3>
              <h3
                onClick={() => autofocus3("some", 2, false)}
                style={{ cursor: "pointer" }}
              >
                <input
                  className="price"
                  type="radio"
                  checked={checked2 == "some" ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      //     console.log("false some");
                      setPayFull(false);
                    } else {
                      //    console.log("true some");
                      setPayFull(true);
                    }
                    setChecked2("some");
                  }}
                />
                Plateste avans de 30%:{" "}
                {Math.floor((selectedCar.results.total * 30) / 100)}€
              </h3>
            </div>
            <PayPalCardFields
              setComplete={setComplete}
              setPayRasp={setPayRasp}
              next={next}
              pret={
                checked2 == ""
                  ? 0
                  : checked2 == "me"
                  ? selectedCar.results.total
                  : Math.floor((selectedCar.results.total * 30) / 100)
              }
            />
          </div>
        </>
      ) : (
        tab == 4 && (
          <div className="checkout">
            <div className="left">
              <h2>Your ride {checked}</h2>
              <div className="full">
                <h3>
                  {date} at {time}
                </h3>
                <img
                  className="maps"
                  src={img}
                  alt="Route map"
                  loading="lazy"
                  decoding="async"
                />
                <ul className="tofrom">
                  <li>
                    <h4>{origin.name}</h4>
                  </li>
                  {option !== "hour" && (
                    <li>
                      <h4>{destination.name}</h4>
                    </li>
                  )}
                  <p>
                    {option !== "hour"
                      ? `${dist.ore.full} - ${dist.km} km`
                      : `${destination} hours - Max. ${
                          destination * 20
                        } km`}{" "}
                  </p>
                </ul>
                <div className="line"></div>
                <div className="masina">
                  <img
                    src={selectedCar.img}
                    alt={`Selected ${selectedCar.type} vehicle`}
                    width={200}
                    height={150}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="rr">
                    <div className="ll">
                      <h2>{selectedCar.type}</h2>
                      <div className="icons">
                        <div className="icon">
                          <IoPeopleSharp />
                          <h3>{selectedCar.pers}</h3>
                        </div>
                        <div className="icon">
                          <FaSuitcaseRolling />
                          <h3>{selectedCar.bags}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              {!is24h && (
                <>
                  <h2>Payment details</h2>
                  <div className="full">
                    <h3>
                      <span>Total Price:</span>
                      <span> {selectedCar.results.total}€</span>
                    </h3>
                    <h3>
                      <span>Paid: </span>
                      <span>
                        {payFull
                          ? selectedCar.results.total
                          : Math.floor((selectedCar.results.total * 30) / 100)}
                        €
                      </span>
                    </h3>
                    {!payFull && (
                      <>
                        <h3>
                          <span>Remain: </span>
                          <span>
                            {payFull
                              ? selectedCar.results.total
                              : Math.floor(
                                  (selectedCar.results.total * 70) / 100
                                )}
                            €
                          </span>
                        </h3>
                        <p>The remains will be paid at the finish!</p>
                      </>
                    )}
                  </div>
                </>
              )}
              <h2>Guest's information</h2>
              <ul className="full">
                <li className="inf">
                  <h4>Contact details</h4>
                  <p>Name</p>
                  <input
                    type="text"
                    defaultValue={
                      user
                        ? some["name"] !== ""
                          ? some["name"]
                          : user.displayName
                        : ""
                    }
                    onChange={(e) => {
                      setFinalModif((old) => ({
                        ...old,
                        ["name"]: e.target.value,
                      }));
                    }}
                  />
                  <p>Email</p>
                  <input
                    type="email"
                    defaultValue={
                      user
                        ? some["email"] !== ""
                          ? some["email"]
                          : user.email
                        : ""
                    }
                    onChange={(e) => {
                      setFinalModif((old) => ({
                        ...old,
                        ["email"]: e.target.value,
                      }));
                    }}
                  />
                  <p>Phone number</p>
                  <input
                    type="tel"
                    defaultValue={some["phone"] !== "" ? some["phone"] : ""}
                    onChange={(e) => {
                      setFinalModif((old) => ({
                        ...old,
                        ["phone"]: e.target.value,
                      }));
                    }}
                  />
                </li>
                <li className="inf">
                  <h4>Notes for the chauffeur</h4>
                  <textarea
                    type="text"
                    defaultValue={notes}
                    onChange={(e) => {
                      setFinalModif((old) => ({
                        ...old,
                        ["notes"]: e.target.value,
                      }));
                    }}
                  />
                </li>
                <li className="inf">
                  <h4>Reference code or cost center</h4>
                  <textarea
                    type="text"
                    defaultValue={code}
                    onChange={(e) => {
                      setFinalModif((old) => ({
                        ...old,
                        ["code"]: e.target.value,
                      }));
                    }}
                  />
                </li>
              </ul>
              <button
                className="button main"
                onClick={() => {
                  book_fct(is24h);
                }}
              >
                <h3>Book now</h3>
              </button>
            </div>
            {/* {JSON.stringify(user)} */}
          </div>
        )
      )}
      {tab !== 4 && (
        <div className="row">
          {tab >= 1 ? (
            <div className="button second" onClick={() => next(-1)}>
              <h3 style={{ color: "black" }}>Back</h3>
            </div>
          ) : (
            <Link to="/">View terms & conditions</Link>
          )}

          {tab == 1 ? (
            <button
              className="button main"
              onClick={() => {
                if (!complete[tab]) {
                  //     console.log("ear");
                  save();
                } else {
                  //   console.log("ea222222r");
                  next(1);
                }
              }}
            >
              <h3>Continue</h3>
            </button>
          ) : (
            <button
              className="button main"
              onClick={() => next(1)}
              disabled={!complete[tab]}
            >
              <h3>Continue</h3>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default Book;
