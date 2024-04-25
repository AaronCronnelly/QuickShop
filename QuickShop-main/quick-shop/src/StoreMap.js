import React, { useState, useEffect } from 'react';
import map from './assets/images/map.png';
import { dijkstra, reconstructPath, getPathForShoppingList } from './pathfinding';
import mapGrid from './assets/images/mapGrid.png';


export const graph = {
  entrance: {
    coordinates: {  x: 30, y: 225 },
    adjacent: {
      aisle1_start: 1,
      aisle3_start: 1,
    },
  },
    // Aisle 1
    aisle1_start: {
      coordinates: { x: 60, y: 260 },
      adjacent: {
        entrance: 1,
        //fruit: 0.5,
        //vegetables: 0.5, 
        aisle1_end: 1,
      },
    },
    aisle1_end: {
      coordinates: {x: 368, y: 480 },
      adjacent: {
        snacks: 0.1,
        aisle1_start: 1,
      },
    },
    // Aisle 2
    aisle2_start: {
      coordinates: {x: 80, y: 240 },
      adjacent: {
        dairy: 0.1, // Very close to dairy section
        spices: 0.5, // Halfway down the aisle
        pasta: 0.5, // Halfway down the aisle, opposite side from spices
        aisle2_end: 1, // At the end near the register
      },
    },
    aisle2_end: {
      coordinates: { x: 310, y: 380 },
      adjacent: {
        register: 1, // Direct path to the register
        spices: 0.5, // spices is halfway down aisle 2
        aisle2_start: 1, // Direct path back to the start of aisle 2
      },
    },
    // Aisle 3
    aisle3_start: {
      coordinates: { x: 140, y: 210 },
      adjacent: {
        entrance: 1,
        meat: 1, //meat section is near the start of aisle 3
        pasta: 1, // Connection to pasta, adjust weight based on distance or walking time
        aisle3_end: 1, // Direct path to the end of aisle 3
      },
    },
    aisle3_end: {
      coordinates: { x: 390, y: 390 },
      adjacent: {
        frozen_food: 0.5,
        sauce: 1, // Connection to sauce, adjust weight based on distance or walking time
        cereal: 1, // Connection to cereal
        condiments: 1, // Connection to condiments
        aisle3_start: 1, // If the aisle can be traversed in both directions
        aisle4_start: 1,
      },
    },
    // Aisle 4
aisle4_start: {
  coordinates: { x: 180, y: 190 }, 
  adjacent: {
    cereal: 0.5,
      aisle3_end: 1, // if direct access to aisle 3 end is available
      aisle4_end: 1,
  },
},
aisle4_end: {
  coordinates: { x: 430, y: 360 },
  adjacent: {
    cans: 0.5, //  cans is halfway down aisle 4 on the right
    rice: 0.5, //  rice is halfway down aisle 4 on the right
    aisle4_start: 1, // path back to the start of aisle 4
    aisle5_start: 1,
  },
},

// Aisle 5
aisle5_start: {
  coordinates: {x: 225, y: 170 }, 
  adjacent: {
    aisle4_end: 1, // Connection to the end of Aisle 4 if it's directly adjacent
    bakery: 0.5, // Halfway to the bakery section from the start
    rice: 0.5, 
    aisle5_end: 1,
  },
},
aisle5_end: {
  coordinates: { x: 460, y: 320 },
  adjacent: {
    cans: 0.5, 
    beverages: 0.1, // close to the beverages section
    aisle5_start: 1,
  },
},

// Aisle 6
aisle6_start: {
  coordinates: { x: 280, y: 130 },
  adjacent: {
    bakery: 0.5,
    aisle5_end: 1, 
    aisle6_end: 1,
  },
},
aisle6_end: {
  coordinates: { x: 520, y: 280 },
  adjacent: {
    beverages: 0.2,
    aisle6_start: 1,
    aisle7_start: 1, 
  },
},
// Aisle 7
aisle7_start: {
  coordinates: { x: 370, y: 400 }, 
  adjacent: {
    aisle6_end: 1, 
    health_and_beauty: 0.5,
    aisle7_end: 1,
  },
},
aisle7_end: {
  coordinates: { x: 370, y: 50 }, 
  adjacent: {
    pet_supplies: 0.2,
    aisle7_start: 1,
  },
},
fruit: {
  coordinates: { x: 70, y: 320 },
  adjacent: {
    aisle1_start: 0.5, // Connect back to the start of aisle 1
  },
},
vegetables: {
  coordinates: { x: 170, y: 380 }, 
  adjacent: {
    aisle1_start: 0.5, // Connect back to the start of aisle 1
  },
},
snacks: {
  coordinates: { x: 368, y: 480 },
  adjacent: {
    aisle1_end: 0.1, // Connect back to the end of aisle 1
  },
},
    meat: {
      coordinates: { x: 150, y: 160 },
      adjacent: {
        //aisle1_end: 0.5,
        aisle3_start: 1,
        cans: 0.5,
      },
    },
    pasta: {
      coordinates: { x: 220, y: 290 },
      adjacent: {
        sauce: 0.1,
        aisle3_start: 0.5,
      },
    },
    sauces: {
      coordinates: { x: 280, y: 330 },
      adjacent: {
        pasta: 0.1, // Directly adjacent to pasta
        aisle3_end: 0.5,
      },
    },
    spices: {
      coordinates: { x: 240, y: 360 },
      adjacent: {
        aisle2_end: 0.5, // Connection back to the end of aisle 2
      },
    },
    cereal: {
      coordinates: {x: 250, y: 260 },
      adjacent: {
        aisle3_start: 0.5,
        aisle4_start: 0.5
      },
    },
    condiments: {
      coordinates: { x: 310, y: 300 },
      adjacent: {
        aisle3_end: 0.5 
      },
    },
    rice: {
      coordinates: { x: 280, y: 230 },
      adjacent: {
        aisle4_end: 0.5, // connect back to the end of aisle 4
        aisle5_start: 0.5, // assuming rice is halfway down aisle 5
        cans: 0.2,
      },
    },
    cans: {
      coordinates: { x: 350, y: 280 },
      adjacent: {
        meat: 0.5, 
        health_and_beauty: 0.5,
      },
    },
    dairy: {
      coordinates: {x: 75, y: 220 },
      adjacent: {
        aisle1_start: 1,
        aisle2_start: 1,
      },
    },
    bakery: {
      coordinates: { x: 360, y: 230 },
      adjacent: {
        aisle5_start: 0.5,
        aisle5_end: 0.5,
        aisle6_start: 0.5,
      }, 
    }, 
  beverages: {
    coordinates: {  x: 500, y: 300 },
    adjacent: {
      health_and_beauty: 0.5,
      register: 0.5,
  },
},
register: {
  coordinates: {x: 430, y: 160 },
  adjacent: {
    //aisle7_start: 0.5,
    beverages: 0.5,
    exit: 0.5,
  },
},
household_supplies: {
  coordinates: { x: 500, y: 200 }, 
  adjacent: {
    aisle7_start: 0.7,
  },
},
pet_supplies: {
  coordinates: { x: 560, y: 245 },
  adjacent: {
    aisle7_end: 0.2, 
  },
},
    health_and_beauty: {
      coordinates: { x: 320, y: 400 },
      adjacent: {
        cans: 0.5,
        beverages: 0.5,
      },
    },
    exit: {
      coordinates: { x: 320, y: 80 },
      adjacent: {
        register: 0.5, // Direct connection from the register to the exit
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
  { name: 'health & beauty', x: 320, y: 400 },
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
  { name: 'register', x: 430, y: 160 },
  { name: 'household supplies', x: 500, y: 200 },
  { name: 'cans', x: 350, y: 280 },
  { name: 'beverages', x: 500, y: 300 },
  { name: 'pet supplies', x: 560, y: 245 },
  { name: 'A1', x: 60, y: 260 },
  { name: 'A2', x: 80, y: 240 },
  { name: 'A2E', x: 310, y: 380},
  { name: 'A3', x: 140, y: 210},
  { name: 'A3E', x: 390, y: 390 },
  { name: 'A4', x: 180, y: 190},
  { name: 'A4E', x: 430, y: 360},
  { name: 'A5', x: 225, y: 170},
  { name: 'A5E', x: 460, y: 320},
  { name: 'A6', x: 280, y: 130},
  { name: 'A6E', x: 520, y: 280},
  { name: 'A7', x: 300, y: 100},
  { name: 'A7E', x: 560, y: 280},
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
