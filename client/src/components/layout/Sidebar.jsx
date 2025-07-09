import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useContext(AuthContext);
  const { activeLink, setActiveLink } = useContext(UserContext);
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19V3h16v16a2 2 0 01-2 2H6a2 2 0 01-2-2zM6 5v14h12V5H6zm8 14H6v-2h8v2zm0-4H6v-2h8v2zm0-4H6V9h8v2zm0-4H6V5h8v2z" />
          </svg>
          <h1>LIBRARY</h1>
        </div>
        <nav>
          <ul className="nav-list">
            <li>
              <NavLink to="/dashboard" onClick={() => setActiveLink("Dashboard")} className={`nav-link ${activeLink === "Dashboard" ? "active" : ""}`}>
                <span>
                </span>
                <span>{"Dashboard"}</span>
                <span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" onClick={() => setActiveLink("Books")} className={`nav-link ${activeLink === "Books" ? "active" : ""}`}>
                <span>
                </span>
                <span>{"Books"}</span>
                <span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog" onClick={() => setActiveLink("Catalog")} className={`nav-link ${activeLink === "Catalog" ? "active" : ""}`}>
                <span>
                </span>
                <span>{"Catalog"}</span>
                <span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" onClick={() => setActiveLink("Users")} className={`nav-link ${activeLink === "Users" ? "active" : ""}`}>
                <span></span>
                {isAdmin(user) && <span>Users</span>}
                {isAdmin(user) && (
                  <span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-new-admin" onClick={() => setActiveLink("addAdmin")} className={`nav-link ${activeLink === "addAdmin" ? "active" : ""}`}>
                <span></span>
                {isAdmin(user) && <span>{"Add New Admin"}</span>}
                {isAdmin(user) && (
                  <span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="user-profile"
        onClick={() => {
          navigate("/profile");
          setActiveLink("");
        }}
        style={{
          "cursor": "pointer"
        }}
      >
        <img src={`https://placehold.co/40x40/cccccc/ffffff?text=${user && user.name.charAt(0).toUpperCase()}`} alt="Evano" />
        <div>
          <p>{user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
          <p>{user && user.role}</p>
        </div>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path transform="rotate(-90 12 12)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </aside>
  );
};

export default Sidebar;
