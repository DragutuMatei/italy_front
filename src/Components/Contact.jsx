import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

function Contact() {
  return (
    <section className="contact">
      <h2>Contact</h2>

      <div className="row">
        <h1>
          We provide professional car services for our <br /> customers
        </h1>
        <div className="button main">
          <Link to="/">
            Contact <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;
