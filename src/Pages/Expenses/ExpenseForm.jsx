import React, { useState, useEffect } from 'react';
import {API_URL} from '../../data/Data'
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Sidenav from '../../Components/Sidenav';
import { useNavigate } from 'react-router-dom';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const ExpenseForm = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [bank, setBank] = useState([]);

  const [bill, setBill] = useState({
    plDate: '',
    vendor: '',
    reference: '',
    expcat: '',
    forWhom: '' || null
  });

  const [items, setItems] = useState([
    { EmpID: '',category: '', amount: '', vat: '', bank: '', actpaydate: '' ,deduct: false, salaryMonth: '', year: '', status: '' },
  ]);

  useEffect(() => {
    axios.get(`${API_URL}/partner/consumer`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => setVendor(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/bank/bank/data`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => setBank(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updated = [...items];
    updated[index][name] = type === 'checkbox' ? checked : value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {EmpID:'', category: '', amount: '', vat: '', bank: '',actpaydate:'', deduct: false, salaryMonth: '', year: '', status: '' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${API_URL}/api/expenses`, { bill, items },{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      });
      alert('Expense submitted!');
      navigate('/purchase/expensetable')
    } catch (err) {
      console.error(err);
      alert('Submission failed');
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
            <div style={{ padding: '20px' }}>

  {/* Top Icon and Search bar */}
  <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',height:'60px'}}>
            <div>
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>New Expense</p>
            </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>

            <div >
              <CloseOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: 'tomato', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={() => navigate('/purchase/expensetable')}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}

              <form onSubmit={handleSubmit}>

      <div style={{display:'flex',gap:'30px'}}>
      <div style={{border:'1px solid #D3D3D3',borderRadius:'5px',padding:'10px'}}>
      <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>P&L Date:</label>
                  <input type="date" name="plDate" onChange={handleBillChange} required />
                </div>

                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>Vendor:</label>
                  <select name="vendor" onChange={handleBillChange} required>
                    <option value="">Select Account Vendor name</option>
                    {vendor.filter((e)=>e.type === 'Vendor').map((e, i) => (
                      <option key={i} value={e.displayName}>{e.displayName}</option>
                    ))}
                  </select>
                </div>

                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>Reference Number:</label>
                  <input type="text" name="reference" onChange={handleBillChange} required />
      </div>

    </div>
    <div style={{border:'1px solid #D3D3D3',borderRadius:'5px',padding:'10px'}}>
      <div style={{ width: '600px', display: 'flex', alignItems: 'center'}}>
                  <label style={{ width: '200px' }}>Expense Catagory</label>
                  <select name="expcat" id="" onChange={handleBillChange} required>
                      <option value="">Select Category</option>
                      <option value="IT & Software">IT & Software</option>
                      <option value="Transport">Transport</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Salaries and Wages">Salaries and Wages</option>
                      <option value="Employee Benefits">Employee Benefits</option>
                      <option value="Office & Administrative Expenses">Office & Administrative Expenses</option>
                      <option value="Travel & Entertainment">Travel & Entertainment</option>
                      <option value="Marketing & Advertising">Marketing & Advertising</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Training & Development">Training & Development</option>
                      <option value="Miscellaneous Expenses">Miscellaneous Expenses</option>
                  </select>
                </div>

                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>For Whom (Employee ID Only):</label>
                  <input type="number" name="forWhom" onChange={handleBillChange} />
                </div>


    </div>

      </div>

                <h3>Line Items</h3>
                {items.map((item, index) => {
                  const itemAmount = parseFloat(item.amount) || 0;
                  const itemVAT = parseFloat(item.vat) || 0;
                  const itemTotal = itemAmount + itemVAT;

                  return (
                    <div key={index}  className='nani-form'>
                        <div>
                        <input name="category" type="text" placeholder="Expense Item" onChange={(e) => handleItemChange(index, e)} required />

<input name="amount" type="number" placeholder="Amount" onChange={(e) => handleItemChange(index, e)} required />

<input name="vat" type="number" placeholder="VAT Amount" onChange={(e) => handleItemChange(index, e)} />

<select name="bank" onChange={(e) => handleItemChange(index, e)} required>
  <option value="">Select Bank</option>
  {bank.map((b, i) => (
    <option key={i} value={b.accountHolder}>{b.accountHolder}</option>
  ))}
</select>
<label htmlFor="">Actual Payment Date</label>
<input name="actpaydate" type="date"  onChange={(e) => handleItemChange(index, e)} />



 </div>
<div>
<label>
  Deduct from Employee?
  <input type="checkbox" name="deduct" onChange={(e) => handleItemChange(index, e)} />
</label>
{item.deduct && (
                        <div style={{ marginTop: '10px' }}>
                          <label>Deduction Month:</label>
                          <select name="salaryMonth" onChange={(e) => handleItemChange(index, e)} required>
                            <option value="">Select Month</option>
                            {[
                              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ].map(month => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>

                          <label style={{ marginLeft: '10px' }}>Year:</label>
                          <input type="number" name="year" placeholder="e.g. 2025" onChange={(e) => handleItemChange(index, e)} required />

                          <label style={{ marginLeft: '10px' }}>Deduction Status:</label>
                          <select name="status" onChange={(e) => handleItemChange(index, e)} required>
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                          </select>
                          <label style={{ marginLeft: '10px' }}>Emp File#:</label>
                          <input type="number" name="EmpID" onChange={(e) => handleItemChange(index, e)}/>
                        </div>
                      )}

</div>

                      <p><strong>Item Total:</strong> AED {itemTotal.toFixed(2)}</p>
                    </div>
                  );
                })}

                <button onClick={addItem} className='nani'>+ Add Item</button>
                <h3>Grand Total</h3>
<p>
  <strong>Total of All Items (Amount + VAT Amount):</strong>{' '}
  AED {
    items.reduce((sum, item) => {
      const amt = parseFloat(item.amount) || 0;
      const vat = parseFloat(item.vat) || 0;
      return sum + amt + vat;
    }, 0).toFixed(2)
  }
</p>

<br />

                <br /><br />
                <button type="submit" className="nani">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;