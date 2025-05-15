import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeSalary = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

      const [bank,setBank] = useState([])

        const [salary, setSalary] = useState({
            month:'',
            year:'',
            empID:'',
            empname:'',
            presentdays:'',
            offdays:'',
            sickleave:'',
            totalworkingdays:'',
            grosssalary:'',
            remark:'',
            paid_through:''
          });
        
          const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setSalary({
              ...salary,
              [name]: type === "checkbox" ? checked : value,
            });
          };
    
          const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!salary.month == ' '){
          axios.post(`${API_URL}/sal/salaryregister`,{salary},{
            headers:{
              'Authorization': `Bearer ${token}`,
              'company_id': company_id,
              'role': role,
              'email': email,
            }
          })
          .then(response => {
              navigate('/employee/employeesaltable')
          }
          ).catch(error => console.log(error));
        }
        else{
          window.alert("Month is Mandatory")
        }        
}

useEffect(()=>{
const token = localStorage.getItem('token');
axios.get(`${API_URL}/bank/bank/data`,{
  headers:{
    'Authorization': `Bearer ${token}`,
    'company_id': company_id,
    'role': role,
    'email': email,
  }
})
  .then(res => setBank(res.data))
  .catch(err=> console.log(err));
},[])



  return (
    <>
    <Navbar />
    <div  className='full-container'>
      <div className='side-container'>
        <Sidenav />
      </div>
      <div  className='actual-container'>
        <div className="white-box">
          <h1>Employee Salary Register</h1>
          <button className='Cancel' onClick={()=>navigate('/employee/employeesaltable')}>X</button>

        <form action="" method="post" >
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Salary Month</label>
                <input type="text" name="month" onChange={handleChange} value={salary.month} placeholder='Ex: Jan/Feb/Mar/Apr' required/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Salary Year</label>
                <input type="text" name="year" onChange={handleChange} placeholder='Ex: 2025' value={salary.year}/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP ID</label>
                <input type="text" name="empID" onChange={handleChange}  value={salary.empID}/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP Name</label>
                <input type="text" name="empname" onChange={handleChange} value={salary.empname} />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Present Days</label>
                <input type="text" name="presentdays" onChange={handleChange}  value={salary.presentdays}/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Day Off Days</label>
                <input type="text" name="offdays" onChange={handleChange}  value={salary.offdays}/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Sick Leave Days</label>
                <input type="text" name="sickleave" onChange={handleChange}  value={salary.sickleave}/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Total working Days</label>
                <input type="text" name="totalworkingdays" onChange={handleChange} value={salary.totalworkingdays} />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Gross Salary</label>
                <input type="text" name="grosssalary" onChange={handleChange} value={salary.grosssalary} />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Remark's</label>
                <input type="text" name="remark" onChange={handleChange}  value={salary.remark}/>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Paid_through</label>
                <select name="paid_through" onChange={handleChange} value={salary.paid_through}>
                  {bank.map((e,i)=>(
                    <option value={e.accountHolder} key={i}>{e.accountHolder}</option>
                  ))}
                </select>
            </div>


            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>

       </form>

        </div>
        </div>
        </div>
    </>
  )
}

export default EmployeeSalary
