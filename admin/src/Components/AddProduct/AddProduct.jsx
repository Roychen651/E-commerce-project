import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: 'women',
    image: ''
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleProduct = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };


  // Add product to the database server 
  // and upload the image to the server
  // that I created in the MongoDB
  // and the server will return the image URL
  // and then I will add the product to the database
  // with the image URL
  // and then I will display the product in the list of products
  // in the admin panel

  const addProduct = async () => {
    console.log(productDetails); 
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then((response) => response.json())
        .then((data) => {
          if(data.success) {
            alert('המוצר התווסף בהצלחה');
            // Resetting the form fields
            setProductDetails({
              name: '',
              old_price: '',
              new_price: '',
              category: 'women',
              image: ''
            });
            setImage(false);
          } else {
            alert('שגיאה בהוספת המוצר');
          }
        });
    }

    console.log('Product added:', product);
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>שם המוצר</p>
        <input
          value={productDetails.name}
          onChange={handleProduct}
          type="text"
          name="name"
          placeholder="הקלד כאן"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>מחיר</p>
          <input
            value={productDetails.old_price}
            onChange={handleProduct}
            type="text"
            name="old_price"
            placeholder="הקלד כאן"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>מחיר לאחר הנחה</p>
          <input
            value={productDetails.new_price}
            onChange={handleProduct}
            type="text"
            name="new_price"
            placeholder="הקלד כאן"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>קטגוריית המוצר</p>
        <select
          value={productDetails.category}
          onChange={handleProduct}
          className="addproduct-selector"
          name="category"
        >
          <option value="women">נשים</option>
          <option value="men">גברים</option>
          <option value="kid">ילדים</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={handleImage}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={addProduct} className="addproduct-button">
        הוסף מוצר
      </button>
    </div>
  );
};

export default AddProduct;
