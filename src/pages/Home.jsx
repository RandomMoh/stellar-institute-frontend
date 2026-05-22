import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { itCourses, beautyCourses, testimonials } from '../data/courses';
import HeroSlider from '../components/HeroSlider';
import StatsCounter from '../components/StatsCounter';
import ScrollReveal from '../components/ScrollReveal';
import Tilt3D from '../components/Tilt3D';
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
                <h2 className="welcome-heading">Stellar Academy</h2>
                <h3 className="welcome-motto">Learn | Shine | Excel</h3>
                <Link to="/about" className="btn btn-primary">Read More</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="welcome-images">
                <Tilt3D intensity={5} glare>
                  <div className="welcome-img welcome-img-back">
                    <ImagePlaceholder label="Campus Photo" />
                  </div>
                </Tilt3D>
                <Tilt3D intensity={7} glare>
                  <div className="welcome-img-front-wrap">
                    <div className="welcome-img welcome-img-front">
                      <ImagePlaceholder label="Students Photo" />
                    </div>
                  </div>
                </Tilt3D>
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
              Discover <span>Stellar</span>
            </motion.h2>
          </div>

          <div className="inst-tabs-layout">
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

            <div className="inst-content-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInstitute}
                  className="inst-content-inner"
                  initial={{ opacity: 0, rotateY: 5, x: 30 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: -5, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                  style={{ perspective: 1000 }}
                >
                  <Tilt3D intensity={4} glare>
                    <div className="inst-content-image">
                      <ImagePlaceholder label={`${institutes[activeInstitute].title} Photo`} />
                    </div>
                  </Tilt3D>
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
              What Makes Us <span>Stellar</span>
            </motion.h2>
          </div>

          <div className="zigzag-grid">
            {[
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>, title: 'Expert Faculty' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, title: 'Modern Labs' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>, title: 'Certifications' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 2 12 2s6 2 7.5 2a2.5 2.5 0 0 1 0 5H18"/><path d="M18 9v1a6 6 0 0 1-12 0V9"/><path d="M12 16v6"/><path d="M8 22h8"/></svg>, title: 'Proven Results' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Career Support' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h4"/></svg>, title: '23+ Courses' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? 'up' : 'flip'}>
                <Tilt3D intensity={8} glare>
                  <div className={`zigzag-tile ${i % 2 === 1 ? 'zigzag-tile-offset' : ''}`}>
                    <span className="zigzag-icon">{item.icon}</span>
                    <h4>{item.title}</h4>
                  </div>
                </Tilt3D>
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
              <h2>Stellar<br />By The Numbers</h2>
            </div>
          </ScrollReveal>
          <div className="stats-grid">
            {[
              { value: 500, suffix: '+', label: 'Students Enrolled' },
              { value: 23, suffix: '+', label: 'Courses Offered' },
              { value: 50, suffix: '+', label: 'Expert Faculty' },
              { value: 3, suffix: '', label: 'Institutes' },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="scale">
                <Tilt3D intensity={5}>
                  <div className="stat-card-3d">
                    <StatsCounter value={s.value} suffix={s.suffix} label={s.label} />
                  </div>
                </Tilt3D>
              </ScrollReveal>
            ))}
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
              Professional <span>Training</span>
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
                <ScrollReveal key={course.id} delay={i * 0.06} direction={i % 3 === 1 ? 'flip' : 'up'}>
                  <Tilt3D intensity={6} glare>
                    <Link to={`/course/${course.slug}`} className="course-card-v2-link">
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
                          <span className="course-card-link">View Details →</span>
                        </div>
                      </div>
                    </Link>
                  </Tilt3D>
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
              Student <span>Reviews</span>
            </motion.h2>
          </div>

          <div className="testimonials-stagger">
            {testimonials.slice(0, 3).map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.12} direction="rotateIn">
                <Tilt3D intensity={4}>
                  <div className={`test-card ${i === 1 ? 'test-card-raised' : ''}`}>
                    <div className="test-quote">"</div>
                    <p>{t.quote}</p>
                    <div className="test-author">
                      <h5>{t.name}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </Tilt3D>
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
            <Tilt3D intensity={4} glare>
              <div className="partner-image-wrap">
                <ImagePlaceholder label="Institute Photo" style={{ minHeight: '360px', borderRadius: '24px 100px 24px 24px', border: '4px solid rgba(255,255,255,0.15)' }} />
              </div>
            </Tilt3D>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="partner-content">
              <span className="welcome-tag">Join Us</span>
              <h2>Become Part of<br />Stellar Academy</h2>
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
