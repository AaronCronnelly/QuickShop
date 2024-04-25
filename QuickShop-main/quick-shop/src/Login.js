import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth hook

function LoginPage() {
  // State for login data
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Access the navigate function from the router
  const navigate = useNavigate();
  
  // Access the login function from the AuthContext
  const { login } = useAuth(); 

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Send login request to server
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      if (!response.ok) throw new Error('Login failed');
      console.log('Login successful');

      //extract user data from server response
      const userData = await response.json();
      console.log('Login successful');


      // Update the auth state to indicate the user is logged in
      login(userData); 
      
      // Navigate to the profile page
      navigate('/profile'); 
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
