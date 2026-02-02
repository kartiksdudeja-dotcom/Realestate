import { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop",
      title: "Premium NA Plots",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop",
      title: "Life Republic Township",
    },
    {
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop",
      title: "Your Dream Home Awaits",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content container">
        <div className="hero-badge">
          <span>Premium NA Plots at Life Republic</span>
        </div>

        <h1>
          NORA at Life Republic
        </h1>

        <p className="hero-subtitle">
          Premium residential NA plots ranging from 2152 to 4304 sq.ft. in
          Pune's most prestigious township
        </p>

        <div className="hero-highlights">
          <div className="highlight-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Hinjawadi, Pune</span>
          </div>
          <div className="highlight-item">
            <i className="fas fa-ruler-combined"></i>
            <span>2152 - 4304 sq.ft.</span>
          </div>
          <div className="highlight-item">
            <i className="fas fa-check-circle"></i>
            <span>NA Plots</span>
          </div>
        </div>

        <div className="hero-cta">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => scrollToSection("contact")}
          >
            <i className="fas fa-phone-alt"></i> Enquire Now
          </button>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => scrollToSection("pricing")}
          >
            <i className="fas fa-rupee-sign"></i> View Pricing
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={() => scrollToSection("about")}>
        <span>Scroll Down</span>
        <i className="fas fa-chevron-down"></i>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
