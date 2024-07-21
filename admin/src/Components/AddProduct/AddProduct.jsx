import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>שם המוצר</p>
            <input type="text" name='name' placeholder='הקלד כאן' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>מחיר</p>
                <input type="text" name='old_price' placeholder='הקלד כאן' />
            </div>
            <div className="addproduct-itemfield">
                <p>מחיר לאחר הנחה</p>
                <input type="text" name='new_price' placeholder='הקלד כאן' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>קטגוריית המוצר</p>
            <select className='addproduct-selector' name="category" >
                <option value="women">נשים</option>
                <option value="men">גברים</option>
                <option value="kid">ילדים</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input type="file" name='image' id='file-input' hidden />
        </div>
        <button className='addproduct-button'>
            הוסף מוצר
        </button>


    </div>
  )
}

export default AddProduct