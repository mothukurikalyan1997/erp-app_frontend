import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BankEdit = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

    const {id} = useParams();

    const [valuee,setValuee] = useState({
        BankName: "",
        accountHolder:"",
        accountNumber: "",
        IBAN: "",
        Openingbalance:"",
        Remark:""
    })

    useEffect(()=>{
        
        axios.get(`${API_URL}/bank/bankedit/${id}`,{
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
        axios.put(`${API_URL}/bank/bankupdate/${id}`,{valuee},{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
        .then(response => {
          console.log(response);
          navigate("/Banking");
        }).catch(err => console.log(err));       
        
      }

  return (
    <>
          <Navbar />

    <div className='full-container'>
      <div className='side-container'>
        <Sidenav/>
      </div>
      <div className='actual-container'>
        <div className='white-box'>
            <div>
                <h2>Bank Details Edit</h2>
            </div>
            <form onSubmit={handleSubmit} className="bank-form">

<input
  type="text"
  name="BankName"
  value={valuee.BankName}
  onChange={handleChange}
  placeholder="Bank Name"
  required
/>
<input
  type="text"
  name="accountHolder"
  value={valuee.accountHolder}
  onChange={handleChange}
  placeholder="Account Holder Name"
  required
/>
<input
  type="text"
  name="accountNumber"
  value={valuee.accountNumber}
  onChange={handleChange}
  placeholder="Account Number"
  required
/>
<input
  type="text"
  name="IBAN"
  value={valuee.IBAN}
  onChange={handleChange}
  placeholder="IBAN"
  required
/>
<input
  type="text"
  name="Openingbalance"
  value={valuee.Openingbalance}
  onChange={handleChange}
  placeholder="Opening Balance"
  required
/>
<input
  type="text"
  name="Remark"
  value={valuee.Remark}
  onChange={handleChange}
  placeholder="Remark(s)"
  required
/>
<button type="submit">Update</button>
</form>

        </div>
      </div>
    </div>
    </>
  )
}

export default BankEdit
