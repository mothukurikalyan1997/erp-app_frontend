import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

const Photo = () => {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/images')
        .then(res => setImages(res.data))
        .catch(err => console.error(err));
    }, []);

    console.log(images)

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post('http://localhost:3001/uploadpic', formData);
      alert('Uploaded successfully!');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
<div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div> 
        <div>
        {images.map((e,i) => (
          <div key={i}>
            <p>{e.image_path}</p>
            <img
              src={`http://localhost:3001/${e.image_path}`}
              alt={`iploaded ${e.id}`}
              style={{ width: '200px', margin: '10px',height:'auto' }}
            />
          </div>
        ))}
      </div></>
      
    )
}

export default Photo
