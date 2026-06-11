import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingShapes from '../components/FloatingShapes';
import ScrollReveal from '../components/ScrollReveal';
import { academyPrograms } from '../data/courses';
import './Pages.css';

export default function Academy() {
  return (
    <>
      <section className="page-hero relative" style={{ overflow: 'hidden' }}>
        <FloatingShapes />
        <div className="page-hero-content container relative z-10">
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '15px' }}>Welcome to Stellar Academy</div>
          <h1 style={{ marginBottom: '20px' }}>Learn Today.<br/><span>Lead Tomorrow.</span></h1>
          <p>A disciplined, future-focused academic environment where students from Grade 5 to Intermediate build knowledge, confidence, and character.</p>
          <div style={{ marginTop: '30px' }}>
            <Link to="/contact" className="btn btn-primary">Apply for Admission</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--bg-color-alt)', padding: '80px 0' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div className="section-label">About Us</div>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>Shaping Bright Minds Since Day One</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '30px' }}>
                At Stellar Academy, we believe education is more than textbooks and exams. We provide a structured, nurturing environment where every student receives individual attention, strong academic preparation, and the values needed to succeed in life. From Middle School to Intermediate, our programs are designed to build a solid foundation for every stage of your child's future.
              </p>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="programs-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">Academic Programs</div>
              <h2 className="section-title">Our <span>Programs</span></h2>
              <p className="section-subtitle">
                Three levels of academic excellence designed to prepare students for board examinations and higher education.
              </p>
            </div>
          </ScrollReveal>

          {academyPrograms.map((program, i) => (
            <ScrollReveal key={program.id} delay={i * 0.1}>
              <div className="program-card">
                <div className="program-card-header">
                  <h2>{program.title}</h2>
                  <span className="grades">{program.grades}</span>
                </div>
                <div className="program-card-body">
                  <p>{program.description}</p>
                  <div className="program-details-grid">
                    <div className="program-detail-block">
                      <h4>Subjects</h4>
                      <ul>
                        {program.subjects.map((s, j) => (
                          <li key={j}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="program-detail-block">
                      <h4>Highlights</h4>
                      <div className="highlight-tags">
                        {program.highlights.map((h, j) => (
                          <span key={j} className="highlight-tag">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Apply for Admission →</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Strengths</div>
            <h2 className="section-title">Why Parents & Students<br/>Trust Stellar Academy</h2>
          </div>
          <div className="zigzag-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {[
              { title: 'Qualified & Dedicated Teachers', desc: "Our faculty brings subject expertise and genuine care for every student's progress and well-being." },
              { title: 'Result-Oriented Preparation', desc: 'From past paper practice to regular test series, our academic system is built around real results.' },
              { title: 'Individual Student Attention', desc: 'Small class sizes and personal monitoring ensure no student is left behind.' },
              { title: 'Separate Classes for Boys & Girls', desc: 'A focused and respectful learning environment designed for better concentration and comfort.' },
              { title: 'Safe & Disciplined Environment', desc: 'A campus culture built on respect, discipline, and positive academic habits.' },
              { title: 'Regular Assessments & Progress Reports', desc: 'Weekly tests and monthly performance tracking keep students and parents informed at every step.' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="program-card" style={{ height: '100%', padding: '30px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--bg-color-alt)', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">How to Enroll</div>
            <h2 className="section-title">Simple Steps to Get Started</h2>
          </div>
          <div className="admissions-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {[
              { step: 'Step 1 — Apply', desc: 'Fill out the admission form online or visit our campus at 1-Montgomery Road, Lahore.' },
              { step: 'Step 2 — Assessment', desc: 'Students appear for a short entry assessment to help us place them in the right class level.' },
              { step: 'Step 3 — Confirmation', desc: 'Receive your admission confirmation and fee details from our admissions team.' },
              { step: 'Step 4 — Start Learning', desc: 'Join your class and begin your journey toward academic excellence.' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', height: '100%' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 20px' }}>
                    {i + 1}
                  </div>
                  <h4 style={{ marginBottom: '15px' }}>{item.step}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
