// App.js
import React from "react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Events from "../pages/Event";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Donate from "../pages/Donation";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} /> 
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
