import React from "react";

function Gallery() {
  return (
    <div className="gallery-page">

      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <h1>Our Gallery</h1>
          <p>Snapshots of our events, programs, and the communities we serve.</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-grid">
            <img src="/assets/image/pty.jpg" alt="Gallery 1" />
            <img src="/assets/image/pty.jpg" alt="Gallery 2" />
            <img src="/assets/image/pty.jpg" alt="Gallery 3" />
            <img src="/assets/image/pty.jpg" alt="Gallery 4" />
            <img src="/assets/image/pty.jpg" alt="Gallery 5" />
            <img src="/assets/image/pty.jpg" alt="Gallery 6" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="gallery-cta">
        <h2>Support Our Work</h2>
        <a href="/donate" className="btn-primary">Donate Now</a>
      </section>

    </div>
  );
}

export default Gallery;
