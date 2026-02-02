import "./Footer.css";

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <div
              className="footer-logo"
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#c9a227",
                marginBottom: "20px",
              }}
            >
              NORA
            </div>
            <p>
              NORA at Life Republic offers premium NA plots in Pune's most
              prestigious township. Build your dream home in an established
              community with world-class amenities.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                >
                  About Project
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
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                Office No 103, 104, Icon Tower, Bhumkar Chowk Rd, Wakad, Pune 411057
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                +91 9503103217
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                info@homesca.in
              </li>
              <li>
                <i className="fas fa-clock"></i>
                Mon - Sun: 9:00 AM - 7:00 PM
              </li>
            </ul>
          </div>

          <div className="footer-developer">
            <h4>Developer</h4>
            <div
              style={{
                width: "120px",
                height: "60px",
                background: "#c9a227",
                borderRadius: "8px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Kolte Patil
            </div>
            <p>
              Kolte Patil Developers - Over 30 years of trust and excellence in
              real estate.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 NORA at Life Republic. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
