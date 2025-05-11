import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar';
import Sidenav from '../../Components/Sidenav';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const VacationRegister = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

    const {id} = useParams();

    const [emp,setEmp] = useState([])
    const [vhistory,setVhistory] = useState([])
    const [days, setDays] = useState(0);

                const [vacation, setVacation] = useState({
                    EmpID:"",
                    empfullname:"",
                    vacationstart:"",
                    vacationend:"",
                    comment:""

              });
            
              const handleChange = (e) => {
                const { name, value, type, checked } = e.target;
                setVacation({
                  ...vacation,
                  [name]: type === "checkbox" ? checked : value,
                });
              };

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
                    setEmp(empdata);
                    
                    setVacation((prev)=>({
                        ...prev,
                        EmpID:empdata.EmpID || "",
                        empfullname:empdata.empfullname || ""
                    }))  
                  }
                  
                )
                  .catch(err=> console.log(err));
                },[])

                const navigate = useNavigate();

                const handleSubmit = (e) => {
                    e.preventDefault();
                    axios.post(`${API_URL}/emp/vacationregister`,{vacation},{
                      headers:{
                        'Authorization': `Bearer ${token}`,
                        'company_id': company_id,
                        'role': role,
                        'email': email,
                      }
                    })
                    .then(response => {
                        window.location.reload()
                    }
                    ).catch(error => console.log(error));
                    
                    }

                    useEffect(()=>{
                      const token = localStorage.getItem('token');
                      axios.get(`${API_URL}/emp/vacationhistory/${id}`,{
                        headers:{
                          'Authorization': `Bearer ${token}`,
                          'company_id': company_id,
                          'role': role,
                          'email': email,
                        }
                      })
                        .then((res) => {
                          const empdata = res.data
                          setVhistory(empdata);
                          
                        }
                        
                      )
                        .catch(err=> console.log(err));
                      },[])
                       
                      useEffect(() => {
                        if (vacation.vacationstart && vacation.vacationend) {
                          const start = new Date(vacation.vacationstart);
                          const end = new Date(vacation.vacationend);
                    
                          const timeDiff = end.getTime() - start.getTime();
                          const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    
                          setDays(dayDiff > 0 ? dayDiff : 0);
                        }
                      }, [vacation.vacationstart, vacation.vacationend]);

              const formatDate = (dateString) => {
                const date = new Date(dateString);
                return format(date, 'dd-MMM-yyyy'); // Custom format to display 'YYYY-MM-DD'
              };
      
    
      return (
        <>
            <h1 style={{height:'fit-content',padding:'5px',color:'rgb(82, 82, 5)'}}>Vacation Register</h1>
            <form action="" method="post" >
                <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                    <label htmlFor="" style={{width:'200px'}}>EMP Forign ID</label>
                    <input type="text" name="empforginid" value={vacation.EmpID} onChange={handleChange}  />
                </div>
                <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                    <label htmlFor="" style={{width:'200px'}}>EMP Full Name</label>
                    <input type="text" name="empfullname" value={vacation.empfullname} onChange={handleChange}  />
                </div>
                <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                    <label htmlFor="" style={{width:'200px'}}>Vacation Start</label>
                    <input type="date" name="vacationstart" value={vacation.vacationstart} onChange={handleChange}  />
                </div>
                <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                    <label htmlFor="" style={{width:'200px'}}>Vacation End</label>
                    <input type="date" name="vacationend" value={vacation.vacationend} onChange={handleChange}  />
                </div>
                <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                    <label htmlFor="" style={{width:'200px'}}>Total Days:</label>
                    <input type="text" value={days} readOnly   />
                </div>
                
                <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                    <label htmlFor="" style={{width:'200px'}}>Comment</label>
                    <input type="text" name="comment" value={vacation.comment} onChange={handleChange}  />
                </div>
    
    
                <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
    
    
            </form>
    <div>
        <h2 style={{color:'red',marginTop:'5px'}}>Vacation History</h2>
        <div>
            <table className='dynamic-table'>
                <thead>
                    <tr>
                        <th>Vacation Start</th>
                        <th>Vacation End</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {vhistory.map((e,i)=>{
                        return (
                            <tr key={i}>
                                <td>{formatDate(e.vacationstart)}</td>
                                <td>{formatDate(e.vacationend)}</td>
                                <td>{e.comment}</td>
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

export default VacationRegister
