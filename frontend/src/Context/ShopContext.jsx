import React, { createContext, useState, useCallback } from 'react';
import all_product from '../Components/Assets/all_product'; 

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 1; index <= all_product.length; index++) {
    cart[index] = 0;      
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = useCallback((itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems, [itemId]: prevCartItems[itemId] + 1 };
      console.log('Updated cart:', updatedCart);
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems, [itemId]: prevCartItems[itemId] - 1 };
      console.log('Updated cart:', updatedCart);
      return updatedCart;
    });
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount; 
  }

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems; 
  } 

  const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount,getTotalCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
