import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav';
import axios from 'axios';

import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
const Dashboard = () => {
  // Example data (you can replace it with real data from your API)
  const employeeCount = 120;
  const vendorCount = 45;
  const customerCount = 200;
  const profitLoss = 35000; // Example Profit & Loss value

  const [data,setData] = useState([])
  const [expenses,setExpenses] = useState([])

  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

  useEffect(() => {
    axios.get('http://localhost:3001/dashdata',{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => {
        setData(res.data[0])
        
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {

    axios.get('http://localhost:3001/api/expenses',{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => {
        setExpenses(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className='full-container'>
      <div className='side-container'>
        <Sidenav />
      </div>
      <div className='actual-container'>
        <div className='white-box'>
        <div className="dashboard-container">
      <h1>ERP Dashboard</h1>
      <div className="cards-container">
        <div className="card">
          <h2>Employee Count</h2>
          <p>{data.employee_count}</p>
        </div>
        <div className="card">
          <h2>Vendor Count</h2>
          <p>{data.vendor_count}</p>
        </div>
        <div className="card">
          <h2>Customer Count</h2>
          <p>{data.customer_count}</p>
        </div>
        <div className="card">
          <h2>Invoice Amount</h2>
          <p>{data.invoice_amount}</p>
        </div>
        <div className="card">
          <h2>Deducted Amount</h2>
          <p>{data.deduction_amount}</p>
        </div>
        <div className="card">
          <h2>Expenses w/Vat</h2>
          <p>{data.expense_amount_with_vat}</p>
        </div>
        <div className="card">
          <h2>NetBalance</h2>
          <p>{data.net_balance}</p>
        </div>
      </div>
    </div>

    <div className="barchart" style={{ width: 400, height: 300 }}>
      
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={expenses}>
          <XAxis dataKey="exp_cat" />
          <Tooltip />
          <Bar dataKey="Total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <h1>Total Expenses with Catagory</h1>
    </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard
