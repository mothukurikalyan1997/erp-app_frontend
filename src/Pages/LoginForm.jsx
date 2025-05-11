import React, { useState } from "react";
import { API_URL } from "../data/Data/";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [loading, setLoading] = useState(false); // Start as false
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("company_id", response.data.company_id);

      navigate("/Landing");
    } catch (error) {
      setErrorMessage("Invalid login");
      setTimeout(() => setErrorMessage(""), 3000); // Auto-hide after 3s

    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="landing-page">
      {/* 🔔 Tiny alert bar at the top */}
      {errorMessage && (
        <div className="top-alert">
          {errorMessage}
        </div>
      )}

      <header className="header">
        <div className="logo">
          <h1>AWRS+</h1>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            {/* <Link to={'/signup'}><li>Signup</li></Link> */}
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="main-content-in">
          <div className="main-content-in1">
            {loading && <div className="loader">Logging in...</div>} {/* Loader displayed here */}

            <form onSubmit={handleLogin}>
              <div className="main-content-in1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="main-content-in1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-btns">
                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 AWRS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginForm;