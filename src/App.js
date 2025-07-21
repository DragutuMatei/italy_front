import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./assets/css/style.scss";
import Navbar from "./Components/Navbar";
import Book from "./Pages/Book";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import useWindowSize from "./utils/useWindowSize";

// Re-enabling SEO imports gradually
import { SEO, SEO_CONFIGS } from "./utils/SEO";
import Profile from "./Pages/Profile";

function App() {
  const { width } = useWindowSize();
  useEffect(() => {
    AOS.init({
      offset: 80,
      once: true, // important pe mobil!
      disable: "phone",
      mirror: true,
    });
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
