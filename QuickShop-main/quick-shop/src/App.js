import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import login from './Login';
import About from './About';
import Services from './Services';
import './App.css';
import Login from './Login';
import ShoppingList from './ShoppingList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* This includes the Navbar on every page */}
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/About" element={<About/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;

