import React from 'react';
import './App'; 
import { Link } from 'react-router-dom';

import service1 from './assets/images/service1.jpg';
import service2 from './assets/images/service2.jpg';
import service3 from './assets/images/service3.jpg';

const ServiceCard = ({ image, title, description, buttonText, link }) => (
  <div className="service-card">
    <img src={image} alt={title} className="service-image" />
    <h3>{title}</h3>
    <p className="service-description">{description}</p>
    <Link to={link} className="btn-book">
      {buttonText}
    </Link>
  </div>
);

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services">Services</h2>
      <div className="services-grid">
        <ServiceCard
          image={service1}
          title="Shopping List"
          description="Click here to begin making your shopping list"
          buttonText="Start List"
          link="/shopping-list"
        />
        <ServiceCard
          image={service2}
          title="Check Map"
          description="Check your detailed map here of your local supermarket"
          buttonText="View Map"
        />
        <ServiceCard
          image={service3}
          title="Log In"
          description="Login or register here to check your profile and previous lists"
          buttonText="Sign In"
        />
      </div>
    </div>
  );
};

export default Services;
