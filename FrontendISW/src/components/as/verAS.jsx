import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function VerAsistenteSocial() {
    const [id, setId] = useState('');
    const [asistenteSocial, setAsistenteSocial] = useState(null);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:80/as/get-as/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAsistenteSocial(response.data.asistenteSocial);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            });
        }
    };

    return (
        <div className="container mt-5" >
          <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} placeholder="Ingrese el rut" required />
          <div className="mt-2">
            <button className="btn btn-primary" type="button" onClick={handleSearch}>Ver asistente social</button>
          </div>

          {asistenteSocial && (
            <table className="table mt-4">
              <tbody>
                <tr>
                  <th>Nombre</th>
                  <td>{asistenteSocial.name}</td>
                </tr>
                <tr>
                  <th>Correo</th>
                  <td>{asistenteSocial.correo}</td>
                </tr>
                <tr>
                  <th>Telefono</th>
                  <td>{asistenteSocial.telefono}</td>
                </tr>
                <tr>
                  <th>Dirección</th>
                  <td>{asistenteSocial.direccion}</td>
                </tr>
                <tr>
                  <th>Comuna</th>
                  <td>{asistenteSocial.comuna}</td>
                </tr>
                <tr>
                  <th>Región</th>
                  <td>{asistenteSocial.region}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      );
}

export default VerAsistenteSocial;