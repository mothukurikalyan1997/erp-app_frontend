import React, { useEffect, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'


const AssetRegister = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

  const navigate = useNavigate();
  const [vendors,setVendors] = useState([])

  const [asset,setAsset] = useState({
    assettype:"",
    assetduration:"",
    assetid:"",
    assetname:"",
    buydate:"",
    vendor:"",
    amount:"",
    Status:""
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAsset({
      ...asset,
      [name]: type === "checkbox" ? checked : value,
    });
    };

    const handleSubmit = (e) => {

      e.preventDefault();

      if(!asset.assetid == ''){
        axios.post(`${API_URL}/asset/assetregister`,{asset},{
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
      }else{
        window.alert('Asset Id is Mandatory')
      }

    }

    useEffect(()=>{
      const token = localStorage.getItem('token');
      axios.get(`${API_URL}/partner/consumer`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'company_id': company_id,
          'role': role,
          'email': email,
        }
      })
        .then(res => setVendors(res.data))
        .catch(err=> console.log(err));
    },[])

    
  return (
    <>
    <Navbar/>
    <div className="full-container">
        <div className="side-container">
            <Sidenav/>
        </div>
        <div className="actual-container">
            <div className="white-box">
            <h1 style={{height:'fit-content',padding:'5px'}}>Asset Register</h1>
            <button type="" onClick={()=>(navigate('/assetmanagement'))}>Back</button>
            <form action="" method="post" onSubmit={handleSubmit}>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset Type</label>
                <select name="assettype" value={asset.assettype} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Own">Own</option>
                    <option value="Lease">Lease</option>
                    <option value="Temporory">Temporory</option>
                </select>
            </div>
          {(asset.assettype == "Lease" || asset.assettype == "Temporory") && 
          <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Lease/Temp Duration Days</label>
                <input type="number" name="assetduration" value={asset.assetduration} onChange={handleChange}  />
            </div>
            
            }
            
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset ID</label>
                <input type="text" name="assetid" value={asset.assetid} onChange={handleChange}  />
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset Name</label>
                <select name="assetname" value={asset.assetname} onChange={handleChange}>
                    <option value="">Select Name</option>
                    <option value="Bike">Bike</option>
                    <option value="Car">Car</option>
                    <option value="EV">Electric Vehicle</option>
                    <option value="SimCard">Sim Card</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Helmet">Helmet</option>
                    <option value="SafetyKit">safety Kit</option>
                    <option value="Bag">Bag</option>
                    <option value="Pouch">Pouch</option>
                </select>
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset Buy Date</label>
                <input type="date" name="buydate" value={asset.buydate} onChange={handleChange}  />
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Buy From</label>
                <select name="vendor" value={asset.vendor} onChange={handleChange}>
                  {vendors.filter((item)=>item.type.includes('Vendor')).map((e)=>(
                    <option>{e.displayName}</option>
                  ))}
                </select>
            </div>

            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Amount</label>
                <input type="number" name="amount" value={asset.amount} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Status</label>
                <input type="text" name="Status" value="Active" disabled  />
            </div>
            <div className='mk' style={{width:'500px', display:'flex', alignItems:'center',alignContent:'center',justifyContent:'space-between'}}>
                <button type="submit">Register</button>
                
            </div>
                


       </form>


            </div>
        </div>
    </div>
    </>
  )
}

export default AssetRegister
