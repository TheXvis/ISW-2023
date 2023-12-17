import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateAsistenteSocial() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const asistenteSocialData = {
      _id: id,
      name,
      password,
      telefono,
      correo,
      direccion,
      comuna,
      region,
    };
    const token = localStorage.getItem('token');
    console.log(token)
    try {
      const response = await axios.post('http://localhost:80/as/create-as', asistenteSocialData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Swal.fire({
        icon: 'success',
        title: response.data.message
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message
      });
    }
  };
  
  
  return (
    <div className="container mt-4">
    <div style={{ backgroundColor: '#eee', padding: '15px', borderRadius: '15px'}}>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} placeholder="Rut" required />
        </div>
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
        <button type="submit" className="btn btn-primary">Crear Asistente Social</button>
      </form>
    </div>
    </div>
  );
}

export default CreateAsistenteSocial;