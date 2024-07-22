import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
  const [new_collections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => {
        setNewCollections(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className='new-collections' id='newCollections'>
      <h1>קולקציות חדשות באתר </h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} 
                       new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
    </div>
  );
};

export default NewCollections;
