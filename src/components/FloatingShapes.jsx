import React from 'react';
import { motion } from 'framer-motion';
import './FloatingShapes.css';

export default function FloatingShapes() {
  return (
    <div className="shapes-container">
      {/* Hollow Circle */}
      <motion.svg
        className="shape shape-circle"
        viewBox="0 0 100 100"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <circle cx="50" cy="50" r="40" stroke="var(--primary)" strokeWidth="8" fill="none" opacity="0.3" />
      </motion.svg>

      {/* Solid Dot */}
      <motion.svg
        className="shape shape-dot"
        viewBox="0 0 50 50"
        animate={{
          y: [0, 40, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <circle cx="25" cy="25" r="15" fill="#38bdf8" opacity="0.4" />
      </motion.svg>

      {/* Zig Zag Scribble */}
      <motion.svg
        className="shape shape-zigzag"
        viewBox="0 0 100 100"
        animate={{
          y: [0, -20, 0],
          rotate: [-10, 10, -10]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M10 50 L30 20 L50 80 L70 20 L90 50" stroke="#f472b6" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </motion.svg>

      {/* Plus Sign */}
      <motion.svg
        className="shape shape-plus"
        viewBox="0 0 100 100"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="#34d399" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
      </motion.svg>
    </div>
  );
}
