import React from 'react';
import './Hero.css';
import hero_img from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className='hero' dir='rtl'>
      <div className="hero-content">
        <div className="hero-text">
          <h2>חדש באתר !!!</h2>
          <div className="hero-subtext">
            <div className="hero-hand-icon">
              <p>חדש</p>
            </div>
            <p>קולקציה</p>
            <p>לכל אחד</p>
          </div>
          <button className="hero-latest-btn">קולקצייה אחרונה</button>
        </div>
        <div className="hero-left">
          <img src={hero_img} alt="Hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
