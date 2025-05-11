import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import Sidenav from '../Components/Sidenav';


const Profile = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
    const [user, setUser] = useState({
        companyid: "",
        companyname: "",
        displayname: "",
        country: "",
        maidid: "",
        mobile: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
      };
    
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
                  value={company_id}
                  onChange={handleChange}
                  className="profile-input"
                  readOnly
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Company Name</label>
                <input
                  type="text"
                  name="companyname"
                  value={user.companyname}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Display Name</label>
                <input
                  type="text"
                  name="displayname"
                  value={user.displayname}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Mail ID</label>
                <input
                  type="text"
                  name="maidid"
                  value={email}
                  onChange={handleChange}
                  className="profile-input"
                  readOnly
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              
            </div>
            <button className="save-button">Save Changes</button>
          </div>
        </div>

              </div>
            </div>
          </div>
        </>
      )
    }

export default Profile
