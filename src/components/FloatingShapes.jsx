import React from 'react';
import { motion } from 'framer-motion';
import './FloatingShapes.css';

const FloatingShapes = React.memo(function FloatingShapes() {
  return (
    <div className="shapes-container">
      {/* Circle Shape */}
      <motion.div
        className="shape"
        style={{ top: '15%', right: '10%' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="offset-shape-container" style={{ width: '80px', height: '80px', borderRadius: '50%' }}>
          <div className="offset-shape-bg" style={{ borderRadius: '50%' }}></div>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--primary)', position: 'relative', zIndex: 1 }}></div>
        </div>
      </motion.div>

      {/* Square Shape */}
      <motion.div
        className="shape"
        style={{ bottom: '20%', left: '15%' }}
        animate={{ y: [0, 30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="offset-shape-container" style={{ width: '60px', height: '60px', borderRadius: '8px' }}>
          <div className="offset-shape-bg" style={{ borderRadius: '8px' }}></div>
          <div style={{ width: '100%', height: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-light)', position: 'relative', zIndex: 1 }}></div>
        </div>
      </motion.div>

      {/* Pill Shape */}
      <motion.div
        className="shape"
        style={{ top: '40%', left: '5%' }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="offset-shape-container" style={{ width: '120px', height: '40px', borderRadius: '20px' }}>
          <div className="offset-shape-bg" style={{ borderRadius: '20px' }}></div>
          <div style={{ width: '100%', height: '100%', borderRadius: '20px', backgroundColor: 'var(--primary)', position: 'relative', zIndex: 1 }}></div>
        </div>
      </motion.div>

      {/* Triangle Shape (CSS border trick inside container) */}
      <motion.div
        className="shape"
        style={{ bottom: '10%', right: '20%' }}
        animate={{ y: [0, -30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="offset-shape-container" style={{ width: '0', height: '0' }}>
           <div style={{
             position: 'absolute', top: '10px', left: '10px',
             width: '0', height: '0',
             borderLeft: '30px solid transparent',
             borderRight: '30px solid transparent',
             borderBottom: '52px solid rgba(10, 37, 64, 0.1)',
             zIndex: -1
           }}></div>
           <div style={{
             width: '0', height: '0',
             borderLeft: '30px solid transparent',
             borderRight: '30px solid transparent',
             borderBottom: '52px solid var(--primary-light)',
             position: 'relative', zIndex: 1
           }}></div>
        </div>
      </motion.div>
    </div>
  );
});

export default FloatingShapes;
