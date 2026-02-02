import { useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=450&fit=crop",
      alt: "Project View 1",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=450&fit=crop",
      alt: "Project View 2",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop",
      alt: "Project View 3",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop",
      alt: "Project View 4",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=450&fit=crop",
      alt: "Project View 5",
    },
    {
      src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=450&fit=crop",
      alt: "Project View 6",
    },
  ];

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Gallery</span>
          <h2 className="section-title">Project Gallery</h2>
          <p className="section-subtitle">
            Explore the beautiful views and infrastructure of NORA at Life
            Republic
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} />
              <div className="gallery-overlay">
                <i className="fas fa-expand"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
          >
            <i className="fas fa-times"></i>
          </button>
          <img src={selectedImage.src} alt={selectedImage.alt} />
        </div>
      )}
    </section>
  );
}

export default Gallery;
