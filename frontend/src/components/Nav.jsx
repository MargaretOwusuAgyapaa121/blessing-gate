import { useState } from "react";
import { Link } from "react-router-dom";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      {/* Logo + Foundation Name */}
      <div className="nav-logo">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src="/assets/image/logo/logo.jpg" alt="Foundation Logo" className="logo-img" />
          <span className="logo-text">Blessing Gate</span>
        </Link>
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/programs" onClick={() => setIsOpen(false)}>Programs</Link>
        <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <Link to="/events" onClick={() => setIsOpen(false)}>Events</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        <Link to="/donate" className="donate-btn" onClick={() => setIsOpen(false)}>Donate</Link>
      </div>

      {/* Hamburger Menu */}
      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
