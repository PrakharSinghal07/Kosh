import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/layout/Sidebar";
import { UserContext } from "../../context/UserContext";
import borrowImg from "./borrow.png";
const Dashboard = () => {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const { isAdmin, user } = useContext(AuthContext);
  const { allBooks, allUsers, borrows, userContextUpdated } = useContext(UserContext);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [filterCondtion, setFilterCondition] = useState("None");
  const [borrowedData, setBorrowedData] = useState(borrows);
  const [dueBooks, setDueBooks] = useState([]);
  const [overDueBooks, setOverDueBooks] = useState([]);
  useEffect(() => {
    setBorrowedData(borrows);
    const dueBooks = borrows.filter((book) => !book.returnDate);
    setDueBooks(dueBooks);
    const overDue = borrows.filter((book) => !book.returnDate && new Date(book.dueDate) < new Date());
    setOverDueBooks(overDue);
  }, [borrows]);
  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (!search) {
      setBorrowedData(borrows);
      return;
    }
    const filtered = [...borrows].filter((item) => item.book.title.toLowerCase().includes(search));
    setBorrowedData(filtered);
  };

  const handleMenuChange = (e) => {
    setFilterCondition(e.target.value);
    if (e.target.value === "Newest") {
      setBorrowedData([...borrows].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)));
    } else if (e.target.value === "Oldest") {
      setBorrowedData([...borrows].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
    } else {
      const sorted = [...borrows].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setBorrowedData(sorted);
    }
  };
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const formattedDate = `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

      setDate(formattedTime); 
      setTime(formattedDate); 
    };

    updateDateTime(); 

    const intervalId = setInterval(updateDateTime, 30000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <h2>Hi {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h2>
            <div className="date-time-container">
              <p className="date">{date}</p>
              <p className="date">{time}</p>
            </div>
          </header>

          <section className="stats-cards">
            {isAdmin(user) && (
              <div className="stat-card">
                <div>
                  <p>Total Members</p>
                  <p>{allUsers.length}</p>
                  <p className="green">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    16% this month
                  </p>
                </div>
                <div className="stat-card-icon green">
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            )}
            {isAdmin(user) && <div className="stat-card">
              <div>
                <p>Checked out books</p>
                <p>{borrowedData.length}</p>
                <div className="active-avatars">
                  <img src="https://placehold.co/32x32/A62A2A/ffffff?text=B1" alt="B1" />
                  <img src="https://placehold.co/32x32/B32D2D/ffffff?text=B2" alt="B2" />
                  <img src="https://placehold.co/32x32/C03030/ffffff?text=B3" alt="B3" />
                  <img src="https://placehold.co/32x32/CC3333/ffffff?text=B4" alt="B4" />
                </div>
              </div>
              <div className="stat-card-icon blue">
                <img className="borrow-img" src={borrowImg} alt="" />
              </div>
            </div>}

            {isAdmin(user) && <div className="stat-card">
              <div>
                <p>Total Books</p>
                <p>{allBooks.length}</p>
                <p className="red">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                  1% this month
                </p>
              </div>
              <div className="stat-card-icon red">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>}
            {!isAdmin(user) && <div className="stat-card">
              <div>
                <p>Books Borrowed</p>
                <p>{borrowedData.length}</p>
                <div className="active-avatars">
                  <img src="https://placehold.co/24x24/157caf/ffffff?text=R1" alt="Avatar" />
                  <img src="https://placehold.co/24x24/157caf/ffffff?text=R2" alt="Avatar" />
                  <img src="https://placehold.co/24x24/157caf/ffffff?text=R3" alt="Avatar" />
                  <img src="https://placehold.co/24x24/157caf/ffffff?text=R4" alt="Avatar" />
                </div>
              </div>
              <div className="stat-card-icon blue">
                <img className="borrow-img" src={borrowImg} alt="" />
                
              </div>
            </div>}
            {!isAdmin(user) && <div className="stat-card">
              <div>
                <p>Books Due</p>
                <p>{dueBooks.length}</p>
                <div className="active-avatars">
                  <img src="https://placehold.co/32x32/059669/ffffff?text=D1" alt="B1" />
                  <img src="https://placehold.co/32x32/10b981/ffffff?text=D2" alt="B2" />
                  <img src="https://placehold.co/32x32/34d399/ffffff?text=D3" alt="B3" />
                  <img src="https://placehold.co/32x32/6ee7b7/ffffff?text=D4" alt="B4" />
                </div>
              </div>
              <div className="stat-card-icon blue">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                
              </div>
            </div>}
            {!isAdmin(user) && <div className="stat-card">
              <div>
                <p>Books Overdue</p>
                <p>{overDueBooks.length}</p>
                <div className="active-avatars">
                  <img src="https://placehold.co/32x32/A62A2A/ffffff?text=B1" alt="B1" />
                  <img src="https://placehold.co/32x32/B32D2D/ffffff?text=B2" alt="B2" />
                  <img src="https://placehold.co/32x32/C03030/ffffff?text=B3" alt="B3" />
                  <img src="https://placehold.co/32x32/CC3333/ffffff?text=B4" alt="B4" />
                </div>
              </div>
              <div className="stat-card-icon red">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                
              </div>
            </div>}
          </section>

          <section className="loans-section">
            <div className="loans-header">
              <h3>Issued Books</h3>
              <div className="loans-controls">
                <div className="search-input-container">
                  <input type="text" placeholder="Search issued books..." className="search-input" onChange={handleSearch} />
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <div className="custom-select-wrapper">
                  <select className="custom-select" defaultValue={"Oldest"} onChange={handleMenuChange}>
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="loans-table">
                <thead>
                  <tr>
                    {isAdmin(user) && <th>Member Name</th>}
                    <th>Book Title</th>
                    <th>Price</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedData.map((borrow, index) => (
                    <tr key={index}>
                      {isAdmin(user) && <td>{borrow?.user?.name}</td>}
                      <td>{borrow?.book?.title?.slice(0, 25)}</td>
                      <td>₹{borrow?.book?.price}</td>
                      <td>{new Date(borrow?.dueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${borrow?.returnDate ? "active" : "overdue"}`}>{borrow?.returnDate ? "Returned" : "Due"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <div className="pagination">
              <span>Showing data 1 to 8 of 500 loans</span>
              <div className="pagination-controls">
                <button className="pagination-button">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                {[1, 2, 3, 4, "...", 25].map((page, index) => (
                  <button key={index} className={`pagination-page-button ${page === 1 ? "active" : ""}`}>
                    {page}
                  </button>
                ))}
                <button className="pagination-button">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div> */}
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
