/* ============================================
   PREMIUM REAL ESTATE WEBSITE - MAIN JAVASCRIPT
   ============================================ */

// API Base URL - Change to your Render backend URL after deployment
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? ""
    : "https://YOUR-RENDER-APP-NAME.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // PRELOADER
  // ============================================
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500);
  });

  // ============================================
  // INITIALIZE AOS (Animate on Scroll)
  // ============================================
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // ============================================
  // NAVBAR FUNCTIONALITY
  // ============================================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  // ============================================
  // SMOOTH SCROLLING
  // ============================================
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("href");

      if (!target || target === "#") {
        e.preventDefault();
        return;
      }

      const element = document.querySelector(target);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ============================================
  // FORM SUBMISSIONS
  // ============================================

  // Enquiry Form
  const enquiryForm = document.getElementById("enquiryForm");
  const formSuccess = document.getElementById("formSuccess");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: this.querySelector("#name").value,
        email: this.querySelector("#email").value,
        phone: this.querySelector("#phone").value,
        message: this.querySelector("#message").value,
        enquiry_type: "general",
      };

      try {
        const response = await fetch("/api/enquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          enquiryForm.style.display = "none";
          formSuccess.style.display = "block";
          this.reset();
        } else {
          showNotification(
            result.message || "Something went wrong. Please try again.",
            "error",
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification("Something went wrong. Please try again.", "error");
      }
    });
  }

  // Site Visit Form
  const siteVisitForm = document.getElementById("siteVisitForm");
  const visitSuccess = document.getElementById("visitSuccess");

  if (siteVisitForm) {
    siteVisitForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: this.querySelector("#visitName").value,
        phone: this.querySelector("#visitPhone").value,
        preferred_date: this.querySelector("#visitDate").value,
        preferred_time: this.querySelector("#visitTime").value,
      };

      try {
        const response = await fetch(API_BASE_URL + "/api/site-visits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          siteVisitForm.style.display = "none";
          visitSuccess.style.display = "block";
          this.reset();
        } else {
          showNotification(
            result.message || "Something went wrong. Please try again.",
            "error",
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification("Something went wrong. Please try again.", "error");
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      try {
        const response = await fetch(API_BASE_URL + "/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (result.success) {
          showNotification("Successfully subscribed to newsletter!", "success");
          this.reset();
        } else {
          showNotification(
            result.message || "Something went wrong. Please try again.",
            "error",
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification("Something went wrong. Please try again.", "error");
      }
    });
  }

  // ============================================
  // ============================================
  // ENQUIRY MODAL
  // ============================================
  const enquiryModal = document.getElementById("enquiryModal");
  const modalEnquiryForm = document.getElementById("modalEnquiryForm");
  const modalSuccess = document.getElementById("modalSuccess");

  // Function to open enquiry modal
  window.openEnquiryModal = function () {
    if (enquiryModal) {
      enquiryModal.classList.add("active");
      document.body.style.overflow = "hidden";
      // Reset form and show it
      if (modalEnquiryForm) {
        modalEnquiryForm.style.display = "block";
        modalEnquiryForm.reset();
      }
      if (modalSuccess) {
        modalSuccess.style.display = "none";
      }
    }
  };

  // Function to close enquiry modal
  window.closeEnquiryModal = function () {
    if (enquiryModal) {
      enquiryModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  // Add click listeners to all "Enquire Now" buttons and links
  document
    .querySelectorAll('a[href="#contact"], .btn-primary')
    .forEach((btn) => {
      const text = btn.textContent.toLowerCase();
      if (
        text.includes("enquire") ||
        text.includes("get price") ||
        text.includes("know more")
      ) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openEnquiryModal();
        });
      }
    });

  // Mobile bottom bar enquire button
  const mobileEnquireBtn = document.querySelector(".bottom-bar-item.enquire");
  if (mobileEnquireBtn) {
    mobileEnquireBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openEnquiryModal();
    });
  }

  // Close enquiry modal
  if (enquiryModal) {
    const enquiryClose = enquiryModal.querySelector(".modal-close");
    if (enquiryClose) {
      enquiryClose.addEventListener("click", closeEnquiryModal);
    }
    enquiryModal.addEventListener("click", (e) => {
      if (e.target === enquiryModal) {
        closeEnquiryModal();
      }
    });
  }

  // Modal Enquiry Form submission
  if (modalEnquiryForm) {
    modalEnquiryForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        phone: this.querySelector('input[name="phone"]').value,
        message: this.querySelector('textarea[name="message"]').value,
        enquiry_type: this.querySelector('select[name="interest"]').value,
      };

      try {
        const response = await fetch(API_BASE_URL + "/api/enquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          // Show success message
          modalEnquiryForm.style.display = "none";
          modalSuccess.style.display = "block";
          this.reset();
        } else {
          showNotification(
            result.message || "Something went wrong. Please try again.",
            "error",
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification(
          "Thank you! Your enquiry has been submitted.",
          "success",
        );
        modalEnquiryForm.style.display = "none";
        modalSuccess.style.display = "block";
        this.reset();
      }
    });
  }

  // ============================================
  // LIGHTBOX FOR GALLERY
  // ============================================
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox-image");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      if (lightboxImage) {
        lightboxImage.src = imgSrc;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message, type = "success") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "#1a472a" : "#dc3545"};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;

    // Add animation keyframes
    if (!document.getElementById("notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            margin-left: 10px;
        `;
    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // ============================================
  // LOAD DYNAMIC CONTENT FROM API
  // ============================================

  // Load Highlights
  async function loadHighlights() {
    try {
      const response = await fetch(API_BASE_URL + "/api/highlights");
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const container = document.getElementById("highlightsContainer");
        if (container) {
          container.innerHTML = result.data
            .map(
              (item, index) => `
                        <div class="highlight-card" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                            <div class="highlight-icon">
                                <i class="${item.icon || "fas fa-star"}"></i>
                            </div>
                            <h3 class="highlight-title">${item.title}</h3>
                            <p class="highlight-text">${item.description || ""}</p>
                        </div>
                    `,
            )
            .join("");

          // Reinitialize AOS for new elements
          AOS.refresh();
        }
      }
    } catch (error) {
      console.log("Using static highlights content");
    }
  }

  // Load Amenities
  async function loadAmenities() {
    try {
      const response = await fetch(API_BASE_URL + "/api/amenities");
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const container = document.getElementById("amenitiesContainer");
        if (container) {
          container.innerHTML = result.data
            .map(
              (item, index) => `
                        <div class="amenity-card" data-aos="zoom-in" data-aos-delay="${100 + index * 50}">
                            <div class="amenity-icon">
                                <i class="${item.icon || "fas fa-check"}"></i>
                            </div>
                            <h4 class="amenity-name">${item.name}</h4>
                        </div>
                    `,
            )
            .join("");

          AOS.refresh();
        }
      }
    } catch (error) {
      console.log("Using static amenities content");
    }
  }

  // Load Plot Details
  async function loadPlots() {
    try {
      const response = await fetch(API_BASE_URL + "/api/plots");
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const container = document.getElementById("plotsContainer");
        if (container) {
          container.innerHTML = result.data
            .map(
              (item, index) => `
                        <div class="plot-card ${index === 1 ? "featured" : ""}" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                            <div class="plot-header">
                                <span class="plot-type">${item.plot_type}</span>
                                <span class="plot-badge">${index === 1 ? "Best Value" : index === 0 ? "Popular" : "Exclusive"}</span>
                            </div>
                            <div class="plot-size">
                                <span class="size-label">Size Range</span>
                                <span class="size-value">${item.size_range}</span>
                            </div>
                            <div class="plot-price">
                                <span class="price-label">Starting from</span>
                                <span class="price-value">₹ ${item.price_start} ${item.price_unit}*</span>
                            </div>
                            <ul class="plot-features">
                                <li><i class="fas fa-check"></i> Clear NA Title</li>
                                <li><i class="fas fa-check"></i> FSI: ${item.fsi || "1.0"}</li>
                                <li><i class="fas fa-check"></i> Ready for Construction</li>
                                <li><i class="fas fa-check"></i> All Amenities Access</li>
                            </ul>
                            <a href="#contact" class="btn btn-primary btn-block">Get Price Details</a>
                        </div>
                    `,
            )
            .join("");

          AOS.refresh();
        }
      }
    } catch (error) {
      console.log("Using static plots content");
    }
  }

  // Load Location Advantages
  async function loadLocations() {
    try {
      const response = await fetch(API_BASE_URL + "/api/locations");
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const connectivityList = document.getElementById("connectivityList");
        if (connectivityList) {
          const connectivityItems = result.data.filter(
            (item) => item.category === "connectivity",
          );
          if (connectivityItems.length > 0) {
            connectivityList.innerHTML = connectivityItems
              .map(
                (item) => `
                            <li>
                                <span class="place">${item.place_name}</span>
                                <span class="distance">${item.distance}</span>
                            </li>
                        `,
              )
              .join("");
          }
        }
      }
    } catch (error) {
      console.log("Using static location content");
    }
  }

  // Load dynamic content
  loadHighlights();
  loadAmenities();
  loadPlots();
  loadLocations();

  // ============================================
  // SET MINIMUM DATE FOR SITE VISIT
  // ============================================
  const visitDateInput = document.getElementById("visitDate");
  if (visitDateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    visitDateInput.min = tomorrow.toISOString().split("T")[0];
  }

  // ============================================
  // PHONE NUMBER VALIDATION
  // ============================================
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
  });

  // ============================================
  // ESCAPE KEY TO CLOSE MODALS
  // ============================================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (brochureModal?.classList.contains("active")) {
        closeBrochureModal();
      }
      if (enquiryModal?.classList.contains("active")) {
        closeEnquiryModal();
      }
      if (lightbox?.classList.contains("active")) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });

  // ============================================
  // HERO SLIDER (if multiple slides)
  // ============================================
  const heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 1) {
    let currentSlide = 0;

    setInterval(() => {
      heroSlides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add("active");
    }, 5000);
  }

  // ============================================
  // AI CHATBOT WIDGET
  // ============================================
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatMessages = document.getElementById("chatbotMessages");
  const quickReplies = document.querySelectorAll(".quick-reply");

  // Chatbot responses database
  const chatbotResponses = {
    "plot sizes": {
      text: "NORA offers 70 exclusive plots in three categories:\n\n📐 **Compact Plots:** 142-175 Sq.m. (1533-1883 Sq.ft.)\n📐 **Premium Plots:** 180-257 Sq.m. (1937-2766 Sq.ft.)\n📐 **Luxury Plots:** 265-376 Sq.m. (2852-4054 Sq.ft.)\n\nAll plots come with FSI 1:1 and are completely developed!",
      followUp: "Would you like to know about pricing or amenities?",
    },
    prices: {
      text: "For the best prices and exclusive offers on NORA plots, I recommend speaking with our sales team directly.\n\n💰 Prices vary based on plot size and location within the development.\n\nWould you like me to arrange a callback from our team?",
      followUp:
        "You can also schedule a site visit to see the plots in person!",
    },
    amenities: {
      text: "NORA at Life Republic offers world-class amenities:\n\n🏊 Resort-style clubhouse & swimming pool\n🏋️ Gymnasium & sports facilities\n🌳 Zen gardens & sensory trails\n🎮 Indoor games & entertainment\n🛡️ 24/7 security with CCTV\n🚰 Water treatment & sewage system\n\nAll within a 390-acre township!",
      followUp:
        "Would you like to schedule a site visit to see these amenities?",
    },
    location: {
      text: "NORA is located in the heart of Life Republic Township:\n\n📍 **Address:** Survey No. 74, Marunji, Hinjawadi, Pune-411057\n\n🚗 **Key Distances:**\n• Hinjawadi IT Park - 5 mins\n• Wakad - 10 mins\n• Mumbai-Pune Expressway - 15 mins\n• Pune Airport - 30 mins",
      followUp: "Would you like directions or want to schedule a site visit?",
    },
    "site visit": {
      text: "Great choice! I'll help you schedule a site visit. 🚗\n\nPlease share your:\n1. Full Name\n2. Contact Number\n3. Preferred Date & Time\n\nOr click the button below to fill the form directly!",
      action: "siteVisit",
    },
    developer: {
      text: "NORA is developed by **Kolte-Patil Developers Ltd** - one of Pune's most trusted real estate developers!\n\n🏆 30+ years of excellence\n🏠 15,000+ happy families\n⭐ Multiple awards for quality\n✅ Transparent dealings & timely possession",
      followUp: "Would you like to know more about the project?",
    },
    default: {
      text: "Thank you for your interest in NORA at Life Republic! 😊\n\nI can help you with:\n• Plot sizes & pricing\n• Amenities information\n• Location details\n• Site visit scheduling\n\nOr you can speak directly with our team at **+91 95031 03217**",
      followUp: "",
    },
  };

  // Open/Close chatbot
  if (chatbotToggle) {
    chatbotToggle.addEventListener("click", () => {
      chatbotWindow.classList.add("active");
      chatbotToggle.style.display = "none";
    });
  }

  if (chatbotClose) {
    chatbotClose.addEventListener("click", () => {
      chatbotWindow.classList.remove("active");
      chatbotToggle.style.display = "flex";
    });
  }

  // Add message to chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${isUser ? "user" : "bot"}`;

    const avatarHtml = isUser
      ? ""
      : `
            <div class="message-avatar">
                <img src="https://ui-avatars.com/api/?name=Sales+Assistant&background=c9a227&color=fff&size=32" alt="Sales Assistant">
            </div>
        `;

    // Convert markdown-like bold to HTML
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    messageDiv.innerHTML = `
            ${avatarHtml}
            <div class="message-content">
                <p>${formattedText}</p>
            </div>
        `;

    // Remove quick replies before adding new message
    const existingQuickReplies = chatMessages.querySelector(
      ".chat-quick-replies",
    );
    if (existingQuickReplies && !isUser) {
      existingQuickReplies.remove();
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-message bot typing-message";
    typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="https://ui-avatars.com/api/?name=Sales+Assistant&background=c9a227&color=fff&size=32" alt="Sales Assistant">
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  // Get response based on user message
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("plot") ||
      lowerMessage.includes("size") ||
      lowerMessage.includes("area")
    ) {
      return chatbotResponses["plot sizes"];
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("rate") ||
      lowerMessage.includes("budget")
    ) {
      return chatbotResponses["prices"];
    } else if (
      lowerMessage.includes("ameniti") ||
      lowerMessage.includes("facilit") ||
      lowerMessage.includes("club") ||
      lowerMessage.includes("pool")
    ) {
      return chatbotResponses["amenities"];
    } else if (
      lowerMessage.includes("locat") ||
      lowerMessage.includes("address") ||
      lowerMessage.includes("where") ||
      lowerMessage.includes("direction")
    ) {
      return chatbotResponses["location"];
    } else if (
      lowerMessage.includes("visit") ||
      lowerMessage.includes("see") ||
      lowerMessage.includes("come") ||
      lowerMessage.includes("schedule")
    ) {
      return chatbotResponses["site visit"];
    } else if (
      lowerMessage.includes("developer") ||
      lowerMessage.includes("kolte") ||
      lowerMessage.includes("builder") ||
      lowerMessage.includes("company")
    ) {
      return chatbotResponses["developer"];
    } else if (
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hey")
    ) {
      return {
        text: "Hello! 👋 Welcome to NORA at Life Republic. How can I assist you today?",
        followUp:
          "Feel free to ask about plots, pricing, amenities, or schedule a site visit!",
      };
    } else if (lowerMessage.includes("thank")) {
      return {
        text: "You're welcome! 😊 Feel free to reach out anytime. You can also call us at **+91 95031 03217** for immediate assistance.",
        followUp: "",
      };
    }

    return chatbotResponses["default"];
  }

  // Add action buttons
  function addActionButton(action) {
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "chat-quick-replies";

    if (action === "siteVisit") {
      buttonDiv.innerHTML = `
                <button class="quick-reply action-btn" onclick="openEnquiryModal(); return false;">
                    📅 Schedule Visit
                </button>
                <button class="quick-reply" onclick="window.open('tel:+919503103217')">
                    📞 Call Now
                </button>
            `;
    } else if (action === "brochure") {
      buttonDiv.innerHTML = `
                <button class="quick-reply action-btn" onclick="openBrochureModal(); return false;">
                    📥 Get Brochure
                </button>
            `;
    }

    chatMessages.appendChild(buttonDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Process user message
  function processMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, true);

    // Clear input
    if (chatInput) chatInput.value = "";

    // Show typing indicator
    const typingIndicator = showTyping();

    // Simulate response delay
    setTimeout(
      () => {
        typingIndicator.remove();

        const response = getBotResponse(message);
        addMessage(response.text);

        if (response.followUp) {
          setTimeout(() => {
            addMessage(response.followUp);
          }, 500);
        }

        if (response.action) {
          setTimeout(() => {
            addActionButton(response.action);
          }, 300);
        }
      },
      1000 + Math.random() * 500,
    );
  }

  // Send message on button click
  if (chatSendBtn) {
    chatSendBtn.addEventListener("click", () => {
      processMessage(chatInput.value);
    });
  }

  // Send message on Enter key
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        processMessage(chatInput.value);
      }
    });
  }

  // Quick replies
  quickReplies.forEach((btn) => {
    btn.addEventListener("click", () => {
      const message = btn.getAttribute("data-message");
      processMessage(message);
    });
  });

  console.log("🏠 Premium Real Estate Website Initialized Successfully!");
});
