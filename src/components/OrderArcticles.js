import React, { useState, useContext } from 'react';
import { BasketContext } from './BasketContext';
  

const OrderArticles = ({ orderContent }) => {
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

  const handleClick = (itemId) => {
    removeFromBasket(itemId);
  };

  return (
    <>
    <div className="OrderArticles">
      {basketContent.map(item => (
        <div className='OrderArticle' key={item.id}>
          <a className='NameArticle'>{item.name}</a>
          <a>
            <input
              className="BasketNumberButton"
              type="number"
              min={1}
              value={inputValues[item.id] || item.quantity}
              onChange={(event) => handleQuantityChange(item.id, event)}
            />
          pcs</a>
          <a>{item.price} .-/pcs</a>
          <a>{(item.quantity * item.price).toFixed(2)} .-</a>
          <a className="TrashButton" onClick={() => handleClick(item.id)}>
            <img className='icon' src='assets/trash.png' alt='delete' />
          </a>
        </div>
      ))}
    </div>
    </>
  )
  


  
}

export default OrderArticles;