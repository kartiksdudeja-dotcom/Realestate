import "./About.css";

function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image" data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"
              alt="NORA Project"
            />
            <div className="experience-badge">
              <span className="number">450+</span>
              <span className="text">Acres Township</span>
            </div>
          </div>

          <div className="about-content" data-aos="fade-left">
            <span className="section-tag">About Project</span>
            <h2 className="section-title">NORA at Life Republic</h2>
            <p className="about-description">
              NORA offers premium residential NA plots within the prestigious
              Life Republic township - Pune's largest integrated township spread
              across 450+ acres. Located in the heart of Hinjawadi's IT
              corridor, NORA provides the perfect blend of modern infrastructure
              and natural serenity.
            </p>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <div className="feature-text">
                  <h4>NA Approved Plots</h4>
                  <p>
                    All plots are NA (Non-Agricultural) approved, ready for
                    construction
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-city"></i>
                </div>
                <div className="feature-text">
                  <h4>Established Township</h4>
                  <p>
                    Part of Life Republic with 15,000+ families already residing
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-road"></i>
                </div>
                <div className="feature-text">
                  <h4>Prime Location</h4>
                  <p>
                    5 mins from Hinjawadi IT Park and upcoming Metro station
                  </p>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <i className="fas fa-phone-alt"></i> Schedule Site Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
