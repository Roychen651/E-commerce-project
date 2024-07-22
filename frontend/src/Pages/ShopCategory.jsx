import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(() => {
    if (all_product) {
      const filtered = all_product.filter(
        (item) => props.category === item.category &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [all_product, props.category, searchTerm]);

  if (!all_product) {
    return <div>Loading...</div>;
  }

  const handleSearch = () => {
    const filtered = all_product.filter(
      (item) => 
        props.category === item.category && 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setShowSortOptions(false);
  };

  const sortProducts = (products) => {
    switch (sortOrder) {
      case 'low-to-high':
        return [...products].sort((a, b) => a.new_price - b.new_price);
      case 'high-to-low':
        return [...products].sort((a, b) => b.new_price - a.new_price);
      default:
        return products;
    }
  };

  const productsToDisplay = sortProducts(filteredProducts.length > 0 ? filteredProducts : all_product);

  return (
    <div className='shop-category'>
      <div className="shopcategory-banner-container">
        <img className="shopcategory-banner" src={props.banner} alt="Banner" />
      </div>
      <div className="shopcategory-search">
        <input 
          type="text" 
          placeholder="חפש מוצר לפי שם" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>חיפוש</button>
      </div>
      <div className="shopcategory-indexSort">
        <p>
          <span>מציג 1-12</span> מתוך {productsToDisplay.length} מוצרים
        </p>
        <div className="shopcategory-sort">
          <span onClick={() => setShowSortOptions(!showSortOptions)}>
            מיין לפי <img src={dropdown_icon} alt="Sort Dropdown" />
          </span>
          {showSortOptions && (
            <div className="sort-options">
              <div onClick={() => handleSort('default')}>ברירת מחדל</div>
              <div onClick={() => handleSort('low-to-high')}>מחיר: מהנמוך לגבוה</div>
              <div onClick={() => handleSort('high-to-low')}>מחיר: מהגבוה לנמוך</div>
            </div>
          )}
        </div>
      </div>
      <div className="shopcategory-products">
        {productsToDisplay.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
     <div> <br></br><br></br><br></br></div>
    </div>
  );
};

export default ShopCategory;
