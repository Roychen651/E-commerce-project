import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:4000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (result.success) {
        setMessage('תודה על ההצטרפות לניוזלטר שלנו!');
      } else {
        setMessage('נכשלה שליחת האימייל, נסה שנית.');
      }
    } catch (error) {
      setMessage('אירעה שגיאה, נסה שנית.');
    }
  };

  return (
    <div className='news-letter'>
      <h1>קבל/י מבצעים חמים ישר למייל שלך</h1>
      <p>הירשמו לניוזלטר שלנו והישארו מעודכנים תמיד</p>
      <div>
        <input
          type="email"
          placeholder='אימייל'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>הצטרף/פי</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default NewsLetter;