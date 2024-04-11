import React from 'react';
import map from './assets/images/map.png';

const StoreMap = ({ selectedShop, items }) => {
  // Example of veg
  const exampleItem = {
    name: 'veg',
    x: 368, // x-coordinate on the map
    y: 509, // y-coordinate on the map
  };

  const dotStyle = {
    left: `${exampleItem.x}px`,
    top: `${exampleItem.y}px`,
    transform: 'translate(-50%, -50%)' 
  };

  return (
    <div className="store-map">
      <img src={map} alt="Store Layout" style={{ width: '100%', height: 'auto' }} />
      <div className="red-dot" style={dotStyle}></div> {/* red dot */}
    </div>
  );
};

export default StoreMap;
