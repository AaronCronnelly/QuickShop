import React from 'react';
import map from './assets/images/map.png';

const StoreMap = ({ selectedShop, items }) => {
  // Render the map based on the selectedShop

  return (
    <div className="store-map">
      <img src={map} alt="Store Layout" className="store-map" />
    </div>
  );
};

export default StoreMap;