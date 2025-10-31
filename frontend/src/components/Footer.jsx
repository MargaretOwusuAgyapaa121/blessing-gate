import React from "react";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Logo + About */}
        <div className="footer-section about">
          <img src="/assets/image/logo/logo (2).jpg" alt="Logo" className="footer-logo" />
          <p>
            Empowering communities through knowledge, events, and innovation. 
            Join us in shaping a brighter future.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right: Socials */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Blessing Gate. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
