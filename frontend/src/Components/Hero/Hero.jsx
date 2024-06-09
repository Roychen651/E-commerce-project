import React from 'react'
import './Hero.css'
import hero_img from '../Assets/hero_image.png'



const Hero = () => {
  return (
    <div className='hero' dir='rtl'>
        <div className="hero-right">
            <h2>חדש באתר !!!</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>חדש</p>
                </div>
                <p>קולקציה</p>
                <p>לכל אחד</p>
            </div>
            <div className="hero-latest-btn">
                <div>
                    קולקצייה אחרונה
                </div>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_img} alt="" />

        </div>

    </div>
  )
}
export default Hero;