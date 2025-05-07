import React, { useState } from "react";
import {API_URL} from '../data/Data/'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [company_id, setCompanyid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/go/signup`, {
        email,
        password,
        role,
        company_id
      });

      if (response.data.success) {
        setSuccessMessage("Registration successful! Please login.");
        setErrorMessage("");
        Navigate("/login");
      } 
    } catch (error) {
      setErrorMessage("Server error, please try again.");
    }
  };

  return (
    <>    <header className="header">
    <div className="logo">
      <h1>AWRS+</h1>
    </div>
    <nav className="nav">
      <ul className="nav-links">
        <Link to={'/login'}><li>Login</li></Link>
      </ul>
    </nav>
  </header>

    <div className="signup">
      
<div className="signup-form">
      <h2>Signup for ERP</h2>
      <form onSubmit={handleSignup}>
        <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        </div>
        <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        </div>
        <div>
          <select name="role" id=""  value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="super_user">Super_user</option>
          </select>
        </div>
        <div>
        <input
          type="number"
          placeholder="Company ID"
          value={company_id}
          onChange={(e) => setCompanyid(e.target.value)}
          required
        />

        </div>
        <div style={{ display:"flex", justifyContent:"center"}}>
        <button type="submit">Signup</button>

        </div>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </div>

    </div>
    </>

  );
};

export default SignupForm;
