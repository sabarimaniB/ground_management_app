import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>GroundBook</h3>
          <p>Your one-stop solution for booking sports grounds and facilities.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/grounds">Grounds</Link></li>
            <li><Link to="/booking">My Bookings</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>123 Sports Avenue</p>
          <p>City, Country 10001</p>
          <p>Email: info@groundbook.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GroundBook. All rights reserved.</p>
      </div>
    </footer>
  );
}