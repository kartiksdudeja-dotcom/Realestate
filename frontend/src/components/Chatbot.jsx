import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 Welcome to NORA at Life Republic. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Plot Sizes",
    "Pricing",
    "Location",
    "Amenities",
    "Site Visit",
  ];

  const botResponses = {
    "plot sizes":
      "NORA offers premium NA plots ranging from 2152 sq.ft. to 4304 sq.ft. All plots are NA approved and ready for construction.",
    pricing:
      "Plot prices start from ₹6,000/sq.ft. onwards. For 2152 sq.ft. plots, pricing starts at ₹1.29 Cr*. Would you like to know more about specific plot sizes?",
    location:
      "NORA is located at Survey No. 74, Marunji, Hinjawadi, Pune-411057. It's just 5 mins from Hinjawadi IT Park and the upcoming Metro station.",
    amenities:
      "Life Republic offers 100+ amenities including swimming pool, gymnasium, clubhouse, jogging track, sports courts, landscaped gardens, and 24x7 security.",
    "site visit":
      "Great! You can schedule a site visit through our contact form. Our site office is open from 9 AM to 7 PM, all days of the week.",
    default:
      "Thank you for your interest in NORA at Life Republic! For detailed information, please call us at +91 98765 43210 or fill out our contact form.",
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text }]);

    // Find matching response
    const lowerText = text.toLowerCase();
    let response = botResponses.default;

    for (const [key, value] of Object.entries(botResponses)) {
      if (lowerText.includes(key)) {
        response = value;
        break;
      }
    }

    // Add bot response after delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
    }, 500);

    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-comments"></i>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <img
                src="https://ui-avatars.com/api/?name=Sales+Assistant&background=c9a227&color=fff"
                alt="Sales Assistant"
              />
            </div>
            <div className="chatbot-info">
              <h4>Sales Assistant</h4>
              <span>Online</span>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply"
                onClick={() => handleSend(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={() => handleSend()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
