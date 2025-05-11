import React, { useEffect, useState } from 'react';
import {API_URL} from '../../data/Data'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Sidenav from '../../Components/Sidenav';
import Navbar from '../../Components/Navbar';

import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


function Invoicelist() {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
  const [invoices, setInvoices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchInvoices = () => {
    axios.get(`${API_URL}/get`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => {
        setInvoices(res.data);
        setFiltered(res.data); // Initialize filtered list
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const deleteInvoice = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      await axios.delete(`${API_URL}/invoices/${id}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      });
      fetchInvoices();
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    setFiltered(
      invoices.filter(inv =>
        inv.customer_name.toLowerCase().includes(term) ||
        inv.status.toLowerCase().includes(term)
      )
    );
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoices');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buf], { type: 'application/octet-stream' });
    saveAs(blob, 'invoice_list.xlsx');
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
      {/* <h1>All Invoices</h1>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => navigate('/Newinvoice')} className='nani'>+ Create Invoice</button>
        <input
          type="text"
          placeholder="Search by name or status"
          value={search}
          onChange={handleSearch}
          style={{ marginLeft: 10 }}
        />
        <button onClick={exportToExcel} style={{ marginLeft: 10 }} className='nani-download'>
          Export Excel
        </button>
      </div> */}

    {/* Top Icon and Search bar */}
    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',height:'60px'}}>
            <div>
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Invoice Details</p>
            </div>
                <div>
                <input type="text" className="search-input" placeholder="Search by Display | Company | Type" value={search} onChange={handleSearch}/>
                </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
            <Link to={'/Newinvoice'}><AddIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }}/></Link>
              <FileDownloadOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={exportToExcel}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}


        <div style={{height: '400px', overflowY: 'auto', border: '1px solid #ccc'}}>
        <table className='dynamic-table'>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(inv => (
            <tr key={inv.id}>
              <td>{inv.invoice_number}</td>
              <td>{inv.customer_name}</td>
              <td>{inv.date?.split('T')[0]}</td>
              <td>{inv.status}</td>
              <td>{inv.amount ? Number(inv.amount).toFixed(2) : '0.00'}</td>
              <td>
                <RemoveRedEyeOutlinedIcon onClick={()=>(navigate(`/invoices/${inv.id}`))} /> {' '}
                <DriveFileRenameOutlineOutlinedIcon onClick={()=>(navigate(`/invoice/edit/${inv.id}`))} /> {' '}
                <DeleteOutlineOutlinedIcon onClick={() => deleteInvoice(inv.id)} /> {' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
        </div>
      </div>
    </div>
    
    </>
        );
}

export default Invoicelist;