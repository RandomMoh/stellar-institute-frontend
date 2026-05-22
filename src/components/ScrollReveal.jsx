import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal — triggers animation when element enters viewport.
 * 
 * Directions: up, down, left, right, scale, flip, rotateIn
 */
const ScrollReveal = React.memo(function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const variants = {
    up:       { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
    down:     { hidden: { opacity: 0, y: -50 },  visible: { opacity: 1, y: 0 } },
    left:     { hidden: { opacity: 0, x: -60 },  visible: { opacity: 1, x: 0 } },
    right:    { hidden: { opacity: 0, x: 60 },   visible: { opacity: 1, x: 0 } },
    scale:    { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
    flip:     { hidden: { opacity: 0, rotateY: 25, scale: 0.92 }, visible: { opacity: 1, rotateY: 0, scale: 1 } },
    rotateIn: { hidden: { opacity: 0, rotate: -4, y: 30 }, visible: { opacity: 1, rotate: 0, y: 0 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: direction === 'flip' ? 1000 : undefined }}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[direction] || variants.up}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        ...(direction === 'flip' ? { type: 'spring', stiffness: 80, damping: 15 } : {}),
      }}
    >
      {children}
    </motion.div>
  );
});

export default ScrollReveal;
