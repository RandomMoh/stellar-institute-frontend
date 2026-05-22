import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroSlider.css';

const slides = [
  {
    tag: 'Welcome To Stellar Academy',
    heading: 'Crafting Careers\nThrough Education',
    cta: { text: 'Explore Programs', link: '/skilled-institute' },
    cta2: { text: 'Contact Us', link: '/contact' }
  },
  {
    tag: 'Stellar Academy',
    heading: 'From Foundation\nTo Excellence',
    cta: { text: 'View Programs', link: '/academy' },
    cta2: { text: 'Register Now', link: '/contact' }
  },
  {
    tag: 'Stellar Skilled Institute',
    heading: '23+ Professional\nCourses',
    cta: { text: 'Browse Courses', link: '/skilled-institute' },
    cta2: { text: 'Enroll Now', link: '/contact' }
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const slide = slides[current];

  return (
    <section className="hero-slider" id="hero-slider" onMouseMove={handleMouseMove}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="hero-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* CSS-only gradient background */}
          <div className="hero-slide-bg hero-slide-bg-placeholder" />
          <div className="hero-slide-overlay" />
          
          {/* Decorative shapes with 3D parallax */}
          <div className="hero-deco" style={{ perspective: 1000 }}>
            <motion.div 
              className="hero-deco-ring hero-deco-ring-1" 
              animate={{ x: mousePos.x * -40, y: mousePos.y * -40, rotateX: mousePos.y * 20, rotateY: mousePos.x * 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 100 }}
            />
            <motion.div 
              className="hero-deco-ring hero-deco-ring-2" 
              animate={{ x: mousePos.x * 30, y: mousePos.y * 30, rotateX: mousePos.y * -15, rotateY: mousePos.x * -15 }}
              transition={{ type: 'spring', damping: 30, stiffness: 100 }}
            />
            <div className="hero-deco-line hero-deco-line-1" />
            
            {/* New 3D floating shapes */}
            <motion.div 
              className="hero-3d-shape shape-cube"
              animate={{ x: mousePos.x * -60, y: mousePos.y * -60, rotate: mousePos.x * 45 }}
              transition={{ type: 'spring', damping: 40, stiffness: 80 }}
            />
            <motion.div 
              className="hero-3d-shape shape-sphere"
              animate={{ x: mousePos.x * 50, y: mousePos.y * 50 }}
              transition={{ type: 'spring', damping: 50, stiffness: 60 }}
            />
          </div>

          <motion.div 
            className="container hero-slide-content"
            animate={{ x: mousePos.x * 15, y: mousePos.y * 15 }}
            transition={{ type: 'spring', damping: 40, stiffness: 120 }}
          >
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
          </motion.div>
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
