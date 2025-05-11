import axios from 'axios';
import {API_URL} from '../../data/Data'
import React, { useState } from 'react';
import Sidenav from '../../Components/Sidenav';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CreateInvoice = () => {
  const token = localStorage.getItem('token');
  const company_id = localStorage.getItem('company_id');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  const navigate = useNavigate();

  const [form, setForm] = useState({
    invoice_number: '',
    customer_name: '',
    date: '',
    from_date: '',
    to_date: '',
    due_date: '',
    status: 'unpaid',
  });

  const [items, setItems] = useState([
    { product: '', quantity: '', price: '', vat: '', total: '0.00' },
  ]);

  const handleForm = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const parseVat = (vat) => {
    if (typeof vat === 'string') {
      const numericVat = parseFloat(vat.replace('%', ''));
      return isNaN(numericVat) ? 0 : numericVat;
    }
    return isNaN(vat) ? 0 : vat;
  };

  const calculateTotal = (quantity, price, vat) => {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(price) || 0;
    const v = parseVat(vat);
    const base = q * p;
    const vatAmount = base * (v / 100);
    return (base + vatAmount).toFixed(2);
  };

  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;

    const { quantity, price, vat } = updated[i];
    updated[i].total = calculateTotal(quantity, price, vat);
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { product: '', quantity: '', price: '', vat: '', total: '0.00' },
    ]);
  };

  const submit = async () => {
    const payload = {
      ...form,
      items,
      amount: parseFloat(getGrandTotal().toFixed(2))
    };
    console.log(payload)
    try {
      const res = await axios.post(`${API_URL}/invoices`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          company_id: company_id,
          role: role,
          email: email,
        },
      });

      alert('Invoice created!');
      navigate('/accounts/Newinvoicelist');
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => {
      const q = parseFloat(item.quantity) || 0;
      const p = parseFloat(item.price) || 0;
      return sum + q * p;
    }, 0);
  };
  
  const getTotalVAT = () => {
    return items.reduce((sum, item) => {
      const q = parseFloat(item.quantity) || 0;
      const p = parseFloat(item.price) || 0;
      const v = parseVat(item.vat);
      const base = q * p;
      return sum + base * (v / 100);
    }, 0);
  };
  
  const getGrandTotal = () => {
    return getSubtotal() + getTotalVAT();
  };

  return (
    <>
      <Navbar />
      <div className="full-container">
        <div className="side-container">
          <Sidenav />
        </div>
        <div className="actual-container">
          <div className="white-box">
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '60px',
              }}
            >
              <p style={{ color: '#1C2B3A', fontWeight: 'bold' }}>
                Generate New Invoice
              </p>
              <CloseOutlinedIcon
                style={{
                  fontSize: '30px',
                  color: 'white',
                  backgroundColor: '#004A89',
                  padding: '6px',
                  borderRadius: '6px',
                }}
                onClick={() => navigate('/accounts/Newinvoicelist')}
              />
            </div>
            <hr />

            {/* Form Sections */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '10px',
              }}
            >
              <div style={{ border: '1px solid #D3D3D3', padding: '10px', borderRadius: '5px' }}>
                <div style={{display:'flex', alignItems:'center',gap:'30px'}}>
                <label >Invoice Number:</label>
                <input
                  type="text"
                  onChange={(e) => handleForm('invoice_number', e.target.value)}
                />
                </div>
                <div style={{display:'flex', alignItems:'center',gap:'30px'}}>
                <label>Customer Name:</label>
                <input
                  type="text"
                  onChange={(e) => handleForm('customer_name', e.target.value)}
                />
                </div>
                <div style={{display:'flex', alignItems:'center',gap:'30px'}}>
                <label>Invoice Date:</label>
                <input
                  type="date"
                  onChange={(e) => handleForm('date', e.target.value)}
                />
                </div>
                <div style={{display:'flex', alignItems:'center',gap:'30px'}}>
                <label>Status:</label>
                <select
                  onChange={(e) => handleForm('status', e.target.value)}
                  value={form.status}
                >
                  <option value="unpaid">Unpaid</option>
                </select>

                </div>
                </div>

              <div style={{ border: '1px solid #D3D3D3', padding: '10px', borderRadius: '5px' }}>
                <div style={{display:'flex', alignItems:'center',gap:'30px'}}>
                <label>From Date:</label>
                <input
                  type="date"
                  onChange={(e) => handleForm('from_date', e.target.value)}
                />
                </div>
                <div style={{display:'flex', alignItems:'center',gap:'30px'}}>
                <label>To Date:</label>
                <input
                  type="date"
                  onChange={(e) => handleForm('to_date', e.target.value)}
                />
                </div>
              <div style={{display:'flex', alignItems:'center',gap:'30px'}}>
              <label>Due Date:</label>
                <input
                  type="date"
                  onChange={(e) => handleForm('due_date', e.target.value)}
                />
              </div>
              </div>
            </div>

            {/* Items Section */}
            <h2 style={{ marginTop: '30px' }}>Items</h2>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <input
                  type="text"
                  placeholder="Product"
                  value={item.product}
                  onChange={(e) => updateItem(i, 'product', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => updateItem(i, 'quantity', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(i, 'price', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="VAT"
                  value={item.vat}
                  onChange={(e) => updateItem(i, 'vat', e.target.value)}
                />
                <span>AED {item.total}</span>
              </div>
            ))}
            <button onClick={addItem} className="nani">+ Add Item</button>

            <br />
            <br />
            <button onClick={submit} className="nani-submit">Submit Invoice</button>
            <div style={{ marginTop: '20px' }}>
  <hr />
  <p><strong>Subtotal:</strong> AED {getSubtotal().toFixed(2)}</p>
  <p><strong>Total VAT:</strong> AED {getTotalVAT().toFixed(2)}</p>
  <p><strong>Grand Total:</strong> AED {getGrandTotal().toFixed(2)}</p>
</div>
          </div>
          
        </div>
      </div>
    </>
  );
    
    }

export default CreateInvoice
