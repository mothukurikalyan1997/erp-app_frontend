import React, { useEffect, useRef, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';



const EmpSalTable = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')


      const tableref = useRef();

  
    const [salary,setSalary] = useState([])
    const [excel,setExcel] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
      };

    useEffect(()=>{
        axios.get(`${API_URL}/sal/employee/employeesaltable`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
          .then((res) => {
            const empdata = res.data
            setSalary(empdata);
            setExcel(empdata)
          }
          
        )
          .catch(err=> console.log(err));
        },[])
    
        const release = (empID,month,year)=>{
          Swal.fire({
            title: "Did you paid To Employee?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Amount Paid"
          }).then((result) => {
            if (result.isConfirmed) {
              axios.put(`${API_URL}/sal/updatesalded`,{empID,month,year},{
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'company_id': company_id,
                  'role': role,
                  'email': email,
                }
              })
          .then(response => {
              // navigate('/employeetable')
              console.log({empID,month});
              window.location.reload()
          }
          ).catch(error => console.log(error));
            }
          });
        }

        const exportToExcel = () => {
          const ws = XLSX.utils.json_to_sheet(excel);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Employee');
          const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([buf], { type: 'application/octet-stream' });
          saveAs(blob, 'Employee_Salary.xlsx');
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
  {/* Top Icon and Search bar */}
  <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',height:'60px'}}>
            <div>
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Emp Salary Data</p>
            </div>
                <div>
                <input type="text" className="search-input" placeholder="Search by Emp_ID | Emp_Name | Month" value={searchQuery} onChange={handleChange}/>
                </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
            <Link to={'/employee/employeesal'}><AddIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }}/></Link>
              <FileDownloadOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={exportToExcel}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}


            <div style={{height: '400px', overflowY: 'auto', border: '1px solid #ccc'}} >
      <table className='dynamic-table' ref={tableref}>
        <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
      <tr >
        <th>Month</th>
        <th>File</th>
        <th>Name</th>
        <th>Present Days</th>
        <th>Off Days</th>
        <th>Sick Days</th>
        <th>Paid Days</th>
        <th>Gross Salary</th>
        <th>Deduction Expense Amount</th>
        <th>Net Salary</th>
        <th>Status</th>
        <th>View</th>
        <th>Pay</th>

        </tr>
        </thead>
       <tbody>
        {salary && salary.filter((e)=>{
          return searchQuery.toLowerCase() === '' ? e : e.empname.toLowerCase().includes(searchQuery) || e.month.toLowerCase().includes(searchQuery) || String(e.empID).includes(searchQuery);
        }).map((e,i)=>{
            return(
              <tr key={i}>
              <td>{e.month}</td>
              <td>{e.empID}</td>
              <td>{e.empname}</td>
              <td>{e.presentdays}</td>
              <td>{e.offdays}</td>
              <td>{e.sickleave}</td>
              <td>{e.totalworkingdays}</td>
              <td>{e.grosssalary}</td>
              <td>{e.Total_Deduction_Amount}</td>
              <td>{e.Netsalary}</td>
              <td style={{color:e.status == 'Paid'? 'green' : 'red'}}>{e.status}</td>
              <td >                
                <Link to={`/employee/empsaledit/${e.empID}/${e.month}/${e.year}`}><ReceiptOutlinedIcon/></Link>
              
                {/* <button className='action' onClick={()=>release(e.empID,e.month,e.year)}>Pay</button>
                <button className='action'><Link to={`/employee/empsaledit/${e.empID}/${e.month}/${e.year}`} style={{color:'white',textDecoration:'none'}}>View</Link></button> */}
              </td>
              <td><PaidOutlinedIcon onClick={()=>release(e.empID,e.month,e.year)}/></td>
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

export default EmpSalTable

