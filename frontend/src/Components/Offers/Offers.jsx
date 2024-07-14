import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-right">
            <h1>מבצעים חמים עבורך</h1>
            <p>רק מוצרים חמים ונחשקים </p>
            <button>לקנייה</button> 
        </div>

        <div className="offers-left">
            <img src={exclusive_image} alt="" />

        </div>
    </div>
  )

}
export default Offers;