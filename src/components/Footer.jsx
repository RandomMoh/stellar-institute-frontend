import { Link } from 'react-router-dom';
import { contactInfo } from '../data/courses';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="lms-footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-widget">
            <Link to="/" className="footer-logo-link">
              <img src="/stellar_logo.png" alt="Stellar Institute Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-desc">Stellar Institue is a forward thinking educational institution dedicated to empowering individuals through practical, industry-driven training.</p>
            <ul className="footer-contact-info">
              <li>📍 {contactInfo.address}</li>
              <li>📞 {contactInfo.phone}</li>
            </ul>
            <div className="footer-socials">
              <a href={contactInfo.socials.youtube} target="_blank" rel="noreferrer">YT</a>
              <a href={contactInfo.socials.instagram} target="_blank" rel="noreferrer">IG</a>
              <a href={contactInfo.socials.facebook} target="_blank" rel="noreferrer">FB</a>
            </div>
          </div>

          <div className="footer-widget">
            <h4 className="widget-title">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-widget">
            <h4 className="widget-title">Courses</h4>
            <ul className="footer-links">
              <li><a href="#">Web Development Courses</a></li>
              <li><a href="#">Multimedia Courses</a></li>
              <li><a href="#">Language Courses</a></li>
              <li><a href="#">E-Commerce</a></li>
              <li><a href="#">Advanced Beautician Courses</a></li>
            </ul>
          </div>

          <div className="footer-widget">
            <h4 className="widget-title">Working Hours</h4>
            <ul className="footer-contact-info">
              <li>Monday – Saturday: 8:00 AM – 8:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>Copyright © {new Date().getFullYear()} stellar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
