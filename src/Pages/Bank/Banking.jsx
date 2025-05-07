import React, { useEffect, useState, useRef } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import Sidenav from '../../Components/Sidenav';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


const Banking = () => { 
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  

  const [datas,setDatas] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(datas); // Convert JSON to Excel sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx'); // Export to file named "data.xlsx"
  };

          const [formData, setFormData] = useState([{
            BankName: "",
            accountHolder:"",
            accountNumber: "",
            IBAN: "",
            Openingbalance: "",
            Remark:""
        }]);
      
        const handleChange = (e) => {
          
          const { name, value, type, checked } = e.target;
          setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
          });
        };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/bank/bank`,{formData},{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
    .then(response => {console.log(response);
      window.location.reload()
    }
  ).catch(error => console.log(error));

  }

  useEffect(()=>{
const token = localStorage.getItem('token');
axios.get(`${API_URL}/bank/bank/data`,{
  headers:{
    'Authorization': `Bearer ${token}`,
    'company_id': company_id,
    'role': role,
    'email': email,
  }
})
  .then(res => setDatas(res.data))
  .catch(err=> console.log(err));
},[])

const handlesearch = (event) => {
  setSearchQuery(event.target.value);
};

const total = datas.reduce((sum, item) => sum + item.Openingbalance, '');

  return (
    <>
          <Navbar />

    <div className='full-container'>
      <div className='side-container'>
        <Sidenav/>
      </div>
      <div className='actual-container'>
        <div className='white-box'>
        <h1 style={{color:'#2F4558	',textAlign:'center',textDecoration: 'underline'}}>Banking Module</h1>
        <div className="form-container" >
      <h3 style={{color:'#1C2B3A	',textAlign:'start',textDecoration: 'underline'}}>New Bank Account Form</h3>
      <form onSubmit={handleSubmit} className="bank-form">

        <input
          type="text"
          name="BankName"
          value={formData.BankName}
          onChange={handleChange}
          placeholder="Bank Name"
          required
        />
        <input
          type="text"
          name="accountHolder"
          value={formData.accountHolder}
          onChange={handleChange}
          placeholder="Account Holder Name"
          required
        />
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          required
        />
        <input
          type="text"
          name="IBAN"
          value={formData.IBAN}
          onChange={handleChange}
          placeholder="IBAN (Starts with: AE:)"
          minlength="23" maxlength="23"
          required
        />
        <input
          type="text"
          name="Openingbalance"
          value={formData.Openingbalance}
          onChange={handleChange}
          placeholder="Opening Balance"
          required
        />
        <input
          type="text"
          name="Remark"
          value={formData.Remark}
          onChange={handleChange}
          placeholder="Remark(s)"
          required
        />
        <button type="submit">Submit</button>
      </form>

    </div>
    <h3 style={{color:'#1C2B3A	',textAlign:'start',textDecoration: 'underline'}}>Bank Details</h3>

        <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="First Name"
        value={searchQuery}
        onChange={handleChange}
      />

      
      
    </div> 
       <div style={{height: '400px', overflowY: 'auto', border: '1px solid #ccc'}}>
      <table className='dynamic-table' >
        <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
      <tr >
      <th>BankName</th>
        <th>AccountHolder</th>
        <th>AccountNumber</th>
        <th>IBAN</th>
        <th>Openingbalance</th>
        <th>Remark</th>
        <th>Action</th>

        </tr>
        </thead>
       <tbody >
        {datas.filter((e)=>{
          return searchQuery.toLowerCase() === '' ? e : e.empfullname.toLowerCase().includes(searchQuery);
        }).map((data,index)=>{
            return(
              <tr key={index}>
              <td>{data.BankName}</td>
              <td>{data.accountHolder}</td>
              <td>{data.accountNumber}</td>
              <td>{data.IBAN}</td>
              <td>{data.Openingbalance}</td>
              <td>{data.Remark}</td>
              <td >
                <button className='action' style={{width:'40px'}}><Link to={`/bankedit/${data.accountNumber}`} style={{color:'white',textDecoration:'none'}}>Edit</Link></button>
              </td>
              
            </tr>
       
        )
        })}
       </tbody>
      </table>
      </div>
        <div style={{color:'green',fontWeight:'bold'}}>Opening Balance: {total} AED | Available Amount: XXXXX</div>

        </div>
      </div>
    </div>
    </>
  );
};
export default Banking


{/* <div className="table-container" id='my-table'>

<div className='sub-head' style={{display:'flex', alignItems:'center', justifyContent:'space-between',height:'50px', paddingLeft:'5px',paddingRight:'10px'}}>
  <div>
    <input
    type="text"
    className="search-input"
    placeholder="Search by Account Holder"
    value={searchQuery}
    onChange={handlesearch}
    />
  </div>

<div><button onClick={exportToExcel}>Export to Excel</button></div>
</div>
  <table className="dynamic-tables" id='printTable'>
    <thead>
      <tr>
        <th>BankName</th>
        <th>AccountHolder</th>
        <th>AccountNumber</th>
        <th>IBAN</th>
        <th>Openingbalance</th>
        <th>Remark</th>
      </tr>
    </thead>
    <tbody>
      {datas.filter((e)=>{
    return searchQuery.toLowerCase() === '' ? e : e.accountHolder.toLowerCase().includes(searchQuery);
  }).map((data, index) => (
        <tr key={index}>
          <td>{data.BankName}</td>
          <td>{data.accountHolder}</td>
          <td>{data.accountNumber}</td>
          <td>{data.IBAN}</td>
          <td>{data.Openingbalance}</td>
          <td>{data.Remark}</td>
        </tr>
      ))}
    </tbody>
  </table>


    </div> */}
