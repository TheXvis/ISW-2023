import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

function UserLoggedIn() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:80/as/get-as/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data.asistenteSocial);
            })
            .catch(error => {
                console.error('Error getting user details:', error);
            });
        }
    }, []);

    if (!user) {
        return <div>No hay usuario logueado</div>;
    }

    return (
        <Card >
            <Card.Body>
                <Card.Title>Usuario logueado</Card.Title>
                <Card.Text>
                    <p>Nombre: {user.name}</p>
                    <p>Comuna: {user.comuna}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
    
}

export default UserLoggedIn;