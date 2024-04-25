import React, { useState } from 'react';
import './App.css';

function SubscriptionForm() {
  // State variables for email input and feedback message
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate a successful subscription (you can replace this with actual subscription logic)
    console.log('Subscribing with email:', email);
    setMessage('Successful subscription!'); // Set success message
    setEmail(''); // Clear email input
  };

  // JSX rendering
  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <div className="form-header">
        Subscribe to our newsletter to get all the latest updates
      </div>
      <div className="form-controls">
        {/* Email input field */}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="email-input"
        />
        {/* Submit button */}
        <button type="submit" className="subscribe-button">Subscribe</button>
      </div>
      {/* Feedback message displayed conditionally */}
      {message && <div className="subscription-message">{message}</div>}
    </form>
  );
}

export default SubscriptionForm;
