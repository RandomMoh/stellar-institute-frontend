import React, { useMemo } from 'react';
import LogoLoop from './LogoLoop';
import './LogoMarquee.css';

const logoItems = [1, 2, 3, 4, 5, 6].map(num => ({
  src: `/assets/logos/${num}.png`,
  alt: `Partner Logo ${num}`,
}));

export default function LogoMarquee() {
  return (
    <section className="logo-marquee-section">
      <div className="container">
        <div className="logo-marquee-header">
          <div className="logo-marquee-label">Recognized &amp; Affiliated With</div>
        </div>
      </div>

      <LogoLoop
        logos={logoItems}
        speed={60}
        direction="left"
        logoHeight={64}
        gap={60}
        hoverSpeed={0}
        fadeOut
        fadeOutColor="#ffffff"
        scaleOnHover
        ariaLabel="Recognized and affiliated organizations"
        style={{ width: '100%' }}
      />
    </section>
  );
}
