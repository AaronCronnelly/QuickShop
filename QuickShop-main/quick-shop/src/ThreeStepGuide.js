import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faMap } from '@fortawesome/free-solid-svg-icons';

function ThreeStepGuide() {
  return (
    <div className="three-step-guide">
      {/* Step 1: Register/Login */}
      <div className="step">
        <div className="icon-container">
          <FontAwesomeIcon icon={faUser} /> {/* User icon from Font Awesome */}
        </div>
        <h3>Step 1: Register/Login</h3>
        <p>Register or log in to see your previous lists and save new ones.</p>
      </div>

      {/* Step 2: Make Your List */}
      <div className="step">
        <div className="icon-container">
          <FontAwesomeIcon icon={faCartShopping} size="3x" /> {/* Shopping cart icon from Font Awesome */}
        </div>
        <h3>Step 2: Make Your List</h3>
        <p>Create your shopping list easily and conveniently.</p>
      </div>

      {/* Step 3: Choose Your Store */}
      <div className="step">
        <div className="icon-container">
          <FontAwesomeIcon icon={faMap} size="3x" /> {/* Map icon from Font Awesome */}
        </div>
        <h3>Step 3: Choose Your Store</h3>
        <p>Select your store and get a guided layout for faster shopping times.</p>
      </div>
    </div>
  );
}

export default ThreeStepGuide;
