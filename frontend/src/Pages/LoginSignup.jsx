import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState('התחברות');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('authToken', responseData.authToken);
        alert(`ברוך השב ${responseData.username}`);
        window.location.replace('/');
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('ההתחברות נכשלה, אנא נסה שנית');
    }
  };

  const signup = async () => {
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('authToken', responseData.authToken);
        alert(`ברוך הבא ${responseData.username}`);
        window.location.replace('/');
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('ההרשמה נכשלה, אנא נסה שנית');
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === 'הרשמה' && (
            <input
              name='username'
              value={formData.username}
              onChange={handleChange}
              type='text'
              placeholder='השם שלך'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={handleChange}
            type='email'
            placeholder='כתובת מייל'
          />
          <input
            name='password'
            value={formData.password}
            onChange={handleChange}
            type='password'
            placeholder='סיסמא'
          />
        </div>
        <button onClick={() => (state === 'התחברות' ? login() : signup())}>המשך</button>
        {state === 'הרשמה' ? (
          <p className='loginsignup-login'>
            כבר יש לך חשבון? <span onClick={() => setState('התחברות')}>התחבר כאן</span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            צור חשבון <span onClick={() => setState('הרשמה')}>לחץ כאן</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
