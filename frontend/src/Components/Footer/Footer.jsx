import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="Footer Logo" />
        </div>
        <ul className="footer-links">
            <li>חברה</li>
            <li>מוצרים</li>
            <li>משרדים</li>
            <li>אודות</li>
            <li>צור קשר</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={instagram_icon} alt="Instagram" />
            </div>
            <div className="footer-icon-container">
                <img src={whatsapp_icon} alt="WhatsApp" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>R&O כל הזכויות שמורות ל</p>
            <p>2024</p>
        </div>
    </div>
  );
}

export default Footer;
