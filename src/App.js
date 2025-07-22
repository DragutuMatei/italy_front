import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/css/style.scss";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Book from "./Pages/Book";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import useWindowSize from "./utils/useWindowSize";

function App() {
  const { width } = useWindowSize();

  useEffect(() => {
    AOS.init({
      offset: 80,
      once: true, // important pe mobil!
      disable: false,
      mirror: true,
    });
    window.addEventListener("load", AOS.refresh);

    return () => {
      window.removeEventListener("load", AOS.refresh);
    };
  }, []);
  useEffect(() => {
    if (width < 768) {
      AOS.refresh();
    }
  }, [, width]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        aria-label="Notifications"
      />
      <Navbar />
      <main role="main" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/terms" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
