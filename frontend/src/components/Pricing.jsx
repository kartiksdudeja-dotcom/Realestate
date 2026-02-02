import "./Pricing.css";

function Pricing() {
  const plots = [
    {
      type: "Standard Plot",
      size: "2152 sq.ft.",
      price: "₹1.29 Cr*",
      features: ["NA Approved", "9m Road Facing", "East/West Facing"],
    },
    {
      type: "Premium Plot",
      size: "2690 sq.ft.",
      price: "₹1.61 Cr*",
      features: ["NA Approved", "12m Road Facing", "Corner Plot Option"],
      featured: true,
    },
    {
      type: "Large Plot",
      size: "3228 sq.ft.",
      price: "₹1.94 Cr*",
      features: ["NA Approved", "12m Road Facing", "Garden Facing"],
    },
    {
      type: "Villa Plot",
      size: "4304 sq.ft.",
      price: "₹2.58 Cr*",
      features: ["NA Approved", "Double Road", "Premium Location"],
    },
  ];

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Plot Options</span>
          <h2 className="section-title">Choose Your Perfect Plot</h2>
          <p className="section-subtitle">
            Starting from ₹6,000/sq.ft.* | Premium NA plots in Life Republic
          </p>
        </div>

        <div className="pricing-grid">
          {plots.map((plot, index) => (
            <div
              key={index}
              className={`pricing-card ${plot.featured ? "featured" : ""}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plot.featured && (
                <div className="featured-badge">Most Popular</div>
              )}
              <div className="pricing-header">
                <h3>{plot.type}</h3>
                <div className="plot-size">{plot.size}</div>
              </div>
              <div className="pricing-price">
                <span className="price">{plot.price}</span>
                <span className="price-note">onwards</span>
              </div>
              <ul className="pricing-features">
                {plot.features.map((feature, i) => (
                  <li key={i}>
                    <i className="fas fa-check"></i> {feature}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-primary"
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Enquire Now
              </button>
            </div>
          ))}
        </div>

        <div className="masterplan" data-aos="fade-up">
          <h3>Master Plan</h3>
          <div className="masterplan-images">
            <div className="masterplan-image">
              <img
                src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop"
                alt="Master Plan"
              />
              <span>Project Layout</span>
            </div>
            <div className="masterplan-image">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
                alt="Sector Layout"
              />
              <span>Sector Plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
