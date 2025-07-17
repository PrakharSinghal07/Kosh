import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { UserContext } from "../../context/UserContext";
import "./Catalog.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Catalog = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { isAdmin, user } = useContext(AuthContext);
  const { borrows, setUserContextUpdated } = useContext(UserContext);
  const [filteredBorrows, setFilteredBorrows] = useState([]);
  const [sortOrder, setSortOrder] = useState("Oldest");
  const [returnBorrow, setReturnBorrow] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isReturned, setisReturned] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setFilteredBorrows(borrows);
  }, [borrows]);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (!search) return setFilteredBorrows(borrows);

    const filtered = borrows.filter((borrow) => borrow.book?.title?.toLowerCase().includes(search) || borrow.user?.email?.toLowerCase().includes(search));
    setFilteredBorrows(filtered);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    const sorted = [...filteredBorrows].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return value === "Latest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredBorrows(sorted);
  };

  const handleReturn = async (id, email) => {
    setMessage("Please wait...")
    try {
      await axios.put(`${apiUrl}/api/v1/borrow/returnBook/${id}`, { email: email }, { withCredentials: true });
      setMessage("");
      setUserContextUpdated((prev) => !prev);
      setisReturned(true);
      const timer = setTimeout(() => {
        setisReturned(false);
        setReturnBorrow(null);
      }, 10000);
      setReturnModal(false);
      
      console.log(returnBorrow);
      setError("");
    } catch (err) {
      setError(err.response.data.message);
      console.error(err);
    }
  };

  const handleFilterDueBorrows = (e) => {
    const filtered = [...borrows].filter((borrow) => {
      return !borrow.returnDate;
    });
    setActiveFilter("due");
    setFilteredBorrows(filtered);
  };

  const handleFilterAllBorrows = () => {
    setActiveFilter("all");
    setFilteredBorrows(borrows);
  };

  return (
    <div className="catalog-container">
      <Sidebar />
      <main className="catalog-main">
        <header className="catalog-header">
          <h2>Borrowed Books</h2>
          <div className="catalog-controls">
            <div className="catalog-controls-search">
              <input type="text" placeholder="Search by book/user..." onChange={handleSearch} />
            </div>
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </header>
        <div className="toggle">
          <button className={`all-borrows ${activeFilter === "all" && "active"}`} onClick={handleFilterAllBorrows}>
            All
          </button>
          <button className={`due-borrows ${activeFilter === "due" && "active"}`} onClick={handleFilterDueBorrows}>
            Due
          </button>
        </div>
        <section className="catalog-section">
          <table className="catalog-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>{isAdmin(user) ? "User Email" : "Price"}</th>
                <th>{isAdmin(user) ? "Borrowed On" : "Due Date"}</th>
                <th>
                  <p>Status</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBorrows.map((borrow, idx) => (
                <tr key={borrow?._id ? borrow?._id : idx}>
                  <td>{borrow?.book?.title}</td>
                  <td>{isAdmin(user) ? borrow?.user?.email : `₹` + borrow.book.price}</td>
                  <td>{isAdmin(user) ? new Date(borrow.createdAt).toLocaleDateString() : new Date(borrow.dueDate).toLocaleDateString()}</td>
                  <td>
                    {isAdmin(user) && (
                      <span className={`status-chip ${borrow.returnDate && "returned"}`}>
                        {borrow.returnDate ? (
                          "Returned"
                        ) : (
                          <button
                            className="return-button"
                            onClick={() => {
                              setReturnModal(true);
                              setReturnBorrow(borrow);
                            }}
                          >
                            Return
                          </button>
                        )}
                      </span>
                    )}
                    {!isAdmin(user) && <span className={`status-chip ${borrow.returnDate ? "returned" : "borrowed"}`}>{borrow.returnDate ? "Returned" : "Borrowed"}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {returnModal && (
          <div className="return-modal-overlay">
            <div className="return-modal">
              <h3>Return Book</h3>
              <div className="return-details">
                <div className="return-modal-email">
                  <label htmlFor="email">
                    <strong>Title:</strong>
                  </label>
                  <input type="text" value={returnBorrow?.book?.title} id="email" disabled />
                </div>
                <div className="return-modal-email">
                  <label htmlFor="email">
                    <strong>Email:</strong>
                  </label>
                  <input type="text" value={returnBorrow?.user?.email} id="email" disabled />
                </div>
                <div className="message">{message}</div>
              </div>
              <div className="return-modal-buttons">
                <button onClick={() => handleReturn(returnBorrow.book._id, returnBorrow.user.email)}>Return</button>
                <button
                  className="cancel"
                  onClick={() => {
                    setReturnModal(false);
                    setReturnBorrow(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {isReturned && (
          <div className="receipt-modal-overlay">
            <div className="receipt-paper">
              <div className="bar"></div>
              <div className="receipt-header">
                <h2>Book Return Receipt</h2>
                <p>Library Management System</p>
                <div className="receipt-line dashed" />
              </div>

              <div className="receipt-body">
                <div className="receipt-row">
                  <span>Book Title:</span>
                  <span>{returnBorrow?.book?.title?.length > 25 ? returnBorrow.book.title.slice(0, 25) + "..." : returnBorrow?.book?.title}</span>
                </div>
                <div className="receipt-row">
                  <span>User Name:</span>
                  <span>{returnBorrow?.user?.name}</span>
                </div>
                <div className="receipt-row">
                  <span>Price:</span>
                  <span>₹{returnBorrow?.book?.price}</span>
                </div>
                <div className="receipt-row">
                  <span>Fine:</span>
                  <span>₹{returnBorrow?.fine}</span>
                </div>

                <div className="receipt-line dashed" />
                <div className="receipt-row total">
                  <span>Total Paid:</span>
                  <span>₹{returnBorrow?.price}</span>
                </div>
                <div className="receipt-line dashed" />
              </div>

              <div className="receipt-footer">
                <button
                  className="receipt-close-btn"
                  onClick={() => {
                    setReturnBorrow(null);
                    setisReturned(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalog;
