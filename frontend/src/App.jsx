import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Amenities from "./components/Amenities";
import Pricing from "./components/Pricing";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Admin from "./components/Admin";

function MainSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Highlights />
        <Amenities />
        <Pricing />
        <Location />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
