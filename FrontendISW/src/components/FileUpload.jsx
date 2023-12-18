import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FileUpload = ({ setUploadCount, uploadCount }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Referencia para el input file
  
  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    const userId = localStorage.getItem('userId');

    axios.post('http://localhost:80/documentos/upload', formData, {
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    })
      .then(response => {
        setUploadCount(uploadCount + 1);
        Swal.fire({
          icon: 'success',
          title: 'Archivo Subido Exitosamente',
        });
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          Swal.fire({
            icon: 'error',
            title: 'Error al subir el archivo',
            text: error.response.data.message,
          });
        } else {
          // Algo sucedió en la configuración de la solicitud que desencadenó un error
          console.error(error.message);
        }
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <input
          type="file"
          onChange={onFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef} // Asignar la referencia al input file
        />
        <button
          onClick={() => fileInputRef.current.click()}
          style={{
            padding: '4px 16px',
            border: '1px solid black',
            backgroundColor: '#1565c0',
            color: 'white',
            borderColor: '#cccccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          Seleccionar Archivo
        </button>
        <span style={{ margin: '0 10px', fontSize: '20px' }}>{file ? file.name : 'Seleccione un archivo'}</span>
        <button
          style={{
            padding: '4px 16px',
            border: '1px solid black',
            backgroundColor: '#2e7d32',
            color: 'white',
            borderRadius: '4px',
            borderColor: '#cccccc',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={onFileUpload}
          disabled={!file}
        >
          Subir
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
