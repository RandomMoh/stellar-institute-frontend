import React from 'react';
import { motion } from 'framer-motion';
import './FloatingShapes.css';

const FloatingShapes = React.memo(function FloatingShapes() {
  return (
    <div className="shapes-container">
      <motion.svg
        className="shape shape-circle"
        viewBox="0 0 100 100"
        animate={{ y: [0, -30, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="50" cy="50" r="40" stroke="var(--primary)" strokeWidth="8" fill="none" opacity="0.3" />
      </motion.svg>

      <motion.svg
        className="shape shape-circle-2"
        viewBox="0 0 100 100"
        animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <circle cx="50" cy="50" r="30" stroke="#f472b6" strokeWidth="6" strokeDasharray="10 10" fill="none" opacity="0.4" />
      </motion.svg>

      <motion.svg
        className="shape shape-dot"
        viewBox="0 0 50 50"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="25" cy="25" r="15" fill="#38bdf8" opacity="0.4" />
      </motion.svg>

      <motion.svg
        className="shape shape-dot-2"
        viewBox="0 0 50 50"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <circle cx="25" cy="25" r="10" fill="#fbbf24" opacity="0.5" />
      </motion.svg>

      <motion.svg
        className="shape shape-zigzag"
        viewBox="0 0 100 100"
        animate={{ y: [0, -20, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M10 50 L30 20 L50 80 L70 20 L90 50" stroke="#f472b6" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </motion.svg>

      <motion.svg
        className="shape shape-zigzag-2"
        viewBox="0 0 100 100"
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <path d="M20 20 L40 50 L60 20 L80 50" stroke="#34d399" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </motion.svg>

      <motion.svg
        className="shape shape-plus"
        viewBox="0 0 100 100"
        animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="#34d399" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
      </motion.svg>

      <motion.svg
        className="shape shape-plus-2"
        viewBox="0 0 100 100"
        animate={{ rotate: [360, 180, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 3 }}
      >
        <path d="M50 20 L50 80 M20 50 L80 50" stroke="var(--primary)" strokeWidth="10" strokeLinecap="round" opacity="0.4" />
      </motion.svg>

      <motion.svg
        className="shape shape-triangle"
        viewBox="0 0 100 100"
        animate={{ y: [0, -40, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <polygon points="50,20 80,80 20,80" stroke="#fbbf24" strokeWidth="6" fill="none" strokeLinejoin="round" opacity="0.4" />
      </motion.svg>

      <motion.svg
        className="shape shape-squiggle"
        viewBox="0 0 100 100"
        animate={{ y: [0, 20, 0], x: [0, 30, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      >
        <path d="M10,50 Q25,20 50,50 T90,50" stroke="#a855f7" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.3" />
      </motion.svg>
    </div>
  );
});

export default FloatingShapes;
