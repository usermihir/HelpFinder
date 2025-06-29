import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/workers">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-divider" />

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@helpfinder.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Bhubaneswar, Odisha</p>
        </div>
      </div>

      <div className="footer-bottom">
        <h3>HelpFinder</h3>
        <p>© {new Date().getFullYear()} HelpFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
