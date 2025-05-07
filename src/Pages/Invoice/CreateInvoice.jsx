import axios from 'axios';
import {API_URL} from '../../data/Data'
import React, { useState } from 'react';
import Sidenav from '../../Components/Sidenav';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CreateInvoice = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
  const navigate = useNavigate()
  const [form, setForm] = useState({
    invoice_number: '',
    customer_name: '',
    date: '',
    from_date: '',
    to_date: '',
    due_date: '',
    status: 'unpaid',
    vat_percent: 5,
    paid_on: ''
  });
  const [items, setItems] = useState([{ product: '', quantity: 1, price: 0 }]);

  const handleForm = (field, value) => setForm({ ...form, [field]: value });

  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { product: '', quantity: 1, price: 0 }]);

 
  const submit = async () => {
    const payload = {
      ...form,
      paid_on: form.paid_on || null,
      items
    };
    console.log(payload)
    try {
      const res = await axios.post(`${API_URL}/invoices`, payload,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      });
      console.log(payload)
      alert('Invoice created!');
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
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

  {/* Top Icon and Search bar */}
  <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',height:'60px'}}>
            <div>
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Generate New Invoice</p>
            </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
              <CloseOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={()=>navigate('/accounts/Newinvoicelist')}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> <hr />
  {/* Close */}

<div style={{display:'flex', alignContent:'center',gap:'50px', marginTop:'10px'}}>
<div style={{border:'1px solid 	#D3D3D3',padding:'10px',borderRadius:'5px'}}>
    <div>
    <label>Invoice Number:</label><br />
    <input type="text" onChange={e => handleForm('invoice_number', e.target.value)} />
  </div>

  <div>
    <label>Customer Name:</label><br />
    <input type="text" onChange={e => handleForm('customer_name', e.target.value)} />
  </div>

  <div>
    <label>Invoice Date:</label><br />
    <input type="date" onChange={e => handleForm('date', e.target.value)} />

    </div>
    <div>
    <label>Status:</label><br />
    <select onChange={e => handleForm('status', e.target.value)}>
      <option value="unpaid">Unpaid</option>
      <option value="paid">Paid</option>
      <option value="overdue">Overdue</option>
    </select>
  </div>

  </div>
    <div style={{border:'1px solid 	#D3D3D3',padding:'10px'}}>
    <div>
    <label>From Date:</label><br />
    <input type="date" onChange={e => handleForm('from_date', e.target.value)} />
  </div>

  <div>
    <label>To Date:</label><br />
    <input type="date" onChange={e => handleForm('to_date', e.target.value)} />
  </div>

  <div>
    <label>Due Date:</label><br />
    <input type="date" onChange={e => handleForm('due_date', e.target.value)} />
  </div>
  <div>
    <label>VAT (%):</label><br />
    <input type="number" value={form.vat_percent} onChange={e => handleForm('vat_percent', parseFloat(e.target.value))} />
  </div>

    </div>

</div>




  <h2>Items</h2>
  {items.map((item, i) => (
    <div key={i} style={{ marginBottom: '10px' ,display:'flex',alignContent:'center',alignItems:'center'}}>
      <label>Product:</label><br />
      <input type="text" onChange={e => updateItem(i, 'product', e.target.value)} /><br />

      <label>Quantity:</label><br />
      <input type="number" onChange={e => updateItem(i, 'quantity', +e.target.value)} /><br />

      <label>Price:</label><br />
      <input type="number" onChange={e => updateItem(i, 'price', +e.target.value)} />
    </div>
  ))}

  <button onClick={addItem} className='nani'>+ Add Item</button><br /><br />
  <button onClick={submit} className='nani-submit'>Submit Invoice</button>

        </div>
      </div>
    </div>
    </>

      );
    
    }

export default CreateInvoice
