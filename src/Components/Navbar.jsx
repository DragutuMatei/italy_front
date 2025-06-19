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
          <h1>Italy Transfers</h1>
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
              <Link to="/">Home</Link>
            </div>
            <div className="link">
              <Link to="/">Services</Link>
            </div>
            <div className="link">
              <Link to="/">About</Link>
            </div>
            <div className="link">
              <Link to="/">Contact</Link>
            </div>
          </div>
          <div className="button main">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
