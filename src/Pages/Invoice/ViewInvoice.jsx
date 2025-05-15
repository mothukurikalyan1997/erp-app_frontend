import React, { useEffect, useState } from 'react';
import {API_URL} from '../../data/Data'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import Sidenav from '../../Components/Sidenav';
import Navbar from '../../Components/Navbar';



const ViewInvoice = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
  const navigate = useNavigate()
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [profile, setProfile] = useState([]);
  const [customer,setCustomer] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/invoices/${id}`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email
      }
    }).then(res => {
      setInvoice(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`${API_URL}/ProfileData`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email
      }
    }).then(res => {
      setProfile(res.data[0]);
    });
  }, []);




  const printPDF = () => {
    const element = document.getElementById('invoice-pdf');
    html2pdf().from(element).save(`Invoice-${invoice.invoice.invoice_number}.pdf`);
  };


  if (!invoice) return <div>Loading...</div>;

  const { invoice: inv, items } = invoice;
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const totalVat = items.reduce((acc, item) => acc + (parseFloat(item.vat) || 0), 0);
  const vat = (subtotal * inv.vat_percent) / 100;
  const total = subtotal + vat;

  return (
    <>
    <Navbar/>
    <div className="full-container">
      <div className="side-container">
        <Sidenav/>
      </div>
      <div className="actual-container">
        <div className="white-box">
        <div  style={{ fontFamily: 'Arial, sans-serif', background: '#fff', borderRadius: 8 ,height:'794px',width:'1123px',margin: '0 auto',padding: '40px',boxSizing: 'border-box'}}>
  <div id="invoice-pdf" style={{ padding: 20,  borderRadius: 8, background: '#fff' }}>
    <div >
          <div style={{display:'flex', justifyContent:'space-between',alignItems:'center',padding:'5px'}}>
            <h2>{profile.company_name}</h2>
            <h2 style={{backgroundColor:inv.status === 'unpaid' ? 'tomato' : 'green', borderRadius:'10px', display: 'inline-block',height:'50px',width:'150px', textAlign:'center',alignContent:'center',color:inv.status === 'unpaid' ? 'white' : 'white'}}>{inv.status}</h2>
          </div>      
    </div><hr />

    <div style={{display:'flex', justifyContent:'space-between',gap:'5px',marginBottom:'10px'}}>
        <div style={{display:'flex',padding:'10px',flexDirection:'column',gap:'5px'}}>
          <div><strong>Company Name:</strong> {profile.company_name} || Test</div>
          <div><strong>Country:</strong> {profile.country}</div>
          <div><strong>Mobile:</strong> {profile.mobile_number}</div>
          <div><strong>Email:</strong> {profile.mailid}</div>
          <div><strong>TRN:</strong> </div>
        </div>
          <div style={{display:'flex',padding:'10px',flexDirection:'column',gap:'5px'}}>
            <div><strong>TAX Invoice #:</strong> {inv.invoice_number}</div>
            <div><strong>Invoice Date:</strong> {inv.date.split('T')[0]}</div>
            <div><strong>From:</strong> {inv.from_date.split('T')[0]}</div>
            <div><strong>To:</strong> {inv.to_date.split('T')[0]}</div>
            <div><strong>Due Date:</strong> {inv.due_date.split('T')[0]}</div>
        </div>

    </div>
    {/* Invoice Meta Section */}
    <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 15, marginBottom: 20, background: '#b8b894',display:'flex',flexDirection:'column',justifyContent:'flex-start',gap:'5px' }}>
      <div><strong>Invoice To:</strong></div>
      <div>{inv.companyName}</div>
      <div>{inv.email}</div>
      <div>{inv.trn}</div>
      <div>{inv.City}</div>
      <div>{inv.State}</div>
    </div>

    {/* Product Table */}
    <table className='dynamic-table' border="1">
      <thead style={{ background: '#f0f0f0' }}>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>VAT Amount</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx} style={{ height: '25px' }}>
            <td>{item.product}</td>
            <td>{item.quantity}</td>
            <td>{Number(item.price).toFixed(2)}</td>
            <td>{Number(item.vat).toFixed(2)}</td>
            <td>{Number(item.total).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Totals */}
    <div style={{ textAlign: 'right' ,marginTop:'20px'}}>
      <div><strong>Subtotal:</strong> AED {subtotal.toFixed(2)}</div>
      <div><strong>VAT Amount:</strong> AED {totalVat}</div>
      <h3><strong>Total:</strong> AED {(subtotal + totalVat).toFixed(2)}</h3>
    </div>

  </div>
      {/* Extra Options */}
    <div style={{ marginTop: 30, paddingTop: 10, borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <button className='nani' onClick={printPDF}>🖨️ Print PDF</button>
        <button className='nani-cancel' onClick={() => navigate('/accounts/Newinvoicelist')}>🔙 Back</button>
      </div>
    </div>

</div>

        </div>
      </div>
    </div>
    
    </>

  );
}

export default ViewInvoice
