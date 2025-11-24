// src/components/Footer.jsx
import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto shadow-sm">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
          {/* Left side */}
          <span className="mb-2 mb-md-0 small">
            © 2025 Built by Rushikesh Patil. All rights reserved.
          </span>

          {/* Right side */}
          <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
            <a
              href="https://rushikeshpatilportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none fw-semibold"
            >
              Portfolio
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
