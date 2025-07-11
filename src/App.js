import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import "./assets/css/style.scss";
import Navbar from "./Components/Navbar";
import Book from "./Pages/Book";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
