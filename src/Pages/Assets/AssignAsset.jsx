import axios from 'axios';
import {API_URL} from '../../data/Data'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AssignAsset = () => {
    const {id} = useParams();
    const [emp,setEmp] = useState([])
    const [asset,setAsset] = useState([])

    const token = localStorage.getItem('token')
    const company_id = localStorage.getItem('company_id')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')


    const navigate = useNavigate()
    const [assign, setAssign] = useState({
        type:"",
        assetid:"",
        assetname:"",
        assigndate:"",
        assignto:"",
        remark:""
    });
    
    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAssign({
      ...assign,
      [name]: type === "checkbox" ? checked : value,
    });
    };

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`${API_URL}/asset/assetlog`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
          .then(res => {setAsset(res.data)
            
          })
          .catch(err=> console.log(err));
        },[])
    

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`${API_URL}/asset/assetactions/${id}`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
          .then((res) => {
            const empdata = res.data[0]
           
            setAssign((prev)=>({
                ...prev,
                assetid:empdata.assetid || "",
                assetname:empdata.assetname || ""
            }))  
          }
          
        )
          .catch(err=> console.log(err));
        },[])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`${API_URL}/emp/empdata`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
          .then(res => setEmp(res.data))
          .catch(err=> console.log(err));
        },[])
    
        const handleSubmit = (e) => {

            e.preventDefault();
            axios.post(`${API_URL}/asset/assetactions/${id}`,{assign},{
              headers:{
                'Authorization': `Bearer ${token}`,
                'company_id': company_id,
                'role': role,
                'email': email,
              }
            })
            .then(response => {
              navigate('/assetmanagement')
            }
          ).catch(error => console.log(error));
      
          }

const assetlastStatus = asset.filter(item => item.assetid === id).reverse()[0]
const finalstatus = assetlastStatus ? assetlastStatus.type :null
      
  return (
    <>
    <p style={{height:'fit-content',padding:'5px',fontWeight:'bold',textDecoration:'underline'}}>Assign Asset</p>
    <form action="" method="post" >
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Type</label>
                <select name="type" value={assign.type} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Assign">Assign Asset</option>
                </select>
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset ID</label>
                <input type="text" name="assetid" value={assign.assetid} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset Name</label>
                <input type="text" name="assetname" value={assign.assetname} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Assign Date</label>
                <input type="date" name="assigndate" value={assign.assigndate} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Assign To</label>
                <select name="assignto" value={assign.assignto} onChange={handleChange}>
                    <option value="">Select Employee</option>
                    {emp.map((e,i)=>(
                        <option key={i} value={e.EmpID}>{e.EmpID}_{e.empfullname}</option>
                    ))}
                </select>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Remark's</label>
                <input type="text" name="remark" value={assign.remark} onChange={handleChange}  />
            </div>

            <div style={{width:'500px', display:'flex', alignItems:'center',alignContent:'center',justifyContent:'space-between'}}>
                <button type="submit" onClick={handleSubmit}>Assign</button>
            </div>

       </form>
         <div>
             <table className='dynamic-table'>
                <thead>
                    <tr>
                        <th>Asset ID</th>
                        <th>Asset Name</th>
                        <th>Status</th>
                        <th>Log Date</th>
                        <th>Emp ID</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {asset.filter((f)=>f.assetid == id).map((e,i)=>(
                        <tr key={i}>
                            <td>{e.assetid}</td>
                            <td>{e.assetname}</td>
                            <td>{e.type}</td>
                            <td>{e.logdate}</td>
                            <td>{e.empid}</td>
                            <td>{e.remark}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
          </div>
    </>
  )
}

export default AssignAsset
