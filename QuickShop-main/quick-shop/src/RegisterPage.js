import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation example
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Registration failed');
      console.log('Registration successful');
      
      // Redirect to login page or clear form here
      
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Function to handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="register-btn">Register</button>
      </form>
      <div className="login-redirect">
        <p>Already signed up? <Link to="/login">Log in here</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
