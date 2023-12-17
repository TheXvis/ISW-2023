import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditAsistenteSocial() {
    const [id, setId] = useState('');
    const [asistenteSocial, setAsistenteSocial] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [comuna, setComuna] = useState('');
    const [region, setRegion] = useState('');

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:80/as/get-as/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAsistenteSocial(response.data.asistenteSocial);
            setName(response.data.asistenteSocial.name);
            setPassword(response.data.asistenteSocial.password);
            setTelefono(response.data.asistenteSocial.telefono);
            setCorreo(response.data.asistenteSocial.correo);
            setDireccion(response.data.asistenteSocial.direccion);
            setComuna(response.data.asistenteSocial.comuna);
            setRegion(response.data.asistenteSocial.region);
        } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.response.data.message
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:80/as/update-as/${id}`, {
                name,
                password,
                telefono,
                correo,
                direccion,
                comuna,
                region
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container mt-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} placeholder="Ingrese el rut" required />
            <div className="input-group mb-3 d-flex justify-content-center align-items-center">
              <button style={{marginTop:"10px"}} className="btn btn-primary" type="button" onClick={handleSearch}>Buscar asistente social</button>
            </div>
          </div>
          {asistenteSocial && (
            <div style={{ backgroundColor: '#eee', padding: '15px', borderRadius: '15px'}}>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
                </div>
                <div className="form-group mb-2">
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" required />
                </div>
                <div className="form-group mb-2">
                  <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" value={comuna} onChange={(e) => setComuna(e.target.value)} placeholder="Comuna" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Región" required />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar asistente social</button>
              </form>
            </div>
          )}
        </div>
      );
}

export default EditAsistenteSocial;