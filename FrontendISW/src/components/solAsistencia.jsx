import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

function SolicitarAsistencia() {
    const [comuna, setComuna] = useState('');
    const [asistentesSociales, setAsistentesSociales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comunas, setComunas] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:80/comunas')
            .then(response => response.json())
            .then(data => setComunas(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:80/user/solicitar-asistencia', { comuna }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        
            setAsistentesSociales(response.data.asistenteSocial);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    function handleEmailClick(asistente) {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${asistente.correo}`, '_blank', 'width=600,height=600');
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
        <p>Selecciona tu comuna:</p>
        <form onSubmit={handleSubmit}>
            <Dropdown onSelect={(value) => setComuna(value)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {comuna || "Seleccione una comuna"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {comunas.map((comuna, index) => (
                        <Dropdown.Item key={index} eventKey={comuna}>
                            {comuna}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
                <div className="input-group mb-3 d-flex justify-content-center align-items-center">
                <button style={{marginTop:"10px"}}className="btn btn-primary" type="submit">Buscar asistentes</button>
                </div>
            </form>
            {asistentesSociales.length > 0 && (
                <div>
                    <h2>Asistentes sociales disponibles:</h2>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asistentesSociales.map((asistente, index) => {
                                console.log(asistente);
                                return (
                                    <tr key={index}>
                                        <td>{asistente.name}</td>
                                        <td>{asistente.correo}</td>
                                        <td>{asistente.telefono}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleEmailClick(asistente)}>Enviar correo</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SolicitarAsistencia;