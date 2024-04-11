import React from 'react';
import map from './assets/images/map.png';

const StoreMap = ({ selectedShop, items }) => {
  const allItems = [
    ...items,  // spreads the existing items passed as props
  { name: 'register', x: 320, y: 400 },
  { name: 'snacks', x: 368, y: 509 },
  { name: 'pasta', x: 220, y: 290 },
  { name: 'bakery', x: 360, y: 230 },
  { name: 'dairy', x: 75, y: 220 },
  /*{ name: 'frozen foods', x: 620, y: 350 },
  { name: 'canned goods', x: 368, y: 509 },
  { name: 'beverages', x: 550, y: 300 },
  { name: 'canned goods', x: 470, y: 450 },
  { name: 'cereal', x: 500, y: 320 },
  { name: 'pasta', x: 410, y: 390 },
  { name: 'spices', x: 380, y: 320 },
  { name: 'condiments', x: 330, y: 340 },
  { name: 'health & beauty', x: 200, y: 250 },
  { name: 'household supplies', x: 180, y: 300 },
  { name: 'pet supplies', x: 520, y: 220 },*/
  ];

  return (
    <div className="store-map" style={{ position: 'relative' }}>
      <img src={map} alt="Store Layout" style={{ width: '100%', height: 'auto' }} />
      {allItems.map((item, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: `${item.x}px`,
          top: `${item.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%'
        }}>
        </div>
      ))}
    </div>
  );
};

export default StoreMap;
