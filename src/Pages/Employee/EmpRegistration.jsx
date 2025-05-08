import React, { useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import { useNavigate ,Link } from 'react-router-dom'
import axios from 'axios';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const EmpRegistration = () => {
    const token = localStorage.getItem('token')
    const company_id = localStorage.getItem('company_id')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')

    const navigate = useNavigate();

    
            const [emp, setEmp] = useState({
                empfullname: "",
                EmpID:"",
                mobile:"",
                emptype:"",
                eid:"",
                eidexp:"",
                email:"",
                ppnumber:"",
                ppexp:"",
                nationality:"",
                externalid:"",
                workingcompany:"",
                worklocation:"",
                workcity:"",
                locationid:"",
                joindate:"",
                trafficcode:"",
                license:"",
                licenseexp:"",
                bankname:"",
                bankac:"",
                iban:"",
                personcode:"",
                grosssalary:"",
                salarydistributiontype:"",
                employementtype:""
          });
        
          const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setEmp({
              ...emp,
              [name]: type === "checkbox" ? checked : value,
            });
          };

          const handleSubmit = (e) => {

            e.preventDefault();
            axios.post(`${API_URL}/emp/employee`,{emp},{
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'company_id': company_id,
                  'role': role,
                  'email': email,
                }
              })
            .then(response => {console.log(response);
              navigate('/employee/employeetable')
            }
          ).catch(error => console.log(error));
    
          }
    

          
  return (
    <>
    <Navbar />
    <div  className='full-container'>
      <div className='side-container'>
        <Sidenav />
      </div>
      <div  className='actual-container'>
        <div className='white-box'>
        <h1 style={{height:'fit-content',padding:'5px',color:'rgb(82, 82, 5)'}}>Employee Registration</h1>
        <div >
            <Link to={'/employee/employeetable'} ><CloseOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: 'tomato', padding: '6px', borderRadius: '6px',marginRight:'5px' }}/></Link>
        </div>

        <form action="" method="post" onSubmit={handleSubmit} >
        <p style={{backgroundColor:'#3b7483',padding:'5px',display:'flex',color:'white',fontWeight:'bold',borderRadius:'10px',paddingLeft:'15px',justifyContent:'flex-start',alignContent:'flex-start'}}>Personal Details</p>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP FullName</label>
                <input type="text" name="empfullname" value={emp.empfullname} onChange={handleChange}  required/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP Id</label>
                <input type="text" name="EmpID" value={emp.EmpID} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Mobile Number</label>
                <input type="text" name="mobile" value={emp.mobile} onChange={handleChange}  />
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Type</label>
                <select name="emptype" value={emp.emptype} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="driver">Driver</option>
                    <option value="teammember">Team Member</option>
                    <option value="cleaner">Cleaner</option>
                </select>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Emirates ID Number</label>
                <input type="text" name="eid" value={emp.eid} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Emirates ID Expiry</label>
                <input type="date" name="eidexp" value={emp.eidexp} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Email ID</label>
                <input type="text" name="email" value={emp.email} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Passport Number</label>
                <input type="text" name="ppnumber" value={emp.ppnumber} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Passport Expiry</label>
                <input type="date" name="ppexp" value={emp.ppexp} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Nationality</label>
                <select name="nationality" value={emp.nationality} onChange={handleChange}>
                    <option value="">Select Nationality</option>
                    <option value="Dubai">UAE Local</option>
                    <option value="Abudhabi">India</option>
                    <option value="AlAin">Pakistan</option>
                    <option value="Sharjah">Bangladesh</option>
                    <option value="Ajman">Nepal</option>
                    <option value="RAK">Uganda</option>
                    <option value="Khorfakkan">Nigeria</option>
                    <option value="Ummalquin">Egypt</option>
                    <option value="Ummalquin">Lebnon</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <h2 style={{backgroundColor:'#3b7483',padding:'5px',display:'flex',color:'white',fontWeight:'bold',borderRadius:'10px',paddingLeft:'15px',justifyContent:'flex-start',alignContent:'flex-start'}}>Professional Details</h2>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>External ID</label>
                <input type="text" name="externalid" value={emp.externalid} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Working Company</label>
                <input type="text" name="workingcompany" value={emp.workingcompany} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Working Location</label>
                <input type="text" name="worklocation" value={emp.worklocation} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Working city</label>
                <select name="workcity" value={emp.workcity} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Abudhabi">Abu Dhabi</option>
                    <option value="AlAin">Al Ain</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="RAK">Ras Al Khaima</option>
                    <option value="Khorfakkan">Khorfakkan</option>
                    <option value="Ummalquin">Umm al Quin</option>
                </select>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Location ID</label>
                <input type="text" name="locationid" value={emp.locationid} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Joining Date</label>
                <input type="date" name="joindate" value={emp.joindate} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Traffic Code No.</label>
                <input type="text" name="trafficcode" value={emp.trafficcode} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>License Number</label>
                <input type="text" name="license" value={emp.license} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>License Expiry</label>
                <input type="date" name="licenseexp" value={emp.licenseexp} onChange={handleChange}  />
            </div>
            <h2 style={{backgroundColor:'#3b7483',padding:'5px',display:'flex',color:'white',fontWeight:'bold',borderRadius:'10px',paddingLeft:'15px',justifyContent:'flex-start',alignContent:'flex-start'}}>Bank Details</h2>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Bank Name</label>
                <input type="text" name="bankname" value={emp.bankname} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Bank A/C No.</label>
                <input type="text" name="bankac" value={emp.bankac} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>IBAN</label>
                <input type="text" name="iban" value={emp.iban} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Person Code</label>
                <input type="text" name="personcode" value={emp.personcode} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Gross Salary</label>
                <input type="text" name="grosssalary" value={emp.grosssalary} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Salary Distribution Type</label>
                <select name="salarydistributiontype" value={emp.salarydistributiontype} onChange={handleChange}>
                    <option value=""></option>
                    <option value="Cash">Cash</option>
                    <option value="PersonalAccount">Personal Account</option>
                    <option value="WPS">WPS</option>
                </select>
            </div>

            <h2 style={{backgroundColor:'#3b7483',padding:'5px',display:'flex',color:'white',fontWeight:'bold',borderRadius:'10px',paddingLeft:'15px',justifyContent:'flex-start',alignContent:'flex-start'}}>Other Details</h2>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Employement Type</label>
                <select name="employementtype" value={emp.employementtype} onChange={handleChange}>
                    <option value="">Employement Type</option>
                    <option value="Mainland">MainLand Visa</option>
                    <option value="Feelancer">Free Lancer</option>
                    <option value="Freezone">FreZone Visa</option>
                    <option value="Temporory">Temporory Worker</option>
                </select>
            </div>

            <div style={{width:'500px', display:'flex', alignItems:'center',alignContent:'center',justifyContent:'space-between'}}>
                <button type="submit">Submit</button>
            </div>


        </form>

        </div>
        </div>
        </div>
    </>
  )
}

export default EmpRegistration
