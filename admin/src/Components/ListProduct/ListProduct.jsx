import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

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

  const handleEditClick = (product) => {
    setEditProduct(product);
    setUpdatedProduct({ ...product });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    const { id, name, image, category, new_price, old_price } = updatedProduct;
    await fetch('http://localhost:4000/updateproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name, image, category, new_price, old_price })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setAllproducts(allproducts.map(product =>
          product.id === id ? data.product : product
        ));
        setEditProduct(null);
      } else {
        console.error('Failed to update the product:', data.message);
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
        {allproducts.map((product) => {
          const isEditing = editProduct && editProduct.id === product.id;
          return (
            <div key={product.id}>
              <div className="listproduct-format-main listproduct-format">
                {isEditing ? (
                  <>
                    <input
                      name="name"
                      value={updatedProduct.name}
                      onChange={handleInputChange}
                    />
                    <input
                      name="image"
                      value={updatedProduct.image}
                      onChange={handleInputChange}
                    />
                    <input
                      name="category"
                      value={updatedProduct.category}
                      onChange={handleInputChange}
                    />
                    <input
                      name="old_price"
                      type="number"
                      value={updatedProduct.old_price}
                      onChange={handleInputChange}
                    />
                    <input
                      name="new_price"
                      type="number"
                      value={updatedProduct.new_price}
                      onChange={handleInputChange}
                    />
                    <button onClick={handleUpdateProduct}>עדכן</button>
                    <button onClick={() => setEditProduct(null)}>ביטול</button>
                  </>
                ) : (
                  <>
                    <img src={product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>₪{product.old_price}</p>
                    <p>₪{product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    <button onClick={() => handleEditClick(product)}>ערוך</button>
                  </>
                )}
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
