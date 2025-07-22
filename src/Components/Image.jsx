import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as qAuto } from "@cloudinary/url-gen/qualifiers/quality";
import { dpr } from "@cloudinary/url-gen/actions/delivery";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUNDINARY,
  },
});

const Image = ({ publicId, width = 600, height, className = "" }) => {
  if (!publicId) return null;

  const myImage = cld.image(publicId);

  // Transformări pentru optimizare
  myImage
    .format(auto())
    .quality(auto())
    .delivery(dpr("auto"))
    .resize(height ? fill().width(width).height(height) : scale().width(width));

  return (
    <AdvancedImage
      cldImg={myImage}
      className={className}
      style={{ maxWidth: "100%", height: "auto", objectPosition: "left" }}
    />
  );
};

export default Image;
