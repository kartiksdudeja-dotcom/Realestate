import "./Location.css";

function Location() {
  const advantages = [
    {
      category: "Connectivity",
      items: [
        "5 mins to Hinjawadi IT Park",
        "10 mins to Mumbai-Pune Expressway",
        "5 mins to upcoming Metro Station",
        "30 mins to Pune Airport",
      ],
    },
    {
      category: "Education",
      items: [
        "Symbiosis International School",
        "VIBGYOR School",
        "Indira College",
        "MIT World Peace University",
      ],
    },
    {
      category: "Healthcare",
      items: [
        "Sahyadri Hospital - 10 mins",
        "Aditya Birla Hospital - 15 mins",
        "Ruby Hall Clinic - 20 mins",
        "Columbia Asia - 12 mins",
      ],
    },
  ];

  return (
    <section id="location" className="location section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Prime Location</span>
          <h2 className="section-title">Strategic Location Advantage</h2>
          <p className="section-subtitle">
            Survey No. 74, Marunji, Hinjawadi, Pune-411057 | Heart of Pune's IT
            Corridor
          </p>
        </div>

        <div className="location-grid">
          <div className="location-map" data-aos="fade-right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.8231486968397!2d73.82350!3d18.59120!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c5d5d5d5d5d5%3A0x0!2sLife%20Republic%20Township%2C%20Hinjawadi!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.google.com/maps?q=Survey+No+74+Marunji+Hinjawadi+Pune+411057&ll=18.5912,73.8235&z=15"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <i className="fas fa-map-marker-alt"></i> View on Google Maps
            </a>
          </div>

          <div className="location-advantages" data-aos="fade-left">
            {advantages.map((section, index) => (
              <div key={index} className="advantage-category">
                <h4>
                  <i className="fas fa-map-pin"></i> {section.category}
                </h4>
                <ul>
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle"></i> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
