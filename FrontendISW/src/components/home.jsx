import { useNavigate } from 'react-router-dom';
import React from 'react';

function BackToHomeButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        navigate('/');
    };

    return (
        <button className="back-to-home-button" onClick={handleClick}>Volver a inicio</button>
    );
}

export default BackToHomeButton;