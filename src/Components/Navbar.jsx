import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom"; // useNavigate for navigation in React Router v6
import { useLocation } from "react-router-dom"; // To track the current location
import LogoutIcon from '@mui/icons-material/Logout';

import logo from '/Images/ERP_AWRS.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';



const Navbar = () => {
  const company_id = localStorage.getItem('company_id')
    const navigate = useNavigate(); // Initialize useNavigate hook
    const token = localStorage.getItem("token"); // Get the token from localStorage

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("company_id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    // Redirect to the login page after logging out
    navigate("/login");
  };

  
  useEffect(() => {
    // 1. Logout on browser close
    const handleBeforeUnload = () => {
      if(!token){
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 2. Logout after 1 hour of inactivity
    let inactivityTimeout;
    
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        handleLogout(); // Log out after 30 min of inactivity
      }, 1800000); // 1800000ms = 30 Mins
    };

    // Listen for user activity events to reset the inactivity timer
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));

    // Start the inactivity timer when the component mounts
    resetInactivityTimer();

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
      clearTimeout(inactivityTimeout);
    };
  }, []);

  
  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <img src={logo} alt="Logo" style={{ height: "50px", borderRadius:'50%', objectFit: 'cover',marginLeft:'5px'}} />
        <p style={{marginLeft:'10px',fontWeight:'bold',color:'white'}}>AWS+</p>
        </div>
        <div className="navbar-actions">
          {/* <button style={{backgroundColor:'#2A81EA',display:'flex',alignItems:'center'}} onClick={handleLogout}><LogoutIcon style={{marginRight:'5px'}}/>Logout</button> */}
          <h1 style={{color:'white'}}>Company ID: {company_id}</h1>
          <Link to={'/Profile'} ><AccountCircleIcon style={{color:'white',fontSize:'30'}}/></Link>
          <Link to={'/'}><SupportAgentIcon style={{color:'white',fontSize:'30'}}/></Link>
          <Link onClick={handleLogout}><LogoutIcon style={{color:'white',fontSize:'30'}}/></Link>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
