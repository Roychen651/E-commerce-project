import React, { createContext, useState, useCallback, useEffect } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/getproducts')
      .then((response) => response.json())
      .then((data) => {
        setAll_Product(data);
        const initialCart = {};
        data.forEach(product => {
          initialCart[product.id] = 0;
        });
        setCartItems(initialCart);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
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

  const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
