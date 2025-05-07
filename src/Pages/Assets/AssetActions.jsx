import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'
import { useNavigate } from 'react-router-dom';
import AssetTransfer from './AssetTransfer'
import AssignAsset from './AssignAsset';

const AssetActions = () => {
  const [page, setPage] = useState('AssigAsset');
  

  const renderComponent = () => {
      switch (page) {
        case 'AssigAsset':
          return <AssignAsset />;
        default:
          return <h2>Not Found</h2>;
      }
    };

    const navigate = useNavigate()

  return (
    <>
    <Navbar/>
    <div className="full-container">
      <div className="side-container">
        <Sidenav/>
      </div>
      <div className="actual-container">
        <div className="white-box">
        <div style={{position:'sticky',zIndex: '10',top:'10',width:'50%',height:'4vh',alignContent:'center',display:'flex',gap:'10px',marginLeft:'10px',marginTop:'20px',alignItems:'center'}}>
        <button onClick={() => navigate('/assetmanagement')} style={{backgroundColor:'red',color:'white'}}>Back</button>
        <button className='opt-btn'  onClick={() => setPage('AssigAsset')} >Assign Asset</button>
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

export default AssetActions
