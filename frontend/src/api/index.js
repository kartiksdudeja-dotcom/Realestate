import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Enquiry APIs
export const submitEnquiry = (data) => api.post("/api/enquiries", data);

// Site Visit APIs
export const scheduleSiteVisit = (data) => api.post("/api/site-visits", data);

// Newsletter APIs
export const subscribeNewsletter = (email) =>
  api.post("/api/newsletter", { email });

// Content APIs
export const getHighlights = () => api.get("/api/highlights");
export const getAmenities = () => api.get("/api/amenities");
export const getPlots = () => api.get("/api/plots");
export const getLocations = () => api.get("/api/locations");
export const getGalleryImages = () => api.get("/api/gallery");

// Health Check
export const healthCheck = () => api.get("/api/health");

export default api;
