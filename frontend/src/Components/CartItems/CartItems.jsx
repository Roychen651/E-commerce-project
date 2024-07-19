import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart,getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>מוצרים</p>
        <p>תיאור המוצר</p>
        <p>מחיר</p>
        <p>כמות</p>
        <p>סך הכל</p>
        <p>הסר</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>₪{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>₪{e.new_price * cartItems[e.id]}</p>
                <img src={remove_icon} onClick={() => { removeFromCart(e.id); }} alt="" />
              </div>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>סך הכל לתשלום</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>סה״כ</p>
                    <p>₪{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>עלות משלוח</p>
                    <p>חינם</p>

                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>סה״כ</h3>
                    <h3>₪{getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>המשך לתשלום</button>
        </div>
        <div className="cartitems-promocode">
            <p>אם יש לך קוד קופון, הקלד אותו כאן</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder="הזן קוד קופון" />
                <button>הפעל</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
