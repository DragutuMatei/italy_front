import React, { useState, useEffect, useRef, useMemo } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toast_error, toast_warn } from "./Toasts";
import { useTranslation } from "react-i18next";

function Form() {
  const today =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");
  const { t } = useTranslation();
  const [masini, setMasini] = useState("");
  const [option, setOption] = useState("way");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(
    new Date()
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .slice(0, 5)
  );

  const [pret, setPret] = useState(null);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your Google Maps API key
    libraries: ["places"],
  });

  useEffect(() => {
    const local = localStorage.getItem("bookData");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.option && parsed.option !== option) {
          localStorage.removeItem("bookData");
          return;
        }
      } catch (e) {
        localStorage.removeItem("bookData");
      }
    }
  }, [,option]);

  const handleOriginSelect = () => {
    const place = originRef.current.getPlace();
    if (place.geometry) {
      setOrigin({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.formatted_address,
      });
    }
  };

  const handleDestinationSelect = () => {
    const place = destinationRef.current.getPlace();
    if (place.geometry) {
      setDestination({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.formatted_address,
      });
    }
  };

  const handleSection = (e) => {
    // Dacă există bookData și opțiunea e diferită, șterge bookData și resetează starea
    const local = localStorage.getItem("bookData");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.option && parsed.option !== e) {
          localStorage.removeItem("bookData");
          setOrigin(null);
          setDestination(null);
          setDate(today);
          setTime(
            new Date()
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .slice(0, 5)
          );
          setHours(3);
        }
      } catch (err) {
        localStorage.removeItem("bookData");
      }
    }
    setOption(e);

    document.querySelectorAll(".section").forEach((elem) => {
      elem.classList.toggle("active");
    });
  };

  const inputRefssss = useRef({});

  // Funcție pentru a seta ref-ul pentru fiecare câmp
  const setRef = (key) => (el) => {
    if (el) {
      inputRefssss.current[key] = el;
    }
  };

  const autofocus = (key) => {
    const el = inputRefssss.current[key];
    if (el) {
      el.focus();
      el.click();
    }
  };
  const [hours, setHours] = useState(3);
  const navigate = useNavigate();

  const allFilled = (array) =>
    array.every((el) => {
      if (el === null || el === undefined) return false;

      if (typeof el === "string") return el.trim() !== "";

      if (typeof el === "number") return !isNaN(el);

      if (Array.isArray(el)) return el.length > 0 && allFilled(el); // Recursiv pentru array

      if (typeof el === "object") {
        const values = Object.values(el);
        if (values.length === 0) return false;
        return allFilled(values); // Recursiv pentru obiect
      }

      return true;
    });
  const calculateDistance = async () => {
    if (!origin || !destination) {
      return "Please select both origin and destination.";
    }

    const service = new window.google.maps.DistanceMatrixService();
    return new Promise((resolve) => {
      service.getDistanceMatrix(
        {
          origins: [{ lat: origin.lat, lng: origin.lng }],
          destinations: [{ lat: destination.lat, lng: destination.lng }],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status === "OK") {
            const result = response.rows[0].elements[0];
            if (result.status === "OK") {
              let totalSeconds = result.duration.value;
              let ore = Math.floor(totalSeconds / 3600);
              let mins = Math.round((totalSeconds % 3600) / 60);

              if (mins === 60) {
                ore += 1;
                mins = 0;
              }

              resolve({
                km: result.distance.value / 1000,
                ore: {
                  full: result.duration.text,
                  ore: ore,
                  mins: mins,
                },
              });
            } else {
              resolve("Unable to calculate distance.");
            }
          } else {
            resolve("Error calculating distance.");
          }
        }
      );
    });
  };
  const isValidTime = (timeStr) => {
    // Acceptă 24h format HH:MM
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(timeStr);
  };
  const isValidDate = (dateStr) => {
    if (!dateStr) return false;

    const inputDate = new Date(dateStr);
    const today = new Date();

    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return !isNaN(inputDate.getTime()) && inputDate >= today;
  };

  const checkIfRouteIsDrivable = async () => {
    if (!origin || !destination) return false;

    const directionsService = new window.google.maps.DirectionsService();

    return new Promise((resolve) => {
      directionsService.route(
        {
          origin: { lat: origin.lat, lng: origin.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            resolve(true);
          } else {
            // console.warn("Drivable route check failed:", status);
            resolve(false);
          }
        }
      );
    });
  };
  const isDateTimeInFuture = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return false;
    const now = new Date();
    const input = new Date(dateStr + "T" + timeStr);
    return input > now;
  };
  const book = async () => {
    const dist = await calculateDistance();

    const params_array = [
      { origin },
      { dist },
      { optional: option == "way" ? destination : hours },
      { option },
      { time },
      { date },
    ];
    // console.log(
    //   { origin },
    //   { dist },
    //   { optional: option == "way" ? destination : hours },
    //   { option },
    //   { time },
    //   { date }
    // );

    // Validare suplimentară pentru data/ora în trecut
    if (!isDateTimeInFuture(date, time)) {
      toast_error("Nu poți selecta o dată și oră din trecut!");
      return;
    }

    if (allFilled(params_array) && isValidTime(time) && isValidDate(date)) {
      const isDrivable = await checkIfRouteIsDrivable();

      if (!isDrivable && option !== "hour") {
        toast_error("Route not drivable");
        return;
      }
      const params = new URLSearchParams();
      params_array.map((param, i) => {
        params.set(Object.keys(param), JSON.stringify(Object.values(param)[0]));
      });
      navigate(`/book?${params.toString()}`);
    } else {
      toast_warn("Please fill all fields");
    }
  };

  if (!isLoaded) {
    return <div className="text-center text-gray-500">{t("loading")}</div>;
  }
  return (
    <>
      <section className="mainform">
        <div className="sections">
          <div
            className={`section ${option === "way" ? "active" : ""}`}
            data-aos="fade-down"
            onClick={() => handleSection("way")}
          >
            <h3>{t("one_way")}</h3>
          </div>
          <div
            className={`section ${option === "hour" ? "active" : ""}`}
            data-aos="fade-down"
            onClick={() => handleSection("hour")}
          >
            <h3>{t("by_the_hour")}</h3>
          </div>
        </div>
        <div className="content">
          <h1 data-aos="fade-right">{t("book_a_ride")}</h1>
          <div
            className="input"
            data-aos="fade-right"
            onClick={() => autofocus("from")}
          >
            <Autocomplete
              className="input2"
              onLoad={(autocomplete) => (originRef.current = autocomplete)}
              onPlaceChanged={handleOriginSelect}
            >
              <>
                <FaLocationDot />
                <div className="r">
                  <h4>{t("from")}</h4>
                  <input
                    required
                    type="text"
                    ref={setRef("from")}
                    placeholder={t("enter_origin_location")}
                  />
                </div>
              </>
            </Autocomplete>
          </div>
          {option === "way" ? (
            <div
              className="input"
              data-aos="fade-right"
              onClick={() => autofocus("to")}
            >
              <Autocomplete
                className="input2"
                onLoad={(autocomplete) =>
                  (destinationRef.current = autocomplete)
                }
                onPlaceChanged={handleDestinationSelect}
              >
                <>
                  <FaLocationDot />
                  <label htmlFor="to" className="r">
                    <h4>{t("to")}</h4>
                    <input
                      required
                      id="to"
                      type="text"
                      ref={setRef("to")}
                      placeholder={t("enter_destination_location")}
                    />
                  </label>
                </>
              </Autocomplete>
            </div>
          ) : (
            <div
              className="input"
              data-aos="fade-right"
              onClick={() => autofocus("hours")}
            >
              <IoTimer />
              <label htmlFor="hours" className="r">
                <h4>{t("hours")}</h4>
                <select
                  id="hours"
                  onChange={(e) => setHours(e.target.value)}
                  ref={setRef("hours")}
                  value={hours}
                >
                  {Array.from({ length: 21 }, (_, i) => i + 3).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <div
            className="input"
            data-aos="fade-right"
            onClick={() => autofocus("date")}
          >
            <MdOutlineDateRange />
            <div className="r">
              <h4>{t("date")}</h4>
              <input
                required
                value={date}
                min={today}
                type="date"
                ref={setRef("date")}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div
            className="input"
            data-aos="fade-right"
            onClick={() => autofocus("time")}
          >
            <IoTime />
            <div className="r">
              <h4>{t("time")}</h4>
              <input
                required
                type="time"
                value={time}
                ref={setRef("time")}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {option === "way" && (
            <h3 data-aos="fade-right">{t("chauffeur_wait")}</h3>
          )}
          <div
            className="button main"
            role="tab"
            aria-selected="true"
            onClick={book}
          >
            <a href="#">{t("search")}</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
