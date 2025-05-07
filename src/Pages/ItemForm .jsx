import React, { useEffect, useState } from 'react'
import {API_URL} from '../data/Data/'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidenav from '../Components/Sidenav';


const ItemForm  = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  
    const [item,setItem] = useState([])

    const [formData, setFormData] = useState({
      itemcode: "",
      itemname:"",
      itemtype: "",
      buyingcost: "",
      sellingprice:"",
      Remark:""
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


const handleSubmit = (e) => {
e.preventDefault();
axios.post(`${API_URL}/item/item`,{formData},{
  headers:{
    'Authorization': `Bearer ${token}`,
    'company_id': company_id,
    'role': role,
    'email': email,
  }
})
.then(response => {console.log(response);
    window.location.reload()

}
).catch(error => console.log(error));

}

useEffect(()=>{
axios.get(`${API_URL}/item/itemdata`,{
  headers:{
    'Authorization': `Bearer ${token}`,
    'company_id': company_id,
    'role': role,
    'email': email,
  }
})
.then(res => setItem(res.data))
.catch(err=> console.log(err));
},[])

const handledelete = async (ID) => {
    const text = window.confirm("are you Sure?");
    if(text == true){
        const ntext = window.confirm("This data will completely deleted?")
        if(ntext == true){
            try {
                await axios.delete(`${API_URL}/item/itemdel/`+ID,{
                  headers:{
                    'Authorization': `Bearer ${token}`,
                    'company_id': company_id,
                    'role': role,
                    'email': email,
                  }
                });
                // console.log(email);
                window.location.reload()
            }catch(err) {
                console.log(err);
            }
    
        }
    }

  };



    return (
        
        <>
        <Navbar/>
        <div className='full-container'>
          <div className='side-container'>
            <Sidenav/>
          </div>
          <div className='actual-container'>
            <div className='white-box'>
            <div className="form-container">
          <form onSubmit={handleSubmit} className="bank-form">
    
            <input
              type="text"
              name="itemcode"
              value={formData.itemcode}
              onChange={handleChange}
              placeholder="Item Code"
              
            />
            <input
              type="text"
              name="itemname"
              value={formData.itemname}
              onChange={handleChange}
              placeholder="Item Name"
              required
            />
            <select value={formData.itemtype} name="itemtype" onChange={handleChange}>Item Type
                <option></option>
                <option>Day</option>
                <option>Pcs</option>
                <option>Box</option>
                <option>Digital</option>
            </select>
            <input
              type="text"
              name="buyingcost"
              value={formData.buyingcost}
              onChange={handleChange}
              placeholder="Buying Price"
              required
            />
            <input
              type="text"
              name="sellingprice"
              value={formData.sellingprice}
              onChange={handleChange}
              placeholder="Selling Price"
              required
            />
            <input
              type="text"
              name="Remark"
              value={formData.Remark}
              onChange={handleChange}
              placeholder="Remark(s)"
              required
            />
            <button type="submit">Submit</button>
          </form>
    
          <div className='box'>
    <div style={{height: '400px', overflowY: 'auto', border: '1px solid #ccc'}}>
      <table className='dynamic-table'>
       <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}> 
        <tr>
        <th>Item Code</th>
        <th>Item Name</th>
        <th>Item Type</th>
        <th>Buy</th>
        <th>Sell</th>
        <th>Remark</th>
        <th>Action</th>

        </tr>
       </thead>
       <tbody>
        {item.map((e,i)=>{
            return(
            <tr key={i}>
              <td>{e.itemcode}</td>
              <td>{e.itemname}</td>
              <td>{e.itemtype}</td>
              <td>{e.buyingcost}</td>
              <td>{e.sellingprice}</td>
              <td>{e.Remark}</td>
            <td><Link to={`/`}></Link>
            <button className='btn' onClick = {data => handledelete(e.itemcode)}>Delete</button></td>
            {/* <button className='btn' onClick = {data => handledelete(e.email)}><DeleteIcon className='icon'/></button></td> */}
            </tr>
            
        )
        })}
       </tbody>
      </table>
    </div>
</div>
        </div>

            </div>
  
          </div>
        </div>
        </>
          );
}

export default ItemForm 
