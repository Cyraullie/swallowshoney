import React, { createContext, useState, useEffect } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketContent, setBasketContent] = useState(() => {
    // Lire le contenu du panier depuis localStorage lors de l'initialisation
    const savedBasket = localStorage.getItem('basketContent');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  useEffect(() => {
    // Mettre à jour localStorage chaque fois que basketContent change
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

  const clearBasket = () => {
    setBasketContent([]);
  };

  return (
    <BasketContext.Provider value={{ basketContent, addToBasket, updateQuantity, removeFromBasket, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
