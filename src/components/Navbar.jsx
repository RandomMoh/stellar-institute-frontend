import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { itCourses, beautyCourses } from '../data/courses';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`lms-header ${scrolled ? 'lms-header-scrolled' : ''}`}>
      <div className="lms-topbar">
        <div className="container">
          <div className="topbar-left">
            <span>Stellar Institute, Upper Ground Floor 1-Montgomery Road, Lahore</span>
            <span>|</span>
            <span>+92-300-0652124</span>
          </div>
          <div className="topbar-right">
            <Link to="/stellar-admin" onClick={() => sessionStorage.removeItem('stellar-admin-token')}>Login</Link>
          </div>
        </div>
      </div>

      <nav className="lms-navbar">
        <div className="container nav-container">
          <Link to="/" className="nav-brand">
            <img src="/stellar_logo.png" alt="Stellar Institute Logo" className="brand-logo" />
          </Link>

          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            
            <div className="nav-dropdown">
              <span className={`nav-link ${location.pathname.match(/\/(academy|skilled-institute|school|college)/) ? 'active' : ''}`}>
                Institutes ▾
              </span>
              <div className="dropdown-menu">
                <Link to="/academy" onClick={() => setMobileMenuOpen(false)}>Stellar Academy</Link>
                <div className="nested-dropdown">
                  <Link to="/skilled-institute" onClick={() => setMobileMenuOpen(false)}>Skilled Institute ▾</Link>
                  <div className="nested-dropdown-menu">
                    <div className="nested-dropdown-sub">
                      <span className="nested-category">IT Courses ▾</span>
                      <div className="nested-dropdown-deep">
                        {itCourses.map(c => (
                          <Link key={c.id} to="/contact" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                        ))}
                      </div>
                    </div>
                    <div className="nested-dropdown-sub">
                      <span className="nested-category">Female Beauty Courses ▾</span>
                      <div className="nested-dropdown-deep">
                        {beautyCourses.map(c => (
                          <Link key={c.id} to="/contact" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/coming-soon" onClick={() => setMobileMenuOpen(false)}>Stellar School</Link>
                <Link to="/coming-soon" onClick={() => setMobileMenuOpen(false)}>Stellar College</Link>
              </div>
            </div>

            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            
            <div className="nav-mobile-btn">
              <Link to="/contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Register Now</Link>
            </div>
          </div>

          <div className="nav-actions">
            <Link to="/contact" className="btn btn-primary nav-desktop-btn">Register Now</Link>
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
