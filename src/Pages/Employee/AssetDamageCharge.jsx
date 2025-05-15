import axios from 'axios';
import {API_URL} from '../../data/Data'
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useNavigate ,Link, useParams} from 'react-router-dom';

const AssetDamageCharge = () => {

    const token = localStorage.getItem('token')
    const company_id = localStorage.getItem('company_id')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')
  
    const {id} = useParams();

    const [images,setImages] = useState([])
    const [vacation,setVacation] = useState([])

    const [damage, setDamage] = useState({
        empID:"",
        employeename:"",
        deductcat:"",
        date:"",
        dmginv:"",
        amt:"",
        remark:""
    
    });
    
    const handleChange = (e) => {
    const { name, value, type, checked} = e.target;

    setDamage({
        ...damage,
        [name]: type === "checkbox" ? checked : value,
      });
    };

    const DeductDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'MMMM-yyyy'); // Custom format to display 'YYYY-MM-DD'
      };


    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        // const formData = new FormData();

        //     formData.append("empID", empID);
        //     formData.append("empfullname", empfullname);
        //     formData.append("deductcat", deductcat);
        //     formData.append("date", DeductDate(date));
        //     formData.append("dmginv", dmginv);
        //     formData.append("amt", amt);
        //     formData.append("remark", remark);

        // console.log(DeductDate(date));

        axios.post(`${API_URL}/asset/damageasset`,damage,{
            headers:{
              'Authorization': `Bearer ${token}`,
              'company_id': company_id,
              'role': role,
              'email': email,
            }
          })
        .then(response => {
            // navigate('/employeetable')
            window.location.reload()
        }
        ).catch(error => console.log(error));
        
        }

            useEffect(() => {
              axios.get(`${API_URL}/asset/damageassetdata/${id}`,{
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'company_id': company_id,
                  'role': role,
                  'email': email,
                }
              })
                .then(res => {setImages(res.data);  
                }
            
            )

                .catch(err => console.error(err));
            }, []);

              useEffect(()=>{
                axios.get(`${API_URL}/emp/employeepenalty/${id}`,{
                  headers:{
                    'Authorization': `Bearer ${token}`,
                    'company_id': company_id,
                    'role': role,
                    'email': email,
                  }
                })
                  .then((res) => {
                    const empdata = res.data[0]
                    setDamage((prev)=>({
                        ...prev,
                        empID:empdata.EmpID || "",
                        employeename:empdata.empfullname || ""
                    }))  
                  }
                  
                )
                  .catch(err=> console.log(err));
                },[])

    
  return (
    <>
        <h1 style={{height:'fit-content',padding:'5px'}}>Other Charges (Deduction from Emp) </h1>
        <form action="" method="post" >
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP ID</label>
                <input type="text" name="empID" value={damage.empID} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP Full Name</label>
                <input type="text" name="employeename" value={damage.employeename}  onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Deduction Catogory</label>
                <select name="deductcat" onChange={handleChange} value={damage.deductcat} >
                    <option value="">Select Catogory</option>
                    <option value="AssetDamageCharge" >Asset Damage Charge</option>
                    <option value="SalaryAdvance" >Salary Advance</option>
                    <option value="ExtraUsage" >Exra Usage</option>
                    <option value="TrafficFine" >Traffic Fine</option>
                    <option value="OtherFine" >Other Fines</option>
                    <option value="Salik" >Salik</option>
                    <option value="TrainingCost" >Training Cost</option>
                    <option value="Penalty" >Penalty</option>
                    <option value="Reimbursement" >Reimbursement</option>
                </select>
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Date</label>
                <input type="date" name="date"  onChange={handleChange} value={damage.date} />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Invoice/Reference No.</label>
                <input type="text" name="dmginv"  onChange={handleChange} value={damage.dmginv} />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Amount</label>
                <input type="text" name="amt"  onChange={handleChange} value={damage.amt} />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Remark's</label>
                <input type="text" name="remark"  onChange={handleChange} value={damage.remark} />
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>

       </form>


    <div>
        <h2 style={{color:'red',marginTop:'5px'}}>Deduction History</h2>
        <div>
            <table className='dynamic-table'>
                <thead>
                    <tr>
                        <th>Deduction Date</th>
                        <th>Deduction Amount</th>
                        <th>Emp Name</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {images && images.map((e,i)=>{
                        return (
                            <tr key={i}>
                                <td>{e.deductMonth}</td>
                                <td>{e.amt}</td>
                                <td>{e.empFullName}</td>
                                <td>{e.remark}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default AssetDamageCharge
