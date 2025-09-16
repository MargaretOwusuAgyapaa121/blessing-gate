import React from "react";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Our Foundation</h1>
          <p>
            We are committed to creating lasting change in communities by providing education, healthcare, and opportunities for empowerment.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            Our mission is to uplift underprivileged communities and provide access to essential resources, knowledge, and support to help individuals and families thrive.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-vision">
        <div className="container">
          <h2>Our Vision</h2>
          <p>
            We envision a world where every individual has the opportunity to achieve their full potential, and communities are strong, healthy, and empowered.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="about-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <img src="/assets/image/team1.jpg" alt="Founder" />
              <h3>Jane Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-card">
              <img src="/assets/image/team2.jpg" alt="Program Lead" />
              <h3>John Smith</h3>
              <p>Programs Director</p>
            </div>
            <div className="team-card">
              <img src="/assets/image/team3.jpg" alt="Community Lead" />
              <h3>Mary Johnson</h3>
              <p>Community Outreach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Join Us in Making a Difference</h2>
        <a href="/donate" className="btn-primary">Donate Now</a>
      </section>
    </div>
  );
}

export default About;
