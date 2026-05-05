import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingShapes from '../components/FloatingShapes';
import ScrollReveal from '../components/ScrollReveal';
import './Pages.css';

export default function About() {
  return (
    <>
      <section className="page-hero relative" style={{ overflow: 'hidden' }}>
        <FloatingShapes />
        <div className="page-hero-content container relative z-10">
          <h1>About <span>Stellar Institute</span></h1>
          <p>A forward-thinking educational institution dedicated to empowering individuals through practical, industry-driven training and quality academic education.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About Us</span>
          </div>
        </div>
      </section>

      <section className="programs-section">
        <div className="container">
          {/* Mission & Vision */}
          <div className="about-grid">
            <ScrollReveal direction="left">
              <div className="about-text">
                <h2>Our <span>Mission</span></h2>
                <p>
                  At Stellar Institute, we believe that quality education should be accessible to everyone.
                  Our mission is to provide world-class academic and professional training that empowers
                  students to achieve their full potential and contribute meaningfully to society.
                </p>
                <p>
                  Founded with a vision to bridge the gap between traditional education and modern industry
                  demands, we offer comprehensive programs ranging from early schooling to professional
                  skill development.
                </p>
                <div className="about-values">
                  <div className="about-value">
                    <h4>Excellence</h4>
                  </div>
                  <div className="about-value">
                    <h4>Integrity</h4>
                  </div>
                  <div className="about-value">
                    <h4>Innovation</h4>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="about-visual">
                <h3>Stellar Institute</h3>
                <p>Lahore, Pakistan · Est. 2023</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Timeline */}
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">Our Journey</div>
              <h2 className="section-title">Milestones of <span>Growth</span></h2>
            </div>
          </ScrollReveal>

          <div className="timeline">
            {[
              { title: 'Founded Stellar Institute', desc: 'Started with a vision to provide quality IT and professional training in Lahore.' },
              { title: 'Launched Skilled Institute', desc: 'Expanded to 13 IT courses and 10 beauty courses with state-of-the-art labs.' },
              { title: 'Stellar Academy Opens', desc: 'Introduced academic programs from 5th grade through Intermediate.' },
              { title: 'Stellar School & College', desc: 'Extended to full-spectrum education from Nursery to Intermediate with multiple streams.' },
              { title: '500+ Students Enrolled', desc: 'Reached a milestone of over 500 students across all branches with growing placement success.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <ScrollReveal>
              <h2 className="section-title">Join the Stellar <span>Family</span></h2>
              <p className="section-subtitle" style={{ marginBottom: 32 }}>
                Be part of a growing community of learners and achievers.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">Get in Touch →</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
