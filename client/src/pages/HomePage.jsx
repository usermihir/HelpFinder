import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
        <Navbar/>
      {/* Hero Section */}
      <section className="hero">
        <h1>Verified Help, Anytime. Anywhere.</h1>
        <p>Find trusted maids, cooks, tutors & more near you.</p>
        <Link to="/workers" className="explore-button">Explore Workers</Link>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-grid">
          {['Maid', 'Cook', 'Tutor', 'Electrician'].map(service => (
  <Link to={`/workers?type=${service.toLowerCase()}`} className="service-card" key={service}>
    <img src={`/${service.toLowerCase()}.png`} alt={service} />
    <h3>{service}</h3>
    <p>Skilled and background-verified {service.toLowerCase()}s available near you.</p>
  </Link>
))}

        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Search</h3>
            <p>Choose the category and explore verified workers</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>Book</h3>
            <p>Pick your date and send a booking request</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Get Help</h3>
            <p>Worker arrives and job gets done!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Verified Domestic Help Finder &copy; {new Date().getFullYear()}</p>
        <Link to="/contact">Contact Support</Link>
      </footer>
    </div>
  );
}

export default Home;
