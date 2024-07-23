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
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    if (all_product) {
      let filtered = all_product.filter(
        (item) => 
          props.category === item.category &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Apply color and type filters on the product names
      if (selectedColor) {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(selectedColor.toLowerCase()));
      }
      
      if (selectedType) {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(selectedType.toLowerCase()));
      }
      
      setFilteredProducts(filtered);
    }
  }, [all_product, props.category, searchTerm, selectedColor, selectedType]);

  const handleSearch = () => {
    // handle search with current filters applied
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

  const handleColorFilter = (color) => {
    setSelectedColor(color);
    setShowColorOptions(false);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    setShowTypeOptions(false);
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

  const productsToDisplay = sortProducts(filteredProducts);

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
        <div className="shopcategory-filters">
          <div className="shopcategory-sort" onClick={() => setShowSortOptions(!showSortOptions)}>
            <span>מיין לפי מחיר <img src={dropdown_icon} alt="Sort Dropdown" /></span>
            {showSortOptions && (
              <div className="sort-options show">
                <div onClick={() => handleSort('default')}>ברירת מחדל</div>
                <div onClick={() => handleSort('low-to-high')}>מחיר: מהנמוך לגבוה</div>
                <div onClick={() => handleSort('high-to-low')}>מחיר: מהגבוה לנמוך</div>
              </div>
            )}
          </div>
          <div className="shopcategory-color" onClick={() => setShowColorOptions(!showColorOptions)}>
            <span>סנן לפי צבע <img src={dropdown_icon} alt="Color Dropdown" /></span>
            {showColorOptions && (
              <div className="color-options show">
                <div onClick={() => handleColorFilter('')}>הכל</div>

                <div onClick={() => handleColorFilter('אדום')}>אדום</div>
                <div onClick={() => handleColorFilter('כחול')}>כחול</div>
                <div onClick={() => handleColorFilter('שחור')}>שחור</div>
              </div>
            )}
          </div>
          <div className="shopcategory-type" onClick={() => setShowTypeOptions(!showTypeOptions)}>
            <span>סנן לפי סוג <img src={dropdown_icon} alt="Type Dropdown" /></span>
            {showTypeOptions && (
              <div className="type-options show">
                <div onClick={() => handleTypeFilter('')}>הכל</div>
                <div onClick={() => handleTypeFilter('צווארון')}>צווארון </div>
                <div onClick={() => handleTypeFilter('מעיל')}>מעילים</div>
                <div onClick={() => handleTypeFilter('פליז')}>פליז</div>
              </div>
            )}
          </div>
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
      <div><br /><br /><br /></div>
    </div>
  );
};

export default ShopCategory;
