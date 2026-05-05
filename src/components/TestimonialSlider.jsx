import { useState, useEffect } from 'react';
import { testimonials } from '../data/courses';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonial-slider">
      <div className="testimonial-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {testimonials.map((t, i) => (
          <div className="testimonial-slide" key={i}>
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
