import React from 'react';
import map from './assets/images/map.png';

const MapComponent = ({ selectedItems }) => {
  return (
    <div className="map-container">
  <img src={map} alt="Store Layout" className="store-map" />
</div>
  );
};

export default MapComponent;

<img src="/assests/images/map.png" alt="Store Layout" className="store-map" />