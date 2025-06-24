import React, { useState, useEffect } from "react";

const API_KEY = "b9ed1042086b4e4da1a44be1e4f0927e";
const pricingData = [
  {
    type: "Sedan",
    baseFare: 70.0,
    baseKm: 10,
    rates: [
      { from: 10, to: 50, price: 0.8 },
      { from: 50, to: 100, price: 2.0 },
      { from: 100, to: 200, price: 3.0 },
      { from: 200, to: 500, price: 1.8 },
    ],
  },
  {
    type: "Private Van (V CLASS)",
    baseFare: 70.0,
    baseKm: 10,
    rates: [
      { from: 10, to: 50, price: 1.8 },
      { from: 50, to: 100, price: 2.0 },
      { from: 100, to: 200, price: 3.0 },
      { from: 200, to: 500, price: 2.0 },
    ],
  },
  {
    type: "Private Van (VITO)",
    baseFare: 80.0,
    baseKm: 10,
    rates: [
      { from: 10, to: 50, price: 2.0 },
      { from: 50, to: 100, price: 2.0 },
      { from: 100, to: 200, price: 3.0 },
      { from: 200, to: 500, price: 2.0 },
    ],
  },
  {
    type: "SUV",
    baseFare: 0.0,
    baseKm: 10,
    rates: [
      { from: 10, to: 50, price: 0.0 },
      { from: 50, to: 100, price: 0.0 },
      { from: 100, to: 200, price: 0.0 },
      { from: 200, to: 500, price: 0.0 },
    ],
  },
];
function Form() {
  const [from, setFrom] = useState("");
  const [sugestii, setSugestii] = useState([]);

  const [masini, setMasini] = useState("");
  const [option, setOption] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (from.length < 2) {
        setSugestii([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            from
          )}&limit=5&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setSugestii(data.features.map((f) => f.properties.formatted));
      } catch (error) {
        console.error("Eroare la autocomplete:", error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [from]);

  const handleSelect = (valoare) => {
    setFrom(valoare);
    setSugestii([]);
  };

  const [to, setTo] = useState("");
  const [sugestii2, setSugestii2] = useState([]);

  useEffect(() => {
    const fetchSuggestions2 = async () => {
      if (to.length < 2) {
        setSugestii2([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            to
          )}&limit=5&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setSugestii2(data.features.map((f) => f.properties.formatted));
      } catch (error) {
        console.error("Eroare la autocomplete:", error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions2, 300);

    return () => clearTimeout(delayDebounce);
  }, [to]);

  const handleSelect2 = (valoare) => {
    setTo(valoare);
    setSugestii2([]);
  };
  const [pret, setPret] = useState(null);

  const calculateTripPrice = async (vehicleType) => {
    // Validate inputs
    const [fromGeo, toGeo] = await Promise.all([
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          from
        )}&apiKey=${API_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          to
        )}&apiKey=${API_KEY}`
      ).then((res) => res.json()),
    ]);

    const fromCoords = fromGeo.features[0].geometry.coordinates;
    const toCoords = toGeo.features[0].geometry.coordinates;

    // 2. Obține distanța în km
    const route = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${fromCoords[1]},${fromCoords[0]}|${toCoords[1]},${toCoords[0]}&mode=drive&apiKey=${API_KEY}`
    ).then((res) => res.json());

    const distanceKm = route.features[0].properties.distance / 1000;

    if (typeof distanceKm !== "number" || distanceKm < 0) {
      setPret({ error: "Invalid distance" });
    }
    if (!pricingData.find((v) => v.type === vehicleType)) {
      setPret({ error: "Invalid vehicle type" });
    }

    // Cap distance at 500 km
    const cappedDistance = Math.min(distanceKm, 500);
    const vehicle = pricingData.find((v) => v.type === vehicleType);

    // If distance is within base km, return base fare
    if (cappedDistance <= vehicle.baseKm) {
      setPret({
        total: vehicle.baseFare,
        currency: "EUR",
        includes: "Meet & Greet",
      });
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

    setPret({
      total: parseFloat(total.toFixed(2)),
      km: distanceKm,
      masini,
      option,
      date,
      time,
    });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <select name="masini" onChange={(e) => setMasini(e.target.value)}>
        <option value="">Alege</option>
        <option value="Sedan">Sedan</option>
        <option value="Private Van (V CLASS)">V Class</option>
        <option value="Private Van (VITO)">Vito</option>
      </select>
      <select onChange={(e) => setOption(e.target.value)}>
        <option value="">Alege</option>
        <option value="way">One way</option>
        <option value="hour">By the hour</option>
      </select>
      <div style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="FROM..."
          style={{ width: "100%", padding: "8px" }}
        />
        {sugestii.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "8px",
              width: "100%",
              background: "#fff",
              border: "1px solid #ccc",
              zIndex: 1000,
            }}
          >
            {sugestii.map((locatie, index) => (
              <li
                key={index}
                onClick={() => handleSelect(locatie)}
                style={{ padding: "6px", cursor: "pointer" }}
              >
                {locatie}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="TO..."
          style={{ width: "100%", padding: "8px" }}
        />
        {sugestii2.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "8px",
              width: "100%",
              background: "#fff",
              border: "1px solid #ccc",
              zIndex: 1000,
            }}
          >
            {sugestii2.map((locatie, index) => (
              <li
                key={index}
                onClick={() => handleSelect2(locatie)}
                style={{ padding: "6px", cursor: "pointer" }}
              >
                {locatie}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input type="time" onChange={(e) => setTime(e.target.value)} />
      {masini && (
        <button
          onClick={async () => {
            await calculateTripPrice(masini);
          }}
        >
          calculate
        </button>
      )}
      {pret !== null &&
        (pret.error ? (
          <h1>Eroare: {pret.error}</h1>
        ) : (
          <ul>
            <li>
              total:
              {pret.total}$
            </li>{" "}
            <li>
              km:
              {pret.km}$
            </li>
            <li>masina: {pret.masini}</li>
            <li>option: {pret.option}</li>
            <li>date: {pret.date}</li>
            <li>time:{pret.time}</li>
          </ul>
        ))}
    </div>
  );
}

export default Form;
