import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signUserOut, signInWithGoogle } = useAuth();

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
            <Link to="/">Dv-Chauffeurs</Link>
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
            <div className="link">
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="buts">
            {user ? (
              <div className="button second" onClick={signUserOut}>
                <h4>Log out</h4>
              </div>
            ) : (
              <div className="button main" onClick={signInWithGoogle}>
                <h4 >Login</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
