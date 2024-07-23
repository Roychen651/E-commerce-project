import React, { useState } from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const openDialog = (content) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Footer Logo" />
      </div>
      <ul className="footer-links">
        <li onClick={() => openDialog('אודות')}>אודות</li>
        <li onClick={() => openDialog('משרדים')}>משרדים</li>
        <li onClick={() => openDialog('צור קשר')}>צור קשר</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <a href="https://www.instagram.com/roychen.97/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icon-container">
          <a href="https://wa.me/+972508815855" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>R&O כל הזכויות שמורות ל</p>
        <p>2024</p>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>{dialogContent}</h2>
            {dialogContent === 'צור קשר' && (
              <>
                <p>טלפון: 123-456-7890</p>
                <p>R&O@mail.com :אימייל</p>
                <p>כתובת: רחוב הראשי 123, תל אביב</p>
              </>
            )}
            {dialogContent === 'אודות' && (
              <>
                <p>R&O ברוכים הבאים ל</p>
                <p>.אנו מתמחים באופנה עכשווית לנשים, גברים וילדים</p>
                <p>.המטרה שלנו היא לספק לכם את הסטייל האחרון במחירים הוגנים</p>
                <p>!הצטרפו אלינו לחוויית קניות ייחודית ומהנה</p>
              </>
            )}
            {dialogContent === 'משרדים' && (
              <>
                <p>:המשרד הראשי</p>
                <p>רחוב הרצל 50, תל אביב</p>
                <p>:סניפים</p>
                <ul>
                  <li>קניון עזריאלי, תל אביב</li>
                  <li>קניון מלחה, ירושלים</li>
                  <li>גרנד קניון, חיפה</li>
                  <li>קניון הנגב, באר שבע</li>
                </ul>
              </>
            )}
            <button onClick={closeDialog}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
