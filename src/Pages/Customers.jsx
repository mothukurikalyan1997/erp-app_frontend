import React, { useEffect, useState } from 'react'
import {API_URL} from '../data/Data'
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidenav from '../Components/Sidenav'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PrintIcon from '@mui/icons-material/Print';
import GetAppIcon from '@mui/icons-material/GetApp';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const Customers = () =>{
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
        const [customer,setCustomer] = useState([])
        const [searchQuery, setSearchQuery] = useState("");
        const [excel,setExcel] = useState([])


        const handleChange = (event) => {
          setSearchQuery(event.target.value);
        };

        useEffect(()=>{
          const token = localStorage.getItem('token');
          axios.get(`${API_URL}/partner/consumer`,{
            headers:{
              'Authorization': `Bearer ${token}`,
              'company_id': company_id,
              'role': role,
              'email': email,
            }
          })
            .then(res => {
              setCustomer(res.data)
              setExcel(res.data)
            })
            .catch(err=> console.log(err));
        },[])


        const handledelete = async (ID) =>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
          if (result.isConfirmed) {

            try {
              await axios.delete(`${API_URL}/partner/consumerdelete/${ID}`,{
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'company_id': company_id,
                  'role': role,
                  'email': email,
                }
              });
              // console.log(email);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              window.location.reload()
          }catch(err) {
              console.log(err);
          }
            
          }
        });}
    const navigate = useNavigate()

      const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(excel);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Partner');
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
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Partner Details (Customer &Vendor)</p>
            </div>
                <div>
                <input type="text" className="search-input" placeholder="Search by Display | Company | Type" value={searchQuery} onChange={handleChange}/>
                </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
            <Link to={'/Dataentry'}><AddIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }}/></Link>
              <FileDownloadOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={exportToExcel}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}
       <div style={{height: '500px', overflowY: 'auto', border: '1px solid #ccc'}}>
      <table className='dynamic-table'>
       <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
        <tr>
        <th>ID</th>
        <th>Code</th>
        <th>Displayname</th>
        <th>Companyname</th>
        <th>Workphone</th>
        <th>Mobile</th>
        <th>Openingbalance</th>
        <th>Paymentterms</th>
        <th>Type</th>
        <th>Action</th>

        </tr>
       </thead>
       <tbody>
        {customer.filter((e)=>{
          return searchQuery.toLowerCase() === '' ? e : String(e.ID).includes(searchQuery) || e.displayName.toLowerCase().includes(searchQuery) || e.companyName.toLowerCase().includes(searchQuery) || e.type.toLowerCase().includes(searchQuery);
        }).map((e)=>{
            return(
            <tr key={e.ID}>
              <td>{e.ID}</td>
              <td>{e.code}</td>
              <td>{e.displayName}</td>
              <td>{e.companyName}</td>
              <td>{e.workPhone}</td>
              <td>{e.mobile}</td>
              <td>{e.openingBalance}</td>
              <td>{e.paymentTerms}</td>
              <td>{e.type}</td>
            <td>
            <Link to={`/partner/consumeredit/${e.ID}`} ><EditNoteOutlinedIcon/></Link>
            {/* <button className='nani-cancel' onClick = {() => handledelete(e.ID)}>Delete</button> */}

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
  )}

export default Customers