import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage'; // Importa el componente ErrorMessage
import Swal from 'sweetalert2';

const ListaArchivos = ({ uploadCount }) => {
  const [archivos, setArchivos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
// Crear una instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:80'
});

// Añadir un interceptor de solicitud para incluir el encabezado Authorization
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    config.headers.Authorization = `Bearer ${userId}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Luego, utiliza esta instancia de axios en lugar de axios directamente
useEffect(() => {
  api.get('/documentos')
    .then(response => {
      console.log(response.data);
      setArchivos(response.data.archivos);
    })
    .catch(error => {
      console.error(error);
      setErrorMessage('Error al obtener la lista de archivos');
    });
}, [uploadCount]);

  const eliminarArchivo = async (archivoId) => {
    try {
      const confirmed = window.confirm('¿Estás seguro que deseas eliminar este archivo?');

      if (confirmed) {
        const response = await axios.delete(`http://localhost:80/documentos/${archivoId}`);
        setArchivos(archivos.filter(archivo => archivo._id !== archivoId));
        console.log(response.data); // Mensaje de confirmación de eliminación
        Swal.fire({
          icon: 'success',
          title: 'Archivo Eliminado',
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage('El archivo no existe o ya fue eliminado.');
      } else {
        setErrorMessage('Hubo un error al intentar eliminar el archivo.');
      }
    }
  };

  function formatFileSize(size) {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1048576) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / 1048576).toFixed(2)} MB`;
    }
  }

  console.log(archivos);
  return (
    <div className="tabla-centrada">
      <table className="tabla-justificada">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Nombre</th>
            <th className="table-header-cell">Fecha de subida</th>
            <th className="table-header-cell">Tamaño</th>
            <th className="table-header-cell">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {archivos.map(archivo => (
            <tr key={archivo._id}>
              <td className="table-data-cell">{archivo.nombreOriginal}</td>
              <td className="table-data-cell">
                {new Date(archivo.fechaSubida).toLocaleString('es-CL', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td className="table-data-cell">{formatFileSize(archivo.tamaño)}</td>
              <td className="table-data-cell">
              <button onClick={() => window.open(`http://localhost:80/documentos/descargar/${archivo._id}`, '_blank')} type="button" class="btn btn-success custom-btn btn-sm" style={{width: '70px', textAlign:'center', padding:'4px 0'}}>
              Descargar
              </button>
              <button onClick={() => window.open(`http://localhost:80/documentos/ver/${archivo._id}`, '_blank')} type="button" class="btn btn-secondary custom-btn btn-sm">
              Ver
              </button>
                <button onClick={() => eliminarArchivo(archivo._id)} type= "button" class="btn btn-danger btn-sm">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default ListaArchivos;