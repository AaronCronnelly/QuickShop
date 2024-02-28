import React from 'react';
import backgroundImage from './assets/images/hero.jpg';
import aboutImage from './assets/images/about-image.jpg'; // Replace with your actual image path

const Home = () => {
  return (
    <>
      <div className="hero-container">
        <div className="hero-text">
          <h1>Shop Faster, Save Time</h1>
        </div>
        <div className="hero-description">
          <p>Easily find and buy groceries with QuickShop, saving you time for what matters most.</p>
        </div>
        <div className="hero-overlay" />
        <img
          src={backgroundImage}
          alt="Background"
          className="hero-image"
        />
      </div>
      <div className="about-section">
        <div className="about-text">
          <h2>About Us</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </div>
    </>
  );
};

export default Home;




