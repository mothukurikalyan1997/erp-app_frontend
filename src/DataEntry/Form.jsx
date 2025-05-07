import React, { useState } from 'react'
import {API_URL} from '../data/Data'
import { useNavigate ,Link } from 'react-router-dom'
import './Form.css'
import axios from 'axios'
import Navbar from '../Components/Navbar'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidenav from '../Components/Sidenav'


const Form = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

        const [formData, setFormData] = useState({
        code:"",
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
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.code == ''){
          axios.post(`${API_URL}/partner/consumer`,{formData},{
            headers:{
              'Authorization': `Bearer ${token}`,
              'company_id': company_id,
              'role': role,
              'email': email,
            }
          })
          .then(response => {console.log(response);
            navigate('/partner/Customers')
          }
        ).catch(error => console.log(error));
        }else{
          window.alert("Code Is Mandatory !")
        }

      }
      
      const navigate = useNavigate();

    
    
    
  return (
      <>
      <Navbar />
        <div className='full-container'>
          <div className='side-container'>
            <Sidenav/>
          </div>
          <div className='actual-container'>
            <div className='white-box'>
            <div className='Main'>
           <div className="data">
            <div className="container">
            <div><Link to={'/partner/Customers'} ><CloseOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: 'tomato', padding: '6px', borderRadius: '6px',marginRight:'5px' }}/></Link>
            </div>
            <form  className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>

<h3 className="text-lg font-semibold mt-6">Basic Information</h3>

    <div className="grid grid-cols-3 gap-4">
    <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} className="border p-2 rounded" required/>

      <select name="salutation" value={formData.salutation} onChange={handleChange} className="border p-2 rounded" required>
        <option value="">salutation</option>
        <option value="Mr">Mr</option>
        <option value="Ms">Ms</option>
      </select>
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded"  required/>
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded"  required/>
    </div>
    <div className="grid grid-cols-3 gap-4">
    <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="border p-2 rounded w-full mt-4"  required/>
    <input type="text" name="displayName" placeholder="DisplayName" value={formData.displayName} onChange={handleChange} className="border p-2 rounded w-full mt-4"  required/>

    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full mt-4"  required/>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <input type="text" name="workPhone" placeholder="Work Phone" value={formData.workPhone} onChange={handleChange} className="border p-2 rounded w-full"  required/>
      <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="border p-2 rounded w-full"  required/>
    </div><br /><hr />
{/* ------------------------------    Closing first part  */}

    <h3 className="text-lg font-semibold mt-6">Other Details</h3>
    <div className="grid grid-cols-3 gap-4">
    <select name="taxTreatment" value={formData.taxTreatment} onChange={handleChange} className="border p-2 rounded w-full mt-2" required>
      <option value="">TaxTreatment</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
    <input type="text" name="trn" placeholder="TRN Number" value={formData.trn} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" value={formData.currency} disabled className="border p-2 rounded w-full mt-2 bg-gray-100" />
    </div>
    <div className="grid grid-cols-3 gap-4">
    <input type="text" name="openingBalance" placeholder="Opening Balance" value={formData.openingBalance} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    
    <select name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} className="border p-2 rounded w-full mt-2" required>
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
   <input type="text" name="Attention" placeholder="Attention" value={formData.Attention} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" name="street" placeholder="Street Name" value={formData.street} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" name="City" placeholder="City" value={formData.City} onChange={handleChange} className="border p-2 rounded w-full mt-2" required />
    </div>
    <div className="grid grid-cols-3 gap-4">
    <select name="State" value={formData.State} onChange={handleChange} className="border p-2 rounded w-full mt-2" required>
      <option value="">State</option>
      <option value="Dubai">Dubai</option>
      <option value="Abu Dhabi">Abudhabi</option>
      <option value="Sharjah">Sharjah</option>
    </select>
<input type="text" name="ZIPCode" placeholder="ZIP Code" value={formData.ZIPCode} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" name="Phone" placeholder="Phone" value={formData.Phone} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    </div>
    <div className="grid grid-cols-3 gap-4">
    <input type="text" name="Remarks" placeholder="Remarks" value={formData.Remarks} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded w-full mt-2" required>
      <option value="">Type</option>
      <option value="Customer">Customer</option>
      <option value="Vendor">Vendor</option>
    </select>
    </div>
{/* Start Bank Details     */}

    <h3 className="text-lg font-semibold mt-6">Bank Details</h3>
    <input type="text" name="bankname" placeholder="Bank Name" value={formData.bankname} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" name="accountnumber" placeholder="Account Number" value={formData.accountnumber} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>
    <input type="text" name="iban" placeholder="IBAN" value={formData.iban} onChange={handleChange} className="border p-2 rounded w-full mt-2"  required/>

    <div className="flex justify-end mt-6">
    </div>
  </form>  <button type="submit" style={{width:'100%',height:'50px',position:'sticky'}} onClick={handleSubmit}>Save</button>

  </div>

            </div>            
           </div>

            </div>
          </div>
        </div>
      </>
  )
}

export default Form
