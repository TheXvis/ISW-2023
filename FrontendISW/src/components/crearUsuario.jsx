import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const CreateUser = () => {
  const [userData, setUserData] = useState({
    rut: '',
    name: '',
    password: '',
    telefono: '',
    sueldo: '',
    direccion: '',
    comuna: '',
    region: '',
    ocupacion: '',
    nacimiento: '',
    role: 'user',
    asAsignado: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/user/create-user', userData);
      Swal.fire({
        icon: 'success',
        title: response.data.message,
    })
    setIsFormVisible(false);
    setUserData({
      rut: '',
      name: '',
      password: '',
      telefono: '',
      sueldo: '',
      direccion: '',
      comuna: '',
      region: '',
      ocupacion: '',
      nacimiento: '',
      role: 'user',
      asAsignado: ''
    });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message,
    });
    }
  };

  return (
    <div className="container mt-4">
      <button  style={{marginLeft:"128px"}} className="btn btn-primary mt" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Ocultar formulario' : 'Crear usuario'}
      </button>
      {isFormVisible && (
        <div style={{ backgroundColor: '#eee', padding: '15px', borderRadius: '15px'}}>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="rut" value={userData.rut} onChange={handleChange} placeholder="Rut" required minLength="9" />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="name" value={userData.name} onChange={handleChange} placeholder="Nombre" required />
            </div>
            <div className="form-group mb-2">
              <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} placeholder="Contraseña" required />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="telefono" value={userData.telefono} onChange={handleChange} placeholder="Teléfono" required />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="sueldo" value={userData.sueldo} onChange={handleChange} placeholder="Sueldo" required />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="direccion" value={userData.direccion} onChange={handleChange} placeholder="Dirección" required />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="comuna" value={userData.comuna} onChange={handleChange} placeholder="Comuna" required />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="region" value={userData.region} onChange={handleChange} placeholder="Región" required />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="ocupacion" value={userData.ocupacion} onChange={handleChange} placeholder="Ocupación" required />
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="nacimiento" value={userData.nacimiento} onChange={handleChange} placeholder="Fecha de Nacimiento" required />
            </div>
            <button type="submit" className="btn btn-primary">Crear Usuario</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateUser;