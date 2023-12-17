import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function DeleteAsistenteSocial() {
    const [id, setId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:80/as/delete-as/${id}`, {
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
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} placeholder="Ingrese el rut" required />
                <div className="input-group mb-3 d-flex justify-content-center align-items-center">
                    <button style={{marginTop:"10px"}}className="btn btn-primary" type="submit" onClick={handleSubmit}>Eliminar asistente social</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAsistenteSocial;