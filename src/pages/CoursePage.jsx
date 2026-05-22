import { useParams, Link } from 'react-router-dom';
import { getCourseBySlug, getCourseCategory, getRelatedCourses } from '../data/courses';
import FloatingShapes from '../components/FloatingShapes';
import ScrollReveal from '../components/ScrollReveal';
import Tilt3D from '../components/Tilt3D';
import ImagePlaceholder from '../components/ImagePlaceholder';
import './Pages.css';
import './CoursePage.css';

export default function CoursePage() {
  const { courseSlug } = useParams();
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return (
      <>
        <section className="page-hero relative" style={{ overflow: 'hidden' }}>
          <FloatingShapes />
          <div className="page-hero-content container relative z-10">
            <h1>Course Not Found</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <Link to="/skilled-institute">Courses</Link> <span>/</span> <span>Not Found</span>
            </div>
          </div>
        </section>
        <section className="programs-section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>This course doesn't exist.</h2>
            <div style={{ marginTop: 32 }}>
              <Link to="/skilled-institute" className="btn btn-primary">Browse All Courses</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const category = getCourseCategory(course);
  const related = getRelatedCourses(course, 4);

  return (
    <>
      {/* Hero */}
      <section className="page-hero relative" style={{ overflow: 'hidden' }}>
        <FloatingShapes />
        <div className="page-hero-content container relative z-10">
          <span className="course-page-badge">{category}</span>
          <h1>{course.title}</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <Link to="/skilled-institute">Skilled Institute</Link> <span>/</span> <span>{course.title}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="programs-section">
        <div className="container course-page-layout">

          {/* Main Content */}
          <div className="course-main">
            <ScrollReveal>
              <Tilt3D intensity={3}>
                <div className="course-hero-image">
                  <ImagePlaceholder label={`${course.title} — Image Here`} style={{ minHeight: '320px', borderRadius: '16px' }} />
                </div>
              </Tilt3D>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="course-section">
                <h2>Overview</h2>
                <div className="course-content-placeholder">
                  <p className="placeholder-hint">Course overview and description will be added here.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="course-section">
                <h2>What You'll Learn</h2>
                <div className="course-content-placeholder">
                  <p className="placeholder-hint">Learning outcomes and key skills covered in this course will be listed here.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="course-section">
                <h2>Curriculum</h2>
                <div className="course-content-placeholder">
                  <p className="placeholder-hint">Detailed curriculum breakdown and module list will be added here.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="course-section">
                <h2>Requirements</h2>
                <div className="course-content-placeholder">
                  <p className="placeholder-hint">Prerequisites and requirements for enrollment will be listed here.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="course-section">
                <h2>Career Prospects</h2>
                <div className="course-content-placeholder">
                  <p className="placeholder-hint">Career opportunities and job roles after completing this course will be detailed here.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <aside className="course-sidebar">
            <ScrollReveal direction="right">
              <div className="course-info-card">
                <h3>Course Details</h3>
                <div className="course-info-row">
                  <span className="info-label">Duration</span>
                  <span className="info-value">{course.duration}</span>
                </div>
                <div className="course-info-row">
                  <span className="info-label">Category</span>
                  <span className="info-value">{category}</span>
                </div>
                <div className="course-info-row">
                  <span className="info-label">Level</span>
                  <span className="info-value placeholder-hint">—</span>
                </div>
                <div className="course-info-row">
                  <span className="info-label">Certificate</span>
                  <span className="info-value placeholder-hint">—</span>
                </div>
                <div className="course-info-row">
                  <span className="info-label">Fee</span>
                  <span className="info-value placeholder-hint">—</span>
                </div>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                  Enroll Now →
                </Link>
              </div>
            </ScrollReveal>

            {related.length > 0 && (
              <ScrollReveal direction="right" delay={0.1}>
                <div className="related-courses-card">
                  <h3>Related Courses</h3>
                  {related.map(r => (
                    <Link key={r.id} to={`/course/${r.slug}`} className="related-course-item">
                      <span className="related-course-title">{r.title}</span>
                      <span className="related-course-dur">{r.duration}</span>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </aside>

        </div>
      </section>
    </>
  );
}
