import React from 'react';
import './style/Contact.css';

function Contact() {
  return (
    <div className="container">
      <h2>Contact Us</h2>
      <p className="description">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
      <div className="contact-info">
        <div className="contact-item">
          <h3>Address</h3>
          <p>123 SportsInfo Lane</p>
          <p>City, State, 12345</p>
        </div>
        <div className="contact-item">
          <h3>Email</h3>
          <p>info@sportsinfo.com</p>
        </div>
        <div className="contact-item">
          <h3>Phone</h3>
          <p>(123) 456-7890</p>
        </div>
        <div className="contact-item">
          <h3>Office Hours</h3>
          <p>Monday - Friday: 9am - 5pm</p>
          <p>Saturday: 10am - 2pm</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      <h3>Follow Us</h3>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon/facebook.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon/twitter.png" alt="Twitter" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon/instagram.png" alt="Instagram" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
