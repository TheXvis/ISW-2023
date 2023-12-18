import BackToHomeButton from "../components/home";
import SolicitarAsistencia from "../components/solAsistencia";
import withAuth from '../components/withAuth';
import FileManagement from "../components/FileManagement";
import React from 'react';

// 100200300
// contrasena
function UserPage() {
    return (
        <div className="user-page" style={{ width: '70%', margintop: '100 px' }}>
            <div className="home-section">
                <BackToHomeButton/>
                <h1>Página de usuario</h1>
            </div>
            <div className="assistance-section">
                <SolicitarAsistencia/>
            </div>
            <div className="file-management-section">
                <FileManagement/>
            </div>
        </div>
    );
}


export default withAuth(UserPage, 'user');
