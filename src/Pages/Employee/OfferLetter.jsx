import React, { useRef } from 'react'
import html2pdf from 'html2pdf.js';
import Navbar from '../../Components/Navbar'
import Sidenav from '../../Components/Sidenav'

const OfferLetter = () => {
        const certificateRef = useRef();
    
        const handlePrint = () => {
            const element = certificateRef.current;
            html2pdf().from(element).save(`${"employee.name"}_Offer Letter.pdf`);
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
            <button className="print-button" onClick={handlePrint}>Print PDF</button>

            <div className="offer-letter-container" ref={certificateRef}>
      <h1 className="offer-title">Offer of Employment</h1>
      
      <p>Date: <strong>{"candidate.date"}</strong></p>
      <p>To,</p>
      <p><strong>{"candidate.name"}</strong><br />
        {"candidate.address"}
      </p>

      <p>Dear <strong>{"candidate.name"}</strong>,</p>

      <p>
        We are pleased to offer you the position of <strong>{"candidate.position"}</strong> 
        at <strong>{"candidate.company"}</strong>, effective from <strong>{"candidate.startDate"}</strong>. 
        You will be paid a monthly salary of <strong>${"candidate.salary"}</strong>.
      </p>

      <p>
        Please confirm your acceptance of this offer by signing and returning this letter by <strong>{"candidate.acceptanceDeadline"}</strong>.
      </p>

      <p>We look forward to having you on our team.</p>

      <div className="signature-section">
        <p>Sincerely,</p>
        <p><strong>{"candidate.hrName"}</strong><br />
        HR Manager, {"candidate.company"}</p>
      </div>

      <div className="candidate-signature">
        <p>__________________________</p>
        <p>Signature of {"candidate.name"}</p>
      </div>
    </div>  

            </div>
        </div>
    </div>
    </>
    )
}

export default OfferLetter
