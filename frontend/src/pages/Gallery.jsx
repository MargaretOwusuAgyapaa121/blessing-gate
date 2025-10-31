import React, { useState } from "react";

function Gallery() {
  const [activeMedia, setActiveMedia] = useState(null);

  const media = [
    "/assets/image/videos/v3.mp4",
    "/assets/image/dinner/d1.jpg",
    "/assets/image/dinner/d3.jpg",
    "/assets/image/videos/v5.mp4",
    "/assets/image/dinner/d4.jpg",
    "/assets/image/dinner/d5.jpg",
    "/assets/image/videos/v1.mp4",
    "/assets/image/dinner/d6.jpg",
    "/assets/image/dinner/d7.jpg",
    "/assets/image/back.jpg",
    "/assets/image/videos/v2.mp4",
    "/assets/image/banner2.jpg",
    "/assets/image/banner4.jpg",
    "/assets/image/banner5.jpg",
    "/assets/image/banner6.jpg",
    "/assets/image/bishop b.jpg",
    "/assets/image/bishop.jpg",
    "/assets/image/bles.jpg",
    "/assets/image/executive.jpg",
    "/assets/image/gallery.jpg",
    "/assets/image/KD.jpg",
    "/assets/image/KDD.jpg",
    "/assets/image/pl.jpg",
    "/assets/image/rhab1.jpg",
    "/assets/image/rhab2.jpg",
    "/assets/image/rhab3.jpg",
    "/assets/image/rhab8.jpg",
    "/assets/image/rhab9.jpg",
    "/assets/image/wid3.jpg",
    "/assets/image/widow2.jpg",
  ];

  const toggleMedia = (index) => {
    setActiveMedia(activeMedia === index ? null : index);
  };

  return (
    <div className={`gallery-page ${activeMedia !== null ? "dimmed" : ""}`}>
      {/* ===== Hero Section ===== */}
      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <h1>Our Gallery</h1>
          <p>Snapshots and videos from our events and the communities we serve.</p>
        </div>
      </section>

      {/* ===== Gallery Grid ===== */}
      <section className="gallery-section">
        <div className="gallery-grid">
          {media.map((src, index) => {
            const isVideo = src.endsWith(".mp4");
            const isActive = activeMedia === index;

            return (
              <div
                key={index}
                className={`gallery-item ${isActive ? "active" : ""}`}
                onClick={() => toggleMedia(index)}
              >
                {isVideo ? (
                  <video
                    src={src}
                    muted={!isActive}
                    autoPlay={isActive}
                    loop
                    playsInline
                    controls={isActive}
                    preload="metadata"
                  />
                ) : (
                  <img src={src} alt={`Gallery ${index + 1}`} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="gallery-cta">
        <h2>Support Our Work</h2>
        <a href="/donate" className="btn-primary">Donate Now</a>
      </section>
    </div>
  );
}

export default Gallery;
