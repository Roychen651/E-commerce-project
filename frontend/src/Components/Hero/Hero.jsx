import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleScrollToNewCollections = () => {
    const newCollectionsElement = document.getElementById('newCollections');
    if (newCollectionsElement) {
      newCollectionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <button className="hero-latest-btn" onClick={handleScrollToNewCollections}>
            הקולקציה שלנו כאן למטה
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
