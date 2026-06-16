import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = React.memo(function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    
    // Initial states based on direction
    let startState = { opacity: 0 };
    switch (direction) {
      case 'up': startState.y = 40; break;
      case 'down': startState.y = -40; break;
      case 'left': startState.x = -40; break;
      case 'right': startState.x = 40; break;
      case 'scale': startState.scale = 0.9; break;
    }

    gsap.fromTo(
      el,
      startState,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger === el && t.kill());
    };
  }, [direction, delay]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
});

export default ScrollReveal;
