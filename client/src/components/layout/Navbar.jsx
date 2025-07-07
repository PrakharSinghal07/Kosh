import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">BookWorm</div>
      <ul className="navbar-menu">
        <li className="navbar-item"><NavLink to="/login">Login </NavLink></li>
       <li className="navbar-item"><NavLink to="/register">Register </NavLink></li>
        <li className="navbar-item"><NavLink to="/dashboard">Dashboard </NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
