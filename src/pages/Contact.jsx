import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingShapes from '../components/FloatingShapes';
import ScrollReveal from '../components/ScrollReveal';
import { contactInfo } from '../data/courses';
import './Pages.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <section className="page-hero relative" style={{ overflow: 'hidden' }}>
        <FloatingShapes />
        <div className="page-hero-content container relative z-10">
          <h1>Contact <span>Us</span></h1>
          <p>Have questions about admissions, courses, or anything else? We'd love to hear from you.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
          </div>
        </div>
      </section>

      <section className="programs-section">
        <div className="container">
          <div className="contact-grid">
            <ScrollReveal direction="left">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send Us a Message</h2>

                {submitted && (
                  <div style={{
                    background: 'var(--primary-50)',
                    border: '1px solid var(--primary-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 20px',
                    marginBottom: 20,
                    color: 'var(--primary-dark)',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}>
                    ✅ Thank you! Your message has been sent successfully.
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="+92-300-0000000" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                      <option value="">Select a subject</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="fees">Fee Structure</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="How can we help you?" value={formData.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Send Message →
                </button>
              </form>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="contact-info-side">
                <div className="contact-info-card">
                  <div>
                    <h4>Our Address</h4>
                    <p>{contactInfo.address}</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div>
                    <h4>Phone Number</h4>
                    <p>{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div>
                    <h4>Email Address</h4>
                    <p>{contactInfo.email}</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div>
                    <h4>Working Hours</h4>
                    <p>Monday – Saturday: 8:00 AM – 8:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>

                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.123456789!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890"
                    title="Stellar Institute Location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
