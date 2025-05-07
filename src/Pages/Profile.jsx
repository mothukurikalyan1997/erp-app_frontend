import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import Sidenav from '../Components/Sidenav';


const Profile = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
    const [user, setUser] = useState({
        fullName: "",
        displayName: "",
        gender: "",
        country: "",
        mailAddress: "",
        mobileNumber: "",
        bankName: "",
        accountNumber: "",
        trnNumber: "",
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
                <label className="profile-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={user.displayName}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={user.country}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Mail Address</label>
                <input
                  type="text"
                  name="mailAddress"
                  value={user.mailAddress}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={user.mobileNumber}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              
              <div className="input-group">
                <label className="profile-label">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={user.bankName}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={user.accountNumber}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="input-group">
                <label className="profile-label">TRN Number</label>
                <input
                  type="text"
                  name="trnNumber"
                  value={user.trnNumber}
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
