import "./Highlights.css";

function Highlights() {
  const highlights = [
    {
      icon: "fas fa-file-contract",
      title: "NA Plots",
      description:
        "All plots are NA approved, ready for immediate construction",
    },
    {
      icon: "fas fa-ruler-combined",
      title: "2152-4304 sq.ft.",
      description: "Spacious plots ranging from 2152 to 4304 sq.ft.",
    },
    {
      icon: "fas fa-road",
      title: "12m & 9m Roads",
      description: "Wide internal roads for easy accessibility",
    },
    {
      icon: "fas fa-tree",
      title: "Green Spaces",
      description: "Landscaped gardens and open spaces",
    },
    {
      icon: "fas fa-building",
      title: "Life Republic",
      description: "Part of 450+ acre integrated township",
    },
    {
      icon: "fas fa-users",
      title: "15,000+ Families",
      description: "Established community already residing",
    },
    {
      icon: "fas fa-subway",
      title: "Metro Proximity",
      description: "5 mins from upcoming Metro station",
    },
    {
      icon: "fas fa-laptop-house",
      title: "IT Hub Access",
      description: "Adjacent to Hinjawadi IT Park",
    },
  ];

  return (
    <section id="highlights" className="highlights section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Project Features</span>
          <h2 className="section-title">Why Choose NORA?</h2>
          <p className="section-subtitle">
            Discover the exceptional features that make NORA at Life Republic
            your ideal investment destination
          </p>
        </div>

        <div className="highlights-grid">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="highlight-card"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="highlight-icon">
                <i className={item.icon}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
