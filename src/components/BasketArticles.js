import React, { useState, useEffect, useContext } from 'react';
import { BasketContext } from './BasketContext';

const BasketArticles = () => {
  const { basketContent, updateQuantity, removeFromBasket } = useContext(BasketContext);
  const [inputValues, setInputValues] = useState(() => {
    const initialInputValues = {};
    basketContent.forEach(item => {
      initialInputValues[item.id] = item.quantity;
    });
    return initialInputValues;
  });

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = event.target.valueAsNumber;
    setInputValues(prevValues => ({
      ...prevValues,
      [itemId]: newQuantity
    }));
    updateQuantity(itemId, newQuantity);
  };

  useEffect(() => {
    const initialInputValues = {};
    basketContent.forEach(item => {
      initialInputValues[item.id] = item.quantity;
    });
    setInputValues(initialInputValues);
  }, [basketContent]);

  const handleClick = (itemId) => {
    removeFromBasket(itemId);
  };

  return (
    <div className="BasketArticles" style={{ overflowY: "scroll"}}>
      {basketContent.map(item => (
        <div className='BasketArticle' key={item.id}>
          <a>{item.name}</a>
          <div className='HandleBasket'>
            <a>
              <input
                className="BasketNumberButton"
                type="number"
                min={1}
                value={inputValues[item.id] || item.quantity}
                onChange={(event) => handleQuantityChange(item.id, event)}
              />
              pcs
            </a>
            <a className="TrashButton" onClick={() => handleClick(item.id)}>
              <img className='icon' src='assets/trash.png' alt='delete' />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketArticles;
