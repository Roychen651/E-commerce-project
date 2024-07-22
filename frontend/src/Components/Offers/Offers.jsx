import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';

const Offers = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/womens');
  };

  return (
    <div className='offers'>
      <div className="offers-right">
        <h1>מבצעים חמים עבורך</h1>
        <p>רק מוצרים חמים ונחשקים</p>
        <button onClick={handleButtonClick}>לקנייה</button>
      </div>
      <div className="offers-left">
        <img src={exclusive_image} alt="Exclusive" />
      </div>
    </div>
  );
};

export default Offers;
