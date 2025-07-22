import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: { cloudName: process.env.REACT_APP_CLOUNDINARY }, // ← pune cloudName-ul tău
});

const Svg = ({
  publicId,
  width = 200,
  height = 200,
  defaultFill = "#000",
  className = "",
}) => {
  const [svgData, setSvgData] = useState(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const url = cld.image(publicId).toURL();
        const res = await fetch(url);
        const text = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");

        const svg = doc.querySelector("svg");
        const viewBox =
          svg?.getAttribute("viewBox") || `0 0 ${width} ${height}`;

        const paths = Array.from(doc.querySelectorAll("path")).map(
          (el, idx) => ({
            d: el.getAttribute("d"),
            fill: el.getAttribute("fill") || defaultFill,
            key: idx,
          })
        );

        setSvgData({ viewBox, paths });
      } catch (err) {
        console.error("Eroare la încărcarea SVG-ului:", err);
      }
    };

    fetchSvg();
  }, [publicId, width, height, defaultFill]);

  if (!svgData?.paths?.length) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={svgData.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: "block",
        margin: "0 auto",
        maxWidth: "100%",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
      }}
    >
      {svgData.paths.map(({ d, fill, key }) => (
        <path key={key} d={d} fill={fill} />
      ))}
    </svg>
  );
};

export default Svg;
