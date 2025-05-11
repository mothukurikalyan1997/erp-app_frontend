import React, { useEffect, useState } from 'react';
import { API_URL } from '../../data/Data';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Sidenav from '../../Components/Sidenav';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const EditInvoice = () => {
  const token = localStorage.getItem('token');
  const company_id = localStorage.getItem('company_id');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  const [invoice, setInvoice] = useState({
    invoice_number: '',
    customer_name: '',
    date: '',
    from_date: '',
    to_date: '',
    due_date: '',
    status: 'unpaid',
    paid_on: '',
    payment_account: '',
    items: [],
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/invoices/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      })
        .then((res) => {
          const { invoice, items } = res.data;
          const formatDate = (d) => d ? d.split('T')[0] : '';
          setInvoice({
            ...invoice,
            date: formatDate(invoice.date),
            from_date: formatDate(invoice.from_date),
            to_date: formatDate(invoice.to_date),
            due_date: formatDate(invoice.due_date),
            paid_on: formatDate(invoice.paid_on),
            items: items || [],
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...invoice.items];
    updatedItems[index][e.target.name] = e.target.value;
    setInvoice({ ...invoice, items: updatedItems });
  };

  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { product: '', quantity: 1, price: 0, vat: '', total: '' }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedInvoice = {
      ...invoice,
      date: invoice.date?.split('T')[0],
      from_date: invoice.from_date?.split('T')[0],
      to_date: invoice.to_date?.split('T')[0],
      due_date: invoice.due_date?.split('T')[0],
      paid_on: invoice.status === 'paid' && invoice.paid_on ? invoice.paid_on?.split('T')[0] : null,
      payment_account: invoice.status === 'paid' ? invoice.payment_account : null,
    };

    try {
      if (id) {
        await axios.put(`${API_URL}/invoices/${id}`, formattedInvoice, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        });
        alert('Invoice updated');
        navigate('/accounts/Newinvoicelist')
      } 
      navigate('/accounts/Newinvoicelist');
    } catch (err) {
      console.error('Error submitting invoice:', err);
    }
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
              <p style={{ color: '#1C2B3A', fontWeight: 'bold' }}>Edit Invoice</p>
              <div>
                <CloseOutlinedIcon
                  style={{
                    fontSize: '30px',
                    color: 'white',
                    backgroundColor: 'tomato',
                    padding: '6px',
                    borderRadius: '6px',
                    marginRight: '5px'
                  }}
                  onClick={() => navigate('/accounts/Newinvoicelist')}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Invoice Details */}
              <div style={{ display: 'flex', gap: '30px', marginBottom: '10px', backgroundColor: '#D3D3D3', borderRadius: '10px', padding: '5px' }}>
                <div>
                  <label>Invoice Number</label>
                  <input name="invoice_number" value={invoice.invoice_number} onChange={handleChange} required />
                </div>
                <div>
                  <label>Customer Name</label>
                  <input name="customer_name" value={invoice.customer_name} onChange={handleChange} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ border: '1px solid #D3D3D3', padding: '10px', borderRadius: '5px' }}>
                  {['date', 'from_date', 'to_date', 'due_date'].map((field) => (
                    <div key={field} style={{ width: '400px', display: 'flex', alignItems: 'center' }}>
                      <label style={{ width: '100px' }}>{field.replace('_', ' ').toUpperCase()}</label>
                      <input type="date" name={field} value={invoice[field]} onChange={handleChange} required />
                    </div>
                  ))}
                </div>

                <div style={{ border: '1px solid #D3D3D3', padding: '10px', borderRadius: '5px' }}>
                  <div style={{ width: '400px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: '100px' }}>Status</label>
                    <select name="status" value={invoice.status} onChange={handleChange}>
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  {invoice.status === 'paid' && (
                    <>
                      <div style={{ width: '400px', display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: '100px' }}>Paid On</label>
                        <input type="date" name="paid_on" value={invoice.paid_on || ''} onChange={handleChange} />
                      </div>

                      <div style={{ width: '400px', display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: '100px' }}>Payment Account</label>
                        <select name="payment_account" value={invoice.payment_account} onChange={handleChange} required>
                          <option value="">-- Select Bank --</option>
                          <option value="HDFC">HDFC</option>
                          <option value="ICICI">ICICI</option>
                          <option value="SBI">SBI</option>
                          <option value="Cash">Cash</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Invoice Items */}
              <h3>Invoice Items</h3>
              {invoice.items.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <input name="product" placeholder="Product" value={item.product} onChange={(e) => handleItemChange(index, e)} />
                  <input name="quantity" type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
                  <input name="price" type="number" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(index, e)} />
                  <input name="vat" type="number" placeholder="VAT" value={item.vat} onChange={(e) => handleItemChange(index, e)} />
                  <input name="total" type="number" placeholder="Total" value={item.total} onChange={(e) => handleItemChange(index, e)} />
                  <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
              ))}

              <button type="button" className="nani" onClick={handleAddItem}>Add Item</button>
              <br /><br />
              <button type="submit" className="nani-submit">Save Invoice</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInvoice;