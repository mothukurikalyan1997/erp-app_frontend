import React, { useRef } from 'react'
import html2pdf from 'html2pdf.js';
import Navbar from '../../Components/Navbar';
import Sidenav from '../../Components/Sidenav';


const SalaryCertificate = () => {
  const token = localStorage.getItem('token')
  const company_id = localStorage.getItem('company_id')
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

    const certificateRef = useRef();

    const handlePrint = () => {
        const element = certificateRef.current;
        html2pdf().from(element).save(`${"employee.name"}_Salary_Certificate.pdf`);
      };

  return (

    <>
    <Navbar/>
        <div className="full-container">
            <div className="side-container">
                <Sidenav/>
            </div>
            <div className="actual-container">
                <div className="white-box">
                <div>
<button className="print-button" onClick={handlePrint}>Print PDF</button>

      <div className="certificate-container" ref={certificateRef}>
        <h1 className="certificate-title">Salary Certificate</h1>
        <p>This is to certify that <strong>{"employee.name"}</strong> is working as a <strong>{"employee.designation"}</strong> in our organization.</p>
        
        <div className="salary-details">
          <p><strong>Employee ID:</strong> {"employee.id"}</p>
          <p><strong>Department:</strong> {"employee.department"}</p>
          <p><strong>Monthly Salary:</strong> ${"employee.salary"}</p>
          <p><strong>Date of Issue:</strong> {"employee.issueDate"}</p>
        </div>

        <div className="signature">
          <p>Authorized Signatory</p>
        </div>
      </div>

    </div>  

                </div>
            </div>
        </div>
    </>
    )
}

export default SalaryCertificate
