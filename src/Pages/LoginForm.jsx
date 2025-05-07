import React, { useEffect, useState } from "react";
import {API_URL} from '../data/Data/'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for navigation in React Router v6

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);      // doors open on mount
  const [isClosing, setIsClosing] = useState(false); // doors closing after login
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      
      // Store JWT token in localStorage if login is successful
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("company_id", response.data.company_id);

      setIsClosing(true); // start closing doors
      setIsOpen(false);   // remove "open" class
      
      setTimeout(() => {
        navigate('/Landing'); // redirect after doors close
      }, 1000); // match transition duration

      // Navigate to the dashboard after successful login
      // navigate("/Landing");
    } catch (error) {
      setErrorMessage("Invalid credentials or server error");
    }
  };

  useEffect(() => {
    // Trigger the door animation after component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className="landing-page">
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
        <button type="submit" className="login-btn">Login</button>

        </div>
        </form>

{/* new form style */}
{/* <div className={`curtains-container ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />
      <div className="auth-form-wrapper">
        <h2>Login Form</h2>
        <form>
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required />
          <button type="submit" className="auth-button" onClick={handleLogin} >Enter</button>
        </form>
      </div>
    </div> */}
{/* end */}

        {/* {errorMessage && <div className="error-message" style={{color:"red", marginTop:"5px"}}>{errorMessage}</div>} */}
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
