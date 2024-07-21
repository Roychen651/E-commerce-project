import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  // Get all products from the database server
  const fetchInfo = async () => {
    await fetch('http://localhost:4000/getproducts')
      .then((response) => response.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`http://localhost:4000/deleteproduct`, {
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setAllproducts(allproducts.filter(product => product.id !== id));
      } else {
        console.error('Failed to delete the product:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className='list-product'>
      <h1>רשימת כל המוצרים</h1>
      <div className="listproduct-format-main">
        <p>מוצרים</p>
        <p>שם</p>
        <p>מחיר מקורי</p>
        <p>מחיר אחרי הנחה</p>
        <p>קטגוריה</p>
        <p>מחק</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>₪{product.old_price}</p>
                <p>₪{product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListProduct;
