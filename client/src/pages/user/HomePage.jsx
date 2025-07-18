import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { SystemContext } from '../../context/SystemContext';
import './HomePage.css';

const HomePage = () => {
  const { isAdmin, user } = useContext(AuthContext);
  const { setSystem } = useContext(SystemContext);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <div className="homepage-container">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      
      <main className="homepage-main-content">
        <header className="homepage-header">
          <h1>
            {getGreeting()}, <span className="user-name-gradient">{user?.name || 'Guest'}!</span>
          </h1>
          <p>Your enterprise resource hub. Please select a system to continue.</p>
        </header>

        <div className="system-selection-container">
          <Link to="/dashboard" className="system-card library-card" onClick={() => setSystem('library')}>
            <FaBook className="card-bg-icon" />
            <h2>Library</h2>
            <p>Manage books, members, and borrowings.</p>
            <div className="card-arrow">
              <FaArrowRight />
            </div>
          </Link>

          <Link to={isAdmin(user) ? "/assets/home" : "/my-assets"} className="system-card asset-card" onClick={() => setSystem('asset')}>
            <FaLaptopCode className="card-bg-icon" />
            <h2>Assets</h2>
            <p>Track your assigned devices or the entire company inventory.</p>
            <div className="card-arrow">
              <FaArrowRight />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;