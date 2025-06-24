import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="top">
          <a href="mailto:mateidr7@gmail.com">
            <IoIosMail />
            mail@mail.com
          </a>
          <div className="line"></div>
          <a href="tel:+406786782763">
            <FaPhone />
            +40 678 678 2763
          </a>
        </div>
      </nav>
      <div className="down">
        <div className="logo">
          <h1>
            <Link to="/">Dvchauffeurs</Link>
          </h1>
        </div>

        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`drop ${isOpen ? "active" : ""}`}>
          <div className="links">
            <div className="link">
              <a href="#about">About</a>
            </div>
            <div className="link">
              <a href="#services">Services</a>
            </div>
            <div className="link">
              <a href="#testimoniale">Testimonials</a>
            </div>
            <div className="link">
              <a href="#faq">FAQ's</a>
            </div>
          </div>
          <div className="buts">
            <div className="button second">
              <Link to="/form">Contact</Link>
            </div>
            <div className="button main">
              <Link to="/form">See cars</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
