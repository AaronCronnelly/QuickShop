import React from 'react';
import map from './assets/images/map.png';
import { dijkstra, reconstructPath, getPathForShoppingList } from './pathfinding';
import mapGrid from './assets/images/mapGrid.png';

// Fixed graph structure
const graph = {
  entrance: {
    coordinates: { x: 30, y: 225 },
    adjacent: {
      aisle1_start: 1,
    },
  },
  aisle1_start: {
    coordinates: { x: 60, y: 225 },
    adjacent: {
      entrance: 1,
      aisle1_end: 1,
    },
  },
  aisle1_end: {
    coordinates: { x: 60, y: 250 },
    adjacent: {
      aisle1_start: 1,
    },
  },
  exit: {
    coordinates: { x: 320, y: 80 },
    adjacent: {
    },
  },
};

const StoreMap = ({ selectedShop, items }) => {
  React.useEffect(() => {
    const shoppingListNodes = items.map(item => item.name); // Map items to their node names
    const shoppingPath = getPathForShoppingList(graph, shoppingListNodes, 'entrance');
    
    console.log(shoppingPath);
  }, [items]);
  const allItems = [
    ...items,  // spreads the existing items passed as props
  { name: 'entrance', x: 30, y: 225 },
  { name: 'exit', x: 320, y: 80 },
  { name: 'register', x: 320, y: 400 },
  { name: 'snacks', x: 368, y: 480 },
  { name: 'pasta', x: 220, y: 290 },
  { name: 'fruit', x: 70, y: 320 },
  { name: 'vegetables', x: 170, y: 380 },
  { name: 'sauces', x: 280, y: 330 },
  { name: 'bakery', x: 360, y: 230 },
  { name: 'dairy', x: 75, y: 220 },
  { name: 'meat', x: 150, y: 160 },
  { name: 'fish', x: 240, y: 110 },
  { name: 'cereal', x: 250, y: 260 },
  { name: 'spices', x: 240, y: 360 },
  { name: 'condiments', x: 310, y: 300 },
  { name: 'frozen foods', x: 430, y: 400 },
  { name: 'health & beauty', x: 430, y: 160 },
  { name: 'household supplies', x: 500, y: 200 },
  { name: 'cans', x: 350, y: 280 },
  { name: 'beverages', x: 500, y: 300 },
  { name: 'pet supplies', x: 560, y: 245 }
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
        }}>
          {/* Dot for the item */}
          <div className="red-dot"></div>

          {/* Text label for the item */}
          <span className="label">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StoreMap;
