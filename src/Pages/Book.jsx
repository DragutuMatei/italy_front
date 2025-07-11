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

const pricingData = [
  {
    type: "Sedan",
    img: require("../assets/images/sedan.png"),
    baseFare: 70.0,
    baseKm: 10,
    pers: 3,
    bags: 2,
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
  console.log(selectedCar);

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
    console.log(complete, tab);
    if (
      tab + step < 5 &&
      tab + step >= 0 &&
      (complete[tab] || step < 0 || pas)
    ) {
      window.scroll(0, 0);
      setTab((old) => old + step);
    } else {
      alert("alege tot!");
    }
  };

  const [payrasp, setPayRasp] = useState({});
  console.log(payrasp);
  useEffect(() => {
    if (user) {
      setComplete((old) => ({ ...old, [2]: true }));
    }
  }, [, user]);

  useEffect(() => {
    // if (tab > 3) {
    t();
    // }
    window.scroll(0, 0);
  }, [, tab]);

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
        alert("completeaza toate campurile de la some!");
      }

      // if (e.target.value.length < 1) {
      //   setComplete((old) => ({ ...old, [1]: false }));
      // }
      else {
        alert("e ok2!");
        setComplete((old) => ({ ...old, [1]: true }));
        next(1, true);
      }
    } else {
      alert("nope");
    }
    // console.log(checked, some, notes, code);
  };

  const [img, setImg] = useState("");
  const t = async () => {
    const r = await getRouteImage();
    if (!r.error) {
      setImg(r.imageUrl);
    } else {
      console.log(r.error);
    }
  };
  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAQJVCVQXehO5DsVOLEVFg80VClM1tS7mU", // Replace with your Google Maps API key
    libraries,
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
      const apiKey = "AIzaSyAQJVCVQXehO5DsVOLEVFg80VClM1tS7mU"; // Replace with your API key
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
      destination: destination,
    });
  }, [, tab, user, notes, code, payrasp, payFull, checked, some, selectedCar]);

  const book_fct = async () => {
    await AXIOS.post("/api/saveUser", {
      uid: user && user.uid,
      userData: { book: finalModif },
    }).then((res) => {
      console.log(res);
    });

    await axios
      .post(
        `https://api.nccgest.com/api/rest_api.php?dominio=nrcvlad&token=88k00o08ssos8gcs088wg8484800400kcogk40s8ow08gwoogss8g48oko0cg0sc&cmd=cmd_insert`,
        // {
        //   pickup: origin.name,
        //   dropoff: destination.name,
        //   // dates: date,
        //   dates: new Date(date).toLocaleDateString("ro-RO"),
        //   pickup_time: time,
        //   pax: selectedCar.pers,
        //   paxname: finalModif.name,
        //   paxphone: finalModif.phone,
        // },

        {
          pickup: "805300 Tecuci, Romania",
          dropoff: "Bucharest, Romania",
          dates: "29/07/2025",
          pickup_time: "17:56",
          pax: 3,
          paxname: "Matei Dragutu",
          paxphone: "0786782763",
          token:
            "88k00o08ssos8gcs088wg8484800400kcogk40s8ow08gwoogss8g48oko0cg0sc",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("res,", res);
      });

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    let response = await fetch(
      // "https://api.nccgest.com/api/rest_api.php?dominio=nrcvlad&token=88k00o08ssos8gcs088wg8484800400kcogk40s8ow08gwoogss8g48oko0cg0sc&vat=04622870261&cmd=cmd_customer",
      `https://api.nccgest.com/api/rest_api.php?dominio=nrcvlad&token=88k00o08ssos8gcs088wg8484800400kcogk40s8ow08gwoogss8g48oko0cg0sc&cmd=cmd_insert`,
      {
        method: "POST",
        headers: headersList,
        body: JSON.stringify({
          pickup: "805300 Tecuci, Romania",
          dropoff: "Bucharest, Romania",
          dates: "29/07/2025",
          pickup_time: "05:56",
          pax: 3,
          paxname: "Matei Dragutu",
          paxphone: "0786782763",
        }),
      }
    );

    let data = await response.text();
    console.log(data);

    const url = "https://api.nccgest.com/api/rest_api.php";
    const form = new URLSearchParams();
    form.set("dominio", "nrcvlad");
    form.set("cmd", "cmd_insert"); // verifică dacă e numele corect
    form.set("token", "88k00o08ssos8gcs088wg8484800400kcogk40s8ow08gwoogss8g48oko0cg0sc"); // sau params[...]
    form.set("pickup", "805300 Tecuci, Romania"); 
    form.set("dropoff", "Bucharest, Romania"); 
    form.set("dates", "29/07/2025"); 
    form.set("pickup_time", "05:56"); 
    form.set("pax", 3); 
    form.set("paxname", "Matei Dragutu"); 
    form.set("paxphone", "0786782763"); 

    const res = await fetch(url, {
      method: "POST",
      body: form,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log(await res.text())
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
                  // if (index <= tab)
                  setTab(index);
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
        <h2>
          {date} at {time}
        </h2>
        <p>
          {option == "way" ? (
            <>
              {origin.name} <FaLongArrowAltRight /> {destination.name}
            </>
          ) : (
            <></>
          )}
        </p>
        <p>
          Estimated arrival:{" "}
          {calculateArrivalTime(date, time, `${dist.ore.ore}:${dist.ore.mins}`)}
          <FaCircle style={{ fontSize: 8 }} />
          {Math.round(dist.km)} km
        </p>
      </div>
      {tab == 0 ? (
        <>
          <div className="select">
            <h1>Select a vehicle</h1>
            <p>All prices include estimated VAT, fees, and tolls</p>
            <div className="masini">
              {pricingData.map((masina, index) => {
                const results = calculateTripPrice(masina.type);
                return (
                  <div
                    className={`masina ${
                      masina.type == selectedCar.type && "active"
                    }`}
                    onClick={() => select(masina, results, index)}
                  >
                    <img src={masina.img} alt="" />
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
                      <h1>{results.total}$</h1>
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
                    console.log(e.target.value.length);
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
                onClick={() =>
                  autofocus3("me", 2, checked2 == "me" ? true : false)
                }
                style={{ cursor: "pointer" }}
              >
                <input
                  type="radio"
                  className="price"
                  checked={checked2 == "me" ? true : false}
                  onClick={(e) => {
                    console.log(e.target.checked, e.target);
                    if (e.target.checked) {
                      console.log("true me");
                      setPayFull(true);
                    } else {
                      console.log("false me");
                      setPayFull(false);
                    }
                    setChecked2("me");
                  }}
                />
                Plateste integral: {selectedCar.results.total}€
              </h3>
              <h3
                onClick={() =>
                  autofocus3("some", 2, checked2 == "some" ? true : false)
                }
                style={{ cursor: "pointer" }}
              >
                <input
                  className="price"
                  type="radio"
                  checked={checked2 == "some" ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      console.log("false some");
                      setPayFull(false);
                    } else {
                      console.log("true some");
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
                <img className="maps" src={img} alt="" />
                <ul className="tofrom">
                  <li>
                    <h4>{origin.name}</h4>
                  </li>
                  <li>
                    <h4>{destination.name}</h4>
                  </li>
                  <p>
                    {dist.ore.full} - {dist.km} km
                  </p>
                </ul>
                <div className="line"></div>
                <div className="masina">
                  <img src={selectedCar.img} alt="" />
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
              <h2>Payment details</h2>
              <div className="full">
                <h3>
                  <span>Total Price:</span>
                  <span> {selectedCar.results.total}$</span>
                </h3>
                <h3>
                  <span>Paid: </span>
                  <span>
                    {payFull
                      ? selectedCar.results.total
                      : Math.floor((selectedCar.results.total * 30) / 100)}
                    $
                  </span>
                </h3>
                {!payFull && (
                  <>
                    <h3>
                      <span>Remain: </span>
                      <span>
                        {payFull
                          ? selectedCar.results.total
                          : Math.floor((selectedCar.results.total * 70) / 100)}
                        $
                      </span>
                    </h3>
                    <p>The remains will be paid at the finish!</p>
                  </>
                )}
              </div>
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
                    type="email"
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
                  book_fct();
                  console.log(
                    finalModif
                    // {
                    // name: user
                    //   ? some["name"] !== ""
                    //     ? some["name"]
                    //     : user.displayName
                    //   : user.displayName,
                    // email: user && user.email,
                    // notes: notes,
                    // code: code,
                    // pay: payrasp && payrasp,
                    // payFull: payFull,
                    // book: checked,
                    // for: checked === "some" && { ...some },
                    // masina: selectedCar,
                    // }
                  );
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
                  console.log("ear");
                  save();
                } else {
                  console.log("ea222222r");
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
