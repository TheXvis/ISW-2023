import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListaArchivos from './ListaArchivos';
import FileUpload from './FileUpload';

const FileManagement = () => {
  const [archivos, setArchivos] = useState([]);
  const [uploadCount, setUploadCount] = useState(0); // Estado para manejar la actualización de la lista

  useEffect(() => {
    // Lógica para obtener la lista de archivos actualizada
    axios.get('http://localhost:80/documentos')
      .then(response => {
        setArchivos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [uploadCount]); // Dependencia de uploadCount para actualizar la lista después de subir un archivo

  return (
    <div style={{ height: '240px', overflowY: 'auto' }}>
      <ListaArchivos archivos={archivos} setArchivos={setArchivos} setUploadCount={setUploadCount} uploadCount={uploadCount} />
      <br/>
      <div style={{ marginBottom: '0px' }}>
        <FileUpload setUploadCount={setUploadCount} uploadCount={uploadCount} />
      </div>
    </div>
  );
};

export default FileManagement;
