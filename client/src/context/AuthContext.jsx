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
  const [userRole, setUserRole] = useState("user");
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
        });
        setUserRole(res.data.user.role);
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
        userRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
