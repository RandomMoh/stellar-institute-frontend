import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { itCourses, beautyCourses, testimonials } from '../data/courses';
import HeroSlider from '../components/HeroSlider';
import StatsCounter from '../components/StatsCounter';
import ScrollReveal from '../components/ScrollReveal';
import ImagePlaceholder from '../components/ImagePlaceholder';
import './Home.css';

const institutes = [
  {
    num: '01',
    title: 'Stellar Academy',
    services: ['Middle School (5th–8th)', 'Matriculation (9th–10th)', 'FSc / ICS / I.Com / F.A'],
    link: '/academy',
    linkText: 'View Programs',
  },
  {
    num: '02',
    title: 'Stellar Skilled Institute',
    services: ['13 IT Courses', '10 Beauty Courses', 'Industry Certifications'],
    link: '/skilled-institute',
    linkText: 'View Courses',
  },
  {
    num: '03',
    title: 'Stellar School & College',
    services: ['School (Nursery–10th)', 'College (Intermediate)', 'Multiple Streams'],
    link: '/coming-soon',
    linkText: 'Coming Soon',
  }
];

export default function Home() {
  const [activeInstitute, setActiveInstitute] = useState(0);
  const featuredCourses = [...itCourses.slice(0, 3), ...beautyCourses.slice(0, 3)];

  return (
    <div className="lms-home">

      {/* ===== HERO SLIDER ===== */}
      <HeroSlider />


      {/* ===== WELCOME / ABOUT ===== */}
      <section className="welcome-section">
        <div className="welcome-deco-ring welcome-ring-1" />
        <div className="welcome-deco-ring welcome-ring-2" />
        <div className="container">
          <div className="welcome-grid">
            <ScrollReveal direction="left">
              <div className="welcome-text">
                <span className="welcome-tag">Welcome To</span>
                <h2 className="welcome-heading">Stellar Institute</h2>
                <p className="welcome-motto" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '30px' }}>
                  At Stellar Institute, we believe every student deserves the right environment to learn, grow, and succeed. From quality school education to professional skill-based courses, we provide a complete learning pathway, one that builds knowledge, character, and real-world readiness.
                </p>
                <Link to="/about" className="btn btn-primary">Read More</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="welcome-images">
                <div className="welcome-img welcome-img-back">
                  <ImagePlaceholder label="Campus Photo" />
                </div>
                <div className="welcome-img welcome-img-front">
                  <ImagePlaceholder label="Students Photo" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* ===== INTERACTIVE INSTITUTE TABS ===== */}
      <section className="institutes-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Institutes</div>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Discover Stellar
            </motion.h2>
          </div>

          <div className="inst-tabs-layout">
            {/* Left: Vertical Numbered Tabs */}
            <div className="inst-tabs-list">
              {institutes.map((inst, i) => (
                <motion.button
                  key={i}
                  className={`inst-tab ${activeInstitute === i ? 'inst-tab-active' : ''}`}
                  onClick={() => setActiveInstitute(i)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="inst-tab-num">{inst.num}</span>
                  <span className="inst-tab-title">{inst.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Right: Content Panel */}
            <div className="inst-content-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInstitute}
                  className="inst-content-inner"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="inst-content-image">
                    <ImagePlaceholder label={`${institutes[activeInstitute].title} Photo`} />
                  </div>
                  <div className="inst-content-info">
                    <h3>{institutes[activeInstitute].title}</h3>
                    <ul>
                      {institutes[activeInstitute].services.map((s, j) => (
                        <li key={j}>{s}</li>
                      ))}
                    </ul>
                    <Link to={institutes[activeInstitute].link} className="btn btn-primary">
                      {institutes[activeInstitute].linkText} →
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>


      {/* ===== WHAT MAKES US STELLAR (Zigzag Tiles) ===== */}
      <section className="makes-us-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Discover</div>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose Stellar Institute
            </motion.h2>
          </div>

          <div className="zigzag-grid">
            {[
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>, title: 'Expert Faculty', desc: 'Learn from qualified, experienced teachers who are dedicated to your academic and professional growth.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, title: 'Modern Labs', desc: 'Hands-on learning with up-to-date technology and equipment built for practical, real-world skill development.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>, title: 'Certifications', desc: 'Earn recognized certifications that strengthen your profile and open doors to better career opportunities.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 2 12 2s6 2 7.5 2a2.5 2.5 0 0 1 0 5H18"/><path d="M18 9v1a6 6 0 0 1-12 0V9"/><path d="M12 16v6"/><path d="M8 22h8"/></svg>, title: 'Disciplined Environment', desc: 'A safe, structured, and focused atmosphere where students can learn with confidence and clarity.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Separate Classes', desc: 'A comfortable and respectful learning environment designed to maximize concentration and academic performance.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h4"/></svg>, title: 'Regular Tests', desc: 'Consistent assessments and progress monitoring to keep every student on the path to success.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>, title: 'Job Placement', desc: "We don't just train you, we connect you with real opportunities and help you step confidently into your career." },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>, title: 'Affordable & Accessible', desc: 'Quality education and professional training made accessible for every student and family.' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`zigzag-tile ${i % 2 === 1 ? 'zigzag-tile-offset' : ''}`} style={{ padding: '24px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span className="zigzag-icon" style={{ marginBottom: '16px' }}>{item.icon}</span>
                  <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ===== STATS (Full-bleed overlay) ===== */}
      <section className="stats-section">
        <div className="stats-bg-placeholder" />
        <div className="stats-overlay" />
        <div className="container stats-inner">
          <ScrollReveal direction="left">
            <div className="stats-heading">
              <div className="section-label" style={{ color: 'var(--primary-color)' }}>Our Impact</div>
              <h2>Stellar By The Numbers</h2>
              <p style={{ marginTop: '15px', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', maxWidth: '400px' }}>
                A growing community of learners, achievers, and future leaders backed by dedicated faculty and a proven system.
              </p>
            </div>
          </ScrollReveal>
          <div className="stats-grid">
            <StatsCounter value={500} suffix="+" label="Students Enrolled" />
            <StatsCounter value={23} suffix="+" label="Courses Offered" />
            <StatsCounter value={50} suffix="+" label="Expert Faculty" />
            <StatsCounter value={3} suffix="" label="Institutes" />
          </div>
        </div>
      </section>


      {/* ===== COURSES ===== */}
      <section className="section courses-section">
        <div className="courses-deco-ring" />
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Courses</div>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Professional Training
            </motion.h2>
            <motion.p 
              className="courses-provided-by"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="provided-line" />
              <span className="provided-text">Provided by <strong>Stellar Skilled Institute</strong></span>
              <span className="provided-line" />
            </motion.p>
          </div>

          <div className="courses-scroll-wrap">
            <div className="courses-scroll">
              {featuredCourses.map((course, i) => (
                <ScrollReveal key={course.id} delay={i * 0.06}>
                  <div className="course-card-v2">
                    <div className="course-card-img">
                      {course.image ? (
                        <img src={course.image} alt={course.title} loading="lazy" />
                      ) : (
                        <ImagePlaceholder label="Course Image" />
                      )}
                      <span className="course-badge">{i < 3 ? 'IT' : 'Beauty'}</span>
                    </div>
                    <div className="course-card-body">
                      <h4>{course.title}</h4>
                      <span className="course-dur">{course.duration}</span>
                      <Link to="/contact" className="course-card-link">Enroll →</Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link to="/skilled-institute" className="btn btn-secondary">View All Courses</Link>
          </div>
        </div>
      </section>


      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Testimonials</div>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Student Reviews
            </motion.h2>
          </div>

          <div className="testimonials-stagger">
            {testimonials.slice(0, 3).map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`test-card ${i === 1 ? 'test-card-raised' : ''}`}>
                  <div className="test-quote">"</div>
                  <p>{t.quote}</p>
                  <div className="test-author">
                    <h5>{t.name}</h5>
                    <span>{t.role}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ===== PARTNER / CTA ===== */}
      <section className="partner-cta">
        <div className="partner-deco-shapes">
          <div className="partner-shape partner-shape-1" />
          <div className="partner-shape partner-shape-2" />
          <div className="partner-shape partner-shape-3" />
        </div>
        <div className="container partner-grid">
          <ScrollReveal direction="left">
            <div className="partner-image-wrap">
              <ImagePlaceholder label="Institute Photo" style={{ minHeight: '360px', borderRadius: '24px 100px 24px 24px', border: '4px solid rgba(255,255,255,0.15)' }} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="partner-content">
              <span className="welcome-tag">Join Us</span>
              <h2>Become Part of<br />Stellar Institute</h2>
              <div className="partner-actions">
                <Link to="/contact" className="btn btn-primary">Register Now</Link>
                <Link to="/about" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
