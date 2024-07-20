import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className='news-letter'>
      <h1>קבל/י מבצעים חמים ישר למייל שלך</h1>
      <p>הירשמו לניוזלטר שלנו והישארו מעודכנים תמיד</p>
      <div>
        <input type="email" placeholder='אימייל'/>
        <button>הצטרף/פי</button>
      </div>
    </div>
  );
}

export default NewsLetter;
