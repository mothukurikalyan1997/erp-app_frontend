import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PenaltyRegister from './PenaltyRegister'
import VacationRegister from './VacationRegister'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Incidentlog from './Incidentlog'
import AssetDamageCharge from './AssetDamageCharge'


const EmployeeActions = () => {
    const [page, setPage] = useState('vacation');

    const renderComponent = () => {
        switch (page) {
          // case 'penalty':
          //   return <PenaltyRegister />;
          case 'vacation':
            return <VacationRegister />;
          case 'incidentlog':
            return <Incidentlog />;
          case 'Assetdamage':
            return <AssetDamageCharge />;
          default:
            return <h2>Not Found</h2>;
        }
      };

      const navigate = useNavigate()
  return (
    <>
    <Navbar />
    <div  className='full-container'>
      <div className='side-container'>
        <Sidenav />
      </div>
      <div  className='actual-container'>
        <div className='white-box'>
        <div style={{position:'sticky',zIndex: '10',top:'10',width:'50%',height:'4vh',alignContent:'center',display:'flex',gap:'10px',marginLeft:'10px',marginTop:'20px',alignItems:'center'}}>
        <button onClick={() => navigate('/employee/employeetable')} style={{backgroundColor:'red',color:"white"}}>Back</button>
        {/* <button onClick={() => setPage('penalty')} className='opt-btn'>Penalty</button> */}
        <button onClick={() => setPage('vacation')} className='opt-btn' >Vacation</button>
        <button onClick={() => setPage('incidentlog')} className='opt-btn'>Incident Log</button>      
        <button onClick={() => setPage('Assetdamage')} className='opt-btn'>Emp Deductions</button>      
        </div>
        <div style={{width:'50%',marginLeft:'5%',marginTop:'30px'}}>
            {renderComponent()}
        </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default EmployeeActions
