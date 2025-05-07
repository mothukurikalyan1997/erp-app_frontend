import React from 'react'
import Navbar from '../Components/Navbar'
import Sidenav from '../Components/Sidenav'

const TestLayout = () => {
  return (
    <>
    <Navbar />
    <div  className='full-container'>
      <div className='side-container'>
        <Sidenav />
      </div>
      <div  className='actual-container'>
        <div className='white-box'>
            sdasd
        </div>
      </div>
    </div>
    </>
  )
}

export default TestLayout
