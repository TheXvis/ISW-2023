import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ setUploadCount, uploadCount }) => {
  const [file, setFile] = useState(null);

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:80/documentos/upload', formData)
      .then(response => {
        setUploadCount(uploadCount + 1);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <input type="file" onChange={onFileChange} />
      <bt></bt>
      <button class="btn btn-primary" onClick={onFileUpload}>Subir</button>

    </div>
  );
};

export default FileUpload;