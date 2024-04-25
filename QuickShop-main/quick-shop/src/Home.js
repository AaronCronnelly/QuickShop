import React from 'react';
import backgroundImage from './assets/images/hero.jpg';
import aboutImage from './assets/images/about-image.jpg'; 
import Services from './Services';
import SubscriptionForm from './SubscriptionForm';
import Success from './Success';
import ThreeStepGuide from './ThreeStepGuide';
import RegisterPage from './RegisterPage';

// Home component
const Home = () => {
  return (
    <>
      {/* Hero section */}
      <div className="hero-container">
        <div className="hero-text">
          <h1>Shop Faster, Save Time</h1>
        </div>
        <div className="hero-description">
          <p>Easily find and buy groceries with QuickShop, saving you time for what matters most.</p>
        </div>
        <div className="hero-overlay" />
        <img src={backgroundImage} alt="Background" className="hero-image" />
      </div>

      {/* About section */}
      <div className="about-section">
        <div className="about-text" id="about-section">
          <h2 className="about-header">About Us</h2>
          <p className="about-p">
            This project is a collaborative effort between Sophie and Aaron, undertaken as part of our module in Professional Practice in IT. 
            We've developed an interactive store navigation system designed to optimize shopping experiences in retail environments. 
            For now, our app just locates to one store as we wish to implement this further in the future. 
            Our application utilizes the Dijkstra algorithm to calculate the most efficient route through the store based on a shopper’s list of desired items. 
            By integrating real-time pathfinding capabilities, our system guides users from one product to another, ultimately leading them to the checkout register and exit in the most efficient manner possible. 
            This project not only showcases our technical skills in software development but also highlights our commitment to improving everyday convenience through technology.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </div>

      {/* Components */}
      <ThreeStepGuide/>
      <Services />
      <SubscriptionForm />
      <Success />
    </>
  );
};

export default Home;
