import React, { useState, useEffect } from 'react';
import map from './assets/images/map.png';
import { dijkstra, reconstructPath, getPathForShoppingList } from './pathfinding';
import mapGrid from './assets/images/mapGrid.png';


export const graph = {
  entrance: {
    coordinates: { x: 30, y: 225 },
    adjacent: {
      aisle1_start: 1,
    },
  },
    // Aisle 1
    aisle1_start: {
      coordinates: { x: 100, y: 400 },
      adjacent: {
        dairy: 1,
        bakery: 1,
        aisle1_end: 1,
      },
    },
    aisle1_end: {
      coordinates: { x: 100, y: 50 },
      adjacent: {
        aisle1_start: 1,
        meat: 1,
        fish: 1,
      },
    },
    // Aisle 2
    aisle2_start: {
      coordinates: { x: 200, y: 400 },
      adjacent: {
        fruit: 1,
        vegetables: 1,
        aisle2_end: 1,
      },
    },
    aisle2_end: {
      coordinates: { x: 200, y: 50 },
      adjacent: {
        aisle2_start: 1,
        cereal: 1,
        rice: 1,
      },
    },
    // Aisle 3
    aisle3_start: {
      coordinates: { x: 300, y: 400 },
      adjacent: {
        spices: 1,
        condiments: 1,
        aisle3_end: 1,
      },
    },
    aisle3_end: {
      coordinates: { x: 300, y: 50 },
      adjacent: {
        aisle3_start: 1,
        beverages: 1,
        snacks: 1,
        aisle2_end: 1,
        aisle1_end: 1,
      },
    },
    // Aisle 4
aisle4_start: {
  coordinates: { x: 160, y: 400 }, 
  adjacent: {
    aisle3_end: 1,
    aisle4_end: 1,
  },
},
aisle4_end: {
  coordinates: { x: 160, y: 50 },
  adjacent: {
    aisle4_start: 1,
    aisle5_start: 1, 
  },
},

// Aisle 5
aisle5_start: {
  coordinates: { x: 230, y: 400 }, 
  adjacent: {
    aisle4_end: 1,
    aisle5_end: 1,
  },
},
aisle5_end: {
  coordinates: { x: 230, y: 50 },
  adjacent: {
    aisle5_start: 1,
    aisle6_start: 1, 
  },
},

// Aisle 6
aisle6_start: {
  coordinates: { x: 300, y: 400 },
  adjacent: {
    aisle5_end: 1, 
    aisle6_end: 1,
  },
},
aisle6_end: {
  coordinates: { x: 300, y: 50 },
  adjacent: {
    aisle6_start: 1,
    aisle7_start: 1, 
    register: 1,
  },
},
// Aisle 7
aisle7_start: {
  coordinates: { x: 370, y: 400 }, 
  adjacent: {
    aisle6_end: 1, 
    aisle7_end: 1,
  },
},
aisle7_end: {
  coordinates: { x: 370, y: 50 }, 
  adjacent: {
    aisle7_start: 1,
    register: 1,
  },
},
    fruit: {
      coordinates: { x: 70, y: 320 },
      adjacent: {
        aisle1_start: 1,
      },
    },
    vegetables: {
      coordinates: { x: 170, y: 380 },
      adjacent: {
        aisle2_start: 1,
      },
    },
    meat: {
      coordinates: { x: 150, y: 160 },
      adjacent: {
        aisle1_end: 1,
      },
    },
    condiments: {
      coordinates: { x: 310, y: 300 },
      adjacent: {
        aisle3_end: 1, 
      },
    },
    pasta: {
      coordinates: { x: 220, y: 290 },
      adjacent: {
        aisle3_start: 1,
      },
    },
    spices: {
      coordinates: { x: 240, y: 360 },
      adjacent: {
        aisle3_end: 1,
      },
    },
    dairy: {
      coordinates: { x: 70, y: 220 },
      adjacent: {
        aisle1_end: 1,
      },
    },
    bakery: {
      coordinates: { x: 360, y: 230 },
      adjacent: {
        aisle1_start: 1,
        dairy: 1,       
        aisle1_end: 1,
      }, 
    },
    register: {
      coordinates: { x: 320, y: 400 },
      adjacent: {
        aisle3_end: 1, // Or the correct aisle end node if 'aisle3_end' is not the right one
        exit: 1,
      },
    },
    exit: {
      coordinates: { x: 320, y: 80 },
      adjacent: {
        register: 1, // Direct connection from the register to the exit
      },
  },
};

const StoreMap = ({ selectedShop, items, route }) => {
  const [svgPathData, setSvgPathData] = useState('');

  useEffect(() => {
    if (route && route.length > 0) {
      const calculatedSvgPath = route.map(locationName => {
        const node = graph[locationName];
        return `${node.coordinates.x},${node.coordinates.y}`;
      }).join(' L ');
    
      console.log("Calculated SVG Path:", calculatedSvgPath); // Debug statement to log calculated SVG path
    
      // Set the SVG path data as a valid SVG path
      setSvgPathData(`M ${calculatedSvgPath}`);
    }
  }, [route]);  


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
        {/* Render the SVG path element with the calculated SVG path data */}
        <path d={svgPathData} stroke="blue" strokeWidth="3" fill="none" />
        {/* Render SVG circles and labels for each item */}
        {allItems.map((item, index) => (
          <React.Fragment key={index}>
            <circle cx={item.x} cy={item.y} r="5" fill="red" />
            <text x={item.x} y={item.y - 10} fontSize="12" textAnchor="middle" text fontWeight="bold" fill="black">{item.name}</text>
          </React.Fragment>
        ))}
      </svg>
      <img src={mapGrid} alt="Map Grid" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', opacity: 0.5 }} />

      {/* Render items */}
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
