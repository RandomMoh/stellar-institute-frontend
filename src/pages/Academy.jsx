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
          <h1>Stellar <span>Academy</span></h1>
          <p>Building strong academic foundations from 5th grade through Intermediate with experienced faculty and comprehensive curriculum.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Stellar Academy</span>
          </div>
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
    </>
  );
}
