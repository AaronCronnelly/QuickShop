import React from 'react';
import './App.css';

// Footer component
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* About section */}
        <div className="footer-section">
          <h4>About QuickShop</h4>
          <p>QuickShop is your trusted partner for efficient grocery shopping.</p>
        </div>

        {/* Contact section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@quickshop.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        {/* Quick Links section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} QuickShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
