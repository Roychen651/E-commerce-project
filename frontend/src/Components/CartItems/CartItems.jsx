import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, updateCartQuantity, getTotalCartAmount } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinueToPayment = async () => {
    if (!email || !address) {
      alert('נא להזין כתובת אימייל וכתובת');
      return;
    }

    setIsLoading(true);

    const items = Object.entries(cartItems).map(([key, quantity]) => {
      if (quantity > 0) {
        const [id, size] = key.split('-');
        const product = all_product.find(p => p.id === parseInt(id));
        return {
          name: product.name,
          size,
          price: product.new_price,
          quantity,
          total: product.new_price * quantity
        };
      }
      return null;
    }).filter(item => item !== null);

    try {
      const response = await fetch('http://localhost:4000/send-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          address,
          items,
          totalAmount: getTotalCartAmount()
        }),
      });

      if (response.ok) {
        alert('קבלה נשלחה לאימייל שלך!');
      } else {
        alert('שליחת הקבלה נכשלה. אנא נסה שוב.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('אירעה שגיאה. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity < 1) {
      alert('כמות חייבת להיות לפחות 1');
      return;
    }
    updateCartQuantity(id, size, newQuantity);
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>מוצר</p>
        <p>תיאור המוצר</p>
        <p>מידה</p>
        <p>מחיר</p>
        <p>כמות</p>
        <p>סך הכל</p>
        <p>הסר</p>
      </div>
      <hr />
      {Object.entries(cartItems).map(([key, quantity]) => {
        if (quantity > 0) {
          const [id, size] = key.split('-');
          const product = all_product.find(p => p.id === parseInt(id));
          return (
            <div key={key}>
              <div className="cartitems-format cartitems-format-main">
                <img src={product.image} alt="" className='carticon-product-icon' />
                <p>{product.name}</p>
                <p>{size}</p>
                <p>₪{product.new_price}</p>
                <input 
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(product.id, size, parseInt(e.target.value))}
                  className='cartitems-quantity'
                />
                <p>₪{product.new_price * quantity}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(product.id, size)} alt="" />
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
          <input 
            type="text" 
            placeholder="הזן את כתובת המשלוח שלך"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="הזן את כתובת המייל שלך לשליחת הקבלה"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleContinueToPayment} disabled={isLoading}>
            {isLoading ? 'שולח...' : 'המשך לתשלום'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
