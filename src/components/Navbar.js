// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'; // Importing icons from react-icons
import './Navbar.css';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blog">Blog</Link>
        <div className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="white"
            >
              <rect width="24" height="12" rx="6" fill="#333" />
              <circle cx="18" cy="6" r="4" fill="yellow" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="white"
            >
              <rect width="24" height="12" rx="6" fill="#ccc" />
              <circle cx="6" cy="6" r="4" fill="#333" />
            </svg>
          )}
        </div>
      </nav>

      {/* Social Media Links */}
      <div className="social-media">
        <a href="https://www.linkedin.com/in/vikramlingam/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://x.com/vikram_lingam" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://github.com/vikramlingam" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
