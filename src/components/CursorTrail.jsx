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
          top: -10, // Offset for center (width 20 / 2)
          left: -10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'rgba(14, 165, 233, 0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(14, 165, 233, 0.1)' : 'rgba(14, 165, 233, 0.5)',
          border: isHovering ? '1px solid var(--primary)' : 'none'
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div 
        style={{
          position: 'fixed',
          top: -4, // Offset for center (width 8 / 2)
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
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
