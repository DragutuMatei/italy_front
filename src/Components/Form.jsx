import React, { useState, useEffect, useRef, useMemo } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];

function Form() {
  const today =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

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
    googleMapsApiKey: "AIzaSyAQJVCVQXehO5DsVOLEVFg80VClM1tS7mU", // Replace with your Google Maps API key
    libraries,
  });

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
 
  // const calculateDistance = async () => {
  //   if (!origin || !destination) {
  //     return "Please select both origin and destination.";
  //   }

  //   const service = new window.google.maps.DistanceMatrixService();
  //   return new Promise((resolve) => {
  //     service.getDistanceMatrix(
  //       {
  //         origins: [{ lat: origin.lat, lng: origin.lng }],
  //         destinations: [{ lat: destination.lat, lng: destination.lng }],
  //         travelMode: window.google.maps.TravelMode.DRIVING,
  //         unitSystem: window.google.maps.UnitSystem.METRIC,
  //       },
  //       (response, status) => {
  //         if (status === "OK") {
  //           const result = response.rows[0].elements[0];
  //           if (result.status === "OK") {
  //             resolve({
  //               km: result.distance.value / 1000,
  //               ore: result.duration.text,
  //             });
  //           } else {
  //             resolve("Unable to calculate distance.");
  //           }
  //         } else {
  //           resolve("Error calculating distance.");
  //         }
  //       }
  //     );
  //   });
  // };

  // const calculateTripPrice = async (vehicleType) => {
  //   // Validate inputs
  //   const rez = await calculateDistance();
  //   console.log(rez);
  //   const distanceKm = rez.km;

  //   if (typeof distanceKm !== "number" || distanceKm < 0) {
  //     setPret({ error: "Invalid distance" });
  //   }
  //   if (!pricingData.find((v) => v.type === vehicleType)) {
  //     setPret({ error: "Invalid vehicle type" });
  //   }

  //   // Cap distance at 500 km
  //   const cappedDistance = Math.min(distanceKm, 500);
  //   const vehicle = pricingData.find((v) => v.type === vehicleType);

  //   // If distance is within base km, return base fare
  //   if (cappedDistance <= vehicle.baseKm) {
  //     setPret({
  //       total: vehicle.baseFare,
  //       currency: "EUR",
  //       includes: "Meet & Greet",
  //     });
  //   }

  //   // Calculate additional cost beyond base km
  //   let total = vehicle.baseFare;
  //   let remainingKm = cappedDistance - vehicle.baseKm;

  //   for (const rate of vehicle.rates) {
  //     if (remainingKm <= 0) break;
  //     const kmInRange = Math.min(remainingKm, rate.to - rate.from);
  //     total += kmInRange * rate.price;
  //     remainingKm -= kmInRange;
  //   }

  //   setPret({
  //     total: parseFloat(total.toFixed(2)),
  //     km: distanceKm,
  //     masini,
  //     option,
  //     date,
  //     time,
  //   });
  // };

  const handleSection = (e) => {
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
            console.warn("Drivable route check failed:", status);
            resolve(false);
          }
        }
      );
    });
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
    console.log(
      { origin },
      { dist },
      { optional: option == "way" ? destination : hours },
      { option },
      { time },
      { date }
    );

    if (allFilled(params_array) && isValidTime(time) && isValidDate(date)) {
      const isDrivable = await checkIfRouteIsDrivable();

      if (!isDrivable) {
        alert("Traseul nu poate fi realizat cu mașina.");
        return;
      }
      const params = new URLSearchParams();
      params_array.map((param, i) => {
        params.set(Object.keys(param), JSON.stringify(Object.values(param)[0]));
      });
      navigate(`/book?${params.toString()}`);
    } else {
      alert("completeaza tot");
    }
  };

  

  if (!isLoaded) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  return (
    <>
      <section className="mainform">
        <div className="sections">
          <div className="section active" onClick={() => handleSection("way")}>
            <h3>One way</h3>
          </div>
          <div className="section" onClick={() => handleSection("hour")}>
            <h3>By the Hour</h3>
          </div>
        </div>
        <div className="content">
          <h1>Book a ride!</h1>
          <div className="input" onClick={() => autofocus("from")}>
            <Autocomplete
              className="input2"
              onLoad={(autocomplete) => (originRef.current = autocomplete)}
              onPlaceChanged={handleOriginSelect}
            >
              <>
                <FaLocationDot />
                <div className="r">
                  <h4>From</h4>
                  <input
                    required
                    //ref={inputRefs.from}
                    type="text"
                    ref={setRef("from")}
                    placeholder="Enter origin location"
                  />
                </div>
              </>
            </Autocomplete>
          </div>
          {option == "way" ? (
            <>
              <div className="input" onClick={() => autofocus("to")}>
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
                      <h4>To</h4>
                      <input
                        required
                        id="to"
                        type="text"
                        ref={setRef("to")}
                        //ref={inputRefs.to}
                        placeholder="Enter origin location"
                      />
                    </label>
                  </>
                </Autocomplete>
              </div>
            </>
          ) : (
            <>
              <div className="input" onClick={() => autofocus("hours")}>
                <IoTimer />
                <label htmlFor="hours" className="r">
                  <h4>Hours</h4>
                  <select
                    id="hours"
                    onChange={(e) => setHours(e.target.value)} //ref={inputRefs.hours}
                    ref={setRef("hours")}
                  >
                    {Array.from({ length: 21 }, (_, i) => i + 3).map((hour) => {
                      const new_hour = hour;
                      return <option value={new_hour}>{new_hour}</option>;
                    })}
                  </select>
                </label>
              </div>
            </>
          )}
          <div className="input" onClick={() => autofocus("date")}>
            <MdOutlineDateRange />
            <div className="r">
              <h4>Date</h4>
              <input
                required
                value={date}
                min={today}
                type="date"
                ref={setRef("date")}
                //ref={inputRefs.date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="input" onClick={() => autofocus("time")}>
            <IoTime />
            <div className="r">
              <h4>Time</h4>
              <input
                required
                type="time"
                value={time}
                ref={setRef("time")}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {option == "way" && (
            <h3>Chauffeur will wait 15 minutes free of charge.</h3>
          )}
          <div
            className="button main"
            role="tab"
            aria-selected="true"
            onClick={book}
          >
            <a href="#">Search</a>
          </div>
        </div>  
      </section>
    </>
  );

  // return (
  //   <div style={{ minHeight: "100vh" }}>
  //     <select name="masini" onChange={(e) => setMasini(e.target.value)}>
  //       <option value="">Alege</option>
  //       <option value="Sedan">Sedan</option>
  //       <option value="Private Van (V CLASS)">V Class</option>
  //       <option value="Private Van (VITO)">Vito</option>
  //     </select>
  //     <select onChange={(e) => setOption(e.target.value)}>
  //       <option value="">Alege</option>
  //       <option value="way">One way</option>
  //       <option value="hour">By the hour</option>
  //     </select>
  //     {option == "way" ? (
  //       <>
  //         <div className="from">
  //           <label
  //             className="block text-gray-700 mb-2 font-medium"
  //             htmlFor="origin"
  //           >
  //             Origin
  //           </label>
  //           <Autocomplete className="input" onClick={()=>autofocus()}
  //             onLoad={(autocomplete) => (originRef.current = autocomplete)}
  //             onPlaceChanged={handleOriginSelect}
  //           >
  //             <div className="autocomplete-wrapper">
  //               <input required
  //                 type="text"
  //                 id="origin"
  //                 placeholder="Enter origin location"
  //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900 placeholder-gray-400 autocomplete-input"
  //               />
  //             </div>
  //           </Autocomplete>
  //         </div>

  //         <div className="to">
  //           <label
  //             className="block text-gray-700 mb-2 font-medium"
  //             htmlFor="destination"
  //           >
  //             Destination
  //           </label>
  //           <Autocomplete className="input" onClick={()=>autofocus()}
  //             onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
  //             onPlaceChanged={handleDestinationSelect}
  //           >
  //             <div className="autocomplete-wrapper">
  //               <input required
  //                 type="text"
  //                 id="destination"
  //                 placeholder="Enter destination location"
  //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900 placeholder-gray-400 autocomplete-input"
  //               />
  //             </div>
  //           </Autocomplete>
  //         </div>
  //         <input required type="date" onChange={(e) => setDate(e.target.value)} />
  //         <input required type="time" onChange={(e) => setTime(e.target.value)} />
  //       </>
  //     ) : (
  //       <>
  //         <input required type="number" min={3} placeholder="Ore" />
  //       </>
  //     )}
  //     {masini && (
  //       <button
  //         onClick={async () => {
  //           await calculateTripPrice(masini);
  //         }}
  //       >
  //         calculate
  //       </button>
  //     )}
  //     {pret !== null &&
  //       (pret.error ? (
  //         <h1>Eroare: {pret.error}</h1>
  //       ) : (
  //         <ul>
  //           <li>
  //             total:
  //             {pret.total}$
  //           </li>{" "}
  //           <li>
  //             km:
  //             {pret.km} Km
  //           </li>
  //           <li>masina: {pret.masini}</li>
  //           <li>option: {pret.option}</li>
  //           <li>date: {pret.date}</li>
  //           <li>time:{pret.time}</li>
  //         </ul>
  //       ))}
  //   </div>
  // );
}

export default Form;
