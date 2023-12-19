import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function EditUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
  
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      // Obtén los datos del usuario
      axios.get(`http://localhost:80/user/verUsuario/${userId}`)
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, [userId]);
  
    const handleInputChange = (event) => {
      setUser({
        ...user,
        [event.target.name]: event.target.value
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Actualiza los datos del usuario
      axios.put(`http://localhost:80/user/update-user/${userId}`, user, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        Swal.fire({
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK'
          });
      })
      .catch(err => {
        setError(err.message);
      });
    };
  
    if (loading) return 'Loading...';
    if (error) return `Error: ${error}`;
  
    return (
        <div className="container mt-4">
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Ocultar formulario' : 'Editar usuario'}
          </button>
          {showForm && user && (
            <div style={{ backgroundColor: '#eee', padding: '15px', borderRadius: '15px'}}>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="name" value={user.name} onChange={handleInputChange} placeholder="Nombre" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="telefono" value={user.telefono} onChange={handleInputChange} placeholder="Teléfono" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="sueldo" value={user.sueldo} onChange={handleInputChange} placeholder="Sueldo" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="direccion" value={user.direccion} onChange={handleInputChange} placeholder="Dirección" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="comuna" value={user.comuna} onChange={handleInputChange} placeholder="Comuna" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="region" value={user.region} onChange={handleInputChange} placeholder="Región" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="ocupacion" value={user.ocupacion} onChange={handleInputChange} placeholder="Ocupación" required />
                </div>
                <div className="form-group mb-2">
                  <input type="text" className="form-control" name="nacimiento" value={user.nacimiento} onChange={handleInputChange} placeholder="Fecha de Nacimiento" required />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
              </form>
            </div>
          )}
        </div>
      );
  }
  
  export default EditUser;