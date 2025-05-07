import React, { useEffect, useState } from 'react';
import {API_URL} from '../../data/Data'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Sidenav from '../../Components/Sidenav';

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


const ExpenseTable = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
    const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // const fetchExpenses = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:3001/api/expenses');
  //     setExpenses(res.data);
  //     console.log(res.data)
  //   } catch (err) {
  //     console.error('Error fetching expenses:', err);
  //   }
  // };

  useEffect(() => {
    axios.get(`${API_URL}/api/expenses`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // useEffect(() => {
  //   fetchExpenses();
  // }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`${API_URL}/api/expenses/${id}`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        });
        window.location.reload();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
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
      {/* <h2>Expense List</h2>

      <div>
        <input name="vendor" placeholder="Filter by Vendor" onChange={handleFilterChange} />
        <input name="forWhom" placeholder="Filter by Employee" onChange={handleFilterChange} />
      </div>
      <div><button onClick={()=>navigate('/newexpense')}>+Add Expense</button></div> */}

  {/* Top Icon and Search bar */}
  <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',height:'60px'}}>
            <div>
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Expense Data</p>
            </div>
                <div>
                <input type="text" className="search-input" placeholder="Search by Id | Catagory" value={searchQuery} onChange={handleChange}/>
                </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
              <AddIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={()=>navigate('/newexpense')}/>
              {/* <FileDownloadOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={exportToExcel}/> */}
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}


      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Catagory</th>
            <th>Item</th>
            <th>Amount</th>
            <th>VAT Amount</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.filter((e)=>{
          return searchQuery.toLowerCase() === '' ? e : String(e.id).includes(searchQuery) || e.exp_cat.toLowerCase().includes(searchQuery) || e.Sub_Cat.toLowerCase().includes(searchQuery);
        }).map((e,i) => (
            <tr key={i}>
              <td>{e.id}</td>
              <td>{e.exp_cat}</td>
              <td>{e.Sub_Cat}</td>
              <td>{e.Deduct_Amount}</td>
              <td>{e.VAT}</td>
              <td>{e.Total}</td>
              <td>
                <DriveFileRenameOutlineOutlinedIcon onClick={() => navigate(`/expenses/edit/${e.id}`)}/>
                <DeleteOutlineOutlinedIcon onClick={() => handleDelete(bill.id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
      </div>
    </div>
    
    </>
  );
}

export default ExpenseTable
