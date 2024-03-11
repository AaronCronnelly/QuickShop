import React, { useState } from 'react';
import './App.css';
import test1 from './assets/images/test1.jpg';
import test2 from './assets/images/test2.jpg';
import test3 from './assets/images/test3.jpg';

function Success() {
    return (
      <div className="user-success-stories">
        <h2>Hear from Our Happy Shoppers</h2>
        <div className="stories-grid">
          {/* Story 1 */}
          <div className="story">
          <img src={test1} alt="User Testimonial 1" className="story-img" />
            <blockquote>
              "QuickShop saved me so much time! I found everything I needed in minutes."
            </blockquote>
            <p className="user-name">- Emma B.</p>
            <div className="rating">★★★★★</div>
          </div>
          {/* Story 2 */}
        <div className="story">
        <img src={test2} alt="User Testimonial 1" className="story-img" />
          <blockquote>
            "The route planning feature is a game-changer. It made my shopping experience so smooth!"
          </blockquote>
          <p className="user-name">- Jacob S.</p>
          <div className="rating">★★★★★</div>
        </div>
        
        {/* Story 3 */}
        <div className="story">
        <img src={test3} alt="User Testimonial 1" className="story-img" />
          <blockquote>
            "I'm impressed with how intuitive the shopping list is. It helps me stay organized!"
          </blockquote>
          <p className="user-name">- Ava K.</p>
          <div className="rating">★★★★★</div>
        </div>
        </div>
        <button className="cta-button">Start Saving Time</button>
      </div>
    );
  }

export default Success;