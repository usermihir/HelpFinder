import React from 'react';
import './AboutHelp.css';
import TestimonialCarousel from './TestimonialCarousel';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function AboutHelp() {
  return (
    <div className="about-container">
      <Navbar/>
      <section className="about-hero">
        <h1>Empowering Homes & Helpers</h1>
        <p>Connecting families with skilled, verified domestic help across India.</p>
      </section>

      <section className="about-content">
        <h2>What is Verified Help Finder?</h2>
        <p>
          <strong>Verified Help Finder</strong> is a digital bridge between households and trustworthy workers like maids, cooks, tutors, electricians, and more.
          Our mission is to ensure you get the right help — safely, quickly, and reliably.
        </p>

        <div className="highlight-section">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <span>1</span>
              <h3>Register</h3>
              <p>Create an account as a user or worker to get started.</p>
            </div>
            <div className="step-card">
              <span>2</span>
              <h3>Explore</h3>
              <p>Filter and browse verified profiles with availability & reviews.</p>
            </div>
            <div className="step-card">
              <span>3</span>
              <h3>Book</h3>
              <p>Send booking requests based on your timing and location.</p>
            </div>
            <div className="step-card">
              <span>4</span>
              <h3>Track</h3>
              <p>Use your dashboard to view, manage, or cancel requests.</p>
            </div>
            <div className="step-card">
              <span>5</span>
              <h3>Review</h3>
              <p>Rate the service and help others make informed choices.</p>
            </div>
          </div>
        </div>
         <TestimonialCarousel />
        <div className="worker-section">
          <h2>Why Join as a Worker?</h2>
          <ul>
            <li>Create and manage your profile with ease.</li>
            <li>Choose your service type, location, and experience level.</li>
            <li>Accept or decline bookings based on your availability.</li>
            <li>Grow your reputation with client feedback & ratings.</li>
          </ul>
        </div>

        <section className="support-box">
          <h2>Need Assistance?</h2>
          <p>Our support team is here to help you with any issue or inquiry.</p>
          <p><strong>Email:</strong> support@verifiedhelpfinder.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
        </section>
        <Footer />
      </section>
    </div>
  );
}

export default AboutHelp;
