import React, { useContext } from 'react';
import { BannerContext } from './BannerContext';

const Banner = () => {
  const { showBanner, message, type } = useContext(BannerContext);

  if (!showBanner) {
    return null;
  }

  return (
    <div className={`Banner ${type}`}>
      {message}
    </div>
  );
};

export default Banner;
