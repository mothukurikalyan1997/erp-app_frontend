import React, { useEffect, useState } from "react";
import {API_URL} from '../data/Data/'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Sidenav from "../Components/Sidenav";
import Navbar from "../Components/Navbar";

const SignupForm = () => {

  const tokens = localStorage.getItem('token')
  const company_ids = localStorage.getItem('company_id')
  const roles = localStorage.getItem('role')
  const emails = localStorage.getItem('email')
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [company_id, setCompanyid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const Navigate = useNavigate();

  const [table,setTable] = useState([])
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
        window.location.reload()
      } 
    } catch (error) {
      setErrorMessage("Server error, please try again.");
    }
  };

      useEffect(() => {
    axios.get(`${API_URL}/userdata`,{
      
      headers:{
        'Authorization': `Bearer ${tokens}`,
        'company_id': company_ids,
        'role': roles,
        'email': emails
      }
    }).then(res => {
      setTable(res.data);
    });
  }, []);

  const navigate = useNavigate()
  return (
    <>   
    <Navbar/>
    <div className="full-container">
      <div className="side-ccontainer">
        <Sidenav/>
      </div>
      <div className="actual-container">
        <div className="white-box">

      <button className="nani" onClick={()=>navigate('/Landing')}>Cancel</button>
<div className="signup-form">
      <h2>New User Creation</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

          <select name="role" id=""  value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="super_user">Super_user</option>
          </select>
        <input
          type="number"
          placeholder="Company ID"
          value={company_id}
          onChange={(e) => setCompanyid(e.target.value)}
          required
        />

        <button type="submit">Signup</button>

      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </div>
      <div style={{height: '500px', overflowY: 'auto', border: '1px solid #ccc'}}>
        <table className="dynamic-table">
          <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Company ID</th>
            </tr>
          </thead>
          <tbody>
            {table.map((e)=>(
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>{e.company_id}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

        </div>
      </div>
    </>

  );
};

export default SignupForm;
