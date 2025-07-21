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
import { initPerformanceOptimizations } from "./utils/performanceOptimizations";
import { initTracking } from "./utils/analytics";
import { initAccessibility } from "./utils/accessibility";
import Profile from "./Pages/Profile";

function App() {
  const { width } = useWindowSize();
  useEffect(() => {
    AOS.init({
      offset: 80,
      // Accessibility improvements for AOS
      disable: "mobile", // Disable on mobile for better performance
      once: true, // Only animate once
    });

    // Initialize all optimizations with error handling
    const initializeOptimizations = async () => {
      try {
        await initPerformanceOptimizations();
      } catch (error) {}

      try {
        initTracking();
      } catch (error) {}

      try {
        initAccessibility();
      } catch (error) {}
    };

    initializeOptimizations();
  }, []);
  useEffect(() => {
    if (width > 768) {
      AOS.refresh();
    }
  }, [width]);

  return (
    <BrowserRouter>
      <SEO {...SEO_CONFIGS.home} />
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
