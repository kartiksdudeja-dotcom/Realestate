import { useState } from "react";
import { submitEnquiry, scheduleSiteVisit, subscribeNewsletter } from "../api";
import "./Contact.css";

function Contact() {
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [siteVisitForm, setSiteVisitForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_date: "",
    preferred_time: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeTab, setActiveTab] = useState("enquiry");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitEnquiry(enquiryForm);
      setMessage({
        type: "success",
        text: "Thank you! We will contact you soon.",
      });
      setEnquiryForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }
    setLoading(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleSiteVisitSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await scheduleSiteVisit(siteVisitForm);
      setMessage({
        type: "success",
        text: "Site visit scheduled! We will confirm shortly.",
      });
      setSiteVisitForm({
        name: "",
        email: "",
        phone: "",
        preferred_date: "",
        preferred_time: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }
    setLoading(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribeNewsletter(newsletterEmail);
      setMessage({
        type: "success",
        text: "Successfully subscribed to newsletter!",
      });
      setNewsletterEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }
    setLoading(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Ready to own your dream plot? Connect with us today!
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info" data-aos="fade-right">
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-content">
                <h4>Address</h4>
                <p>
                  Office No 103, 104, Icon Tower,
                  <br />
                  Bhumkar Chowk Rd, Wakad,
                  <br />
                  Pimpri-Chinchwad, Pune 411057
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="info-content">
                <h4>Phone</h4>
                <p>+91 9503103217</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-content">
                <h4>Email</h4>
                <p>info@homesca.in</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="info-content">
                <h4>Site Visit Hours</h4>
                <p>Mon - Sun: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper" data-aos="fade-left">
            <div className="form-tabs">
              <button
                className={`tab-btn ${activeTab === "enquiry" ? "active" : ""}`}
                onClick={() => setActiveTab("enquiry")}
              >
                Enquire Now
              </button>
              <button
                className={`tab-btn ${activeTab === "sitevisit" ? "active" : ""}`}
                onClick={() => setActiveTab("sitevisit")}
              >
                Schedule Site Visit
              </button>
            </div>

            {message.text && (
              <div className={`form-message ${message.type}`}>
                {message.text}
              </div>
            )}

            {activeTab === "enquiry" && (
              <form onSubmit={handleEnquirySubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={enquiryForm.name}
                    onChange={(e) =>
                      setEnquiryForm({ ...enquiryForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={enquiryForm.email}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={enquiryForm.phone}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    value={enquiryForm.message}
                    onChange={(e) =>
                      setEnquiryForm({
                        ...enquiryForm,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit Enquiry"}
                </button>
              </form>
            )}

            {activeTab === "sitevisit" && (
              <form onSubmit={handleSiteVisitSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={siteVisitForm.name}
                    onChange={(e) =>
                      setSiteVisitForm({
                        ...siteVisitForm,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={siteVisitForm.email}
                      onChange={(e) =>
                        setSiteVisitForm({
                          ...siteVisitForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={siteVisitForm.phone}
                      onChange={(e) =>
                        setSiteVisitForm({
                          ...siteVisitForm,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="date"
                      value={siteVisitForm.preferred_date}
                      onChange={(e) =>
                        setSiteVisitForm({
                          ...siteVisitForm,
                          preferred_date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      value={siteVisitForm.preferred_time}
                      onChange={(e) =>
                        setSiteVisitForm({
                          ...siteVisitForm,
                          preferred_time: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Time *</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? "Scheduling..." : "Schedule Visit"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter" data-aos="fade-up">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest updates on pricing and offers</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
