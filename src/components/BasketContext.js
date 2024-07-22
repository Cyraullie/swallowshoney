import React, { createContext, useState, useEffect } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketContent, setBasketContent] = useState(() => {
    const storedBasketContent = localStorage.getItem('basketContent');
    return storedBasketContent ? JSON.parse(storedBasketContent) : [];
  });

  // Lire le contenu du panier depuis le localStorage au chargement
  useEffect(() => {
    const storedBasketContent = localStorage.getItem('basketContent');
    if (storedBasketContent) {
      setBasketContent(JSON.parse(storedBasketContent));
    }
  }, []);

  // Mettre à jour le localStorage lorsque le contenu du panier change
  useEffect(() => {
    localStorage.setItem('basketContent', JSON.stringify(basketContent));
  }, [basketContent]);

  // Fonction pour ajouter des articles au panier
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

  // Fonction pour retirer des articles du panier
  const removeFromBasket = (itemId) => {
    setBasketContent(prevContent => prevContent.filter(item => item.id !== itemId));
  };

  return (
    <BasketContext.Provider value={{ basketContent, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
