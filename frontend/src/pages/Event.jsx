import React from "react";

function Events() {
  const events = [
    {
      id: 1,
      title: "Blessing Outreach Program",
      date: "October 17, 2025",
      description: "This october, our foundation will be hosting a special outreach program.",
      image: "/assets/image/events/event.jpg",
      link: "/events/1"
    },
    // {
    //   id: 2,
    //   title: "Health Camp Initiative",
    //   date: "April 10, 2025",
    //   description: "Free health checkups and medical support for local communities.",
    //   image: "/assets/image/events/event2.jpg",
    //   link: "/events/2"
    // },
    {
      id: 3,
      title: "Community Training Workshop",
      date: "May 5, 2025",
      description: "Empowering families with skills and resources for growth.",
      image: "/assets/image/events/event3.jpg",
      link: "/events/3"
    }
  ];

  return (
    <div className="events-page">

      {/* Hero Section */}
      <section className="events-hero">
        <div className="events-hero-content">
          <h1>Upcoming Events</h1>
          <p>Be part of our mission! Check out our upcoming events and join us in making a difference.</p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="events-section">
        <div className="container">
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.title} />
                <div className="event-overlay">
                  <h3>{event.title}</h3>
                  <p><strong>{event.date}</strong></p>
                  <p>{event.description}</p>
                  <a href={event.link} className="btn-event">View Details</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="events-cta">
        <h2>Don't Miss Our Upcoming Programs</h2>
        <a href="/donate" className="btn-primary">Support Us</a>
      </section>

    </div>
  );
}

export default Events;
