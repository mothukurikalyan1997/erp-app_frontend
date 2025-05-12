import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import axios from 'axios'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, Navigate } from 'react-router-dom';

const EmployeeTable = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
    const [emp,setEmp] = useState([])
    const [excel,setExcel] = useState([])
      const [searchQuery, setSearchQuery] = useState("");
        


      const handleChange = (event) => {
          setSearchQuery(event.target.value);
        };

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`${API_URL}/emp/empdata`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
          .then(res => {
            setEmp(res.data)
            setExcel(res.data)
          })
          .catch(err=> console.log(err));
        },[])

const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(excel);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Employee');
        const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([buf], { type: 'application/octet-stream' });
        saveAs(blob, 'Partners.xlsx');
      };
        

  return (
    <>
    <Navbar />
    <div  className='full-container'>
      <div className='side-container'>
        <Sidenav />
      </div>
      <div  className='actual-container'>
        <div className='white-box'>

      {/* Top Icon and Search bar */}
      <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',height:'60px'}}>
            <div>
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Employee Details</p>
            </div>
                <div>
                <input type="text" className="search-input" placeholder="Search by Emp_ID | Emp_Name | Mobile" value={searchQuery} onChange={handleChange}/>
                </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
            <Link to={'/emp/empregistration'}><AddIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }}/></Link>
              <FileDownloadOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={exportToExcel}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}

       <div style={{height: '400px', overflowY: 'auto', border: '1px solid #ccc'}}>
      <table className='dynamic-table' >
        <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
      <tr >
        <th>EMP ID</th>
        <th>External Code</th>
        <th>Full Name</th>
        <th>Mobile</th>
        <th>Associated With</th>
        <th>Work Location</th>
        <th>Location ID</th>
        <th>Action</th>

        </tr>
        </thead>
       <tbody>
        {emp.filter((e)=>{
          return searchQuery.toLowerCase() === '' ? e : e.empfullname.toLowerCase().includes(searchQuery) || String(e.EmpID).includes(searchQuery) || String(e.externalid).includes(searchQuery) ||String(e.mobile).includes(searchQuery);
        }).map((e,i)=>{
            return(
              <tr key={i}>
              <td>{e.EmpID}</td>
              <td>{e.externalid}</td>
              <td>{e.empfullname}</td>
              <td>{e.mobile}</td>
              <td>{e.workingcompany}</td>
              <td>{e.worklocation}</td>
              <td>{e.locationid}</td>
              <td >
              <Link to={`/employeeactions/${e.EmpID}`} ><EditNoteOutlinedIcon/></Link>
              </td>
            </tr>
                
        )
        })}
       </tbody>
      </table>
      </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EmployeeTable

{/* <>
<Navbar />
<div  className='full-container'>
  <div className='side-container'>
    <Sidenav />
  </div>
  <div  className='main-container'>
    <div>
        <h1 style={{padding:'5px'}}>Employee Table</h1><hr />
    </div>
    <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center',paddingRight:'20px'}}>
        <div><input type="text" name="Search" id="" placeholder='Search..' /></div>
        <div>
            <button><Link to={'/empregistration'} style={{textDecoration:'none',color:'white'}}>+ New Registration</Link></button>
        </div>
    </div>
        <div style={{width:'95%',display:'flex',alignContent:'center',textAlign:'center',paddingLeft:'15px'}}>
              <table className='data-tables'>
   <thead>
    <tr >
    <th>ID</th>
    <th>Full Name</th>
    <th>Forign ID</th>
    <th>Mobile</th>
    <th>Working Company</th>
    <th>Work Location</th>
    <th>Location ID</th>
    <th>Bike Number</th>
    <th>Action</th>

    </tr>
   </thead>
   <tbody>
    {emp.map((e)=>{
        return(
        <tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.empfullname}</td>
          <td>{e.empforginid}</td>
          <td>{e.mobile}</td>
          <td>{e.workingcompany}</td>
          <td>{e.worklocation}</td>
          <td>{e.locationid}</td>
          <td>{e.bikeplate}</td>
          <td >
            <button><Link to={'/employeeactions'} style={{color:'white',textDecoration:'none'}}>Action</Link></button>
          </td>
        </tr>
        
    )
    })}
   </tbody>
  </table>

    </div>

        </div>
    </div>
</> */}

