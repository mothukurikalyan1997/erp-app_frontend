import React from 'react'

const Excelsample = () => {
    const downloadTemplate = () => {
        // Trigger the download of the template Excel file
        window.location.href = 'http://localhost:3001/download-template';
      };
    
      const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    // Send file to backend
    axios.post('http://localhost:3001/upload', formData)
      .then(response => {
        alert('File uploaded successfully');
      })
      .catch(error => {
        alert('Error uploading file');
        console.error(error);
      });
  };

  
  return (
    <div>
    <div><button onClick={downloadTemplate}>Download Template</button></div>
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>

    </div>
  )
}

export default Excelsample
