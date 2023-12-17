import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UserSearch() {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
        const response = await axios.get(`http://localhost:80/user/verUsuario/${userId}`);
        setUser(response.data);
        setLoading(false);
        } catch (error) {
        if (error.response && error.response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Usuario no encontrado',
              });
        } else {
            setError(error.message);
        }
        setLoading(false);
        }
    };
    if (loading) {
        return <div>Cargando...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleUnassign = async () => {
        try {
        await axios.delete(`http://localhost:80/as/${userId}/desasignarAS`);
        const updatedUser = { ...user, asAsignado: null };
        setUser(updatedUser);
        } catch (error) {
        console.error('Error al desasignar el asistente social', error);
        }
    };

    const token = localStorage.getItem('token');

    const handleAssign = async () => {
        try {

            const response = await axios.post('http://localhost:80/as/as-to-user', {
                userId: user._id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.data.message === 'Asignacion exitosa') {
                setUser(response.data.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Asignacion exitosa',
                })
            } else {
                console.error('Error al asignar el asistente social:', response.data.message);
                if (response.data.message === 'El asistente social y el usuario no están en la misma comuna') {
                    alert('El asistente social y el usuario no están en la misma comuna');
                }
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    };


    return (
        <div>
        <input placeholder="Ingrese el rut" className="form-control" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <div className="input-group mb-3 d-flex justify-content-center align-items-center">
        <button style={{marginTop:"10px"}} className="btn btn-primary" onClick={handleSearch}>Buscar usuario</button>
        </div>

        {user && (
    <table className="table table-striped table-hover">
        <tbody>
            <tr>
                <th>Usuario</th>
                <td>{user.name}</td>
            </tr>
            <tr>
                <th>Comuna</th>
                <td>{user.comuna}</td>
            </tr>
            <tr>
                <th>Asistente Social</th>
                <td>{user.asAsignado ? user.asAsignado.nombre : "Ninguno"}</td>
            </tr>
            <tr>
                <th>Acciones</th>
                <td>
                    {!user.asAsignado && <button className="btn btn-primary" onClick={handleAssign}>Asignar</button>}
                    <button className="btn btn-danger" onClick={handleUnassign}>Desasignar</button>
                </td>
            </tr>
        </tbody>
    </table>
)}
        </div>
    );
}

export default UserSearch;