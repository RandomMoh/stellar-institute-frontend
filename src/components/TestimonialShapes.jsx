import React from 'react';
import { motion } from 'framer-motion';

const TestimonialShapes = React.memo(function TestimonialShapes() {
  return (
    <div className="shapes-container">
      {/* Hollow Square */}
      <motion.svg
        className="shape"
        style={{ width: 100, height: 100, top: '20%', right: '10%' }}
        viewBox="0 0 100 100"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <rect x="10" y="10" width="80" height="80" stroke="#fca5a5" strokeWidth="6" fill="none" opacity="0.3" rx="10" />
      </motion.svg>

      {/* Triangles */}
      <motion.svg
        className="shape"
        style={{ width: 80, height: 80, bottom: '15%', left: '10%' }}
        viewBox="0 0 100 100"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 120, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <polygon points="50,10 90,90 10,90" fill="#a78bfa" opacity="0.3" />
      </motion.svg>

      {/* Wavy Line */}
      <motion.svg
        className="shape"
        style={{ width: 150, height: 50, top: '40%', left: '5%' }}
        viewBox="0 0 150 50"
        animate={{
          x: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M10 25 Q 25 10, 40 25 T 70 25 T 100 25 T 130 25" stroke="#38bdf8" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />
      </motion.svg>
    </div>
  );
});

export default TestimonialShapes;
