import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { itCourses, beautyCourses, testimonials } from '../data/courses';
import HeroSlider from '../components/HeroSlider';
import StatsCounter from '../components/StatsCounter';
import ScrollReveal from '../components/ScrollReveal';
import './Home.css';

const institutes = [
  {
    num: '01',
    title: 'Stellar Academy',
    services: ['Middle School (5th–8th)', 'Matriculation (9th–10th)', 'FSc / ICS / I.Com / F.A'],
    link: '/academy',
    linkText: 'View Programs',
    image: '/images_2025/04/Lnaguage-Course-300x200.png'
  },
  {
    num: '02',
    title: 'Stellar Skilled Institute',
    services: ['13 IT Courses', '10 Beauty Courses', 'Industry Certifications'],
    link: '/skilled-institute',
    linkText: 'View Courses',
    image: '/images_2025/04/Web-development-1-300x200.png'
  },
  {
    num: '03',
    title: 'Stellar School & College',
    services: ['School (Nursery–10th)', 'College (Intermediate)', 'Multiple Streams'],
    link: '/coming-soon',
    linkText: 'Coming Soon',
    image: '/images_2025/04/Photography-1024x682.png'
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
                <h3 className="welcome-motto">Crafting Careers Through Education</h3>
                <Link to="/about" className="btn btn-primary">Read More</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="welcome-images">
                <div className="welcome-img welcome-img-back">
                  <img src="/images_2025/04/Digital-marketing-1-300x200.png" alt="Campus" loading="lazy" />
                </div>
                <div className="welcome-img welcome-img-front">
                  <img src="/images_2025/04/Photography-1024x682.png" alt="Students" loading="lazy" />
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
                    <img src={institutes[activeInstitute].image} alt={institutes[activeInstitute].title} />
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
              What Makes Us Stellar
            </motion.h2>
          </div>

          <div className="zigzag-grid">
            {[
              { icon: '🎓', title: 'Expert Faculty' },
              { icon: '💻', title: 'Modern Labs' },
              { icon: '📜', title: 'Certifications' },
              { icon: '🏆', title: 'Proven Results' },
              { icon: '🤝', title: 'Career Support' },
              { icon: '📚', title: '23+ Courses' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`zigzag-tile ${i % 2 === 1 ? 'zigzag-tile-offset' : ''}`}>
                  <span className="zigzag-icon">{item.icon}</span>
                  <h4>{item.title}</h4>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ===== STATS (Full-bleed image overlay) ===== */}
      <section className="stats-section">
        <div className="stats-bg-image">
          <img src="/images_2025/04/Graphic-Design-1.png" alt="" />
        </div>
        <div className="stats-overlay" />
        <div className="container stats-inner">
          <ScrollReveal direction="left">
            <div className="stats-heading">
              <h2>Stellar<br />By The Numbers</h2>
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
          </div>

          <div className="courses-scroll-wrap">
            <div className="courses-scroll">
              {featuredCourses.map((course, i) => (
                <ScrollReveal key={course.id} delay={i * 0.06}>
                  <div className="course-card-v2">
                    <div className="course-card-img">
                      <img src={course.image} alt={course.title} loading="lazy" />
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
              <img src="/images_2025/04/Digital-marketing-2-768x512.png" alt="Join Stellar" className="partner-image" />
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
