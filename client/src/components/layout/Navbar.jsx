import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">BookWorm</div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
