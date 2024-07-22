import React, { createContext, useState } from 'react';

export const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState(false);
  const [type, setType] = useState(false);

  return (
    <BannerContext.Provider value={{ showBanner, setShowBanner, message, setMessage, type, setType }}>
      {children}
    </BannerContext.Provider>
  );
};
