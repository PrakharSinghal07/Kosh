import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [userContextUpdated, setUserContextUpdated] = useState(false);
  const { user, isAdmin, isAuthenticated } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/book/getAllBooks`, {
          withCredentials: true,
        });
        // console.log("📚 Books:", res.data.books);
        setAllBooks(res.data.books);
      } catch (error) {
        console.error("❌ Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [isAuthenticated, userContextUpdated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!isAdmin(user)) {
      return;
    }
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/user/all`, {
          withCredentials: true,
        });
        // console.log("👥 Users:", res.data.users);
        setAllUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [isAuthenticated, userContextUpdated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchUserBorrows = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/borrow/getBorrowedBooks`, {
          withCredentials: true,
        });
        // console.log("🔄 Borrows:", res);
        setBorrows(res.data.borrowedBooks);
      } catch (error) {
        console.error("Error fetching borrows:", error);
      }
    };

    const fetchBorrows = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/borrow/getAllBorrows`, {
          withCredentials: true,
        });
        // console.log("🔄 Borrows:", res.data.borrows);
        setBorrows(res.data.borrows);
      } catch (error) {
        console.error("❌ Error fetching borrows:", error);
      }
    };

    if (!isAdmin(user)) {
      fetchUserBorrows();
    } else {
      fetchBorrows();
    }
  }, [isAuthenticated, userContextUpdated]);

  return <UserContext.Provider value={{ activeLink, setActiveLink, allBooks, allUsers, borrows, setUserContextUpdated }}>{children}</UserContext.Provider>;
};

export default UserProvider;
