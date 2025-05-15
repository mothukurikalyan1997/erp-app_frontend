import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



const Incidentlog = () => {
    const token = localStorage.getItem('token')
    const company_id = localStorage.getItem('company_id')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')
    
    const [emp,setEmp] = useState([])
    const [inchistory,setInchistory] = useState([])
    
    const {id} = useParams();


    const [incident,setIncident] = useState({
        EmpID:"",
        employeename:"",
        incidentdate:"",
        inctype:"",
        incidentcat:"",
        actiontype:"",
        days:"",
        reportedby:"",
        remark:""
})

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIncident({
      ...incident,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`${API_URL}/emp/Incidentregister`,{incident},{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      })
      .then(window.location.reload()
      ).catch(error => console.log(error));
      
      }

      
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
            
            setIncident((prev)=>({
                ...prev,
                EmpID:empdata.EmpID || "",
                employeename:empdata.empfullname || ""
            }))  
          }
          
        )
          .catch(err=> console.log(err));
        },[])

        useEffect(()=>{
            const token = localStorage.getItem('token');
            axios.get(`${API_URL}/emp/incidenthistory/${id}`,{
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'company_id': company_id,
                  'role': role,
                  'email': email,
                }
              })
              .then((res) => {
                const empdata = res.data
                setInchistory(empdata);
                
              }
              
            )
              .catch(err=> console.log(err));
            },[])
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return format(date, 'dd-MMM-yyyy'); // Custom format to display 'YYYY-MM-DD'
              };

      const handleDelete = async(ids)=>{
        if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/emp/deleteinc/${id}/${ids}`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        });
        window.location.reload();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
      }

  return (
    <>
    <h1 style={{height:'fit-content',padding:'5px',color:'rgb(82, 82, 5)'}}>Incident Register</h1>
    <form action="" method="post" >
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>EMP Forign ID</label>
            <input type="text" name="empforginid" value={incident.EmpID} onChange={handleChange}  />
        </div>
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>EMP Name</label>
            <input type="text" name="employeename" value={incident.employeename} onChange={handleChange}  />
        </div>
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>Incident Date</label>
            <input type="date" name="incidentdate" value={incident.incidentdate} onChange={handleChange}  />
        </div>
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>Incident Type</label>
            <select name="inctype" value={incident.inctype} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="good" style={{color:'green'}}>Good Impression</option>
                    <option value="bad" style={{color:'red'}}>Bad Impression</option>
                </select>

        </div>
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>Incident Catagory</label>
            <select name="incidentcat" value={incident.incidentcat} onChange={handleChange}>
                    <option value="">Select Catagory</option>
                    <option value="personalhygiene">Personal Hygiene</option>
                    <option value="behaviour">Behaviour</option>
                    <option value="attendance">Attendance</option>
                    <option value="attendance">Performance</option>
                    <option value="attendance">Other</option>
                </select>

        </div>
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>Action Type</label>
            <select name="actiontype" value={incident.actiontype} onChange={handleChange}>
                    <option value="">Select Action</option>
                    <option value="warning">Warning</option>
                    <option value="suspend">Suspend</option>
                    <option value="termination">Termination</option>
                    <option value="nothing">Nothing</option>
                </select>

        </div>
        {(incident.actiontype === 'suspend') && <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>No. of days</label>
            <input type="text" name="days" value={incident.days} onChange={handleChange}  />
        </div>}

        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>Reported By</label>
            <select name="reportedby" value={incident.reportedby} onChange={handleChange}>
                    <option value=""> Choose Who Report this Incident?</option>
                    <option value="Self_Visit">Self Visiting</option>
                    <option value="Through Mail/Whatsapp">Through Client by Mail/Whatsapp</option>
                    <option value="Through Call from Clint">Through Client by Call</option>
                </select>

        </div>
        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <label htmlFor="" style={{width:'200px'}}>Remark's</label>
            <input type="text" name="remark" value={incident.remark} onChange={handleChange}  />
        </div>


        <div style={{width:'600px', display:'flex', alignItems:'center'}}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>


    </form>
<div>
<h2 style={{color:'blue',marginTop:'5px',textDecoration:'underline'}}>Incident History of {incident.empforginid}_{incident.employeename}</h2>
<div>
    <table className='dynamic-table'>
        <thead>
            <tr>
                <th>Incident Date</th>
                <th>Type</th>
                <th>Catagory</th>
                <th>Reported By</th>
                <th>Action</th>
                <th>Days</th>
                <th>Remark's</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {inchistory.map((e,id)=>{
                return (
                    <tr key={id}>
                        <td>{formatDate(e.incidentdate)}</td>
                        <td>{e.inctype}</td>
                        <td>{e.incidentcat}</td>
                        <td>{e.reportedby}</td>
                        <td>{e.actiontype}</td>
                        <td>{e.days}</td>
                        <td>{e.remark}</td>
                        <td><DeleteOutlineOutlinedIcon onClick={()=>handleDelete(e.id)}/></td>
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

export default Incidentlog
