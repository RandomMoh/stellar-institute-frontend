import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Use springs for smooth following effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 10); // Center the dot
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
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
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* The trailing dot */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
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
          backgroundColor: isHovering ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.5)',
          border: isHovering ? '1px solid var(--primary)' : 'none'
        }}
        transition={{ duration: 0.15 }}
      />
      {/* The exact mouse dot (no lag) */}
      <div 
        style={{
          position: 'fixed',
          top: mousePosition.y - 4,
          left: mousePosition.x - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
    </>
  );
}
