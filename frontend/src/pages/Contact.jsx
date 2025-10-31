import React from "react";

function Contact() {
  return (
    <div className="contact-page">

      {/* ===== Hero Section ===== */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you! Reach out with any questions or to get involved.
          </p>
        </div>
      </section>

      {/* ===== Contact Info Section ===== */}
      <section className="contact-info">
        <div className="container info-grid">
          <div className="info-card">
            <h3>Address</h3>
            <p>Adoato Adumanu, Church Of God, Kumasi, Ghana</p>
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <p>info@blessinggates.org</p>
          </div>
          <div className="info-card">
            <h3>Phone</h3>
            <p>+233 54 339 6096</p>
          </div>
        </div>
      </section>

      {/* ===== Contact Form Section ===== */}
      <section className="contact-form-section">
        <div className="container">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ===== Map Section ===== */}
      <section className="contact-map">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            {/* Replace with your actual Google Maps embed */}
            <iframe
              title="Blessing Gates Foundation Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.770203255633!2d-1.6242375250212176!3d6.667684421616731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDAnMDMuNyJOIDEuMzcwJzIxLjMiVw!5e0!3m2!1sen!2sgh!4v1695555555555!5m2!1sen!2sgh"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
