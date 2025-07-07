import { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  // const [loginData, setLoginData] = useState({
  //   email: "",
  //   password: "",
  // });
  const { loginData, setLoginData, setRefreshAuthContext } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginData);

    axios
      .post("http://localhost:8000/api/v1/auth/login", loginData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setRefreshAuthContext((prev) => !prev);
        setError(null)
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message)
      });

  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="branding-logo">📚 BookWorm</h1>
        <p className="branding-tagline">Your smart library companion</p>
        <NavLink className="navigate-to-register" to="/register">
          Register
        </NavLink>
      </div>

      <div className="auth-right">
        <div className="login-static-container">
          <div className="login-heading">Login</div>
          <p className="login-message">Please provide your info to Login</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" required name="email" id="email" className="form-input" placeholder="Email" value={loginData.email} onChange={handleInputChange} />
          <div className="password-wrapper">
            <input
              type={!showPassword ? "password" : "text"}
              required
              name="password"
              id="password"
              className="form-input"
              placeholder="Password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            <button className="toggle-password" onClick={handleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
