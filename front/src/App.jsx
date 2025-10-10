import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Grounds from './components/Ground';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Register from './components/Register';
import Navbar from './components/Navbar';
import GroundDetails from './components/GroundDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/grounds" element={<Grounds />} />
          <Route path="/ground/:id" element={<GroundDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;