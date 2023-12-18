import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage'; // Importa el componente ErrorMessage
import Swal from 'sweetalert2';

const ListaArchivos = ({ uploadCount }) => {
  const [archivos, setArchivos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  useEffect(() => {
    axios.get('http://localhost:80/documentos')
      .then(response => {
        console.log(response.data);
        setArchivos(response.data);
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

  const descargarArchivo = async (archivoId) => {
    try {
      const response = await axios.get(`http://localhost:80/descargar/${archivoId}`, {
        responseType: 'blob', // Especifica el tipo de respuesta como un objeto blob
      });
  
      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'archivo_descargado'); // Nombre predeterminado del archivo descargado
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
      // Manejar errores, mostrar mensajes al usuario, etc.
    }
  };

  console.log(archivos);
  return (
    <div className="tabla-centrada">
      <table className="tabla-justificada">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Nombre del archivo</th>
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
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td className="table-data-cell">{archivo.tamaño}</td>
              <td className="table-data-cell">
                <button onClick={() => descargarArchivo(archivo._id)}>Ver/Descargar</button>
                <button onClick={() => eliminarArchivo(archivo._id)}>Eliminar</button>
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
