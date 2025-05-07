import React, { useEffect, useRef, useState } from 'react'
import {API_URL} from '../../data/Data'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

import html2pdf from 'html2pdf.js';

import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const EmpSalaryEdit = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

    const {id,month,year} = useParams()


        const [salary, setSalary] = useState({});
        const [deduction, setDeduction] = useState([]);
        const [penalty, setPenalty] = useState([]);
        
    const [salstatus,setSalstatus] = useState("")
        
        //   const handleChange = (e) => {
        //     const { name, value, type, checked } = e.target;
        //     setSalary({
        //       ...salary,
        //       [name]: type === "checkbox" ? checked : value,
        //     });
        //   };

    useEffect(()=>{
        axios.get(`${API_URL}/sal/employee/empsaledit/${id}/${month}/${year}`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'company_id': company_id,
            'role': role,
            'email': email,
          }
        })
          .then((res) => {           

            const empdata = res.data
            console.log(empdata)
            setSalary(empdata.result1[0])
            setDeduction(empdata.result2)
            setPenalty(empdata.result3)
            // if(empdata.length > 0){
            //     setSalary(empdata[0]) 
            //     setSalstatus(empdata) 
            // }else{
            //     setSalary(empdata)
            // setSalstatus(empdata)

            // }

            // setSalary(empdata);
            // console.log(empdata)
            
            // console.log(empdata[0])
          }
          
        )
          .catch(err=> console.log(err));
        },[])

       const tableref = useRef() 
const handlePrint = () => {
    const element = tableref.current;
    html2pdf().set({
        margin: 0.5,
        filename: 'export.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      }).from(element).save(`${salary.empID}_${salary.empname}_${month}_PaySlip.pdf`);
};

const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_URL}/emp/employee/empsalupdate/${id}`,{salary},{
      headers:{
        'Authorization': `Bearer ${token}`,
        'company_id': company_id,
        'role': role,
        'email': email,
      }
    })
    .then(response => {console.log(response);
        // navigate('/employeetable')
    }
    ).catch(error => console.log(error));
    
}

const formatdate = (datestring) =>{
    const date = new Date(datestring);
     return format(date, 'yyyy-MM-dd'); // Custom format to display 'YYYY-MM-DD'
}


// const deductionTotal = salstatus.reduce(
//     (sum, item) => sum + (parseFloat(item.Deduction_Amount) || 0),
//     0
//   );

    
  return (

    <>
    <Navbar/>
    <div className="full-container">
        <div className="side-container">
            <Sidenav/>
        </div>
        <div className="actual-container">
            <div className="white-box" >
            {/* <h1>Employee Salary Slip</h1>
          <button className='Cancel' onClick={()=>navigate('/employee/employeesaltable')}>X</button>
          <PictureAsPdfOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={handlePrint}/> */}

  {/* Top Icon and Search bar */}
  <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',height:'60px'}}>
            <div>
                <p style={{color:'#1C2B3A',textAlign:'start',fontWeight:'bold'}}>Emp Pay Slip {id}_{month}</p>
            </div>
            <div className="search-container" style={{display:'flex',alignItems:'center'}}>
            <div >
              <PictureAsPdfOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={handlePrint}/>
              <CloseOutlinedIcon style={{ fontSize: '30px', color: 'white', backgroundColor: '#004A89', padding: '6px', borderRadius: '6px',marginRight:'5px' }} onClick={()=>navigate('/employee/employeesaltable')}/>
              {/* <GetAppIcon className='nani-icon'/> */}
            </div>
          </div>
    </div> 
  {/* Close */}


<div ref={tableref}>
<table className='dynamic-table' >
        <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
      <tr >
        <th>Month</th>
        <th>File</th>
        <th>Name</th>
        <th>Present Days</th>
        <th>Off Days</th>
        <th>Sick Days</th>
        <th>Paid Days</th>
        <th>Gross Salary</th>

        </tr>
        </thead>
       <tbody>

       <tr >
              <td>{salary.month}</td>
              <td>{salary.empID}</td>
              <td>{salary.empname}</td>
              <td>{salary.presentdays}</td>
              <td>{salary.offdays}</td>
              <td>{salary.sickleave}</td>
              <td>{salary.totalworkingdays}</td>
              <td>{salary.grosssalary}</td>
            </tr>
       </tbody>
      </table>

<div style={{marginTop:'30px',width:'400px'}}>
<h1>Deduction Charges</h1>
<table className='dynamic-table' >
        <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
      <tr >
        <th>Deduction Catagory</th>
        <th>Deduction Amount</th>

        </tr>
        </thead>
       <tbody>

        {deduction.map((e,i)=>{
            return(
              <tr key={i}>
              <td>{e.category}</td>
              <td>{e.fulldeduction}</td>
            </tr>
                
        )
        })}
       </tbody>
      </table>

</div>

<div style={{marginTop:'30px',width:'400px'}}>
<h1>Penalty Charges</h1>
<table className='dynamic-table' >
        <thead style={{ position: 'sticky', top: 0, background: '#f9f9f9' }}>
      <tr >
        <th>Deduction Catagory</th>
        <th>Deduction Amount</th>
        <th>Remark's</th>

        </tr>
        </thead>
       <tbody>

        {penalty.map((e,i)=>{
            return(
              <tr key={i}>
              <td>{e.deductCat}</td>
              <td>{e.amt}</td>
              <td>{e.remark}</td>
            </tr>
                
        )
        })}
       </tbody>
      </table>

</div>

<div style={{backgroundColor:'#F0F4F8',width:'400px',marginTop:'30px',marginLeft:'30%',}}>
    {/* <h2>Total Salary : {salary[0].grosssalary}</h2> */}
    {/* <h2>Deduction Amount :{deductionTotal}</h2> */}
    {/* <h2>Final Amount: {salary.grosssalary - deductionTotal}</h2> */}
</div>

</div>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default EmpSalaryEdit
