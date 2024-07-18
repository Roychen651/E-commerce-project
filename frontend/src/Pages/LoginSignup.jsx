import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>הרשמה</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='השם שלך' />
          <input type="email" placeholder='כתובת מייל' />
          <input type="password" placeholder='סיסמא' />
          
        </div>
        <button>המשך</button>
        <p className="loginsignup-login">כבר יש לך חשבון? <span>התחבר כאן</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>בהרשמתי , אני מאשר את תנאי השימוש והפרטיות</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
