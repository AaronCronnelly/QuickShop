import React from 'react';
import map from './assets/images/map.png';
import mapGrid from './assets/images/mapGrid.png';

const graph = {
  entrance: {
    coordinates: { x: 30, y: 225 },
    adjacent: {
      aisle1_start: 1,
    },
  },
  aisle1_start: {
    coordinates: { x: 2, y: 1 },
    adjacent: {
      entrance: 1,
      aisle1_end: 1,
    },
  },
  aisle1_end: {
    coordinates: { x: 2, y: 2 },
    adjacent: {
      aisle1_start: 1,
      aisle2_start: 1,
    },
  },
  aisle2_start: {
    coordinates: { x: 3, y: 2 },
    adjacent: {
      aisle1_end: 1,
      aisle2_end: 1,
    },
  },
};


const StoreMap = ({ selectedShop, items }) => {
  const allItems = [
    ...items,  // spreads the existing items passed as props
  { name: 'register', x: 320, y: 400 },
  { name: 'snacks', x: 368, y: 509 },
  { name: 'pasta', x: 220, y: 290 },
  { name: 'bakery', x: 360, y: 230 },
  { name: 'dairy', x: 75, y: 220 },
  { name: 'entrance', x: 30, y: 225 },
  { name: 'exit', x: 320, y: 80 },
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
      {/* Image without the grid */}
      <img src={map} alt="Store Layout" style={{ width: '100%', height: 'auto' }} />
      {/* Image with the grid */}
      <img src={mapGrid} alt="Map Grid" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', opacity: 0.5 }} />
      {/* Rendering items */}
      {allItems.map((item, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: `${item.x}px`,
          top: `${item.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          zIndex: 1, // Ensure items are above the grid
        }}>
          {/* Display coordinates as text labels */}
          <span style={{ position: 'absolute', color: 'black', fontSize: '12px', top: '-15px', left: '15px' }}>{`(${item.x}, ${item.y})`}</span>
        </div>
      ))}
    </div>
  );
};

export default StoreMap;
