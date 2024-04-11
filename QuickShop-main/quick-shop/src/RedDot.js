import React from 'react';

const RedDot = ({ x, y }) => {
  const style = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)' // Centers the dot on the coordinates
  };

  return <div style={style}></div>;
};

export default RedDot;
