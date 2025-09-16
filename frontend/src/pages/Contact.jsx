import React from "react";

function Contact() {
  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Reach out with any questions or to get involved.</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info">
        <div className="container info-grid">
          <div className="info-card">
            <h3>Address</h3>
            <p>123 Charity Lane, Kumasi, Ghana</p>
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <p>info@charityfoundation.org</p>
          </div>
          <div className="info-card">
            <h3>Phone</h3>
            <p>+233 20 123 4567</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            {/* Replace with actual Google Map iframe */}
            <p>Google Map Placeholder</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
