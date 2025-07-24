import React, { useEffect, useRef, useState, Suspense } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import useWindowSize from "../utils/useWindowSize";
import { useAuth } from "../utils/AuthContext";
import PayPalCardFields from "../Components/Paypal";
import { useJsApiLoader } from "@react-google-maps/api";
import AXIOS from "../utils/Axios_config";
import emailjs from "@emailjs/browser";
import { toast_error, toast_success, toast_warn } from "../Components/Toasts";
import Image from "../Components/Image";

const FloatingWhatsAppButton = React.lazy(() =>
  import("../Components/FloatingWhatsAppButton")
);
const Paypal = React.lazy(() => import("../Components/Paypal"));
const Toasts = React.lazy(() => import("../Components/Toasts"));

const pricingData = [
  {
    type: "Sedan",
    img: "sedan_mg2kqg",
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
    img: "v_class_ak4dyq",
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
    img: "vito_yli6o7",
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
  const { t } = useTranslation();
  const { user, loading, signInWithGoogle, refreshUser } = useAuth();
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
  const [payFull, setPayFull] = useState(true);
  const { width } = useWindowSize();
  const [is24h, setIs24h] = useState(
    isLessThan24Hours(
      searchParams.get("date").replaceAll('"', ""),
      searchParams.get("time").replaceAll('"', "")
    )
  );

  function calculateArrivalTime(departureDate, departureTime, travelDuration) {
    const [year, month, day] = departureDate.split("-").map(Number);
    const [hours, minutes] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hours, minutes);
    const [travelHours, travelMinutes] = travelDuration.split(":").map(Number);
    departure.setHours(departure.getHours() + travelHours);
    departure.setMinutes(departure.getMinutes() + travelMinutes);
    const arrivalYear = departure.getFullYear();
    const arrivalMonth = String(departure.getMonth() + 1).padStart(2, "0");
    const arrivalDay = String(departure.getDate()).padStart(2, "0");
    const arrivalHours = String(departure.getHours()).padStart(2, "0");
    const arrivalMinutes = String(departure.getMinutes()).padStart(2, "0");
    return `${arrivalYear}-${arrivalMonth}-${arrivalDay} - ${arrivalHours}:${arrivalMinutes}`;
  }

  const calculateTripPrice2 = (vehicleType, option = "km") => {
    const distanceKm = Number(dist.km);
    const vehicle = pricingData.find((v) => v.type === vehicleType);
    if (!vehicle) {
      return { error: "Invalid vehicle type" };
    }
    if (option === "hour") {
      let hours = destination;
      if (typeof hours === "object" && hours !== null) {
        hours = hours.hours || hours.ore || 0;
      }
      hours = Number(hours);
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
    const cappedDistance = distanceKm;
    if (cappedDistance <= vehicle.baseKm) {
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
    for (const rate of vehicle.rates) {
      if (remainingKm <= 0) break;
      const kmInRange = Math.min(remainingKm, rate.to - rate.from);
      const cost = kmInRange * rate.price;
      total += cost;
      remainingKm -= kmInRange;
    }
    if (remainingKm > 0) {
      const lastRate = vehicle.rates[vehicle.rates.length - 1].price;
      total += remainingKm * lastRate;
    }
    return {
      total: parseFloat(total.toFixed(2)),
      km: distanceKm,
      option,
      date,
      time,
    };
  };

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
    t("step_service_class"),
    t("step_pickup_info"),
    t("step_log_in"),
    t("step_payment"),
    t("step_checkout"),
  ];
  const [tab, setTab] = useState(0);
  const [hasRestoredTab, setHasRestoredTab] = useState(false);
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
      toast_warn(t("complete_all_fields"));
    }
  };

  const [payrasp, setPayRasp] = useState({});
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
    tr(option);
    window.scroll(0, 0);
  }, [, tab]);
  function isLessThan24Hours(dateStr, timeStr) {
    const targetDate = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diffMs = targetDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours > 0 && diffHours < 24;
  }
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
    if (checked !== "" && some !== "" && notes !== "") {
      if (checked === "some" && Object.values(some).some((v) => v.length < 1)) {
        toast_warn(t("complete_all_fields"));
      } else {
        setComplete((old) => ({ ...old, [1]: true }));
        next(1, true);
      }
    } else {
      toast_warn(t("complete_all_fields"));
    }
  };

  const [img, setImg] = useState("");

  const tr = async (opt) => {
    let r = "";
    if (opt == "hour") {
      r = await getCircleImage(origin, destination * 20);
    } else {
      r = await getRouteImage();
    }
    if (!r.error) {
      setImg(r.imageUrl);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const getRouteImage = async () => {
    if (!origin || !destination) {
      return { error: t("please_select_both") };
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
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
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
      return { error: t("error_calculating_distance") + error.message };
    }
  };
  const getCircleImage = async (center, radiusKm) => {
    if (!center || !radiusKm) {
      return { error: t("missing_center_or_radius") };
    }
    const numPoints = 60;
    const R = 6371;
    const lat = center.lat * (Math.PI / 180);
    const lng = center.lng * (Math.PI / 180);
    const d = radiusKm / R;
    const circleCoords = [];
    for (let i = 0; i <= numPoints; i++) {
      const angle = (2 * Math.PI * i) / numPoints;
      const latPoint =
        Math.asin(
          Math.sin(lat) * Math.cos(d) +
            Math.cos(lat) * Math.sin(d) * Math.cos(angle)
        ) *
        (180 / Math.PI);
      const lngPoint =
        (lng +
          Math.atan2(
            Math.sin(angle) * Math.sin(d) * Math.cos(lat),
            Math.cos(d) - Math.sin(lat) * Math.sin(latPoint * (Math.PI / 180))
          )) *
        (180 / Math.PI);
      circleCoords.push(`${latPoint},${lngPoint}`);
    }
    const pathParam = `&path=fillcolor:0x2200FF33|color:0x0000FF99|weight:2|${circleCoords.join(
      "|"
    )}`;
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const staticMapUrl =
      `https://maps.googleapis.com/maps/api/staticmap?` +
      `size=600x400` +
      `&maptype=roadmap` +
      `&zoom=5` +
      `&markers=color:red|label:A|${center.lat},${center.lng}` +
      `${pathParam}` +
      `&key=${apiKey}`;
    return { imageUrl: staticMapUrl };
  };

  const [finalModif, setFinalModif] = useState({});
  useEffect(() => {
    setFinalModif({
      name: user ? (some["name"] !== "" ? some["name"] : user.displayName) : "",
      email: user ? (some["email"] !== "" ? some["email"] : user.email) : "",
      notes: notes,
      pay: !isEmpty(payrasp) && {
        total: payrasp?.purchase_units[0]?.payments.captures[0].amount.value,
        details: { ...payrasp },
      },
      payFull: payFull,
      book: checked,
      phone: some["phone"] !== "" ? some.phone : "",
      title: some["title"] !== "" ? some["title"] : "",
      masina: selectedCar,
      time: time,
      date: date,
      origin: origin,
      is24h,
      option,
      destination: destination,
    });
  }, [, tab, user, notes, payrasp, payFull, checked, some, selectedCar]);

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
      if (isEmptyValue && key !== "title") {
        emptyFields.push(key);
      }
    }
    let has = false;
    if (emptyFields.length > 0) has = true;
    return { emptyFields, has };
  }

  const saveUserData = (userData) => {
    localStorage.setItem("bookData", JSON.stringify(userData));
  };

  const restoreUserData = () => {
    const local = localStorage.getItem("bookData");
    if (local) return JSON.parse(local);
    return null;
  };

  const [hasPaid, setHasPaid] = useState(false);
  useEffect(() => {
    if (!hasRestoredTab) {
      const restored = restoreUserData();
      if (restored) {
        if (restored.selectedCar) setSelectedCar(restored.selectedCar);
        if (restored.checked) setChecked(restored.checked);
        if (restored.checked2) setChecked2(restored.checked2);
        if (restored.payFull !== undefined) setPayFull(restored.payFull);
        if (restored.some) setSome(restored.some);
        if (restored.notes) setNotes(restored.notes);
        if (restored.payrasp) setPayRasp(restored.payrasp);
        if (restored.complete) setComplete(restored.complete);
        if (restored.hasPaid !== undefined) setHasPaid(restored.hasPaid);
        if (restored.tab !== undefined) {
          setTab(restored.tab);
        }
      }
      setHasRestoredTab(true);
    }
  }, [hasRestoredTab]);

  useEffect(() => {
    const dataToSave = {
      selectedCar,
      checked,
      checked2,
      payFull,
      some,
      notes,
      tab,
      payrasp,
      complete,
      hasPaid,
    };
    saveUserData(dataToSave);
  }, [
    selectedCar,
    checked,
    checked2,
    payFull,
    some,
    notes,
    tab,
    payrasp,
    complete,
    hasPaid,
  ]);

  useEffect(() => {
    if (payrasp && Object.keys(payrasp).length > 0 && complete[3]) {
      setHasPaid(true);
    }
  }, [payrasp, complete]);

  useEffect(() => {
    const dataToSave = {
      selectedCar,
      checked,
      checked2,
      payFull,
      some,
      notes,
      tab,
      payrasp,
      complete,
      hasPaid,
    };
    saveUserData(dataToSave);
  }, [hasPaid]);

  const navigate = useNavigate();
  const book_fct = async (under_24 = false) => {
    let fields = getEmptyFields(finalModif);
    if (fields.has) {
      toast_error(t("complete_all_fields"));
      return;
    }
    const send = {
      cartype: selectedCar.type,
      price: selectedCar.results.total,
      impincassato: Number(finalModif.pay.total),
      bags: selectedCar.bags,
      servincassato:
        selectedCar.results.total == Number(finalModif.pay.total) ? 2 : 1,
      operator_note: notes + ".",
      paxmail: finalModif.email,
      pickup: origin.name,
      dropoff: destination.name,
      date: `${date.split("-")[2]}/${date.split("-")[1]}/${date.split("-")[0]}`,
      pickup_time: time,
      pax: selectedCar.pers,
      paxname: finalModif.name,
      paxphone: finalModif.phone,
    };
    let success = false;
    let serviceid = Math.floor(Math.random() * 1000000);
    if (!under_24) {
      const api_to_nccgest = await AXIOS.post("/platform/insert", {
        sendData: send,
      });
      if (!api_to_nccgest.data.success) {
        toast_error(t("booking_platform_error"));
        return;
      }
      serviceid = api_to_nccgest.data.data.serviceid;
    }
    const salv_book = await AXIOS.post("/books/insert", {
      data: {
        uid: user && user.uid,
        ...finalModif,
        accept_book: !under_24,
        serviceid,
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
    if (salve_user.data.success) {
      success = true;
    } else {
      success = false;
    }
    if (!under_24) {
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        {
          ...send,
        }
      );
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_NEW_ORDER_UNDER_24,
        {
          ...send,
        }
      );
    }
    if (success) {
      localStorage.removeItem("bookData");
      toast_success(t("booking_success"));
      await refreshUser();
      navigate("/profile");
    } else {
      toast_error(t("booking_error"));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlOrigin = urlParams.get("origin");
    const urlDestination = urlParams.get("optional");
    const urlOption = urlParams.get("option");
    const urlHours = urlParams.get("hours");
    const urlDate = urlParams.get("date");
    const urlTime = urlParams.get("time");

    const local = localStorage.getItem("bookData");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        // Parsează parametrii JSON din URL
        const urlOriginObj = urlOrigin ? JSON.parse(urlOrigin) : null;
        const urlDestinationObj = urlDestination
          ? JSON.parse(urlDestination)
          : null;
        // Compară obiecte cu obiecte
        const isDifferent =
          (urlOrigin &&
            JSON.stringify(parsed.origin) !== JSON.stringify(urlOriginObj)) ||
          (urlDestination &&
            JSON.stringify(parsed.destination || parsed.optional) !==
              JSON.stringify(urlDestinationObj)) ||
          (urlOption &&
            String(parsed.option) !== urlOption.replaceAll('"', "")) ||
          (urlHours && String(parsed.hours) !== urlHours) ||
          (urlDate && String(parsed.date) !== urlDate.replaceAll('"', "")) ||
          (urlTime && String(parsed.time) !== urlTime.replaceAll('"', ""));
        if (isDifferent) {
          localStorage.removeItem("bookData");
        }
      } catch (e) {
        localStorage.removeItem("bookData");
      }
    }
  }, []);

  return (
    <>
      <section className="book">
        <div className="steps" role="tablist">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((_, index) => {
            return (
              <div className={`step ${index == tab ? "active" : ""}`}>
                <p
                  role="tab"
                  aria-selected={index === tab}
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
              <h2 style={{ textAlign: "center" }}>{t("under_24h_notice")}</h2>
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
              <>
                {t("from")} {origin.name}
              </>
            )}
          </p>
          <p>
            {t("estimated_arrival")}{" "}
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
              : `${t("max")} ${Math.round(destination * 20)} km`}
          </p>
        </div>
        {tab == 0 ? (
          <>
            <div className="select">
              <h1>{t("select_vehicle")}</h1>
              <p>{t("prices_include_vat")}</p>
              <div className="masini">
                {pricingData.map((masina, index) => {
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
                      <Image publicId={masina.img} />
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
                <p>{t("all_cars_include")}</p>
                <h3>
                  <FaCheckCircle /> {t("free_cancellation")}
                </h3>
                <h3>
                  <FaCheckCircle /> {t("free_wait_time")}
                </h3>
                <h3>
                  <FaCheckCircle /> {t("meet_and_greet")}
                </h3>
                <h3>
                  <FaCheckCircle /> {t("complimentary_water")}
                </h3>
              </div>
            </div>
            <div className="select ">
              <div className="masini plus">
                <p>{t("please_note")}</p>
                <h3>
                  <FaCheckCircle /> <span>{t("capacity_safety")}</span>
                </h3>
                <h3>
                  <FaCheckCircle /> {t("vehicle_images_note")}
                </h3>
              </div>
            </div>
          </>
        ) : tab == 1 ? (
          <>
            <div className="select ">
              <h2>{t("select_booking_for")}</h2>
              <div className="masini plus">
                <h3
                  onClick={() => autofocus("me")}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    checked={checked == "me" ? true : false}
                    onChange={(e) => setChecked("me")}
                  />
                  {t("book_for_myself")}
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
                  {t("book_for_someone_else")}
                </h3>
              </div>
            </div>
            {checked === "some" && (
              <div className="select ">
                <h2>{t("provide_additional_info")}</h2>
                <div className="masini plus">
                  <div className="input" onClick={() => autofocus2("title")}>
                    <MdOutlineTitle />
                    <label htmlFor="title" className="r">
                      <h4>{t("title_label")}*</h4>
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
                        <option value="mr">{t("title_mr")}</option>
                        <option value="ms">{t("title_ms")}</option>
                        <option value="mx">{t("title_mx")}</option>
                      </select>
                    </label>
                  </div>
                  <div className="input" onClick={() => autofocus2("name")}>
                    <MdDriveFileRenameOutline />
                    <label htmlFor="name" className="r">
                      <h4>{t("name_label")}*</h4>
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
                      <h4>{t("email_label")}*</h4>
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
                      <h4>{t("phone_label")}*</h4>
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
                  <h3>{t("phone_notification_note")}</h3>
                </div>
              </div>
            )}
            <div className="select ">
              <h2>{t("provide_additional_info")}</h2>
              <div className="masini plus">
                <textarea
                  name=""
                  value={notes}
                  id=""
                  onChange={(e) => {
                    if (e.target.value.length < 1) {
                      setComplete((old) => ({ ...old, [1]: false }));
                    }
                    setNotes(e.target.value);
                  }}
                  rows={5}
                  placeholder={t("notes_placeholder")}
                ></textarea>
                <h3>{t("notes_instruction")}</h3>
              </div>
            </div>
            <div className="select">
              <div className="masini plus">
                <h3>
                  <FaCircleExclamation />
                  {t("contact_info_note")}
                </h3>
                <h3>
                  <FaCircleExclamation />
                  {t("invoice_note")}
                </h3>
              </div>
            </div>
          </>
        ) : tab == 2 ? (
          <>
            {!user && !loading ? (
              <div className="select">
                <h2 style={{ textAlign: "center" }}>{t("log_in_prompt")}</h2>
                <button
                  className="button main"
                  onClick={() => {
                    signInWithGoogle();
                  }}
                >
                  <h2>{t("login_with_google")}</h2>
                </button>
              </div>
            ) : (
              <>
                <h2>
                  {t("logged_in_as")}
                  {user && user.email}
                </h2>
                <br />
                <button className="button main" onClick={signInWithGoogle}>
                  <h3>{t("change_account")}</h3>
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
                      if (e.target.checked) {
                        setPayFull(true);
                      } else {
                        setPayFull(false);
                      }
                      setChecked2("me");
                    }}
                  />
                  {t("pay_full")}
                  {selectedCar.results.total}€
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
                        setPayFull(false);
                      } else {
                        setPayFull(true);
                      }
                      setChecked2("some");
                    }}
                  />
                  {t("pay_deposit")}
                  {Math.floor((selectedCar.results.total * 30) / 100)}€
                </h3>
              </div>
              <Suspense fallback={<div>{t("loading")}</div>}>
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
              </Suspense>
            </div>
          </>
        ) : (
          tab == 4 && (
            <div className="checkout">
              <div className="left">
                <h2>{t("your_ride")}</h2>
                <div className="full">
                  <h3>
                    {date} at {time}
                  </h3>
                  {img && (
                    <img
                      className="maps"
                      src={img}
                      alt={t("route_map_alt")}
                      loading="lazy"
                      decoding="async"
                      width="100%"
                      height="200"
                    />
                  )}
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
                        : `${destination} ${t("hours")} - ${t("max")} ${
                            destination * 20
                          } km`}
                    </p>
                  </ul>
                  <div className="line"></div>
                  <div className="masina">
                    <Image
                      checkout={true}
                      publicId={selectedCar.img}
                      width={200}
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
                    <h2>{t("payment_details")}</h2>
                    <div className="full">
                      <h3>
                        <span>{t("total_price")}</span>
                        <span> {selectedCar.results.total}€</span>
                      </h3>
                      <h3>
                        <span>{t("paid")}</span>
                        <span>
                          {payFull
                            ? selectedCar.results.total
                            : Math.floor(
                                (selectedCar.results.total * 30) / 100
                              )}
                          €
                        </span>
                      </h3>
                      {!payFull && (
                        <>
                          <h3>
                            <span>{t("remaining")}</span>
                            <span>
                              {payFull
                                ? selectedCar.results.total
                                : Math.floor(
                                    (selectedCar.results.total * 70) / 100
                                  )}
                              €
                            </span>
                          </h3>
                          <p>{t("pay_remaining_note")}</p>
                        </>
                      )}
                    </div>
                  </>
                )}
                <h2>{t("guest_info")}</h2>
                <ul className="full">
                  <li className="inf">
                    <h4>{t("contact_details")}</h4>
                    <p>{t("name_label")}</p>
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
                    <p>{t("email_label")}</p>
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
                    <p>{t("phone_label")}</p>
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
                    <h4>{t("notes_for_chauffeur")}</h4>
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
                </ul>
                <button
                  className="button main"
                  onClick={() => {
                    book_fct(is24h);
                  }}
                >
                  <h3>{t("book_now")}</h3>
                </button>
              </div>
            </div>
          )
        )}
        {tab !== 4 && (
          <div className="row">
            {tab >= 1 ? (
              <div className="button second" onClick={() => next(-1)}>
                <h3 style={{ color: "black" }}>{t("back")}</h3>
              </div>
            ) : (
              <Link to="/terms" target="_blank">
                {t("view_terms_conditions")}
              </Link>
            )}
            {tab == 1 ? (
              <button
                className="button main"
                onClick={() => {
                  if (!complete[tab]) {
                    save();
                  } else {
                    next(1);
                  }
                }}
              >
                <h3>{t("continue")}</h3>
              </button>
            ) : (
              <button
                className="button main"
                onClick={() => next(1)}
                disabled={!complete[tab]}
              >
                <h3>{t("continue")}</h3>
              </button>
            )}
          </div>
        )}
      </section>
      <Suspense fallback={null}>
        <FloatingWhatsAppButton />
      </Suspense>
    </>
  );
}

export default Book;
