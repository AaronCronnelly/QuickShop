import React, { useState } from 'react';
import './App.css';

function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // To display feedback

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate a successful subscription
    console.log('Subscribing with email:', email);
    setMessage('Successful subscription!'); // Display success message
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <div className="form-header">
        Subscribe to our newsletter to get all the latest updates
      </div>
      <div className="form-controls">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="email-input"
        />
        <button type="submit" className="subscribe-button">Subscribe</button>
      </div>
      {message && <div className="subscription-message">{message}</div>} {/* Feedback message */}
    </form>
  );
}

export default SubscriptionForm;



