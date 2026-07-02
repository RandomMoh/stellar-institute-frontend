import React from 'react';
import './LogoMarquee.css';

export default function LogoMarquee() {
  // We have 6 logos: 1.png through 6.png
  const logos = [1, 2, 3, 4, 5, 6];
  
  // To create an infinite seamless loop, we duplicate the logos array
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="logo-marquee-section">
      <div className="container">
        <div className="logo-marquee-header">
          <div className="logo-marquee-label">Recognized & Affiliated With</div>
        </div>
      </div>
      
      <div className="logo-marquee-container">
        <div className="logo-marquee-track">
          {duplicatedLogos.map((num, index) => (
            <div className="logo-item" key={index}>
              <img src={`/assets/logos/${num}.png`} alt={`Partner Logo ${num}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
