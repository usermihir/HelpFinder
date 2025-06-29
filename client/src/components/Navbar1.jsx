import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
      <h2 className="logo">HelpFinder</h2>
      <nav className = {`logo`}>
        Workers
      </nav>
      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar top-bar"></span>
        <span className="bar middle-bar"></span>
        <span className="bar bottom-bar"></span>
      </div>
    </header>
  );
}

export default Navbar;
