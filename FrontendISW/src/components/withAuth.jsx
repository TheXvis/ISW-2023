import React from 'react';
import { useNavigate } from 'react-router-dom';

function withAuth(Component, expectedUserType) {
  return function WrappedComponent(props) {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const navigate = useNavigate();

    if (!token) {
      return <div>Error: No estás autenticado</div>;
    } else if (userType !== expectedUserType) {
      navigate('/');
      return null;
    } else {
      return <Component {...props} />;
    }
  };
}

export default withAuth;