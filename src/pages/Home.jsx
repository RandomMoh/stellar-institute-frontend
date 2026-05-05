import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { testimonials, itCourses, beautyCourses } from '../data/courses';
import FloatingShapes from '../components/FloatingShapes';
import TestimonialShapes from '../components/TestimonialShapes';
import './Home.css';

export default function Home() {
  const featuredCourses = [...itCourses.slice(0, 4), ...beautyCourses.slice(0, 4)];

  // Framer motion variants for stagger
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
      {/* Hero Section */}
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
              <Link to="/courses" className="btn btn-primary pulse-hover">Explore Courses</Link>
              <a href="https://stellarinstitute.pk/registration" target="_blank" rel="noreferrer" className="btn btn-secondary bounce-hover">Register Now</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Admissions Open Banner */}
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
            <a href="https://stellarinstitute.pk/registration" target="_blank" rel="noreferrer" className="btn btn-primary pulse-hover">Register Now</a>
          </motion.div>
        </div>
      </section>

      {/* Our Courses */}
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
                <div 
                  className="course-image-placeholder"
                  style={{
                    backgroundImage: `url(${course.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
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

      {/* Testimonials */}
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

      {/* Best Instructors Banner */}
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
            <a href="https://stellarinstitute.pk/registration" target="_blank" rel="noreferrer" className="btn btn-primary pulse-hover">Register Now</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
