import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition({ children }) {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Premium Liquid Glass-style enter transition
      gsap.fromTo(
        containerRef.current,
        { 
          opacity: 0, 
          y: 40,
          scale: 0.98,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8, 
          ease: 'power3.out'
        }
      );
    }
  }, [location.pathname]);

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
