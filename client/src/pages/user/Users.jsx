import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { UserContext } from "../../context/UserContext";
import "./Books.css";

const Users = () => {
  const {allUsers} = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("Oldest");

  useEffect(() => {
    setUsers(allUsers);
    setfilteredUsers(allUsers);
  }, [allUsers]);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (!search) return setfilteredUsers(users);

    const filtered = users.filter((user) => user.name.toLowerCase().includes(search));
    setfilteredUsers(filtered);
  };

  
  return (
    <div className="books-container">
      <Sidebar />
      <main className="books-main-content">
        <header className="books-header">
          <h2>Users List</h2>
          <div className="books-controls">
            <div className="books-search">
              <input type="text" placeholder="Search users..." onChange={handleSearch} />
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </header>

        <section className="books-section">
          <div className="table-container">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Books Borrowed</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {user.name.slice(0, 25)}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.borrowedBooks.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Users;
