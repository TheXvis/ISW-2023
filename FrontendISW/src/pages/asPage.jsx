import BackToHomeButton from '../components/home';
import UserLoggedIn from '../components/userLoged';
import UserSearch from '../components/userSearch';
import withAuth from '../components/withAuth';
import React from 'react';

function AsPage() {
    return (
        <div>
            <BackToHomeButton/>
            <h1>Página de asistente social</h1>
            <UserLoggedIn/>
            <div style={{marginTop:"10px"}}>
            <UserSearch/>
            </div>
        </div>
    );
}

export default withAuth(AsPage, 'as');

//123456789
//contrasena