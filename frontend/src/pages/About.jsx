import React from "react";

function About() {
  return (
    <div className="about-page">

      {/* ===== Hero Section ===== */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Our Foundation</h1>
          <p>
            We are committed to creating lasting change in communities by providing
            education, healthcare, and opportunities for empowerment.
          </p>
        </div>
      </section>

      {/* ===== Mission Section ===== */}
      <section className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to uplift underprivileged communities and provide access
            to essential resources, knowledge, and support to help individuals and
            families thrive.
          </p>
        </div>
      </section>

      {/* ===== Vision Section ===== */}
      <section className="about-vision">
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p>
            We envision a world where every individual has the opportunity to achieve
            their full potential, and communities are strong, healthy, and empowered.
          </p>
        </div>
      </section>

      {/* ===== Our Team Section ===== */}
      <section className="about-team">
        <div className="team-content">
          <h2>Meet Our Team</h2>
          <div className="team-grid">

            <div className="team-card">
              <img src="/assets/image/dinner/t2.jpg" alt="Founder" />
              <div className="team-info">
                <h3>Prophet Nhyiraba Sekyi Bernard</h3>
                <p>Founder</p>
              </div>
            </div>

            <div className="team-card">
              <img src="/assets/image/dinner/t.jpg" alt="Programs Director" />
              <div className="team-info">
                <h3>Bishop Ernest Anyane Asare</h3>
                <p>Programs Director</p>
              </div>
            </div>

            <div className="team-card">
              <img src="/assets/image/bishop b.jpg" alt="Management Team" />
              <div className="team-info">
                <h3>Management Team</h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Join Us in Making a Difference</h2>
          <a href="/donate" className="btn-primary">Donate Now</a>
        </div>
      </section>

    </div>
  );
}

export default About;
