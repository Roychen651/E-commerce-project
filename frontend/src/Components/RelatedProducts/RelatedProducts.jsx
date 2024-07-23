import React, { useEffect, useState } from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';

const RelatedProducts = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/relatedproducts/${category}`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error('Error fetching related products:', error));
  }, [category]);

  return (
    <div className='relatedproducts'>
      <h1>מוצרים דומים</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
