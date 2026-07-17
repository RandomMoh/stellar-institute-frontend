import { Link } from 'react-router-dom';
import './Pages.css';

export default function AdmissionThankYou() {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        {/* Animated checkmark circle */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2e3192, #00b4d8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px',
          boxShadow: '0 8px 30px rgba(0, 180, 216, 0.35)',
          animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <style>{`
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          color: '#0f172a',
          marginBottom: '16px',
          lineHeight: 1.2
        }}>
          Application Received!
        </h1>

        <p style={{
          fontSize: '17px',
          color: '#475569',
          lineHeight: 1.7,
          marginBottom: '12px',
          fontFamily: 'var(--font-main)'
        }}>
          Thank you for applying to <strong>Stellar Institute</strong>. Our admissions team will review your application and get back to you within <strong>24–48 hours</strong>.
        </p>

        <p style={{
          fontSize: '15px',
          color: '#94a3b8',
          marginBottom: '48px',
          fontFamily: 'var(--font-main)'
        }}>
          If you have any urgent questions, feel free to call us at <a href="tel:+923000652124" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>+92-300-0652124</a>.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
}
