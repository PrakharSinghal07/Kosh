import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshAuthContext, setRefreshAuthContext] = useState(false);
  const [loading, setLoading] = useState(true); // Optional: useful for guarding routes
  useEffect(() => {
    setLoading(true); 
    axios
      .get("http://localhost:8000/api/v1/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUser({
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          createdAt: res.data.user.createdAt,
        });
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error("Auth error:", err.response?.data?.message);
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false); // end loading
      });
  }, [refreshAuthContext]);
  const isAdmin = (user) => {
    return user?.role === "Admin";
  }
  return (
    <AuthContext.Provider
      value={{
        loginData,
        setLoginData,
        registerData,
        setRegisterData,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        setRefreshAuthContext,
        loading,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
