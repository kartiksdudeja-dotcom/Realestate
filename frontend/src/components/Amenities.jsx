import "./Amenities.css";

function Amenities() {
  const amenities = [
    { icon: "fas fa-swimming-pool", name: "Swimming Pool" },
    { icon: "fas fa-dumbbell", name: "Gymnasium" },
    { icon: "fas fa-running", name: "Jogging Track" },
    { icon: "fas fa-tree", name: "Landscaped Gardens" },
    { icon: "fas fa-child", name: "Kids Play Area" },
    { icon: "fas fa-users", name: "Clubhouse" },
    { icon: "fas fa-basketball-ball", name: "Sports Courts" },
    { icon: "fas fa-graduation-cap", name: "Schools Nearby" },
    { icon: "fas fa-hospital", name: "Healthcare" },
    { icon: "fas fa-shopping-cart", name: "Retail Shops" },
    { icon: "fas fa-shield-alt", name: "24x7 Security" },
    { icon: "fas fa-bolt", name: "Power Backup" },
  ];

  return (
    <section id="amenities" className="amenities section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Lifestyle</span>
          <h2 className="section-title">World-Class Amenities</h2>
          <p className="section-subtitle">
            Life Republic offers over 100+ amenities for a premium lifestyle
            experience
          </p>
        </div>

        <div className="amenities-wrapper">
          <div className="amenities-grid">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="amenity-item"
                data-aos="zoom-in"
                data-aos-delay={index * 30}
              >
                <div className="amenity-icon">
                  <i className={amenity.icon}></i>
                </div>
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>

          <div className="lifestyle-images" data-aos="fade-up">
            <div className="lifestyle-image">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop"
                alt="Lifestyle 1"
              />
            </div>
            <div className="lifestyle-image">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop"
                alt="Lifestyle 2"
              />
            </div>
            <div className="lifestyle-image">
              <img
                src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=300&fit=crop"
                alt="Lifestyle 3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Amenities;
