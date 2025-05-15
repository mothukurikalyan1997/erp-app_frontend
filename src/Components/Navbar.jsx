import React, { useEffect, useState } from 'react'
import {API_URL} from '../data/Data'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom"; // useNavigate for navigation in React Router v6
import { useLocation } from "react-router-dom"; // To track the current location
import LogoutIcon from '@mui/icons-material/Logout';

import logo from '/Images/ERP_AWRS.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import axios from 'axios';



const Navbar = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  const [user, setUser] = useState({
    company_name:"Company"
  })

  
useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get(`${API_URL}/ProfileData`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'company_id': company_id,
      'role': role,
      'email': email,
    }
  })
    .then(res => {
      if (res.data && res.data.length > 0) {
        setUser({
          company_name: res.data[0].company_name || "Company"
        });
      }
    })
    .catch(err => console.log(err));
}, []);


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
        {/* <img src={logo} alt="Logo" style={{ height: "50px", borderRadius:'50%', objectFit: 'cover',marginLeft:'5px'}} /> */}
        <p style={{marginLeft:'10px',fontWeight:'bold',color:'white',cursor:'pointer'}} onClick={()=>navigate('/Landing')}>{user.company_name}</p>
        </div>
        <div className="navbar-actions">
          {/* <button style={{backgroundColor:'#2A81EA',display:'flex',alignItems:'center'}} onClick={handleLogout}><LogoutIcon style={{marginRight:'5px'}}/>Logout</button> */}
          <p style={{color:'white'}}>Company ID: {company_id}</p>
          <Link to={'/Profile'} ><AccountCircleIcon style={{color:'white',fontSize:'30'}}/></Link>
          {/* <Link to={'/'}><SupportAgentIcon style={{color:'white',fontSize:'30'}}/></Link> */}
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
