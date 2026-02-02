import { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav container">
        <a href="#" className="logo" onClick={() => scrollToSection("hero")}>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: isScrolled ? "#1a1a2e" : "#fff",
            }}
          >
            NORA
          </span>
        </a>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#highlights"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("highlights");
              }}
            >
              Highlights
            </a>
          </li>
          <li>
            <a
              href="#amenities"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("amenities");
              }}
            >
              Amenities
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("pricing");
              }}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#location"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("location");
              }}
            >
              Location
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("gallery");
              }}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection("contact")}
          >
            Enquire Now
          </button>
        </div>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
