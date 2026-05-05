import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './CampusCarousel.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Excellence in Education',
    subtitle: 'Building strong foundations from early years to intermediate level.',
    cta: 'Discover Our Academy',
    link: '/academy'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Empowering Future Leaders',
    subtitle: 'Providing state-of-the-art facilities and experienced faculty.',
    cta: 'Explore College Programs',
    link: '/college'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Professional Skill Development',
    subtitle: 'Industry-aligned IT and Beauty courses for immediate career growth.',
    cta: 'View IT & Beauty Courses',
    link: '/skilled-institute'
  }
];

export default function CampusCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="campus-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="carousel-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div 
            className="carousel-bg" 
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="carousel-overlay" />
          
          <div className="container carousel-content">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="carousel-badge">Welcome to Stellar Institute</span>
              <h1>{slides[current].title}</h1>
              <p>{slides[current].subtitle}</p>
              <Link to={slides[current].link} className="btn btn-primary btn-lg">
                {slides[current].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
