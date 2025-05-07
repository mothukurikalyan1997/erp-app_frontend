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

  const printPDF = () => {
    const element = document.getElementById('invoice-pdf');
    html2pdf().from(element).save(`Invoice-${invoice.invoice.invoice_number}.pdf`);
  };

  if (!invoice) return <p>Loading...</p>;

  const { invoice: inv, items } = invoice;
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
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
        <div style={{ padding: 20 }}>
      <div id="invoice-pdf" style={{ padding: 20, border: '1px solid #ccc' }}>
        <h1>Invoice #{inv.invoice_number}</h1>
        <p><strong>Customer:</strong> {inv.customer_name}</p>
        <p><strong>Date:</strong> {inv.date}</p>
        <p><strong>From:</strong> {inv.from_date} <strong>To:</strong> {inv.to_date}</p>
        <p><strong>Due:</strong> {inv.due_date}</p>
        <p><strong>Status:</strong> {inv.status}</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }} border="1">
          <thead>
            <tr>
              <th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{Number(item.price).toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>VAT ({inv.vat_percent}%):</strong> ${vat.toFixed(2)}</p>
          <h3><strong>Total:</strong> ${total.toFixed(2)}</h3>
        </div>
      </div>

      <button className='nani'   style={{ marginTop: 20 }} onClick={printPDF}>🖨️ Print PDF</button>
    </div>
    <button className='nani-cancel' style={{ marginTop: 20 }} onClick={()=>navigate('/accounts/Newinvoicelist')}> Back</button>

        </div>
      </div>
    </div>
    
    </>

  );
}

export default ViewInvoice
