import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'


const ProductDisplay = (props) => {
    const {product} = props;
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-image-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />

            </div>
            <div className="productdisplay-image">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-price-description">קלת משקל, בעלת גזרה צמודה, צווארון מעוגל ושרוולים קצרים</div>
            <div className="productdisplay-right-size">
                <h1>בחר/י מידה</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button>הוסף לעגלת הקניות</button>
            <p className='productdisplay-right-category'><span> קטגוריה</span> נשים, חולצה קצרה, שרוולים קצרים </p>
            <p className='productdisplay-right-category'><span> תגיות</span> חדש, מודרני </p>

        </div>

    </div>
  )
}

export default ProductDisplay