import React, { useEffect, useState } from 'react'
import {API_URL} from '../data/Data/'
import { useNavigate ,Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import Sidenav from '../Components/Sidenav'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Edit = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
    const {ID} = useParams();

    const [valuee,setValuee] = useState({
        salutation: "",
        firstName: "",
        lastName: "",
        companyName: "",
        displayName: "",
        email: "",
        workPhone: "",
        mobile: "",
        taxTreatment: "",
        trn: "",
        currency: "AED - UAE Dirham",
        openingBalance: "",
        paymentTerms: "Due On Receipt",
        Attention:"",
        street:"",
        City:"",
        State: "",
        ZIPCode:"",
        Phone:"",
        Remarks:"",
        type:"",
        bankname:"",
        accountnumber:"",
        iban:""
      });

    const [formData, setFormData] = useState({
        salutation: "",
        firstName: "",
        lastName: "",
        companyName: "",
        displayName: "",
        email: "",
        workPhone: "",
        mobile: "",
        taxTreatment: "",
        trn: "",
        currency: "AED - UAE Dirham",
        openingBalance: "",
        paymentTerms: "Due On Receipt",
        Attention:"",
        street:"",
        City:"",
        State: "",
        ZIPCode:"",
        Phone:"",
        Remarks:"",
        type:"",
        bankname:"",
        accountnumber:"",
        iban:""
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValuee({
          ...valuee,
          [name]: type === "checkbox" ? checked : value,
        });
      };

      const navigate = useNavigate();
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/partner/edit/${ID}`,{valuee},{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
        .then(response => {
          console.log(response);
          window.alert("Update Sucessfull")
          navigate("/partner/Customers");
        }).catch(err => console.log(err));       
        
      }

      
      useEffect(()=>{
        
          axios.get(`${API_URL}/partner/consumeredit/${ID}`,{
            headers:{
              'Authorization': `Bearer ${token}`,
              'company_id': company_id,
              'role': role,
              'email': email,
            }
          })
          .then(res => {console.log(res.data[0])
            setValuee(res.data[0]);})
          .catch(err => console.log(err));
      },[])
    
    
    
  return (
      <>
      <Navbar />
        <div className="full-container">
          <div className="side-container">
            <Sidenav/>
          </div>
          <div className="actual-container">
            <div className="white-box">
            <div className='Main'>
           <div className="data">
            <div className="f-container"><h2>Data Entry Form:</h2></div>
            <div className="container">
            <form  className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
          <div className='option'>
          <Link to={'/partner/Customers'} style={{borderRadius:'5px',backgroundColor:'rgb(182, 78, 29)',display:'flex',width:'fit-content'}}><ArrowBackIcon/></Link>
          </div>
<h3 className="text-lg font-semibold mt-6">Basic Information</h3>

    <div className="grid grid-cols-3 gap-4">
        
      <select name="salutation" value={valuee.salutation} onChange={handleChange} className="border p-2 rounded">
        <option value="">salutation</option>
        <option value="Mr">Mr</option>
        <option value="Ms">Ms</option>
      </select>
      <input type="text" name="firstName" placeholder="First Name" value={valuee.firstName} onChange={handleChange} className="border p-2 rounded" />
      <input type="text" name="lastName" placeholder="Last Name" value={valuee.lastName} onChange={handleChange} className="border p-2 rounded" />
    </div>
    <div className="grid grid-cols-3 gap-4">
    <input type="text" name="companyName" placeholder="Company Name" value={valuee.companyName} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
    <input type="text" name="displayName" placeholder="DisplayName" value={valuee.displayName} onChange={handleChange} className="border p-2 rounded w-full mt-4" />

    <input type="email" name="email" placeholder="Email Address" value={valuee.email} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      <input type="text" name="workPhone" placeholder="Work Phone" value={valuee.workPhone} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="mobile" placeholder="Mobile" value={valuee.mobile} onChange={handleChange} className="border p-2 rounded w-full" />
    </div><br /><hr />
{/* ------------------------------    Closing first part  */}

    <h3 className="text-lg font-semibold mt-6">Other Details</h3>
    <div className="grid grid-cols-3 gap-4">
    <select name="taxTreatment" value={valuee.taxTreatment} onChange={handleChange} className="border p-2 rounded w-full mt-2">
      <option value="">TaxTreatment</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
    <input type="text" name="trn" placeholder="TRN Number" value={valuee.trn} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    <input type="text" value={valuee.currency} disabled className="border p-2 rounded w-full mt-2 bg-gray-100" />
    </div>
    <div className="grid grid-cols-3 gap-4">
    <input type="text" name="openingBalance" placeholder="Opening Balance" value={valuee.openingBalance} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    
    <select name="paymentTerms" value={valuee.paymentTerms} onChange={handleChange} className="border p-2 rounded w-full mt-2">
      <option value="">Payment Terms</option>
      <option value="Net 15">Net 15</option>
      <option value="Net 30">Net 30</option>
      <option value="Net 45">Net 45</option>
    </select>
    </div>
<br /><hr />

    
    

   {/* -------------Start Address Part----------  */}

    <h3 className="text-lg font-semibold mt-6">Billing Address</h3>
    <div className="grid grid-cols-3 gap-4">
   <input type="text" name="Attention" placeholder="Attention" value={valuee.Attention} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    <input type="text" name="street" placeholder="Street Name" value={valuee.street} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    <input type="text" name="City" placeholder="City" value={valuee.City} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    </div>
    <div className="grid grid-cols-3 gap-4">
    <select name="State" value={valuee.State} onChange={handleChange} className="border p-2 rounded w-full mt-2">
      <option value="">State</option>
      <option value="Dubai">Dubai</option>
      <option value="Abu Dhabi">Abudhabi</option>
      <option value="Sharjah">Sharjah</option>
    </select>
<input type="text" name="ZIPCode" placeholder="ZIP Code" value={valuee.ZIPCode} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    <input type="text" name="Phone" placeholder="Phone" value={valuee.Phone} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    </div>
    <div className="grid grid-cols-3 gap-4">
    <input type="text" name="Remarks" placeholder="Remarks" value={valuee.Remarks} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
    <select name="type" value={valuee.type} onChange={handleChange} className="border p-2 rounded w-full mt-2">
      <option value="">Type</option>
      <option value="Customer">Customer</option>
      <option value="Vendor">Vendor</option>
    </select>
    </div>
{/* Start Bank Details     */}

<h3 className="text-lg font-semibold mt-6">Bank Details</h3>
    <input type="text" name="bankname" placeholder="Bank Name" value={valuee.bankname} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" name="accountnumber" placeholder="Account Number" value={valuee.accountnumber} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" name="iban" placeholder="IBAN" value={valuee.iban} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>


  <div className="flex justify-end mt-6">
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
    </div>
    
  </form>

  </div>

            </div>            
           </div>

            </div>
          </div>
        </div>
      </>
  )
}

export default Edit
