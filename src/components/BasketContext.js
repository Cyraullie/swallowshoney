import React, { createContext, useState, useEffect } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketContent, setBasketContent] = useState([]);

  useEffect(() => {
    const storedBasketContent = JSON.parse(localStorage.getItem('basketContent')) || [];
    setBasketContent(storedBasketContent);
  }, []);

  useEffect(() => {
    localStorage.setItem('basketContent', JSON.stringify(basketContent));
  }, [basketContent]);

  const addToBasket = (item) => {
    setBasketContent(prevContent => {
      const existingItemIndex = prevContent.findIndex(i => i.id === item.id);
      if (existingItemIndex !== -1) {
        const updatedContent = [...prevContent];
        updatedContent[existingItemIndex].quantity += item.quantity;
        return updatedContent;
      } else {
        return [...prevContent, item];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setBasketContent(prevContent => {
      return prevContent.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromBasket = (itemId) => {
    setBasketContent(prevContent => prevContent.filter(item => item.id !== itemId));
  };

  return (
    <BasketContext.Provider value={{ basketContent, addToBasket, updateQuantity, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
