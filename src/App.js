import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import BookingComponent from "./Pages/Book copy";
// Re-enabling SEO imports gradually
import { SEO, SEO_CONFIGS } from "./utils/SEO";
// import { initPerformanceOptimizations } from "./utils/performance";
// import { initTracking } from "./utils/analytics";
import { initImageOptimizations } from "./utils/imageOptimization";
// import { initCSSOptimizations } from "./utils/criticalCSS";
import Profile from "./Pages/Profile";

function App() {
  const { width } = useWindowSize();
  useEffect(() => {
    AOS.init({
      offset: 80,
    });

    // Initialize performance optimizations - gradually re-enabling
    // initPerformanceOptimizations();

    // Initialize tracking - gradually re-enabling
    // initTracking();

    // Initialize image optimizations - gradually re-enabling
    initImageOptimizations();

    // Initialize CSS optimizations - gradually re-enabling
    // initCSSOptimizations();
  }, []);
  useEffect(() => {
    AOS.refresh();
  }, [width]);

  return (
    <BrowserRouter>
      <SEO {...SEO_CONFIGS.home} />
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/terms" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
