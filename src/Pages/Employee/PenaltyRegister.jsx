import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import Sidenav from '../../Components/Sidenav';
import Navbar from '../../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';


const PenaltyRegister = () => {
    const token = localStorage.getItem('token')
    const company_id = localStorage.getItem('company_id')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')
    
    const {id} = useParams();

    const [emp,setEmp] = useState([])
    const [phistory,setPhistory] = useState([])

const [penalty, setPenalty] = useState({
    EmpID:"",
    empfullname:"",
    penaltydate:"",
    penaltydays:"",
    reason:""

});

const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setPenalty({
  ...penalty,
  [name]: type === "checkbox" ? checked : value,
});
};

useEffect(()=>{
    const token = localStorage.getItem('token');
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
        setPenalty((prev)=>({
            ...prev,
            EmpID:empdata.EmpID || "",
            empfullname:empdata.empfullname || ""
        }))  
      }
      
    )
      .catch(err=> console.log(err));
    },[])

useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/emp/penaltyhistory/${id}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      })
      .then((res) => {
        const empdata = res.data
        setPhistory(empdata);
        console.log(empdata) 
      }
      
    )
      .catch(err=> console.log(err));
    },[])


const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/emp/Penaltyregister`,{penalty},{
            headers:{
              'Authorization': `Bearer ${token}`,
              'company_id': company_id,
              'role': role,
              'email': email,
            }
          })
        .then(response => {console.log(response);
            navigate('/employeetable')
        }
        ).catch(error => console.log(error));
        
}
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return format(date, 'dd-MMM-yyyy'); // Custom format to display 'YYYY-MM-DD'
        };
      

  return (
    <>
        <h1 style={{height:'fit-content',padding:'5px'}}>Penalty Register</h1>
        <form action="" method="post" >
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP Forign ID</label>
                <input type="text" name="empforginid" value={penalty.EmpID} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>EMP Full Name</label>
                <input type="text" name="empfullname" value={penalty.empfullname} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Penalty Date</label>
                <input type="date" name="penaltydate" value={penalty.penaltydate} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>No. Days</label>
                <input type="text" name="penaltydays" value={penalty.penaltydays} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Reason</label>
                <input type="text" name="reason" value={penalty.reason} onChange={handleChange}  />
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>

       </form>
    <div>
        <h2 style={{color:'red',marginTop:'5px'}}>Penalty History</h2>
        <div>
            <table className='dynamic-table'>
                <thead>
                    <tr>
                        <th>Penalty Date</th>
                        <th>No. Of Days</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {phistory.map((e,i)=>{
                        return (
                            <tr key={i}>
                                <td>{formatDate(e.penaltydate)}</td>
                                <td>{e.penaltydays}</td>
                                <td>{e.reason}</td>
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

export default PenaltyRegister

// (
//     <tr key={i}>
//         <td>{e.penaltydate}</td>
//         <td>{e.penaltydays}</td>
//         <td>{e.reason}</td>
//     </tr>
// )
