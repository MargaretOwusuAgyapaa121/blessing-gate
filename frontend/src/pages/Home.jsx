import React from "react";



function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Empowering Communities, Changing Lives</h1>
          <p>
            Our foundation is dedicated to uplifting lives through education,
            healthcare, and community development. Together, we can build a brighter future.
          </p>
          <div className="hero-buttons">
            <a href="/donate" className="btn-primary">Donate Now</a>
            <a href="/about" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-preview">
        <div className="about-container">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              We are a non-profit organization focused on creating meaningful
              change in underprivileged communities. Our work spans across
              education, health, and empowerment.
            </p>
            <a href="/about" className="btn-link">Read More →</a>
          </div>
          <div className="about-image">
            <img src="/assets/image/pres.jpg" alt="About Us" />
          </div>
        </div>
      </section>


      {/* Programs Section */}
    <section className="programs">
  <h2>Our Focus Areas</h2>
  <div className="program-grid">
    <div className="program-card">
      <img src="/assets/image/executive.jpg" alt="Education" />
      <div className="program-overlay">
        <h3>Education</h3>
        <p>Providing access to quality education and scholarships.</p>
      </div>
    </div>

    <div className="program-card">
      <img src="/assets/image/rhab1.jpg" alt="Healthcare" />
      <div className="program-overlay">
        <h3>Healthcare</h3>
        <p>Supporting health camps and essential medical care.</p>
      </div>
    </div>

    <div className="program-card">
      <img src="/assets/image/wid3.jpg" alt="Community" />
      <div className="program-overlay">
        <h3>Community</h3>
        <p>Empowering families through training and opportunities.</p>
      </div>
    </div>
  </div>
</section>

   {/* Events Preview */}
<section className="events-preview">
  <h2>Upcoming Events</h2>

  <div className="event-grid">
    {/* Event Card 1 */}
    <div className="event-card">
      <img src="/assets/image/events/event.jpg" alt="Charity Walk 2025" />
      <div className="event-overlay">
        <div className="event-info">
          <h3>Charity Walk 2025</h3>
          <p>
            Join us on <strong>October 25, 2025</strong>, for a dinner with Asuofua ghettos .
          </p>
          <a href="/events" className="btn-event">View Details</a>
        </div>
      </div>
    </div>
  </div>
</section>



     {/* Gallery Preview */}
<section className="gallery-preview">
  <h2>From Our Gallery</h2>

  <div className="gallery-grid">
    <div className="gallery-item">
      <img src="/assets/image/dinner/d1.jpg" alt="Gallery 1" />
    </div>
    <div className="gallery-item">
      <img src="/assets/image/dinner/d3.jpg" alt="Gallery 2" />
    </div>
    <div className="gallery-item">
      <img src="/assets/image/dinner/d9.jpg" alt="Gallery 3" />
    </div>
     <div className="gallery-item">
      <img src="/assets/image/banner5.jpg" alt="Gallery 3" />
    </div>
  </div>

  <a href="/gallery" className="btn-link">View Full Gallery →</a>
</section>

     

      {/* Call to Action Banner */}
      <section className="cta-banner">
        <h2>Be Part of the Change</h2>
        <a href="/donate" className="btn-primary">Donate Today</a>
      </section>
    </div>
  );
}

export default Home;
