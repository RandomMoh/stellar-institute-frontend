import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorTrail = React.memo(function CursorTrail() {
  const [isHovering, setIsHovering] = useState(false);

  // Use raw motion values for instant tracking (144Hz capable, bypasses React render cycle)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Extremely snappy spring for the outer ring
  const springConfig = { damping: 40, stiffness: 1000, mass: 0.05 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const updateMousePosition = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const handleMouseOver = useCallback((e) => {
    if (
      e.target.tagName.toLowerCase() === 'a' ||
      e.target.tagName.toLowerCase() === 'button' ||
      e.target.closest('a') ||
      e.target.closest('button') ||
      e.target.closest('.popup-card')
    ) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [updateMousePosition, handleMouseOver]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: -16, // Offset for center (width 32 / 2)
          left: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 8px rgba(0, 180, 216, 0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? 'rgba(0, 180, 216, 1)' : 'rgba(255, 255, 255, 0.9)',
          backgroundColor: isHovering ? 'rgba(0, 180, 216, 0.15)' : 'transparent',
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div 
        style={{
          position: 'fixed',
          top: -5, // Offset for center (width 10 / 2)
          left: -5,
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 6px rgba(0, 180, 216, 0.8)',
          pointerEvents: 'none',
          zIndex: 10000,
          x: mouseX,
          y: mouseY,
        }}
      />
    </>
  );
});

export default CursorTrail;
