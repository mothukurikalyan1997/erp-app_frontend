import React, { useState } from 'react'

const AssetTransfer = () => {
      const [transfer, setTransfer] = useState({
        assetid:"",
        assetname:"",
        assetfrom:"",
        reason:""
      });
      
      const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setAssign({
        ...transfer,
        [name]: type === "checkbox" ? checked : value,
      });
      };
  
  return (
    <>
    <p style={{height:'fit-content',padding:'5px',fontWeight:'bold',textDecoration:'underline'}}>Asset Withdraw</p>
    <form action="" method="post" >
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset ID</label>
                <input type="text" name="assetid" value={transfer.assetid} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset Name</label>
                <input type="text" name="assetname" value={transfer.assetname} onChange={handleChange}  />
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Asset From</label>
                <select name="assetfrom" value={transfer.assetfrom} onChange={handleChange}>
                    <option value="">Select Employee</option>
                </select>
            </div>
            <div style={{width:'600px', display:'flex', alignItems:'center'}}>
                <label htmlFor="" style={{width:'200px'}}>Withdraw Reason</label>
                <input type="text" name="reason" value={transfer.reason} onChange={handleChange}  />
            </div>

            <div style={{width:'500px', display:'flex', alignItems:'center',alignContent:'center',justifyContent:'space-between'}}>
                <button type="submit">Assign</button>
            </div>

       </form>

    </>
  )
}

export default AssetTransfer
