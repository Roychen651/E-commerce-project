import React from 'react';
import './Hero.css';
import heroVideo from './hero.mp4'; 

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
        <div className="hero-video-container">
          <video className="hero-video" autoPlay muted loop>
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-text-overlay">
            <h1>חדש באתר קולקציה לכל אחד !!!</h1>
            <div className="hero-subtext">
              <div className="hero-hand-icon">
              
              </div>
              
            </div>
            <button className="hero-latest-btn" onClick={handleScrollToNewCollections}>
              הקולקציה שלנו כאן למטה
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
   
  );
};

export default Hero;
