import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      if (!response.ok) throw new Error('Login failed');
      console.log('Login successful');

      // Use navigate to redirect to the profile page
      navigate('/profile'); // Updated from history.push('/profile');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="register-btn">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;


