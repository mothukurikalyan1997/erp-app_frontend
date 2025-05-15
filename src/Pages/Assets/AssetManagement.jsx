import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const AssetManagement = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
  const {id} = useParams();

  const [asset,setAsset] = useState([])
  const [assetlog,setAssetlog] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [emp,setEmp] = useState([])
  const [excel,setExcel] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/asset/assetdata`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => {setAsset(res.data)
        setExcel(res.data)
        
      })
      .catch(err=> console.log(err));
    },[])
    const handleChange = (event) => {
      setSearchQuery(event.target.value);
    };

    useEffect(()=>{
      const token = localStorage.getItem('token');
      axios.get(`${API_URL}/asset/assetlog`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      })
        .then(res => {setAssetlog(res.data)
          
        })
        .catch(err=> console.log(err));
      },[])

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
        .then(res => {setEmp(res.data)
          
        })
        .catch(err=> console.log(err));
      },[])

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
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Asset Data</p>
            </div>
                <div>
                <input type="text" className="search-input" placeholder="Search by Emp_ID | Asset ID | Asset Name" value={searchQuery} onChange={handleChange}/>
                </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
            <Link to={'/AssetRegister'}><AddIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }}/></Link>
              <FileDownloadOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={exportToExcel}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}
 
              
          <div style={{height: '500px', overflowY: 'auto', border: '1px solid #ccc'}}>
          <table className='dynamic-table' >
        <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
      <tr >
        <th>Asset ID</th>
        <th>Asset Name</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Associated File#</th>
        <th>Employee Name</th>
        <th>Action</th>

        </tr>
        </thead>
       <tbody>
        {asset.filter((e)=>{
          const query = searchQuery.toLowerCase();
          if (query === '') return true;
          return (
      String(e.assetid).toLowerCase().includes(query) ||
      String(e.assetname).toLowerCase().includes(query) ||
      String(e.assettype).toLowerCase().includes(query) ||
      String(e.amount).toLowerCase().includes(query) ||
      String(e.status).toLowerCase().includes(query) ||
      String(e.AssignedTo || "Free to Assign").toLowerCase().includes(query) ||
      String(e.empfullname).toLowerCase().includes(query)
    );
        }).map((e,i)=>{
            return(
              <tr key={i}>
              <td>{e.assetid}</td>
              <td>{e.assetname}</td>
              <td>{e.assettype}</td>
              <td>AED {e.amount}</td>
              <td>{e.status}</td>
              <td>{e.AssignedTo || 'Free to Assign' }</td>
              <td>{e.empfullname || 'Free to Assign' }</td>
              <td >

                <Link to={`/assetactions/${e.assetid}`}><MoreVertIcon style={{color:'black'}}/></Link>
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

export default AssetManagement
