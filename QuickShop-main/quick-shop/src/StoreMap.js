import React, { useState, useEffect } from 'react';
import map from './assets/images/map.png';
import { dijkstra, reconstructPath, getPathForShoppingList } from './pathfinding';
import mapGrid from './assets/images/mapGrid.png';


// Fixed graph structure
export const graph = {
  entrance: {
    coordinates: { x: 30, y: 225 },
    adjacent: {
      aisle1_start: 1,
    },
  },
  dairy: {
    coordinates: { x: 75, y: 220 },
    adjacent: {},
  },
  bakery: {
    coordinates: { x: 360, y: 230 },
    adjacent: {}, 
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
  const [svgPathData, setSvgPathData] = useState('');

  useEffect(() => {
    // Extract sections from items
    const sections = items.map(item => item.section);
    const shoppingPath = getPathForShoppingList(graph, sections, 'entrance');

    // Calculate SVG path data
    const calculatedSvgPath = shoppingPath.map(locationName => {
      const node = graph[locationName];
      return `${node.coordinates.x},${node.coordinates.y}`;
    }).join(' L ');

    // Update the state with the new SVG path data
    setSvgPathData(`M ${calculatedSvgPath}`);
  }, [items]);  // Dependency on items


  const allItems = [
    ...items,  // spreads the existing items passed as props
  { name: 'entrance', x: 30, y: 225 },
  { name: 'exit', x: 290, y: 70 },
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
  { name: 'rice', x: 280, y: 230 },
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
      <img src={map} alt="Store Layout" style={{ width: '100%', height: 'auto' }} />
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <path d={svgPathData} stroke="blue" strokeWidth="3" fill="none" />
      </svg>
      <img src={mapGrid} alt="Map Grid" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', opacity: 0.5 }} />

      {items.map((item, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: `${item.x}px`,
          top: `${item.y}px`,
          transform: 'translate(-50%, -50%)',
        }}>
          <div className="red-dot"></div>
          <span className="label">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
export default StoreMap;
