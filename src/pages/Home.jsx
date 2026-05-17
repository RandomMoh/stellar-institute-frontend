import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { testimonials, itCourses, beautyCourses } from '../data/courses';
import FloatingShapes from '../components/FloatingShapes';
import TestimonialShapes from '../components/TestimonialShapes';
import AnnouncementModal from '../components/AnnouncementModal';
import './Home.css';

const priorityDot = { urgent: '🔴', important: '🟡', normal: '🔵' };

export default function Home() {
  const featuredCourses = [...itCourses.slice(0, 4), ...beautyCourses.slice(0, 4)];
  const [notices, setNotices] = useState([]);

  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then(data => setNotices(data.slice(0, 5)))
      .catch(() => {});
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="lms-home">
      <AnnouncementModal announcement={selectedNotice} onClose={() => setSelectedNotice(null)} />
      

      <section className="lms-hero relative">
        <FloatingShapes />
        <div className="container relative z-10">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <h1>We Develop Your Inspiring Career with Standard</h1>
            <p>Choose the Course that fits your goals! You can access 20+ different courses with lifetime access for all.</p>
            <div className="hero-buttons">
              <Link to="/skilled-institute" className="btn btn-primary pulse-hover">Explore Courses</Link>
            </div>
          </motion.div>
        </div>
      </section>


      {notices.length > 0 && (
        <section className="lms-notices-section">
          <div className="container">
            <div className="notices-card">
              <div className="notices-header">
                <h3>📋 Latest Notices</h3>
              </div>
              <div className="notices-list">
                {notices.map(n => (
                  <div key={n.id} className={`notice-item notice-${n.priority}`} onClick={() => setSelectedNotice(n)} style={{ cursor: 'pointer' }}>
                    <span className="notice-dot">{priorityDot[n.priority] || '🔵'}</span>
                    <div className="notice-content">
                      <span className="notice-date">{new Date(n.created_at).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' })}</span>
                      <span className="notice-title" style={{ color: '#0369a1' }}>{n.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section lms-institutes">
        <div className="container">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Institutes
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Stellar provides education across multiple branches — each focused on a specific domain.
            </motion.p>
          </div>

          <motion.div
            className="institutes-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants} className="institute-card">
              <div className="institute-icon">🎓</div>
              <h3>Stellar Academy</h3>
              <p>Academic programs from Middle School through Intermediate — board-pattern preparation with experienced faculty.</p>
              <ul className="institute-services">
                <li>Middle School (5th–8th)</li>
                <li>Matriculation (9th–10th)</li>
                <li>FSc / ICS / I.Com / F.A</li>
              </ul>
              <Link to="/academy" className="institute-link">View Programs →</Link>
            </motion.div>

            <motion.div variants={itemVariants} className="institute-card institute-card-featured">
              <div className="institute-icon">💻</div>
              <h3>Stellar Skilled Institute</h3>
              <p>Professional IT and Beauty courses designed for immediate career growth with hands-on training.</p>
              <ul className="institute-services">
                <li>13 IT Courses (Web Dev, Design, Marketing)</li>
                <li>10 Beauty Courses (Cosmetology, Makeup)</li>
                <li>Industry Certifications</li>
              </ul>
              <Link to="/skilled-institute" className="institute-link">View Courses →</Link>
            </motion.div>

            <motion.div variants={itemVariants} className="institute-card">
              <div className="institute-icon">🏫</div>
              <h3>Stellar School & College</h3>
              <p>Full-spectrum education from Nursery to Intermediate — comprehensive curriculum with modern facilities.</p>
              <ul className="institute-services">
                <li>School (Nursery–10th)</li>
                <li>College (Intermediate)</li>
                <li>Multiple Streams</li>
              </ul>
              <Link to="/coming-soon" className="institute-link">Coming Soon →</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      <section className="lms-admissions-banner bg-alt">
        <div className="container">
          <motion.div 
            className="admissions-flex"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Admissions are open</h2>
            <Link to="/contact" className="btn btn-primary pulse-hover">Register Now</Link>
          </motion.div>
        </div>
      </section>


      <section className="section lms-courses relative">
        <div className="container relative z-10">
          <div className="section-header">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Courses
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Get unlimited access to 20+ of courses to develop your skills.
            </motion.p>
          </div>

          <motion.div 
            className="courses-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredCourses.map((course, i) => (
              <motion.div key={i} variants={itemVariants} className="lms-course-card popup-card">
                <div className="course-image-placeholder">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                  <span className="course-category">
                    {i < 4 ? 'IT Courses' : 'Female Beauty Courses'}
                  </span>
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <div className="course-meta">
                    <span className="course-duration">Duration: {course.duration}</span>
                  </div>
                  <div className="course-footer">
                    <Link to="/contact" className="course-enroll">Enroll Now →</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/courses" className="btn btn-primary pulse-hover">View All Courses</Link>
          </motion.div>
        </div>
      </section>


      <section className="section lms-testimonials bg-alt relative">
        <TestimonialShapes />
        <div className="container relative z-10">
          <div className="section-header">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What's Our Students Think
            </motion.h2>
          </div>

          <motion.div 
            className="testimonials-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div key={i} variants={itemVariants} className="lms-testimonial-card popup-card">
                <div className="quote-icon">"</div>
                <p>{testimonial.quote}</p>
                <div className="student-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      <section className="lms-instructors-banner">
        <div className="container">
          <motion.div 
            className="instructors-content text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h2>Best Instructors From Around The World</h2>
            <Link to="/contact" className="btn btn-primary pulse-hover">Register Now</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
