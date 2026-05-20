import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroSlider.css';

const slides = [
  {
    image: '/images_2025/04/Web-development-1-300x200.png',
    tag: 'Welcome To Stellar Institute',
    heading: 'Crafting Careers\nThrough Education',
    cta: { text: 'Explore Programs', link: '/skilled-institute' },
    cta2: { text: 'Contact Us', link: '/contact' }
  },
  {
    image: '/images_2025/04/Digital-marketing-2-768x512.png',
    tag: 'Stellar Academy',
    heading: 'From Foundation\nTo Excellence',
    cta: { text: 'View Programs', link: '/academy' },
    cta2: { text: 'Register Now', link: '/contact' }
  },
  {
    image: '/images_2025/04/Photography-1024x682.png',
    tag: 'Stellar Skilled Institute',
    heading: '23+ Professional\nCourses',
    cta: { text: 'Browse Courses', link: '/skilled-institute' },
    cta2: { text: 'Enroll Now', link: '/contact' }
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="hero-slider" id="hero-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="hero-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-slide-bg">
            <img src={slide.image} alt="" />
          </div>
          <div className="hero-slide-overlay" />
          
          {/* Decorative shapes */}
          <div className="hero-deco">
            <div className="hero-deco-ring hero-deco-ring-1" />
            <div className="hero-deco-ring hero-deco-ring-2" />
            <div className="hero-deco-line hero-deco-line-1" />
          </div>

          <div className="container hero-slide-content">
            <motion.span
              className="hero-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {slide.tag}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
            >
              {slide.heading.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </motion.h1>
            <motion.div
              className="hero-slide-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to={slide.cta.link} className="btn btn-hero-primary">{slide.cta.text}</Link>
              <Link to={slide.cta2.link} className="btn btn-hero-outline">{slide.cta2.text}</Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="hero-progress">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-progress-item ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="hero-progress-num">{String(i + 1).padStart(2, '0')}</span>
            {i === current && <span className="hero-progress-bar" />}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
