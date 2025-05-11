import React, { useState, useEffect, useMemo } from 'react';
import {API_URL} from '../../data/Data'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Sidenav from '../../Components/Sidenav';

const ExpenseEditor = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
  const navigate = useNavigate();
  const { id } = useParams();

  const [vendorList, setVendorList] = useState([]);
  const [bankList, setBankList] = useState([]);

  const [bill, setBill] = useState({
    plDate: '',
    vendor: '',
    reference: '',
    expcat:'',
    forWhom: '' || null
  });

  const [items, setItems] = useState([
    { category: '', amount: '', vat: '', bank: '', actpaydate:'',deduct: false, salaryMonth: '', year: '', EmpID: '',status: '' },
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
      .then(res => setVendorList(res.data))
      .catch(err => console.log(err));

    axios.get(`${API_URL}/bank/bank/data`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
      .then(res => setBankList(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBill((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updated = [...items];
    updated[index][name] = type === 'checkbox' ? checked : value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { category: '', amount: '', vat: '', bank: '',actpaydate:'', deduct: false, salaryMonth: '', year: '', status: '' }]);
  };

  const fetchExpenseForEdit = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/expenses/${id}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      });
      console.log(res)
      const { bill: fetchedBill, items: fetchedItems } = res.data;
      setBill({
        plDate: fetchedBill.pl_date?.split('T')[0] || '',
        vendor: fetchedBill.vendor || '',
        reference: fetchedBill.reference || '',
        expcat: fetchedBill.exp_cat || '',        
        forWhom: fetchedBill.forWhom || ''
      });
      setItems(
        fetchedItems.map((item) => ({
          category: item.category || '',
          amount: item.amount || '',
          vat: item.vat || '',
          bank: item.bank || '',
          actpaydate: item.act_paydate || '',
          deduct: item.deduct_from_employee === 1,
          salaryMonth: item.salary_month || '',
          year: item.year || '',
          EmpID: item.EmpID || '',
          status: item.status || '',
        }))
      );
    } catch (err) {
      console.error('Error loading expense for editing:', err);
      alert('Failed to load expense');
    }
  };

  useEffect(() => {
    if (id) fetchExpenseForEdit();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_URL}/api/expenses/${id}`, { bill, items },{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        });
        alert('Expense updated!');
      } else {
        await axios.post(`${API_URL}/api/expenses`, { bill, items },{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        });
        alert('Expense submitted!');
      }
      navigate('/purchase/expensetable');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  const totals = useMemo(() => {
    let amount = 0, vat = 0, deduction = 0;
    items.forEach((item) => {
      const a = parseFloat(item.amount) || 0;
      const v = parseFloat(item.vat) || 0;
      amount += a;
      vat += v;
      if (item.deduct) deduction += a;
    });
    return {
      amount: amount.toFixed(2),
      vat: vat.toFixed(2),
      employeeDeduction: deduction.toFixed(2),
    };
  }, [items]);

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
              <h2>{id ? 'Edit Expense' : 'New Expense Entry'}</h2>
              <form onSubmit={handleSubmit}>
                <h3>Expense Bill</h3>
                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>P&L Date:</label>
                  <input type="date" name="plDate" value={bill.plDate} onChange={handleBillChange} required />
                </div>
                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>Vendor:</label>
                  <select name="vendor" value={bill.vendor} onChange={handleBillChange} required>
                    <option value="">Select Vendor</option>
                    {vendorList.map((v, i) => (
                      <option key={i} value={v.displayName}>{v.displayName}</option>
                    ))}
                  </select>
                </div>
                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>Reference Number:</label>
                  <input type="text" name="reference" value={bill.reference} onChange={handleBillChange} required />
                </div>
                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>Expense Catagory</label>
                  <input type="text" name="expcat" value={bill.expcat} onChange={handleBillChange} required />
                </div>
                <div style={{ width: '600px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '200px' }}>For Whom (Employee ID):</label>
                  <input type="number" name="forWhom" value={bill.forWhom} onChange={handleBillChange} />
                </div>

                <h3>Line Items</h3>
                {items.map((item, index) => (
                  <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <input name="category" type="text" placeholder="Expense Category" value={item.category} onChange={(e) => handleItemChange(index, e)} required />
                    <input name="amount" type="number" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, e)} required />
                    <input name="vat" type="number" placeholder="VAT Amount" value={item.vat} onChange={(e) => handleItemChange(index, e)} />
                    <select name="bank" value={item.bank} onChange={(e) => handleItemChange(index, e)} required>
                      <option value="">Select Bank</option>
                      {bankList.map((b, i) => (
                        <option key={i} value={b.accountHolder}>{b.accountHolder}</option>
                      ))}
                    </select>
                    <label htmlFor="">Actual Payment Date</label>
                    <input name="actpaydate" type="date"  value={item.actpaydate} onChange={(e) => handleItemChange(index, e)} required />
                    <label>
                      Deduct from Employee?
                      <input type="checkbox" name="deduct" checked={item.deduct} onChange={(e) => handleItemChange(index, e)} />
                    </label>
                    {item.deduct && (
                      <div style={{ marginTop: '10px' }}>
                        <label>Salary Month:</label>
                        <select name="salaryMonth" value={item.salaryMonth} onChange={(e) => handleItemChange(index, e)} required>
                          <option value="">Select Month</option>
                          {[
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                          ].map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>

                        <label style={{ marginLeft: '10px' }}>Year:</label>
                        <input type="number" name="year" placeholder="e.g. 2025" value={item.year} onChange={(e) => handleItemChange(index, e)} required />

                        <label style={{ marginLeft: '10px' }}>Deduction Status:</label>
                        <select name="status" value={item.status} onChange={(e) => handleItemChange(index, e)} required>
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                        </select>
                        <label style={{ marginLeft: '10px' }}>Emp File#:</label>
                        <input type="number" name="EmpID" id="" value={item.EmpID} onChange={(e) => handleItemChange(index, e)}/>
                      </div>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addItem}>+ Add Item</button>

                <h3>Totals</h3>
                <p><strong>Total Amount:</strong> AED {totals.amount}</p>
                <p><strong>Total VAT:</strong> AED {totals.vat}</p>
                <p><strong>Total Deducted from Employee:</strong> AED {totals.employeeDeduction}</p>

                <button type="submit" className="nani">{id ? 'Update' : 'Submit'}</button>
                <button type="button" className="nani-cancel" onClick={() => navigate('/purchase/expensetable')}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseEditor;