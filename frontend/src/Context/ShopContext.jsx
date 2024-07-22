import React, { createContext, useState, useEffect } from 'react';

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

  const addToCart = (itemId, size) => {
    setCartItems((prev) => {
        const key = `${itemId}-${size}`;
        return { ...prev, [key]: (prev[key] || 0) + 1 };
    });
};

const removeFromCart = (itemId, size) => {
    setCartItems((prev) => {
        const key = `${itemId}-${size}`;
        const newCart = { ...prev };
        if (newCart[key] > 0) {
            newCart[key] -= 1;
        }
        return newCart;
    });
};

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
