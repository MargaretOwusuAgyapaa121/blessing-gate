import React from "react";

function Donate() {
  return (
    <div className="donate-page">

      {/* Hero Section */}
      <section className="donate-hero">
        <div className="donate-hero-content">
          <h1>Support Our Mission</h1>
          <p>Your contribution helps us bring education, healthcare, and empowerment to communities in need.</p>
        </div>
      </section>

      {/* Side-by-Side Flyer + Info */}
      <section className="donation-flyer-section">
        <div className="flyer-container">

          {/* Flyer */}
          <div className="flyer-image">
            <img src="/assets/image/events/events1.jpg" alt="Donation Flyer" />
          </div>

          {/* Info Box */}
          <div className="flyer-info">
            <h2>Join the Blessing Gates Group Foundation</h2>
            <p>
              Your support allows us to fund education, healthcare, and community development programs.
              Every contribution, big or small, makes a real difference.
            </p>
            <h3>How to Donate:</h3>
            <ul>
              <li>WhatsApp: <a href="https://wa.me/233543396096" target="_blank" rel="noopener noreferrer">+233543396096</a></li>
              <li>Email: <a href="mailto:info@blessinggates.org">info@blessinggates.org</a></li>
              <li>Bank Transfer: Momo No. 543396096 (Blessing Gates Foundation)</li>
            </ul>
            <a href="https://wa.me/233543396096" className="btn-primary" target="_blank" rel="noopener noreferrer">
              WhatsApp Us to Donate
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Donate;
