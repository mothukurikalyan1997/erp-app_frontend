import React, { useEffect, useState } from 'react'
import {API_URL} from '../data/Data'
import Navbar from '../Components/Navbar';
import Sidenav from '../Components/Sidenav';
import axios from 'axios';


const Profile = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
    const [user, setUser] = useState({
        company_id: "",
        company_name: "",
        display_Name: "",
        country: "",
        maidid: "",
        mobile_number: ""
      });
    
      useEffect(()=>{
      const token = localStorage.getItem('token');
      axios.get(`${API_URL}/ProfileData`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      })
        .then(res => setUser(res.data[0]))
        .catch(err=> console.log(err));
      },[])
      
    
      return (
        <>
        <Navbar/>
          <div className="full-container">
            <div className="side-container">
              <Sidenav/>
            </div>
            <div className="actual-container">
              <div className="white-box">
              <div className="profile-container">
          <h2 className="profile-title">Edit Profile</h2>
          <div className="profile-image-section">
            <img src={user.profilePic} alt="." className="profile-image" />
            <button className="change-picture">Change Picture</button>
          </div>
          <div className="profile-fields">
            <div className="form-grid">
              <div className="input-group">
                <label className="profile-label">Company ID</label>
                <input
                  type="text"
                  name="companyid"
                  value={user.company_id}
                  
                  className="profile-input"
                  readOnly
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Company Name</label>
                <input
                  type="text"
                  name="companyname"
                  value={user.company_name}
                  readOnly
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Display Name</label>
                <input
                  type="text"
                  name="displayname"
                  value={user.display_Name}
                  readOnly
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={user.country}
                  readOnly
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Mail ID</label>
                <input
                  type="text"
                  name="maidid"
                  value={email}
                  
                  className="profile-input"
                  readOnly
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Mobile Number</label>
                <input
                  type="text"
                  name="mobile_number"
                  value={user.mobile_number}
                  
                  className="profile-input"
                  readOnly
                />
              </div>
              
            </div>
            {/* <button className="save-button">Save Changes</button> */}
          </div>
        </div>

              </div>
            </div>
          </div>
        </>
      )
    }

export default Profile
