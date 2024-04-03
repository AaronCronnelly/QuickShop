import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Services from './Services';
import './App.css';
import Login from './Login';
import ShoppingList from './ShoppingList';
import RegisterPage from './RegisterPage';
import Footer from './Footer';
import ProfilePage from './ProfilePage';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Admin from './Admin';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Navbar /> {/* This includes the Navbar on every page */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/About" element={<About/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/RegisterPage" element={<RegisterPage/>} />
          <Route path="/profile" element={
          <ProtectedRoute>
          <ProfilePage />
          </ProtectedRoute>
          } />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}



export default App;

