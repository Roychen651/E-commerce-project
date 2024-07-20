import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  if (!all_product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='shop-category'>
      <div className="shopcategory-banner-container">
        <img className="shopcategory-banner" src={props.banner} alt="Banner" />
      </div>
      <div className="shopcategory-indexSort">
        <p>
          <span>מציג 1-12</span> מתוך 36 מוצרים
        </p>
        <div className="shopcategory-sort">
          מיין לפי <img src={dropdown_icon} alt="Sort Dropdown" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
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
      <div className="shopcategory-loadmore">
        טען עוד
      </div>
    </div>
  );
};

export default ShopCategory;
